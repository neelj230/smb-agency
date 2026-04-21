import type { BusinessData } from "../components/types";
import { writeFileSync } from "fs";
import { join } from "path";

/**
 * AI Content Enricher — Phase 1 of the pipeline
 *
 * Uses Claude Sonnet to deeply analyze reviews and business data,
 * then fills empty fields: services, FAQ, about story, team, tagline, stats, brand colors.
 * Runs BEFORE vibe analysis and section decisions so those operate on rich data.
 */

interface EnrichmentResult {
  tagline: string;
  brandNarrative: string;
  ownerStory: string;
  services: { name: string; description: string; icon: string }[];
  team: { name: string; role: string; bio: string; credentials: string[] }[];
  faq: { question: string; answer: string }[];
  stats: { value: number; suffix: string; label: string }[];
  brandColors: { primary: string; accent: string; note: string };
  analysis: {
    top_3_strengths: string[];
    common_complaints: string[];
    suggested_tagline: string;
    photo_quality: string;
    personality_keywords: string[];
    named_staff: string[];
  };
}

export async function enrichBusiness(
  business: BusinessData,
): Promise<BusinessData> {
  // Skip enrichment if data is already rich
  if (isAlreadyEnriched(business)) {
    console.log("  Business data already enriched, skipping...");
    return business;
  }

  try {
    const enrichment = await enrichWithClaude(business);
    const enriched = mergeEnrichment(business, enrichment);

    // Persist enriched data back to business.json
    const businessPath = join(
      process.cwd(),
      "data",
      "businesses",
      business.slug,
      "business.json",
    );
    writeFileSync(businessPath, JSON.stringify(enriched, null, 2));
    console.log("  Saved enriched data to business.json");

    return enriched;
  } catch (err) {
    console.warn(`  AI enrichment failed: ${(err as Error).message}`);
    console.warn("  Falling back to rule-based enrichment...");
    return fallbackEnrich(business);
  }
}

function isAlreadyEnriched(business: BusinessData): boolean {
  return !!(
    business.services &&
    business.services.length >= 3 &&
    business.faq &&
    business.faq.length >= 2 &&
    business.brandNarrative &&
    business.brandNarrative.length > 50
  );
}

async function enrichWithClaude(
  business: BusinessData,
): Promise<EnrichmentResult> {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();

  const allReviews = (business.reviews || [])
    .map((r) => `[${r.rating}★ by ${r.author}]: "${r.text}"`)
    .join("\n");

  const existingServices = (business.services || [])
    .map((s) => s.name)
    .join(", ");
  const existingTeam = (business.team || [])
    .map((m) => `${m.name} (${m.role})`)
    .join(", ");
  const photoSummary = (business.photos || [])
    .map((p) => `${p.category}: ${p.alt}`)
    .join(", ");

  const prompt = `You are an expert business analyst and copywriter. Analyze this business deeply and generate rich, specific content.

BUSINESS:
- Name: ${business.name}
- Category: ${business.category}
- Location: ${business.address}, ${business.city}, ${business.state} ${business.zip}
- Phone: ${business.phone}
- Website: ${business.website || "None"}
- Rating: ${business.rating || "N/A"} (${business.reviewCount || (business.reviews || []).length} reviews)
- Hours: ${
    business.hours
      ? Object.entries(business.hours)
          .map(([d, t]) => `${d}: ${t}`)
          .join(", ")
      : "Not listed"
  }
- Current Services: ${existingServices || "None listed"}
- Current Team: ${existingTeam || "None listed"}
- Photos: ${photoSummary || "None"}

ALL CUSTOMER REVIEWS:
${allReviews || "No reviews available"}

INSTRUCTIONS:
1. Read EVERY review carefully. Extract staff names, specific services mentioned, personality traits, and emotional themes.
2. Generate services based on what reviews describe + what's typical for this category. Be specific (not generic "General Service").
3. Extract team members mentioned by name in reviews. Include their qualities as described by customers.
4. Generate FAQ from actual review themes — what do customers praise, worry about, or ask?
5. Write a brand narrative that captures the REAL personality of this business, using details from reviews.
6. Write an owner/founder story that feels authentic (use staff names from reviews if available).
7. Generate a punchy tagline — Framer-style, not corporate. Based on what customers actually love.
8. Suggest brand colors based on the business category and personality vibe.
9. Analyze strengths, complaints, and photo quality from the data.

Return ONLY valid JSON with this exact structure:
{
  "tagline": "Short punchy tagline (5-8 words, Framer-style)",
  "brandNarrative": "2-3 paragraphs about the business. Ground every claim in review data. Name specific staff. Capture the real personality.",
  "ownerStory": "1-2 paragraphs. If a specific person is named frequently in reviews, make them the focus. Otherwise write about the business's character.",
  "services": [
    { "name": "Service Name", "description": "One sentence describing this service", "icon": "lucide-icon-name" }
  ],
  "team": [
    { "name": "Person Name", "role": "Their Role", "bio": "1-2 sentences from review sentiment", "credentials": [] }
  ],
  "faq": [
    { "question": "Real question a customer might have", "answer": "Helpful answer grounded in business data" }
  ],
  "stats": [
    { "value": 100, "suffix": "+", "label": "Descriptive Label" }
  ],
  "brandColors": {
    "primary": "#hexcode",
    "accent": "#hexcode",
    "note": "Why these colors match this business"
  },
  "analysis": {
    "top_3_strengths": ["strength1", "strength2", "strength3"],
    "common_complaints": ["complaint1 or 'None found'"],
    "suggested_tagline": "Alternative tagline option",
    "photo_quality": "good|fair|poor",
    "personality_keywords": ["3-5 personality descriptors from reviews"],
    "named_staff": ["Names of staff mentioned in reviews"]
  }
}

RULES:
- Services: Generate 4-6 services. Use actual service names from reviews when possible. Add category-typical services that reviews imply.
- Team: Only include people actually named in reviews. If no names found, return empty array.
- FAQ: Generate 4-6 questions. Base them on review themes (praise → "what makes you different?", complaints → address them, common mentions → FAQ topic).
- Stats: Include review count, rating, and 1-2 derived stats (years serving area, approximate customers served). Don't invent numbers without basis.
- Brand narrative: Must reference specific details from reviews. Never use generic phrases like "serving with dedication and expertise."
- Tagline: Short, punchy, unique to THIS business. Not "[City]'s Top-Rated [Category]".
- Return ONLY the JSON, no markdown fencing.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const jsonStr = text
    .replace(/```json?\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();
  return JSON.parse(jsonStr) as EnrichmentResult;
}

