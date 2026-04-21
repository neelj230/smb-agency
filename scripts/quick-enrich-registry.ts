// Quick enrichment of section registry using source site vibe mappings + technique patterns.
// No API calls — uses deterministic rules based on source site and code analysis.
// Usage: npx tsx scripts/quick-enrich-registry.ts

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const REGISTRY_PATH = join(process.cwd(), "data", "section-registry.json");

// Vibe mappings per reference site (from the creative director's REFERENCE_VIBES)
const SITE_VIBES: Record<string, string[]> = {
  "_reference-agevia": ["professional", "bold", "premium", "creative"],
  "_reference-arpeggio": ["bold", "creative", "premium", "modern"],
  "_reference-bamzi": ["warm", "elegant", "premium", "personal"],
  "_reference-bold-stats": ["bold", "direct", "professional", "trustworthy"],
  "_reference-clean-services": ["professional", "trustworthy", "direct", "clean"],
  "_reference-cleaning": ["professional", "direct", "clean", "bold"],
  "_reference-dark-immersive": ["playful", "creative", "warm", "immersive"],
  "_reference-draftr": ["modern", "clean", "professional", "creative"],
  "_reference-dreelio": ["creative", "modern", "premium", "playful"],
  "_reference-ehunter": ["cinematic", "dark", "bold", "premium"],
  "_reference-essentia": ["elegant", "premium", "minimal", "clean"],
  "_reference-etery": ["modern", "creative", "bold", "professional"],
  "_reference-forest-therapy": ["warm", "serene", "personal", "immersive"],
  "_reference-gardener": ["warm", "elegant", "personal", "creative"],
  "_reference-handyman": ["professional", "trustworthy", "direct", "clean"],
  "_reference-heatfix": ["bold", "direct", "professional", "trustworthy"],
  "_reference-hotel": ["premium", "elegant", "warm", "immersive"],
  "_reference-kids-camp": ["playful", "fun", "warm", "creative"],
  "_reference-luxerra": ["premium", "dark", "bold", "elegant"],
  "_reference-marketing": ["creative", "bold", "modern", "professional"],
  "_reference-minimal-brand": ["elegant", "premium", "minimal", "clean"],
  "_reference-mobius": ["bold", "creative", "premium", "modern"],
  "_reference-nordiq": ["elegant", "premium", "creative", "minimal"],
  "_reference-opurent": ["cinematic", "premium", "bold", "dark"],
  "_reference-pilates": ["warm", "elegant", "personal", "clean"],
  "_reference-platform": ["modern", "bold", "creative", "premium"],
  "_reference-real-estate": ["premium", "dark", "professional", "bold"],
  "_reference-realdev": ["cinematic", "premium", "immersive", "bold"],
  "_reference-restaurant-dark": ["warm", "personal", "elegant", "premium"],
  "_reference-stratex": ["professional", "bold", "premium", "creative"],
  "_reference-therapy": ["warm", "personal", "serene", "elegant"],
  "_reference-trades-clean": ["bold", "direct", "professional", "trustworthy"],
  "_reference-warm-editorial": ["warm", "personal", "creative", "elegant"],
  "_reference-wellness-glass": ["warm", "personal", "elegant", "premium"],
  "_reference-yachtera": ["premium", "elegant", "cinematic", "immersive"],
};

