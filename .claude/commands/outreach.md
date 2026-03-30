Generate a personalized outreach email for a business with a deployed preview site.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Steps:
1. Load business data from `data/businesses/$ARGUMENTS/business.json`
2. Get the preview URL from the spreadsheet
3. Generate a personalized cold email:
   - Subject line: short, specific to their business (not generic)
   - Opening: reference something specific about their business (from reviews or unique strength)
   - Body: "We built a preview of what your new website could look like" + link
   - If they have an existing bad site: include a tactful before/after comparison
   - Closing: simple CTA (reply or schedule a call)
   - Tone: professional, not salesy, not spammy
4. Also generate a call script with personalized talking points
5. Save email draft to `data/businesses/$ARGUMENTS/outreach-email.md`
6. Save call script to `data/businesses/$ARGUMENTS/call-script.md`
7. Update spreadsheet outreach_status to "draft_ready"
8. Report: show the email draft for review before sending

## Email rules:
- Keep it under 150 words
- No "Dear Sir/Madam" — use the owner's name if known, or business name
- Reference a specific positive review or strength
- Include the preview URL prominently
- One clear CTA, not multiple