function mergeEnrichment(
  business: BusinessData,
  enrichment: EnrichmentResult,
): BusinessData {
  return {
    ...business,
    tagline: business.tagline || enrichment.tagline,
    brandNarrative: business.brandNarrative || enrichment.brandNarrative,
    ownerStory: business.ownerStory || enrichment.ownerStory,
    services:
      business.services && business.services.length > 0
        ? business.services
        : enrichment.services,
    team:
      business.team && business.team.length > 0
        ? business.team
        : enrichment.team,
    faq:
      business.faq && business.faq.length > 0 ? business.faq : enrichment.faq,
    stats: enrichment.stats.length > 0 ? enrichment.stats : business.stats,
    // Brand colors: only override if empty
    ...(!(business as any).brandColors?.primary &&
    enrichment.brandColors.primary
      ? ({ brandColors: enrichment.brandColors } as any)
      : {}),
    // Analysis: merge
    ...(enrichment.analysis ? ({ analysis: enrichment.analysis } as any) : {}),
  };
}

/** Rule-based fallback when Claude API is unavailable */
function fallbackEnrich(business: BusinessData): BusinessData {
  const cat = business.category?.toLowerCase() || "business";
  const reviews = business.reviews || [];
  const city = business.city || "the area";

  // Extract names from reviews
  const namePattern =
    /\b([A-Z][a-z]+)\b(?:\s+(?:is|was|has been|helped|did|made|gave|took|always))/g;
  const nameMatches: string[] = [];
  for (const r of reviews) {
    let match;
    while ((match = namePattern.exec(r.text)) !== null) {
      if (
        ![
          "The",
          "They",
          "This",
          "That",
          "Very",
          "Great",
          "Good",
          "Best",
          "Will",
          "Just",
          "Been",
          "Have",
        ].includes(match[1])
      ) {
        nameMatches.push(match[1]);
      }
    }
  }
  const uniqueNames = [...new Set(nameMatches)];

  // Build services from category
  const categoryServices: Record<
    string,
    { name: string; description: string; icon: string }[]
  > = {
    pet: [
      {
        name: "Full Grooming",
        description: "Complete bath, haircut, nail trim, and ear cleaning",
        icon: "scissors",
      },
      {
        name: "Bath & Brush",
        description: "Refreshing bath with thorough brushing and blow-dry",
        icon: "droplets",
      },
      {
        name: "Nail Trimming",
        description: "Quick and gentle nail clipping for all breeds",
        icon: "hand",
      },
      {
        name: "De-shedding Treatment",
        description: "Specialized treatment to reduce shedding and loose fur",
        icon: "wind",
      },
      {
        name: "Puppy First Groom",
        description: "Gentle introduction to grooming for young pups",
        icon: "heart",
      },
    ],
    plumber: [
      {
        name: "Emergency Repairs",
        description: "24/7 emergency plumbing for leaks, bursts, and backups",
        icon: "alert-triangle",
      },
      {
        name: "Drain Cleaning",
        description: "Professional drain clearing and prevention",
        icon: "pipe",
      },
      {
        name: "Water Heater Service",
        description: "Installation, repair, and maintenance of water heaters",
        icon: "flame",
      },
      {
        name: "Bathroom Remodeling",
        description: "Full bathroom renovation and fixture installation",
        icon: "bath",
      },
      {
        name: "Sewer Line Service",
        description: "Camera inspection and sewer line repair",
        icon: "search",
      },
    ],
    salon: [
      {
        name: "Haircuts & Styling",
        description: "Precision cuts and expert styling for every look",
        icon: "scissors",
      },
      {
        name: "Color & Highlights",
        description: "Vibrant color, balayage, and highlight services",
        icon: "palette",
      },
      {
        name: "Blowouts",
        description: "Professional blowout and smoothing treatments",
        icon: "wind",
      },
      {
        name: "Hair Treatments",
        description: "Deep conditioning, keratin, and repair treatments",
        icon: "sparkles",
      },
    ],
    restaurant: [
      {
        name: "Dine-In",
        description: "Enjoy our full menu in a comfortable atmosphere",
        icon: "utensils",
      },
      {
        name: "Takeout",
        description: "Fresh food prepared for pickup at your convenience",
        icon: "package",
      },
      {
        name: "Catering",
        description: "Custom catering for events and special occasions",
        icon: "chef-hat",
      },
      {
        name: "Private Events",
        description: "Host your next event in our private dining space",
        icon: "calendar",
      },
    ],
    "nail-salon": [
      {
        name: "Manicure",
        description: "Classic and gel manicure services with premium products",
        icon: "hand",
      },
      {
        name: "Pedicure",
        description: "Relaxing pedicure treatments for beautiful feet",
        icon: "footprints",
      },
      {
        name: "Nail Art",
        description: "Custom nail art and creative designs",
        icon: "palette",
      },
      {
        name: "Acrylic & Extensions",
        description: "Professional nail extensions and acrylic sets",
        icon: "sparkles",
      },
    ],
  };

  // Find matching services
  let services =
    business.services && business.services.length > 0 ? business.services : [];
  if (services.length === 0) {
    const catKey = Object.keys(categoryServices).find((k) => cat.includes(k));
    services = catKey
      ? categoryServices[catKey]
      : [
          {
            name: "Consultation",
            description: `Free initial consultation to discuss your needs`,
            icon: "message-circle",
          },
          {
            name: "Core Services",
            description: `Professional ${cat} services tailored to you`,
            icon: "star",
          },
          {
            name: "Ongoing Support",
            description: `Continued support and follow-up after service`,
            icon: "shield-check",
          },
        ];
  }

  // Build team from extracted names
  const team = uniqueNames.slice(0, 3).map((name) => ({
    name,
    role: "Team Member",
    bio: "",
    credentials: [],
  }));

  // Build FAQ from review themes
  const faq: { question: string; answer: string }[] = [
    {
      question: `What makes ${business.name} different?`,
      answer: `With a ${business.rating || 5}-star rating from ${business.reviewCount || reviews.length} reviews, our customers consistently praise our quality and service.`,
    },
    {
      question: "How do I schedule an appointment?",
      answer: `Call us at ${business.phone} or use the contact form below. We'll get back to you promptly.`,
    },
    {
      question: "What are your hours?",
      answer: business.hours
        ? `We're open ${Object.entries(business.hours)
            .slice(0, 2)
            .map(([d, t]) => `${d}: ${t}`)
            .join(", ")} and more. Check our contact section for full hours.`
        : `Contact us at ${business.phone} for our current hours.`,
    },
  ];

  // Build stats
  const stats = [
    {
      value: business.reviewCount || reviews.length,
      suffix: "+",
      label: "Happy Customers",
    },
    { value: business.rating || 5, suffix: "/5", label: "Average Rating" },
  ];
  if (reviews.length > 0) {
    const earliest = reviews.reduce(
      (min, r) => (r.date && r.date < min ? r.date : min),
      reviews[0]?.date || "",
    );
    if (earliest) {
      const years = new Date().getFullYear() - new Date(earliest).getFullYear();
      if (years > 1)
        stats.push({
          value: years,
          suffix: "+",
          label: "Years Serving " + city,
        });
    }
  }

  return {
    ...business,
    tagline: business.tagline || `${city}'s trusted ${cat}`,
    brandNarrative: business.brandNarrative || "",
    ownerStory: business.ownerStory || "",
    services,
    team: business.team && business.team.length > 0 ? business.team : team,
    faq: business.faq && business.faq.length > 0 ? business.faq : faq,
    stats,
  };
}
