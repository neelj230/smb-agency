/**
 * Deep Business Scraper — Multi-Source
 *
 * Orchestrates data collection from multiple sources:
 * 1. Google Places API (baseline — reviews, photos, details)
 * 2. Business website (Tier 1 — services, team, about, social, colors)
 * 3. Yelp (additional reviews, photos, attributes)
 * 4. Facebook (description, reviews, posts for tone)
 * 5. AI photo categorization (Claude Vision for smart categorization)
 *
 * Usage: npx tsx scripts/scrape.ts "<slug>"
 * Requires: GOOGLE_PLACES_API_KEY in .env
 * Optional: ANTHROPIC_API_KEY for AI photo categorization
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'
import { scrapeWebsite, type WebsiteData } from './scrape-website'
import { scrapeYelp, type YelpData } from './scrape-yelp'
import { scrapeFacebook, findFacebookPage, type FacebookData } from './scrape-facebook'

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY

if (!GOOGLE_API_KEY) {
  console.error('Error: GOOGLE_PLACES_API_KEY not set.')
  process.exit(1)
}

const slug = process.argv[2]

if (!slug) {
  console.error('Usage: npx tsx scripts/scrape.ts "<slug>"')
  process.exit(1)
}

const DATA_DIR = join(process.cwd(), 'data', 'businesses', slug)
const PHOTOS_DIR = join(DATA_DIR, 'photos')
const SPREADSHEET_PATH = process.env.SOURCE_CSV_PATH || join(process.cwd(), 'data', 'spreadsheet.csv')
const SHOULD_UPDATE_STATUS = process.env.UPDATE_SOURCE_STATUS === '1'

interface BusinessData {
  name: string
  slug: string
  category: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  website: string | null
  rating: number
  reviewCount: number
  tagline: string
  brandNarrative: string
  ownerStory: string
  hours: Record<string, string>
  services: { name: string; description: string; icon: string }[]
  reviews: { text: string; author: string; rating: number; source: 'google' | 'yelp' | 'facebook'; date: string }[]
  team: { name: string; role: string; bio: string; credentials: string[] }[]
  photos: { src: string; alt: string; category: string }[]
  stats: { value: number; suffix: string; label: string }[]
  faq: { question: string; answer: string }[]
  socialLinks: Record<string, string>
  competitors: string[]
  brandColors: { primary: string; accent: string; note: string }
  analysis: {
    top_3_strengths: string[]
    common_complaints: string[]
    suggested_tagline: string
    photo_quality: string
  }
  // New: source metadata
  dataSources: string[]
  websiteContent?: string
}

interface SourceColumns {
  businessName: number
  category: number
  slug: number
  address: number
  phone: number
  website: number
  status?: number
}

function getSourceColumns(headerLine: string): SourceColumns {
  const headers = parseCSVLine(headerLine)
  const indexOf = (name: string) => headers.indexOf(name)

  return {
    businessName: indexOf('business_name'),
    category: indexOf('category'),
    slug: indexOf('slug'),
    address: indexOf('address'),
    phone: indexOf('phone'),
    website: indexOf('website_url'),
    status: indexOf('status'),
  }
}

function findInSpreadsheet(slug: string): { name: string; category: string; address: string; phone: string; website: string } | null {
  if (!existsSync(SPREADSHEET_PATH)) return null

  const content = readFileSync(SPREADSHEET_PATH, 'utf-8')
  const lines = content.split('\n')
  if (lines.length === 0) return null
  const columns = getSourceColumns(lines[0])
  const dataLines = lines.slice(1)

  for (const line of dataLines) {
    if (!line.trim()) continue
    const cols = parseCSVLine(line)
    if (cols[columns.slug] === slug) {
      return {
        name: cols[columns.businessName],
        category: cols[columns.category],
        address: cols[columns.address],
        phone: cols[columns.phone],
        website: cols[columns.website] || '',
      }
    }
  }
  return null
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

async function findPlaceId(name: string, address: string): Promise<string | null> {
  const query = `${name} ${address}`
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id&key=${GOOGLE_API_KEY}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0].place_id
  }
  return null
}

async function getPlaceDetails(placeId: string) {
  const fields = [
    'name', 'formatted_address', 'formatted_phone_number', 'website',
    'rating', 'user_ratings_total', 'photos', 'opening_hours',
    'reviews', 'types', 'business_status', 'url',
  ].join(',')

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_API_KEY}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.status !== 'OK') {
    console.error(`Place details error: ${data.status}`)
    return null
  }

  return data.result
}

async function downloadPhoto(photoReference: string, filename: string, alt: string): Promise<{ src: string; alt: string; category: string } | null> {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`

    const response = await fetch(url, { redirect: 'follow' })
    if (!response.ok) return null

    const buffer = Buffer.from(await response.arrayBuffer())

    const webpPath = join(PHOTOS_DIR, filename.replace(/\.\w+$/, '.webp'))
    const jpgPath = join(PHOTOS_DIR, filename)

    await sharp(buffer)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpPath)

    await sharp(buffer)
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(jpgPath)

    const category = 'work' // Will be refined by AI categorization

    return { src: `/photos/${filename}`, alt, category }
  } catch (err) {
    console.error(`  Failed to download photo: ${err}`)
    return null
  }
}

/**
 * Download a photo from an external URL (website/Yelp)
 */
