import type { BusinessData } from "../components/types";
import type { VibeProfile, DesignBrief, PhotoManifest } from "./types";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { selectSections, formatSectionsForPrompt } from "./sectionRegistry";
import {
  selectTechniques,
  formatTechniquesForPrompt,
  loadUsedTechniqueIds,
} from "./techniqueSelector";

/**
 * Creative Director — Claude generates each page.tsx as a creative act.
 *
 * The prompt includes 3 gold-standard reference sites as few-shot examples,
 * anti-sameness constraints, and forces advanced animation usage.
 * Claude writes the actual page.tsx — choosing sections, ordering,
 * dark/light themes, spacing, and copy.
 */

interface CreativeOutput {
  pageTsx: string;
  globalsCssExtras: string;
}

export async function creativeDirector(
  business: BusinessData,
  vibe: VibeProfile,
  brief: DesignBrief,
  photos: PhotoManifest,
  navLinks: { label: string; href: string }[],
): Promise<CreativeOutput> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();

  const prompt = buildCreativePrompt(business, vibe, brief, photos, navLinks);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 16000,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  return parseCreativeOutput(text);
}

function buildCreativePrompt(
  business: BusinessData,
  vibe: VibeProfile,
  brief: DesignBrief,
  photos: PhotoManifest,
  navLinks: { label: string; href: string }[],
): string {
  // Prepare business context
  const reviews = (business.reviews || [])
    .filter((r) => r.text && r.text.trim().length >= 20)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const reviewsText = reviews
    .map((r) => {
      const truncated =
        r.text.length > 280 ? r.text.substring(0, 280) + "..." : r.text;
      return `"${truncated}" — ${r.author} (${r.rating}★, ${r.source})`;
    })
    .join("\n");

  const services = (business.services || []).map(
    (s) =>
      `{ name: '${esc(s.name)}', description: '${esc(s.description)}'${s.icon ? `, icon: '${s.icon}'` : ""}${s.image ? `, image: '${s.image}'` : ""} }`,
  );

  const team = (business.team || [])
    .filter((m) => m.image)
    .map(
      (m) =>
        `{ name: '${esc(m.name)}', role: '${esc(m.role)}'${m.image ? `, image: '${esc(m.image)}'` : ""}${m.bio ? `, bio: '${esc(m.bio.substring(0, 80))}'` : ""} }`,
    );

  const faq = (business.faq || [])
    .slice(0, 4)
    .map(
      (f) =>
        `{ question: '${esc(f.question)}', answer: '${esc(f.answer.substring(0, 120))}' }`,
    );

  const stats = (business.stats || []).map(
    (s) =>
      `{ value: ${s.value}${s.suffix ? `, suffix: '${s.suffix}'` : ""}${s.prefix ? `, prefix: '${s.prefix}'` : ""}, label: '${esc(s.label)}' }`,
  );

  // Photo data
  const heroPhoto = photos.heroImage
    ? `{ src: '${photos.heroImage.src}', alt: '${esc(photos.heroImage.alt)}', category: '${photos.heroImage.category}' }`
    : "null";
  const aboutPhoto = photos.aboutImage
    ? `{ src: '${photos.aboutImage.src}', alt: '${esc(photos.aboutImage.alt)}', category: '${photos.aboutImage.category}' }`
    : "null";
  const galleryPhotos = photos.galleryImages.map(
    (p) =>
      `  { src: '${p.src}', alt: '${esc(p.alt)}', category: '${p.category}' }`,
  );

  // Hours
  const hoursEntries = business.hours
    ? Object.entries(business.hours)
        .map(([d, t]) => `    ${d}: '${esc(t)}'`)
        .join(",\n")
    : "";

  // Social links
  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks)
        .filter(([, v]) => v)
        .map(([k, v]) => `  ${k}: '${esc(v!)}'`)
        .join(",\n")
    : "";

  // Load FULL technique catalog — transparent, exhaustive, no randomness
  const neededTypes = inferNeededSectionTypes(business);
  const usedTechniqueIds = loadUsedTechniqueIds();
  const techniqueSelection = selectTechniques(vibe, neededTypes, usedTechniqueIds);
  const techniqueMenu = formatTechniquesForPrompt(techniqueSelection);

  // Load design database context (fonts, palettes, heroes)
  const designContext = loadDesignContext(vibe);

  // Load section registry examples (targeted per section type)
  const registrySections = selectSections(vibe, business.category, neededTypes);
  const registryExamples = formatSectionsForPrompt(registrySections);

  // Load 1 full reference site for structural context (overall page flow)
  const structuralReference = loadBestReferenceExample(vibe);

  // Load design fingerprint of existing sites to avoid duplication
  const existingFingerprints = loadExistingFingerprints();

  // Pick a narrative flow for this site (rotating, not always the same)
  const narrativeFlow = pickNarrativeFlow(business.slug, vibe);

  return `You are an elite web designer building a one-page site for "${business.name}". You will write the COMPLETE page.tsx file.

## YOUR ROLE
You are a creative director at a top design agency. Each site you create must feel hand-crafted and unique — like a $5,000 Framer template, not a WordPress theme. You have 20 reusable components including advanced animation primitives. Your job is to COMPOSE them into something bespoke.

## CRITICAL: DESIGN PHILOSOPHY — BE A CURATOR, NOT AN ASSEMBLER
The reference sites below are your quality bar. Study them. They succeed because of what they LEAVE OUT, not what they include. A 4-section site with perfect rhythm and scroll-linked sophistication beats a 7-section site with every component crammed in.

${existingFingerprints ? `### Already-used design combinations (DO NOT replicate):\n${existingFingerprints}\n` : ""}

