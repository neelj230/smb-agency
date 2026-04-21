import type { BusinessData } from "../components/types";
import type { DesignBrief, SectionSelection } from "./types";
import { slugHash } from "./utils";

const SERVICE_CATEGORIES = [
  "plumber",
  "electrician",
  "hvac",
  "contractor",
  "handyman",
  "cleaning",
  "landscaping",
  "auto-repair",
  "painter",
];

const MENU_CATEGORIES = ["restaurant", "cafe", "bar", "bakery", "pizzeria"];

/**
 * Section ordering strategies — different businesses get different flows.
 * Selected by vibe + slug hash for variety.
 */
const SECTION_ORDERS: Record<string, string[]> = {
  // Trust-first: lead with social proof
  "trust-first": [
    "hero",
    "stats",
    "reviews",
    "services",
    "about",
    "process",
    "gallery",
    "team",
    "founder",
    "faq",
    "contact",
  ],
  // Services-first: lead with what you do
  "services-first": [
    "hero",
    "services",
    "stats",
    "about",
    "process",
    "reviews",
    "gallery",
    "team",
    "founder",
    "faq",
    "contact",
  ],
  // Story-first: lead with narrative
  "story-first": [
    "hero",
    "about",
    "stats",
    "services",
    "gallery",
    "reviews",
    "process",
    "team",
    "founder",
    "faq",
    "contact",
  ],
  // Visual-first: lead with gallery
  "visual-first": [
    "hero",
    "gallery",
    "stats",
    "services",
    "about",
    "reviews",
    "process",
    "team",
    "founder",
    "faq",
    "contact",
  ],
};

function pickSectionOrder(vibes: string[], slug: string): string[] {
  if (vibes.includes("trustworthy") || vibes.includes("established"))
    return SECTION_ORDERS["trust-first"];
  if (vibes.includes("visual") || vibes.includes("creative"))
    return SECTION_ORDERS["visual-first"];
  if (vibes.includes("personal") || vibes.includes("warm"))
    return SECTION_ORDERS["story-first"];

  // Default: pick by slug hash for variety
  const orders = Object.values(SECTION_ORDERS);
  return orders[slugHash(slug) % orders.length];
}

