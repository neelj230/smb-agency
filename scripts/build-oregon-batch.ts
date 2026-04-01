import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY

if (!GOOGLE_API_KEY) {
  console.error('Error: GOOGLE_PLACES_API_KEY not set.')
  process.exit(1)
}

const ONLY_NO_WEBSITE = process.env.ONLY_NO_WEBSITE === '1'
const OUTPUT_PATH = join(
  process.cwd(),
  'data',
  ONLY_NO_WEBSITE ? 'oregon-batch-60-no-websites.csv' : 'oregon-batch-60.csv',
)

const SEARCH_SPECS = [
  ['Portland, Oregon', 'restaurant'],
  ['Portland, Oregon', 'cafe'],
  ['Portland, Oregon', 'dentist'],
  ['Portland, Oregon', 'doctor'],
  ['Portland, Oregon', 'law firm'],
  ['Portland, Oregon', 'accounting firm'],
  ['Portland, Oregon', 'pilates studio'],
  ['Portland, Oregon', 'pet groomer'],
  ['Salem, Oregon', 'electrician'],
  ['Salem, Oregon', 'daycare'],
  ['Eugene, Oregon', 'hvac contractor'],
  ['Eugene, Oregon', 'vet'],
  ['Eugene, Oregon', 'tutoring service'],
  ['Bend, Oregon', 'photography studio'],
  ['Bend, Oregon', 'fitness studio'],
  ['Beaverton, Oregon', 'moving company'],
  ['Hillsboro, Oregon', 'physical therapist'],
  ['Medford, Oregon', 'electrician'],
  ['Corvallis, Oregon', 'daycare'],
  ['Lake Oswego, Oregon', 'accounting firm'],
  ['Lake Oswego, Oregon', 'law firm'],
  ['Ashland, Oregon', 'cafe'],
  ['Gresham, Oregon', 'daycare'],
  ['Gresham, Oregon', 'electrician'],
  ['Gresham, Oregon', 'pet groomer'],
  ['Albany, Oregon', 'hvac contractor'],
  ['Albany, Oregon', 'tutoring service'],
  ['Springfield, Oregon', 'moving company'],
  ['Springfield, Oregon', 'doctor'],
  ['Tigard, Oregon', 'dentist'],
  ['Tigard, Oregon', 'law firm'],
  ['Oregon City, Oregon', 'photography studio'],
  ['Oregon City, Oregon', 'daycare'],
  ['Redmond, Oregon', 'fitness studio'],
  ['Redmond, Oregon', 'electrician'],
  ['Keizer, Oregon', 'daycare'],
  ['Keizer, Oregon', 'cafe'],
  ['Beaverton, Oregon', 'financial advisor'],
  ['Hillsboro, Oregon', 'accounting firm'],
  ['Medford, Oregon', 'pet groomer'],
  ['Corvallis, Oregon', 'law firm'],
  ['Bend, Oregon', 'financial advisor'],
  ['Salem, Oregon', 'doctor'],
  ['Salem, Oregon', 'pet groomer'],
  ['Eugene, Oregon', 'financial advisor'],
  ['Bend, Oregon', 'dentist'],
  ['Beaverton, Oregon', 'daycare'],
  ['Hillsboro, Oregon', 'electrician'],
  ['Medford, Oregon', 'daycare'],
  ['Corvallis, Oregon', 'tutoring service'],
  ['Lake Oswego, Oregon', 'doctor'],
  ['Ashland, Oregon', 'photography studio'],
  ['Oregon City, Oregon', 'electrician'],
  ['Redmond, Oregon', 'daycare'],
] as const

const CHAIN_PATTERNS = [
  /\b24 Hour Fitness\b/i,
  /\bAnytime Fitness\b/i,
  /\bLA Fitness\b/i,
  /\bVCA\b/i,
  /\bKaiser Permanente\b/i,
  /\bProvidence\b/i,
  /\bATI Physical Therapy\b/i,
  /\bMorgan & Morgan\b/i,
  /\bGrant Thornton\b/i,
  /\bMoss Adams\b/i,
  /\bClub Pilates\b/i,
  /\bPure Barre\b/i,
  /\bOrangetheory\b/i,
  /\bGentle Dental\b/i,
  /\bAll My Sons\b/i,
  /\bAllied Van Lines\b/i,
] as const

interface PlaceResult {
  name: string
  formatted_address: string
  formatted_phone_number?: string
  website?: string
  rating?: number
  user_ratings_total?: number
  photos?: { photo_reference: string }[]
  place_id: string
}

interface Prospect {
  business_name: string
  category: string
  source_city: string
  slug: string
  address: string
  phone: string
  email: string
  website_url: string
  website_score: number
  google_rating: number
  review_count: number
  photo_count: number
  priority_tier: string
  status: string
  preview_url: string
  outreach_status: string
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function escapeCSV(value: string | number): string {
  const str = String(value ?? '')
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function isChain(name: string): boolean {
  return CHAIN_PATTERNS.some((pattern) => pattern.test(name))
}

function isLowQualityName(name: string): boolean {
  return /\b(my professional business|test|unknown)\b/i.test(name)
}

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function searchPlaces(query: string): Promise<PlaceResult[]> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
  const response = await fetch(url)
  const data = await response.json()

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places text search error: ${data.status}`)
  }

  if (data.status === 'ZERO_RESULTS') return []

  const detailed: PlaceResult[] = []

  for (const result of data.results as Array<{ place_id: string }>) {
    const detailUrl =
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}` +
      `&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,photos&key=${GOOGLE_API_KEY}`

    const detailResponse = await fetch(detailUrl)
    const detailData = await detailResponse.json()

    if (detailData.status === 'OK') {
      detailed.push({
        ...detailData.result,
        place_id: result.place_id,
      })
    }

    await sleep(60)
  }

