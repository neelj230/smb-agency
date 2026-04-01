# SMB Agency — Project Rules

## Overview
Automated website agency for SMBs & mid-market companies. Generates stunning Next.js sites from scraped business data. Every site should look like it was built by a top creative agency — the quality bar is "Could this pass as a Framer template?"

## Design Philosophy
**Be a curator, not a prescriber.** The design elements database (`data/design-elements-database.json`) is our portfolio — a rich collection of fonts, colors, layouts, animations, section designs, and interactions extracted from 45+ award-winning sites. For each business, the site-builder browses this portfolio and curates a unique combination that makes that specific business shine.

- No design element is exclusive to any industry. A plumber can have a cinematic dark hero. A dentist can have 3D scroll animations.
- No two sites should look the same. Every site should feel bespoke, not templated.
- Choose fonts, colors, and patterns by *vibe* (warm, bold, minimal, premium, playful), not by business category.
- The user's personal notes on what caught their eye in inspiration sites are the highest-signal input.

## Tech Stack
- **Runtime:** Node.js with TypeScript
- **Framework:** Next.js 14+ (App Router, static export)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Typography:** Pretext (Knuth-Plass justification, multi-column layouts)
- **Images:** Sharp for optimization, next/image for delivery
- **Fonts:** next/font with Google Fonts (zero layout shift)
- **Icons:** lucide-react
- **Email:** Resend (form submissions + outreach)
- **Analytics:** @vercel/analytics
- **OG Images:** @vercel/og
- **Package Manager:** npm
- **Deployment:** Vercel

## Code Conventions
- Always use TypeScript with strict mode
- Use `async/await`, never raw `.then()` chains
- Use Tailwind utility classes, not custom CSS (except design system recipes in globals.css)
- Use Next.js App Router conventions (`page.tsx`, `layout.tsx`, `loading.tsx`)
- Components go in `packages/components/` and are shared across all sites
- Each generated site is a standalone Next.js project in `sites/<business-slug>/`

## Design System — The Database

The design system is `data/design-elements-database.json`. It contains 177+ design elements from 55+ analyzed sites across these categories:

### Typography
- Every site MUST load at least 2 custom fonts via `next/font` (display + body)
- Choose the font pairing from the database by vibe, not industry. 27 pairings available including:
  - Figtree + Inter (friendly, approachable), Satoshi + Inter (calm, geometric), Playfair Display + Inter (elegant serif), Geist + Inter (modern, clean), Cormorant Garamond + Inter (luxury editorial), General Sans + Inter (clean premium), Clash Display + Inter (bold geometric), Script + Serif + Inter (therapeutic/personal), Inter Display + Inter (ultra-clean typography-focused), and 18 more
- Inter is the universal body font (used on 13/15 Framer templates analyzed)
- Use Pretext for justified paragraphs on about/description sections where appropriate
- Monospace font (Fragment Mono, Red Hat Mono, JetBrains Mono) for metadata: hours, addresses, phone numbers

### Colors
- Extract brand colors from the business's existing logo/site/social media
- Refine using palette strategies from the database (28 palettes available)
- Follow the 70/20/10 rule: 70% neutrals, 20% primary, 10% accent
- Ensure WCAG AA contrast ratios (4.5:1 minimum for body text)
- Commit to 2-3 colors boldly — don't be timid
- Dark mode sites can work for ANY business — choose by vibe

### Visual Techniques (baseline for every site)
1. Custom `::selection` colors matching brand palette
2. Scroll-triggered fade-in reveals via Framer Motion on all sections below the fold
3. Generous whitespace — when in doubt, add more space
4. Mobile-first responsive design
5. Staggered children animations for card grids and lists

### Visual Techniques (available for any site — choose by vibe)
- Film grain noise overlay (warmth, analog feel)
- Picture-frame border inset (editorial, gallery feel)
- Mix-blend-mode hover effects on cards/images
- Photo galleries with CSS Grid auto-fill
- Per-section color theming
- Animated number counters for stats
- Pretext multi-column layouts
- 3D perspective transforms
- Scroll-pinned section cascades
- Horizontal auto-scrolling carousels (testimonials, logos, gallery)
- Gradient color transitions between sections
- Zoom-out product reveals on scroll
- Video background heroes (timelapse, cinematic, looping)
- Blurred-to-clear image reveal on scroll
- Product element following scroll position
- Self-writing text (ambient, not scroll-driven)
- Images sliding in from opposite directions
- Scroll-driven story reveal with parallax images
- Scattered words assembling into sentences
- Cards zooming in from below viewport

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
- Copy should be Framer-style: punchy, short, benefit-driven. Big text, few words.

## Section Selection (flexible, not a checklist)

| Section | When to Include |
|---------|----------------|
| Hero | Always — but the *type* varies wildly per business (19+ variants in database) |
| Services/Menu | Always |
| About/Story | Always |
| Testimonials/Reviews | When 3+ good reviews exist |
| Photo Gallery | When 5+ quality photos |
| Stats/Counters | When quantifiable achievements exist |
| Team Bios | When owner/team info available |
| Process/How It Works | Service businesses (3-4 steps builds confidence) |
| FAQ | When common questions found in reviews |
| Comparison (With Us vs Without) | When differentiators are clear |
| Pricing | When the business has clear pricing tiers |
| Menu | Restaurants, cafes, bars (big typography menu display) |
| Founder/Chef Quote | When owner info + quote available |
| Before/After | Contractors, salons, renovators |
| Contact + Map | Always |
| Footer | Always |

## Quality Standards
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- All images must load (no broken images)
- Mobile layout must work at 375px viewport
- All links must be functional
- Contact info must match scraped data exactly
- `next build` must complete without errors
- **The Framer test:** Would this site look at home on framer.com/templates? If not, it's not done.

## File Naming
- Business slugs: lowercase, hyphenated (e.g., `joes-plumbing`)
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `generatePalette.ts`)
- Data files: `business.json` per business in `data/businesses/<slug>/`

## Key Files
- `data/design-elements-database.json` — The design portfolio (fonts, colors, heroes, sections, animations, etc.)
- `packages/components/` — Shared React components
- `sites/<slug>/` — Generated sites (one Next.js project per business)
- `.Codex/agents/` — Subagent specifications
- `.Codex/commands/` — Slash command definitions
- `.Codex/skills/design-system/SKILL.md` — Implementation recipes and code snippets

## Commands
- Build a site: `cd sites/<slug> && npm run build`
- Dev server: `cd sites/<slug> && npm run dev`
- Deploy: `cd sites/<slug> && vercel --prod`
- Run tests: `npx playwright test`
- Lint: `npx eslint .`
- Format: `npx prettier --write .`
