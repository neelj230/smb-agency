Build sites for all businesses that have scraped data but no generated site yet.

Arguments: $ARGUMENTS (optional: max number of sites to build, defaults to all)

## Process

### 1. Scan for businesses ready to build

Read `data/spreadsheet.csv` and cross-reference with `data/businesses/` and `sites/`. Categorize each business:

- **needs_enrichment**: has `data/businesses/<slug>/business.json` but tagline is empty
- **ready_to_build**: has enriched business.json (tagline is non-empty) but no `sites/<slug>/` directory
- **already_built**: has `sites/<slug>/` directory
- **needs_scrape**: in spreadsheet but no `data/businesses/<slug>/` directory

### 2. Process businesses sequentially

For each business (up to the max from $ARGUMENTS), run the full pipeline. The order is:
1. Tier A businesses first (no existing website — highest value prospects)
2. Tier B businesses second (bad existing website)
3. Within each tier, sort by review count descending (more reviews = more data to work with = better site)

For each business:

#### a. Enrich (if needed)
If tagline is empty, run the enrichment process:
- Read `data/businesses/<slug>/business.json`
- View ALL photos in `data/businesses/<slug>/photos/` with the Read tool (you can see images)
- Analyze reviews for sentiment, recurring themes, staff names
- Extract brand colors from photo analysis (signage, interior, logo)
- Categorize photos properly and write descriptive alt text
- Rename photos to descriptive filenames
- Generate: tagline, brandNarrative, ownerStory, services, FAQ, brandColors, stats
- Write enriched data back to business.json

#### b. Generate Site
- Read the enriched `business.json` and view all photos again
- Browse `data/design-elements-database.json` for this business's vibe
- Select: font pairing, color palette, hero style, sections, animations
- Create `sites/<slug>/` as a standalone Next.js project (use marcos-plumbing as structural reference)
- Copy photos from `data/businesses/<slug>/photos/` to `sites/<slug>/public/photos/`
- Build all pages and components
- Run `cd sites/<slug> && npm install && npm run build` — fix any errors until it succeeds

#### c. Deploy
- Run `cd sites/<slug> && npx vercel --yes --prod` to deploy
- Record the deployment URL

#### d. Update Tracking
- Update spreadsheet: status="deployed", preview_url=<vercel url>
- Log to `data/batch-log.txt`: timestamp, slug, status, URL or error

#### e. Generate Outreach Email
- Write a personalized cold email referencing the live preview
- Save to `data/businesses/<slug>/outreach-email.md`

### 3. Commit progress after every 5 sites
Run `git add -A && git commit -m "Add sites: <list of slugs>"` every 5 completed sites so progress is saved.

### 4. Final Report
After all sites are processed, output:
- Total attempted
- Successfully built + deployed
- Failed (with reasons)
- List of all live preview URLs

## Key References
- Use `sites/marcos-plumbing/` as the structural template for new sites (same package.json, tsconfig, next.config, postcss.config structure)
- Use `data/design-elements-database.json` for design decisions
- Use `packages/components/` for shared components (import via `@/components/`)
- Use `packages/integrations/` for shared integrations (import via `@/integrations/`)

## Quality Bar
Every site must:
- Pass `next build` with zero errors
- Have custom fonts loaded via `next/font`
- Have brand colors applied as CSS custom properties
- Have scroll-triggered animations on sections below the fold
- Have all business photos incorporated
- Have real content derived from business data (no placeholders)
- Look like it belongs on framer.com/templates

## Important
- Work SEQUENTIALLY, not in parallel — this avoids file conflicts and rate limits
- If a site fails to build after 3 attempts, log the error and move on to the next business
- Every site should look DIFFERENT — vary font pairings, color palettes, hero styles, and section layouts
