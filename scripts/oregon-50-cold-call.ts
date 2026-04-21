/**
 * Oregon Cold Call List Generator
 *
 * Finds 50 Oregon businesses without websites across categories most likely
 * to want one (visual/service businesses where a site drives leads).
 *
 * Dedupes against all existing prospect CSVs in data/.
 * Writes data/oregon-50-cold-call.csv.
 *
 * Usage: node --env-file=.env node_modules/tsx/dist/cli.mjs scripts/oregon-50-cold-call.ts
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("GOOGLE_PLACES_API_KEY not set");
  process.exit(1);
}

const TARGET = 50;
const OUTPUT_PATH = join(process.cwd(), "data", "oregon-50-cold-call.csv");

// Cities chosen for population + demand for services
const CITIES = [
  "Portland, Oregon",
  "Salem, Oregon",
  "Eugene, Oregon",
  "Bend, Oregon",
  "Hillsboro, Oregon",
  "Beaverton, Oregon",
  "Gresham, Oregon",
  "Medford, Oregon",
  "Springfield, Oregon",
  "Corvallis, Oregon",
  "Tigard, Oregon",
  "Lake Oswego, Oregon",
  "Albany, Oregon",
  "Grants Pass, Oregon",
  "McMinnville, Oregon",
  "Oregon City, Oregon",
  "Redmond, Oregon",
  "Newberg, Oregon",
  "Ashland, Oregon",
  "Tualatin, Oregon",
];

// Categories where a website directly drives bookings/leads.
// Skips pure retail (where Google/Yelp suffice) and anything over-saturated in existing CSVs.
const CATEGORIES = [
  "landscaper",
  "tree service",
  "roofing contractor",
  "fence contractor",
  "painting contractor",
  "pressure washing",
  "handyman",
  "house cleaning service",
  "window cleaning",
  "auto detailing",
  "mobile auto detailing",
  "photographer",
  "wedding photographer",
  "med spa",
  "personal trainer",
  "dog trainer",
  "catering",
  "massage therapist",
  "tattoo parlor",
  "barber shop",
  "nail salon",
  "lash studio",
  "yoga studio",
  "pilates studio",
  "chiropractor",
  "tax preparation",
  "bookkeeping service",
  "general contractor",
  "kitchen remodeler",
  "bathroom remodeler",
];

interface PlaceResult {
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: { photo_reference: string }[];
  place_id: string;
  business_status?: string;
}

interface Prospect {
  business_name: string;
  category: string;
  source_city: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  website_url: string;
  website_score: number;
  google_rating: number;
  review_count: number;
  photo_count: number;
  priority_tier: string;
  status: string;
  preview_url: string;
  outreach_status: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/** Load dedup keys (name|address lowercased) from all known prospect CSVs. */
function loadExistingKeys(): Set<string> {
  const keys = new Set<string>();
  const csvs = [
    "spreadsheet.csv",
    "oregon-batch-60-no-websites.csv",
    "oregon-batch-60.csv",
    "no-website-prospects.csv",
    "outbound-prospects.csv",
    "prospects-review.csv",
  ];
  for (const csv of csvs) {
    const path = join(process.cwd(), "data", csv);
    if (!existsSync(path)) continue;
    const content = readFileSync(path, "utf-8");
    const lines = content.split("\n").slice(1);
    for (const line of lines) {
      if (!line.trim()) continue;
      const cols = parseCsvLine(line);
      // Try to find name + address heuristically
      // Most CSVs: col 0 = name. Address is col 3 or 4.
      const name = (cols[0] || "").trim().toLowerCase();
      if (!name) continue;
      // Try col 3 first (spreadsheet.csv), then col 4 (oregon-batch-60)
      for (const addrIdx of [3, 4]) {
        const addr = (cols[addrIdx] || "").trim().toLowerCase();
        if (addr) keys.add(`${name}|${addr}`);
      }
      keys.add(name);
    }
  }
  return keys;
}

async function textSearch(query: string): Promise<PlaceResult[]> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    console.error(`  ! API error ${data.status}: ${data.error_message || ""}`);
    return [];
  }
  return data.results || [];
}

async function getDetails(placeId: string): Promise<PlaceResult | null> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,photos,business_status&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK") return null;
  return { ...data.result, place_id: placeId };
}

