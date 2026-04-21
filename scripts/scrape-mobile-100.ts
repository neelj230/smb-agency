/**
 * Scrape a curated list of mobile-friendly prospects in parallel batches.
 *
 * Selects status=new rows from data/spreadsheet.csv whose category is on the
 * mobile-friendly list (solo operators whose listed phone is very likely a
 * personal cell). Runs scripts/scrape.ts in parallel batches of 4.
 * When each scrape succeeds, flips the CSV status to "scraped".
 *
 * Usage: npx tsx scripts/scrape-mobile-100.ts [limit]
 */

import { spawn } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const CSV = join(ROOT, "data", "spreadsheet.csv");
const DATA_DIR = join(ROOT, "data", "businesses");

const MOBILE_CATEGORIES = new Set([
  "mobile mechanic",
  "mobile car detailing",
  "auto detailing",
  "mobile pet groomer",
  "mobile dj",
  "mobile notary",
  "dog walker",
  "dog trainer",
  "handyman",
  "wedding photographer",
  "photography studio",
  "personal trainer",
  "makeup artist",
  "piano teacher",
  "guitar teacher",
  "tutor",
  "personal chef",
  "massage therapist",
  "house cleaner",
  "power washing",
  "tattoo",
  "tattoo parlor",
  "pet groomer",
  "pet grooming",
  "carpet cleaning",
  "cleaning service",
]);

// Priority order — more-mobile-likely first
const PRIORITY: string[] = [
  "mobile mechanic",
  "mobile car detailing",
  "mobile pet groomer",
  "mobile dj",
  "mobile notary",
  "dog walker",
  "dog trainer",
  "handyman",
  "wedding photographer",
  "photography studio",
  "personal trainer",
  "makeup artist",
  "piano teacher",
  "guitar teacher",
  "tutor",
  "personal chef",
  "massage therapist",
  "house cleaner",
  "power washing",
  "auto detailing",
  "tattoo",
  "tattoo parlor",
  "pet groomer",
  "pet grooming",
  "carpet cleaning",
  "cleaning service",
];

const TARGET = parseInt(process.argv[2] || "100");
const PARALLELISM = 4;

function parseCSVLine(line: string): string[] {
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

function loadRows(): { header: string[]; rows: string[][] } {
  const raw = readFileSync(CSV, "utf-8");
  const lines = raw.split("\n").filter((l) => l.length > 0);
  const header = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(parseCSVLine);
  return { header, rows };
}

function writeRows(header: string[], rows: string[][]) {
  const lines = [header.join(",")];
  for (const r of rows) lines.push(r.map(escapeCsv).join(","));
  writeFileSync(CSV, lines.join("\n") + "\n");
}

function updateStatus(slug: string, newStatus: string) {
  const { header, rows } = loadRows();
  const slugIdx = header.indexOf("slug");
  const statusIdx = header.indexOf("status");
  let changed = false;
  for (const r of rows) {
    if (r[slugIdx] === slug) {
      r[statusIdx] = newStatus;
      changed = true;
      break;
    }
  }
  if (changed) writeRows(header, rows);
}

interface Candidate {
  slug: string;
  name: string;
  category: string;
  phone: string;
}

function pickCandidates(): Candidate[] {
  const { header, rows } = loadRows();
  const col = (n: string) => header.indexOf(n);
  const slugI = col("slug");
  const nameI = col("business_name");
  const catI = col("category");
  const phoneI = col("phone");
  const statusI = col("status");

  const all: Candidate[] = [];
  const seenPhones = new Set<string>();
  for (const r of rows) {
    const status = r[statusI];
    const phone = r[phoneI]?.trim();
    const cat = r[catI]?.toLowerCase();
    if (status !== "new") continue;
    if (!phone) continue;
    if (!MOBILE_CATEGORIES.has(cat)) continue;
    if (seenPhones.has(phone)) continue;
    // Skip if already has business.json (already scraped, status just wasn't flipped)
    if (existsSync(join(DATA_DIR, r[slugI], "business.json"))) continue;
    seenPhones.add(phone);
    all.push({
      slug: r[slugI],
      name: r[nameI],
      category: cat,
      phone,
    });
  }

  // Sort by priority
  all.sort((a, b) => {
    const ai = PRIORITY.indexOf(a.category);
    const bi = PRIORITY.indexOf(b.category);
    return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
  });

  return all.slice(0, TARGET);
}

function scrapeOne(slug: string): Promise<boolean> {
  return new Promise((resolve) => {
    const child = spawn("npx", ["tsx", "scripts/scrape.ts", slug], {
      env: { ...process.env },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let timedOut = false;
    const timer = setTimeout(
      () => {
        timedOut = true;
        child.kill("SIGKILL");
      },
      5 * 60 * 1000,
    );

    let stdout = "";
    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stdout += d.toString()));

    child.on("close", (code) => {
      clearTimeout(timer);
      const ok =
        code === 0 &&
        !timedOut &&
        existsSync(join(DATA_DIR, slug, "business.json"));
      if (!ok) {
        const lastLine = stdout
          .trim()
          .split("\n")
          .slice(-3)
          .join(" | ")
          .slice(0, 200);
        console.log(`  ✗ ${slug}: code=${code} ${timedOut ? "(timeout)" : ""} ${lastLine}`);
      }
      resolve(ok);
    });
  });
}

async function main() {
  const candidates = pickCandidates();
  console.log(`\n📥 Scraping ${candidates.length} mobile-friendly prospects...`);
  console.log(
    `   Parallelism: ${PARALLELISM} | Timeout: 5min/scrape | Categories covered: ${
      new Set(candidates.map((c) => c.category)).size
    }\n`,
  );

  let i = 0;
  let succ = 0;
  let fail = 0;
  const startedAt = Date.now();

  async function worker(workerId: number) {
    while (true) {
      const idx = i++;
      if (idx >= candidates.length) return;
      const c = candidates[idx];
      const label = `[${idx + 1}/${candidates.length}] ${c.name.slice(0, 40)} (${c.category})`;
      console.log(`→ ${label}`);
      const ok = await scrapeOne(c.slug);
      if (ok) {
        updateStatus(c.slug, "scraped");
        succ++;
        console.log(`✓ ${label}`);
      } else {
        fail++;
      }
    }
  }

  await Promise.all(
    Array.from({ length: PARALLELISM }).map((_, w) => worker(w)),
  );

  const mins = ((Date.now() - startedAt) / 60000).toFixed(1);
  console.log(
    `\n=== Scrape done: ${succ} ok, ${fail} failed, ${mins}min elapsed ===`,
  );
}

main().catch((e) => {
  console.error("Scrape batch error:", e);
  process.exit(1);
});
