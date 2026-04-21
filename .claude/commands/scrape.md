Deep-scrape all available information about a specific business prospect.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Steps:

1. Look up the business in `data/spreadsheet.csv` by slug
2. Create directory `data/businesses/$ARGUMENTS/` if it doesn't exist
3. Scrape from ALL available sources:
   - Google Places API: name, address, phone, hours, website, rating, reviews, photos
   - Google Reviews: all review text + ratings
   - Yelp: reviews, photos, categories
   - Existing website (if any): scrape all text content, find logo, extract colors
   - Facebook page (search for business): about info, posts, photos
   - Instagram (if findable): recent posts, follower count
   - LinkedIn (for owner/team info)
4. Download all photos to `data/businesses/$ARGUMENTS/photos/` organized by type:
   - exterior/, interior/, team/, products/, food/, misc/
5. Run AI analysis on collected data:
   - Summarize reviews → top_3_strengths, common_complaints, suggested_tagline
   - Extract brand colors from logo/site → primary_color, secondary_color
   - Generate brand_narrative from reviews + social context
   - Score photo quality and categorize
   - Identify unique selling points vs. competitors
6. Save structured data to `data/businesses/$ARGUMENTS/business.json`
7. Update status in spreadsheet to "scraped"
8. Report: what was found, photo count by category, key insights
