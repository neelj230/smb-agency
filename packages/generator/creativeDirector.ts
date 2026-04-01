import type { BusinessData } from '../components/types'
import type { VibeProfile, DesignBrief, PhotoManifest } from './types'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Creative Director — Claude generates each page.tsx as a creative act.
 *
 * Instead of template assembly, this feeds Claude:
 * 1. Business data + vibe analysis
 * 2. Available components and their props
 * 3. Design database elements relevant to this business
 * 4. CSS recipe implementations
 * 5. Strict content rules
 *
 * Claude writes the actual page.tsx, choosing sections, ordering,
 * dark/light themes, spacing, and copy — like an artist, not an assembler.
 */

interface CreativeOutput {
  pageTsx: string
  globalsCssExtras: string
}

export async function creativeDirector(
  business: BusinessData,
  vibe: VibeProfile,
  brief: DesignBrief,
  photos: PhotoManifest,
  navLinks: { label: string; href: string }[]
): Promise<CreativeOutput> {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic()

  const prompt = buildCreativePrompt(business, vibe, brief, photos, navLinks)

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return parseCreativeOutput(text)
}

function buildCreativePrompt(
  business: BusinessData,
  vibe: VibeProfile,
  brief: DesignBrief,
  photos: PhotoManifest,
  navLinks: { label: string; href: string }[]
): string {
  // Prepare business context
  const reviews = (business.reviews || [])
    .filter(r => r.text && r.text.trim().length >= 20)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)

  const reviewsText = reviews.map(r => {
    const truncated = r.text.length > 280 ? r.text.substring(0, 280) + '...' : r.text
    return `"${truncated}" — ${r.author} (${r.rating}★, ${r.source})`
  }).join('\n')

  const services = (business.services || []).map(s =>
    `{ name: '${esc(s.name)}', description: '${esc(s.description)}'${s.icon ? `, icon: '${s.icon}'` : ''}${s.image ? `, image: '${s.image}'` : ''} }`
  )

  const team = (business.team || []).filter(m => m.image).map(m =>
    `{ name: '${esc(m.name)}', role: '${esc(m.role)}'${m.image ? `, image: '${esc(m.image)}'` : ''}${m.bio ? `, bio: '${esc(m.bio.substring(0, 80))}'` : ''} }`
  )

  const faq = (business.faq || []).slice(0, 4).map(f =>
    `{ question: '${esc(f.question)}', answer: '${esc(f.answer.substring(0, 120))}' }`
  )

  const stats = (business.stats || []).map(s =>
    `{ value: ${s.value}${s.suffix ? `, suffix: '${s.suffix}'` : ''}${s.prefix ? `, prefix: '${s.prefix}'` : ''}, label: '${esc(s.label)}' }`
  )

  // Photo data
  const heroPhoto = photos.heroImage ? `{ src: '${photos.heroImage.src}', alt: '${esc(photos.heroImage.alt)}', category: '${photos.heroImage.category}' }` : 'null'
  const aboutPhoto = photos.aboutImage ? `{ src: '${photos.aboutImage.src}', alt: '${esc(photos.aboutImage.alt)}', category: '${photos.aboutImage.category}' }` : 'null'
  const galleryPhotos = photos.galleryImages.map(p =>
    `  { src: '${p.src}', alt: '${esc(p.alt)}', category: '${p.category}' }`
  )

  // Hours
  const hoursEntries = business.hours
    ? Object.entries(business.hours).map(([d, t]) => `    ${d}: '${esc(t)}'`).join(',\n')
    : ''

  // Social links
  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, v]) => v).map(([k, v]) => `  ${k}: '${esc(v!)}'`).join(',\n')
    : ''

  // Nav links
  const navLinksStr = navLinks.map(l => `  { label: '${esc(l.label)}', href: '${l.href}' }`).join(',\n')

  // Load design database context (curated subset)
  const designContext = loadDesignContext(vibe)

  return `You are an elite web designer building a one-page site for "${business.name}". You will write the COMPLETE page.tsx file.

## YOUR ROLE
You are an ARTIST, not a template filler. Each site you create should look like a unique, hand-crafted Framer template. You have a library of reusable React components — use them creatively. Vary the composition, ordering, dark/light themes, spacing, and visual texture for each business.

## BUSINESS DATA
Name: ${business.name}
Category: ${business.category}
Location: ${business.address}, ${business.city}, ${business.state} ${business.zip}
Phone: ${business.phone}
Email: ${business.email || 'none'}
Rating: ${business.rating || 'N/A'} / 5 (${business.reviewCount || reviews.length} reviews)
Tagline: ${business.tagline || 'none'}

Vibe: ${vibe.primary} / ${vibe.secondary} / ${vibe.tertiary}
Font: ${brief.font.display} (display) + ${brief.font.body} (body)
Primary color: ${brief.palette.primary}
Accent color: ${brief.palette.accent}

## REVIEWS (real customer words — use these for authenticity)
${reviewsText || 'No reviews available'}

## AVAILABLE DATA
Services (${services.length}): ${services.length > 0 ? '\n' + services.join(',\n') : 'none'}

Team members WITH photos (${team.length}): ${team.length > 0 ? '\n' + team.join(',\n') : 'none — DO NOT include a team section'}

FAQ (${faq.length}): ${faq.length > 0 ? '\n' + faq.join(',\n') : 'none'}

Stats: ${stats.length > 0 ? '\n' + stats.join(',\n') : 'none'}

Hero photo: ${heroPhoto}
About photo: ${aboutPhoto}
Gallery photos (${galleryPhotos.length}): ${galleryPhotos.length > 0 ? '\n' + galleryPhotos.join(',\n') : 'none'}

Hours: ${hoursEntries ? '{\n' + hoursEntries + '\n  }' : 'none'}

Social links: ${socialEntries ? '{\n' + socialEntries + '\n}' : '{}'}

## PRE-BUILT CONTACT OBJECT (use this exact object for ContactSection and Footer)
\`\`\`
const businessContact = {
  name: '${esc(business.name)}',
  address: '${esc(business.address || '')}',
  city: '${esc(business.city || '')}',
  state: '${esc(business.state || '')}',
  zip: '${esc(business.zip || '')}',
  phone: '${esc(business.phone || '')}',
  email: '${esc(business.email || '')}',
${hoursEntries ? `  hours: {\n${hoursEntries}\n  },` : ''}
}
\`\`\`

## AVAILABLE COMPONENTS (NAMED exports — use curly braces!)
All components use NAMED exports. Import like this:
\`\`\`
import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
\`\`\`
NEVER use default imports. Always use \`{ ComponentName }\`.

1. **Navbar** — Props: businessName, links (NavLink[]), ctaText, ctaHref
2. **HeroSection** — Props: headline, subheadline, ctaText, ctaHref, secondaryCtaText, secondaryCtaHref, rating, reviewCount, variant ("photo-bg"|"split"|"centered"|"dark-bold"|"blurred-reveal"), backgroundImage (Photo), foregroundImage (Photo)
3. **ServiceCards** — Props: heading, subheading?, services (Service[]), columns (2|3), variant ("grid"|"alternating")
4. **AboutSection** — Props: heading, story, image? (Photo)
5. **TestimonialCarousel** — Props: heading, reviews (Review[]), variant ("scroll"|"grid"|"featured")
6. **StatsCounter** — Props: stats (Stat[]), variant ("dark"|"light")
7. **ImageGallery** — Props: heading, photos (Photo[]), variant ("grid"|"scroll"|"masonry")
8. **ProcessSteps** — Props: heading, subheading?, steps (ProcessStep[]), variant ("grid"|"timeline")
9. **FAQAccordion** — Props: heading, items (FAQItem[])
10. **ContactSection** — Props: business ({ name, address, city, state, zip, phone, email, hours }), heading, showMap (boolean)
11. **TeamGrid** — Props: heading, subheading?, members (TeamMember[])
12. **Footer** — Props: business ({ name, address, city, state, zip, phone, email }), links (NavLink[]), socialLinks
13. **ClickToCall** — Props: phone (string)

Types needed: import type { NavLink, Photo, Service, Review, Stat, ProcessStep, FAQItem, TeamMember, SocialLinks } from '@/components/types'

Key type shapes (MUST match exactly):
\`\`\`
Photo: { src: string, alt: string, category: 'exterior'|'interior'|'team'|'work'|'food'|'product' }
Service: { name: string, description: string, icon?: string, image?: string }
Review: { text: string, author: string, rating: number, source: 'google'|'yelp'|'facebook' }  // source MUST be lowercase
Stat: { value: number, label: string, suffix?: string, prefix?: string }
ProcessStep: { step: number, title: string, description: string }
FAQItem: { question: string, answer: string }
TeamMember: { name: string, role: string, image?: string, bio?: string, credentials?: string[] }
NavLink: { label: string, href: string }
SocialLinks: { facebook?: string, instagram?: string, twitter?: string, linkedin?: string, yelp?: string }
\`\`\`

## DESIGN DATABASE — Your Palette of Visual Ideas
${designContext}

## CSS RECIPES — Extra visual texture (output any you want in globalsCssExtras)
- **film-grain**: Subtle noise overlay for warmth/analog feel. body::after with SVG noise, mix-blend-mode: hard-light, opacity: 0.03
- **picture-frame**: Inset border 12px from edges for editorial feel. body::before, border: 1px solid rgba(0,0,0,0.08)
- **dot-pattern**: CSS class .dot-pattern with radial-gradient dots. Apply to section backgrounds.
- **gradient-sections**: CSS class .section-gradient with ::after gradient transition between sections
- **glass-effect**: CSS class .glass with backdrop-filter blur for frosted glass cards

## STRICT CONTENT RULES (CRITICAL — violations will be rejected)
1. **Headline**: MAX 5 WORDS. State what they do or who they are. NO adjectives like "premier", "trusted", "exceptional", "finest". Just facts.
   - GOOD: "Dave's Artistic Tattoo", "Cuts on Market Street", "Since 2009", "Cobbs Creek Parkway"
   - BAD: "Where Art Meets Skin", "Your Trusted Neighborhood Expert", "Excellence In Every Detail"
2. **Subheadline**: MAX 15 WORDS. One sentence. A fact or a short real quote snippet.
3. **About story**: MAX 3 SENTENCES. MAX 75 WORDS. One concrete detail from reviews. No fluff.
4. **Section headings**: MAX 3 WORDS each. No "Our" prefix ever.
5. **Reviews**: Only include reviews that have actual text (20+ chars). Truncate at 280 chars.
6. **DO NOT include a team section** unless team members WITH PHOTOS were provided above.
7. **DO NOT include FounderQuote** component ever.
8. **All copy must sound human** — like a business owner or friend wrote it, not an AI marketing blog.

## YOUR CREATIVE DECISIONS
For this specific business, make unique choices about:
- **Which 5-7 sections to include** (not all of them — less is more)
- **Section ordering** for narrative flow (don't always go hero→services→about)
- **Dark sections**: Wrap some sections in dark backgrounds for contrast. Use \`className="bg-[var(--brand-text)] text-white"\` on wrapper divs. StatsCounter has variant="dark". Dark sections make sites look premium.
- **Spacing**: Vary section padding. Some sections tight, some generous.
- **Visual rhythm**: Alternate between full-width and constrained sections.

## CRITICAL: NO INLINE STYLE TAGS
NEVER put \`<style>\` tags in page.tsx. This causes React hydration errors.
ALL custom CSS MUST go in the globals.css.extras code block.
You CAN use Tailwind classes and inline \`style={{ }}\` props — just no \`<style>\` elements.

## CRITICAL: DATA ACCURACY
When writing the data constants (reviews, services, photos, etc.), copy the values EXACTLY as provided above. Do NOT:
- Capitalize source values (use 'google' not 'Google')
- Change photo categories
- Modify review text
- Alter service names

## OUTPUT FORMAT
Return exactly TWO code blocks:

\`\`\`page.tsx
// Your complete page.tsx file here
// Must compile with TypeScript, use only the components listed above
// Must include all data as typed constants (services, reviews, stats, etc.)
// Must include Navbar, main content, Footer, and ClickToCall
\`\`\`

\`\`\`globals.css.extras
/* Any additional CSS to append to globals.css */
/* Include CSS recipes, dark section styles, custom animations */
/* Leave empty if no extras needed */
\`\`\`

Write the page now. Make it look incredible. Make it look like a $5,000 Framer template.`
}

