/**
 * Template Adapter — copies a reference site's page.tsx and replaces business data.
 *
 * Architecture:
 * 1. Parse template into DATA region (top consts) and RENDER region (JSX)
 * 2. Use Claude to rewrite ONLY the DATA region (~100 lines, not 800)
 * 3. Deterministic replacements in RENDER region (business name, phone, photos)
 * 4. Extract custom CSS from reference globals.css
 * 5. Reassemble and return
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { BusinessData } from "../components/types";
import type { VibeProfile, PhotoManifest } from "./types";

interface AdaptedOutput {
  pageTsx: string;
  globalsCssExtras: string;
  templateCssVars?: Record<string, string>;
}

interface ParsedTemplate {
  imports: string;
  dataRegion: string;
  helperFunctions: string; // inline component functions between data and export default
  renderRegion: string; // includes "export default function..." and everything after
  originalBusinessName: string;
  originalPhone: string;
  functionName: string;
}

/**
 * Parse a reference page.tsx into structured regions.
 */
function parseTemplate(source: string): ParsedTemplate {
  const lines = source.split("\n");

  // Find the "export default function" line
  const exportIdx = lines.findIndex((l) =>
    /^export\s+default\s+function/.test(l.trim()),
  );
  if (exportIdx === -1) {
    throw new Error("Could not find 'export default function' in template");
  }

  // Split into imports+data vs render
  const topLines = lines.slice(0, exportIdx);
  const renderLines = lines.slice(exportIdx);

  // Separate imports from data constants
  const importLines: string[] = [];
  const dataLines: string[] = [];
  let inImports = true;
  let insideMultiLineImport = false;

  for (const line of topLines) {
    const trimmed = line.trim();
    if (inImports) {
      // Track multi-line imports: import { ... } from "..."
      if (trimmed.startsWith("import ") && !trimmed.includes(" from ")) {
        insideMultiLineImport = true;
        importLines.push(line);
        continue;
      }
      if (insideMultiLineImport) {
        importLines.push(line);
        if (trimmed.includes(" from ")) {
          insideMultiLineImport = false;
        }
        continue;
      }
      if (
        trimmed.startsWith("import ") ||
        trimmed.startsWith("'use client'") ||
        trimmed.startsWith('"use client"') ||
        trimmed === "" ||
        trimmed.startsWith("//") ||
        trimmed.startsWith("/*") ||
        trimmed.startsWith("*") ||
        trimmed.startsWith("} from")
      ) {
        importLines.push(line);
        continue;
      }
      inImports = false;
    }
    dataLines.push(line);
  }

  // Separate data constants from inline helper functions
  // Helper functions start with "function " at the start of a line
  const pureDataLines: string[] = [];
  const helperLines: string[] = [];
  let inHelperFunction = false;
  let braceDepth = 0;

  for (const line of dataLines) {
    const trimmed = line.trim();
    if (
      !inHelperFunction &&
      /^function\s+[A-Z]/.test(trimmed)
    ) {
      inHelperFunction = true;
      braceDepth = 0;
    }

    if (inHelperFunction) {
      helperLines.push(line);
      for (const ch of line) {
        if (ch === "{") braceDepth++;
        if (ch === "}") braceDepth--;
      }
      if (braceDepth <= 0 && helperLines.length > 1) {
        inHelperFunction = false;
      }
    } else {
      pureDataLines.push(line);
    }
  }

  // Extract original business name from the data region
  const nameMatch = source.match(/name:\s*['"]([^'"]+)['"]/);
  const originalBusinessName = nameMatch ? nameMatch[1] : "";

  // Extract original phone
  const phoneMatch = source.match(/phone:\s*['"]([^'"]+)['"]/);
  const originalPhone = phoneMatch ? phoneMatch[1] : "";

  // Extract function name
  const funcMatch = renderLines[0].match(
    /export\s+default\s+function\s+(\w+)/,
  );
  const functionName = funcMatch ? funcMatch[1] : "Page";

  return {
    imports: importLines.join("\n"),
    dataRegion: pureDataLines.join("\n"),
    helperFunctions: helperLines.join("\n"),
    renderRegion: renderLines.join("\n"),
    originalBusinessName,
    originalPhone,
    functionName,
  };
}

/**
 * Use Claude to rewrite the DATA region with new business data.
 * This is a focused, small API call (~2K tokens in, ~1K out).
 */
