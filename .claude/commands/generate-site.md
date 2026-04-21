Generate a complete Next.js website for a business from its scraped data.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Prerequisites

- Business data must exist at `data/businesses/$ARGUMENTS/business.json`
- Photos must be downloaded to `data/businesses/$ARGUMENTS/photos/`

## Steps

### 1. Load and Understand the Business

Read `data/businesses/$ARGUMENTS/business.json` deeply. Then **view every photo** in `data/businesses/$ARGUMENTS/photos/` using the Read tool (you are multimodal — you can see images). Understand the business's vibe, strengths, story, visual identity, and what customers say about them. The photos are your primary source for design decisions — color palette, hero image selection, and overall aesthetic.

### 2. Browse the Design Elements Database

Read `data/design-elements-database.json`. Find elements that feel right for this business:

- **Font pairing** — by vibe (friendly? elegant? bold? calm?), not by industry
- **Color palette** — start from brand colors, refine using database strategies
- **Hero style** — match to the business's strongest asset
- **Section designs** — select from 45+ patterns based on what content is available
- **Animations** — choose complexity based on what elevates the business
- **Navigation style** — from 5+ patterns in the database

### 3. Create the Site Directory

Create `sites/$ARGUMENTS/` as a new Next.js project with App Router.

### 4. Generate the Color Palette

Extract from business branding, refine with WCAG AA contrast. Apply 70/20/10 rule.

### 5. Generate All Copy

Use the content-writer agent. Feed it the business.json. Get back:

- Hero headline + subheadline + CTA
- Services content
- About section
- Curated testimonials
- Process steps (if applicable)
- SEO meta tags
- Any additional section copy

### 6. Build the Site

Assemble with selected design elements:

- Load fonts via `next/font`
- Apply CSS recipes from design system skill
- Implement selected animations via Framer Motion
- Optimize images with Sharp (WebP, quality 80, max 1920px)
- Build all selected sections
- Ensure mobile-first responsive design
- Add Phase 1 integrations: contact form, click-to-call, Google Maps embed, reviews display, social links, Schema.org JSON-LD, analytics

### 7. Polish

- `::selection` colors matching brand
- Scroll-triggered fade-in reveals on all sections below fold
- Generous whitespace throughout
- Consistent spacing and typography hierarchy

### 8. Build and Verify

- Run `npm install && npm run build`
- Fix any errors until build succeeds
- Verify mobile layout at 375px
- Verify all images load
- Confirm contact info matches business.json

### 9. Update Status

Update spreadsheet status to "built" with preview URL.

### 10. Report

Document what was generated:

- Font pairing chosen and why
- Color palette
- Hero style
- Sections included
- Animation approach
- Any design decisions worth noting

## Quality Bar

Before marking complete, ask: **"Could this pass as a Framer template?"** If the answer is anything less than "yes," keep iterating.
