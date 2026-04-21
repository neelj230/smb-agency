/**
 * No-Website Prospecting Batch
 *
 * Targets categories where solo/mom-and-pop operators often skip websites.
 * TIER_A_ONLY=1 means we ONLY capture businesses with no website at all.
 *
 * Usage: npx tsx scripts/run-no-website-batch.ts
 */

import { spawnSync } from "child_process";
import { join } from "path";

const OUTPUT_CSV = join(process.cwd(), "data", "no-website-prospects.csv");

// Categories chosen for low website penetration + willingness to pay.
// Mix of small/mid cities (less saturated) and trades that skew phone-only.
const targets: Array<{ city: string; category: string }> = [
  // Home/mobile services — often phone + word-of-mouth
  { city: "Philadelphia, PA", category: "mobile dog groomer" },
  { city: "Houston, TX", category: "handyman" },
  { city: "Phoenix, AZ", category: "mobile mechanic" },
  { city: "Chicago, IL", category: "house cleaner" },
  { city: "Detroit, MI", category: "appliance repair" },
  { city: "Cleveland, OH", category: "locksmith" },
  { city: "Memphis, TN", category: "junk removal" },

  // Solo specialty — one-person shops
  { city: "Brooklyn, NY", category: "tailor" },
  { city: "Philadelphia, PA", category: "shoe repair" },
  { city: "Baltimore, MD", category: "piano tuner" },
  { city: "Pittsburgh, PA", category: "knife sharpening" },
  { city: "Richmond, VA", category: "watch repair" },

  // Old-school trades
  { city: "New Orleans, LA", category: "upholstery shop" },
  { city: "Kansas City, MO", category: "small engine repair" },
  { city: "St. Louis, MO", category: "blacksmith" },
  { city: "Milwaukee, WI", category: "cobbler" },

  // Neighborhood food (family-owned, often no site)
  { city: "Houston, TX", category: "taqueria" },
  { city: "Los Angeles, CA", category: "halal butcher" },
  { city: "Philadelphia, PA", category: "cheesesteak shop" },
  { city: "Queens, NY", category: "dim sum restaurant" },
  { city: "San Antonio, TX", category: "panaderia" },
  { city: "Newark, NJ", category: "portuguese bakery" },

  // Personal services — often word-of-mouth
  { city: "Detroit, MI", category: "barber shop" },
  { city: "Memphis, TN", category: "nail salon" },
  { city: "Birmingham, AL", category: "braiding salon" },
  { city: "Jackson, MS", category: "barber" },
  { city: "Cleveland, OH", category: "mobile barber" },

  // Home-based / niche
  { city: "Atlanta, GA", category: "home baker" },
  { city: "Portland, OR", category: "personal chef" },
  { city: "Tucson, AZ", category: "pet sitter" },
  { city: "Albuquerque, NM", category: "music teacher" },
  { city: "Boise, ID", category: "dog trainer" },
  { city: "Spokane, WA", category: "house painter" },
  { city: "Fresno, CA", category: "lawn care" },

  // Event / creative solos
  { city: "Savannah, GA", category: "mobile DJ" },
  { city: "Charleston, SC", category: "wedding officiant" },
  { city: "Nashville, TN", category: "mobile bartender" },
  { city: "Tulsa, OK", category: "face painter" },
  { city: "Omaha, NE", category: "magician for hire" },

  // Trades — solo operators
  { city: "Buffalo, NY", category: "chimney sweep" },
  { city: "Rochester, NY", category: "gutter cleaning" },
  { city: "Toledo, OH", category: "pressure washing" },
  { city: "Akron, OH", category: "snow plowing" },
  { city: "Wichita, KS", category: "tree service" },
  { city: "Louisville, KY", category: "fence repair" },
];

async function main() {
  console.log(`\n🎯 No-website batch — ${targets.length} searches`);
  console.log(`📂 Output: ${OUTPUT_CSV}`);
  console.log(`🚨 TIER_A_ONLY: skipping all businesses with any website\n`);

  for (const [i, t] of targets.entries()) {
    console.log(`\n━━━ [${i + 1}/${targets.length}] ${t.category} / ${t.city} ━━━`);
    const result = spawnSync(
      "npx",
      ["tsx", "scripts/prospect.ts", t.city, t.category],
      {
        stdio: "inherit",
        env: { ...process.env, OUTPUT_CSV, TIER_A_ONLY: "1" },
      },
    );
    if (result.status !== 0) {
      console.error(`⚠️  Search failed for ${t.category} in ${t.city}`);
    }
  }

  console.log(`\n✅ Done. Review ${OUTPUT_CSV}`);
}

main().catch(console.error);