### Hard Rules:
1. **MAXIMUM 5 SECTIONS** (including hero and contact). Every section must earn its place. If you can't justify why a section exists, cut it.
2. **Narrative flow for this site: ${narrativeFlow.name}** — ${narrativeFlow.description}
3. **DO NOT use MarqueeTicker with service names.** This is the #1 pattern that makes sites look generic. If you use MarqueeTicker, it must be for brand values, short tagline words, or a creative repeated phrase — NOT a list of services.
4. **DO NOT default to AnimatedCounter for stats.** Only use it if the business has genuinely impressive numbers (20+ years, 1000+ projects). Review counts and star ratings are NOT stats. If you use stats, prefer large static typography over spinning counters.
5. **You MUST use at least 1 scroll-linked effect** — BlurredReveal, ZoomOutReveal, or StickySection. These create the "Framer feel" that separates premium sites from WordPress themes. Simple fade-in-on-scroll is the BASELINE, not the goal.
6. **Write custom inline sections** using the reference code blocks below as starting points. Copy and adapt real patterns — don't generate generic wrappers around pre-built components.
7. **Reviews as editorial blockquotes** — For warm/elegant/premium vibes, present reviews as large-typography blockquotes with left borders, NOT as cards in a grid. Cards feel "SaaS landing page," blockquotes feel "design template."
8. **Typography restraint** — Use font-light (300) or font-normal (400) for headlines, not font-bold. Let the font size create hierarchy, not weight.

## BUSINESS DATA
Name: ${business.name}
Category: ${business.category}
Location: ${business.address}, ${business.city}, ${business.state} ${business.zip}
Phone: ${business.phone}
Email: ${business.email || "none"}
Rating: ${business.rating || "N/A"} / 5 (${business.reviewCount || reviews.length} reviews)
Tagline: ${business.tagline || "none"}

Vibe: ${vibe.primary} / ${vibe.secondary} / ${vibe.tertiary}
Font: ${brief.font.display} (display) + ${brief.font.body} (body)
Primary color: ${brief.palette.primary}
Accent color: ${brief.palette.accent}

## REVIEWS (real customer words — use these for authenticity)
${reviewsText || "No reviews available"}

## AVAILABLE DATA
Services (${services.length}): ${services.length > 0 ? "\n" + services.join(",\n") : "none"}

Team members WITH photos (${team.length}): ${team.length > 0 ? "\n" + team.join(",\n") : "none — DO NOT include a team section"}

FAQ (${faq.length}): ${faq.length > 0 ? "\n" + faq.join(",\n") : "none"}

