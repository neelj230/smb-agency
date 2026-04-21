import puppeteer, { type Browser, type Page } from "puppeteer";
import { createServer, type Server } from "http";
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "fs";
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
  "house cleaner": ["_reference-cleaning", "_reference-clean-services", "_reference-essentia"],
  bakery: ["_reference-etery", "_reference-warm-editorial", "_reference-restaurant-dark"],
  restaurant: ["_reference-restaurant-dark", "_reference-dark-immersive", "_reference-etery"],
  "tattoo parlor": ["_reference-dark-immersive", "_reference-warm-editorial", "_reference-nordiq"],
  tattoo: ["_reference-dark-immersive", "_reference-warm-editorial", "_reference-nordiq"],
  "pet grooming": ["_reference-essentia", "_reference-clean-services", "_reference-forest-therapy"],
  "pet groomer": ["_reference-essentia", "_reference-clean-services", "_reference-forest-therapy"],
  "mobile pet groomer": ["_reference-essentia", "_reference-forest-therapy", "_reference-clean-services"],
  dentist: ["_reference-clean-services", "_reference-essentia", "_reference-wellness-glass"],
  lawyer: ["_reference-stratex", "_reference-opurent", "_reference-minimal-brand"],
  fitness: ["_reference-bold-stats", "_reference-pilates", "_reference-nordiq"],
  contractor: ["_reference-bold-stats", "_reference-handyman", "_reference-trades-clean"],
  tailor: ["_reference-warm-editorial", "_reference-minimal-brand", "_reference-essentia"],
  // mobile/solo-operator categories
  "mobile mechanic": ["_reference-trades-clean", "_reference-bold-stats", "_reference-heatfix"],
  "mobile car detailing": ["_reference-trades-clean", "_reference-dark-immersive", "_reference-bold-stats"],
  "auto detailing": ["_reference-trades-clean", "_reference-dark-immersive", "_reference-bold-stats"],
  "wedding photographer": ["_reference-warm-editorial", "_reference-luxerra", "_reference-minimal-brand"],
  "photography studio": ["_reference-warm-editorial", "_reference-minimal-brand", "_reference-luxerra"],
  "personal trainer": ["_reference-pilates", "_reference-bold-stats", "_reference-nordiq"],
  "makeup artist": ["_reference-luxerra", "_reference-warm-editorial", "_reference-essentia"],
  "dog walker": ["_reference-forest-therapy", "_reference-essentia", "_reference-clean-services"],
  "dog trainer": ["_reference-forest-therapy", "_reference-handyman", "_reference-clean-services"],
  "piano teacher": ["_reference-warm-editorial", "_reference-minimal-brand", "_reference-arpeggio"],
  "guitar teacher": ["_reference-warm-editorial", "_reference-minimal-brand", "_reference-arpeggio"],
  tutor: ["_reference-minimal-brand", "_reference-stratex", "_reference-clean-services"],
  "mobile notary": ["_reference-stratex", "_reference-minimal-brand", "_reference-clean-services"],
  "mobile dj": ["_reference-dark-immersive", "_reference-bold-stats", "_reference-nordiq"],
  "massage therapist": ["_reference-therapy", "_reference-forest-therapy", "_reference-wellness-glass"],
  "personal chef": ["_reference-etery", "_reference-restaurant-dark", "_reference-warm-editorial"],
  "power washing": ["_reference-trades-clean", "_reference-cleaning", "_reference-clean-services"],
  handyman: ["_reference-handyman", "_reference-trades-clean", "_reference-bold-stats"],
  "carpet cleaning": ["_reference-cleaning", "_reference-clean-services", "_reference-trades-clean"],
};

const FALLBACK_TEMPLATES = ["_reference-bold-stats", "_reference-dark-immersive", "_reference-warm-editorial", "_reference-clean-services"];

interface BusinessData {
  name: string; slug: string; category: string; phone?: string;
  tagline?: string; rating?: number; reviewCount?: number;
  brandColors?: { primary?: string; accent?: string };
  photos?: { src: string; category?: string }[];
  analysis?: { suggested_tagline?: string };
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

function loadBusiness(slug: string): BusinessData | null {
  const path = join(DATA_DIR, slug, "business.json");
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf-8"));
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

interface Candidate {
  slug: string;
  category: string;
  phone: string;
  business_name: string;
  priority_tier: string;
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

function loadCandidates(limit: number): Candidate[] {
  const csv = readFileSync(join(ROOT, "data", "spreadsheet.csv"), "utf-8").trim();
  const [headerLine, ...lines] = csv.split("\n");
  const headers = parseCsvLine(headerLine);
  const rows = lines.map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => (row[h] = values[i] || ""));
    return row;
  });

  return rows
    .filter(
      (r) =>
        r.phone?.trim() &&
        r.outreach_status === "not_contacted" &&
        r.status === "scraped" &&
        existsSync(join(DATA_DIR, r.slug, "business.json")) &&
        existsSync(join(DATA_DIR, r.slug, "photos")),
    )
    .slice(0, limit)
    .map((r) => ({
      slug: r.slug,
      category: r.category,
      phone: r.phone,
      business_name: r.business_name,
      priority_tier: r.priority_tier,
    }));
}

