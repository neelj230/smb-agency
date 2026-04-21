/**
 * Batch Regeneration Script
 *
 * Regenerates all (or specified) sites with the latest pipeline.
 * Useful after improving enrichment, design selection, or content generation.
 *
 * Usage:
 *   npx tsx scripts/regenerate-batch.ts                    # All sites with business.json
 *   npx tsx scripts/regenerate-batch.ts slug1 slug2 slug3  # Specific sites
 *   npx tsx scripts/regenerate-batch.ts --skip-build       # Skip npm build check (faster)
 */

import "dotenv/config";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

// Dynamic import to avoid circular deps
async function main() {
  const { generate } = await import("../packages/generator/index");

  const args = process.argv.slice(2);
  const skipBuild = args.includes("--skip-build");
  const slugArgs = args.filter((a) => !a.startsWith("--"));

  // Find all available businesses
  const businessesDir = join(process.cwd(), "data", "businesses");
  const allSlugs = existsSync(businessesDir)
    ? readdirSync(businessesDir).filter((d) => {
        const bizJson = join(businessesDir, d, "business.json");
        return existsSync(bizJson);
      })
    : [];

  const slugs = slugArgs.length > 0 ? slugArgs : allSlugs;

  if (slugs.length === 0) {
    console.log("No businesses found to regenerate.");
    console.log(`Looked in: ${businessesDir}`);
    process.exit(0);
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`BATCH REGENERATION — ${slugs.length} sites`);
  console.log(`${"=".repeat(60)}`);
  if (skipBuild) console.log("(Build check skipped)");

  const results: {
    slug: string;
    status: "success" | "failed";
    error?: string;
    time: number;
  }[] = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    console.log(`\n[${i + 1}/${slugs.length}] ${slug}`);
    console.log("-".repeat(40));

    const start = Date.now();
    try {
      // Set env to skip build if requested
      if (skipBuild) {
        process.env.SKIP_BUILD_CHECK = "1";
      }

      await generate(slug);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      results.push({ slug, status: "success", time: parseFloat(elapsed) });
      console.log(`  Completed in ${elapsed}s`);
    } catch (err) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      const message = (err as Error).message;
      results.push({
        slug,
        status: "failed",
        error: message,
        time: parseFloat(elapsed),
      });
      console.error(`  FAILED: ${message}`);
    }
  }

  // Summary report
  console.log(`\n${"=".repeat(60)}`);
  console.log("BATCH RESULTS");
  console.log(`${"=".repeat(60)}`);

  const successes = results.filter((r) => r.status === "success");
  const failures = results.filter((r) => r.status === "failed");

  for (const r of results) {
    const icon = r.status === "success" ? "\u2713" : "\u2717";
    console.log(
      `  ${icon} ${r.slug} (${r.time}s)${r.error ? ` — ${r.error.substring(0, 80)}` : ""}`,
    );
  }

  console.log(`\n  ${successes.length}/${results.length} succeeded`);
  if (failures.length > 0) {
    console.log(`  ${failures.length} failed`);
  }

  const totalTime = results.reduce((sum, r) => sum + r.time, 0);
  console.log(`  Total time: ${totalTime.toFixed(1)}s`);

  if (failures.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Batch regeneration failed:", err);
  process.exit(1);
});
