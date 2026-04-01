import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'
import type { BusinessData } from '../components/types'
import type { DesignBrief } from './types'

interface CheckResult {
  name: string
  passed: boolean
  message: string
  severity: 'error' | 'warning'
}

export async function runQualityChecks(
  slug: string,
  business: BusinessData,
  brief: DesignBrief
): Promise<{ passed: boolean; results: CheckResult[] }> {
  const siteDir = join(process.cwd(), 'sites', slug)
  const results: CheckResult[] = []

  // Content audit
  results.push(...auditContent(siteDir, business))

  // Content richness checks (NEW)
  results.push(...auditContentRichness(business))

  // Design checks
  results.push(...auditDesign(siteDir, brief))

  // Copy quality checks (NEW)
  results.push(...auditCopyQuality(siteDir, business))

  // File existence checks
  results.push(...auditFiles(siteDir))

  // Only errors cause failure, warnings are informational
  const errors = results.filter(r => !r.passed && r.severity === 'error')
  const warnings = results.filter(r => !r.passed && r.severity === 'warning')
  const passed = errors.length === 0

  // Print report
  console.log('\n--- Quality Report ---')
  for (const r of results) {
    const icon = r.passed ? '\u2713' : r.severity === 'error' ? '\u2717' : '\u26A0'
    console.log(`  ${icon} ${r.name}: ${r.message}`)
  }
  console.log(`\n  ${results.filter(r => r.passed).length}/${results.length} checks passed`)
  if (warnings.length > 0) console.log(`  ${warnings.length} warnings`)
  if (errors.length > 0) console.log(`  ${errors.length} errors (BLOCKING)`)

  if (passed) {
    console.log(`  Design: fonts(${brief.font.display}+${brief.font.body}), palette(${brief.palette.id}), hero(${brief.hero.variant})`)
  }

  return { passed, results }
}

function auditContent(siteDir: string, business: BusinessData): CheckResult[] {
  const results: CheckResult[] = []
  const pagePath = join(siteDir, 'app', 'page.tsx')
  const layoutPath = join(siteDir, 'app', 'layout.tsx')

  if (!existsSync(pagePath)) {
    results.push({ name: 'page.tsx exists', passed: false, message: 'File not found', severity: 'error' })
    return results
  }

  const page = readFileSync(pagePath, 'utf-8')
  const layout = existsSync(layoutPath) ? readFileSync(layoutPath, 'utf-8') : ''

  // Business name appears
  results.push({
    name: 'Business name present',
    passed: layout.includes(business.name) || page.includes(business.name),
    message: layout.includes(business.name) ? 'Found in layout' : page.includes(business.name) ? 'Found in page' : `"${business.name}" not found`,
    severity: 'error',
  })

  // Phone number appears
  results.push({
    name: 'Phone number present',
    passed: page.includes(business.phone),
    message: page.includes(business.phone) ? 'Found' : `"${business.phone}" not found`,
    severity: 'error',
  })

  // No placeholder text
  const placeholders = ['Lorem ipsum', 'TODO', 'placeholder', 'example.com', 'PLACEHOLDER']
  const foundPlaceholder = placeholders.find(p => page.toLowerCase().includes(p.toLowerCase()))
  results.push({
    name: 'No placeholder text',
    passed: !foundPlaceholder,
    message: foundPlaceholder ? `Found "${foundPlaceholder}"` : 'Clean',
    severity: 'error',
  })

  // Reviews are verbatim
  if (business.reviews && business.reviews.length > 0) {
    const reviewMatches = business.reviews
      .slice(0, 6)
      .some((review) => page.includes(review.text.substring(0, 20)))

    results.push({
      name: 'Reviews are verbatim',
      passed: reviewMatches,
      message: reviewMatches ? 'Reviews match source data' : 'Review text may be modified',
      severity: 'warning',
    })
  }

  return results
}

function auditContentRichness(business: BusinessData): CheckResult[] {
  const results: CheckResult[] = []

  // Services check
  const serviceCount = (business.services || []).length
  results.push({
    name: 'Services populated',
    passed: serviceCount >= 3,
    message: serviceCount >= 3 ? `${serviceCount} services` : `Only ${serviceCount} services (need 3+)`,
    severity: 'warning',
  })

  // About story check
  const aboutLen = (business.brandNarrative || '').length + (business.ownerStory || '').length
  results.push({
    name: 'About story populated',
    passed: aboutLen >= 100,
    message: aboutLen >= 100 ? `${aboutLen} chars` : `Only ${aboutLen} chars (need 100+)`,
    severity: 'warning',
  })

  // FAQ check
  const faqCount = (business.faq || []).length
  results.push({
    name: 'FAQ populated',
    passed: faqCount >= 2,
    message: faqCount >= 2 ? `${faqCount} items` : `Only ${faqCount} items (need 2+)`,
    severity: 'warning',
  })

  // Section count estimate
  let sectionCount = 2 // hero + contact always
  if (serviceCount >= 1) sectionCount++
  sectionCount++ // about always
  if ((business.reviews || []).length >= 3) sectionCount++
  if ((business.photos || []).filter(p => ['work', 'interior', 'food'].includes(p.category)).length >= 3) sectionCount++
  if ((business.team || []).length >= 1) sectionCount++
  if (faqCount >= 2) sectionCount++

  results.push({
    name: 'Section variety',
    passed: sectionCount >= 6,
    message: `~${sectionCount} sections${sectionCount < 6 ? ' (target 6+)' : ''}`,
    severity: 'warning',
  })

  return results
}

