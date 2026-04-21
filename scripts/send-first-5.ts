/**
 * One-off: send iMessage outreach to the first 5 mockup-ready prospects.
 *
 * Picks candidates from filesystem state (mockup.png exists + business.json + photos),
 * skips any already-contacted rows based on CSV outreach_status, sorts newest-mockup-first,
 * sends to first 5, and updates just those 5 rows' status/outreach_status in the CSV.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { sendOutreach } from "./imessage.js";

const ROOT = process.cwd();
const CSV = join(ROOT, "data", "spreadsheet.csv");
const DATA_DIR = join(ROOT, "data", "businesses");

// Slugs already contacted (manually by user or via earlier interrupted run). Skip.
const ALREADY_SENT = new Set([
  "alex-lowy-photography-llc", // sent 2026-04-17 with old message template
  "annie-hosfeld-photography", // sent 2026-04-17 with old message template
  "dannys-mobile-mechanic-llc", // sent manually by Neel 2026-04-17
]);

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

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const raw = readFileSync(CSV, "utf-8").trimEnd();
  const [headerLine, ...lines] = raw.split("\n");
  const headers = parseCsvLine(headerLine);
  const slugI = headers.indexOf("slug");
  const phoneI = headers.indexOf("phone");
  const nameI = headers.indexOf("business_name");
  const catI = headers.indexOf("category");
  const statusI = headers.indexOf("status");
  const outI = headers.indexOf("outreach_status");

  const parsed = lines.map(parseCsvLine);

  const ready: { rowIdx: number; slug: string; name: string; category: string; phone: string; mockup: string; mtime: number }[] = [];
  for (let i = 0; i < parsed.length; i++) {
    const v = parsed[i];
    const slug = v[slugI];
    if (ALREADY_SENT.has(slug)) continue;
    if (!v[phoneI]?.trim()) continue;
    // Skip if already contacted (treat empty or "not_contacted" as sendable)
    const out = v[outI];
    if (out && out !== "not_contacted") continue;
    const mockup = join(DATA_DIR, slug, "mockup.png");
    const photoDir = join(DATA_DIR, slug, "photos");
    const jsonPath = join(DATA_DIR, slug, "business.json");
    if (!existsSync(mockup) || !existsSync(photoDir) || !existsSync(jsonPath)) continue;
    // Skip businesses with no actual photos — mockup template placeholder leaks through
    const photoFiles = readdirSync(photoDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
    if (photoFiles.length === 0) continue;
    ready.push({
      rowIdx: i,
      slug,
      name: v[nameI],
      category: v[catI],
      phone: v[phoneI],
      mockup,
      mtime: statSync(mockup).mtimeMs,
    });
  }

  ready.sort((a, b) => b.mtime - a.mtime);
  const batch = ready.slice(0, 5);

  console.log(`\n📱 Sending to first ${batch.length} prospects:\n`);
  batch.forEach((r, i) =>
    console.log(`  ${i + 1}. ${r.name} (${r.category}) → ${r.phone}`),
  );
  console.log();

  let sent = 0;
  let failed = 0;

  for (const [idx, r] of batch.entries()) {
    console.log(`\n--- [${idx + 1}/${batch.length}] ${r.name} ---`);
    console.log(`  phone: ${r.phone}`);
    console.log(`  mockup: ${r.mockup}`);

    const ok = sendOutreach(r.phone, r.name, r.mockup);
    if (ok) {
      // Update just this row
      const v = parsed[r.rowIdx];
      if (!v[statusI]) v[statusI] = "scraped";
      v[outI] = "mockup_sent";
      sent++;
      console.log(`  ✓ SENT`);
    } else {
      failed++;
      console.log(`  ✗ FAILED`);
    }

    // Rate limit: 2-3 min between sends (skip after last)
    if (idx < batch.length - 1) {
      const delay = 120000 + Math.random() * 60000;
      console.log(`  waiting ${Math.round(delay / 1000)}s...`);
      await sleep(delay);
    }
  }

  // Write back only if something was sent
  if (sent > 0) {
    const newLines = [headerLine];
    for (const v of parsed) newLines.push(v.map(escapeCsv).join(","));
    writeFileSync(CSV, newLines.join("\n") + "\n");
    console.log(`\n💾 Updated ${sent} rows in spreadsheet.csv`);
  }

  console.log(`\n=== DONE: ${sent} sent, ${failed} failed ===`);
}

main().catch((e) => {
  console.error("Send error:", e);
  process.exit(1);
});
