import 'dotenv/config'
import { generate } from '../packages/generator'

const args = process.argv.slice(2)

// Support: npx tsx scripts/generate.ts boss-plumbing-heating
// Support: npx tsx scripts/generate.ts --slug boss-plumbing-heating
let slug = args[0]
if (slug === '--slug' || slug === '-s') {
  slug = args[1]
}

if (!slug) {
  console.error('Usage: npx tsx scripts/generate.ts <business-slug>')
  console.error('       npm run generate -- <business-slug>')
  console.error('\nAvailable businesses:')

  const { readdirSync, existsSync } = require('fs')
  const { join } = require('path')
  const bizDir = join(process.cwd(), 'data', 'businesses')
  if (existsSync(bizDir)) {
    const slugs = readdirSync(bizDir).filter((f: string) => !f.startsWith('.'))
    for (const s of slugs.slice(0, 10)) console.error(`  ${s}`)
    if (slugs.length > 10) console.error(`  ... and ${slugs.length - 10} more`)
  }
  process.exit(1)
}

generate(slug)
  .then(() => {
    console.log('\nDone!')
  })
  .catch((err) => {
    console.error('\nGeneration failed:', err.message)
    if (process.env.DEBUG) console.error(err.stack)
    process.exit(1)
  })
