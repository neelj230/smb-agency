import type { BusinessData } from '../components/types'
import type { VibeProfile, DesignBrief, SectionSelection, GeneratedContent } from './types'
import { categoryLabel } from './utils'

/**
 * Generate creative copy for the site using Claude API.
 * Now receives ENRICHED business data (services, team, FAQ, about, tagline all populated).
 * Uses Claude Sonnet for high-quality, personality-driven copy.
 * Falls back to enriched-data templates if API call fails.
 */
export async function generateContent(
  business: BusinessData,
  vibe: VibeProfile,
  brief: DesignBrief,
  sections: SectionSelection[]
): Promise<GeneratedContent> {
  try {
    return await generateWithClaude(business, vibe, brief, sections)
  } catch (err) {
    console.warn(`Claude API call failed, using template fallback: ${(err as Error).message}`)
    return generateFallback(business, vibe, sections)
  }
}

async function generateWithClaude(
  business: BusinessData,
  vibe: VibeProfile,
  brief: DesignBrief,
  sections: SectionSelection[]
): Promise<GeneratedContent> {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic()

  // Use ALL reviews for richer context
  const allReviews = (business.reviews || [])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)
    .map(r => `"${r.text}" — ${r.author} (${r.rating}★)`)
    .join('\n')

  const servicesList = (business.services || []).map(s => `${s.name}: ${s.description}`).join('\n  - ')
  const teamNames = (business.team || []).map(m => `${m.name} (${m.role})`).join(', ')
  const sectionIds = sections.map(s => s.anchorId)

  const needsAboutStory = !business.brandNarrative && !business.ownerStory
  const needsProcessSteps = sectionIds.includes('process')

  // Pull analysis data if available
  const analysis = (business as any).analysis || {}
  const strengths = analysis.top_3_strengths?.join(', ') || ''
  const personality = analysis.personality_keywords?.join(', ') || vibe.primary

  const prompt = `You are an award-winning web copywriter. Write website copy for "${business.name}" that sounds like it belongs on a Framer template — punchy, emotional, confident.

BUSINESS DATA:
- Name: ${business.name}
- Category: ${business.category}
- Location: ${business.address}, ${business.city}, ${business.state} ${business.zip}
- Phone: ${business.phone}
- Rating: ${business.rating || 'N/A'} (${business.reviewCount || (business.reviews || []).length} reviews)
- Tagline: ${business.tagline || 'None'}
- Services:
  - ${servicesList || 'Not listed'}
- Team: ${teamNames || 'Not listed'}
- Strengths: ${strengths}
- Brand personality: ${personality}

TOP CUSTOMER REVIEWS:
${allReviews || 'No reviews available'}

BRAND NARRATIVE (use as foundation):
${business.brandNarrative || 'None provided'}

DESIGN VIBE: ${vibe.primary}, ${vibe.secondary}, ${vibe.tertiary}
FONT: ${brief.font.display} (display) + ${brief.font.body} (body)

Write copy that:
1. LEADS with what makes this business special (from reviews and strengths)
2. Names specific people if team members are known
3. Sounds confident and premium — like a $10K agency wrote it
4. Uses short, punchy sentences. Not corporate speak.
5. Each section heading should be creative and specific to THIS business (not "Our Services" or "What We Do")

Return ONLY valid JSON:
{
  "headline": "5-8 words, powerful, specific to this business — NOT '[City]'s Top-Rated [Category]'",
  "subheadline": "1-2 sentences that make someone want to scroll. Emotional hook from real review data.",
  "sectionHeadings": {
    ${sectionIds.filter(id => id !== 'hero').map(id => `"${id}": { "heading": "creative heading", "subheading": "optional punchy one-liner" }`).join(',\n    ')}
  }${needsAboutStory ? `,
  "aboutStory": "2-3 paragraphs. Weave in real details from reviews. Name staff. Tell a story, not a corporate bio."` : ''}${needsProcessSteps ? `,
  "processSteps": [
    { "title": "Step name specific to this business", "description": "1 sentence" },
    { "title": "Step name", "description": "1 sentence" },
    { "title": "Step name", "description": "1 sentence" },
    { "title": "Step name", "description": "1 sentence" }
  ]` : ''},
  "metaTitle": "${business.name} | tagline under 60 chars",
  "metaDescription": "Under 160 chars, emotional + includes location and key service",
  "keywords": ["5-8 SEO keywords"]
}

RULES:
- Every claim must be supported by the business data
- Do not invent years in business, awards, or specialties not in the data
- Headline: NO generic patterns like "Top-Rated" or "Best in [City]" — be creative
- Section headings: NO "Our Services", "Our Story", "Our Team" — make each one unique and on-brand
- Return ONLY the JSON, no markdown fencing`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const jsonStr = text.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim()
  return JSON.parse(jsonStr) as GeneratedContent
}

