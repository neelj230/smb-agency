import type { BusinessData } from "../components/types";
import type {
  VibeProfile,
  DesignBrief,
  DesignDatabase,
  FontPairingSelection,
  PaletteSelection,
  HeroSelection,
  AnimationSelection,
  NavSelection,
  DbFontPairing,
  DbColorPalette,
} from "./types";
import {
  selectByVibe,
  colorDistance,
  slugHash,
  pickByHash,
  vibeMatchScore,
} from "./utils";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

interface DesignFingerprint {
  slug: string;
  font: string;
  palette: string;
  heroVariant: string;
  sectionOrder?: string[];
  advancedComponents?: string[];
  /** CSS recipes used (e.g., "film-grain", "dot-pattern") */
  cssRecipes?: string[];
  /** Technique IDs from the technique catalog */
  techniques?: string[];
  /** Narrative flow used (e.g., "Story-First") */
  narrativeFlow?: string;
  /** Animation components used (e.g., "MarqueeTicker", "BlurredReveal") */
  animationComponents?: string[];
  category: string;
  timestamp: string;
}

function loadUsedDesigns(): DesignFingerprint[] {
  try {
    const fp = join(process.cwd(), "data", "used-designs.json");
    if (!existsSync(fp)) return [];
    return JSON.parse(readFileSync(fp, "utf-8"));
  } catch {
    return [];
  }
}

function saveUsedDesign(fp: DesignFingerprint): void {
  const designs = loadUsedDesigns();
  // Remove old entry for same slug if regenerating
  const filtered = designs.filter((d) => d.slug !== fp.slug);
  filtered.push(fp);
  const path = join(process.cwd(), "data", "used-designs.json");
  writeFileSync(path, JSON.stringify(filtered, null, 2));
}

function isComboUsed(
  font: string,
  palette: string,
  hero: string,
  usedDesigns: DesignFingerprint[],
): boolean {
  return usedDesigns.some(
    (d) => d.font === font && d.palette === palette && d.heroVariant === hero,
  );
}

function countCategoryUses(
  category: string,
  field: string,
  value: string,
  usedDesigns: DesignFingerprint[],
): number {
  return usedDesigns.filter(
    (d) => d.category === category && (d as any)[field] === value,
  ).length;
}

/** Hero database IDs → component variant names */
const HERO_VARIANT_MAP: Record<string, HeroSelection["variant"]> = {
  "fullscreen-video-hero": "video-bg",
  "split-text-photo": "split",
  "centered-text-hero": "centered",
  "dark-bold-text-hero": "dark-bold",
  "blurred-reveal-hero": "blurred-reveal",
  "minimal-centered-hero": "centered",
  "photo-gradient-hero": "photo-bg",
  "cinematic-text-reveal": "dark-bold",
  "rating-social-proof-hero": "split",
  "side-by-side-text-image": "split",
};

/** Vibe tags → CSS recipe names to include in globals.css */
const VIBE_CSS_RECIPES: Record<string, string[]> = {
  warm: ["film-grain"],
  analog: ["film-grain"],
  vintage: ["film-grain"],
  editorial: ["picture-frame"],
  gallery: ["picture-frame"],
  bold: ["mix-blend-hover"],
  creative: ["mix-blend-hover"],
  modern: ["dot-pattern"],
  clean: ["dot-pattern"],
  tech: ["dot-pattern"],
  minimal: ["dot-pattern"],
  premium: ["picture-frame"],
  elegant: ["film-grain"],
  playful: ["mix-blend-hover"],
};

/** Nav vibe mappings */
const DARK_NAV_VIBES = ["bold", "premium", "cinematic", "dark", "industrial"];
const TRANSPARENT_NAV_VIBES = ["elegant", "premium", "immersive", "creative"];

