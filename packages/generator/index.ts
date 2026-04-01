import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { loadBusiness, loadDesignDatabase } from './loadBusiness'
import { enrichBusiness } from './contentEnricher'
import { analyzeVibe } from './vibeAnalyzer'
import { selectDesign } from './designSelector'
import { deriveNavLinks } from './sectionDecider'
import { copyPhotos, buildPhotoManifest } from './photoManager'
import { runQualityChecks } from './qualityChecker'
import { creativeDirector } from './creativeDirector'

// File generators
import { generateLayout } from './fileGenerators/layout'
import { generateGlobalsCss } from './fileGenerators/globalsCss'
import { generatePackageJson } from './fileGenerators/packageJson'
import { generateNextConfig } from './fileGenerators/nextConfig'
import { generateTsconfig } from './fileGenerators/tsconfig'
import { generatePostcssConfig } from './fileGenerators/postcssConfig'
import { generateContactRoute } from './fileGenerators/contactRoute'
import { generateNextEnv } from './fileGenerators/nextEnv'
import { runBuildCheck } from './qualityChecker'

export async function generate(slug: string): Promise<void> {
  console.log(`\nGenerating site for: ${slug}`)
  console.log('='.repeat(50))

  // 1. Load business data
  console.log('\n1. Loading business data...')
  const rawBusiness = loadBusiness(slug)
  console.log(`  Name: ${rawBusiness.name}`)
  console.log(`  Category: ${rawBusiness.category}`)
  console.log(`  Rating: ${rawBusiness.rating || 'N/A'} (${rawBusiness.reviewCount || (rawBusiness.reviews || []).length} reviews)`)
  console.log(`  Services: ${(rawBusiness.services || []).length}`)
  console.log(`  Photos: ${(rawBusiness.photos || []).length}`)
  console.log(`  Team: ${(rawBusiness.team || []).length}`)

  // 2. Load design database
  console.log('\n2. Loading design database...')
  const designDb = loadDesignDatabase()
  console.log(`  ${designDb.font_pairings.length} font pairings, ${designDb.color_palettes.length} palettes, ${designDb.heroes.length} heroes`)

  // 3. AI Enrichment — fills empty services, FAQ, team, about, tagline
  // Runs BEFORE vibe analysis so vibe/design/sections use enriched data
  console.log('\n3. Enriching business data with AI...')
  const business = await enrichBusiness(rawBusiness)
  console.log(`  Services: ${(business.services || []).length}`)
  console.log(`  Team: ${(business.team || []).length}`)
  console.log(`  FAQ: ${(business.faq || []).length}`)
  console.log(`  Tagline: "${business.tagline || 'none'}"`)
  console.log(`  Brand narrative: ${business.brandNarrative ? business.brandNarrative.substring(0, 60) + '...' : 'none'}`)

  // 4. Analyze vibe (now uses enriched data)
  console.log('\n4. Analyzing vibe...')
  const vibe = analyzeVibe(business)
  console.log(`  Vibe: ${vibe.primary} / ${vibe.secondary} / ${vibe.tertiary}`)
  const topScores = Object.entries(vibe.scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([v, s]) => `${v}(${s})`)
    .join(', ')
  console.log(`  Scores: ${topScores}`)

  // 5. Select design elements
  console.log('\n5. Selecting design elements...')
  const brief = selectDesign(vibe, designDb, business)
  console.log(`  Font: ${brief.font.display} + ${brief.font.body} (${brief.font.id})`)
  console.log(`  Palette: ${brief.palette.id} (${brief.palette.primary})`)
  console.log(`  Hero: ${brief.hero.variant}`)
  console.log(`  Nav: ${brief.nav.variant}`)
  console.log(`  CSS recipes: ${brief.cssRecipes.join(', ') || 'none'}`)

  // 6. Set up site directory and copy photos
  console.log('\n6. Setting up site directory...')
  const siteDir = join(process.cwd(), 'sites', slug)
  mkdirSync(join(siteDir, 'app', 'api', 'contact'), { recursive: true })
  mkdirSync(join(siteDir, 'public', 'photos'), { recursive: true })

  copyPhotos(slug, siteDir)
  const photos = buildPhotoManifest(business)
  console.log(`  Hero image: ${photos.heroImage?.src || 'none'}`)
  console.log(`  About image: ${photos.aboutImage?.src || 'none'}`)
  console.log(`  Gallery images: ${photos.galleryImages.length}`)

  // Distribute remaining gallery photos to services that lack images
  if (business.services?.length && photos.galleryImages.length > 0) {
    let photoIdx = 0
    for (const service of business.services) {
      if (!service.image && photoIdx < photos.galleryImages.length) {
        service.image = photos.galleryImages[photoIdx].src
        photoIdx++
      }
    }
    if (photoIdx > 0) console.log(`  Distributed ${photoIdx} photos to services`)
  }

  // 7. Derive nav links (simple — based on available data)
  const navLinks = deriveNavLinks(business)

  // 8. CREATIVE DIRECTOR — Claude writes page.tsx as a creative act
  console.log('\n7. Creative Director generating page...')
  const creative = await creativeDirector(business, vibe, brief, photos, navLinks)
  console.log(`  Page.tsx: ${creative.pageTsx.length} chars`)
  console.log(`  CSS extras: ${creative.globalsCssExtras.length} chars`)

  // 9. Generate all files
  console.log('\n8. Writing files...')

  // Creative director generates content inline — use a minimal GeneratedContent for layout
  const content = {
    headline: business.tagline || business.name,
    subheadline: '',
    metaTitle: `${business.name} — ${business.category} in ${business.city}, ${business.state}`,
    metaDescription: `${business.name} is a ${business.category} located in ${business.city}, ${business.state}. ${business.tagline || ''}`.trim(),
    sectionHeadings: {} as Record<string, { heading: string; subheading?: string }>,
    aboutStory: '',
    keywords: [business.category, business.city, business.state, business.name].filter(Boolean) as string[],
  }

  const files: [string, string][] = [
    ['app/page.tsx', creative.pageTsx],
    ['app/layout.tsx', generateLayout(business, brief, content)],
    ['app/globals.css', generateGlobalsCss(brief, creative.globalsCssExtras)],
    ['app/api/contact/route.ts', generateContactRoute(business)],
    ['package.json', generatePackageJson(slug)],
    ['next.config.mjs', generateNextConfig()],
    ['next-env.d.ts', generateNextEnv()],
    ['tsconfig.json', generateTsconfig()],
    ['postcss.config.mjs', generatePostcssConfig()],
  ]

  for (const [filePath, fileContent] of files) {
    writeFileSync(join(siteDir, filePath), fileContent)
    console.log(`  Wrote ${filePath}`)
  }

  // 11. Quality checks
  console.log('\n10. Running quality checks...')
  const quality = await runQualityChecks(slug, business, brief)
  if (!quality.passed) {
    throw new Error('Generated site failed static quality checks')
  }

  if (process.env.SKIP_BUILD_CHECK !== '1') {
    const build = runBuildCheck(slug)
    if (!build.passed) {
      throw new Error(`Generated site failed build check:\n${build.output}`)
    }
  } else {
    console.log('  (Build check skipped)')
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log(`Site generated at: sites/${slug}/`)
  console.log(`\nNext steps:`)
  console.log(`  cd sites/${slug} && npm install && npm run dev`)
  console.log(`  # Then open http://localhost:3000`)
}