async function rewriteDataRegion(
  dataRegion: string,
  business: BusinessData,
  photos: PhotoManifest,
  navLinks: { label: string; href: string }[],
): Promise<string> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();

  // Prepare business data for the prompt
  const reviews = (business.reviews || [])
    .filter((r) => r.text && r.text.trim().length >= 20)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const businessDataSummary = JSON.stringify(
    {
      name: business.name,
      category: business.category,
      address: business.address,
      city: business.city,
      state: business.state,
      zip: business.zip,
      phone: business.phone,
      email: business.email,
      rating: business.rating,
      reviewCount: business.reviewCount,
      tagline: business.tagline,
      brandNarrative: business.brandNarrative,
      hours: business.hours,
      socialLinks: business.socialLinks,
      services: (business.services || []).map((s) => ({
        name: s.name,
        description: s.description,
        icon: s.icon,
        image: s.image,
      })),
      reviews: reviews.map((r) => ({
        text: r.text.length > 280 ? r.text.substring(0, 280) + "..." : r.text,
        author: r.author,
        rating: r.rating,
        source: r.source,
      })),
      team: (business.team || [])
        .filter((m) => m.image)
        .map((m) => ({
          name: m.name,
          role: m.role,
          image: m.image,
          bio: m.bio ? m.bio.substring(0, 100) : undefined,
        })),
      faq: (business.faq || []).slice(0, 8),
      stats: business.stats || [],
    },
    null,
    2,
  );

  const photosSummary = JSON.stringify(
    {
      heroImage: photos.heroImage,
      aboutImage: photos.aboutImage,
      galleryImages: photos.galleryImages,
    },
    null,
    2,
  );

  const navLinksSummary = JSON.stringify(navLinks);

  const prompt = `You are rewriting the DATA REGION of a website template to use new business data.

CRITICAL RULES:
1. Keep ALL variable names EXACTLY the same (navLinks, reviews, services, businessContact, etc.)
2. Keep the same TypeScript types and array structures
3. Replace ONLY the content values with the new business data
4. If the template has arrays that don't map directly from the business data (e.g., "rooms", "classTypes", "menuItems"), map from the business's services array intelligently
5. If the template references specific icons from lucide-react, keep valid lucide icon names
6. Keep animation config objects (fadeUp, stagger, staggerChild, etc.) UNCHANGED
7. For photo paths, use the paths from the photo manifest below
8. For stats, use the business stats if available, otherwise generate reasonable ones from: rating, reviewCount, years in business, service count
9. navLinks should be: ${navLinksSummary}
10. Keep all 'use client' directives if present
11. Output ONLY the data region code — no imports, no export default function

TEMPLATE DATA REGION (keep variable names and structure, replace values):
\`\`\`
${dataRegion}
\`\`\`

NEW BUSINESS DATA:
\`\`\`json
${businessDataSummary}
\`\`\`

PHOTO MANIFEST:
\`\`\`json
${photosSummary}
\`\`\`

Output the rewritten data region now. Only output the TypeScript const declarations — no markdown fences, no explanation.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  let text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Strip any markdown fences if the model added them
  text = text.replace(/^```\w*\n?/gm, "").replace(/```$/gm, "").trim();

  // Fix unescaped quotes inside string literals (e.g., "K "K-Roc" P" → "K 'K-Roc' P")
  // Pattern: a quoted string where inner quotes break the outer ones
  text = text.replace(/"([^"]{0,20})"([^"]{1,20})"([^"]{0,20})"/g, (match, before, inner, after) => {
    // If this looks like a broken string (not a proper JS expression), fix it
    if (!match.includes(": ") && !match.includes("=>")) {
      return `"${before}'${inner}'${after}"`;
    }
    return match;
  });

  return text;
}

/**
 * Use Claude to generate a TEXT REPLACEMENT MAPPING for the render region.
 * Claude never touches the code — it only outputs a JSON map of old→new strings.
 * We then apply the map with deterministic find-replace. 100% safe.
 */
async function rewriteRenderRegion(
  renderRegion: string,
  parsed: ParsedTemplate,
  business: BusinessData,
  photos: PhotoManifest,
): Promise<string> {
  // 1. Deterministic replacements first (safe, always correct)
  let result = renderRegion;

  // Replace function name
  result = result.replace(
    `export default function ${parsed.functionName}`,
    `export default function BusinessPage`,
  );

  // Replace business name (full and short variants)
  if (parsed.originalBusinessName) {
    const nameRegex = new RegExp(escapeRegex(parsed.originalBusinessName), "g");
    result = result.replace(nameRegex, business.name);

    const words = parsed.originalBusinessName.split(/\s+/);
    if (words.length > 1) {
      const shortName = words[0];
      if (shortName.length >= 4) {
        const newShortName = business.name.split(/\s+/)[0] || business.name;
        result = result.replace(new RegExp(escapeRegex(shortName), "g"), newShortName);
      }
    }
  }

  // Replace phone numbers
  if (parsed.originalPhone) {
    const phoneRegex = new RegExp(escapeRegex(parsed.originalPhone), "g");
    result = result.replace(phoneRegex, business.phone || "");
    const cleanOriginal = parsed.originalPhone.replace(/\D/g, "");
    const cleanNew = (business.phone || "").replace(/\D/g, "");
    if (cleanOriginal && cleanNew) {
      result = result.replace(new RegExp(escapeRegex(cleanOriginal), "g"), cleanNew);
    }
  }

  // Replace copyright
  const copyrightMatch = result.match(/©\s*\d{4}\s+([^.<\n]+)/);
  if (copyrightMatch) {
    const copyrightName = copyrightMatch[1].trim().replace(/\.\s*All rights reserved/, "");
    if (copyrightName && copyrightName !== business.name) {
      result = result.replace(new RegExp(escapeRegex(copyrightName), "g"), business.name);
    }
  }

  // 2. Extract hardcoded text strings from render region for Claude to map
  const stringLiterals: string[] = [];
  let m;

  // Match JSX text content (between > and <) — any cased text 8+ chars
  const jsxTextRegex = />\s*([A-Za-z][^<>{}\n]{7,})\s*</g;
  while ((m = jsxTextRegex.exec(result)) !== null) {
    const text = m[1].trim();
    if (text && !text.startsWith("©") && !text.includes(business.name) &&
        !text.includes("className") && !text.startsWith("motion.")) {
      stringLiterals.push(text);
    }
  }

  // Match string literals in quotes (10+ chars, likely content)
  const quotedRegex = /"([^"]{10,}[^"\\])"/g;
  while ((m = quotedRegex.exec(result)) !== null) {
    const text = m[1].trim();
    // Skip code-like strings
    if (text.includes("className") || text.includes("http") || text.includes("/photos/") ||
        text.includes("var(--") || text.startsWith("#") || text.includes("px ") ||
        text.includes("clamp(") || text.includes("font-") || text.includes(business.name) ||
        text.includes("text-[") || text.includes("bg-[") || text.includes("w-") ||
        text.includes("gap-") || text.includes("flex") || text.includes("grid") ||
        text.includes("rounded") || text.includes("border") || text.includes("shadow") ||
        text.includes("opacity") || text.includes("translate") || text.includes("transition") ||
        text.includes("duration") || text.includes("ease") || text.startsWith("max-w-")) {
      continue;
    }
    stringLiterals.push(text);
  }

  // Also capture short but important strings (5-10 chars) that look like CTAs or labels
  const shortTextRegex = />\s*([A-Z][A-Za-z\s]{3,9})\s*</g;
  while ((m = shortTextRegex.exec(result)) !== null) {
    const text = m[1].trim();
    // Only include if it looks like a CTA or heading (not code)
    if (/^(Book|Call|Get|See|View|Visit|Order|Shop|Browse|Schedule|Start|Learn|Read)\b/.test(text)) {
      stringLiterals.push(text);
    }
  }

  // Deduplicate
  const uniqueStrings = [...new Set(stringLiterals)].slice(0, 40);

  if (uniqueStrings.length === 0) {
    console.log("  No hardcoded text found in render region — skipping AI mapping");
    return result;
  }

  // 3. Ask Claude to generate replacement mapping (NOT code rewrite)
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();

  const reviews = (business.reviews || [])
    .filter((r) => r.text && r.text.trim().length >= 20)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  const reviewSnippets = reviews.map((r) => `"${r.text.substring(0, 100)}..." — ${r.author}`).join("\n");
  const serviceNames = (business.services || []).slice(0, 8).map((s) => s.name).join(", ");

  const prompt = `You are creating a text replacement mapping for adapting a website template from one business to another.

ORIGINAL BUSINESS: "${parsed.originalBusinessName}"
NEW BUSINESS: "${business.name}" (${business.category} in ${business.city}, ${business.state})
${business.address ? `ADDRESS: ${business.address}` : ""}
${business.tagline ? `TAGLINE: ${business.tagline}` : ""}
${business.brandNarrative ? `ABOUT: ${business.brandNarrative.substring(0, 200)}` : ""}
SERVICES: ${serviceNames || "general " + business.category + " services"}
RATING: ${business.rating || 4.8} stars, ${business.reviewCount || (business.reviews || []).length} reviews
${reviewSnippets ? `CUSTOMER QUOTES:\n${reviewSnippets}` : ""}

Below are hardcoded text strings from the template's JSX. For each one, provide a replacement appropriate for the new business. If a string is generic/reusable (like "Services", "Contact Us", "Send Message"), keep it the same.

RULES for replacements:
- Taglines: max 6 words, punchy, specific. No generic marketing ("trusted", "premier", "exceptional")
- About stories: max 3 sentences, include ONE real detail from reviews
- CTAs: appropriate for a ${business.category}
- Stats: use real numbers from business data
- Location references: use the new business's city/address
- Keep same approximate length as original (don't expand 3 words into a paragraph)
- Use straight apostrophes (') not escaped ones

STRINGS TO MAP:
${uniqueStrings.map((s, i) => `${i + 1}. "${s}"`).join("\n")}

Output a JSON object mapping original → replacement. Only include strings that NEED changing (skip generic/reusable ones). No markdown fences.
Example: {"Original tagline here": "New tagline here", "Old city name": "New city name"}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  let mappingText =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Strip markdown fences and any text before/after the JSON object
  mappingText = mappingText.replace(/^```\w*\n?/gm, "").replace(/```$/gm, "").trim();
  // Extract JSON object even if there's surrounding text
  const jsonMatch = mappingText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    mappingText = jsonMatch[0];
  }

  // Parse the mapping — fix common JSON issues first
  mappingText = mappingText.replace(/,\s*}/g, "}"); // trailing commas
  mappingText = mappingText.replace(/\\'/g, "'"); // \' is not valid JSON, just use '
  // Replace actual newlines inside string values with spaces
  mappingText = mappingText.replace(/"([^"]*?)"/g, (match) => {
    return match.replace(/\n\s*/g, " ");
  });

  try {
    const mapping = JSON.parse(mappingText) as Record<string, string>;
    let replacementCount = 0;
    for (const [oldText, newText] of Object.entries(mapping)) {
      if (oldText && newText && oldText !== newText && result.includes(oldText)) {
        result = result.replace(new RegExp(escapeRegex(oldText), "g"), newText);
        replacementCount++;
      }
    }
    console.log(`  Applied ${replacementCount} text replacements from AI mapping`);
  } catch (e) {
    console.warn("  ⚠ Could not parse AI mapping — using deterministic replacements only");
    console.warn(`  Parse error: ${(e as Error).message}`);
    // Write to temp file for debugging
    const { writeFileSync: wfs } = require("fs");
    wfs("/tmp/mapping-debug.json", mappingText);
    console.warn("  Wrote raw mapping to /tmp/mapping-debug.json");
  }

  return result;
}