Stats: ${stats.length > 0 ? "\n" + stats.join(",\n") : "none"}

Hero photo: ${heroPhoto}
About photo: ${aboutPhoto}
Gallery photos (${galleryPhotos.length}): ${galleryPhotos.length > 0 ? "\n" + galleryPhotos.join(",\n") : "none"}

Hours: ${hoursEntries ? "{\n" + hoursEntries + "\n  }" : "none"}

Social links: ${socialEntries ? "{\n" + socialEntries + "\n}" : "{}"}

## PRE-BUILT CONTACT OBJECT
\`\`\`
const businessContact = {
  name: '${esc(business.name)}',
  address: '${esc(business.address || "")}',
  city: '${esc(business.city || "")}',
  state: '${esc(business.state || "")}',
  zip: '${esc(business.zip || "")}',
  phone: '${esc(business.phone || "")}',
  email: '${esc(business.email || "")}',
${hoursEntries ? `  hours: {\n${hoursEntries}\n  },` : ""}
}
\`\`\`

## AVAILABLE COMPONENTS (NAMED exports — use curly braces!)
Import like: \`import { ComponentName } from '@/components/ComponentName'\`
NEVER use default imports.

### Standard Section Components
1. **Navbar** — Props: businessName, links (NavLink[]), ctaText, ctaHref
2. **HeroSection** — Props: headline, subheadline, ctaText, ctaHref, secondaryCtaText, secondaryCtaHref, rating, reviewCount, variant ("photo-bg"|"split"|"centered"|"dark-bold"|"blurred-reveal"), backgroundImage (Photo), foregroundImage (Photo)
3. **ServiceCards** — Props: heading, subheading?, services (Service[]), columns (2|3), variant ("grid"|"alternating")
4. **AboutSection** — Props: heading, story, image? (Photo)
5. **TestimonialCarousel** — Props: heading, reviews (Review[]), variant ("scroll"|"grid"|"featured")
6. **StatsCounter** — Props: heading?, stats (Stat[]), variant ("dark"|"light")
7. **ImageGallery** — Props: heading, photos (Photo[]), variant ("grid"|"scroll"|"masonry")
8. **ProcessSteps** — Props: heading, subheading?, steps (ProcessStep[]), variant ("grid"|"timeline")
9. **FAQAccordion** — Props: heading, items (FAQItem[])
10. **ContactSection** — Props: business ({ name, address, city, state, zip, phone, email, hours }), heading, showMap (boolean)
11. **TeamGrid** — Props: heading, subheading?, members (TeamMember[])
12. **Footer** — Props: business ({ name, address, city, state, zip, phone, email }), links (NavLink[]), socialLinks
13. **ClickToCall** — Props: phone (string)

### Scroll-Linked Components (PREMIUM — use at least 1, these create the Framer feel)
14. **BlurredReveal** — Image blurs to clear on scroll. The signature Framer hero effect. Props: src, alt, children?, height? (string, default "120vh")
15. **ZoomOutReveal** — Content zooms out from large to normal as you scroll. Great for about/gallery sections. Props: children, startScale? (number), endScale? (number)
16. **StickySection** — Scroll-pinned cascade (sections stack as you scroll). Creates depth. Props: index (number), children, scaleOnScroll? (boolean)
17. **ParallaxImage** — Parallax scroll on images. Props: src, alt, speed? (0-1, default 0.3), overlay? (boolean), overlayOpacity? (number), containerClassName?, children?

### Supporting Components (use sparingly, only when they serve the design)
18. **MarqueeTicker** — Infinite horizontal scroll. DO NOT use for service lists. Props: items (string[]), speed? (number, default 30), separator? (string, default "·"), variant? ("default"|"outline"|"bold"), reverse? (boolean), className?
19. **AnimatedCounter** — Scroll-triggered counting. Only for genuinely impressive business metrics. Props: target (number), prefix?, suffix?, duration? (number, default 2), className?
20. **SectionDivider** — SVG shape between sections. Props: variant? ("wave"|"diagonal"|"curve"|"zigzag"|"arrow"), color? (string), flip? (boolean), height? (number, default 80)

Types: import type { NavLink, Photo, Service, Review, Stat, ProcessStep, FAQItem, TeamMember, SocialLinks } from '@/components/types'

Key type shapes (MUST match exactly):
\`\`\`
Photo: { src: string, alt: string, category: 'exterior'|'interior'|'team'|'work'|'food'|'product' }
Service: { name: string, description: string, icon?: string, image?: string }
Review: { text: string, author: string, rating: number, source: 'google'|'yelp'|'facebook' }
Stat: { value: number, label: string, suffix?: string, prefix?: string }
ProcessStep: { step: number, title: string, description: string }
FAQItem: { question: string, answer: string }
TeamMember: { name: string, role: string, image?: string, bio?: string, credentials?: string[] }
NavLink: { label: string, href: string }
SocialLinks: { facebook?: string, instagram?: string, twitter?: string, linkedin?: string, yelp?: string }
\`\`\`

${techniqueMenu}

## DESIGN DATABASE — Font Pairings, Color Palettes, Hero Variants
${designContext}

## CSS RECIPES — Extra visual texture (output in globalsCssExtras)
- **film-grain**: body::after with SVG noise, mix-blend-mode: hard-light, opacity: 0.03-0.06
- **picture-frame**: body::before, fixed inset 10-12px, border 1px solid rgba(0,0,0,0.08)
- **dot-pattern**: .dot-pattern class with radial-gradient dots
- **gradient-sections**: .section-gradient with ::after gradient
- **glass-effect**: .glass with backdrop-filter blur for frosted glass cards
- **section-line**: border-top: 1px solid rgba(...) for elegant separation
- **gallery-card**: hover zoom + gradient overlay on images
- **editorial-rule**: small colored HR line for editorial feel
- Custom CSS animations (marquee, ticker, hover effects)
- Custom scrollbar styling matching brand colors

## SECTION REFERENCE LIBRARY — Real Framer code to adapt (this is your primary resource)
These are ACTUAL implementations from award-winning Framer sites, pre-matched to this business's ${vibe.primary}/${vibe.secondary} vibe. Your job is to ADAPT these real code patterns to this business's data. Copy the layout structures, animation patterns, spacing, and typography approaches. Change the data/content but KEEP the visual sophistication. This is what makes the output Framer-quality instead of generic.

${registryExamples}

## STRUCTURAL REFERENCE — Full page example for overall flow
Study this complete site to understand how sections connect, how spacing works between sections, and how the overall narrative flows. Your site must match this quality level.

${structuralReference}

## COLOR & CONTRAST RULES (CRITICAL — unreadable text = instant rejection)
1. **NEVER place light text (white, gray-100, gray-200) on light backgrounds (white, gray-50, gray-100).** Every text element MUST have at least 4.5:1 contrast ratio against its background.
2. **NEVER place dark text on dark backgrounds.** If a section has bg-black or bg-gray-900, text MUST be white or light.
3. **Test every section mentally:** "Can I read this text instantly without squinting?" If not, fix the contrast.
4. **Dark sections need explicit light text classes.** Don't rely on CSS variables alone — verify each section.

## STATS & REVIEWS RULES (CRITICAL — this is NOT a Yelp page)
1. **DO NOT use review star ratings, review counts, or rating numbers as visual elements.** No floating "5.0 Stars" badges, no AnimatedCounter for review counts, no marquee items showing star ratings.
2. **Stats sections must feature BUSINESS achievements** — years in business, projects completed, team size, areas served, response time. NOT review metrics.
3. **If using AnimatedCounter**, count business metrics (e.g. "2000+ Projects", "25 Years", "500+ Clients") — NEVER review numbers.
4. **Reviews section**: Show 3-5 curated quotes with author attribution. No aggregate stats, no star icons, no rating numbers above the quotes.
5. **MarqueeTicker items**: Use service names, brand values, or tagline words — NOT "5.0 Stars" or "100+ Reviews".

## CONTENT INTENTIONALITY (CRITICAL — less is more)
1. **Maximum 5 sections total** (including hero and contact). A focused 4-section site with scroll-linked effects and real visual identity beats a bloated site with every component. Study the reference sites — they have 4-5 sections, not 8.
2. **Service descriptions**: Include ONE specific differentiator per service — not just the name and a generic sentence. What makes THIS business's version special?
3. **About section**: ONE compelling detail from reviews that reveals the business's character. Not a company bio or mission statement.
4. **Photo curation**: If 20 photos available, show 4-6 of the best. If 15 services, show 6-8. Curate ruthlessly.
5. **Every piece of text must pass this test**: Would a human copywriter charge $200 for this sentence? If it's generic filler, delete it.

## STRICT CONTENT RULES (CRITICAL — violations will be rejected)
1. **Headline**: MAX 5 WORDS. State what they do or who they are. NO adjectives like "premier", "trusted", "exceptional", "finest". Just facts.
   - GOOD: "Dave's Artistic Tattoo", "Cuts on Market Street", "Since 2009"
   - BAD: "Where Art Meets Skin", "Your Trusted Neighborhood Expert"
2. **Subheadline**: MAX 15 WORDS. One sentence. A fact or a short real quote snippet.
3. **About story**: MAX 3 SENTENCES. MAX 75 WORDS. One concrete detail from reviews. No fluff.
4. **Section headings**: MAX 3 WORDS each. No "Our" prefix ever.
5. **Reviews**: Only include reviews with actual text (20+ chars). Truncate at 280 chars.
6. **DO NOT include a team section** unless team members WITH PHOTOS were provided above.
7. **DO NOT include FounderQuote** component ever.
8. **All copy must sound human** — like a business owner wrote it, not an AI marketing blog.

## CRITICAL: NO INLINE STYLE TAGS
NEVER put \`<style>\` tags in page.tsx. This causes React hydration errors.
ALL custom CSS MUST go in the globals.css.extras code block.
You CAN use Tailwind classes and inline \`style={{ }}\` props — just no \`<style>\` elements.

## CRITICAL: USE TAILWIND UTILITY CLASSES — NO CUSTOM CLASS NAMES
NEVER invent custom CSS class names like "hero-headline", "story-grid", "cake-card", "photo-strip-wrapper", "editorial-quote".
ALL styling MUST use Tailwind utility classes directly in className attributes.
- GOOD: \`className="max-w-5xl mx-auto px-6 grid grid-cols-2 gap-8"\`
- GOOD: \`className="text-6xl font-light tracking-tight text-white"\`
- GOOD: \`className="relative w-full aspect-[4/3] overflow-hidden rounded-xl"\`
- BAD: \`className="hero-headline"\` — this class doesn't exist and will render as unstyled text!
- BAD: \`className="photo-strip-wrapper"\` — undefined, layout will be completely broken!
- BAD: \`className="cake-card-img"\` — no CSS for this, image will render at natural size!

The ONLY custom classes you may use are CSS recipes output in globals.css.extras (film-grain, picture-frame, dot-pattern, gallery-card, etc.).
For everything else — layout, typography, spacing, colors, responsive design — use Tailwind utility classes ONLY.

Study the reference examples above carefully: they use classes like \`"max-w-4xl mx-auto"\`, \`"text-xs uppercase tracking-[0.3em]"\`, \`"grid grid-cols-3 gap-6"\`, \`"w-full h-[400px] object-cover"\`.

## CRITICAL: IMAGE SIZING
All images MUST have explicit width and height constraints via Tailwind classes. An \`<img>\` tag without sizing classes will render at its full natural resolution and break the layout.
- GOOD: \`<div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl"><img src="..." alt="..." className="absolute inset-0 w-full h-full object-cover" /></div>\`
- GOOD: \`<img src="..." alt="..." className="w-full h-[400px] object-cover rounded-xl" />\`
- BAD: \`<img src="..." alt="..." />\` — renders at full natural size, COMPLETELY BROKEN!
- BAD: \`<img src="..." className="photo-strip-img" />\` — custom class is undefined, no sizing!

## CRITICAL: DATA ACCURACY
Copy all data values EXACTLY as provided above. Do NOT:
- Capitalize source values (use 'google' not 'Google')
- Change photo categories
- Modify review text
- Alter service names

## OUTPUT FORMAT
Return exactly TWO code blocks:

\`\`\`page.tsx
// Your complete page.tsx file here
// Must compile with TypeScript
// Must include 'use client' at the top
// Must include Navbar, main content, Footer, and ClickToCall (if phone exists)
// Must use at least 1 advanced animation component
// Must NOT follow the default section order
\`\`\`

\`\`\`globals.css.extras
/* Additional CSS: recipes, dark sections, custom animations, scrollbar, etc. */
\`\`\`

Write the page now. Make every pixel count. This site will be shown to the business owner — make it so good they can't say no.`;
}

