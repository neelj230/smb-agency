/**
 * Prospect Discovery Script
 *
 * Queries Google Places API to find SMB prospects in a given city + category.
 * Scores existing websites, flags businesses without sites as high priority.
 * Appends results to data/spreadsheet.csv.
 *
 * Usage: npx tsx scripts/prospect.ts "<city>" "<category>"
 * Example: npx tsx scripts/prospect.ts "Philadelphia" "plumber"
 *
 * Requires: GOOGLE_PLACES_API_KEY in .env
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error("Error: GOOGLE_PLACES_API_KEY not set.");
  console.error("Create a .env file with: GOOGLE_PLACES_API_KEY=your_key_here");
  process.exit(1);
}

const city = process.argv[2];
const category = process.argv[3];

if (!city || !category) {
  console.error('Usage: npx tsx scripts/prospect.ts "<city>" "<category>"');
  console.error(
    'Example: npx tsx scripts/prospect.ts "Philadelphia" "plumber"',
  );
  process.exit(1);
}

const SPREADSHEET_PATH =
  process.env.OUTPUT_CSV || join(process.cwd(), "data", "spreadsheet.csv");
const CSV_HEADERS =
  "business_name,category,slug,address,phone,email,website_url,website_score,google_rating,review_count,photo_count,priority_tier,status,preview_url,outreach_status";

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

/**
 * Search for businesses using Google Places Text Search API
 */