/**
 * Extract CSS variable values from a reference site's globals.css :root block.
 * These override the design brief's palette to match the template's theme (dark/light).
 */
function extractTemplateCssVars(templateSlug: string): Record<string, string> {
  try {
    const cssPath = join(process.cwd(), "sites", templateSlug, "app", "globals.css");
    if (!existsSync(cssPath)) return {};
    const css = readFileSync(cssPath, "utf-8");

    const vars: Record<string, string> = {};
    const varRegex = /--brand-([\w-]+):\s*([^;]+);/g;
    let match;
    while ((match = varRegex.exec(css)) !== null) {
      vars[`--brand-${match[1]}`] = match[2].trim();
    }
    return vars;
  } catch {
    return {};
  }
}

/**
 * Extract custom CSS recipes from a reference site's globals.css.
 * Returns everything after the standard :root / body / selection / scrollbar rules.
 */
function extractCustomCss(templateSlug: string): string {
  try {
    const cssPath = join(
      process.cwd(),
      "sites",
      templateSlug,
      "app",
      "globals.css",
    );
    if (!existsSync(cssPath)) return "";

    const css = readFileSync(cssPath, "utf-8");

    // Find the end of standard rules — look for the first custom class/rule
    // Standard rules end after scrollbar styling or :focus-visible
    const lines = css.split("\n");
    let customStart = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Look for custom class definitions (not :root, body, html, h1-h4, ::selection, etc.)
      if (
        line.startsWith(".") ||
        line.startsWith("/*") && line.includes("──")
      ) {
        // Check if this is after the standard boilerplate
        const preceding = lines.slice(0, i).join("\n");
        if (
          preceding.includes(":root") &&
          preceding.includes("body")
        ) {
          customStart = i;
          break;
        }
      }
    }

    if (customStart === -1) return "";

    return lines.slice(customStart).join("\n").trim();
  } catch {
    return "";
  }
}