// ─── NARRATIVE FLOWS ─────────────────────────────────────────────────────────

interface NarrativeFlow {
  name: string;
  description: string;
}

const NARRATIVE_FLOWS: NarrativeFlow[] = [
  {
    name: "Story-First",
    description:
      "Lead with the about/story section right after hero. Build emotional connection before showing services. Good for businesses with strong founder stories or local roots.",
  },
  {
    name: "Stats-Hook",
    description:
      "Open with impressive stats/numbers immediately after hero (before anything else). Hook with credibility, then explain what you do. Good for businesses with strong metrics (high review counts, years in business, response times).",
  },
  {
    name: "Social-Proof-First",
    description:
      "Put testimonials/reviews immediately after hero. Let customers sell the business. Then services, then about. Good for businesses with exceptional reviews.",
  },
  {
    name: "Visual-Portfolio",
    description:
      "Lead with a photo gallery or marquee of work right after hero. Let the work speak. Minimal text sections. Good for visual businesses (salons, tattoo, food, landscaping).",
  },
  {
    name: "Problem-Solution",
    description:
      "Open with the problem (FAQ or comparison), then reveal the solution (services, about). Build tension then resolve it. Good for service businesses solving pain points.",
  },
  {
    name: "Immersive-Atmosphere",
    description:
      "Full-bleed photos, sticky cascade, parallax. Minimal text. Let the visual atmosphere sell the business. Good for cafes, restaurants, spaces with strong ambiance.",
  },
];

