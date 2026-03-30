# SMB Agency — Project Rules

## Overview
Automated website agency for SMBs & mid-market companies. Generates stunning Next.js sites from scraped business data.

## Tech Stack
- **Runtime:** Node.js with TypeScript
- **Framework:** Next.js 14+ (App Router, static export)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Typography:** Pretext (Knuth-Plass justification, multi-column layouts)
- **Images:** Sharp for optimization, next/image for delivery
- **Fonts:** next/font with Google Fonts (zero layout shift)
- **Package Manager:** npm
- **Deployment:** Vercel

## Code Conventions
- Always use TypeScript with strict mode
- Use `async/await`, never raw `.then()` chains
- Use Tailwind utility classes, not custom CSS (except design system recipes)
- Use Next.js App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`)
- Components go in `packages/components/` and are shared across all templates
- Each generated site is a standalone Next.js project in `sites/<business-slug>/`

## Design System Rules (CRITICAL — every site must follow these)

### Typography
- Every site MUST load at least 2 custom fonts via next/font (display + body)
- Font pairings by industry:
  - Restaurant/Food: Instrument Serif + Inter
  - Contractor/Trade: Space Grotesk + Inter
  - Professional (Law/Med): Libre Baskerville + Source Sans 3
  - Creative/Retail: Syne + DM Sans
  - Default: Instrument Serif + Inter
- Use Pretext for justified paragraphs on about/description sections
- Monospace font (JetBrains Mono or similar) for metadata: hours, addresses, phone numbers

### Colors
- Extract brand colors from the business's existing logo/site/social media
- Generate a full palette: primary, secondary, background, text, accent
- Ensure WCAG AA contrast ratios (4.5:1 minimum for body text)
- Commit to 2-3 colors boldly — don't be timid

### Visual Techniques (apply to EVERY site)
1. Film grain noise overlay on hero section (noise.png + mix-blend-mode: hard-light + opacity: 0.03)
2. Custom ::selection colors matching brand palette
3. Scroll-triggered fade-in reveals via Framer Motion on all sections below the fold
4. Generous whitespace — when in doubt, add more space
5. Mobile-first responsive design

### Visual Techniques (apply per tier)
- Tier 2+: Photo galleries with CSS Grid auto-fill, mix-blend-mode hovers
- Tier 3+: Per-service color theming, animated counters for stats, Pretext multi-column
- Tier 4: Picture-frame border inset, CSS 3D transforms, Pretext animated reflow

### Photos
- NEVER use stock photos. Every image must come from the scraped business data.
- Optimize all images with Sharp (WebP, quality 80, max 1920px width)
- Use next/image with lazy loading and blur placeholder
- Categorize photos: exterior, interior, team, products/work, food
- If a business has few photos, use creative CSS treatments to maximize what exists

### Content
- NEVER use generic placeholder text. Every word must be derived from the business's actual data.
- Testimonials come from real Google/Yelp reviews with attribution
- Service descriptions must be accurate to what the business actually offers
- Taglines are generated from review sentiment analysis

## Quality Standards
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- All images must load (no broken images)
- Mobile layout must work at 375px viewport
- All links must be functional
- Contact info must match scraped data exactly
- `next build` must complete without errors

## File Naming
- Business slugs: lowercase, hyphenated (e.g., `joes-plumbing`)
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `generatePalette.ts`)
- Data files: `business.json` per business in `data/businesses/<slug>/`

## Commands
- Build a site: `cd sites/<slug> && npm run build`
- Dev server: `cd sites/<slug> && npm run dev`
- Deploy: `cd sites/<slug> && vercel --prod`
- Run tests: `npx playwright test`
- Lint: `npx eslint .`
- Format: `npx prettier --write .`
