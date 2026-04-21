/**
 * Section Registry — runtime loader, scorer, and selector.
 *
 * Used by the creative director to pick the best matching section
 * implementations from the registry for a given business.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { SectionRegistry, SectionRegistryEntry } from "./types";
import type { VibeProfile } from "./types";

let cachedRegistry: SectionRegistry | null = null;

export function loadRegistry(): SectionRegistry {
  if (cachedRegistry) return cachedRegistry;

  const registryPath = join(process.cwd(), "data", "section-registry.json");
  if (!existsSync(registryPath)) {
    // Fall back to draft if enriched version doesn't exist yet
    const draftPath = join(
      process.cwd(),
      "data",
      "section-registry-draft.json",
    );
    if (!existsSync(draftPath)) {
      return { version: "0", lastUpdated: "", entries: [] };
    }
    cachedRegistry = JSON.parse(readFileSync(draftPath, "utf-8"));
    return cachedRegistry!;
  }

  cachedRegistry = JSON.parse(readFileSync(registryPath, "utf-8"));
  return cachedRegistry!;
}

/**
 * Score a section entry against a business's vibe profile and category.
 */
function scoreEntry(
  entry: SectionRegistryEntry,
  vibeProfile: [string, string, string],
  businessCategory: string,
): number {
  let score = 0;

  // Vibe overlap scoring (primary = 3pts, secondary = 2pts, tertiary = 1pt)
  const vibeWeights = [3, 2, 1];
  for (let i = 0; i < vibeProfile.length; i++) {
    if (entry.vibes.includes(vibeProfile[i])) {
      score += vibeWeights[i];
    }
  }

  // Business type affinity — boost entries from similar business categories
  const categoryAffinities: Record<string, string[]> = {
    restaurant: ["restaurant-dark", "bamzi", "etery"],
    cafe: ["dark-immersive", "bamzi", "restaurant-dark"],
    plumber: [
      "bold-stats",
      "trades-clean",
      "clean-services",
      "handyman",
      "heatfix",
    ],
    electrician: [
      "bold-stats",
      "trades-clean",
      "clean-services",
      "handyman",
      "heatfix",
    ],
    contractor: ["bold-stats", "trades-clean", "handyman", "heatfix"],
    salon: ["warm-editorial", "pilates", "wellness-glass"],
    spa: ["wellness-glass", "warm-editorial", "forest-therapy"],
    therapist: ["therapy", "forest-therapy", "wellness-glass"],
    consultant: ["agevia", "mobius", "marketing", "etery"],
    agency: ["mobius", "marketing", "ehunter", "dreelio"],
    realEstate: ["real-estate", "realdev", "luxerra"],
    hotel: ["hotel", "yachtera", "luxerra"],
    gym: ["pilates", "wellness-glass"],
    camp: ["kids-camp", "forest-therapy"],
  };

  const affineSources = categoryAffinities[businessCategory] || [];
  const entrySourceShort = entry.source.replace("_reference-", "");
  if (affineSources.includes(entrySourceShort)) {
    score += 2;
  }

  // Complexity bonus — prefer medium complexity (most versatile)
  if (entry.complexity === "medium") score += 1;
  if (entry.complexity === "complex") score += 0.5;

  return score;
}

/**
 * Select the best section implementations for a business.
 *
 * Returns 1-2 sections per requested section type, staying within the token budget.
 * The creative director uses these as starting-point examples in its prompt.
 */
export function selectSections(
  vibe: VibeProfile,
  businessCategory: string,
  neededSectionTypes: string[],
  options: {
    tokenBudget?: number; // Max total tokens for all section code (~3 tokens/line)
    maxPerType?: number; // Max sections to return per type
    excludeSources?: string[]; // Exclude specific reference sites
  } = {},
): SectionRegistryEntry[] {
  const { tokenBudget = 10000, maxPerType = 3, excludeSources = [] } = options;

  const registry = loadRegistry();
  if (registry.entries.length === 0) return [];

  const vibeProfile: [string, string, string] = [
    vibe.primary,
    vibe.secondary,
    vibe.tertiary,
  ];
  const selected: SectionRegistryEntry[] = [];
  let totalTokens = 0;

  for (const sectionType of neededSectionTypes) {
    // Get candidates of this type
    const candidates = registry.entries
      .filter((e) => e.sectionType === sectionType)
      .filter((e) => !excludeSources.includes(e.source))
      // Don't include super short sections (likely just component wrappers)
      .filter((e) => e.linesOfCode >= 10);

    if (candidates.length === 0) continue;

    // Score and sort
    const scored = candidates
      .map((e) => ({
        entry: e,
        score: scoreEntry(e, vibeProfile, businessCategory),
      }))
      .sort((a, b) => b.score - a.score);

    // Pick top entries within budget
    let picked = 0;
    for (const { entry } of scored) {
      if (picked >= maxPerType) break;

      const tokenEstimate = entry.linesOfCode * 3;
      if (totalTokens + tokenEstimate > tokenBudget) continue;

      selected.push(entry);
      totalTokens += tokenEstimate;
      picked++;
    }
  }

  return selected;
}

/**
 * Format selected sections for inclusion in the creative director prompt.
 */
export function formatSectionsForPrompt(
  sections: SectionRegistryEntry[],
): string {
  if (sections.length === 0) {
    return "No section references available — use your best creative judgment and the component library.";
  }

  // Group by section type
  const byType = new Map<string, SectionRegistryEntry[]>();
  for (const section of sections) {
    const existing = byType.get(section.sectionType) || [];
    existing.push(section);
    byType.set(section.sectionType, existing);
  }

  const parts: string[] = [];
  const types = Array.from(byType.keys());
  for (const type of types) {
    const entries = byType.get(type)!;
    const label = type.charAt(0).toUpperCase() + type.slice(1);
    parts.push(`### ${label} Section Examples`);

    for (const entry of entries) {
      const header = `**${entry.name}** (from ${entry.source}, ${entry.complexity})`;
      const desc = entry.description ? `\n${entry.description}` : "";
      parts.push(`${header}${desc}\n\`\`\`tsx\n${entry.code}\n\`\`\``);
    }
  }

  return parts.join("\n\n");
}
