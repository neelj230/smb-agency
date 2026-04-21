import puppeteer, { type Browser } from "puppeteer";
import { createServer, type Server } from "http";
import { readFileSync, existsSync, mkdirSync, copyFileSync } from "fs";
import { join, extname } from "path";

const ROOT = process.cwd();
const SITES_DIR = join(ROOT, "sites");
const DATA_DIR = join(ROOT, "data", "businesses");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
};

const TEMPLATE_MAP: Record<string, string[]> = {
  plumber: ["_reference-bold-stats", "_reference-heatfix", "_reference-trades-clean"],
  "auto repair": ["_reference-bold-stats", "_reference-trades-clean", "_reference-heatfix"],
  barber: ["_reference-dark-immersive", "_reference-warm-editorial", "_reference-nordiq"],
  salon: ["_reference-warm-editorial", "_reference-luxerra", "_reference-essentia"],
  "nail salon": ["_reference-warm-editorial", "_reference-luxerra", "_reference-essentia"],
  landscaper: ["_reference-gardener", "_reference-heatfix", "_reference-bold-stats"],
  "cleaning service": ["_reference-cleaning", "_reference-heatfix", "_reference-essentia"],
  bakery: ["_reference-etery", "_reference-warm-editorial", "_reference-restaurant-dark"],
  restaurant: ["_reference-restaurant-dark", "_reference-dark-immersive", "_reference-etery"],
  "tattoo parlor": ["_reference-dark-immersive", "_reference-warm-editorial", "_reference-nordiq"],
  "pet grooming": ["_reference-essentia", "_reference-heatfix", "_reference-forest-therapy"],
  dentist: ["_reference-heatfix", "_reference-essentia", "_reference-wellness-glass"],
  lawyer: ["_reference-stratex", "_reference-opurent", "_reference-minimal-brand"],
  "med spa": ["_reference-luxerra", "_reference-essentia", "_reference-wellness-glass"],
  fitness: ["_reference-bold-stats", "_reference-pilates", "_reference-nordiq"],
  contractor: ["_reference-bold-stats", "_reference-heatfix", "_reference-trades-clean"],
  tailor: ["_reference-warm-editorial", "_reference-minimal-brand", "_reference-essentia"],
  locksmith: ["_reference-heatfix", "_reference-trades-clean", "_reference-bold-stats"],
  florist: ["_reference-essentia", "_reference-warm-editorial", "_reference-forest-therapy"],
  cafe: ["_reference-dark-immersive", "_reference-etery", "_reference-warm-editorial"],
  // Solo-operator mobile-friendly categories
  "wedding photographer": ["_reference-warm-editorial", "_reference-dark-immersive", "_reference-nordiq"],
  "photography studio": ["_reference-warm-editorial", "_reference-dark-immersive", "_reference-nordiq"],
  "personal trainer": ["_reference-bold-stats", "_reference-dark-immersive", "_reference-pilates"],
  "mobile mechanic": ["_reference-heatfix", "_reference-bold-stats", "_reference-trades-clean"],
  "mobile car detailing": ["_reference-dark-immersive", "_reference-heatfix", "_reference-bold-stats"],
  "mobile pet groomer": ["_reference-essentia", "_reference-warm-editorial", "_reference-forest-therapy"],
  "pet groomer": ["_reference-essentia", "_reference-warm-editorial", "_reference-forest-therapy"],
  "auto detailing": ["_reference-dark-immersive", "_reference-heatfix", "_reference-bold-stats"],
  "dog walker": ["_reference-forest-therapy", "_reference-warm-editorial", "_reference-essentia"],
  "dog trainer": ["_reference-forest-therapy", "_reference-bold-stats", "_reference-warm-editorial"],
  handyman: ["_reference-heatfix", "_reference-bold-stats", "_reference-trades-clean"],
  "makeup artist": ["_reference-warm-editorial", "_reference-luxerra", "_reference-essentia"],
  "massage therapist": ["_reference-essentia", "_reference-wellness-glass", "_reference-warm-editorial"],
  "house cleaner": ["_reference-cleaning", "_reference-essentia", "_reference-heatfix"],
  "power washing": ["_reference-heatfix", "_reference-bold-stats", "_reference-trades-clean"],
  "carpet cleaning": ["_reference-heatfix", "_reference-cleaning", "_reference-bold-stats"],
  "piano teacher": ["_reference-warm-editorial", "_reference-minimal-brand", "_reference-essentia"],
  "guitar teacher": ["_reference-warm-editorial", "_reference-dark-immersive", "_reference-nordiq"],
  "personal chef": ["_reference-restaurant-dark", "_reference-etery", "_reference-warm-editorial"],
  "mobile notary": ["_reference-minimal-brand", "_reference-stratex", "_reference-bold-stats"],
  "mobile dj": ["_reference-dark-immersive", "_reference-nordiq", "_reference-warm-editorial"],
  tutor: ["_reference-minimal-brand", "_reference-warm-editorial", "_reference-bold-stats"],
};