function pickNarrativeFlow(slug: string, vibe: VibeProfile): NarrativeFlow {
  // Use slug hash to deterministically pick a flow, biased by vibe
  const hash = slugHash(slug);

  // Vibe-based bias: certain vibes favor certain flows
  const vibeFlowBias: Record<string, number[]> = {
    warm: [0, 5], // story-first, immersive
    bold: [1, 4], // stats-hook, problem-solution
    premium: [3, 5], // visual-portfolio, immersive
    creative: [3, 0], // visual-portfolio, story-first
    trustworthy: [1, 2], // stats-hook, social-proof
    professional: [1, 4], // stats-hook, problem-solution
    playful: [5, 3], // immersive, visual-portfolio
    personal: [0, 2], // story-first, social-proof
    elegant: [3, 5], // visual-portfolio, immersive
    direct: [1, 4], // stats-hook, problem-solution
  };

  const biasedIndices = vibeFlowBias[vibe.primary] || [0, 1];
  // 60% chance of vibe-biased flow, 40% chance of any flow
  const useVibeBias = hash % 10 < 6;
  const pool = useVibeBias ? biasedIndices : [0, 1, 2, 3, 4, 5];
  const index = pool[hash % pool.length];

  return NARRATIVE_FLOWS[index];
}

// ─── SECTION TYPE INFERENCE ─────────────────────────────────────────────────

