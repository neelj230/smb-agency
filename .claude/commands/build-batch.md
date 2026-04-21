Build multiple sites in parallel using worktree agents.

Arguments: $ARGUMENTS (number of sites to build, e.g. "10")

## Steps:

1. Read `data/spreadsheet.csv` for businesses with status="scraped" (ready to build)
2. Pick the top N (from arguments) by priority_tier (Tier A first, then Tier B)
3. For each business, spin up a worktree agent:
   - Use the site-builder agent with isolation: worktree
   - Each agent runs the full generation pipeline independently
   - Agents run in PARALLEL (not sequential)
4. Monitor all agents for completion
5. For each completed site:
   - Deploy to Vercel via the deploy script
   - Run QA checks
   - Update spreadsheet with results
6. Report summary:
   - How many built successfully
   - How many deployed
   - How many passed QA
   - Any failures and why

## Notes:

- Start with 5 parallel agents max to avoid rate limits
- Use auto mode (shift+tab) before running this command
- Each agent gets its own worktree so there are no file conflicts
