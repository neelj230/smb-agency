/**
 * Facebook Scraper — HTML-based (no API key needed)
 *
 * Scrapes public Facebook business pages for:
 * - Business description/about
 * - Cover/profile photos
 * - Reviews/recommendations
 * - Contact info
 * - Hours
 * - Posts (for tone analysis)
 *
 * Used by scrape.ts as part of multi-source orchestration.
 * Note: Facebook heavily restricts scraping; this works best on
 * public business pages and may fail on private/restricted pages.
 */

import * as cheerio from 'cheerio'

export interface FacebookData {
  description: string
  coverPhoto: string
  profilePhoto: string
  reviews: { text: string; author: string; rating: number }[]
  email: string
  phone: string
  hours: Record<string, string>
  posts: string[]  // Recent post text for tone analysis
  facebookUrl: string
  likes: number
}

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/**
 * Attempt to scrape a Facebook business page.
 * Accepts either a full URL or just the page name/ID.
 */
export async function scrapeFacebook(input: string): Promise<FacebookData | null> {
  try {
    // Normalize URL
    let url = input
    if (!url.startsWith('http')) {
      url = `https://www.facebook.com/${input}`
    }

    console.log(`  Scraping Facebook: ${url}`)

    const html = await fetchFacebookPage(url)
    if (!html) {
      console.log('    Facebook page fetch failed (may be private/restricted)')
      return null
    }

    const $ = cheerio.load(html)

    // Extract from meta tags (most reliable on Facebook)
    const ogTitle = $('meta[property="og:title"]').attr('content') || ''
    const ogDescription = $('meta[property="og:description"]').attr('content') || ''
    const ogImage = $('meta[property="og:image"]').attr('content') || ''
    const ogUrl = $('meta[property="og:url"]').attr('content') || url

    // Extract description
    const description = ogDescription ||
      $('[data-testid="page-about"], .about-section, [class*="about"]')
        .first()
        .text()
        .trim()

    // Extract cover and profile photos
    const coverPhoto = ogImage || ''
    const profilePhoto = $('img[data-imgperflogname="profileCoverPhoto"], img[alt*="profile"]').attr('src') || ''

    // Try to extract from JSON embedded in page
    const jsonData = extractEmbeddedJson(html)

    // Extract reviews from embedded data or HTML
    const reviews = extractFacebookReviews($, jsonData)

    // Extract contact info
    const phone = extractFromText(html, /(\(\d{3}\)\s*\d{3}[-.]?\d{4}|\d{3}[-.]?\d{3}[-.]?\d{4})/) || ''
    const email = extractFromText(html, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) || ''

    // Extract hours
    const hours = extractFacebookHours($, jsonData)

    // Extract recent posts
    const posts = extractFacebookPosts($, jsonData)

    // Extract likes/followers count
    const likesText = $('[class*="like"], [class*="follower"]').text()
    const likesMatch = likesText.match(/([\d,.]+)\s*(likes?|followers?)/i)
    const likes = likesMatch ? parseInt(likesMatch[1].replace(/[,\.]/g, '')) : 0

    console.log(`    Description: ${description.length > 0 ? 'yes' : 'no'}`)
    console.log(`    Reviews: ${reviews.length}, Posts: ${posts.length}`)

    return {
      description,
      coverPhoto,
      profilePhoto,
      reviews,
      email,
      phone,
      hours,
      posts,
      facebookUrl: ogUrl,
      likes,
    }
  } catch (err) {
    console.warn(`    Facebook scrape failed: ${(err as Error).message}`)
    return null
  }
}

async function fetchFacebookPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) return null
    return await response.text()
  } catch {
    return null
  }
}

function extractEmbeddedJson(html: string): any {
  // Facebook embeds structured data in script tags
  try {
    const patterns = [
      /window\.__INITIAL_DATA__\s*=\s*({.+?});\s*<\/script>/s,
      /"pageAbout"\s*:\s*({.+?})[,}]/s,
    ]
    for (const pattern of patterns) {
      const match = html.match(pattern)
      if (match) return JSON.parse(match[1])
    }
  } catch {}
  return null
}

function extractFacebookReviews($: cheerio.CheerioAPI, _jsonData: any): { text: string; author: string; rating: number }[] {
  const reviews: { text: string; author: string; rating: number }[] = []

  // Try HTML parsing for reviews/recommendations
  $('[data-testid*="review"], [class*="review"], [class*="recommendation"]').each((_, el) => {
    const $el = $(el)
    const text = $el.find('p, [class*="text"], [class*="body"]').first().text().trim()
    const author = $el.find('[class*="author"], [class*="name"]').first().text().trim()
    if (text && text.length > 20) {
      reviews.push({
        text: text.substring(0, 500),
        author: author || 'Facebook User',
        rating: 5, // Facebook uses recommend/don't recommend, default to 5
      })
    }
  })

  return reviews.slice(0, 10)
}

function extractFacebookHours($: cheerio.CheerioAPI, _jsonData: any): Record<string, string> {
  const hours: Record<string, string> = {}

  // Look for hours table/list in HTML
  $('[class*="hour"], [data-testid*="hour"]').each((_, el) => {
    const text = $(el).text().trim()
    const dayPattern = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*[:\-]\s*(.+)/i
    const match = text.match(dayPattern)
    if (match) {
      hours[match[1]] = match[2].trim()
    }
  })

  return hours
}

function extractFacebookPosts($: cheerio.CheerioAPI, _jsonData: any): string[] {
  const posts: string[] = []

  $('[data-testid*="post"], [class*="userContent"], [class*="post_message"]').each((_, el) => {
    const text = $(el).text().trim()
    if (text && text.length > 30 && text.length < 1000) {
      posts.push(text)
    }
  })

  return posts.slice(0, 10)
}

function extractFromText(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern)
  return match ? match[0] : null
}

/**
 * Try to find a Facebook page URL for a business.
 * Uses Google search as a discovery mechanism.
 */
export async function findFacebookPage(businessName: string, city: string): Promise<string | null> {
  try {
    // Try common Facebook URL patterns
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '')
    const slugDash = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    for (const candidate of [slug, slugDash]) {
      const url = `https://www.facebook.com/${candidate}`
      const response = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
      })
      if (response.ok) {
        const html = await response.text()
        // Verify it's a business page, not a personal profile
        if (html.includes('business') || html.includes('Page') || html.includes(businessName.split(' ')[0])) {
          return url
        }
      }
    }

    return null
  } catch {
    return null
  }
}