function inferNeededSectionTypes(business: BusinessData): string[] {
  const types: string[] = ["hero", "services"];

  if (
    (business.reviews || []).filter((r) => r.text && r.text.trim().length >= 20)
      .length >= 3
  ) {
    types.push("testimonials");
  }
  if ((business.stats || []).length >= 2) types.push("stats");
  if ((business.faq || []).length >= 2) types.push("faq");
  if ((business.team || []).filter((m) => m.image).length >= 2)
    types.push("team");
  types.push(
    "about",
    "process",
    "contact",
    "cta",
    "gallery",
    "comparison",
    "ticker",
  );

  return types;
}

// ─── REFERENCE SITE LOADER ──────────────────────────────────────────────────

// Vibe tags for each reference site — used to score relevance to business vibe
const REFERENCE_VIBES: Record<string, { label: string; vibes: string[] }> = {
  "_reference-warm-editorial": {
    label:
      "WARM EDITORIAL — dark bg, blurred-reveal hero, editorial quotes, picture-frame border, film grain",
    vibes: ["warm", "personal", "creative", "elegant", "premium"],
  },
  "_reference-bold-stats": {
    label:
      "BOLD STATS-FORWARD — split hero, animated counters hook, wave dividers, parallax about",
    vibes: ["bold", "direct", "professional", "trust"],
  },
  "_reference-dark-immersive": {
    label:
      "DARK IMMERSIVE — sticky cascade gallery, parallax hero, marquee menu, film grain",
    vibes: ["playful", "fun", "creative", "warm", "immersive"],
  },
  "_reference-clean-services": {
    label:
      "CLEAN SERVICES — blue monochrome hero, radial gradient, service grid on solid color, simple/clean",
    vibes: ["professional", "trust", "direct", "bold", "clean"],
  },
  "_reference-trades-clean": {
    label:
      "TRADES CLEAN — marquee ticker, dark hero, orange accent, process steps, discount badges",
    vibes: ["bold", "direct", "professional", "trust", "trades"],
  },
  "_reference-restaurant-dark": {
    label:
      "RESTAURANT DARK — serif typography (Prata), dark/cream duotone, menu pricing, timeline",
    vibes: ["warm", "personal", "elegant", "creative", "premium"],
  },
  "_reference-wellness-glass": {
    label:
      "WELLNESS GLASS — warm brown palette, glass-morphism cards, Onest font, pricing tiers",
    vibes: ["warm", "personal", "elegant", "premium", "creative"],
  },
  "_reference-minimal-brand": {
    label:
      "MINIMAL BRAND — ultra-clean white, giant watermark text, scroll-linked animations, editorial product",
    vibes: ["elegant", "premium", "minimal", "clean", "creative"],
  },
};

