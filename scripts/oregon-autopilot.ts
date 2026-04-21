/**
 * Oregon Autopilot — End-to-end: generate mockups + send iMessages
 *
 * Finds Oregon businesses that are scraped, have photos, and haven't been contacted.
 * Generates full-page mockup screenshots, then sends via AppleScript iMessage.
 *
 * Usage: npx tsx scripts/oregon-autopilot.ts [--limit 30] [--dry-run]
 */

import puppeteer, { type Browser } from "puppeteer";
import { createServer, type Server } from "http";
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "fs";
import { execSync } from "child_process";
import sharp from "sharp";
import { join, extname } from "path";

const ROOT = process.cwd();
const SITES_DIR = join(ROOT, "sites");
const DATA_DIR = join(ROOT, "data", "businesses");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html", ".css": "text/css", ".js": "application/javascript",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".ico": "image/x-icon",
};

const TEMPLATE_MAP: Record<string, string[]> = {
  plumber: ["_reference-bold-stats", "_reference-heatfix", "_reference-trades-clean"],
  "auto repair": ["_reference-bold-stats", "_reference-trades-clean", "_reference-handyman"],
  barber: ["_reference-dark-immersive", "_reference-warm-editorial", "_reference-nordiq"],
  salon: ["_reference-warm-editorial", "_reference-luxerra", "_reference-essentia"],
  landscaper: ["_reference-gardener", "_reference-clean-services", "_reference-bold-stats"],
  "cleaning service": ["_reference-cleaning", "_reference-clean-services", "_reference-essentia"],
  bakery: ["_reference-etery", "_reference-warm-editorial", "_reference-restaurant-dark"],
  restaurant: ["_reference-restaurant-dark", "_reference-dark-immersive", "_reference-etery"],
  "tattoo parlor": ["_reference-dark-immersive", "_reference-warm-editorial", "_reference-nordiq"],
  dentist: ["_reference-clean-services", "_reference-essentia", "_reference-wellness-glass"],
  lawyer: ["_reference-stratex", "_reference-opurent", "_reference-minimal-brand"],
  "law firm": ["_reference-stratex", "_reference-opurent", "_reference-minimal-brand"],
  fitness: ["_reference-bold-stats", "_reference-pilates", "_reference-nordiq"],
  contractor: ["_reference-bold-stats", "_reference-handyman", "_reference-trades-clean"],
  tailor: ["_reference-warm-editorial", "_reference-minimal-brand", "_reference-essentia"],
  locksmith: ["_reference-handyman", "_reference-trades-clean", "_reference-bold-stats"],
  "accounting firm": ["_reference-stratex", "_reference-minimal-brand", "_reference-clean-services"],
  daycare: ["_reference-essentia", "_reference-forest-therapy", "_reference-kids-camp"],
  "hvac contractor": ["_reference-bold-stats", "_reference-heatfix", "_reference-trades-clean"],
  "pilates studio": ["_reference-pilates", "_reference-essentia", "_reference-wellness-glass"],
  "photography studio": ["_reference-warm-editorial", "_reference-dark-immersive", "_reference-minimal-brand"],
  electrician: ["_reference-bold-stats", "_reference-trades-clean", "_reference-handyman"],
};

const FALLBACK_TEMPLATES = ["_reference-bold-stats", "_reference-dark-immersive", "_reference-warm-editorial", "_reference-clean-services"];

interface BusinessData {
  name: string; slug: string; category: string; phone?: string;
  tagline?: string; brandColors?: { primary?: string; accent?: string };
  photos?: { src: string; category?: string }[];
  analysis?: { suggested_tagline?: string };
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === "," && !inQuotes) { result.push(current); current = ""; }
    else { current += ch; }
  }
  result.push(current);
  return result;
}

function pickTemplate(category: string, index: number): string {
  const templates = TEMPLATE_MAP[category.toLowerCase()] || FALLBACK_TEMPLATES;
  return templates[index % templates.length];
}