async function downloadExternalPhoto(externalUrl: string, filename: string, alt: string): Promise<{ src: string; alt: string; category: string } | null> {
  try {
    const response = await fetch(externalUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) return null

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('image')) return null

    const buffer = Buffer.from(await response.arrayBuffer())
    if (buffer.length < 5000) return null // Skip tiny images (icons, spacers)

    const webpPath = join(PHOTOS_DIR, filename.replace(/\.\w+$/, '.webp'))
    const jpgPath = join(PHOTOS_DIR, filename)

    await sharp(buffer)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(webpPath)

    await sharp(buffer)
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(jpgPath)

    return { src: `/photos/${filename}`, alt, category: 'work' }
  } catch {
    return null
  }
}

/**
 * Use Claude Vision to categorize photos
 */
async function categorizePhotosWithAI(photos: { src: string; alt: string; category: string }[]): Promise<{ src: string; alt: string; category: string }[]> {
  if (!process.env.ANTHROPIC_API_KEY || photos.length === 0) return photos

  try {
    const { default: Anthropic } = await import('@anthropic-ai/sdk')
    const client = new Anthropic()

    console.log(`  AI categorizing ${photos.length} photos...`)

    const categorized: { src: string; alt: string; category: string }[] = []

    for (const photo of photos) {
      try {
        // Read the photo file
        const photoPath = join(PHOTOS_DIR, photo.src.replace('/photos/', ''))
        const jpgPath = photoPath.replace('.webp', '.jpg')
        const actualPath = existsSync(jpgPath) ? jpgPath : photoPath

        if (!existsSync(actualPath)) {
          categorized.push(photo)
          continue
        }

        const imageData = readFileSync(actualPath)
        const base64 = imageData.toString('base64')
        const mediaType = actualPath.endsWith('.webp') ? 'image/webp' : 'image/jpeg'

        const response = await client.messages.create({
          model: 'claude-haiku-4-5-20251001', // Use Haiku for cost efficiency on simple vision tasks
          max_tokens: 200,
          messages: [{
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: mediaType, data: base64 }
              },
              {
                type: 'text',
                text: 'Categorize this business photo as exactly one of: exterior, interior, team, work, food, product. Also write a brief alt text description (10-15 words). Return JSON: {"category": "...", "alt": "..."}'
              }
            ]
          }],
        })

        const text = response.content[0].type === 'text' ? response.content[0].text : ''
        const jsonStr = text.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim()
        const result = JSON.parse(jsonStr)

        categorized.push({
          src: photo.src,
          alt: result.alt || photo.alt,
          category: result.category || photo.category,
        })
        process.stdout.write('.')
      } catch {
        categorized.push(photo)
      }
    }
    console.log(' done')

    return categorized
  } catch (err) {
    console.warn(`  AI categorization failed: ${(err as Error).message}`)
    return photos
  }
}

function parseAddress(formatted: string): { address: string; city: string; state: string; zip: string } {
  const parts = formatted.split(',').map(s => s.trim())
  const address = parts[0] || ''
  const city = parts[1] || ''
  const stateZip = parts[2] || ''
  const stateMatch = stateZip.match(/^([A-Z]{2})\s*(\d{5})?/)

  return {
    address,
    city,
    state: stateMatch?.[1] || '',
    zip: stateMatch?.[2] || '',
  }
}

