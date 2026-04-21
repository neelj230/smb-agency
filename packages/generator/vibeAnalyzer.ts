import type { BusinessData } from "../components/types";
import type { VibeProfile } from "./types";
import { hexToHsl, slugHash } from "./utils";

/**
 * Vibe Analyzer — determines the personality of a business
 *
 * Key change from original: category weight reduced from max 3 to max 1.
 * Review-derived signals and enrichment data now dominate, ensuring
 * same-category businesses get DIFFERENT vibes based on their actual personality.
 */

/** Category → vibe affinities (REDUCED weight — max 1 per vibe) */
const CATEGORY_VIBES: Record<string, Record<string, number>> = {
  plumber: { trustworthy: 1, professional: 1, direct: 1 },
  electrician: { trustworthy: 1, professional: 1, technical: 1 },
  hvac: { trustworthy: 1, professional: 1, reliable: 1 },
  contractor: { bold: 1, professional: 1, trustworthy: 1 },
  handyman: { friendly: 1, approachable: 1, reliable: 1 },
  landscaping: { fresh: 1, natural: 1, warm: 1 },
  cleaning: { clean: 1, fresh: 1, friendly: 1 },
  "auto-repair": { bold: 1, industrial: 1, trustworthy: 1 },
  salon: { elegant: 1, creative: 1, personal: 1 },
  barbershop: { bold: 1, personal: 1, warm: 1 },
  spa: { calm: 1, elegant: 1, premium: 1 },
  "nail-salon": { elegant: 1, creative: 1, personal: 1 },
  dentist: { clean: 1, trustworthy: 1, friendly: 1 },
  chiropractor: { calm: 1, trustworthy: 1, professional: 1 },
  therapist: { calm: 1, warm: 1, personal: 1 },
  yoga: { calm: 1, serene: 1, warm: 1 },
  restaurant: { warm: 1, inviting: 1, appetizing: 1 },
  cafe: { warm: 1, friendly: 1, inviting: 1 },
  bar: { bold: 1, warm: 1, energetic: 1 },
  bakery: { warm: 1, friendly: 1, cozy: 1 },
  lawyer: { professional: 1, trustworthy: 1, established: 1 },
  accountant: { professional: 1, trustworthy: 1, clean: 1 },
  "real-estate": { premium: 1, professional: 1, established: 1 },
  photographer: { creative: 1, premium: 1, visual: 1 },
  florist: { elegant: 1, warm: 1, creative: 1 },
  tailor: { elegant: 1, premium: 1, personal: 1 },
  gym: { bold: 1, energetic: 1, direct: 1 },
  pet: { friendly: 1, warm: 1, approachable: 1 },
};

/** Sentiment keyword clusters → vibe boosts (INCREASED weight) */
const SENTIMENT_KEYWORDS: Record<string, string[]> = {
  trustworthy: [
    "honest",
    "reliable",
    "trust",
    "trusted",
    "integrity",
    "dependable",
    "straightforward",
    "transparent",
  ],
  premium: [
    "beautiful",
    "amazing",
    "stunning",
    "incredible",
    "exceptional",
    "outstanding",
    "excellent",
    "luxury",
    "gorgeous",
  ],
  friendly: [
    "friendly",
    "nice",
    "welcoming",
    "kind",
    "pleasant",
    "cheerful",
    "warm",
    "sweet",
    "lovely",
  ],
  professional: [
    "professional",
    "knowledgeable",
    "expert",
    "thorough",
    "meticulous",
    "skilled",
    "precise",
  ],
  direct: [
    "fast",
    "quick",
    "responsive",
    "prompt",
    "efficient",
    "timely",
    "immediate",
    "same-day",
  ],
  personal: [
    "family",
    "care",
    "caring",
    "personal",
    "attentive",
    "dedicated",
    "love",
    "gentle",
    "patience",
  ],
  established: [
    "years",
    "since",
    "generation",
    "decades",
    "experience",
    "veteran",
    "longtime",
    "always",
  ],
  playful: [
    "fun",
    "happy",
    "laugh",
    "enjoy",
    "love",
    "best",
    "awesome",
    "fantastic",
  ],
  calm: [
    "relaxing",
    "calm",
    "peaceful",
    "soothing",
    "comfortable",
    "zen",
    "tranquil",
  ],
  creative: [
    "creative",
    "unique",
    "custom",
    "artistic",
    "original",
    "innovative",
    "design",
  ],
};

/** Negation words that invert sentiment */
const NEGATION_WORDS = [
  "not",
  "no",
  "never",
  "don't",
  "doesn't",
  "didn't",
  "wasn't",
  "weren't",
  "isn't",
];