async function main() {
  console.log(`\nTarget: ${TARGET} Oregon businesses without websites`);
  console.log(`Cities: ${CITIES.length}, Categories: ${CATEGORIES.length}\n`);

  const existing = loadExistingKeys();
  console.log(`Loaded ${existing.size} existing dedup keys\n`);

  const prospects: Prospect[] = [];
  const seenThisRun = new Set<string>();

  // Interleave: for each category, rotate cities, to get variety.
  outer: for (const category of CATEGORIES) {
    for (const city of CITIES) {
      if (prospects.length >= TARGET) break outer;

      const query = `${category} in ${city}`;
      process.stdout.write(`[${prospects.length}/${TARGET}] ${query}`);

      const results = await textSearch(query);
      process.stdout.write(` — ${results.length} results\n`);

      for (const r of results) {
        if (prospects.length >= TARGET) break;

        // Quick filter: skip if text search result already shows a website-ish field
        // (we'll confirm via details, but save the API call if obviously chain/huge)
        if ((r as any).user_ratings_total && (r as any).user_ratings_total > 500) {
          continue; // likely chain / too big
        }

        const details = await getDetails(r.place_id);
        if (!details) continue;
        if (details.business_status && details.business_status !== "OPERATIONAL") continue;

        // MUST have no website to qualify
        if (details.website && details.website.trim().length > 0) continue;

        const name = (details.name || "").trim();
        const address = (details.formatted_address || "").trim();
        if (!name || !address) continue;

        // Must be in Oregon
        if (!/, OR \d{5}/.test(address)) continue;

        // Must have a phone (for cold calling)
        const phone = (details.formatted_phone_number || "").trim();
        if (!phone) continue;

        // Dedup
        const nameKey = name.toLowerCase();
        const fullKey = `${nameKey}|${address.toLowerCase()}`;
        if (existing.has(fullKey) || existing.has(nameKey)) continue;
        if (seenThisRun.has(nameKey)) continue;
        seenThisRun.add(nameKey);

        // Must have at least some traction (reviews) — signals real business
        const reviewCount = details.user_ratings_total || 0;
        if (reviewCount < 5) continue;

        const prospect: Prospect = {
          business_name: name,
          category,
          source_city: city,
          slug: slugify(name),
          address,
          phone,
          email: "",
          website_url: "",
          website_score: 0,
          google_rating: details.rating || 0,
          review_count: reviewCount,
          photo_count: details.photos?.length || 0,
          priority_tier: "A",
          status: "new",
          preview_url: "",
          outreach_status: "not_contacted",
        };

        prospects.push(prospect);
        console.log(
          `  ✓ [${prospects.length}] ${name} — ${reviewCount} reviews, ${prospect.google_rating}★`,
        );

        await new Promise((r) => setTimeout(r, 50));
      }
    }
  }

  // Sort by review count desc (best social proof first)
  prospects.sort((a, b) => b.review_count - a.review_count);

  // Write CSV
  const headers =
    "business_name,category,source_city,slug,address,phone,email,website_url,website_score,google_rating,review_count,photo_count,priority_tier,status,preview_url,outreach_status";
  const rows = prospects.map((p) =>
    [
      escapeCSV(p.business_name),
      escapeCSV(p.category),
      escapeCSV(p.source_city),
      escapeCSV(p.slug),
      escapeCSV(p.address),
      escapeCSV(p.phone),
      escapeCSV(p.email),
      escapeCSV(p.website_url),
      p.website_score,
      p.google_rating,
      p.review_count,
      p.photo_count,
      p.priority_tier,
      p.status,
      escapeCSV(p.preview_url),
      p.outreach_status,
    ].join(","),
  );
  writeFileSync(OUTPUT_PATH, headers + "\n" + rows.join("\n") + "\n");

  console.log(`\n\n✓ Wrote ${prospects.length} prospects → ${OUTPUT_PATH}`);
  console.log(`\nBy category:`);
  const byCat: Record<string, number> = {};
  for (const p of prospects) byCat[p.category] = (byCat[p.category] || 0) + 1;
  for (const [cat, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${n.toString().padStart(2)} ${cat}`);
  }
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