// Only templates with photo-forward heroes that mockup injection handles cleanly.
// Excludes templates with heavy placeholder CTAs/descriptions that leak through (clean-services, handyman).
const FALLBACK_TEMPLATES = [
  "_reference-bold-stats",
  "_reference-dark-immersive",
  "_reference-warm-editorial",
  "_reference-heatfix",
];

function pickTemplate(category: string): string {
  const templates = TEMPLATE_MAP[category.toLowerCase()] || FALLBACK_TEMPLATES;
  return templates[Math.floor(Math.random() * templates.length)];
}

function serveStatic(dir: string, port: number): Promise<Server> {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(dir, req.url === "/" ? "/index.html" : req.url!);
      if (!filePath.includes(".")) filePath += ".html";

      if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const ext = extname(filePath);
      const mime = MIME_TYPES[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": mime });
      res.end(readFileSync(filePath));
    });
    server.listen(port, () => resolve(server));
  });
}

interface BusinessData {
  name: string;
  slug: string;
  category: string;
  city?: string;
  phone?: string;
  tagline?: string;
  rating?: number;
  reviewCount?: number;
  brandColors?: { primary?: string; accent?: string };
  photos?: { src: string; category?: string }[];
  analysis?: { suggested_tagline?: string };
}

function fallbackTagline(b: BusinessData): string {
  const cat = (b.category || "services").replace(/_/g, " ");
  const cityPart = b.city ? ` in ${b.city}` : "";
  const art = /^[aeiou]/i.test(cat) ? "An" : "A";
  return `${art} ${cat}${cityPart} — call for a free quote today.`;
}

function loadBusiness(slug: string): BusinessData | null {
  const path = join(DATA_DIR, slug, "business.json");
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf-8"));
}

function getBestPhoto(business: BusinessData): string | null {
  if (!business.photos?.length) return null;
  const exterior = business.photos.find((p) => p.category === "exterior");
  const interior = business.photos.find((p) => p.category === "interior");
  const work = business.photos.find((p) => p.category === "work");
  return (exterior || work || interior || business.photos[0]).src;
}

