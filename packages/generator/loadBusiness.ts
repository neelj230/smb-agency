import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { BusinessData } from "../components/types";

export function loadBusiness(slug: string): BusinessData {
  const businessPath = join(
    process.cwd(),
    "data",
    "businesses",
    slug,
    "business.json",
  );

  if (!existsSync(businessPath)) {
    throw new Error(
      `Business data not found at ${businessPath}\n` +
        `Run: npm run scrape -- ${slug}`,
    );
  }

  const raw = readFileSync(businessPath, "utf-8");
  const data = JSON.parse(raw) as BusinessData;

  // Validate required fields
  if (!data.name) throw new Error(`business.json missing "name" for ${slug}`);
  if (!data.phone) throw new Error(`business.json missing "phone" for ${slug}`);
  if (!data.address)
    throw new Error(`business.json missing "address" for ${slug}`);

  // Ensure slug is set
  if (!data.slug) data.slug = slug;

  return data;
}

export function loadDesignDatabase(path?: string) {
  const dbPath =
    path || join(process.cwd(), "data", "design-elements-database.json");
  const raw = readFileSync(dbPath, "utf-8");
  return JSON.parse(raw);
}
