/** Utility functions for the site generator */

/** Deterministic hash from a string — used for reproducible tiebreaking */
export function slugHash(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/** Pick from an array using slug hash for deterministic variety */
export function pickByHash<T>(items: T[], slug: string, offset = 0): T {
  const idx = (slugHash(slug) + offset) % items.length
  return items[idx]
}

/** Escape a string for use inside JSX string attributes (single-quoted) */
export function escapeJsx(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
}

/** Escape a string for use inside a TypeScript template literal */
export function escapeTs(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
}

/** Escape a string for use in a single-quoted TS string */
export function escapeTsString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
}

/** Escape a string for use in a double-quoted JSX attribute */
export function escapeJsxAttr(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, ' ')
}

/** Convert hex color to HSL values */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 50 }

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

/** Distance between two colors in HSL space (weighted for perceptual difference) */
export function colorDistance(hex1: string, hex2: string): number {
  const a = hexToHsl(hex1)
  const b = hexToHsl(hex2)
  // Hue wraps around 360, so take shortest arc
  const hueDiff = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h))
  return Math.sqrt(
    (hueDiff / 180) ** 2 * 4 + // Hue weighted heavily
    ((a.s - b.s) / 100) ** 2 +
    ((a.l - b.l) / 100) ** 2
  )
}

/** Score how many vibes match between a profile's top 3 and an element's vibe tags */
export function vibeMatchScore(
  profileVibes: string[],
  elementVibes: string[]
): number {
  let score = 0
  for (const v of profileVibes) {
    if (elementVibes.includes(v)) score++
  }
  return score
}

/** Select the best matching item from a list by vibe score, with slug hash tiebreak */
export function selectByVibe<T extends { vibe: string[] }>(
  items: T[],
  profileVibes: string[],
  slug: string,
  offset = 0
): T {
  const scored = items
    .map((item, idx) => ({
      item,
      score: vibeMatchScore(profileVibes, item.vibe),
      idx,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      // Tiebreak with slug hash for variety
      return ((slugHash(slug) + offset + a.idx) % 100) - ((slugHash(slug) + offset + b.idx) % 100)
    })

  return scored[0].item
}

/** Convert a business category to a display-friendly label */
export function categoryLabel(category: string): string {
  return category
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Indent a multiline string by N spaces */
export function indent(str: string, spaces: number): string {
  const pad = ' '.repeat(spaces)
  return str
    .split('\n')
    .map(line => (line.trim() ? pad + line : line))
    .join('\n')
}