export async function generateMockup(
  slug: string,
  options?: { template?: string; outputPath?: string },
): Promise<string | null> {
  const business = loadBusiness(slug);
  if (!business) {
    console.error(`No business data for ${slug}`);
    return null;
  }

  const template = options?.template || pickTemplate(business.category);
  const templateDir = join(SITES_DIR, template, "out");
  if (!existsSync(templateDir)) {
    console.error(`Template ${template} has no build output at ${templateDir}`);
    return null;
  }

  const photoSrc = getBestPhoto(business);
  const businessPhotoDir = join(DATA_DIR, slug, "photos");

  // Copy the best business photo into the template's out/photos dir so it can be served
  let injectedPhotoPath: string | null = null;
  if (photoSrc && existsSync(businessPhotoDir)) {
    const photoFilename = photoSrc.replace(/^\/photos\//, "");
    const destPhotosDir = join(templateDir, "photos");
    if (!existsSync(destPhotosDir)) mkdirSync(destPhotosDir, { recursive: true });

    // Try webp first, then jpg
    for (const ext of [".webp", ".jpg", ".jpeg", ".png"]) {
      const base = photoFilename.replace(/\.\w+$/, "");
      const srcFile = join(businessPhotoDir, base + ext);
      if (existsSync(srcFile)) {
        const destFile = join(destPhotosDir, `_injected${ext}`);
        copyFileSync(srcFile, destFile);
        injectedPhotoPath = `/photos/_injected${ext}`;
        break;
      }
    }
    // Fallback: try exact filename
    if (!injectedPhotoPath) {
      const srcFile = join(businessPhotoDir, photoFilename);
      if (existsSync(srcFile)) {
        const destFile = join(destPhotosDir, `_injected${extname(photoFilename)}`);
        copyFileSync(srcFile, destFile);
        injectedPhotoPath = `/photos/_injected${extname(photoFilename)}`;
      }
    }
  }

  const port = 9222 + Math.floor(Math.random() * 1000);
  const server = await serveStatic(templateDir, port);

  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({
      headless: "shell",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      protocolTimeout: 180000,
    });
    const page = await browser.newPage();
    // Viewport matches hero crop — so `h-screen`/100vh heroes render at the cropped height
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${port}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait for JS to hydrate and animations to run
    await page.waitForSelector("h1", { timeout: 10000 });
    // Let Framer Motion animations complete (most are < 1.5s with delays)
    await new Promise((r) => setTimeout(r, 4000));

    // Force ALL elements visible first — Framer Motion sets opacity:0 as initial state
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.textContent = `
        *, *::before, *::after {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
          filter: none !important;
        }
      `;
      document.head.appendChild(style);
    });
    await new Promise((r) => setTimeout(r, 500));

    // Now inject business data
    await page.evaluate(
      (data) => {
        const heroSection = document.querySelector("section:first-of-type, main > div:first-of-type") as HTMLElement | null;

        // 1. Swap main heading
        const h1 = document.querySelector("h1");
        if (h1) h1.textContent = data.name;

        // 2. Swap nav brand name (first text in nav/header area)
        const navBrand = document.querySelector(
          "nav a:first-child, header a:first-child, nav span:first-child, nav p:first-child",
        ) as HTMLElement | null;
        if (navBrand) {
          // Remove any SVG-based template logo icon, keep the text
          const svg = navBrand.querySelector("svg");
          if (svg) svg.remove();
          navBrand.textContent = data.shortName;
        }

        // 3. Swap ALL imgs in hero to the business photo
        if (data.photoUrl) {
          const imgs = heroSection
            ? heroSection.querySelectorAll("img")
            : document.querySelectorAll("img");
          imgs.forEach((img) => {
            (img as HTMLImageElement).src = data.photoUrl;
            (img as HTMLImageElement).srcset = "";
            // Force cover sizing, since template may expect different aspect ratio
            (img as HTMLImageElement).style.objectFit = "cover";
            (img as HTMLImageElement).style.objectPosition = "center";
          });

          // Also swap CSS background-images anywhere in the hero
          if (heroSection) {
            const bgEls = heroSection.querySelectorAll("[style*='background-image'], [class*='bg-[url']");
            bgEls.forEach((el) => {
              const e = el as HTMLElement;
              e.style.backgroundImage = `url(${data.photoUrl})`;
              e.style.backgroundSize = "cover";
              e.style.backgroundPosition = "center";
              e.style.backgroundRepeat = "no-repeat";
            });

            // Replace gradient-only hero backgrounds with the photo
            const directChildren = Array.from(heroSection.children) as HTMLElement[];
            directChildren.forEach((child) => {
              const cs = window.getComputedStyle(child);
              const bg = cs.backgroundImage;
              if (bg && bg.includes("gradient") && !child.style.backgroundImage) {
                child.style.backgroundImage = `url(${data.photoUrl})`;
                child.style.backgroundSize = "cover";
                child.style.backgroundPosition = "center";
                child.style.backgroundRepeat = "no-repeat";
              }
            });
          }
        }

        // 4. Inject brand colors
        if (data.primary || data.accent) {
          const root = document.documentElement;
          if (data.primary) root.style.setProperty("--brand-primary", data.primary);
          if (data.accent) root.style.setProperty("--brand-accent", data.accent);
        }

        // 5. Update tagline — replace the paragraph after h1 with business tagline.
        // Always runs (even if tagline empty) so template placeholder text doesn't leak.
        if (h1) {
          let target: Element | null = h1.nextElementSibling;
          while (target && target.tagName !== "P" && target.children.length) {
            const p = target.querySelector("p");
            if (p) { target = p; break; }
            target = target.nextElementSibling;
          }
          if (target && (target.tagName === "P" || target.tagName === "SPAN")) {
            (target as HTMLElement).textContent = data.tagline;
          }
        }

        // 6. Replace ALL placeholder phone numbers in text nodes with business phone
        if (data.phone) {
          const phoneRegex = /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
          );
          const toUpdate: Text[] = [];
          let node: Node | null;
          while ((node = walker.nextNode())) {
            if (phoneRegex.test(node.textContent || "")) {
              toUpdate.push(node as Text);
              phoneRegex.lastIndex = 0;
            }
          }
          toUpdate.forEach((t) => {
            t.textContent = (t.textContent || "").replace(phoneRegex, data.phone);
          });
          // Also patch tel: hrefs
          document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
            (a as HTMLAnchorElement).href = `tel:${data.phone.replace(/\D/g, "")}`;
          });
        }

        // 7. Replace template-hinting placeholder text
        const placeholderMap: [RegExp, string][] = [
          [/Get template for free/gi, "Get Started"],
          [/Template$/gi, ""],
          [/Home 2|Home 3|Home 4/gi, ""],
          [/Affordable HVAC Solutions in \w+\./gi, data.name],
          [/plumbing solutions/gi, data.category + " services"],
          [/top-notch plumbing/gi, "top-notch " + data.category],
          [/With over 20 years of experience[^.]*\./gi, data.tagline || ""],
          [/From 2000\+ ratings/gi, data.reviewCount ? `From ${data.reviewCount}+ reviews` : ""],
          [/From \d+\+ ratings/gi, data.reviewCount ? `From ${data.reviewCount}+ reviews` : ""],
        ];
        const walker2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const textNodes: Text[] = [];
        let n: Node | null;
        while ((n = walker2.nextNode())) textNodes.push(n as Text);
        textNodes.forEach((t) => {
          let txt = t.textContent || "";
          for (const [re, rep] of placeholderMap) {
            txt = txt.replace(re, rep);
          }
          if (txt !== t.textContent) t.textContent = txt;
        });

        // 8. Remove "Home 2", "Blog" nav links that are template artifacts
        document.querySelectorAll("nav a, header a").forEach((a) => {
          const txt = (a.textContent || "").trim();
          if (/^(Home [2-9]|Blog|Portfolio)$/i.test(txt)) {
            a.remove();
          }
        });
      },
      {
        name: business.name,
        shortName: business.name.split(/[&–—]/).map((s: string) => s.trim())[0],
        photoUrl: injectedPhotoPath,
        primary: business.brandColors?.primary,
        accent: business.brandColors?.accent,
        tagline:
          business.analysis?.suggested_tagline ||
          business.tagline ||
          fallbackTagline(business),
        phone: business.phone || "",
        category: business.category || "services",
        reviewCount: business.reviewCount || 0,
      },
    );

    await new Promise((r) => setTimeout(r, 500));

    const outputPath =
      options?.outputPath || join(DATA_DIR, slug, "mockup.png");

    // Ensure we're at the top for hero capture
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 300));

    // Re-force visibility
    await page.evaluate(() => {
      document.querySelectorAll("*").forEach((el) => {
        const s = window.getComputedStyle(el);
        if (parseFloat(s.opacity) < 0.5) (el as HTMLElement).style.opacity = "1";
      });
    });

    // Hero-only JPEG screenshot for reliable iMessage delivery.
    // JPEG @ quality 88 produces ~300-800KB files vs 2-4MB PNG equivalents.
    await page.screenshot({
      path: outputPath,
      type: "jpeg",
      quality: 88,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    console.log(`Mockup saved: ${outputPath} (template: ${template})`);
    return outputPath;
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

// CLI mode
if (process.argv[1]?.endsWith("mockup.ts")) {
  const args = process.argv.slice(2);
  const slugIdx = args.indexOf("--slug");
  const templateIdx = args.indexOf("--template");
  const slug = slugIdx >= 0 ? args[slugIdx + 1] : args[0];
  const template = templateIdx >= 0 ? args[templateIdx + 1] : undefined;

  if (!slug) {
    console.log("Usage: npx tsx scripts/mockup.ts --slug <business-slug> [--template <template-name>]");
    process.exit(1);
  }

  generateMockup(slug, { template }).then((path) => {
    if (!path) process.exit(1);
  });
}