function loadDesignContext(vibe: VibeProfile): string {
  try {
    const dbPath = join(process.cwd(), 'data', 'design-elements-database.json')
    const db = JSON.parse(readFileSync(dbPath, 'utf-8'))

    const profileVibes = [vibe.primary, vibe.secondary, vibe.tertiary]

    // Select relevant heroes
    const heroes = (db.heroes || [])
      .filter((h: any) => h.vibe?.some((v: string) => profileVibes.includes(v)))
      .slice(0, 5)
      .map((h: any) => `- ${h.id}: ${h.description}`)
      .join('\n')

    // Select relevant sections
    const sections = (db.sections || [])
      .filter((s: any) => s.vibe?.some((v: string) => profileVibes.includes(v)))
      .slice(0, 10)
      .map((s: any) => `- ${s.id} (${s.category}): ${s.description}`)
      .join('\n')

    // Select relevant animations
    const animations = (db.animations || [])
      .slice(0, 8)
      .map((a: any) => `- ${a.id}: ${a.description}${a.implementation?.notes ? ' — ' + a.implementation.notes : ''}`)
      .join('\n')

    return `### Relevant Hero Patterns
${heroes || 'Use any hero variant that fits'}

### Relevant Section Designs (for inspiration — use the components above to implement)
${sections || 'Standard sections'}

### Animation Ideas
${animations || 'Use fade-up and stagger as baseline'}`
  } catch {
    return 'Design database unavailable — use your best judgment for visual design.'
  }
}