/**
 * Main entry: adapt a reference template for a business.
 */
export async function adaptTemplate(
  templateSlug: string,
  business: BusinessData,
  vibe: VibeProfile,
  photos: PhotoManifest,
  navLinks: { label: string; href: string }[],
): Promise<AdaptedOutput> {
  // 1. Read the template
  const templatePath = join(
    process.cwd(),
    "sites",
    templateSlug,
    "app",
    "page.tsx",
  );
  const templateSource = readFileSync(templatePath, "utf-8");

  // 2. Parse into regions
  const parsed = parseTemplate(templateSource);
  console.log(
    `  Template: ${templateSlug} (${templateSource.split("\n").length} lines)`,
  );
  console.log(
    `  Data region: ${parsed.dataRegion.split("\n").length} lines, Render region: ${parsed.renderRegion.split("\n").length} lines`,
  );

  // 3. Rewrite data region with Claude (small, focused call)
  console.log("  Rewriting data region with AI...");
  const newDataRegion = await rewriteDataRegion(
    parsed.dataRegion,
    business,
    photos,
    navLinks,
  );
  console.log(`  New data region: ${newDataRegion.split("\n").length} lines`);

  // 4. Adapt render region (Claude rewrites business-specific text)
  console.log("  Rewriting render region with AI...");
  const adaptedRender = await rewriteRenderRegion(parsed.renderRegion, parsed, business, photos);
  console.log(`  Render region: ${adaptedRender.split("\n").length} lines`);

  // 5. Reassemble page.tsx — and auto-fix missing lucide-react icon imports
  const parts = [parsed.imports, "", newDataRegion];
  if (parsed.helperFunctions.trim()) {
    parts.push("", parsed.helperFunctions);
  }
  parts.push("", adaptedRender);
  let pageTsx = parts.join("\n");
  pageTsx = fixMissingIconImports(pageTsx);

  // 6. Extract custom CSS from template's globals.css
  const globalsCssExtras = extractCustomCss(templateSlug);
  console.log(
    `  Custom CSS extracted: ${globalsCssExtras.length} chars`,
  );

  // 7. Extract CSS variables from template (preserves dark/light theme)
  const templateCssVars = extractTemplateCssVars(templateSlug);
  console.log(
    `  Template CSS vars: ${Object.keys(templateCssVars).length} vars`,
  );

  return { pageTsx, globalsCssExtras, templateCssVars };
}

