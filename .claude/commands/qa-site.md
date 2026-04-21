Run quality assurance on a generated/deployed site.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Steps

### 1. Start Dev Server

`cd sites/$ARGUMENTS && npm run dev` (background)

### 2. The Framer Template Test

Before running automated checks, look at the site holistically:

- Does it look bespoke, or could it be any business?
- Is the design modern and polished?
- Are animations smooth and purposeful?
- Is the typography hierarchy intentional?
- Is the color usage bold and consistent (70/20/10)?

If it doesn't pass this test, flag design issues immediately.

### 3. Visual QA (Playwright)

- Screenshot at 1440px (desktop) and 375px (mobile)
- Check all images load (no 404s)
- Check all links are functional
- Verify no placeholder text exists
- Check touch targets on mobile (44px minimum)

### 4. Lighthouse Audit

- Performance target: > 90
- Accessibility target: > 95
- Best Practices target: > 90
- SEO target: > 90

### 5. Content Verification

Compare against `data/businesses/$ARGUMENTS/business.json`:

- Business name — exact match
- Address — exact match
- Phone number — exact match
- Hours — exact match
- Testimonials — properly attributed to real reviews
- Services — accurate to what business offers

### 6. Design Verification

Cross-reference with the design elements database:

- Custom fonts loading via `next/font` (not falling back to system fonts)
- `::selection` colors set to brand palette
- Scroll animations present on sections below the fold
- Color palette follows 70/20/10 rule
- Whitespace is generous and intentional
- Mobile layout is purposeful, not just "scaled down desktop"

### 7. Integration Verification

- Contact form submits correctly
- Click-to-call link works on mobile
- Google Maps embed loads
- Social links point to correct profiles
- Schema.org JSON-LD is valid

### 8. Fix Issues

- Fix issues automatically
- Re-run checks after fixing
- Repeat until all pass

### 9. Report and Update

- Update spreadsheet status to "qa_passed" or "needs_review"
- Save screenshots to `data/businesses/$ARGUMENTS/screenshots/`
- Report:
  - Framer Template Test: PASS / NEEDS WORK
  - Design Quality: X/10
  - Lighthouse scores (all 4)
  - Issues found and fixed
  - Issues needing manual attention