async function searchPlaces(query: string): Promise<PlaceResult[]> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    console.error(
      `Google Places API error: ${data.status}`,
      data.error_message,
    );
    if (data.status === "REQUEST_DENIED") {
      console.error(
        "Check that your API key is valid and has Places API enabled.",
      );
    }
    process.exit(1);
  }

  if (data.status === "ZERO_RESULTS") {
    console.log("No results found for this search.");
    return [];
  }

  // Get detailed info for each result
  const detailed: PlaceResult[] = [];
  for (const result of data.results) {
    const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,photos,business_status&key=${GOOGLE_API_KEY}`;

    const detailRes = await fetch(detailUrl);
    const detailData = await detailRes.json();

    if (detailData.status === "OK") {
      detailed.push({
        ...detailData.result,
        place_id: result.place_id,
      });
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100));
  }

  return detailed;
}

/**
 * Quick website quality score (0-100).
 * Checks if the site loads, basic responsiveness indicators, and modern tech.
 */
async function scoreWebsite(url: string): Promise<number> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SMBAgency/1.0)" },
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!response.ok) return 10;

    const html = await response.text();
    let score = 20; // Base score for loading at all

    // Check for viewport meta tag (mobile responsive indicator)
    if (html.includes("viewport")) score += 15;

    // Check for modern CSS frameworks
    if (
      html.includes("tailwind") ||
      html.includes("bootstrap") ||
      html.includes("flex") ||
      html.includes("grid")
    )
      score += 10;

    // Check for HTTPS
    if (url.startsWith("https")) score += 5;

    // Check for React/Next/Vue (modern framework)
    if (
      html.includes("__next") ||
      html.includes("__nuxt") ||
      html.includes("react") ||
      html.includes("vue")
    )
      score += 15;

    // Check for images (not a placeholder page)
    const imgCount = (html.match(/<img/g) || []).length;
    if (imgCount >= 3) score += 10;

    // Check for structured data
    if (html.includes("schema.org") || html.includes("application/ld+json"))
      score += 10;

    // Check for basic performance indicators
    if (html.includes("lazy") || html.includes('loading="lazy"')) score += 5;

    // Penalty for very short pages (likely placeholder or parked domain)
    if (html.length < 2000) score -= 15;

    // Penalty for common website builder markers (often low quality for SMBs)
    if (
      html.includes("wix.com") ||
      html.includes("squarespace") ||
      html.includes("godaddy")
    )
      score -= 5;

    return Math.max(0, Math.min(100, score));
  } catch {
    // Site doesn't load at all
    return 0;
  }
}

/**
 * Load existing prospects from spreadsheet to avoid duplicates
 */
function loadExistingProspects(): Set<string> {
  const existing = new Set<string>();

  if (existsSync(SPREADSHEET_PATH)) {
    const content = readFileSync(SPREADSHEET_PATH, "utf-8");
    const lines = content.split("\n").slice(1); // Skip header

    for (const line of lines) {
      if (line.trim()) {
        // Use name + address as dedup key (first and fourth columns)
        const cols = line.split(",");
        if (cols.length >= 4) {
          const key = `${cols[0].replace(/"/g, "").toLowerCase()}|${cols[3].replace(/"/g, "").toLowerCase()}`;
          existing.add(key);
        }
      }
    }
  }

  return existing;
}

async function main() {
  console.log(`\n🔍 Prospecting: "${category}" in ${city}\n`);

  // Search Google Places
  const query = `${category} in ${city}`;
  console.log(`Searching Google Places for: "${query}"...`);
  const places = await searchPlaces(query);
  console.log(`Found ${places.length} businesses.\n`);

  if (places.length === 0) return;

  // Load existing prospects for dedup
  const existing = loadExistingProspects();

  // Process each business
  const prospects: Prospect[] = [];
  let tierA = 0;
  let tierB = 0;
  let skipped = 0;
  let dupes = 0;

  for (const place of places) {
    const name = place.name || "Unknown";
    const address = place.formatted_address || "";
    const dedupKey = `${name.toLowerCase()}|${address.toLowerCase()}`;

    // Skip duplicates
    if (existing.has(dedupKey)) {
      dupes++;
      continue;
    }

    const phone = place.formatted_phone_number || "";
    const website = place.website || "";
    const rating = place.rating || 0;
    const reviewCount = place.user_ratings_total || 0;
    const photoCount = place.photos?.length || 0;

    let tier: string;
    let websiteScore = 0;

    if (!website) {
      // No website = highest priority prospect
      tier = "A";
      tierA++;
      console.log(`  ✓ [Tier A] ${name} — NO WEBSITE`);
    } else if (process.env.TIER_A_ONLY) {
      skipped++;
      continue;
    } else {
      // Score the existing website
      process.stdout.write(`  → Scoring ${name}...`);
      websiteScore = await scoreWebsite(website);

      if (websiteScore < 60) {
        tier = "B";
        tierB++;
        console.log(` ${websiteScore}/100 [Tier B]`);
      } else {
        tier = "skip";
        skipped++;
        console.log(` ${websiteScore}/100 [Skipped — decent site]`);
        continue; // Don't add to spreadsheet
      }
    }

    prospects.push({
      business_name: name,
      category,
      slug: slugify(name),
      address,
      phone,
      email: "",
      website_url: website,
      website_score: websiteScore,
      google_rating: rating,
      review_count: reviewCount,
      photo_count: photoCount,
      priority_tier: tier,
      status: "new",
      preview_url: "",
      outreach_status: "not_contacted",
    });
  }

  // Write to spreadsheet
  if (prospects.length > 0) {
    let csvContent = "";

    if (!existsSync(SPREADSHEET_PATH)) {
      csvContent = CSV_HEADERS + "\n";
    }

    for (const p of prospects) {
      const row = [
        escapeCSV(p.business_name),
        escapeCSV(p.category),
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
      ].join(",");
      csvContent += row + "\n";
    }

    if (existsSync(SPREADSHEET_PATH)) {
      // Append to existing
      const existing = readFileSync(SPREADSHEET_PATH, "utf-8");
      writeFileSync(SPREADSHEET_PATH, existing.trimEnd() + "\n" + csvContent);
    } else {
      writeFileSync(SPREADSHEET_PATH, csvContent);
    }

    console.log(`\n✅ Added ${prospects.length} prospects to spreadsheet.csv`);
  }

  // Summary
  console.log(`\n📊 Summary:`);
  console.log(`   Total found: ${places.length}`);
  console.log(`   Tier A (no website): ${tierA}`);
  console.log(`   Tier B (bad website): ${tierB}`);
  console.log(`   Skipped (decent site): ${skipped}`);
  console.log(`   Duplicates: ${dupes}`);
  console.log(`   Added to spreadsheet: ${prospects.length}`);
}

main().catch(console.error);