function auditDesign(siteDir: string, brief: DesignBrief): CheckResult[] {
  const results: CheckResult[] = []
  const layoutPath = join(siteDir, 'app', 'layout.tsx')
  const cssPath = join(siteDir, 'app', 'globals.css')

  const layout = existsSync(layoutPath) ? readFileSync(layoutPath, 'utf-8') : ''
  const css = existsSync(cssPath) ? readFileSync(cssPath, 'utf-8') : ''

  // Custom fonts loaded
  results.push({
    name: 'Custom fonts loaded',
    passed: layout.includes('next/font/google'),
    message: layout.includes('next/font/google') ? `${brief.font.display} + ${brief.font.body}` : 'No font imports found',
    severity: 'error',
  })

  // CSS custom properties defined
  results.push({
    name: 'Brand colors defined',
    passed: css.includes('--brand-primary') && css.includes('--brand-bg'),
    message: css.includes('--brand-primary') ? `palette: ${brief.palette.id}` : 'Missing CSS variables',
    severity: 'error',
  })

  // Components imported
  const pagePath = join(siteDir, 'app', 'page.tsx')
  const page = existsSync(pagePath) ? readFileSync(pagePath, 'utf-8') : ''
  results.push({
    name: 'Components imported',
    passed: page.includes('@/components/'),
    message: page.includes('@/components/') ? 'Shared components used' : 'No component imports found',
    severity: 'error',
  })

  // SchemaJsonLd present
  results.push({
    name: 'Schema.org JSON-LD',
    passed: layout.includes('SchemaJsonLd'),
    message: layout.includes('SchemaJsonLd') ? 'Present' : 'Missing',
    severity: 'warning',
  })

  // Photo used in hero (if variant needs one)
  const needsPhoto = ['photo-bg', 'split', 'blurred-reveal'].includes(brief.hero.variant)
  if (needsPhoto) {
    const hasHeroImage = page.includes('heroImage') || page.includes('backgroundImage') || page.includes('foregroundImage')
    results.push({
      name: 'Hero has image',
      passed: hasHeroImage,
      message: hasHeroImage ? 'Hero image set' : `Hero variant "${brief.hero.variant}" needs an image but none found`,
      severity: 'warning',
    })
  }

  return results
}

function auditCopyQuality(siteDir: string, business: BusinessData): CheckResult[] {
  const results: CheckResult[] = []
  const pagePath = join(siteDir, 'app', 'page.tsx')

  if (!existsSync(pagePath)) return results
  const page = readFileSync(pagePath, 'utf-8')

  // Check for generic headline patterns
  const genericPatterns = [
    /Top-Rated/i,
    /serving.*with dedication/i,
    /you can count on/i,
    /your trusted/i,
    /Your Go-To/i,
  ]

  const foundGeneric = genericPatterns.find(p => p.test(page))
  results.push({
    name: 'Headline not generic',
    passed: !foundGeneric,
    message: foundGeneric ? `Generic pattern found: "${foundGeneric.source}"` : 'Headline appears unique',
    severity: 'warning',
  })

  // Check about section isn't the old generic template
  const genericAbout = 'has been serving'
  results.push({
    name: 'About story not generic',
    passed: !page.includes(genericAbout + ` ${business.city} with dedication`),
    message: page.includes(genericAbout + ` ${business.city} with dedication`)
      ? 'Generic about text detected — needs AI enrichment'
      : 'About story appears specific',
    severity: 'warning',
  })

  return results
}

function auditFiles(siteDir: string): CheckResult[] {
  const results: CheckResult[] = []

  const requiredFiles = [
    'app/page.tsx',
    'app/layout.tsx',
    'app/globals.css',
    'app/api/contact/route.ts',
    'package.json',
    'next.config.mjs',
    'tsconfig.json',
    'postcss.config.mjs',
    'next-env.d.ts',
  ]

  for (const file of requiredFiles) {
    const exists = existsSync(join(siteDir, file))
    results.push({
      name: `File: ${file}`,
      passed: exists,
      message: exists ? 'Exists' : 'Missing',
      severity: 'error',
    })
  }

  return results
}

/** Run next build to verify the site compiles */
export function runBuildCheck(slug: string): { passed: boolean; output: string } {
  const siteDir = join(process.cwd(), 'sites', slug)
  try {
    console.log(`\nRunning build check for ${slug}...`)
    execSync('npm run build', { cwd: siteDir, stdio: 'pipe', timeout: 120000 })
    console.log('  \u2713 Build passed')
    return { passed: true, output: 'Build succeeded' }
  } catch (err: any) {
    const output = err.stdout?.toString() || err.stderr?.toString() || err.message
    console.log('  \u2717 Build failed')
    return { passed: false, output }
  }
}
