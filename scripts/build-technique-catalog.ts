#!/usr/bin/env npx tsx
// Build Technique Catalog — extracts technique signatures from all reference sites.
// Scans all _reference-* sites and detects visual techniques by pattern-matching
// against known code signatures. Rebuilds the technique catalog from source code,
// ensuring the catalog stays in sync as sites change.
// Usage: npx tsx scripts/build-technique-catalog.ts

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

const SITES_DIR = join(process.cwd(), "sites");
const CATALOG_PATH = join(process.cwd(), "data", "technique-catalog.json");

// Pattern detectors — each returns true if the technique is present in the code
const TECHNIQUE_DETECTORS: Record<string, (code: string) => boolean> = {
  "fade-up-on-scroll": (code) =>
    code.includes("whileInView") && code.includes("opacity: 0"),
  "staggered-children": (code) =>
    /delay:\s*i\s*\*\s*0\.\d/.test(code) || code.includes("staggerChildren"),
  "hero-stagger-reveal": (code) =>
    /animate=\{\{[^}]*opacity:\s*1[^}]*\}\}/.test(code) &&
    /delay:\s*0\.[2-7]/.test(code),
  "word-by-word-reveal": (code) =>
    code.includes("split(") &&
    (code.includes(".map") || code.includes("words.map")) &&
    /delay.*i\s*\*/.test(code) &&
    /opacity.*0\.\d{1,2}/.test(code),
  "word-by-word-blur-fade": (code) =>
    code.includes("blur(10px)") || code.includes("blur(8px)"),
  "typewriter-text": (code) =>
    code.includes("typewriter") ||
    (code.includes("setInterval") && code.includes("slice(0,")),
  "line-by-line-slide-up": (code) =>
    code.includes("overflow-hidden") &&
    /y:\s*['"]100%['"]/.test(code),
  "live-animated-counter": (code) =>
    code.includes("useMotionValue") ||
    (code.includes("animate(") && code.includes("onUpdate")),
  "accordion-height-animation": (code) =>
    /height:.*auto/.test(code) && code.includes("opacity"),
  "rotating-testimonials-carousel": (code) =>
    /rotate.*activeIndex/.test(code) ||
    (/activeIndex|activeSlide/.test(code) && code.includes("testimonial")),
  "3d-perspective-carousel": (code) =>
    code.includes("perspective") && code.includes("rotateY"),
  "scale-in-on-scroll": (code) =>
    /scale:\s*0\.9[0-9]/.test(code) && code.includes("whileInView"),
  "scroll-linked-parallax-hero": (code) =>
    code.includes("useScroll") &&
    code.includes("useTransform") &&
    /scale.*1\.1/.test(code),
  "sticky-scroll-cards": (code) =>
    code.includes("sticky top-0") &&
    /height.*100vh/.test(code) &&
    code.includes("useTransform"),
  "scroll-driven-character-reveal": (code) =>
    /revealedChars|charIndex/.test(code) && code.includes("useTransform"),
  "scroll-driven-story-reveal": (code) =>
    /scrollStory|storyPhrase/.test(code) ||
    (/phrases?.*\.length.*vh/.test(code) && code.includes("sticky")),
  "scroll-driven-reason-cards": (code) =>
    /reasons?.*\.length.*vh/.test(code) ||
    (/activeIndex.*Math\.floor/.test(code) && code.includes("scrollYProgress")),
  "scroll-following-product": (code) =>
    code.includes("pointer-events-none") &&
    code.includes("fixed") &&
    code.includes("useTransform") &&
    /left-1\/2|top-1\/2/.test(code),
  "scroll-linked-blur-reveal": (code) =>
    /blur.*useTransform/.test(code) ||
    (code.includes("blur") && code.includes("useTransform") && /20|15/.test(code)),
  "sticky-hero-scale-shrink": (code) =>
    /heroScale.*0\.8[0-9]/.test(code) ||
    (/useTransform.*1.*0\.8/.test(code) && code.includes("hero")),
  "expanding-footer-scale": (code) =>
    /footerScale|footerRadius/.test(code),
  "card-scroll-3d-animation": (code) =>
    /cardRotation.*15/.test(code) ||
    (code.includes("rotateY") && /cardProgress/.test(code)),
  "expanding-circle-divider": (code) =>
    /circleScale.*60/.test(code),
  "rotating-product-on-scroll": (code) =>
    /rotate.*360/.test(code) && code.includes("useTransform"),
  "infinite-horizontal-marquee": (code) =>
    code.includes("marquee") ||
    (/x.*-50%/.test(code) && /repeat:\s*Infinity/.test(code)) ||
    code.includes("ticker-left"),
  "opposing-direction-marquees": (code) =>
    code.includes("marquee-left") && code.includes("marquee-right"),
  "rotating-question-rows": (code) =>
    code.includes("ticker-right") && code.includes("ticker-left"),
  "large-flowing-marquee-text": (code) =>
    /text-\[clamp\(5rem/.test(code) && /0\.04/.test(code),
  "vertical-feed-scroll": (code) =>
    /vertical-scroll|scroll-y/.test(code) &&
    code.includes("overflow-hidden"),
  "css-columns-masonry": (code) =>
    code.includes("columns-") && code.includes("break-inside-avoid"),
  "overlapping-sections": (code) =>
    /-mt-[1-9]/.test(code) && /z-[12][0-9]/.test(code),
  "circular-images": (code) =>
    /w-\d+\s+h-\d+\s+rounded-full/.test(code) && code.includes("overflow-hidden"),
  "schedule-table-grid": (code) =>
    code.includes("grid-cols-4") && /schedule|time|slot/.test(code),
  "pricing-highlighted-middle": (code) =>
    code.includes("highlighted") && /scale-\[1\.0[2-5]\]/.test(code),
  "glass-morphism": (code) =>
    code.includes("backdrop-blur") && /bg-white\/[12][0-9]/.test(code),
  "film-grain-overlay": (code) =>
    code.includes("film-grain") ||
    (code.includes("turbulence") && code.includes("mix-blend")),
  "dot-pattern-background": (code) =>
    code.includes("radial-gradient") &&
    /1px.*transparent/.test(code) &&
    /40px|32px/.test(code),
  "video-background-hero": (code) =>
    code.includes("<video") && code.includes("autoPlay"),
  "mix-blend-difference-cursor": (code) =>
    code.includes("mix-blend-difference") && code.includes("cursor"),
  "mix-blend-difference-navbar": (code) =>
    code.includes("mix-blend-difference") && /nav|Nav/.test(code),
  "image-zoom-on-hover": (code) =>
    code.includes("group-hover:scale-1"),
  "gallery-overlay-reveal": (code) =>
    code.includes("group-hover:bg-black/") &&
    code.includes("group-hover:opacity-100"),
  "comparison-check-x-table": (code) =>
    code.includes("<Check") && code.includes("<X") && code.includes("grid"),
  "decorative-svg-shapes": (code) =>
    code.includes("<svg") &&
    code.includes("polygon") &&
    code.includes("opacity"),
  "floating-background-glows": (code) =>
    /blur-\[120px\]|blur-\[100px\]/.test(code) && /w-\[600px\]|w-\[500px\]/.test(code),
  "sky-gradient-clouds": (code) =>
    code.includes("cloud-layer") ||
    (code.includes("sky-gradient") && code.includes("radial-gradient")),
  "giant-brand-text": (code) =>
    /clamp\(6rem|clamp\(8rem/.test(code) && /20vw|22vw/.test(code),
};

function main() {
  // 1. Load existing catalog
  let catalog: any;
  if (existsSync(CATALOG_PATH)) {
    catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf-8"));
  } else {
    console.error("No existing catalog found. Run initial catalog creation first.");
    process.exit(1);
  }

  // 2. Find all reference sites
  const refDirs = readdirSync(SITES_DIR)
    .filter((d) => d.startsWith("_reference-"))
    .filter((d) =>
      existsSync(join(SITES_DIR, d, "app", "page.tsx")),
    );

  console.log(`Found ${refDirs.length} reference sites`);

  // 3. For each site, detect which techniques are present
  const siteDetections: Record<string, Set<string>> = {};

  for (const dir of refDirs) {
    const pagePath = join(SITES_DIR, dir, "app", "page.tsx");
    const code = readFileSync(pagePath, "utf-8");
    const shortName = dir.replace("_reference-", "");
    siteDetections[shortName] = new Set();

    for (const [techId, detector] of Object.entries(TECHNIQUE_DETECTORS)) {
      try {
        if (detector(code)) {
          siteDetections[shortName].add(techId);
        }
      } catch {
        // Skip detector errors
      }
    }

    console.log(
      `  ${shortName}: ${siteDetections[shortName].size} techniques detected`,
    );
  }

  // 4. Update sources in catalog
  let updatedCount = 0;
  for (const technique of catalog.techniques) {
    const detectedSources: string[] = [];
    for (const [site, techs] of Object.entries(siteDetections)) {
      if (techs.has(technique.id)) {
        detectedSources.push(site);
      }
    }

    if (detectedSources.length > 0) {
      // Merge detected sources with existing (some sources may be manual)
      const allSources = new Set([
        ...technique.sources,
        ...detectedSources,
      ]);
      const newSources = Array.from(allSources).sort();

      if (JSON.stringify(newSources) !== JSON.stringify(technique.sources.sort())) {
        technique.sources = newSources;
        technique.frequency = newSources.length;
        updatedCount++;
      }
    }
  }

  // 5. Report undetected techniques (only have detector but no catalog entry)
  const catalogIds = new Set(catalog.techniques.map((t: any) => t.id));
  const detectorIds = new Set(Object.keys(TECHNIQUE_DETECTORS));
  const detectorsWithoutCatalog = [...detectorIds].filter(
    (id) => !catalogIds.has(id),
  );
  if (detectorsWithoutCatalog.length > 0) {
    console.log(
      `\nWarning: ${detectorsWithoutCatalog.length} detectors have no catalog entry:`,
    );
    for (const id of detectorsWithoutCatalog) {
      console.log(`  - ${id}`);
    }
  }

  // 6. Write updated catalog
  catalog.lastUpdated = new Date().toISOString().split("T")[0];
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
  console.log(
    `\nUpdated ${updatedCount} techniques. Catalog has ${catalog.techniques.length} techniques total.`,
  );

  // 7. Summary
  console.log("\nTechnique coverage per site:");
  const sortedSites = Object.entries(siteDetections)
    .sort((a, b) => b[1].size - a[1].size);
  for (const [site, techs] of sortedSites) {
    console.log(`  ${site}: ${techs.size} techniques`);
  }
}

main();
