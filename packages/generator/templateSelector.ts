/**
 * Template Selector — matches businesses to the best reference site template.
 *
 * Scores all 35 reference sites against a business's VibeProfile and picks
 * the best match, with dedup to prevent same-category businesses getting
 * the same template.
 */

import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import type { VibeProfile } from "./types";
import type { BusinessData } from "../components/types";

interface TemplateMatch {
  slug: string; // e.g. "_reference-warm-editorial"
  score: number;
  sections: string[];
}

// Vibe tags per reference site
const TEMPLATE_VIBES: Record<string, string[]> = {
  "_reference-agevia": ["professional", "bold", "premium", "creative"],
  "_reference-arpeggio": ["bold", "creative", "premium", "modern"],
  "_reference-bamzi": ["warm", "elegant", "premium", "personal"],
  "_reference-bold-stats": ["bold", "direct", "professional", "trustworthy"],
  "_reference-clean-services": ["professional", "trustworthy", "direct", "clean"],
  "_reference-cleaning": ["professional", "direct", "clean", "bold"],
  "_reference-dark-immersive": ["playful", "creative", "warm", "immersive"],
  "_reference-draftr": ["modern", "clean", "professional", "creative"],
  "_reference-dreelio": ["creative", "modern", "premium", "playful"],
  "_reference-ehunter": ["cinematic", "dark", "bold", "premium"],
  "_reference-essentia": ["elegant", "premium", "minimal", "clean"],
  "_reference-etery": ["modern", "creative", "bold", "professional"],
  "_reference-forest-therapy": ["warm", "serene", "personal", "immersive"],
  "_reference-gardener": ["warm", "elegant", "personal", "creative"],
  "_reference-handyman": ["professional", "trustworthy", "direct", "clean"],
  "_reference-heatfix": ["bold", "direct", "professional", "trustworthy"],
  "_reference-hotel": ["premium", "elegant", "warm", "immersive"],
  "_reference-kids-camp": ["playful", "fun", "warm", "creative"],
  "_reference-luxerra": ["premium", "dark", "bold", "elegant"],
  "_reference-marketing": ["creative", "bold", "modern", "professional"],
  "_reference-minimal-brand": ["elegant", "premium", "minimal", "clean"],
  "_reference-mobius": ["bold", "creative", "premium", "modern"],
  "_reference-nordiq": ["elegant", "premium", "creative", "minimal"],
  "_reference-opurent": ["cinematic", "premium", "bold", "dark"],
  "_reference-pilates": ["warm", "elegant", "personal", "clean"],
  "_reference-platform": ["modern", "bold", "creative", "premium"],
  "_reference-real-estate": ["premium", "dark", "professional", "bold"],
  "_reference-realdev": ["cinematic", "premium", "immersive", "bold"],
  "_reference-restaurant-dark": ["warm", "personal", "elegant", "premium"],
  "_reference-stratex": ["professional", "bold", "premium", "creative"],
  "_reference-therapy": ["warm", "personal", "serene", "elegant"],
  "_reference-trades-clean": ["bold", "direct", "professional", "trustworthy"],
  "_reference-warm-editorial": ["warm", "personal", "creative", "elegant"],
  "_reference-wellness-glass": ["warm", "personal", "elegant", "premium"],
  "_reference-yachtera": ["premium", "elegant", "cinematic", "immersive"],
};

// Templates that are industry-specific and should be penalized for non-matching businesses
const INDUSTRY_TEMPLATES: Record<string, string[]> = {
  "_reference-bamzi": ["restaurant", "cafe", "bakery", "bar"],
  "_reference-restaurant-dark": ["restaurant", "cafe", "bakery", "bar"],
  "_reference-hotel": ["hotel", "resort", "hospitality"],
  "_reference-kids-camp": ["camp", "childcare", "daycare"],
  "_reference-luxerra": ["car rental", "luxury rental", "auto dealer"],
  "_reference-real-estate": ["real estate", "realtor", "property"],
  "_reference-realdev": ["real estate", "realtor", "property", "developer"],
  "_reference-pilates": ["gym", "fitness", "yoga", "pilates", "dance"],
  "_reference-wellness-glass": ["spa", "wellness", "yoga", "meditation"],
  "_reference-forest-therapy": ["therapy", "counseling", "wellness", "meditation"],
  "_reference-therapy": ["therapy", "counseling", "psychologist"],
  "_reference-yachtera": ["yacht", "boat", "charter", "marine"],
  "_reference-essentia": ["skincare", "beauty", "cosmetics", "product"],
  "_reference-minimal-brand": ["skincare", "beauty", "cosmetics", "product"],
  "_reference-nordiq": ["furniture", "design", "product", "craft"],
};