function generateFallback(
  business: BusinessData,
  vibe: VibeProfile,
  sections: SectionSelection[]
): GeneratedContent {
  const catLabel = categoryLabel(business.category || 'Business')
  const city = business.city || 'your area'

  // Use enriched tagline if available, otherwise build from data
  let headline: string
  if (business.tagline && business.tagline.length > 5) {
    headline = business.tagline
  } else if (business.rating && business.rating >= 4.5 && business.reviewCount && business.reviewCount > 50) {
    headline = `${business.reviewCount}+ Happy Customers Can't Be Wrong`
  } else {
    headline = `${catLabel} That Gets It Right`
  }

  // Use enriched narrative or build from reviews
  let subheadline: string
  if (business.brandNarrative) {
    // Take the first sentence of the narrative
    subheadline = business.brandNarrative.split(/\.\s/)[0] + '.'
  } else {
    const topReview = (business.reviews || []).sort((a, b) => b.rating - a.rating)[0]
    if (topReview) {
      subheadline = `"${topReview.text.substring(0, 100)}${topReview.text.length > 100 ? '...' : ''}" — ${topReview.author}`
    } else {
      subheadline = `${business.name} — professional ${catLabel.toLowerCase()} serving ${city}.`
    }
  }

  const sectionHeadings: GeneratedContent['sectionHeadings'] = {}
  for (const s of sections) {
    switch (s.anchorId) {
      case 'services': sectionHeadings.services = { heading: `What ${business.name} Does Best` }; break
      case 'about': sectionHeadings.about = { heading: 'The Story' }; break
      case 'process': sectionHeadings.process = { heading: 'How We Work Together' }; break
      case 'reviews': sectionHeadings.reviews = { heading: 'Straight From Our Customers' }; break
      case 'gallery': sectionHeadings.gallery = { heading: 'See For Yourself' }; break
      case 'team': sectionHeadings.team = { heading: 'The People Behind It All' }; break
      case 'faq': sectionHeadings.faq = { heading: 'Questions? We\'ve Got Answers' }; break
      case 'contact': sectionHeadings.contact = { heading: 'Let\'s Talk' }; break
      case 'founder': sectionHeadings.founder = { heading: 'A Word From Us' }; break
    }
  }

  const processSteps = sections.some(s => s.anchorId === 'process')
    ? [
        { title: 'Reach Out', description: `Call ${business.phone} or fill out our contact form — we respond fast.` },
        { title: 'We Listen', description: 'Tell us what you need. We tailor our approach to your situation.' },
        { title: 'We Deliver', description: 'Our team gets to work with care and precision.' },
        { title: 'You Love It', description: 'We follow up to make sure everything exceeds your expectations.' },
      ]
    : undefined

  return {
    headline,
    subheadline,
    sectionHeadings,
    aboutStory: !business.brandNarrative && !business.ownerStory
      ? `${business.name} has earned a reputation in ${city} for the kind of service that keeps customers coming back. With ${business.reviewCount || (business.reviews || []).length} reviews and a ${business.rating || 5}-star rating, the results speak for themselves.`
      : undefined,
    processSteps,
    metaTitle: `${business.name} | ${business.tagline || catLabel + ' in ' + city}`,
    metaDescription: `${business.name} — ${business.tagline || 'professional ' + catLabel.toLowerCase() + ' in ' + city}. ${business.rating ? `Rated ${business.rating}/5.` : ''} Call ${business.phone}.`,
    keywords: [
      `${catLabel.toLowerCase()} ${city.toLowerCase()}`,
      business.name.toLowerCase(),
      `${catLabel.toLowerCase()} near me`,
      `best ${catLabel.toLowerCase()} ${city.toLowerCase()}`,
      ...(business.services || []).slice(0, 3).map(s => s.name.toLowerCase()),
    ],
  }
}
