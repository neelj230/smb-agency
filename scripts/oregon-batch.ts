import { readFileSync } from 'fs'
import { join } from 'path'
import { execFileSync } from 'child_process'
import { generate } from '../packages/generator'

const args = process.argv.slice(2)
const limit = Number(args[0] || 5)

const SOURCE_CSV_PATH = join(process.cwd(), 'data', 'oregon-batch-60-no-websites.csv')

if (!Number.isFinite(limit) || limit <= 0) {
  console.error('Usage: npx tsx scripts/oregon-batch.ts <count>')
  process.exit(1)
}

interface SeedRow {
  businessName: string
  category: string
  sourceCity: string
  slug: string
  address: string
  phone: string
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

function loadTopValidRows(count: number): SeedRow[] {
  const raw = readFileSync(SOURCE_CSV_PATH, 'utf-8')
  const lines = raw.trim().split('\n').slice(1)
  const rows = lines
    .map(parseCsvLine)
    .map((cols) => ({
      businessName: cols[0],
      category: cols[1],
      sourceCity: cols[2],
      slug: cols[3],
      address: cols[4],
      phone: cols[5] || '',
    }))
    .filter((row) => /, OR \d{5}/.test(row.address))
    .filter((row) => row.phone.trim().length > 0)

  return rows.slice(0, count)
}

function runScrape(slug: string) {
  execFileSync(
    'node',
    ['--env-file=.env', 'node_modules/tsx/dist/cli.mjs', 'scripts/scrape.ts', slug],
    {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: {
        ...process.env,
        SOURCE_CSV_PATH,
        UPDATE_SOURCE_STATUS: '0',
      },
    },
  )
}

async function main() {
  const selected = loadTopValidRows(limit)

  console.log(`Using ${selected.length} Oregon businesses from ${SOURCE_CSV_PATH}`)
  for (const row of selected) {
    console.log(`- ${row.slug} | ${row.businessName} | ${row.address}`)
  }

  for (const row of selected) {
    console.log(`\n=== ${row.slug}: scrape ===`)
    await runScrape(row.slug)
    console.log(`\n=== ${row.slug}: generate ===`)
    await generate(row.slug)
  }

  console.log('\nBatch complete.')
}

main().catch((error) => {
  console.error('\nBatch failed:', error instanceof Error ? error.message : error)
  process.exit(1)
})
