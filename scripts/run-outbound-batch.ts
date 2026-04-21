/**
 * Outbound Prospecting Batch
 *
 * Runs prospect.ts across a matrix of (city, category) pairs targeting
 * higher-budget ICPs where a good website drives real revenue.
 *
 * Only captures Tier A (no website) and Tier B (score <40).
 * Writes to data/outbound-prospects.csv (separate from sites-built history).
 *
 * Usage: npx tsx scripts/run-outbound-batch.ts
 */

import { spawnSync } from "child_process";
import { join } from "path";

const OUTPUT_CSV = join(process.cwd(), "data", "outbound-prospects.csv");

// ICP matrix — chosen for high website→revenue conversion and willingness to pay.
const targets: Array<{ city: string; category: string }> = [
  // Law — trust industry, high LTV per client
  { city: "Austin, TX", category: "family law firm" },
  { city: "Nashville, TN", category: "personal injury attorney" },

  // Med spa / aesthetic — visual industry, competitors all have nice sites
  { city: "Scottsdale, AZ", category: "med spa" },
  { city: "Denver, CO", category: "botox clinic" },
  { city: "San Diego, CA", category: "aesthetic clinic" },

  // Wedding vendors — 100% of sales come from portfolio/site
  { city: "Austin, TX", category: "wedding photographer" },
  { city: "Nashville, TN", category: "wedding venue" },
  { city: "Portland, OR", category: "wedding florist" },

  // Dental (cosmetic) — image-driven
  { city: "San Diego, CA", category: "cosmetic dentist" },

  // Home services w/ $10k+ tickets
  { city: "Denver, CO", category: "roofing contractor" },
  { city: "Austin, TX", category: "custom home builder" },

  // Interior design — visual portfolio
  { city: "Scottsdale, AZ", category: "interior designer" },

  // Boutique fitness — community-driven, recurring revenue
  { city: "Portland, OR", category: "yoga studio" },
  { city: "Nashville, TN", category: "pilates studio" },

  // Additional high-intent ICPs
  { city: "Miami, FL", category: "med spa" },
  { city: "Miami, FL", category: "plastic surgeon" },
  { city: "Charleston, SC", category: "wedding planner" },
  { city: "Charleston, SC", category: "boutique hotel" },
  { city: "Chicago, IL", category: "cosmetic dentist" },
  { city: "Chicago, IL", category: "chiropractor" },
  { city: "Austin, TX", category: "cosmetic dentist" },
  { city: "Dallas, TX", category: "med spa" },
  { city: "Atlanta, GA", category: "personal injury attorney" },
  { city: "Seattle, WA", category: "interior designer" },
  { city: "Los Angeles, CA", category: "wedding photographer" },
  { city: "Brooklyn, NY", category: "tattoo studio" },
  { city: "Phoenix, AZ", category: "luxury landscaping" },
  { city: "Houston, TX", category: "CPA firm" },
];

async function main() {
  console.log(`\n🎯 Outbound batch — ${targets.length} searches`);
  console.log(`📂 Output: ${OUTPUT_CSV}\n`);

  for (const [i, t] of targets.entries()) {
    console.log(`\n━━━ [${i + 1}/${targets.length}] ${t.category} / ${t.city} ━━━`);
    const result = spawnSync(
      "npx",
      ["tsx", "scripts/prospect.ts", t.city, t.category],
      {
        stdio: "inherit",
        env: { ...process.env, OUTPUT_CSV },
      },
    );
    if (result.status !== 0) {
      console.error(`⚠️  Search failed for ${t.category} in ${t.city}`);
    }
  }

  console.log(`\n✅ Done. Review ${OUTPUT_CSV}`);
}

main().catch(console.error);
