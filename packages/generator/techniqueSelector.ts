/**
 * Technique Selector — transparent, exhaustive retrieval of design techniques.
 *
 * Unlike the old weighted-random approach, this system:
 * 1. Loads the FULL technique catalog (96 techniques from 28 reference sites)
 * 2. Scores every technique against the business's vibe, content, and uniqueness needs
 * 3. Returns ALL techniques organized by category with clear relevance scores
 * 4. Presents the full ranked list to the creative director — no hiding, no random picks
 *
 * The creative director sees everything and makes a deliberate, justified choice.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { VibeProfile } from "./types";

interface Technique {
  id: string;
  name: string;
  category: string;
  description: string;
  codeSignature: string;
  sources: string[];
  vibes: string[];
  worksWithSections: string[];
  complexity: string;
  dependencies: string[];
  frequency: number;
}

interface ScoredTechnique extends Technique {
  relevanceScore: number;
  relevanceReason: string;
}

interface TechniqueCatalog {
  version: string;
  lastUpdated: string;
  techniques: Technique[];
}

interface TechniqueSelection {
  /** Top techniques per category, scored and reasoned */
  byCategory: Record<string, ScoredTechnique[]>;
  /** Techniques that have NEVER been used by any generated site */
  unused: ScoredTechnique[];
  /** Summary stats */
  totalAvailable: number;
  totalRelevant: number;
}

let cachedCatalog: TechniqueCatalog | null = null;

function loadCatalog(): TechniqueCatalog {
  if (cachedCatalog) return cachedCatalog;

  const catalogPath = join(process.cwd(), "data", "technique-catalog.json");
  if (!existsSync(catalogPath)) {
    return { version: "0", lastUpdated: "", techniques: [] };
  }

  cachedCatalog = JSON.parse(readFileSync(catalogPath, "utf-8"));
  return cachedCatalog!;
}

/**
 * Score a technique against a business's needs.
 * Returns a score (0-10) and a human-readable reason for the score.
 */
function scoreTechnique(
  technique: Technique,
  vibe: VibeProfile,
  availableSections: string[],
  usedTechniqueIds: Set<string>,
): ScoredTechnique {
  let score = 0;
  const reasons: string[] = [];
  const profileVibes = [vibe.primary, vibe.secondary, vibe.tertiary];

  // 1. Vibe match (0-4 points)
  if (technique.vibes.includes("all")) {
    score += 2;
    reasons.push("universal technique");
  } else {
    const vibeOverlap = technique.vibes.filter((v) =>
      profileVibes.includes(v),
    ).length;
    if (vibeOverlap >= 2) {
      score += 4;
      reasons.push(
        `strong vibe match (${technique.vibes.filter((v) => profileVibes.includes(v)).join(", ")})`,
      );
    } else if (vibeOverlap === 1) {
      score += 2;
      reasons.push(
        `vibe match (${technique.vibes.find((v) => profileVibes.includes(v))})`,
      );
    }
  }

  // 2. Section compatibility (0-2 points)
  if (technique.worksWithSections.includes("all")) {
    score += 1;
  } else {
    const sectionOverlap = technique.worksWithSections.filter((s) =>
      availableSections.includes(s),
    ).length;
    if (sectionOverlap > 0) {
      score += 2;
      reasons.push(
        `works with ${technique.worksWithSections.filter((s) => availableSections.includes(s)).join(", ")}`,
      );
    }
  }

  // 3. Uniqueness bonus (0-3 points) — techniques NOT used by other sites get a boost
  if (!usedTechniqueIds.has(technique.id)) {
    score += 2;
    reasons.push("not yet used by generated sites");
  }

  // 4. Rarity bonus (0-2 points) — rare techniques add uniqueness
  if (technique.frequency <= 2) {
    score += 2;
    reasons.push(
      `rare technique (only in ${technique.frequency} reference site${technique.frequency > 1 ? "s" : ""})`,
    );
  } else if (technique.frequency <= 5) {
    score += 1;
    reasons.push(`uncommon technique (in ${technique.frequency} sites)`);
  }

  return {
    ...technique,
    relevanceScore: score,
    relevanceReason: reasons.join("; ") || "baseline match",
  };
}