export function decideSections(
  business: BusinessData,
  brief: DesignBrief,
): SectionSelection[] {
  const cat = business.category?.toLowerCase().replace(/\s+/g, "-") || "";
  const profileVibes = [
    // Extract from analysis if available
    ...((business as any).analysis?.personality_keywords || []),
  ];

  // Determine which sections are available
  const available = new Map<
    string,
    { component: string; variant?: string; props: Record<string, unknown> }
  >();

  // Hero — always
  available.set("hero", {
    component: "HeroSection",
    variant: brief.hero.variant,
    props: {},
  });

  // Stats — if available
  if (business.stats && business.stats.length >= 2) {
    available.set("stats", {
      component: "StatsCounter",
      variant: brief.componentVariants["StatsCounter"],
      props: {},
    });
  }

  // Services or Menu
  if (MENU_CATEGORIES.includes(cat)) {
    available.set("services", {
      component: "ServiceCards",
      variant: brief.componentVariants["ServiceCards"],
      props: {},
    });
  } else if (business.services && business.services.length >= 1) {
    const columns = business.services.length <= 4 ? 2 : 3;
    available.set("services", {
      component: "ServiceCards",
      variant: brief.componentVariants["ServiceCards"],
      props: { columns },
    });
  }

  // About — always
  available.set("about", { component: "AboutSection", props: {} });

  // Process steps — for service businesses (now works because enrichment generates process-relevant data)
  if (
    SERVICE_CATEGORIES.includes(cat) ||
    cat.includes("pet") ||
    cat.includes("groom") ||
    cat.includes("salon")
  ) {
    available.set("process", {
      component: "ProcessSteps",
      variant: brief.componentVariants["ProcessSteps"],
      props: {},
    });
  }

  // Testimonials — if 3+ reviews
  if (business.reviews && business.reviews.length >= 3) {
    available.set("reviews", {
      component: "TestimonialCarousel",
      variant: brief.componentVariants["TestimonialCarousel"],
      props: {},
    });
  }

  // Image gallery — if 3+ photos (lowered from 5 since we now have better categorization)
  const galleryPhotos = (business.photos || []).filter(
    (p) =>
      p.category === "work" ||
      p.category === "interior" ||
      p.category === "food",
  );
  if (galleryPhotos.length >= 3) {
    available.set("gallery", {
      component: "ImageGallery",
      variant: brief.componentVariants["ImageGallery"],
      props: {},
    });
  }

  // Team — only if members have multi-word names or photos (single-word AI guesses hurt quality)
  if (business.team && business.team.length >= 1) {
    const qualityMembers = business.team.filter(
      (m) => (m.name && m.name.trim().includes(" ")) || m.image,
    );
    if (qualityMembers.length >= 1) {
      available.set("team", { component: "TeamGrid", props: {} });
    }
  }

  // Founder quote — if ownerStory is substantial
  if (business.ownerStory && business.ownerStory.length > 50) {
    available.set("founder", { component: "FounderQuote", props: {} });
  }

  // FAQ — if available (now populated by enrichment)
  if (business.faq && business.faq.length >= 2) {
    available.set("faq", { component: "FAQAccordion", props: {} });
  }

  // Contact — always
  available.set("contact", { component: "ContactSection", props: {} });

  // Pick section ordering based on vibe
  const slug = business.slug || "";
  const order = pickSectionOrder(profileVibes, slug);

  // Build final sections in order, only including available ones
  const sections: SectionSelection[] = [];
  let altToggle = false;

  for (const anchorId of order) {
    const section = available.get(anchorId);
    if (!section) continue;

    sections.push({
      component: section.component,
      variant: section.variant,
      anchorId,
      altBackground: altToggle && anchorId !== "hero" && anchorId !== "stats",
      props: section.props,
    });

    // Toggle alt bg (skip for hero and stats which handle their own bg)
    if (anchorId !== "hero" && anchorId !== "stats") {
      altToggle = !altToggle;
    }
  }

  return sections;
}

/** Derive nav links from included sections */
export function deriveNavLinks(
  sectionsOrBusiness: SectionSelection[] | BusinessData,
): { label: string; href: string }[] {
  // If passed business data directly (for creative director flow), derive from available data
  if (!Array.isArray(sectionsOrBusiness)) {
    const business = sectionsOrBusiness;
    const links: { label: string; href: string }[] = [];
    if ((business.services || []).length > 0)
      links.push({ label: "Services", href: "#services" });
    links.push({ label: "About", href: "#about" });
    if (
      (business.reviews || []).filter(
        (r) => r.text && r.text.trim().length >= 20,
      ).length >= 3
    ) {
      links.push({ label: "Reviews", href: "#reviews" });
    }
    if ((business.photos || []).length >= 5)
      links.push({ label: "Gallery", href: "#gallery" });
    if ((business.faq || []).length > 0)
      links.push({ label: "FAQ", href: "#faq" });
    links.push({ label: "Contact", href: "#contact" });
    return links;
  }

  const sections = sectionsOrBusiness;
  const labelMap: Record<string, string> = {
    services: "Services",
    about: "About",
    process: "Process",
    reviews: "Reviews",
    gallery: "Gallery",
    team: "Team",
    founder: "Story",
    faq: "FAQ",
    contact: "Contact",
  };

  // Skip hero and stats from nav
  const navSections = [
    "services",
    "about",
    "reviews",
    "gallery",
    "team",
    "faq",
    "contact",
  ];

  return sections
    .filter((s) => navSections.includes(s.anchorId))
    .map((s) => ({
      label: labelMap[s.anchorId] || s.anchorId,
      href: `#${s.anchorId}`,
    }));
}
