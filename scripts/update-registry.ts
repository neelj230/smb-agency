/**
 * Update Section Registry
 *
 * Incrementally re-extracts sections from changed reference sites
 * and re-enriches them. Preserves entries from unchanged sources.
 *
 * Usage: npx tsx scripts/update-registry.ts [--force] [--source _reference-agevia]
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  statSync,
  readdirSync,
} from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = join(__dirname, "..");
const SITES_DIR = join(ROOT, "sites");
const REGISTRY_PATH = join(ROOT, "data", "section-registry.json");
const DRAFT_PATH = join(ROOT, "data", "section-registry-draft.json");

function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const sourceFilter = args.includes("--source")
    ? args[args.indexOf("--source") + 1]
    : null;

  // Load existing registry
  let existingRegistry: any = { version: "1.0", lastUpdated: "", entries: [] };
  const registryExists = existsSync(REGISTRY_PATH);
  if (registryExists) {
    existingRegistry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));
  } else if (existsSync(DRAFT_PATH)) {
    existingRegistry = JSON.parse(readFileSync(DRAFT_PATH, "utf-8"));
  }

  const registryMtime = registryExists ? statSync(REGISTRY_PATH).mtimeMs : 0;

  // Find reference sites that have changed
  let refDirs = readdirSync(SITES_DIR)
    .filter((d) => d.startsWith("_reference-"))
    .filter((d) => existsSync(join(SITES_DIR, d, "app", "page.tsx")));

  if (sourceFilter) {
    refDirs = refDirs.filter(
      (d) => d === sourceFilter || d === `_reference-${sourceFilter}`,
    );
  }

  const changedSources: string[] = [];
  const unchangedSources: string[] = [];

  for (const dir of refDirs) {
    const pagePath = join(SITES_DIR, dir, "app", "page.tsx");
    const pageMtime = statSync(pagePath).mtimeMs;

    if (force || pageMtime > registryMtime) {
      changedSources.push(dir);
    } else {
      unchangedSources.push(dir);
    }
  }

  if (changedSources.length === 0) {
    console.log("✓ Registry is up to date — no reference sites have changed.");
    return;
  }

  console.log(
    `Found ${changedSources.length} changed source(s): ${changedSources.join(", ")}`,
  );
  console.log(`Keeping ${unchangedSources.length} unchanged source(s)`);

  // Keep entries from unchanged sources
  const preservedEntries = existingRegistry.entries.filter((e: any) =>
    unchangedSources.includes(e.source),
  );
  console.log(
    `Preserving ${preservedEntries.length} entries from unchanged sources`,
  );

  // Re-extract changed sources
  const sourceArgs = changedSources.map((s) => `--source ${s}`).join(" ");
  // We run extract for each changed source
  for (const source of changedSources) {
    console.log(`\nRe-extracting: ${source}`);
    execSync(`npx tsx scripts/extract-sections.ts --source ${source}`, {
      cwd: ROOT,
      stdio: "inherit",
    });
  }

  // Load the draft (which now has only the changed source's entries)
  const draft = JSON.parse(readFileSync(DRAFT_PATH, "utf-8"));
  const newEntries = draft.entries;

  // Merge: preserved + new
  const allEntries = [...preservedEntries, ...newEntries];

  // Sort
  allEntries.sort((a: any, b: any) => {
    if (a.source !== b.source) return a.source.localeCompare(b.source);
    return a.sectionType.localeCompare(b.sectionType);
  });

  // Write merged registry
  const registry = {
    version: "1.0",
    lastUpdated: new Date().toISOString(),
    entries: allEntries,
  };

  writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), "utf-8");
  console.log(`\n✓ Registry updated: ${allEntries.length} total entries`);
  console.log(
    `  ${newEntries.length} re-extracted, ${preservedEntries.length} preserved`,
  );

  // If enrichment script exists and there are unenriched entries, suggest running it
  const unenriched = allEntries.filter(
    (e: any) => !e.vibes || e.vibes.length === 0,
  );
  if (unenriched.length > 0) {
    console.log(`\n⚠ ${unenriched.length} entries need enrichment. Run:`);
    console.log(`  npx tsx scripts/enrich-registry.ts`);
  }
}

main();
