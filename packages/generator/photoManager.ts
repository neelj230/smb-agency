import { existsSync, mkdirSync, copyFileSync, readdirSync } from "fs";
import { join, extname } from "path";
import type { BusinessData } from "../components/types";
import type { PhotoManifest } from "./types";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function copyPhotos(slug: string, siteDir: string): PhotoManifest {
  const sourceDir = join(process.cwd(), "data", "businesses", slug, "photos");
  const destDir = join(siteDir, "public", "photos");

  mkdirSync(destDir, { recursive: true });

  if (!existsSync(sourceDir)) {
    console.log(`  No photos directory found at ${sourceDir}`);
    return { galleryImages: [], allPhotos: [] };
  }

  const files = readdirSync(sourceDir).filter((f) => {
    const ext = extname(f).toLowerCase();
    return IMAGE_EXTENSIONS.has(ext);
  });

  // Prefer .webp over .jpg when both exist for the same base name
  const baseNames = new Map<string, string>();
  for (const file of files) {
    const base = file.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");
    const ext = extname(file).toLowerCase();
    const existing = baseNames.get(base);
    if (!existing || ext === ".webp") {
      baseNames.set(base, file);
    }
  }

  const uniqueFiles = [...baseNames.values()];

  for (const file of uniqueFiles) {
    copyFileSync(join(sourceDir, file), join(destDir, file));
  }

  console.log(`  Copied ${uniqueFiles.length} photos to ${destDir}`);

  // Build manifest from business.json photo metadata
  return { galleryImages: [], allPhotos: [] }; // Will be populated by buildManifest
}

export function buildPhotoManifest(business: BusinessData): PhotoManifest {
  const photos = business.photos || [];

  // Prefer webp versions
  const mapped = photos.map((p) => ({
    src: p.src.replace(/\.jpg$/i, ".webp"),
    alt: p.alt,
    category: p.category,
  }));

  // Pick hero image: team > exterior > work > any
  const priorityOrder = [
    "team",
    "exterior",
    "work",
    "interior",
    "product",
    "food",
  ];
  let heroImage: PhotoManifest["heroImage"];
  for (const cat of priorityOrder) {
    const match = mapped.find((p) => p.category === cat);
    if (match) {
      heroImage = match;
      break;
    }
  }
  if (!heroImage && mapped.length > 0) heroImage = mapped[0];

  // Pick about image: different from hero, prefer team or exterior
  let aboutImage: PhotoManifest["aboutImage"];
  const aboutCandidates = mapped.filter((p) => p.src !== heroImage?.src);
  for (const cat of ["team", "exterior", "interior"]) {
    const match = aboutCandidates.find((p) => p.category === cat);
    if (match) {
      aboutImage = match;
      break;
    }
  }
  if (!aboutImage && aboutCandidates.length > 0)
    aboutImage = aboutCandidates[0];

  // Gallery images: work, interior, food, product — exclude hero and about
  const usedSrcs = new Set([heroImage?.src, aboutImage?.src].filter(Boolean));
  const galleryImages = mapped.filter(
    (p) =>
      !usedSrcs.has(p.src) &&
      ["work", "interior", "food", "product"].includes(p.category),
  );

  return { heroImage, aboutImage, galleryImages, allPhotos: mapped };
}