export function selectDesign(
  vibe: VibeProfile,
  db: DesignDatabase,
  business: BusinessData,
): DesignBrief {
  const slug = business.slug || "";
  const profileVibes = [vibe.primary, vibe.secondary, vibe.tertiary];
  const usedDesigns = loadUsedDesigns();

  // --- Font pairing (weighted random, penalize duplicates) ---
  const googleFonts = db.font_pairings.filter(
    (f) =>
      !f.next_font_import.includes("local") &&
      !f.next_font_import.includes("Local"),
  );
  const selectedFont = weightedRandomSelectWithDedup(
    googleFonts,
    profileVibes,
    slug,
    0,
    5,
    usedDesigns,
    business.category,
    "font",
  );
  const font: FontPairingSelection = {
    id: selectedFont.id,
    display: selectedFont.display,
    body: selectedFont.body,
    displayWeights: selectedFont.display_weights,
    bodyWeights: selectedFont.body_weights,
    nextFontImport: selectedFont.next_font_import,
    isLocal: false,
  };

  // --- Color palette (weighted random, with brand color preference + dedup) ---
  const palette = selectPalette(
    db.color_palettes,
    profileVibes,
    business,
    slug,
  );

  // --- Hero variant (force variety for same-category) ---
  const hero = selectHero(db.heroes, profileVibes, business, slug, usedDesigns);

  // --- Navigation ---
  const nav = selectNav(profileVibes, hero);

  // --- Animations (pick MORE than before) ---
  const animations = selectAnimations(db.animations, profileVibes, slug);

  // --- CSS recipes ---
  const cssRecipes = selectCssRecipes(profileVibes);

  // --- Component variants ---
  const componentVariants = selectComponentVariants(profileVibes, slug);

  // --- Save expanded fingerprint for future dedup ---
  saveUsedDesign({
    slug,
    font: font.id,
    palette: palette.id,
    heroVariant: hero.variant,
    cssRecipes,
    animationComponents: animations.map((a: any) => a.id || a.name).filter(Boolean),
    category: business.category,
    timestamp: new Date().toISOString(),
  });

  return {
    font,
    palette,
    hero,
    nav,
    animations,
    cssRecipes,
    componentVariants,
  };
}

/**
 * Like weightedRandomSelect but penalizes combos already used by same-category businesses.
 */
function weightedRandomSelectWithDedup<
  T extends { id: string; vibe: string[] },
>(
  items: T[],
  profileVibes: string[],
  slug: string,
  offset: number,
  topN: number,
  usedDesigns: DesignFingerprint[],
  category: string,
  field: string,
): T {
  const scored = items
    .map((item) => {
      const vibeScore = vibeMatchScore(profileVibes, item.vibe);
      // Penalize items already used by same-category businesses
      const categoryUses = countCategoryUses(
        category,
        field,
        item.id,
        usedDesigns,
      );
      const dedupPenalty = categoryUses * 2;
      return { item, score: Math.max(0, vibeScore - dedupPenalty) };
    })
    .sort((a, b) => b.score - a.score);

  const candidates = scored.slice(0, Math.min(topN, scored.length));
  const totalWeight = candidates.reduce((sum, c) => sum + (c.score + 1), 0);
  const hashValue = (slugHash(slug) + offset) % totalWeight;

  let cumulative = 0;
  for (const candidate of candidates) {
    cumulative += candidate.score + 1;
    if (hashValue < cumulative) return candidate.item;
  }

  return candidates[0].item;
}

/**
 * Weighted random selection from top-N candidates by vibe score.
 * Uses slug hash for determinism but distributes across top candidates
 * instead of always picking #1. This ensures variety.
 */