function parseHours(openingHours: { weekday_text?: string[] } | undefined): Record<string, string> {
  if (!openingHours?.weekday_text) return {}

  const hours: Record<string, string> = {}
  for (const entry of openingHours.weekday_text) {
    const [day, ...timeParts] = entry.split(': ')
    hours[day] = timeParts.join(': ')
  }
  return hours
}

/**
 * Merge data from all sources into a unified BusinessData object
 */
function mergeSourceData(
  googleData: BusinessData,
  websiteData: WebsiteData | null,
  yelpData: YelpData | null,
  facebookData: FacebookData | null
): BusinessData {
  const merged = { ...googleData }
  const sources = ['google']

  // Merge website data (Tier 1 — highest quality)
  if (websiteData) {
    sources.push('website')

    // Services from website (more detailed than Google)
    if (websiteData.services.length > 0 && merged.services.length === 0) {
      merged.services = websiteData.services.map(s => ({ ...s, icon: '' }))
    }

    // Team from website
    if (websiteData.team.length > 0 && merged.team.length === 0) {
      merged.team = websiteData.team.map(t => ({ ...t, credentials: [] }))
    }

    // About content from website
    if (websiteData.about && !merged.brandNarrative) {
      merged.brandNarrative = websiteData.about.substring(0, 1500)
    }

    // Social links from website (most reliable source)
    if (Object.keys(websiteData.socialLinks).length > 0) {
      merged.socialLinks = { ...merged.socialLinks, ...websiteData.socialLinks }
    }

    // Brand colors from website
    if (websiteData.brandColors.length > 0 && !merged.brandColors.primary) {
      merged.brandColors = {
        primary: websiteData.brandColors[0],
        accent: websiteData.brandColors[1] || websiteData.brandColors[0],
        note: 'Extracted from business website',
      }
    }

    // Email from website
    if (websiteData.email && !merged.email) {
      merged.email = websiteData.email
    }

    // Store website content for AI analysis
    merged.websiteContent = websiteData.allText.substring(0, 3000)
  }

  // Merge Yelp data
  if (yelpData) {
    sources.push('yelp')

    // Add Yelp reviews (deduped by author name)
    const existingAuthors = new Set(merged.reviews.map(r => r.author.toLowerCase()))
    const yelpReviews = yelpData.reviews
      .filter(r => !existingAuthors.has(r.author.toLowerCase()))
      .map(r => ({ ...r, source: 'yelp' as const }))
    merged.reviews = [...merged.reviews, ...yelpReviews]

    // Yelp description as supplementary
    if (yelpData.description && !merged.brandNarrative) {
      merged.brandNarrative = yelpData.description
    }

    // Add Yelp link to social
    if (yelpData.yelpUrl) {
      merged.socialLinks.yelp = yelpData.yelpUrl
    }
  }

  // Merge Facebook data
  if (facebookData) {
    sources.push('facebook')

    // Facebook description
    if (facebookData.description && !merged.brandNarrative) {
      merged.brandNarrative = facebookData.description
    }

    // Facebook reviews
    const existingAuthors = new Set(merged.reviews.map(r => r.author.toLowerCase()))
    const fbReviews = facebookData.reviews
      .filter(r => !existingAuthors.has(r.author.toLowerCase()))
      .map(r => ({ ...r, source: 'facebook' as const, date: '' }))
    merged.reviews = [...merged.reviews, ...fbReviews]

    // Facebook link
    if (facebookData.facebookUrl) {
      merged.socialLinks.facebook = facebookData.facebookUrl
    }

    // Email/phone from Facebook
    if (facebookData.email && !merged.email) merged.email = facebookData.email
    if (facebookData.phone && !merged.phone) merged.phone = facebookData.phone

    // Hours from Facebook (if Google hours are empty)
    if (Object.keys(facebookData.hours).length > 0 && Object.keys(merged.hours).length === 0) {
      merged.hours = facebookData.hours
    }
  }

  // Sort reviews by rating (best first)
  merged.reviews.sort((a, b) => b.rating - a.rating)

  // Update review count
  merged.reviewCount = Math.max(merged.reviewCount, merged.reviews.length)

  merged.dataSources = sources

  return merged
}

