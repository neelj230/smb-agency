/**
 * Website Scraper — Tier 1
 *
 * Scrapes a business's existing website for:
 * - Services/menu items
 * - Team/staff bios
 * - About/story content
 * - Social media links
 * - Brand colors from CSS
 * - Additional photos
 * - Email address
 * - Meta description
 *
 * Used by scrape.ts as part of multi-source orchestration.
 */

import * as cheerio from 'cheerio'

export interface WebsiteData {
  services: { name: string; description: string }[]
  team: { name: string; role: string; bio: string }[]
  about: string
  socialLinks: Record<string, string>
  brandColors: string[]
  photos: { src: string; alt: string }[]
  email: string
  metaDescription: string
  pageTitle: string
  allText: string // Full page text for AI analysis
}

const SOCIAL_PATTERNS: Record<string, RegExp> = {
  facebook: /facebook\.com\/[^"'\s)]+/i,
  instagram: /instagram\.com\/[^"'\s)]+/i,
  twitter: /(?:twitter|x)\.com\/[^"'\s)]+/i,
  linkedin: /linkedin\.com\/[^"'\s)]+/i,
  youtube: /youtube\.com\/[^"'\s)]+/i,
  tiktok: /tiktok\.com\/[^"'\s)]+/i,
  yelp: /yelp\.com\/biz\/[^"'\s)]+/i,
}

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

export async function scrapeWebsite(url: string): Promise<WebsiteData | null> {
  try {
    console.log(`  Scraping website: ${url}`)

    // Fetch main page
    const html = await fetchPage(url)
    if (!html) return null

    const $ = cheerio.load(html)
    const baseUrl = new URL(url).origin

    // Extract data
    const services = extractServices($)
    const team = extractTeam($)
    const about = extractAbout($)
    const socialLinks = extractSocialLinks($, html)
    const brandColors = extractBrandColors($, html)
    const photos = extractPhotos($, baseUrl)
    const email = extractEmail($, html)
    const metaDescription = $('meta[name="description"]').attr('content') || ''
    const pageTitle = $('title').text().trim()
    const allText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 5000)

    // Try to scrape /about and /team pages if they exist
    const aboutPageData = await tryScrapePage($, baseUrl, ['about', 'about-us', 'our-story'])
    const teamPageData = await tryScrapePage($, baseUrl, ['team', 'our-team', 'staff', 'meet-the-team'])

    // Merge about page content
    const fullAbout = [about, aboutPageData].filter(Boolean).join('\n\n')

    // Merge team from team page
    let fullTeam = team
    if (teamPageData && fullTeam.length === 0) {
      const team$ = cheerio.load(teamPageData)
      fullTeam = extractTeam(team$)
    }

    console.log(`    Services: ${services.length}, Team: ${fullTeam.length}, Photos: ${photos.length}`)
    console.log(`    Social links: ${Object.keys(socialLinks).length}, Colors: ${brandColors.length}`)

    return {
      services,
      team: fullTeam,
      about: fullAbout,
      socialLinks,
      brandColors,
      photos,
      email,
      metaDescription,
      pageTitle,
      allText,
    }
  } catch (err) {
    console.warn(`    Website scrape failed: ${(err as Error).message}`)
    return null
  }
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) return null
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) return null
    return await response.text()
  } catch {
    return null
  }
}

async function tryScrapePage(_$: cheerio.CheerioAPI, baseUrl: string, paths: string[]): Promise<string | null> {
  for (const path of paths) {
    const html = await fetchPage(`${baseUrl}/${path}`)
    if (html && html.length > 500) {
      const page$ = cheerio.load(html)
      const mainContent = page$('main, [role="main"], article, .content, .about, .story')
        .first()
        .text()
        .trim()
      if (mainContent && mainContent.length > 100) return mainContent
      // Fallback: get all paragraph text
      const paragraphs = page$('p').map((_, el) => page$(el).text().trim()).get().filter(t => t.length > 30)
      if (paragraphs.length > 0) return paragraphs.join('\n\n')
    }
  }
  return null
}

function extractServices($: cheerio.CheerioAPI): { name: string; description: string }[] {
  const services: { name: string; description: string }[] = []

  // Strategy 1: Look for service-like sections
  const serviceSelectors = [
    '.services .service', '.service-card', '.service-item',
    '[data-service]', '.offerings .offering',
    '.menu-item', '.pricing-item', '.package',
  ]

  for (const selector of serviceSelectors) {
    $(selector).each((_, el) => {
      const $el = $(el)
      const name = $el.find('h2, h3, h4, .title, .name').first().text().trim()
      const desc = $el.find('p, .description, .desc').first().text().trim()
      if (name && name.length < 100) {
        services.push({ name, description: desc.substring(0, 200) })
      }
    })
    if (services.length > 0) break
  }

  // Strategy 2: Look for list items under service-related headings
  if (services.length === 0) {
    $('h2, h3').each((_, el) => {
      const heading = $(el).text().toLowerCase()
      if (heading.includes('service') || heading.includes('what we') || heading.includes('our work') || heading.includes('menu') || heading.includes('offerings')) {
        const $next = $(el).next('ul, ol, div')
        $next.find('li, .item').each((_, li) => {
          const text = $(li).text().trim()
          if (text.length > 3 && text.length < 150) {
            services.push({ name: text, description: '' })
          }
        })
      }
    })
  }

  return services.slice(0, 10)
}

function extractTeam($: cheerio.CheerioAPI): { name: string; role: string; bio: string }[] {
  const team: { name: string; role: string; bio: string }[] = []

  const teamSelectors = [
    '.team-member', '.staff-member', '.team-card',
    '.member', '.person', '.profile-card',
    '[data-team]', '.about-team .card',
  ]

  for (const selector of teamSelectors) {
    $(selector).each((_, el) => {
      const $el = $(el)
      const name = $el.find('h3, h4, .name, .member-name').first().text().trim()
      const role = $el.find('.role, .title, .position, .job-title, h5').first().text().trim()
      const bio = $el.find('p, .bio, .description').first().text().trim()
      if (name && name.length < 60) {
        team.push({ name, role: role || 'Team Member', bio: bio.substring(0, 300) })
      }
    })
    if (team.length > 0) break
  }

  return team.slice(0, 8)
}

function extractAbout($: cheerio.CheerioAPI): string {
  // Look for about sections
  const aboutSelectors = [
    '.about p', '#about p', '[data-about] p',
    '.story p', '.our-story p', '.mission p',
    'section.about', 'section#about',
  ]

  for (const selector of aboutSelectors) {
    const text = $(selector).map((_, el) => $(el).text().trim()).get().filter(t => t.length > 50).join('\n\n')
    if (text.length > 100) return text.substring(0, 2000)
  }

  return ''
}

function extractSocialLinks($: cheerio.CheerioAPI, html: string): Record<string, string> {
  const links: Record<string, string> = {}

  for (const [platform, pattern] of Object.entries(SOCIAL_PATTERNS)) {
    const match = html.match(pattern)
    if (match) {
      let url = match[0]
      if (!url.startsWith('http')) url = 'https://' + url
      links[platform] = url
    }
  }

  return links
}

function extractBrandColors($: cheerio.CheerioAPI, html: string): string[] {
  const colors = new Set<string>()

  // Extract from inline styles and CSS
  const hexPattern = /#[0-9a-fA-F]{6}\b/g
  let match: RegExpExecArray | null

  // Check inline styles
  $('[style]').each((_, el) => {
    const style = $(el).attr('style') || ''
    while ((match = hexPattern.exec(style)) !== null) {
      colors.add(match[0].toLowerCase())
    }
  })

  // Check <style> blocks
  $('style').each((_, el) => {
    const css = $(el).text()
    while ((match = hexPattern.exec(css)) !== null) {
      colors.add(match[0].toLowerCase())
    }
  })

  // Check meta theme-color
  const themeColor = $('meta[name="theme-color"]').attr('content')
  if (themeColor && /^#[0-9a-fA-F]{6}$/.test(themeColor)) {
    colors.add(themeColor.toLowerCase())
  }

  // Filter out common non-brand colors (black, white, grays)
  const nonBrand = new Set(['#000000', '#ffffff', '#333333', '#666666', '#999999', '#cccccc', '#f0f0f0', '#f5f5f5', '#e5e5e5'])
  return [...colors].filter(c => !nonBrand.has(c)).slice(0, 5)
}

function extractPhotos($: cheerio.CheerioAPI, baseUrl: string): { src: string; alt: string }[] {
  const photos: { src: string; alt: string }[] = []
  const seen = new Set<string>()

  $('img').each((_, el) => {
    let src = $(el).attr('src') || $(el).attr('data-src') || ''
    const alt = $(el).attr('alt') || ''

    if (!src || src.includes('data:image/svg') || src.includes('pixel.gif')) return
    if (src.includes('logo') || src.includes('icon') || src.includes('favicon')) return

    // Resolve relative URLs
    if (src.startsWith('/')) src = baseUrl + src
    else if (!src.startsWith('http')) src = baseUrl + '/' + src

    if (!seen.has(src)) {
      seen.add(src)
      photos.push({ src, alt })
    }
  })

  return photos.slice(0, 20)
}

function extractEmail($: cheerio.CheerioAPI, html: string): string {
  // Check mailto links
  const mailto = $('a[href^="mailto:"]').first().attr('href')
  if (mailto) return mailto.replace('mailto:', '').split('?')[0]

  // Regex scan for email
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  const match = html.match(emailPattern)
  if (match && !match[0].includes('example.com') && !match[0].includes('sentry.io')) {
    return match[0]
  }

  return ''
}