function parseCreativeOutput(text: string): CreativeOutput {
  // Extract page.tsx code block
  const pageMatch = text.match(/```page\.tsx\n([\s\S]*?)```/)
  let pageTsx = pageMatch ? pageMatch[1].trim() : ''

  // Extract globals.css extras
  const cssMatch = text.match(/```globals\.css\.extras\n([\s\S]*?)```/)
  let globalsCssExtras = cssMatch ? cssMatch[1].trim() : ''

  if (!pageTsx) {
    throw new Error('Creative director did not produce a valid page.tsx')
  }

  // Safety net: extract any <style> tags from page.tsx and move to CSS extras
  // (inline <style> causes React hydration errors)
  const styleTagRegex = /<style[^>]*>\{`([\s\S]*?)`\}<\/style>/g
  let match
  while ((match = styleTagRegex.exec(pageTsx)) !== null) {
    globalsCssExtras += '\n' + match[1]
  }
  pageTsx = pageTsx.replace(styleTagRegex, '')

  // Also handle <style dangerouslySetInnerHTML> or plain <style> tags
  const plainStyleRegex = /<style[^>]*>[\s\S]*?<\/style>/g
  while ((match = plainStyleRegex.exec(pageTsx)) !== null) {
    // Extract CSS content from the tag
    const cssContent = match[0].replace(/<style[^>]*>/, '').replace(/<\/style>/, '')
    globalsCssExtras += '\n' + cssContent
  }
  pageTsx = pageTsx.replace(plainStyleRegex, '')

  return { pageTsx, globalsCssExtras }
}

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')
}
