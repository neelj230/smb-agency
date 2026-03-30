Run quality assurance on a generated/deployed site.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Steps:
1. Start the dev server: `cd sites/$ARGUMENTS && npm run dev` (background)
2. Run Playwright tests:
   - Screenshot at 1440px (desktop) and 375px (mobile)
   - Check all images load (no 404s)
   - Check all links are functional
   - Verify text content is not placeholder
3. Run Lighthouse:
   - Performance target: > 90
   - Accessibility target: > 95
   - Best Practices target: > 90
   - SEO target: > 90
4. Content verification:
   - Compare displayed contact info against `data/businesses/$ARGUMENTS/business.json`
   - Verify business name, address, phone, hours match exactly
   - Check that testimonials have proper attribution
5. Design verification:
   - Confirm custom fonts are loading (not falling back to system fonts)
   - Confirm film grain overlay is present on hero
   - Confirm scroll animations are working
   - Confirm ::selection colors are set
6. If issues found:
   - Fix them automatically
   - Re-run the checks
   - Repeat until all pass
7. Update spreadsheet status to "qa_passed" or "needs_review"
8. Save screenshots to `data/businesses/$ARGUMENTS/screenshots/`
9. Report: pass/fail, Lighthouse scores, any issues found and fixed