/**
 * Scan the assembled page.tsx for icon names used but not imported from lucide-react.
 * The Claude data region rewrite sometimes introduces icons not in the original template.
 */
function fixMissingIconImports(source: string): string {
  // Known lucide-react icon names (PascalCase, used as JSX components or object values)
  const lucideIconPattern = /\bicon:\s*([A-Z][a-zA-Z]+)\b/g;
  const jsxIconPattern = /<([A-Z][a-zA-Z]+)\s+className=/g;

  const usedIcons = new Set<string>();
  let m;
  while ((m = lucideIconPattern.exec(source)) !== null) usedIcons.add(m[1]);
  while ((m = jsxIconPattern.exec(source)) !== null) usedIcons.add(m[1]);

  // Find the existing lucide-react import
  const importMatch = source.match(/import\s*\{([^}]+)\}\s*from\s*["']lucide-react["']/);
  if (!importMatch) return source;

  const importedNames = importMatch[1].split(",").map((s) => s.trim()).filter(Boolean);
  const importedSet = new Set(importedNames);

  // Skip non-icon names (React components, framer-motion components, locally-defined functions)
  const notIcons = new Set(["AnimatePresence", "ClickToCall", "WordReveal", "Image", "Link"]);
  // Also skip names that are defined as local functions in the source
  const localFuncRegex = /function\s+([A-Z][a-zA-Z]+)\s*\(/g;
  let fm;
  while ((fm = localFuncRegex.exec(source)) !== null) notIcons.add(fm[1]);

  const missing = [...usedIcons].filter((name) => !importedSet.has(name) && !notIcons.has(name));
  if (missing.length === 0) return source;

  console.log(`  Auto-adding missing icon imports: ${missing.join(", ")}`);

  // Add missing icons to the import — normalize trailing comma first
  const allNames = [...importedNames, ...missing];
  const newImport = `import {\n  ${allNames.join(",\n  ")},\n} from "lucide-react"`;
  return source.replace(importMatch[0], newImport);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