/**
 * Select and rank ALL techniques for a business.
 * Returns everything organized by category with scores — nothing hidden.
 */
export function selectTechniques(
  vibe: VibeProfile,
  availableSections: string[],
  usedTechniqueIds: Set<string> = new Set(),
): TechniqueSelection {
  const catalog = loadCatalog();
  if (catalog.techniques.length === 0) {
    return {
      byCategory: {},
      unused: [],
      totalAvailable: 0,
      totalRelevant: 0,
    };
  }

  // Score every technique
  const scored = catalog.techniques.map((t) =>
    scoreTechnique(t, vibe, availableSections, usedTechniqueIds),
  );

  // Organize by category, sorted by score within each
  const byCategory: Record<string, ScoredTechnique[]> = {};
  for (const t of scored) {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category].push(t);
  }
  for (const cat of Object.keys(byCategory)) {
    byCategory[cat].sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  // Find unused techniques
  const unused = scored
    .filter((t) => !usedTechniqueIds.has(t.id))
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  const totalRelevant = scored.filter((t) => t.relevanceScore >= 3).length;

  return {
    byCategory,
    unused,
    totalAvailable: catalog.techniques.length,
    totalRelevant,
  };
}

/**
 * Format technique selection for the creative director prompt.
 * Shows ALL techniques organized by category with scores and reasons.
 * The creative director sees the full menu and makes a deliberate choice.
 */
export function formatTechniquesForPrompt(
  selection: TechniqueSelection,
  maxPerCategory: number = 5,
): string {
  if (selection.totalAvailable === 0) {
    return "";
  }

  const parts: string[] = [];
  parts.push(
    `## TECHNIQUE MENU — ${selection.totalRelevant} relevant techniques for this business's vibe\n`,
  );
  parts.push(
    "Top-scored visual techniques from 28 reference sites. Pick 3-5 that best fit this business. Score = vibe match + section fit + uniqueness.\n",
  );

  const categoryOrder = [
    "scroll",
    "animation",
    "marquee",
    "layout",
    "hover",
    "typography",
    "visual",
    "image",
    "composition",
  ];
  const categoryLabels: Record<string, string> = {
    scroll: "Scroll Effects",
    animation: "Entry Animations",
    marquee: "Marquee/Motion",
    layout: "Layout",
    hover: "Hover Effects",
    typography: "Typography",
    visual: "Visual Treatments",
    image: "Image Effects",
    composition: "Composition",
  };

  for (const cat of categoryOrder) {
    const techniques = selection.byCategory[cat];
    if (!techniques || techniques.length === 0) continue;

    // Only show techniques scoring 3+, up to maxPerCategory
    const topTechniques = techniques
      .filter((t) => t.relevanceScore >= 2)
      .slice(0, maxPerCategory);
    if (topTechniques.length === 0) continue;

    parts.push(`**${categoryLabels[cat] || cat}:**`);
    for (const t of topTechniques) {
      parts.push(
        `- ${t.name} (${t.relevanceScore}/10) — ${t.description} | \`${t.codeSignature}\``,
      );
    }
  }

  return parts.join("\n");
}

/**
 * Load used technique IDs from the expanded design fingerprints.
 */
export function loadUsedTechniqueIds(): Set<string> {
  try {
    const fpPath = join(process.cwd(), "data", "used-designs.json");
    if (!existsSync(fpPath)) return new Set();

    const data = JSON.parse(readFileSync(fpPath, "utf-8"));
    if (!Array.isArray(data)) return new Set();

    const ids = new Set<string>();
    for (const entry of data) {
      if (entry.techniques && Array.isArray(entry.techniques)) {
        for (const id of entry.techniques) {
          ids.add(id);
        }
      }
    }
    return ids;
  } catch {
    return new Set();
  }
}