function loadBestReferenceExample(vibe: VibeProfile): string {
  // Auto-discover all _reference-* directories
  const sitesDir = join(process.cwd(), "sites");
  let refDirs: string[] = [];
  try {
    refDirs = readdirSync(sitesDir)
      .filter((d) => d.startsWith("_reference-"))
      .filter((d) => existsSync(join(sitesDir, d, "app", "page.tsx")));
  } catch {
    return "No reference examples available — use your best creative judgment.";
  }

  if (refDirs.length === 0) {
    return "No reference examples available — use your best creative judgment.";
  }

  // Score each reference by vibe overlap with the business
  const profileVibes = [vibe.primary, vibe.secondary, vibe.tertiary];
  const scored = refDirs.map((dir) => {
    const meta = REFERENCE_VIBES[dir];
    const vibeScore = meta
      ? meta.vibes.filter((v) => profileVibes.includes(v)).length
      : 0;
    return { dir, vibeScore, label: meta?.label || dir };
  });

  // Sort by vibe score (highest first), pick the single best match
  scored.sort((a, b) => b.vibeScore - a.vibeScore);
  const best = scored[0];

  try {
    const pagePath = join(sitesDir, best.dir, "app", "page.tsx");
    const content = readFileSync(pagePath, "utf-8");
    return `### ${best.label}\n\`\`\`tsx\n${content}\n\`\`\``;
  } catch {
    return "No reference examples available — use your best creative judgment.";
  }
}

// ─── DESIGN FINGERPRINT LOADER ───────────────────────────────────────────────

