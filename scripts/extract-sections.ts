/**
 * Section Registry Extractor
 *
 * Reads all _reference-* sites and extracts individual section code blocks
 * into data/section-registry-draft.json for enrichment.
 *
 * Usage: npx tsx scripts/extract-sections.ts [--source _reference-agevia]
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { join, basename } from "path";

const ROOT = join(__dirname, "..");
const SITES_DIR = join(ROOT, "sites");
const OUTPUT = join(ROOT, "data", "section-registry-draft.json");

// ── Section comment marker pattern ──────────────────────────────────────────
// Matches: {/* ── SECTION_NAME ── */}  or  {/* ── SECTION_NAME — Description ── */}
const SECTION_MARKER = /\{\/\*\s*──\s*(.+?)\s*──\s*\*\/\}/;

// ── Canonical section type mapping ──────────────────────────────────────────
const TYPE_MAP: Record<string, string> = {
  hero: "hero",
  navbar: "navbar",
  nav: "navbar",
  services: "services",
  about: "about",
  testimonials: "testimonials",
  reviews: "testimonials",
  faq: "faq",
  stats: "stats",
  numbers: "stats",
  "brand stats": "stats",
  process: "process",
  "how it works": "process",
  comparison: "comparison",
  "comparison table": "comparison",
  gallery: "gallery",
  photos: "gallery",
  contact: "contact",
  cta: "cta",
  footer: "footer",
  ticker: "ticker",
  marquee: "ticker",
  "marquee ticker": "ticker",
  pricing: "pricing",
  team: "team",
  menu: "menu",
  industries: "industries",
  spaces: "industries",
  blog: "blog",
  news: "blog",
  roadblocks: "intro",
  "get started": "intro",
  why: "value-prop",
  "chef quote": "quote",
  "logo bar": "logos",
  "popular categories": "categories",
};

function inferSectionType(markerText: string): string {
  const lower = markerText
    .toLowerCase()
    .replace(/[—:]+.*$/, "") // strip description after — or :
    .trim();

  // Direct match
  if (TYPE_MAP[lower]) return TYPE_MAP[lower];

  // Partial match
  for (const [key, type] of Object.entries(TYPE_MAP)) {
    if (lower.includes(key)) return type;
  }

  return "custom";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[—:]+/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface RawSection {
  markerText: string;
  startLine: number;
  endLine: number;
  code: string;
}

interface HelperFunction {
  name: string;
  startLine: number;
  endLine: number;
  code: string;
}

function extractSections(filePath: string): RawSection[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const sections: RawSection[] = [];

  // Find all section markers and their line numbers
  const markers: { text: string; line: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(SECTION_MARKER);
    if (match) {
      markers.push({ text: match[1].trim(), line: i });
    }
  }

  // Extract code between consecutive markers
  for (let i = 0; i < markers.length; i++) {
    const start = markers[i].line;
    const end = i + 1 < markers.length ? markers[i + 1].line : lines.length;
    const sectionLines = lines.slice(start, end);

    // Trim trailing empty lines
    while (
      sectionLines.length > 0 &&
      sectionLines[sectionLines.length - 1].trim() === ""
    ) {
      sectionLines.pop();
    }

    sections.push({
      markerText: markers[i].text,
      startLine: start + 1, // 1-indexed
      endLine: start + sectionLines.length,
      code: sectionLines.join("\n"),
    });
  }

  return sections;
}

function extractHelperFunctions(filePath: string): HelperFunction[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const helpers: HelperFunction[] = [];

  // Find function declarations (not the main export)
  const funcPattern = /^function\s+(\w+)/;
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(funcPattern);
    if (match && !lines[i].includes("export default")) {
      const name = match[1];
      // Find the end of this function by tracking braces
      let braceCount = 0;
      let started = false;
      let endLine = i;
      for (let j = i; j < lines.length; j++) {
        for (const ch of lines[j]) {
          if (ch === "{") {
            braceCount++;
            started = true;
          }
          if (ch === "}") braceCount--;
        }
        if (started && braceCount === 0) {
          endLine = j;
          break;
        }
      }
      helpers.push({
        name,
        startLine: i + 1,
        endLine: endLine + 1,
        code: lines.slice(i, endLine + 1).join("\n"),
      });
    }
  }

  return helpers;
}

