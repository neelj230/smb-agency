Generate a complete Next.js website for a business from its scraped data.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Prerequisites:
- Business data must exist at `data/businesses/$ARGUMENTS/business.json`
- Photos must be downloaded to `data/businesses/$ARGUMENTS/photos/`

## Steps:
1. Load business data from `data/businesses/$ARGUMENTS/business.json`
2. Determine design tier from category:
   - Tier 1 (Essential): plumber, electrician, cleaner, landscaper, contractor, handyman, painter, roofer, HVAC, pest control
   - Tier 2 (Visual): restaurant, bakery, cafe, salon, barbershop, gym, retail, florist, photographer
   - Tier 3 (Professional): law firm, dentist, doctor, therapist, consultant, accountant, financial advisor, insurance
   - Tier 4 (Premium): architecture, real estate, creative agency, interior design, wedding planner
3. Copy the appropriate template from `packages/templates/tier-X/` to `sites/$ARGUMENTS/`
4. Generate color palette from business brand colors (ensure WCAG contrast)
5. Select font pairing based on industry category
6. Use the content-writer agent to generate ALL copy:
   - Hero section: business name + tagline (derived from review sentiment)
   - Services/menu page with accurate descriptions
   - About page with owner story + brand narrative
   - Testimonials from real reviews (5-8 best ones, attributed)
   - Contact section with accurate address, phone, hours, Google Map embed
7. Copy and optimize photos into the site's public/ directory
8. Apply design system recipes:
   - Film grain overlay on hero
   - Custom ::selection colors matching brand
   - Framer Motion scroll reveals on all sections
   - Pretext justified paragraphs on about/description sections
   - CSS Grid auto-fill photo gallery
   - Monospace labels for metadata (hours, address, phone)
9. Run `npm install` and `npm run build` — fix any errors
10. Verify the build succeeds
11. Update spreadsheet status to "built"
12. Report: what was generated, which tier, any issues

## Quality checklist (verify before marking complete):
- [ ] All images load correctly
- [ ] Mobile layout works at 375px
- [ ] Fonts load (check next/font config)
- [ ] No placeholder text — everything is real business data
- [ ] Contact info matches scraped data exactly
- [ ] Build completes without errors
