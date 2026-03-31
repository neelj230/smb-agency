Run the complete end-to-end pipeline for a single business.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Steps (sequential):
1. **Check status** — Read `data/businesses/$ARGUMENTS/business.json`. If it doesn't exist, run step 2. If it exists but tagline is empty, skip to step 3. If tagline is filled, skip to step 4. If `sites/$ARGUMENTS/` exists with a successful build, skip to step 5.
2. `/scrape $ARGUMENTS` — Deep scrape all business data + photos
3. `/enrich $ARGUMENTS` — View all photos, analyze reviews, generate tagline/narrative/services/FAQ/colors. This is the step that makes sites feel bespoke.
4. `/generate-site $ARGUMENTS` — Build the Next.js site using enriched data + photos
5. `/deploy-preview $ARGUMENTS` — Deploy to Vercel
6. `/qa-site $ARGUMENTS` — Run full QA suite, fix any issues
7. `/outreach $ARGUMENTS` — Generate personalized outreach email

## Error handling:
- If any step fails, log the error to `data/businesses/$ARGUMENTS/pipeline-error.log` and continue to the next business (when called from batch mode)
- The status check in step 1 allows resuming a partially-completed pipeline

## After completion:
- The business has a live preview site
- QA has passed
- An outreach email draft is ready
- Spreadsheet is fully updated

This is the "one command, walk away" workflow.
