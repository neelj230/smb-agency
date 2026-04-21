Deploy a generated site to a Vercel preview URL.

Arguments: $ARGUMENTS (business slug, e.g. "joes-plumbing")

## Steps:

1. Verify `sites/$ARGUMENTS/` exists and has been built (`npm run build` succeeds)
2. Deploy to Vercel: `cd sites/$ARGUMENTS && vercel --prod`
3. Record the deployment URL
4. Update the spreadsheet: set preview_url and status="deployed"
5. Report the live URL