async function generateOneMockup(
  browser: Browser,
  business: BusinessData,
  templateName: string,
): Promise<string | null> {
  const templateDir = join(SITES_DIR, templateName, "out");
  if (!existsSync(templateDir)) return null;

  const photoUrl = copyBestPhoto(business, templateDir);
  const port = 9222 + Math.floor(Math.random() * 5000);
  const server = await serveStatic(templateDir, port);

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 2400, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${port}`, { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForSelector("h1", { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 4000));

    // Force everything visible
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.textContent = `*, *::before, *::after { opacity: 1 !important; transform: none !important; transition: none !important; animation: none !important; filter: none !important; }`;
      document.head.appendChild(style);
    });
    await new Promise((r) => setTimeout(r, 500));

    // Inject business data
    await page.evaluate(
      (data) => {
        const h1 = document.querySelector("h1");
        if (h1) h1.textContent = data.name;

        const navBrand = document.querySelector(
          "nav a:first-child, header a:first-child, nav span:first-child, nav p:first-child",
        ) as HTMLElement | null;
        if (navBrand && navBrand.textContent) navBrand.textContent = data.shortName;

        if (data.photoUrl) {
          document.querySelectorAll("img").forEach((img) => {
            if (img.src.includes("/photos/photo-1") || img.src.includes("/photos/photo-2") || img.src.includes("/photos/hero")) {
              (img as HTMLImageElement).src = data.photoUrl;
              (img as HTMLImageElement).srcset = "";
            }
          });
        }

        if (data.primary || data.accent) {
          const root = document.documentElement;
          if (data.primary) root.style.setProperty("--brand-primary", data.primary);
          if (data.accent) root.style.setProperty("--brand-accent", data.accent);
        }

        if (data.tagline) {
          const h1El = document.querySelector("h1");
          if (h1El) {
            let target = h1El.nextElementSibling;
            while (target && target.tagName !== "P" && target.children.length) {
              const p = target.querySelector("p");
              if (p) { target = p; break; }
              target = target.nextElementSibling;
            }
            if (target && (target.tagName === "P" || target.tagName === "SPAN")) {
              (target as HTMLElement).textContent = data.tagline;
            }
          }
        }
      },
      {
        name: business.name,
        shortName: business.name.split(/[&–—]/).map((s: string) => s.trim())[0],
        photoUrl,
        primary: business.brandColors?.primary,
        accent: business.brandColors?.accent,
        tagline: business.analysis?.suggested_tagline || business.tagline || null,
      },
    );

    await new Promise((r) => setTimeout(r, 500));

    // Scroll to trigger lazy content, then back up
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 1000));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));
    await page.evaluate(() => {
      document.querySelectorAll("*").forEach((el) => {
        const s = window.getComputedStyle(el);
        if (parseFloat(s.opacity) < 0.5) (el as HTMLElement).style.opacity = "1";
      });
    });

    const outputPath = join(DATA_DIR, business.slug, "mockup.png");
    await page.screenshot({ path: outputPath, type: "png", fullPage: true });
    await page.close();
    return outputPath;
  } finally {
    server.close();
  }
}

async function main() {
  const limit = parseInt(process.argv[2] || "30");
  const candidates = loadCandidates(limit);
  console.log(`Generating ${candidates.length} mockups...\n`);

  const browser = await puppeteer.launch({
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    protocolTimeout: 180000,
  });

  const results: { slug: string; name: string; phone: string; tier: string; mockup: string; template: string; message: string }[] = [];
  let failed = 0;

  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    const business = loadBusiness(c.slug);
    if (!business) { failed++; continue; }

    const template = pickTemplate(c.category, i);
    process.stdout.write(`[${i + 1}/${candidates.length}] ${c.business_name} (${template})... `);

    try {
      const mockupPath = await generateOneMockup(browser, business, template);
      if (mockupPath) {
        const message = `Hey! I'm Neel, a senior at Penn. I build websites for local businesses and put together this free concept for ${business.name}. Would you be interested in seeing the full site? No strings attached.`;
        results.push({
          slug: c.slug,
          name: business.name,
          phone: c.phone,
          tier: c.priority_tier,
          mockup: mockupPath,
          template,
          message,
        });
        console.log("OK");
      } else {
        console.log("FAILED (no template build)");
        failed++;
      }
    } catch (e) {
      console.log(`FAILED: ${(e as Error).message.slice(0, 80)}`);
      failed++;
    }
  }

  await browser.close();

  // Write summary
  const summaryPath = join(ROOT, "data", "outreach-batch.json");
  writeFileSync(summaryPath, JSON.stringify(results, null, 2));
  console.log(`\n=== DONE: ${results.length} mockups generated, ${failed} failed ===`);
  console.log(`Summary: ${summaryPath}`);

  // Print ready-to-send messages
  console.log("\n--- MESSAGES READY TO SEND ---\n");
  for (const r of results) {
    console.log(`${r.name} | ${r.phone} | Tier ${r.tier}`);
    console.log(`Mockup: ${r.mockup}`);
    console.log(`Message: ${r.message}`);
    console.log();
  }
}

main().catch((e) => {
  console.error("Batch error:", e);
  process.exit(1);
});