// Visual trait detection by code patterns
function detectTraits(code: string): string[] {
  const traits: string[] = [];

  // Background
  if (code.includes("bg-black") || code.includes("bg-gray-900") || code.includes("bg-[var(--brand-bg-dark)]")) traits.push("dark-bg");
  if (code.includes("bg-white") || code.includes("bg-[var(--brand-bg)]")) traits.push("light-bg");
  if (code.includes("bg-gradient")) traits.push("gradient-bg");

  // Layout
  if (code.includes("min-h-screen") || code.includes("inset-0")) traits.push("full-bleed");
  if (code.includes("grid-cols-2") && code.includes("gap")) traits.push("split-layout");
  if (code.includes("grid-cols-3") || code.includes("grid-cols-4")) traits.push("grid-layout");
  if (/rounded-2xl.*p-[678]/.test(code) || /shadow-/.test(code)) traits.push("card-based");

  // Animation/interaction
  if (code.includes("AccordionItem") || /height.*auto/.test(code)) traits.push("accordion");
  if (code.includes("Carousel") || code.includes("activeIndex") || code.includes("activeSlide")) traits.push("carousel");
  if (code.includes("marquee") || code.includes("ticker")) traits.push("marquee");
  if (code.includes("whileInView") || code.includes("useScroll")) traits.push("scroll-animation");
  if (code.includes("useTransform") && code.includes("useScroll")) traits.push("parallax");
  if (code.includes("sticky")) traits.push("sticky");
  if (code.includes("opacity: 0") && code.includes("opacity: 1")) traits.push("fade-in");
  if (/delay.*i\s*\*/.test(code)) traits.push("stagger");
  if (code.includes("scale")) traits.push("zoom");
  if (code.includes("blur")) traits.push("blur-reveal");
  if (code.includes("AnimatedCounter") || code.includes("onUpdate")) traits.push("counter-animation");
  if (code.includes("group-hover")) traits.push("hover-effect");

  // Typography
  if (code.includes("clamp(") && /[4-9]rem/.test(code)) traits.push("large-text");
  if (code.includes("font-display") || code.includes("serif")) traits.push("serif");
  if (code.includes("font-mono")) traits.push("monospace");

  // Content
  if (code.includes("<img") || code.includes("object-cover")) traits.push("image-heavy");
  if (code.includes("<video")) traits.push("video-bg");
  if (code.includes("backdrop-blur")) traits.push("glass-effect");
  if (code.includes("border-[var(--brand")) traits.push("border-accent");
  if (/<(Wrench|Hammer|Zap|Heart|Star|Check|Shield)/.test(code)) traits.push("icon-based");

  return [...new Set(traits)];
}

function main() {
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
  let enriched = 0;

  for (const entry of registry.entries) {
    // Get vibes from site mapping
    const siteVibes = SITE_VIBES[entry.source] || [];

    // Add section-type specific vibes
    const typeVibes: Record<string, string[]> = {
      hero: ["bold", "immersive"],
      testimonials: ["trustworthy", "personal"],
      about: ["warm", "personal"],
      services: ["professional", "direct"],
      gallery: ["creative", "immersive"],
      stats: ["bold", "professional"],
      process: ["professional", "clean"],
      pricing: ["direct", "clean"],
      faq: ["professional", "clean"],
      cta: ["bold", "direct"],
      contact: ["professional", "direct"],
      team: ["personal", "warm"],
      menu: ["warm", "elegant"],
      comparison: ["bold", "direct"],
      ticker: ["bold", "creative"],
      intro: ["creative", "immersive"],
      blog: ["editorial", "professional"],
      logos: ["professional", "trustworthy"],
    };

    const sectionTypeVibes = typeVibes[entry.sectionType] || [];

    // Combine, deduplicate, take top 4
    const allVibes = [...siteVibes, ...sectionTypeVibes];
    const vibeCounts = new Map<string, number>();
    for (const v of allVibes) {
      vibeCounts.set(v, (vibeCounts.get(v) || 0) + 1);
    }
    const sortedVibes = [...vibeCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([v]) => v)
      .slice(0, 4);

    entry.vibes = sortedVibes;

    // Detect visual traits from code
    entry.visualTraits = detectTraits(entry.code);

    // Generate description from name if empty
    if (!entry.description) {
      entry.description = `${entry.name} section from ${entry.source.replace("_reference-", "")} reference site.`;
    }

    enriched++;
  }

  registry.lastUpdated = new Date().toISOString();
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));

  console.log(`Enriched ${enriched} of ${registry.entries.length} entries.`);

  // Verify
  const withVibes = registry.entries.filter((e: any) => e.vibes.length > 0).length;
  const withTraits = registry.entries.filter((e: any) => e.visualTraits.length > 0).length;
  console.log(`Entries with vibes: ${withVibes}`);
  console.log(`Entries with visual traits: ${withTraits}`);
}

main();