function weightedRandomSelect<T extends { vibe: string[] }>(
  items: T[],
  profileVibes: string[],
  slug: string,
  offset = 0,
  topN = 5,
): T {
  const scored = items
    .map((item, idx) => ({
      item,
      score: vibeMatchScore(profileVibes, item.vibe),
      idx,
    }))
    .sort((a, b) => b.score - a.score);

  // Take top N candidates (or all if fewer)
  const candidates = scored.slice(0, Math.min(topN, scored.length));

  // Weighted selection using slug hash
  // Higher scores get more weight but aren't guaranteed
  const totalWeight = candidates.reduce((sum, c) => sum + (c.score + 1), 0); // +1 so zero-score items still have a chance
  const hashValue = (slugHash(slug) + offset) % totalWeight;

  let cumulative = 0;
  for (const candidate of candidates) {
    cumulative += candidate.score + 1;
    if (hashValue < cumulative) return candidate.item;
  }

  return candidates[0].item;
}

function selectPalette(
  palettes: DbColorPalette[],
  profileVibes: string[],
  business: BusinessData,
  slug: string,
): PaletteSelection {
  let selected: DbColorPalette;

  // If business has brand colors from enrichment, find closest palette
  const brandColors = (business as any).brandColors;
  if (brandColors?.primary && brandColors.primary.startsWith("#")) {
    // Score palettes by both color proximity AND vibe match
    const scored = palettes.map((p) => {
      const colorDist = colorDistance(brandColors.primary, p.colors.primary);
      const vibeScore = vibeMatchScore(profileVibes, p.vibe);
      // Combined score: lower is better for color, higher is better for vibe
      return { palette: p, combined: colorDist - vibeScore * 0.3 };
    });
    scored.sort((a, b) => a.combined - b.combined);
    // Pick from top 3 closest matches using slug hash
    const topCandidates = scored.slice(0, 3);
    selected =
      topCandidates[(slugHash(slug) + 1) % topCandidates.length].palette;
  } else {
    // Weighted random from top vibe matches
    selected = weightedRandomSelect(palettes, profileVibes, slug, 1);
  }

  return {
    id: selected.id,
    ...normalizePaletteColors(selected.colors as Record<string, string>),
  };
}

function normalizePaletteColors(
  colors: Record<string, string>,
): Omit<PaletteSelection, "id"> {
  const primary =
    colors.primary ||
    colors.primary_red ||
    colors.primary_green ||
    colors.primary_yellow ||
    colors.accent_warm ||
    colors.accent_orange ||
    colors.accent_blue ||
    colors.accent_green ||
    colors.accent ||
    "#1d4ed8";

  const accent =
    colors.accent ||
    colors.accent_light ||
    colors.accent_bright ||
    colors.accent_dark ||
    colors.accent_purple ||
    colors.accent_blue ||
    colors.accent_green ||
    colors.accent_orange ||
    colors.accent_warm ||
    primary;

  const bgLight =
    colors.bg_light ||
    colors.bg ||
    colors.bg_gradient ||
    colors.bg_secondary ||
    colors.bg_dark ||
    "#f8f8f8";

  const textDark =
    colors.text_dark ||
    colors.text ||
    colors.text_light ||
    colors.secondary_dark ||
    "#111111";

  const textMuted =
    colors.text_muted ||
    colors.text_dark ||
    colors.text_light ||
    colors.text ||
    "#666666";

  // If accent ended up identical to primary, generate a complementary color
  const finalAccent = accent === primary ? shiftHue(primary, 40) : accent;

  return { primary, accent: finalAccent, bgLight, textDark, textMuted };
}

/** Shift a hex color's hue by degrees to create a complementary accent */
function shiftHue(hex: string, degrees: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max - min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  // Shift hue
  h = (h + degrees / 360) % 1;

  // HSL to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const rr = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const gg = Math.round(hue2rgb(p, q, h) * 255);
  const bb = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return `#${rr.toString(16).padStart(2, "0")}${gg.toString(16).padStart(2, "0")}${bb.toString(16).padStart(2, "0")}`;
}