// Category to good template matches
const CATEGORY_BOOSTS: Record<string, string[]> = {
  "nail salon": ["_reference-warm-editorial", "_reference-wellness-glass", "_reference-pilates", "_reference-bamzi"],
  "tattoo parlor": ["_reference-dark-immersive", "_reference-ehunter", "_reference-warm-editorial", "_reference-mobius"],
  "plumber": ["_reference-bold-stats", "_reference-trades-clean", "_reference-heatfix", "_reference-handyman", "_reference-clean-services"],
  "auto repair": ["_reference-bold-stats", "_reference-trades-clean", "_reference-heatfix", "_reference-clean-services"],
  "barber": ["_reference-dark-immersive", "_reference-warm-editorial", "_reference-etery", "_reference-marketing"],
  "florist": ["_reference-gardener", "_reference-warm-editorial", "_reference-bamzi", "_reference-forest-therapy"],
  "bakery": ["_reference-restaurant-dark", "_reference-bamzi", "_reference-warm-editorial", "_reference-dark-immersive"],
  "restaurant": ["_reference-restaurant-dark", "_reference-bamzi", "_reference-dark-immersive"],
  "spa": ["_reference-wellness-glass", "_reference-forest-therapy", "_reference-pilates", "_reference-warm-editorial"],
  "salon": ["_reference-warm-editorial", "_reference-wellness-glass", "_reference-pilates"],
  "contractor": ["_reference-bold-stats", "_reference-trades-clean", "_reference-heatfix", "_reference-handyman"],
  "electrician": ["_reference-bold-stats", "_reference-trades-clean", "_reference-clean-services", "_reference-heatfix"],
  "cleaning": ["_reference-cleaning", "_reference-clean-services", "_reference-handyman"],
  "agency": ["_reference-marketing", "_reference-mobius", "_reference-agevia", "_reference-stratex"],
};

function loadUsedTemplates(): { slug: string; template: string; category: string }[] {
  try {
    const fp = join(process.cwd(), "data", "used-templates.json");
    if (!existsSync(fp)) return [];
    return JSON.parse(readFileSync(fp, "utf-8"));
  } catch {
    return [];
  }
}

function detectSections(templateSlug: string): string[] {
  try {
    const pagePath = join(process.cwd(), "sites", templateSlug, "app", "page.tsx");
    const code = readFileSync(pagePath, "utf-8");
    const matches = code.match(/id="([^"]+)"/g) || [];
    return [...new Set(matches.map((m) => m.replace('id="', "").replace('"', "")))];
  } catch {
    return [];
  }
}

export function selectTemplate(
  business: BusinessData,
  vibe: VibeProfile,
): TemplateMatch {
  const usedTemplates = loadUsedTemplates();
  const sitesDir = join(process.cwd(), "sites");

  // Get all available reference templates
  const templates = readdirSync(sitesDir)
    .filter((d) => d.startsWith("_reference-"))
    .filter((d) => existsSync(join(sitesDir, d, "app", "page.tsx")));

  let bestMatch: TemplateMatch = { slug: templates[0], score: -100, sections: [] };

  for (const slug of templates) {
    const vibes = TEMPLATE_VIBES[slug] || [];
    let score = 0;

    // 1. Vibe overlap (max ~12 points)
    for (const tv of vibes) {
      if (tv === vibe.primary) score += 3;
      else if (tv === vibe.secondary) score += 2;
      else if (tv === vibe.tertiary) score += 1;
      else if ((vibe.scores[tv] || 0) > 0) score += 0.5;
    }

    // 2. Category boost (+3 for known good matches)
    const categoryKey = business.category.toLowerCase();
    const boosts = CATEGORY_BOOSTS[categoryKey] || [];
    if (boosts.includes(slug)) score += 3;

    // 3. Industry mismatch penalty (-4 for wrong industry)
    const industries = INDUSTRY_TEMPLATES[slug];
    if (industries) {
      const matches = industries.some(
        (ind) =>
          categoryKey.includes(ind) || ind.includes(categoryKey),
      );
      if (!matches) score -= 4;
    }

    // 4. Dedup penalty
    const sameCategoryUses = usedTemplates.filter(
      (u) => u.template === slug && u.category === business.category,
    ).length;
    score -= sameCategoryUses * 5;

    const anyUses = usedTemplates.filter((u) => u.template === slug).length;
    score -= anyUses * 1;

    // 5. Avoid overly complex templates for simple businesses
    try {
      const pagePath = join(sitesDir, slug, "app", "page.tsx");
      const lines = readFileSync(pagePath, "utf-8").split("\n").length;
      if (lines > 1200) score -= 1; // Very large templates are harder to adapt
    } catch { /* skip */ }

    const sections = detectSections(slug);

    if (score > bestMatch.score) {
      bestMatch = { slug, score, sections };
    }
  }

  console.log(`  Selected template: ${bestMatch.slug} (score: ${bestMatch.score})`);
  return bestMatch;
}

export function saveUsedTemplate(
  businessSlug: string,
  templateSlug: string,
  category: string,
): void {
  const fp = join(process.cwd(), "data", "used-templates.json");
  const existing = loadUsedTemplates();
  // Remove previous entry for this business if re-generating
  const filtered = existing.filter((e) => e.slug !== businessSlug);
  filtered.push({
    slug: businessSlug,
    template: templateSlug,
    category,
  });
  const { writeFileSync } = require("fs");
  writeFileSync(fp, JSON.stringify(filtered, null, 2));
}