function loadExistingFingerprints(): string {
  try {
    const fpPath = join(process.cwd(), "data", "used-designs.json");
    if (!existsSync(fpPath)) return "";
    const data = JSON.parse(readFileSync(fpPath, "utf-8"));
    if (!Array.isArray(data) || data.length === 0) return "";

    return data
      .slice(-20)
      .map(
        (d: any) => {
          const parts = [
            `- **${d.slug}** (${d.category}):`,
            `hero=${d.heroVariant}`,
            `font=${d.font}`,
            `palette=${d.palette}`,
          ];
          if (d.cssRecipes?.length) parts.push(`css=[${d.cssRecipes.join(",")}]`);
          if (d.animationComponents?.length) parts.push(`animations=[${d.animationComponents.join(",")}]`);
          if (d.narrativeFlow) parts.push(`flow=${d.narrativeFlow}`);
          if (d.sectionOrder?.length) parts.push(`sections=${d.sectionOrder.join("→")}`);
          if (d.advancedComponents?.length) parts.push(`components=[${d.advancedComponents.join(",")}]`);
          return parts.join(" | ");
        },
      )
      .join("\n");
  } catch {
    return "";
  }
}

// ─── DESIGN DATABASE LOADER ─────────────────────────────────────────────────

function loadDesignContext(vibe: VibeProfile): string {
  try {
    const dbPath = join(process.cwd(), "data", "design-elements-database.json");
    const db = JSON.parse(readFileSync(dbPath, "utf-8"));

    const profileVibes = [vibe.primary, vibe.secondary, vibe.tertiary];

    const heroes = (db.heroes || [])
      .filter((h: any) => h.vibe?.some((v: string) => profileVibes.includes(v)))
      .slice(0, 5)
      .map((h: any) => `- ${h.id}: ${h.description}`)
      .join("\n");

    const sections = (db.sections || [])
      .filter((s: any) => s.vibe?.some((v: string) => profileVibes.includes(v)))
      .slice(0, 10)
      .map((s: any) => `- ${s.id} (${s.category}): ${s.description}`)
      .join("\n");

    const animations = (db.animations || [])
      .slice(0, 8)
      .map(
        (a: any) =>
          `- ${a.id}: ${a.description}${a.implementation?.notes ? " — " + a.implementation.notes : ""}`,
      )
      .join("\n");

    return `### Relevant Hero Patterns
${heroes || "Use any hero variant that fits"}

### Relevant Section Designs
${sections || "Standard sections"}

### Animation Ideas
${animations || "Use fade-up and stagger as baseline"}`;
  } catch {
    return "Design database unavailable — use your best judgment.";
  }
}

// ─── OUTPUT PARSER ───────────────────────────────────────────────────────────

function parseCreativeOutput(text: string): CreativeOutput {
  // Try multiple code fence formats for page.tsx
  const pageMatch =
    text.match(/```page\.tsx\s*\n([\s\S]*?)```/) ||
    text.match(/```tsx\s*\n([\s\S]*?)```/) ||
    text.match(/```typescript\s*\n([\s\S]*?)```/);
  let pageTsx = pageMatch ? pageMatch[1].trim() : "";

  // Try multiple code fence formats for CSS extras
  const cssMatch =
    text.match(/```globals\.css\.extras\s*\n([\s\S]*?)```/) ||
    text.match(/```css\s*\n([\s\S]*?)```/);
  let globalsCssExtras = cssMatch ? cssMatch[1].trim() : "";

  if (!pageTsx) {
    throw new Error("Creative director did not produce a valid page.tsx");
  }

  // Safety net: extract <style> tags and move to CSS extras
  const styleTagRegex = /<style[^>]*>\{`([\s\S]*?)`\}<\/style>/g;
  let match;
  while ((match = styleTagRegex.exec(pageTsx)) !== null) {
    globalsCssExtras += "\n" + match[1];
  }
  pageTsx = pageTsx.replace(styleTagRegex, "");

  const plainStyleRegex = /<style[^>]*>[\s\S]*?<\/style>/g;
  while ((match = plainStyleRegex.exec(pageTsx)) !== null) {
    const cssContent = match[0]
      .replace(/<style[^>]*>/, "")
      .replace(/<\/style>/, "");
    globalsCssExtras += "\n" + cssContent;
  }
  pageTsx = pageTsx.replace(plainStyleRegex, "");

  return { pageTsx, globalsCssExtras };
}

// ─── UTILITIES ───────────────────────────────────────────────────────────────

function slugHash(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
}