function selectHero(
  heroes: DesignDatabase["heroes"],
  profileVibes: string[],
  business: BusinessData,
  slug: string,
  usedDesigns: DesignFingerprint[] = [],
): HeroSelection {
  const photos = business.photos || [];
  const hasTeamPhoto = photos.some((p) => p.category === "team");
  const hasExteriorPhoto = photos.some((p) => p.category === "exterior");
  const hasAnyPhoto = photos.length > 0;

  type Candidate = { variant: HeroSelection["variant"]; vibeScore: number };
  const candidates: Candidate[] = [];

  // Always available
  candidates.push({
    variant: "centered",
    vibeScore:
      profileVibes.includes("clean") || profileVibes.includes("minimal")
        ? 3
        : 1,
  });
  candidates.push({
    variant: "dark-bold",
    vibeScore:
      profileVibes.includes("bold") || profileVibes.includes("premium")
        ? 3
        : profileVibes.includes("modern")
          ? 2
          : 0,
  });

  // Needs a foreground photo
  if (hasTeamPhoto || hasExteriorPhoto) {
    candidates.push({
      variant: "split",
      vibeScore:
        profileVibes.includes("professional") ||
        profileVibes.includes("friendly")
          ? 3
          : profileVibes.includes("trustworthy") ||
              profileVibes.includes("personal")
            ? 2
            : 1,
    });
  }

  // Needs any background photo
  if (hasAnyPhoto) {
    candidates.push({
      variant: "photo-bg",
      vibeScore:
        profileVibes.includes("visual") || profileVibes.includes("immersive")
          ? 3
          : profileVibes.includes("warm") || profileVibes.includes("inviting")
            ? 2
            : 1,
    });
    candidates.push({
      variant: "blurred-reveal",
      vibeScore:
        profileVibes.includes("premium") || profileVibes.includes("elegant")
          ? 3
          : profileVibes.includes("creative")
            ? 2
            : 0,
    });
  }

  // Penalize hero variants already used by same-category businesses
  for (const c of candidates) {
    const categoryHeroUses = usedDesigns.filter(
      (d) => d.category === business.category && d.heroVariant === c.variant,
    ).length;
    c.vibeScore = Math.max(0, c.vibeScore - categoryHeroUses * 1.5);
  }

  // Sort by vibe score, tiebreak with slug hash for variety
  candidates.sort((a, b) => {
    if (b.vibeScore !== a.vibeScore) return b.vibeScore - a.vibeScore;
    return (
      (slugHash(slug + a.variant) % 100) - (slugHash(slug + b.variant) % 100)
    );
  });

  // Pick from top 3 candidates using weighted selection
  const topCandidates = candidates.slice(0, Math.min(3, candidates.length));
  const chosen =
    topCandidates[(slugHash(slug + "hero") + 7) % topCandidates.length];

  const dbHero = heroes.find((h) => {
    const mapped = HERO_VARIANT_MAP[h.id];
    return mapped === chosen.variant;
  });

  return {
    variant: chosen.variant,
    databaseId: dbHero?.id || chosen.variant,
  };
}

function selectNav(profileVibes: string[], hero: HeroSelection): NavSelection {
  if (
    hero.variant === "dark-bold" ||
    hero.variant === "photo-bg" ||
    hero.variant === "blurred-reveal"
  ) {
    return { variant: "dark" };
  }
  if (TRANSPARENT_NAV_VIBES.some((v) => profileVibes.includes(v))) {
    return { variant: "transparent" };
  }
  if (DARK_NAV_VIBES.some((v) => profileVibes.includes(v))) {
    return { variant: "dark" };
  }
  return { variant: "light" };
}

