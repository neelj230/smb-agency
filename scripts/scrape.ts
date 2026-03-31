/**
 * Deep Business Scraper
 *
 * Takes a business slug from the spreadsheet, scrapes comprehensive data
 * from Google Places (reviews, photos, details), and saves everything to
 * data/businesses/<slug>/business.json + photos/.
 *
 * Usage: npx tsx scripts/scrape.ts "<slug>"
 * Example: npx tsx scripts/scrape.ts "joes-plumbing"
 *
 * Requires: GOOGLE_PLACES_API_KEY in .env
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'

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
const SPREADSHEET_PATH = join(process.cwd(), 'data', 'spreadsheet.csv')

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
  reviews: { text: string; author: string; rating: number; source: 'google' | 'yelp'; date: string }[]
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
}

/**
 * Find the business in the spreadsheet and get its info
 */
function findInSpreadsheet(slug: string): { name: string; category: string; address: string; phone: string; website: string } | null {
  if (!existsSync(SPREADSHEET_PATH)) return null

  const content = readFileSync(SPREADSHEET_PATH, 'utf-8')
  const lines = content.split('\n').slice(1)

  for (const line of lines) {
    if (!line.trim()) continue
    // Parse CSV (handle quoted fields)
    const cols = parseCSVLine(line)
    if (cols[2] === slug) {
      return {
        name: cols[0],
        category: cols[1],
        address: cols[3],
        phone: cols[4],
        website: cols[6] || '',
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

/**
 * Search Google Places to find the place_id for a business
 */
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

/**
 * Get detailed place information
 */
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

/**
 * Download and optimize a photo from Google Places
 */
async function downloadPhoto(photoReference: string, filename: string, alt: string): Promise<{ src: string; alt: string; category: string } | null> {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1920&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`

    const response = await fetch(url, { redirect: 'follow' })
    if (!response.ok) return null

    const buffer = Buffer.from(await response.arrayBuffer())

    // Optimize with Sharp — WebP + JPG
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

    // Guess category from index (rough heuristic — first photo often exterior)
    const category = 'work' // Default; will be refined by AI analysis later

    return { src: `/photos/${filename}`, alt, category }
  } catch (err) {
    console.error(`  Failed to download photo: ${err}`)
    return null
  }
}

/**
 * Parse address into components
 */
function parseAddress(formatted: string): { address: string; city: string; state: string; zip: string } {
  // Format: "123 Main St, Philadelphia, PA 19148, USA"
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

/**
 * Parse opening hours into a day → hours map
 */
function parseHours(openingHours: { weekday_text?: string[] } | undefined): Record<string, string> {
  if (!openingHours?.weekday_text) return {}

  const hours: Record<string, string> = {}
  for (const entry of openingHours.weekday_text) {
    const [day, ...timeParts] = entry.split(': ')
    hours[day] = timeParts.join(': ')
  }
  return hours
}

async function main() {
  console.log(`\n🔍 Deep scraping: "${slug}"\n`)

  // Find in spreadsheet
  const spreadsheetData = findInSpreadsheet(slug)

  let businessName: string
  let businessAddress: string
  let businessCategory: string
  let businessPhone: string

  if (spreadsheetData) {
    businessName = spreadsheetData.name
    businessAddress = spreadsheetData.address
    businessCategory = spreadsheetData.category
    businessPhone = spreadsheetData.phone
    console.log(`Found in spreadsheet: ${businessName}`)
  } else {
    console.error(`Business "${slug}" not found in spreadsheet.csv`)
    console.error('Run the prospect script first, or add the business manually.')
    process.exit(1)
  }

  // Create directories
  mkdirSync(PHOTOS_DIR, { recursive: true })

  // Find place ID
  console.log('Finding on Google Places...')
  const placeId = await findPlaceId(businessName, businessAddress)
  if (!placeId) {
    console.error('Could not find business on Google Places.')
    process.exit(1)
  }

  // Get detailed info
  console.log('Fetching detailed info...')
  const details = await getPlaceDetails(placeId)
  if (!details) {
    console.error('Could not get place details.')
    process.exit(1)
  }

  // Parse address
  const parsedAddress = parseAddress(details.formatted_address || businessAddress)

  // Download photos
  console.log(`Downloading ${details.photos?.length || 0} photos...`)
  const photos: { src: string; alt: string; category: string }[] = []

  if (details.photos) {
    for (let i = 0; i < Math.min(details.photos.length, 10); i++) {
      const photo = details.photos[i]
      const filename = `photo-${i + 1}.jpg`
      const alt = `${businessName} photo ${i + 1}`

      process.stdout.write(`  → Photo ${i + 1}/${Math.min(details.photos.length, 10)}...`)
      const result = await downloadPhoto(photo.photo_reference, filename, alt)
      if (result) {
        // Categorize: first photo usually exterior, assign heuristically
        if (i === 0) result.category = 'exterior'
        else if (i === 1) result.category = 'interior'
        photos.push(result)
        console.log(' ✓')
      } else {
        console.log(' ✗')
      }

      await new Promise(r => setTimeout(r, 200))
    }
  }

  // Process reviews
  console.log(`Processing ${details.reviews?.length || 0} reviews...`)
  const reviews = (details.reviews || []).map((r: { text: string; author_name: string; rating: number; time: number }) => ({
    text: r.text,
    author: r.author_name,
    rating: r.rating,
    source: 'google' as const,
    date: new Date(r.time * 1000).toISOString().split('T')[0],
  }))

  // Parse hours
  const hours = parseHours(details.opening_hours)

  // Build the business data object
  const businessData: BusinessData = {
    name: details.name || businessName,
    slug,
    category: businessCategory,
    address: parsedAddress.address,
    city: parsedAddress.city,
    state: parsedAddress.state,
    zip: parsedAddress.zip,
    phone: details.formatted_phone_number || businessPhone,
    email: '', // Not available from Google Places
    website: details.website || null,
    rating: details.rating || 0,
    reviewCount: details.user_ratings_total || 0,
    tagline: '', // To be generated by AI analysis
    brandNarrative: '', // To be generated by AI analysis
    ownerStory: '', // To be generated by AI analysis
    hours,
    services: [], // To be scraped from website or generated
    reviews,
    team: [], // To be scraped from website
    photos,
    stats: [
      { value: details.user_ratings_total || 0, suffix: '+', label: 'Happy Customers' },
      { value: details.rating || 0, suffix: '', label: 'Google Rating' },
    ],
    faq: [], // To be generated from reviews
    socialLinks: {},
    competitors: [],
    brandColors: { primary: '', accent: '', note: 'To be extracted from existing branding' },
    analysis: {
      top_3_strengths: [],
      common_complaints: [],
      suggested_tagline: '',
      photo_quality: photos.length >= 5 ? 'good' : photos.length >= 2 ? 'fair' : 'poor',
    },
  }

  // Save business.json
  const outputPath = join(DATA_DIR, 'business.json')
  writeFileSync(outputPath, JSON.stringify(businessData, null, 2))

  // Update spreadsheet status
  if (existsSync(SPREADSHEET_PATH)) {
    let csv = readFileSync(SPREADSHEET_PATH, 'utf-8')
    const lines = csv.split('\n')
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i])
      if (cols[2] === slug) {
        cols[12] = 'scraped' // status column
        lines[i] = cols.map(c => c.includes(',') ? `"${c}"` : c).join(',')
        break
      }
    }
    writeFileSync(SPREADSHEET_PATH, lines.join('\n'))
  }

  console.log(`\n✅ Scrape complete!`)
  console.log(`   Business: ${businessData.name}`)
  console.log(`   Rating: ${businessData.rating} ★ (${businessData.reviewCount} reviews)`)
  console.log(`   Photos: ${photos.length}`)
  console.log(`   Reviews: ${reviews.length}`)
  console.log(`   Hours: ${Object.keys(hours).length > 0 ? 'Yes' : 'No'}`)
  console.log(`   Saved to: ${outputPath}`)
  console.log(`\n⚠️  Note: services, tagline, brand narrative, and FAQ still need AI enrichment.`)
  console.log(`   Run the content-writer agent on this business to generate those.`)
}

main().catch(console.error)
