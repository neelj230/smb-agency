import type { IntegrationSuggestion } from "./types";

/**
 * Maps business categories to suggested integrations.
 * Phase 1 = ships with every site (essential).
 * Phase 2 = upsell after the sale (recommended/optional).
 */

const UNIVERSAL_PHASE_1: IntegrationSuggestion[] = [
  {
    id: "contact-form",
    name: "Contact Form",
    description: "Form that sends submissions to business email via Resend",
    priority: "essential",
  },
  {
    id: "click-to-call",
    name: "Click to Call",
    description: "Sticky mobile button to call the business",
    priority: "essential",
  },
  {
    id: "google-maps",
    name: "Google Maps Embed",
    description: "Map showing business location",
    priority: "essential",
  },
  {
    id: "reviews-display",
    name: "Reviews Carousel",
    description: "Auto-scrolling carousel of Google/Yelp reviews",
    priority: "essential",
  },
  {
    id: "social-links",
    name: "Social Links",
    description: "Icons linking to social media profiles",
    priority: "essential",
  },
  {
    id: "schema-jsonld",
    name: "Schema.org JSON-LD",
    description: "LocalBusiness structured data for SEO",
    priority: "essential",
  },
  {
    id: "analytics",
    name: "Vercel Analytics",
    description: "Page views and web vitals tracking",
    priority: "essential",
  },
  {
    id: "og-image",
    name: "OG Image",
    description: "Auto-generated social sharing image",
    priority: "essential",
  },
];

const CATEGORY_UPSELLS: Record<string, IntegrationSuggestion[]> = {
  // Appointment-based businesses
  dentist: [
    {
      id: "online-booking",
      name: "Online Booking",
      description: "Cal.com or Calendly embed for appointment scheduling",
      priority: "recommended",
    },
    {
      id: "sms-notifications",
      name: "SMS Lead Notifications",
      description: "Instant text when someone submits a form",
      priority: "recommended",
    },
    {
      id: "review-funnel",
      name: "Review Collection Funnel",
      description: "/review page that routes happy customers to Google",
      priority: "optional",
    },
  ],
  lawyer: [
    {
      id: "online-booking",
      name: "Online Booking",
      description: "Calendly embed for consultation scheduling",
      priority: "recommended",
    },
    {
      id: "sms-notifications",
      name: "SMS Lead Notifications",
      description: "Instant text when someone submits a form",
      priority: "recommended",
    },
  ],
  salon: [
    {
      id: "online-booking",
      name: "Online Booking",
      description: "Cal.com embed for appointment scheduling",
      priority: "recommended",
    },
    {
      id: "review-funnel",
      name: "Review Collection Funnel",
      description: "/review page for happy customers",
      priority: "recommended",
    },
  ],
  chiropractor: [
    {
      id: "online-booking",
      name: "Online Booking",
      description: "Cal.com embed for appointment scheduling",
      priority: "recommended",
    },
    {
      id: "sms-notifications",
      name: "SMS Lead Notifications",
      description: "Instant text when someone submits a form",
      priority: "recommended",
    },
  ],

  // Contractors & trades
  plumber: [
    {
      id: "quote-form",
      name: "Quote Request Form",
      description: "Multi-field form with optional photo upload",
      priority: "recommended",
    },
    {
      id: "emergency-call",
      name: "Emergency Call Button",
      description: "Bright red sticky button for urgent calls",
      priority: "recommended",
    },
    {
      id: "sms-notifications",
      name: "SMS Lead Notifications",
      description: "Instant text when someone requests a quote",
      priority: "optional",
    },
  ],
  electrician: [
    {
      id: "quote-form",
      name: "Quote Request Form",
      description: "Multi-field form with optional photo upload",
      priority: "recommended",
    },
    {
      id: "emergency-call",
      name: "Emergency Call Button",
      description: "Bright red sticky button for urgent calls",
      priority: "recommended",
    },
  ],
  hvac: [
    {
      id: "quote-form",
      name: "Quote Request Form",
      description: "Multi-field form with photo upload",
      priority: "recommended",
    },
    {
      id: "emergency-call",
      name: "Emergency Call Button",
      description: "Bright red sticky button for urgent calls",
      priority: "recommended",
    },
  ],
  contractor: [
    {
      id: "quote-form",
      name: "Quote Request Form",
      description: "Multi-field form with photo upload for estimates",
      priority: "recommended",
    },
    {
      id: "before-after-gallery",
      name: "Before/After Gallery",
      description: "Slider showing transformation photos",
      priority: "optional",
    },
  ],
  cleaning: [
    {
      id: "quote-form",
      name: "Quote Request Form",
      description: "Form with property size, frequency, rooms",
      priority: "recommended",
    },
    {
      id: "online-booking",
      name: "Online Booking",
      description: "Cal.com for scheduling cleaning appointments",
      priority: "optional",
    },
  ],

  // Restaurants & food
  restaurant: [
    {
      id: "menu-display",
      name: "Digital Menu",
      description: "Searchable, mobile-first menu replacing PDF",
      priority: "recommended",
    },
    {
      id: "ordering-link",
      name: "Online Ordering Link",
      description: "CTA linking to Toast/Square Online/DoorDash",
      priority: "recommended",
    },
  ],
  cafe: [
    {
      id: "menu-display",
      name: "Digital Menu",
      description: "Searchable coffee and food menu",
      priority: "recommended",
    },
    {
      id: "ordering-link",
      name: "Online Ordering Link",
      description: "CTA linking to ordering platform",
      priority: "optional",
    },
  ],
  bar: [
    {
      id: "menu-display",
      name: "Drink Menu",
      description: "Beautifully displayed cocktail and beer list",
      priority: "recommended",
    },
  ],

  // Health & wellness
  therapist: [
    {
      id: "online-booking",
      name: "Online Booking",
      description: "Cal.com for scheduling sessions",
      priority: "recommended",
    },
  ],
  "physical-therapy": [
    {
      id: "online-booking",
      name: "Online Booking",
      description: "Cal.com for scheduling sessions",
      priority: "recommended",
    },
  ],
  "yoga-studio": [
    {
      id: "class-schedule",
      name: "Class Schedule",
      description: "Weekly class timetable display",
      priority: "recommended",
    },
    {
      id: "online-booking",
      name: "Online Booking",
      description: "Class booking integration",
      priority: "optional",
    },
  ],

  // Auto
  "auto-repair": [
    {
      id: "quote-form",
      name: "Service Request Form",
      description: "Vehicle info + issue description form",
      priority: "recommended",
    },
    {
      id: "sms-notifications",
      name: "SMS Lead Notifications",
      description: "Instant text for service requests",
      priority: "optional",
    },
  ],
};

/**
 * Get all suggested integrations for a business category.
 * Returns universal Phase 1 integrations + category-specific upsells.
 */
export function getIntegrations(category: string): {
  phase1: IntegrationSuggestion[];
  upsells: IntegrationSuggestion[];
} {
  const normalizedCategory = category.toLowerCase().replace(/[^a-z-]/g, "");

  return {
    phase1: UNIVERSAL_PHASE_1,
    upsells: CATEGORY_UPSELLS[normalizedCategory] ?? [],
  };
}

/**
 * Get all available categories in the registry.
 */
export function getCategories(): string[] {
  return Object.keys(CATEGORY_UPSELLS);
}