function selectAnimations(
  animations: DesignDatabase["animations"],
  profileVibes: string[],
  slug: string,
): AnimationSelection[] {
  // Always include baseline
  const result: AnimationSelection[] = [
    {
      id: "fade-up-on-scroll",
      name: "Fade Up on Scroll",
      category: "entrance",
      complexity: "simple",
    },
    {
      id: "staggered-children",
      name: "Staggered Children",
      category: "entrance",
      complexity: "simple",
    },
  ];

  // Pick 2-3 extras (INCREASED from 1) — filter out baseline and complex ones
  const extras = animations.filter(
    (a) => a.id !== "fade-up-on-scroll" && a.id !== "staggered-children",
  );

  if (extras.length > 0) {
    // Pick medium complexity animations for non-minimal vibes
    const isMinimal =
      profileVibes.includes("minimal") || profileVibes.includes("clean");
    const pool = isMinimal
      ? extras.filter((a) => a.complexity === "simple")
      : extras.filter((a) => a.complexity !== "complex");

    if (pool.length > 0) {
      // Pick 2-3 extras using different hash offsets
      const count = isMinimal ? 1 : Math.min(3, pool.length);
      const used = new Set<string>();

      for (let i = 0; i < count; i++) {
        const pick = pickByHash(
          pool.filter((a) => !used.has(a.id)),
          slug,
          10 + i,
        );
        if (pick) {
          used.add(pick.id);
          result.push({
            id: pick.id,
            name: pick.name,
            category: pick.category,
            complexity: pick.complexity,
            cssRecipe: pick.implementation?.css,
          });
        }
      }
    }
  }

  return result;
}

function selectCssRecipes(profileVibes: string[]): string[] {
  const recipes = new Set<string>();
  for (const vibe of profileVibes) {
    const vibeRecipes = VIBE_CSS_RECIPES[vibe];
    if (vibeRecipes) {
      for (const r of vibeRecipes) recipes.add(r);
    }
  }
  // Every site needs at least one visual texture
  if (recipes.size === 0) {
    recipes.add("dot-pattern");
  }
  // Always include gradient-sections for visual flow between sections
  recipes.add("gradient-sections");
  return [...recipes];
}

function selectComponentVariants(
  profileVibes: string[],
  slug: string,
): Record<string, string> {
  const variants: Record<string, string> = {};

  // ServiceCards — weighted selection
  if (
    profileVibes.includes("editorial") ||
    profileVibes.includes("premium") ||
    profileVibes.includes("elegant")
  ) {
    variants["ServiceCards"] = "alternating";
  } else {
    variants["ServiceCards"] = pickByHash(
      ["grid", "grid", "alternating"],
      slug,
      20,
    ); // 2/3 chance grid
  }

  // TestimonialCarousel — more variety
  if (
    profileVibes.includes("established") ||
    profileVibes.includes("trustworthy")
  ) {
    variants["TestimonialCarousel"] = "featured";
  } else if (
    profileVibes.includes("energetic") ||
    profileVibes.includes("warm") ||
    profileVibes.includes("playful")
  ) {
    variants["TestimonialCarousel"] = "scroll";
  } else {
    variants["TestimonialCarousel"] = pickByHash(
      ["scroll", "grid", "featured"],
      slug,
      3,
    );
  }

  // ProcessSteps
  if (
    profileVibes.includes("premium") ||
    profileVibes.includes("elegant") ||
    profileVibes.includes("personal")
  ) {
    variants["ProcessSteps"] = "timeline";
  } else {
    variants["ProcessSteps"] = pickByHash(["grid", "timeline"], slug, 4);
  }

  // StatsCounter
  if (
    profileVibes.includes("bold") ||
    profileVibes.includes("premium") ||
    profileVibes.includes("dark")
  ) {
    variants["StatsCounter"] = "dark";
  } else {
    variants["StatsCounter"] = pickByHash(["dark", "light"], slug, 5);
  }

  // ImageGallery — more variety
  if (profileVibes.includes("visual") || profileVibes.includes("creative")) {
    variants["ImageGallery"] = "masonry";
  } else if (
    profileVibes.includes("energetic") ||
    profileVibes.includes("playful")
  ) {
    variants["ImageGallery"] = "scroll";
  } else {
    variants["ImageGallery"] = pickByHash(
      ["grid", "scroll", "masonry"],
      slug,
      6,
    );
  }

  return variants;
}