function serveStatic(dir: string, port: number): Promise<Server> {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(dir, req.url === "/" ? "/index.html" : req.url!);
      if (!filePath.includes(".")) filePath += ".html";
      if (!existsSync(filePath)) { res.writeHead(404); res.end("Not found"); return; }
      const ext = extname(filePath);
      res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
      res.end(readFileSync(filePath));
    });
    server.listen(port, () => resolve(server));
  });
}

function copyBestPhoto(business: BusinessData, templateDir: string): string | null {
  if (!business.photos?.length) return null;
  const businessPhotoDir = join(DATA_DIR, business.slug, "photos");
  if (!existsSync(businessPhotoDir)) return null;
  const exterior = business.photos.find((p) => p.category === "exterior");
  const interior = business.photos.find((p) => p.category === "interior");
  const work = business.photos.find((p) => p.category === "work");
  const photo = exterior || work || interior || business.photos[0];
  const photoFilename = photo.src.replace(/^\/photos\//, "");
  const destPhotosDir = join(templateDir, "photos");
  if (!existsSync(destPhotosDir)) mkdirSync(destPhotosDir, { recursive: true });
  for (const ext of [".webp", ".jpg", ".jpeg", ".png"]) {
    const base = photoFilename.replace(/\.\w+$/, "");
    const srcFile = join(businessPhotoDir, base + ext);
    if (existsSync(srcFile)) {
      const destFile = join(destPhotosDir, `_injected${ext}`);
      copyFileSync(srcFile, destFile);
      return `/photos/_injected${ext}`;
    }
  }
  return null;
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  return digits.startsWith("1") ? `+${digits}` : `+1${digits}`;
}

function sendViaUI(phone: string, message: string, imagePath: string): boolean {
  const absPath = imagePath.startsWith("/") ? imagePath : join(ROOT, imagePath);
  const formatted = formatPhone(phone);
  try {
    // 1. Copy image to clipboard and open conversation
    execSync(`osascript -e 'set the clipboard to (read (POSIX file "${absPath}") as «class PNGf»)'`, { timeout: 10000 });
    execSync(`open "imessage://${formatted}"`, { timeout: 5000 });
    execSync("sleep 3");

    // 2. Paste image and send it
    execSync(`osascript -e '
      tell application "Messages" to activate
      delay 0.5
      tell application "System Events"
        tell process "Messages"
          keystroke "v" using command down
          delay 1.5
          key code 36
        end tell
      end tell'`, { timeout: 15000 });
    execSync("sleep 2");

    // 3. Copy message text to clipboard via temp file (avoids shell quoting issues)
    const tmpMsg = join(ROOT, "data", ".tmp-message.txt");
    writeFileSync(tmpMsg, message);
    execSync(`osascript -e 'set the clipboard to (read POSIX file "${tmpMsg}" as «class utf8»)'`, { timeout: 5000 });
    execSync(`osascript -e '
      tell application "System Events"
        tell process "Messages"
          keystroke "v" using command down
          delay 0.5
          key code 36
        end tell
      end tell'`, { timeout: 10000 });

    return true;
  } catch (e) {
    console.log(`    UI send error: ${(e as Error).message.slice(0, 100)}`);
    return false;
  }
}

async function resizeForSend(inputPath: string): Promise<string> {
  const outputPath = inputPath.replace(".png", "-send.png");
  await sharp(inputPath)
    .resize(800, null, { withoutEnlargement: true })
    .png({ quality: 80 })
    .toFile(outputPath);
  return outputPath;
}

function saveCsv(headerLine: string, allRows: Record<string, string>[], headers: string[]) {
  const updatedCsv = [headerLine, ...allRows.map((r) => headers.map((h) => {
    const val = r[h] || "";
    return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
  }).join(","))].join("\n") + "\n";
  writeFileSync(join(ROOT, "data", "spreadsheet.csv"), updatedCsv);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function getHeroPhotoPath(business: BusinessData): string | null {
  if (!business.photos?.length) return null;
  const photoDir = join(DATA_DIR, business.slug, "photos");
  if (!existsSync(photoDir)) return null;
  const exterior = business.photos.find((p) => p.category === "exterior");
  const work = business.photos.find((p) => p.category === "work");
  const interior = business.photos.find((p) => p.category === "interior");
  const photo = exterior || work || interior || business.photos[0];
  const filename = photo.src.replace(/^\/photos\//, "");
  for (const ext of [".webp", ".jpg", ".jpeg", ".png"]) {
    const base = filename.replace(/\.\w+$/, "");
    const full = join(photoDir, base + ext);
    if (existsSync(full)) return full;
  }
  return null;
}

function buildHeroHtml(business: BusinessData, photoDataUrl: string | null): string {
  const name = business.name;
  const tagline = business.analysis?.suggested_tagline || business.tagline || "";
  const primary = business.brandColors?.primary || "#1a1a1a";
  const accent = business.brandColors?.accent || "#c8553d";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #0a0a0a; color: #fff; overflow: hidden; }
  .hero {
    position: relative; width: 100vw; height: 100vh; display: flex; flex-direction: column;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    ${photoDataUrl ? `background: url('${photoDataUrl}') center/cover no-repeat;` : `background: linear-gradient(135deg, ${primary} 0%, #0a0a0a 100%);`}
  }
  .hero-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%);
  }
  nav {
    position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center;
    padding: 28px 48px;
  }
  .nav-brand { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; letter-spacing: 0.02em; }
  .nav-links { display: flex; gap: 32px; font-size: 14px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.8; }
  .content {
    position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center; padding: 0 80px;
  }
  h1 {
    font-family: 'Playfair Display', serif; font-size: 72px; font-weight: 600;
    letter-spacing: -0.02em; line-height: 1.1; max-width: 900px;
  }
  .tagline {
    margin-top: 24px; font-size: 18px; font-weight: 400; opacity: 0.75;
    letter-spacing: 0.03em; max-width: 600px; line-height: 1.6;
  }
  .cta {
    margin-top: 40px; display: flex; gap: 16px;
  }
  .btn {
    padding: 14px 36px; font-size: 14px; font-weight: 500; letter-spacing: 0.08em;
    text-transform: uppercase; border: none; cursor: pointer; transition: all 0.2s;
  }
  .btn-primary { background: ${accent}; color: #fff; }
  .btn-outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); }
  .bottom-bar {
    position: relative; z-index: 2; display: flex; justify-content: center; gap: 48px;
    padding: 24px 48px; font-size: 13px; opacity: 0.5; letter-spacing: 0.04em;
  }
</style></head><body>
<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <nav>
    <div class="nav-brand">${name}</div>
    <div class="nav-links"><span>About</span><span>Services</span><span>Contact</span></div>
  </nav>
  <div class="content">
    <h1>${name}</h1>
    ${tagline ? `<p class="tagline">${tagline}</p>` : ""}
    <div class="cta">
      <button class="btn btn-primary">Get Started</button>
      <button class="btn btn-outline">Learn More</button>
    </div>
  </div>
  <div class="bottom-bar">
    <span>Quality Service</span><span>Locally Owned</span><span>5-Star Rated</span>
  </div>
</div>
</body></html>`;
}

async function generateMockup(
  browser: Browser, business: BusinessData, _templateName: string,
): Promise<string | null> {
  const photoPath = getHeroPhotoPath(business);
  let photoDataUrl: string | null = null;
  if (photoPath) {
    const buf = readFileSync(photoPath);
    const ext = extname(photoPath).replace(".", "");
    const mime = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";
    photoDataUrl = `data:${mime};base64,${buf.toString("base64")}`;
  }

  const html = buildHeroHtml(business, photoDataUrl);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 2000));

  const outputPath = join(DATA_DIR, business.slug, "mockup.png");
  await page.screenshot({ path: outputPath, type: "png" });
  await page.close();
  return outputPath;
}

async function main() {
  const args = process.argv.slice(2);
  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) : 30;
  const dryRun = args.includes("--dry-run");

  // Load candidates: Oregon, with photos, not contacted
  const csv = readFileSync(join(ROOT, "data", "spreadsheet.csv"), "utf-8").replace(/\r/g, "").trim();
  const [headerLine, ...lines] = csv.split("\n");
  const headers = parseCsvLine(headerLine);
  const allRows = lines.map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = values[i] || ""));
    return row;
  });

  const candidates = allRows.filter((r) =>
    r.phone?.trim() &&
    r.outreach_status === "not_contacted" &&
    existsSync(join(DATA_DIR, r.slug, "business.json")) &&
    existsSync(join(DATA_DIR, r.slug, "photos"))
  );

  // Deduplicate by phone number
  const seenPhones = new Set<string>();
  const deduped = candidates.filter((r) => {
    const phone = r.phone.replace(/[^0-9]/g, "");
    if (seenPhones.has(phone)) return false;
    seenPhones.add(phone);
    return true;
  });

  // Prioritize Tier A, then Tier B
  const tierA = deduped.filter((r) => r.priority_tier === "A");
  const tierB = deduped.filter((r) => r.priority_tier === "B");
  const ordered = [...tierA, ...tierB].slice(0, limit);

  console.log(`Found ${candidates.length} Oregon candidates (${tierA.length} Tier A, ${tierB.length} Tier B)`);
  console.log(`Processing ${ordered.length} businesses${dryRun ? " (DRY RUN)" : ""}\n`);

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  let sent = 0, failed = 0;

  for (let i = 0; i < ordered.length; i++) {
    const row = ordered[i];
    const business: BusinessData = JSON.parse(readFileSync(join(DATA_DIR, row.slug, "business.json"), "utf-8"));
    const template = pickTemplate(row.category, i);

    console.log(`[${i + 1}/${ordered.length}] ${row.business_name} (${row.category}, Tier ${row.priority_tier})`);
    console.log(`  Phone: ${row.phone} | Template: ${template}`);

    // Generate mockup
    process.stdout.write("  Generating mockup... ");
    let mockupPath: string | null = null;
    if (!dryRun) {
      mockupPath = await generateMockup(browser, business, template);
      if (!mockupPath) { console.log("FAILED"); failed++; continue; }
      console.log("OK");
    } else {
      mockupPath = join(DATA_DIR, row.slug, "mockup.png");
      console.log("[DRY RUN]");
    }

    // Compose message
    const message = `Hey! I'm Neel, a recent grad from UPenn Wharton and I help small businesses create websites. Some examples include neelrjain.com and source-accounting.com.\n\nI came across ${business.name} and spent some time putting together a website concept for you (see attached). I'd love to get your feedback and any thoughts — would you be interested in seeing the full website? This is just a template, and I'd be happy to adapt it based on your content, photos, colors, and ideas.\n\nLet me know! Feel free to reach me via email, call, or text.\n\nBest,\nNeel\n9713477778`;

    if (!dryRun) {
      const size = Math.round(readFileSync(mockupPath).length / 1024);
      console.log(`  Mockup size: ${size}KB`);

      // Send everything via UI automation (works for both iMessage + SMS)
      process.stdout.write("  Sending via Messages UI... ");
      const ok = sendViaUI(row.phone, message, mockupPath);
      console.log(ok ? "OK" : "FAILED");
      if (!ok) { failed++; continue; }

      // Mark as sent immediately and save CSV to prevent duplicates on restart
      row.outreach_status = "mockup_sent";
      sent++;
      saveCsv(headerLine, allRows, headers);

      // Brief pause for UI automation to settle
      if (i < ordered.length - 1) {
        const delay = 8000 + Math.random() * 4000;
        console.log(`  Waiting ${Math.round(delay / 1000)}s...\n`);
        await sleep(delay);
      }
    } else {
      console.log(`  Message: ${message.split("\n")[0]}...`);
      sent++;
    }
  }

  await browser.close();

  // CSV already saved after each send

  console.log(`\n=== DONE: ${sent} sent, ${failed} failed ===`);
}

main().catch((e) => { console.error("Error:", e); process.exit(1); });
