// Reclassify the 82 "custom" sections into proper canonical types.
// Usage: npx tsx scripts/reclassify-custom-sections.ts

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const REGISTRY_PATH = join(process.cwd(), "data", "section-registry.json");

// Map of section ID → new section type
const RECLASSIFICATIONS: Record<string, string> = {
  // --- GALLERY / VISUAL SHOWCASE ---
  "bamzi-transitional-ramen-bowl-large-food-image-spanning-white-dark-split": "gallery",
  "dreelio-seamless-across-devices-zoom-out-reveal": "gallery",
  "ehunter-video-section-full-screen-background-video-on-scroll": "gallery",
  "ehunter-projects-overlapping-editorial-cards": "gallery",
  "marketing-image-cards-opposing-scroll-directions": "gallery",
  "marketing-second-image-strip-opposing-directions-again": "gallery",
  "minimal-brand-scroll-cards": "gallery",
  "minimal-brand-social-grid": "gallery",
  "mobius-project-image-cards": "gallery",
  "nordiq-collection-showcase-1": "gallery",
  "nordiq-collection-showcase-2": "gallery",
  "nordiq-stories": "gallery",
  "opurent-featured-fleet-product-dashboard-cards": "gallery",
  "real-estate-featured-listings": "gallery",
  "real-estate-neighborhoods-explore-area": "gallery",
  "realdev-featured-properties": "gallery",
  "restaurant-dark-ramen-bowl-large-transitional-image": "gallery",
  "luxerra-car-catalog": "gallery",
  "yachtera-featured-boat-slider": "gallery",
  "yachtera-yacht-catalog-cards": "gallery",
  "yachtera-interior-video-overlay-section": "gallery",
  "trades-clean-video-section-large-image-with-play-button": "gallery",

  // --- SERVICES / FEATURES ---
  "dreelio-project-management": "services",
  "dreelio-financial-management": "services",
  "dreelio-features-grid": "services",
  "hotel-rooms-stay-your-way": "services",
  "hotel-experience-paradise-amenities": "services",
  "kids-camp-activities": "services",
  "nordiq-featured-products-scroll-rotating-image": "services",
  "nordiq-rotating-product-on-scroll": "services",
  "nordiq-materials-with-tree-icons": "services",
  "pilates-class-types-rectangular-image-cards": "services",
  "wellness-glass-classes-large-horizontal-rows-with-big-typography": "services",
  "luxerra-rental-terms": "services",
  "luxerra-benefits": "services",
  "heatfix-benefits-section": "services",
  "trades-clean-benefits-image-left-2x2-icon-grid-right": "services",
  "opurent-benefits-photo-bento-grid-matching-framer-original": "services",

  // --- ABOUT / STORY ---
  "restaurant-dark-our-story-timeline": "about",
  "therapy-mission-statement": "about",
  "marketing-mission-word-by-word-reveal": "about",
  "minimal-brand-philosophy-sections-scrolling-feature-blocks": "about",
  "minimal-brand-problem-statement": "about",
  "forest-therapy-meet-sophia": "about",
  "kids-camp-deeper-mission": "about",
  "trades-clean-our-story-split-text-left-image-right-stats-bottom": "about",
  "yachtera-founder-section": "about",
  "nordiq-studio-tour": "about",
  "mobius-founders": "about",
  "essentia-problem-solution": "about",

  // --- PROCESS / HOW-IT-WORKS ---
  "forest-therapy-from-intention-to-healing-4-step-process": "process",
  "forest-therapy-your-first-session": "process",
  "luxerra-how-to-rent-4-steps": "process",
  "essentia-step-by-step-routine": "process",
  "minimal-brand-skincare-routine": "process",

  // --- STATS / COUNTERS ---
  "etery-results-live-counters": "stats",
  "mobius-awards": "stats",
  "nordiq-collaboration-awards": "stats",
  "minimal-brand-results-sage-green-bg": "stats",

  // --- TEAM ---
  "pilates-instructors-meet-your-instructors": "team",
  "therapy-meet-your-therapist": "team",
  "kids-camp-leadership-counselors": "team",

  // --- CONTACT / FORM ---
  "handyman-quote-form": "contact",
  "real-estate-submit-property-form": "contact",
  "dark-immersive-visit-hours-location": "contact",

  // --- CTA / ANNOUNCEMENT ---
  "gardener-availability-bar-green-banner": "cta",
  "hotel-events-celebrate-by-the-sea": "cta",
  "kids-camp-event-announcement": "cta",
  "dreelio-community": "cta",

  // --- TESTIMONIALS ---
  "hotel-testimonial-large-quote": "testimonials",

  // --- VALUE-PROP / COMPARISON ---
  "trades-clean-trust-split-image-left-text-checklist-right": "comparison",
  "essentia-ingredients": "value-prop",
  "minimal-brand-ingredients": "value-prop",

  // --- INTRO / IMMERSIVE ---
  "essentia-self-writing-text": "intro",
  "essentia-scroll-driven-reasons": "intro",
  "forest-therapy-where-the-magic-happens-immersive-forest-section": "intro",
  "minimal-brand-word-reveal-section": "intro",
  "minimal-brand-cream-jar-persists-through-all-phases": "intro",

  // --- PRODUCT / ORDER ---
  "essentia-order-product": "pricing",
  "minimal-brand-product": "pricing",

  // --- SCHEDULE ---
  "pilates-class-schedule-grid-table-layout": "services",

  // --- BLOG ---
  "minimal-brand-journal": "blog",
};

function main() {
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));

  let reclassified = 0;
  let remaining = 0;

  for (const entry of registry.entries) {
    if (entry.sectionType === "custom") {
      const newType = RECLASSIFICATIONS[entry.id];
      if (newType) {
        entry.sectionType = newType;
        reclassified++;
      } else {
        remaining++;
        console.log(`  Still custom: ${entry.id} — ${entry.name}`);
      }
    }
  }

  registry.lastUpdated = new Date().toISOString();
  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));

  console.log(`\nReclassified ${reclassified} sections.`);
  console.log(`Remaining custom: ${remaining}`);

  // Print new distribution
  const typeCounts: Record<string, number> = {};
  for (const entry of registry.entries) {
    typeCounts[entry.sectionType] = (typeCounts[entry.sectionType] || 0) + 1;
  }
  console.log("\nSection type distribution:");
  const sorted = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  for (const [type, count] of sorted) {
    console.log(`  ${type}: ${count}`);
  }
}

main();
