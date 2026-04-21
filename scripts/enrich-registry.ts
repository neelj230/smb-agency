/**
 * Section Registry Enrichment
 *
 * Reads section-registry-draft.json and uses Claude to tag each entry
 * with vibes, description, and visual traits.
 *
 * Usage: npx tsx scripts/enrich-registry.ts [--batch-size 20]
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type {
  SectionRegistry,
  SectionRegistryEntry,
} from "../packages/generator/types";

const ROOT = join(__dirname, "..");
const DRAFT_PATH = join(ROOT, "data", "section-registry-draft.json");
const OUTPUT_PATH = join(ROOT, "data", "section-registry.json");

const VIBE_OPTIONS = [
  "warm",
  "bold",
  "premium",
  "elegant",
  "minimal",
  "clean",
  "creative",
  "playful",
  "professional",
  "trustworthy",
  "personal",
  "immersive",
  "dark",
  "cinematic",
  "editorial",
  "modern",
  "direct",
  "fun",
  "industrial",
  "luxury",
  "serene",
  "energetic",
];

const TRAIT_OPTIONS = [
  "dark-bg",
  "light-bg",
  "gradient-bg",
  "full-bleed",
  "split-layout",
  "grid-layout",
  "card-based",
  "accordion",
  "carousel",
  "marquee",
  "scroll-animation",
  "parallax",
  "sticky",
  "fade-in",
  "stagger",
  "zoom",
  "blur-reveal",
  "counter-animation",
  "hover-effect",
  "editorial-typography",
  "large-text",
  "serif",
  "monospace",
  "image-heavy",
  "minimal-text",
  "interactive",
  "video-bg",
  "glass-effect",
  "border-accent",
  "icon-based",
  "numbered",
  "timeline",
  "comparison",
  "pricing-table",
  "form",
];

async function enrichEntries(
  entries: SectionRegistryEntry[],
  batchSize: number,
): Promise<SectionRegistryEntry[]> {
  const client = new Anthropic();
  const enriched: SectionRegistryEntry[] = [];

  // Process in batches to reduce API calls
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    console.log(
      `Enriching batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(entries.length / batchSize)} (${batch.length} entries)...`,
    );

    const prompt = `You are tagging UI sections extracted from Framer-quality websites for a section registry.

For each section below, provide:
1. description: 1-2 sentences describing the visual effect and layout
2. vibes: 2-5 tags from: ${VIBE_OPTIONS.join(", ")}
3. visualTraits: 3-6 tags from: ${TRAIT_OPTIONS.join(", ")}

Respond as a JSON array matching the input order. Each element: { "description": "...", "vibes": [...], "visualTraits": [...] }

${batch
  .map(
    (
      entry,
      idx,
    ) => `--- SECTION ${idx + 1}: ${entry.name} (${entry.sectionType}, from ${entry.source}) ---
\`\`\`tsx
${entry.code.substring(0, 800)}${entry.code.length > 800 ? "\n// ... truncated" : ""}
\`\`\``,
  )
  .join("\n\n")}`;

    try {
      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";

      // Extract JSON array from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const tags = JSON.parse(jsonMatch[0]);
        for (let j = 0; j < batch.length; j++) {
          const entry = { ...batch[j] };
          if (tags[j]) {
            entry.description = tags[j].description || entry.description;
            entry.vibes = tags[j].vibes || entry.vibes;
            entry.visualTraits = tags[j].visualTraits || entry.visualTraits;
          }
          enriched.push(entry);
        }
      } else {
        // Fallback: keep entries without enrichment
        console.warn(
          `  Warning: Could not parse response for batch ${Math.floor(i / batchSize) + 1}`,
        );
        enriched.push(...batch);
      }
    } catch (err: any) {
      console.error(`  Error enriching batch: ${err.message}`);
      enriched.push(...batch);
    }

    // Small delay between batches to avoid rate limits
    if (i + batchSize < entries.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return enriched;
}

async function main() {
  const args = process.argv.slice(2);
  const batchSize = args.includes("--batch-size")
    ? parseInt(args[args.indexOf("--batch-size") + 1], 10)
    : 15;

  console.log(`Loading draft registry from ${DRAFT_PATH}`);
  const draft: SectionRegistry = JSON.parse(readFileSync(DRAFT_PATH, "utf-8"));
  console.log(
    `Found ${draft.entries.length} entries to enrich (batch size: ${batchSize})`,
  );

  // Only enrich entries that don't already have vibes
  const needsEnrichment = draft.entries.filter(
    (e) => !e.vibes || e.vibes.length === 0,
  );
  const alreadyEnriched = draft.entries.filter(
    (e) => e.vibes && e.vibes.length > 0,
  );

  console.log(
    `  ${needsEnrichment.length} need enrichment, ${alreadyEnriched.length} already done`,
  );

  const newlyEnriched = await enrichEntries(needsEnrichment, batchSize);
  const allEntries = [...alreadyEnriched, ...newlyEnriched];

  // Sort by source then sectionType for consistency
  allEntries.sort((a, b) => {
    if (a.source !== b.source) return a.source.localeCompare(b.source);
    return a.sectionType.localeCompare(b.sectionType);
  });

  const registry: SectionRegistry = {
    version: "1.0",
    lastUpdated: new Date().toISOString(),
    entries: allEntries,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2), "utf-8");
  console.log(`\n✓ Enriched registry written to ${OUTPUT_PATH}`);
  console.log(`  ${allEntries.length} entries total`);
  console.log(
    `  ${allEntries.filter((e) => e.vibes.length > 0).length} with vibes`,
  );
}

main().catch(console.error);
