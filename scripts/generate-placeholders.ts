/**
 * Generates placeholder images for a business's photo set.
 * These are temporary — replaced by real scraped photos in production.
 * Uses Sharp to create properly-sized WebP images with text labels.
 */

import sharp from 'sharp'
import { readFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: npx tsx scripts/generate-placeholders.ts <business-slug>')
  process.exit(1)
}

const businessDir = join(process.cwd(), 'data', 'businesses', slug)
const photosDir = join(businessDir, 'photos')

if (!existsSync(businessDir)) {
  console.error(`Business directory not found: ${businessDir}`)
  process.exit(1)
}

mkdirSync(photosDir, { recursive: true })

const business = JSON.parse(readFileSync(join(businessDir, 'business.json'), 'utf-8'))
const photos: { src: string; alt: string; category: string }[] = business.photos ?? []

const CATEGORY_COLORS: Record<string, string> = {
  exterior: '#2563eb',
  interior: '#7c3aed',
  team: '#059669',
  work: '#d97706',
  food: '#dc2626',
  product: '#0891b2',
}

async function generatePlaceholder(filename: string, alt: string, category: string) {
  const width = 1200
  const height = 800
  const color = CATEGORY_COLORS[category] ?? '#6b7280'

  // Create a simple colored rectangle with text overlay via SVG
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="black" opacity="0.3"/>
      <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="sans-serif" font-size="32" font-weight="bold">
        ${category.toUpperCase()}
      </text>
      <text x="50%" y="55%" text-anchor="middle" fill="white" font-family="sans-serif" font-size="18" opacity="0.8">
        ${alt.length > 60 ? alt.substring(0, 57) + '...' : alt}
      </text>
    </svg>
  `

  const outputPath = join(photosDir, filename)
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .webp({ quality: 80 })
    .toFile(outputPath.replace(/\.jpg$/, '.webp'))

  // Also save a jpg version for compatibility
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .jpeg({ quality: 80 })
    .toFile(outputPath)

  console.log(`  ✓ ${filename} (${category})`)
}

async function main() {
  console.log(`Generating ${photos.length} placeholder images for ${business.name}...`)

  for (const photo of photos) {
    const filename = photo.src.split('/').pop()!
    await generatePlaceholder(filename, photo.alt, photo.category)
  }

  console.log(`\nDone! ${photos.length} images generated in ${photosDir}`)
}

main().catch(console.error)