  return detailed
}

async function scoreWebsite(url: string): Promise<number> {
  if (!url) return 0

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SMBAgency/1.0)' },
      redirect: 'follow',
    })
    clearTimeout(timeout)

    if (!response.ok) return 10

    const html = await response.text()
    let score = 20

    if (html.includes('viewport')) score += 15
    if (html.includes('tailwind') || html.includes('bootstrap') || html.includes('flex') || html.includes('grid')) score += 10
    if (url.startsWith('https')) score += 5
    if (html.includes('__next') || html.includes('__nuxt') || html.includes('react') || html.includes('vue')) score += 15
    if ((html.match(/<img/g) || []).length >= 3) score += 10
    if (html.includes('schema.org') || html.includes('application/ld+json')) score += 10
    if (html.includes('lazy') || html.includes('loading="lazy"')) score += 5
    if (html.length < 2000) score -= 15
    if (html.includes('wix.com') || html.includes('squarespace') || html.includes('godaddy')) score -= 5

    return Math.max(0, Math.min(100, score))
  } catch {
    return 0
  }
}

function classifyTier(website: string, websiteScore: number): string {
  if (!website) return 'A'
  if (websiteScore < 40) return 'B'
  if (websiteScore < 60) return 'C'
  return 'D'
}

async function main() {
  const deduped = new Map<string, Prospect>()

  for (const [city, category] of SEARCH_SPECS) {
    const query = `${category} in ${city}`
    console.log(`Searching: ${query}`)

    const places = await searchPlaces(query)

    for (const place of places) {
      if (!place.name || !place.formatted_address) continue
      if (isChain(place.name)) continue
      if (isLowQualityName(place.name)) continue

      const key = `${place.name.toLowerCase()}|${place.formatted_address.toLowerCase()}`
      if (deduped.has(key)) continue

      const website = place.website ?? ''
      if (ONLY_NO_WEBSITE && website) continue

      const websiteScore = ONLY_NO_WEBSITE ? 0 : await scoreWebsite(website)

      deduped.set(key, {
        business_name: place.name,
        category,
        source_city: city,
        slug: slugify(place.name),
        address: place.formatted_address,
        phone: place.formatted_phone_number ?? '',
        email: '',
        website_url: website,
        website_score: websiteScore,
        google_rating: place.rating ?? 0,
        review_count: place.user_ratings_total ?? 0,
        photo_count: place.photos?.length ?? 0,
        priority_tier: classifyTier(website, websiteScore),
        status: 'new',
        preview_url: '',
        outreach_status: 'not_contacted',
      })
    }
  }

  const ranked = [...deduped.values()]
    .filter((prospect) => prospect.review_count >= (ONLY_NO_WEBSITE ? 1 : 3))
    .filter((prospect) => (ONLY_NO_WEBSITE ? !prospect.website_url : true))
    .sort((a, b) => {
      const tierOrder = { A: 0, B: 1, C: 2, D: 3 }
      const tierDiff = tierOrder[a.priority_tier as keyof typeof tierOrder] - tierOrder[b.priority_tier as keyof typeof tierOrder]
      if (tierDiff !== 0) return tierDiff
      if (a.website_score !== b.website_score) return a.website_score - b.website_score
      if (a.review_count !== b.review_count) return b.review_count - a.review_count
      return b.google_rating - a.google_rating
    })
    .slice(0, 60)

  const headers = [
    'business_name',
    'category',
    'source_city',
    'slug',
    'address',
    'phone',
    'email',
    'website_url',
    'website_score',
    'google_rating',
    'review_count',
    'photo_count',
    'priority_tier',
    'status',
    'preview_url',
    'outreach_status',
  ]

  mkdirSync(join(process.cwd(), 'data'), { recursive: true })

  const csv = [
    headers.join(','),
    ...ranked.map((prospect) =>
      [
        prospect.business_name,
        prospect.category,
        prospect.source_city,
        prospect.slug,
        prospect.address,
        prospect.phone,
        prospect.email,
        prospect.website_url,
        prospect.website_score,
        prospect.google_rating,
        prospect.review_count,
        prospect.photo_count,
        prospect.priority_tier,
        prospect.status,
        prospect.preview_url,
        prospect.outreach_status,
      ]
        .map(escapeCSV)
        .join(','),
    ),
  ].join('\n')

  writeFileSync(OUTPUT_PATH, csv + '\n')

  const tierCounts = ranked.reduce<Record<string, number>>((acc, prospect) => {
    acc[prospect.priority_tier] = (acc[prospect.priority_tier] ?? 0) + 1
    return acc
  }, {})

  console.log(`\nWrote ${ranked.length} prospects to ${OUTPUT_PATH}`)
  console.log(`Tier counts: ${JSON.stringify(tierCounts)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
