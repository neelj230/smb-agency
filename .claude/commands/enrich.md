Enrich a scraped business's data with AI-generated content so it's ready for site generation.

Arguments: $ARGUMENTS (business slug, e.g. "barbershop-denim")

## Prerequisites

- Business data must exist at `data/businesses/$ARGUMENTS/business.json`
- Photos must exist at `data/businesses/$ARGUMENTS/photos/`

## Step 1: View and Analyze All Photos

This is the MOST IMPORTANT step. Read every JPG in `data/businesses/$ARGUMENTS/photos/` using the Read tool (you are multimodal and can see images). For each photo:

1. **Describe what you see** — the scene, colors, people, products, signage, vibe
2. **Categorize it properly** — one of: exterior, interior, team, work, food, product. The scraper defaults most to "work" which is usually wrong.
3. **Write a descriptive alt text** — e.g. "Barber chair with exposed brick wall and warm Edison lighting" not "Barbershop Denim photo 3"
4. **Rename the file** to something descriptive — rename `photo-3.jpg` and `photo-3.webp` to e.g. `barber-chair-interior.jpg` / `.webp`. Use the Bash tool to `mv` both the .jpg and .webp files.
5. **Extract visual signals** — dominant colors (for brand palette), overall aesthetic (dark/light, warm/cool, rustic/modern), quality level

After viewing all photos, synthesize:

- **Dominant color palette** from signage, interior, branding visible in photos → use this for brandColors
- **Overall visual vibe** (warm rustic? sleek modern? cozy neighborhood? bold urban?) → use this to guide all copy decisions
- **Best hero photo** — which photo would make the strongest hero section?
- **Photo quality assessment** — update analysis.photo_quality

## Step 2: Analyze Reviews

Read the reviews in business.json. Identify:

- What do customers consistently praise?
- What specific words/phrases recur?
- Any owner/staff names mentioned?
- What's the overall tone of the customer base?

## Step 3: Generate Missing Content

Fill in ALL empty fields:

1. **tagline** — 5-10 words, derived from what customers love + the visual vibe you saw in photos
2. **brandNarrative** — 2-3 sentences about what makes this business special. Reference real details from photos (e.g. "the exposed brick and vintage chairs") and reviews.
3. **ownerStory** — 2-3 sentences. If owner name is in reviews or business name, use it. Write something that feels real and specific, not generic.
4. **services** — 4-6 services with name, description (1-2 sentences), and lucide icon name. Infer from category + review mentions + what you see in photos.
5. **faq** — 4-5 FAQ items derived from review themes and business category. Answers must be specific to THIS business.
6. **brandColors** — primary and accent as hex codes, extracted from what you saw in the photos (signage colors, interior palette, logo). The `note` field should explain what visual element you pulled the colors from.
7. **stats** — At least 3-4. Always include rating + review count. Add years in business if inferrable.
8. **analysis.top_3_strengths** — from reviews
9. **analysis.common_complaints** — from reviews (empty array if all positive)
10. **analysis.suggested_tagline** — your best option

## Step 4: Update Photo Metadata in business.json

Update the `photos` array with:

- New `src` paths (matching renamed files)
- New descriptive `alt` text
- Correct `category` values

## Step 5: Write Back

Save the enriched data to `data/businesses/$ARGUMENTS/business.json`. Do NOT overwrite existing non-empty fields — only fill in blanks and update photo metadata.

## Step 6: Update Spreadsheet

Update the status column in `data/spreadsheet.csv` to "enriched" for this business.

## Copy Style Rules

- Framer style: punchy, short, benefit-driven. Big text, few words.
- Every word plausibly derived from real business data
- Services must be realistic for the category
- FAQ answers specific, not boilerplate

## Lucide Icon Reference

- Auto: wrench, car, gauge, shield-check, clock, fuel
- Barber/Salon: scissors, spray-can, sparkles, crown, star
- Plumbing: droplets, flame, bath, thermometer, wrench
- Cleaning: sparkles, spray-can, home, building, shirt
- Landscaping: trees, flower-2, sun, shovel, leaf
- Food/Bakery: cake, cookie, coffee, utensils, chef-hat
- Tattoo: pen-tool, palette, heart, star, zap
- Nails: sparkles, gem, heart, star, palette
- Flowers: flower-2, gift, heart, truck, calendar
- Tailor: scissors, ruler, shirt, tape-measure, needle
- General: phone, clock, shield-check, award, map-pin, users, thumbs-up

## When Done

Report: tagline, brand colors (and what photo you pulled them from), photo categorization summary, number of services generated, and the visual vibe you identified.
