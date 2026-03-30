Run the complete end-to-end pipeline for a single business.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Steps (sequential):
1. `/scrape $ARGUMENTS` — Deep scrape all business data + photos
2. `/generate-site $ARGUMENTS` — Build the Next.js site
3. `/deploy-preview $ARGUMENTS` — Deploy to Vercel
4. `/qa-site $ARGUMENTS` — Run full QA suite, fix any issues
5. `/outreach $ARGUMENTS` — Generate personalized outreach email

## After completion:
- The business has a live preview site
- QA has passed
- An outreach email draft is ready
- Spreadsheet is fully updated

This is the "one command, walk away" workflow.
