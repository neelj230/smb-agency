Find SMB prospects that need websites in a specific city and category.

Arguments: $ARGUMENTS (format: "<city> <category>" e.g. "Philadelphia plumber")

## Steps:

1. Parse the city and category from the arguments
2. Use the Google Places API (via the prospect.ts script) to search for businesses in that category + city
3. For each result:
   - If no website URL → mark as Tier A (highest priority)
   - If has website → use the site-scorer agent to rate it (0-100)
   - Score < 40 → Tier B prospect
   - Score >= 40 → skip
4. Deduplicate results by business name + address
5. Save results to `data/spreadsheet.csv` (append, don't overwrite)
6. Report: how many found, how many Tier A, how many Tier B, how many skipped

## Output columns:

business_name, category, address, phone, email, website_url, website_score, google_rating, review_count, photo_count, priority_tier, status, preview_url, outreach_status

Set status="new" and outreach_status="not_contacted" for all new entries.
