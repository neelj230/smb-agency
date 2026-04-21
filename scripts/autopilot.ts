import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { generateMockup } from "./mockup.js";
import { sendOutreach } from "./imessage.js";

const ROOT = process.cwd();
const SPREADSHEET = join(ROOT, "data", "spreadsheet.csv");
const DATA_DIR = join(ROOT, "data", "businesses");

interface CsvRow {
  business_name: string;
  category: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  website_url: string;
  website_score: string;
  google_rating: string;
  review_count: string;
  photo_count: string;
  priority_tier: string;
  status: string;
  preview_url: string;
  outreach_status: string;
  [key: string]: string;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else current += ch;
  }
  result.push(current);
  return result;
}

function escapeCsv(v: string): string {
  if (v.includes(",") || v.includes('"') || v.includes("\n")) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function parseCsv(path: string): CsvRow[] {
  const raw = readFileSync(path, "utf-8").trim();
  const [headerLine, ...lines] = raw.split("\n");
  const headers = parseCsvLine(headerLine);
  return lines.map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = values[i] || ""));
    return row as CsvRow;
  });
}

function writeCsv(path: string, rows: CsvRow[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escapeCsv(r[h] || "")).join(",")),
  ];
  writeFileSync(path, lines.join("\n") + "\n");
}

function hasBusinessData(slug: string): boolean {
  return existsSync(join(DATA_DIR, slug, "business.json"));
}

function hasPhotos(slug: string): boolean {
  const photosDir = join(DATA_DIR, slug, "photos");
  return existsSync(photosDir);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2);
  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) : 30;
  const dryRun = args.includes("--dry-run");
  const skipMockup = args.includes("--skip-mockup");

  if (dryRun) console.log("=== DRY RUN MODE ===\n");

  const rows = parseCsv(SPREADSHEET);
  const candidates = rows.filter(
    (r) =>
      r.phone.trim() &&
      r.outreach_status === "not_contacted" &&
      r.status === "scraped" &&
      hasBusinessData(r.slug) &&
      hasPhotos(r.slug),
  );

  console.log(`Found ${candidates.length} candidates (limit: ${limit})\n`);
  const batch = candidates.slice(0, limit);
  let sent = 0;
  let failed = 0;

  for (const row of batch) {
    console.log(`\n--- ${row.business_name} (${row.category}) ---`);
    console.log(`Phone: ${row.phone} | Tier: ${row.priority_tier}`);

    // Generate mockup
    let mockupPath = join(DATA_DIR, row.slug, "mockup.png");
    if (!skipMockup || !existsSync(mockupPath)) {
      console.log("Generating mockup...");
      if (!dryRun) {
        const result = await generateMockup(row.slug);
        if (!result) {
          console.log("SKIP: mockup generation failed");
          failed++;
          continue;
        }
        mockupPath = result;
      } else {
        console.log(`[DRY RUN] Would generate mockup for ${row.slug}`);
      }
    } else {
      console.log("Mockup already exists, reusing.");
    }

    // Compose message
    const message = `Hey! I'm Neel, a senior at Penn. I build websites for local businesses and put together this free concept for ${row.business_name}. Would you be interested in seeing the full site? No strings attached.`;
    console.log(`Message: ${message}`);

    if (!dryRun) {
      console.log(`Sending to ${row.phone}...`);
      const ok = sendOutreach(row.phone, row.business_name, mockupPath);
      if (ok) {
        row.outreach_status = "mockup_sent";
        sent++;
        console.log("SENT");
      } else {
        console.log("FAILED to send");
        failed++;
      }
      // Rate limit: 2-3 min between messages
      const delay = 120000 + Math.random() * 60000;
      console.log(`Waiting ${Math.round(delay / 1000)}s before next...`);
      await sleep(delay);
    } else {
      row.outreach_status = "mockup_sent";
      sent++;
      console.log("[DRY RUN] Would send iMessage");
    }
  }

  // Save updated spreadsheet
  if (!dryRun) {
    writeCsv(SPREADSHEET, rows);
    console.log("\nSpreadsheet updated.");
  }

  console.log(`\n=== DONE: ${sent} sent, ${failed} failed ===`);
}

main().catch((e) => {
  console.error("Autopilot error:", e);
  process.exit(1);
});
