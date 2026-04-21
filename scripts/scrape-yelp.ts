/**
 * Yelp Scraper — HTML-based (no API key needed)
 *
 * Scrapes Yelp business listings for:
 * - Reviews (different reviewers than Google)
 * - Photos (user-uploaded)
 * - Business attributes (price range, amenities)
 * - "From the business" description
 *
 * Used by scrape.ts as part of multi-source orchestration.
 */

import * as cheerio from "cheerio";

export interface YelpData {
  reviews: { text: string; author: string; rating: number; date: string }[];
  photos: { src: string; alt: string }[];
  description: string;
  priceRange: string;
  attributes: string[];
  categories: string[];
  yelpUrl: string;
}

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * Search Yelp for a business and scrape its listing.
 */
export async function scrapeYelp(
  businessName: string,
  city: string,
  state: string,
): Promise<YelpData | null> {
  try {
    console.log(
      `  Searching Yelp for "${businessName}" in ${city}, ${state}...`,
    );

    // Step 1: Search for the business
    const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(businessName)}&find_loc=${encodeURIComponent(`${city}, ${state}`)}`;
    const searchHtml = await fetchWithRetry(searchUrl);
    if (!searchHtml) {
      console.log("    Yelp search page fetch failed");
      return null;
    }

    const search$ = cheerio.load(searchHtml);

    // Find the first business result link
    let bizUrl = "";

    // Try JSON-LD data first
    search$('script[type="application/ld+json"]').each((_, el) => {
      try {
        const data = JSON.parse(search$(el).text());
        if (Array.isArray(data)) {
          for (const item of data) {
            if (item["@type"] === "LocalBusiness" && item.url) {
              bizUrl = item.url;
              break;
            }
          }
        } else if (data.url) {
          bizUrl = data.url;
        }
      } catch {}
    });

    // Fallback: find biz links in HTML
    if (!bizUrl) {
      search$('a[href*="/biz/"]').each((_, el) => {
        const href = search$(el).attr("href") || "";
        if (
          href.startsWith("/biz/") &&
          !href.includes("ad_business_id") &&
          !bizUrl
        ) {
          bizUrl = `https://www.yelp.com${href.split("?")[0]}`;
        }
      });
    }

    if (!bizUrl) {
      console.log("    No Yelp listing found");
      return null;
    }

    console.log(`    Found: ${bizUrl}`);

    // Step 2: Scrape the business page
    const bizHtml = await fetchWithRetry(bizUrl);
    if (!bizHtml) {
      console.log("    Yelp business page fetch failed");
      return null;
    }

    const biz$ = cheerio.load(bizHtml);

    // Extract reviews
    const reviews = extractYelpReviews(biz$);

    // Extract photos
    const photos = extractYelpPhotos(biz$);

    // Extract business description
    const description = extractYelpDescription(biz$);

    // Extract price range
    const priceRange =
      biz$('.priceRange, [aria-label*="price"]').first().text().trim() || "";

    // Extract attributes
    const attributes = extractYelpAttributes(biz$);

    // Extract categories
    const categories: string[] = [];
    biz$('.categories a, [class*="category"] a').each((_, el) => {
      const text = biz$(el).text().trim();
      if (text && text.length < 50) categories.push(text);
    });

    console.log(`    Reviews: ${reviews.length}, Photos: ${photos.length}`);

    return {
      reviews,
      photos,
      description,
      priceRange,
      attributes,
      categories,
      yelpUrl: bizUrl,
    };
  } catch (err) {
    console.warn(`    Yelp scrape failed: ${(err as Error).message}`);
    return null;
  }
}

async function fetchWithRetry(
  url: string,
  retries = 2,
): Promise<string | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
      });
      if (response.ok) return await response.text();
      if (response.status === 429) {
        // Rate limited, wait and retry
        await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
        continue;
      }
      return null;
    } catch {
      if (i < retries) await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return null;
}

function extractYelpReviews(
  $: cheerio.CheerioAPI,
): { text: string; author: string; rating: number; date: string }[] {
  const reviews: {
    text: string;
    author: string;
    rating: number;
    date: string;
  }[] = [];

  // Try JSON-LD first
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).text());
      if (data.review && Array.isArray(data.review)) {
        for (const r of data.review) {
          if (r.reviewBody || r.description) {
            reviews.push({
              text: r.reviewBody || r.description,
              author: r.author?.name || r.author || "Yelp Reviewer",
              rating: r.reviewRating?.ratingValue || 5,
              date: r.datePublished || "",
            });
          }
        }
      }
    } catch {}
  });

  if (reviews.length > 0) return reviews.slice(0, 10);

  // Fallback: parse HTML review elements
  $('[class*="review"], [data-review-id]').each((_, el) => {
    const $el = $(el);
    const text = $el
      .find('p, [class*="comment"], [class*="text"]')
      .first()
      .text()
      .trim();
    const author = $el
      .find('[class*="user"], [class*="author"]')
      .first()
      .text()
      .trim();
    const ratingEl = $el
      .find('[aria-label*="star"], [class*="rating"]')
      .first();
    const ratingText = ratingEl.attr("aria-label") || ratingEl.text() || "";
    const ratingMatch = ratingText.match(/(\d+(\.\d+)?)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 5;
    const date = $el.find('time, [class*="date"]').first().text().trim();

    if (text && text.length > 20) {
      reviews.push({
        text: text.substring(0, 500),
        author: author || "Yelp Reviewer",
        rating,
        date,
      });
    }
  });

  return reviews.slice(0, 10);
}

function extractYelpPhotos(
  $: cheerio.CheerioAPI,
): { src: string; alt: string }[] {
  const photos: { src: string; alt: string }[] = [];
  const seen = new Set<string>();

  $('img[src*="bphoto"], img[src*="photo"], img[data-src*="bphoto"]').each(
    (_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src") || "";
      const alt = $(el).attr("alt") || "";
      if (
        src &&
        !seen.has(src) &&
        !src.includes("avatar") &&
        !src.includes("user_")
      ) {
        seen.add(src);
        photos.push({ src, alt });
      }
    },
  );

  return photos.slice(0, 15);
}

function extractYelpDescription($: cheerio.CheerioAPI): string {
  // "From the business" section
  const fromBiz = $('[class*="fromTheBusiness"], [class*="from-the-business"]')
    .find("p")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((t) => t.length > 20)
    .join("\n\n");

  if (fromBiz) return fromBiz;

  // Try JSON-LD
  let description = "";
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).text());
      if (data.description && data.description.length > description.length) {
        description = data.description;
      }
    } catch {}
  });

  return description;
}

function extractYelpAttributes($: cheerio.CheerioAPI): string[] {
  const attributes: string[] = [];

  $('[class*="attribute"], [class*="amenity"], [class*="highlight"]').each(
    (_, el) => {
      const text = $(el).text().trim();
      if (
        text &&
        text.length < 50 &&
        !text.includes("Review") &&
        !text.includes("Photo")
      ) {
        attributes.push(text);
      }
    },
  );

  return [...new Set(attributes)].slice(0, 10);
}