export function analyzeVibe(business: BusinessData): VibeProfile {
  const scores: Record<string, number> = {};

  const addScore = (vibe: string, amount: number) => {
    scores[vibe] = (scores[vibe] || 0) + amount;
  };

  // 1. Category signal (reduced weight — max 1 per vibe)
  const cat = business.category?.toLowerCase().replace(/\s+/g, "-") || "";
  const catVibes = CATEGORY_VIBES[cat];
  if (catVibes) {
    for (const [vibe, score] of Object.entries(catVibes)) {
      addScore(vibe, score);
    }
  } else {
    addScore("professional", 1);
  }

  // 2. Review sentiment scanning (INCREASED weight, with negation detection)
  const reviews = business.reviews || [];
  const reviewTexts = reviews.map((r) => r.text.toLowerCase());
  const joinedReviewText = reviewTexts.join(" ");

  for (const [vibe, keywords] of Object.entries(SENTIMENT_KEYWORDS)) {
    let hits = 0;
    for (const kw of keywords) {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      const matches = joinedReviewText.match(regex);
      if (matches) {
        // Check for negation: skip hits where the keyword is preceded by a negation word
        for (const reviewText of reviewTexts) {
          const kwIdx = reviewText.indexOf(kw);
          if (kwIdx > 0) {
            const prefix = reviewText
              .substring(Math.max(0, kwIdx - 15), kwIdx)
              .trim();
            const isNegated = NEGATION_WORDS.some((neg) =>
              prefix.endsWith(neg),
            );
            if (!isNegated) hits++;
          } else if (kwIdx === 0) {
            hits++;
          }
        }
      }
    }
    // More granular scoring (INCREASED from original)
    if (hits >= 8) addScore(vibe, 5);
    else if (hits >= 5) addScore(vibe, 4);
    else if (hits >= 3) addScore(vibe, 3);
    else if (hits >= 2) addScore(vibe, 2);
    else if (hits >= 1) addScore(vibe, 1);
  }

  // 3. Named individual signal (NEW — boosts personal/friendly if staff mentioned by name)
  const analysis = (business as any).analysis;
  const namedStaff = analysis?.named_staff || [];
  if (namedStaff.length >= 2) {
    addScore("personal", 3);
    addScore("friendly", 2);
  } else if (namedStaff.length === 1) {
    addScore("personal", 2);
  }

  // 4. Personality keywords from enrichment (NEW — direct vibe signal)
  const personalityKeywords: string[] = analysis?.personality_keywords || [];
  for (const kw of personalityKeywords) {
    const normalized = kw.toLowerCase();
    if (
      normalized in scores ||
      Object.keys(SENTIMENT_KEYWORDS).includes(normalized)
    ) {
      addScore(normalized, 2);
    }
    // Map common personality descriptors to vibes
    if (["gentle", "patient", "caring"].includes(normalized))
      addScore("calm", 2);
    if (["fun", "playful", "energetic"].includes(normalized))
      addScore("playful", 2);
    if (["skilled", "expert", "precise"].includes(normalized))
      addScore("professional", 2);
    if (["warm", "welcoming", "cozy"].includes(normalized)) addScore("warm", 2);
  }

  // 5. Photo inventory signal
  const photos = business.photos || [];
  if (photos.length >= 10) {
    addScore("visual", 2);
    addScore("immersive", 1);
  } else if (photos.length < 3) {
    addScore("minimal", 2);
    addScore("typographic", 1);
  }

  const workPhotos = photos.filter(
    (p) => p.category === "work" || p.category === "product",
  );
  if (workPhotos.length >= 3) addScore("showcase", 1);

  const foodPhotos = photos.filter((p) => p.category === "food");
  if (foodPhotos.length >= 2) addScore("appetizing", 1);

  // 6. Rating signal
  const rating = business.rating || 0;
  if (rating >= 4.7) {
    addScore("premium", 2);
    addScore("established", 1);
  } else if (rating >= 4.0) {
    addScore("reliable", 1);
  } else if (rating > 0) {
    addScore("friendly", 1);
    addScore("approachable", 1);
  }

  // 7. Brand color hue signal
  const brandColors = (business as any).brandColors;
  if (brandColors?.primary && brandColors.primary.startsWith("#")) {
    const hsl = hexToHsl(brandColors.primary);
    if ((hsl.h >= 0 && hsl.h <= 60) || hsl.h >= 300) {
      addScore("warm", 2);
      addScore("energetic", 1);
    } else if (hsl.h >= 90 && hsl.h <= 160) {
      addScore("fresh", 2);
      addScore("natural", 1);
    } else if (hsl.h >= 180 && hsl.h <= 270) {
      addScore("calm", 2);
      addScore("trustworthy", 1);
    }
    if (hsl.l < 30) {
      addScore("bold", 1);
      addScore("premium", 1);
    }
    if (hsl.s > 70) {
      addScore("energetic", 1);
      addScore("bold", 1);
    }
  }

  // 8. Review count signal
  const reviewCount = business.reviewCount || reviews.length;
  if (reviewCount >= 100) addScore("established", 2);
  else if (reviewCount < 20) {
    addScore("emerging", 1);
    addScore("personal", 1);
  }

  // 9. Website content tone (NEW — if website was scraped)
  const websiteContent = (business as any).websiteContent;
  if (websiteContent) {
    const wc = websiteContent.toLowerCase();
    if (
      wc.includes("luxury") ||
      wc.includes("premium") ||
      wc.includes("exclusive")
    )
      addScore("premium", 2);
    if (
      wc.includes("family") ||
      wc.includes("community") ||
      wc.includes("neighborhood")
    )
      addScore("warm", 2);
    if (
      wc.includes("modern") ||
      wc.includes("innovative") ||
      wc.includes("cutting-edge")
    )
      addScore("modern", 2);
    if (
      wc.includes("tradition") ||
      wc.includes("heritage") ||
      wc.includes("since")
    )
      addScore("established", 2);
  }

  // Sort vibes by score, tiebreak with slug hash
  const slug = business.slug || "";
  const sorted = Object.entries(scores).sort(
    ([vibeA, scoreA], [vibeB, scoreB]) => {
      if (scoreB !== scoreA) return scoreB - scoreA;
      return (slugHash(slug + vibeA) % 100) - (slugHash(slug + vibeB) % 100);
    },
  );

  return {
    primary: sorted[0]?.[0] || "professional",
    secondary: sorted[1]?.[0] || "friendly",
    tertiary: sorted[2]?.[0] || "clean",
    scores,
  };
}