function extractDataArrays(filePath: string): Map<string, string> {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const arrays = new Map<string, string>();

  // Find const declarations with arrays/objects at module level
  const constPattern = /^const\s+(\w+)\s*[=:]/;
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(constPattern);
    if (match) {
      const name = match[1];
      // Find end by tracking brackets
      let bracketCount = 0;
      let braceCount = 0;
      let started = false;
      let endLine = i;
      for (let j = i; j < lines.length; j++) {
        for (const ch of lines[j]) {
          if (ch === "[") {
            bracketCount++;
            started = true;
          }
          if (ch === "]") bracketCount--;
          if (ch === "{") {
            braceCount++;
            started = true;
          }
          if (ch === "}") braceCount--;
        }
        if (started && bracketCount <= 0 && braceCount <= 0) {
          endLine = j;
          break;
        }
        // Simple single-line const
        if (!started && j === i) {
          endLine = j;
          break;
        }
      }
      arrays.set(name, lines.slice(i, endLine + 1).join("\n"));
    }
  }

  return arrays;
}

function detectDependencies(code: string): {
  imports: string[];
  components: string[];
  cssVariables: string[];
  customKeyframes: string[];
} {
  const imports: Set<string> = new Set();
  const components: Set<string> = new Set();
  const cssVariables: Set<string> = new Set();

  // Detect framer-motion usage
  if (
    /motion\.|useScroll|useTransform|useInView|useMotionValue|AnimatePresence|animate\(/.test(
      code,
    )
  ) {
    imports.add("framer-motion");
  }

  // Detect lucide-react icons
  const iconMatches = code.match(/<([A-Z][a-z]+[A-Z]\w*|[A-Z]\w+)\s/g);
  if (iconMatches) {
    // Filter to likely icon names (common lucide pattern)
    const lucidePattern =
      /ArrowRight|ArrowUpRight|Phone|Mail|MapPin|Clock|Star|CheckCircle|X|ChevronDown|Plus|Minus|Play|Lightbulb|Target|TrendingUp|Shield|Users|BarChart|Briefcase|Building|Globe|Rocket/;
    if (lucidePattern.test(code)) {
      imports.add("lucide-react");
    }
  }

  // Detect shared component usage
  const sharedComponents = [
    "AnimatedCounter",
    "MarqueeTicker",
    "ParallaxImage",
    "SectionDivider",
    "StickySection",
    "BlurredReveal",
    "ZoomOutReveal",
    "HeroSection",
    "ServiceCards",
    "TestimonialCarousel",
    "StatsCounter",
    "FAQAccordion",
    "ContactSection",
    "Footer",
    "Navbar",
    "ImageGallery",
    "ProcessSteps",
    "TeamGrid",
    "ComparisonTable",
    "ClickToCall",
  ];
  for (const comp of sharedComponents) {
    if (new RegExp(`<${comp}[\\s/>]`).test(code)) {
      components.add(comp);
    }
  }

  // Detect CSS variable usage
  const varMatches = code.matchAll(/var\(--([a-z-]+)\)/g);
  for (const m of varMatches) {
    cssVariables.add(`--${m[1]}`);
  }

  // Detect custom keyframes references
  const customKeyframes: string[] = [];
  const keyframeRefs = code.matchAll(/animation:\s*['"]?(\w[\w-]+)/g);
  for (const m of keyframeRefs) {
    if (!["ease", "linear", "none"].includes(m[1])) {
      customKeyframes.push(m[1]);
    }
  }
  // Also check for keyframe names in className
  const tickerMatch = code.match(
    /ticker-left|ticker-right|marquee|spin|pulse|bounce/,
  );
  if (tickerMatch) {
    customKeyframes.push(...tickerMatch);
  }

  return {
    imports: [...imports],
    components: [...components],
    cssVariables: [...cssVariables],
    customKeyframes: [...new Set(customKeyframes)],
  };
}

function estimateComplexity(code: string): "simple" | "medium" | "complex" {
  const lines = code.split("\n").length;
  const hasAnimation = /motion\.|useScroll|useTransform|animate/.test(code);
  const hasCustomComponent = /^function\s+\w+/m.test(code);

  if (lines > 100 || (hasAnimation && hasCustomComponent)) return "complex";
  if (lines > 40 || hasAnimation || hasCustomComponent) return "medium";
  return "simple";
}

function inferDataShape(code: string, sectionType: string): string {
  // Look for .map() calls to infer data shape
  const mapPatterns = code.matchAll(
    /(\w+)\.map\(\(?(\w+)(?:,\s*\w+)?\)?\s*=>/g,
  );
  const shapes: string[] = [];
  for (const m of mapPatterns) {
    const arrayName = m[1];
    const itemName = m[2];
    // Look for property accesses on the item
    const propAccesses = code.matchAll(
      new RegExp(`${itemName}\\.([a-zA-Z]+)`, "g"),
    );
    const props = new Set<string>();
    for (const p of propAccesses) props.add(p[1]);
    if (props.size > 0) {
      shapes.push(`${arrayName}: Array of { ${[...props].join(", ")} }`);
    }
  }
  return shapes.join("; ") || `Standard ${sectionType} data`;
}

// ── Main ────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const sourceFilter = args.includes("--source")
    ? args[args.indexOf("--source") + 1]
    : null;

  // Find reference sites
  let refDirs = readdirSync(SITES_DIR)
    .filter((d) => d.startsWith("_reference-"))
    .filter((d) => existsSync(join(SITES_DIR, d, "app", "page.tsx")));

  if (sourceFilter) {
    refDirs = refDirs.filter(
      (d) => d === sourceFilter || d === `_reference-${sourceFilter}`,
    );
  }

  console.log(`Found ${refDirs.length} reference sites to extract from`);

  const allEntries: any[] = [];
  const skippedTypes = new Set(["navbar", "footer"]); // Skip structural sections

  for (const dir of refDirs) {
    const filePath = join(SITES_DIR, dir, "app", "page.tsx");
    const siteName = dir.replace("_reference-", "");
    console.log(`\n── ${dir} ──`);

    const sections = extractSections(filePath);
    const helpers = extractHelperFunctions(filePath);

    for (const section of sections) {
      const sectionType = inferSectionType(section.markerText);

      // Skip navbar/footer — they're structural, not creative
      if (skippedTypes.has(sectionType)) {
        console.log(`  skip: ${section.markerText} (${sectionType})`);
        continue;
      }

      // Find helper functions referenced in this section
      let fullCode = section.code;
      for (const helper of helpers) {
        // Check if the section references this helper
        if (
          section.code.includes(`<${helper.name}`) ||
          section.code.includes(`${helper.name}(`)
        ) {
          // Only include if the helper is NOT within this section's line range
          if (
            helper.startLine < section.startLine ||
            helper.endLine > section.endLine
          ) {
            fullCode = helper.code + "\n\n" + fullCode;
          }
        }
      }

      const id = `${siteName}-${slugify(section.markerText)}`;
      const deps = detectDependencies(fullCode);
      const complexity = estimateComplexity(fullCode);
      const linesOfCode = fullCode.split("\n").length;
      const dataShape = inferDataShape(fullCode, sectionType);

      console.log(
        `  ${sectionType}: ${section.markerText} (${linesOfCode} lines, ${complexity})`,
      );

      allEntries.push({
        id,
        source: dir,
        sectionType,
        name: section.markerText.replace(/[──]/g, "").trim(),
        description: "", // Filled by enrichment
        vibes: [], // Filled by enrichment
        visualTraits: [], // Filled by enrichment
        complexity,
        dependencies: deps,
        code: fullCode,
        dataShape,
        linesOfCode,
      });
    }
  }

  // Write output
  const registry = {
    version: "1.0",
    lastUpdated: new Date().toISOString(),
    entries: allEntries,
  };

  writeFileSync(OUTPUT, JSON.stringify(registry, null, 2), "utf-8");
  console.log(`\n✓ Extracted ${allEntries.length} sections → ${OUTPUT}`);
  console.log(
    `  Section types: ${[...new Set(allEntries.map((e) => e.sectionType))].join(", ")}`,
  );
}

main();