async function main() {
  console.log(`\n--- Deep Multi-Source Scrape: "${slug}" ---\n`)

  // Find in spreadsheet
  const spreadsheetData = findInSpreadsheet(slug)

  let businessName: string
  let businessAddress: string
  let businessCategory: string
  let businessPhone: string
  let businessWebsite: string

  if (spreadsheetData) {
    businessName = spreadsheetData.name
    businessAddress = spreadsheetData.address
    businessCategory = spreadsheetData.category
    businessPhone = spreadsheetData.phone
    businessWebsite = spreadsheetData.website
    console.log(`Found in spreadsheet: ${businessName}`)
  } else {
    console.error(`Business "${slug}" not found in spreadsheet`)
    process.exit(1)
  }

  // Create directories
  mkdirSync(PHOTOS_DIR, { recursive: true })

  // ===== SOURCE 1: Google Places (baseline) =====
  console.log('\n[1/5] Google Places...')
  const placeId = await findPlaceId(businessName, businessAddress)
  if (!placeId) {
    console.error('Could not find business on Google Places.')
    process.exit(1)
  }

  const details = await getPlaceDetails(placeId)
  if (!details) {
    console.error('Could not get place details.')
    process.exit(1)
  }

  const parsedAddress = parseAddress(details.formatted_address || businessAddress)

  // Download Google photos
  console.log(`  Downloading ${details.photos?.length || 0} photos...`)
  const photos: { src: string; alt: string; category: string }[] = []

  if (details.photos) {
    // Download photos in parallel (batches of 3 for rate limiting)
    const photoRefs = details.photos.slice(0, 10)
    for (let i = 0; i < photoRefs.length; i += 3) {
      const batch = photoRefs.slice(i, i + 3)
      const results = await Promise.all(
        batch.map((photo: any, j: number) => {
          const idx = i + j + 1
          return downloadPhoto(photo.photo_reference, `photo-${idx}.jpg`, `${businessName} photo ${idx}`)
        })
      )
      for (const result of results) {
        if (result) photos.push(result)
      }
    }
    console.log(`  Downloaded ${photos.length} Google photos`)
  }

  // Process reviews
  const reviews = (details.reviews || []).map((r: { text: string; author_name: string; rating: number; time: number }) => ({
    text: r.text,
    author: r.author_name,
    rating: r.rating,
    source: 'google' as const,
    date: new Date(r.time * 1000).toISOString().split('T')[0],
  }))

  const hours = parseHours(details.opening_hours)

  // Build baseline business data
  let businessData: BusinessData = {
    name: details.name || businessName,
    slug,
    category: businessCategory,
    address: parsedAddress.address,
    city: parsedAddress.city,
    state: parsedAddress.state,
    zip: parsedAddress.zip,
    phone: details.formatted_phone_number || businessPhone,
    email: '',
    website: details.website || businessWebsite || null,
    rating: details.rating || 0,
    reviewCount: details.user_ratings_total || 0,
    tagline: '',
    brandNarrative: '',
    ownerStory: '',
    hours,
    services: [],
    reviews,
    team: [],
    photos,
    stats: [
      { value: details.user_ratings_total || 0, suffix: '+', label: 'Happy Customers' },
      { value: details.rating || 0, suffix: '', label: 'Google Rating' },
    ],
    faq: [],
    socialLinks: {},
    competitors: [],
    brandColors: { primary: '', accent: '', note: '' },
    analysis: {
      top_3_strengths: [],
      common_complaints: [],
      suggested_tagline: '',
      photo_quality: photos.length >= 5 ? 'good' : photos.length >= 2 ? 'fair' : 'poor',
    },
    dataSources: ['google'],
  }

  // ===== SOURCE 2: Business Website (Tier 1) =====
  let websiteData: WebsiteData | null = null
  const websiteUrl = businessData.website
  if (websiteUrl) {
    console.log('\n[2/5] Business Website...')
    websiteData = await scrapeWebsite(websiteUrl)

    // Download additional photos from website
    if (websiteData && websiteData.photos.length > 0) {
      const existingCount = photos.length
      const maxAdditional = 10 - existingCount
      const websitePhotos = websiteData.photos.slice(0, maxAdditional)

      for (let i = 0; i < websitePhotos.length; i++) {
        const wp = websitePhotos[i]
        const idx = existingCount + i + 1
        const result = await downloadExternalPhoto(wp.src, `photo-${idx}.jpg`, wp.alt || `${businessName} website photo`)
        if (result) photos.push(result)
      }
      if (photos.length > existingCount) {
        console.log(`    Downloaded ${photos.length - existingCount} website photos`)
      }
    }
  } else {
    console.log('\n[2/5] Business Website... skipped (no website)')
  }

  // ===== SOURCE 3: Yelp =====
  console.log('\n[3/5] Yelp...')
  const yelpData: YelpData | null = await scrapeYelp(businessName, businessData.city, businessData.state)

  // Download Yelp photos if we still need more
  if (yelpData && yelpData.photos.length > 0 && photos.length < 10) {
    const maxAdditional = 10 - photos.length
    const yelpPhotos = yelpData.photos.slice(0, maxAdditional)
    let yelpPhotoCount = 0

    for (let i = 0; i < yelpPhotos.length; i++) {
      const yp = yelpPhotos[i]
      const idx = photos.length + 1
      const result = await downloadExternalPhoto(yp.src, `photo-${idx}.jpg`, yp.alt || `${businessName} Yelp photo`)
      if (result) {
        photos.push(result)
        yelpPhotoCount++
      }
    }
    if (yelpPhotoCount > 0) console.log(`    Downloaded ${yelpPhotoCount} Yelp photos`)
  }

  // ===== SOURCE 4: Facebook =====
  console.log('\n[4/5] Facebook...')
  let facebookData: FacebookData | null = null

  // Check if we found a Facebook link from website scraping
  const fbUrl = websiteData?.socialLinks?.facebook || businessData.socialLinks?.facebook
  if (fbUrl) {
    facebookData = await scrapeFacebook(fbUrl)
  } else {
    // Try to discover Facebook page
    const discoveredFb = await findFacebookPage(businessName, businessData.city)
    if (discoveredFb) {
      facebookData = await scrapeFacebook(discoveredFb)
    } else {
      console.log('    No Facebook page found')
    }
  }

  // ===== SOURCE 5: AI Photo Categorization =====
  console.log('\n[5/5] AI Photo Categorization...')
  businessData.photos = await categorizePhotosWithAI(photos)

  // ===== Merge all sources =====
  console.log('\nMerging data from all sources...')
  businessData = mergeSourceData(businessData, websiteData, yelpData, facebookData)

  // Save business.json
  const outputPath = join(DATA_DIR, 'business.json')
  writeFileSync(outputPath, JSON.stringify(businessData, null, 2))

  // Optionally update source CSV status
  if (SHOULD_UPDATE_STATUS && existsSync(SPREADSHEET_PATH)) {
    let csv = readFileSync(SPREADSHEET_PATH, 'utf-8')
    const lines = csv.split('\n')
    const columns = lines.length > 0 ? getSourceColumns(lines[0]) : null
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i])
      if (columns && cols[columns.slug] === slug && typeof columns.status === 'number' && columns.status >= 0) {
        cols[columns.status] = 'scraped'
        lines[i] = cols.map(c => c.includes(',') ? `"${c}"` : c).join(',')
        break
      }
    }
    writeFileSync(SPREADSHEET_PATH, lines.join('\n'))
  }

  console.log(`\n--- Scrape Complete ---`)
  console.log(`  Business: ${businessData.name}`)
  console.log(`  Sources: ${businessData.dataSources.join(', ')}`)
  console.log(`  Rating: ${businessData.rating} (${businessData.reviewCount} reviews)`)
  console.log(`  Photos: ${businessData.photos.length}`)
  console.log(`  Reviews: ${businessData.reviews.length} (${businessData.reviews.filter(r => r.source === 'google').length} Google, ${businessData.reviews.filter(r => r.source === 'yelp').length} Yelp, ${businessData.reviews.filter(r => (r as any).source === 'facebook').length} Facebook)`)
  console.log(`  Services: ${businessData.services.length}`)
  console.log(`  Team: ${businessData.team.length}`)
  console.log(`  Social links: ${Object.keys(businessData.socialLinks).length}`)
  console.log(`  Brand colors: ${businessData.brandColors.primary || 'pending AI enrichment'}`)
  console.log(`  Saved to: ${outputPath}`)
}

main().catch(console.error)
