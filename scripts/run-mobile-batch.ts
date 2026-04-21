/**
 * Mobile-Friendly Prospecting Batch
 *
 * Targets solo-operator categories where the listed phone number is very
 * likely a personal mobile (and therefore iMessage-reachable). Appends to
 * data/spreadsheet.csv via scripts/prospect.ts.
 *
 * Usage: npx tsx scripts/run-mobile-batch.ts
 */

import { spawnSync } from "child_process";

const targets: Array<{ city: string; category: string }> = [
  // Philadelphia — primary metro
  { city: "Philadelphia", category: "mobile mechanic" },
  { city: "Philadelphia", category: "mobile car detailing" },
  { city: "Philadelphia", category: "mobile pet groomer" },
  { city: "Philadelphia", category: "wedding photographer" },
  { city: "Philadelphia", category: "personal trainer" },
  { city: "Philadelphia", category: "makeup artist" },
  { city: "Philadelphia", category: "dog walker" },
  { city: "Philadelphia", category: "dog trainer" },
  { city: "Philadelphia", category: "house cleaner" },
  { city: "Philadelphia", category: "piano teacher" },
  { city: "Philadelphia", category: "guitar teacher" },
  { city: "Philadelphia", category: "mobile notary" },
  { city: "Philadelphia", category: "mobile dj" },
  { city: "Philadelphia", category: "massage therapist" },
  { city: "Philadelphia", category: "personal chef" },
  { city: "Philadelphia", category: "power washing" },
  { city: "Philadelphia", category: "tutor" },

  // Nearby suburbs — more mobile-number-friendly than city core
  { city: "Cherry Hill, NJ", category: "mobile mechanic" },
  { city: "King of Prussia, PA", category: "personal trainer" },
  { city: "Ardmore, PA", category: "wedding photographer" },
];

async function main() {
  console.log(`\n📱 Mobile-friendly batch — ${targets.length} searches`);
  console.log(`📂 Output: data/spreadsheet.csv\n`);

  for (const [i, t] of targets.entries()) {
    console.log(
      `\n━━━ [${i + 1}/${targets.length}] ${t.category} / ${t.city} ━━━`,
    );
    const result = spawnSync(
      "npx",
      ["tsx", "scripts/prospect.ts", t.city, t.category],
      { stdio: "inherit", env: { ...process.env } },
    );
    if (result.status !== 0) {
      console.error(`⚠️  Search failed for ${t.category} in ${t.city}`);
    }
  }

  console.log(`\n✅ Prospecting batch complete.`);
}

main().catch(console.error);
