import type { DesignBrief } from "../types";

/** CSS recipe implementations */
const CSS_RECIPES: Record<string, string> = {
  "film-grain": `
/* Film grain overlay for warm analog feel */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  mix-blend-mode: hard-light;
  opacity: 0.4;
  pointer-events: none;
}`,
  "picture-frame": `
/* Inset border for editorial/gallery feel */
body::before {
  content: '';
  position: fixed;
  inset: 12px;
  z-index: 999;
  border: 1px solid rgba(0, 0, 0, 0.08);
  pointer-events: none;
  border-radius: 2px;
}`,
  "mix-blend-hover": `
/* Mix-blend-mode hover effect for cards */
.card-hover {
  position: relative;
  overflow: hidden;
}
.card-hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--brand-primary);
  mix-blend-mode: difference;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.card-hover:hover::after {
  opacity: 1;
}`,
  "dot-pattern": `
/* Subtle dot pattern background */
.dot-pattern {
  background-image: radial-gradient(circle, var(--brand-muted) 0.5px, transparent 0.5px);
  background-size: 24px 24px;
}`,
  "gradient-sections": `
/* Gradient transitions between sections */
.section-gradient {
  position: relative;
}
.section-gradient::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, var(--brand-bg));
  pointer-events: none;
}`,
  "glass-effect": `
/* Frosted glass morphism */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}`,
  "testimonial-marquee": `
/* Auto-scrolling testimonial marquee */
@keyframes testimonial-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.testimonial-marquee {
  animation: testimonial-scroll 40s linear infinite;
}
.testimonial-marquee:hover {
  animation-play-state: paused;
}`,
};

export function generateGlobalsCss(
  brief: DesignBrief,
  extras?: string,
  templateCssVars?: Record<string, string>,
): string {
  const recipes = brief.cssRecipes
    .map((name) => CSS_RECIPES[name])
    .filter(Boolean)
    .join("\n");

  // Generate accent section background
  const accentBg = adjustBgAlt(brief.palette.bgLight, brief.palette.primary);

  // Use template CSS vars if provided (preserves dark/light theme from reference)
  const vars = {
    "--brand-primary": brief.palette.primary,
    "--brand-accent": brief.palette.accent,
    "--brand-bg": brief.palette.bgLight,
    "--brand-bg-alt": accentBg,
    "--brand-text": brief.palette.textDark,
    "--brand-muted": brief.palette.textMuted,
    ...templateCssVars,
  };

  return `@import "tailwindcss";

/* Scan shared packages for Tailwind classes */
@source "../../../packages/components/**/*.{ts,tsx}";
@source "../../../packages/integrations/**/*.{ts,tsx}";
@source "./**/*.{ts,tsx}";

:root {
  --brand-primary: ${vars["--brand-primary"]};
  --brand-accent: ${vars["--brand-accent"]};
  --brand-bg: ${vars["--brand-bg"]};
  --brand-bg-alt: ${vars["--brand-bg-alt"]};
  --brand-text: ${vars["--brand-text"]};
  --brand-muted: ${vars["--brand-muted"]};
}

::selection {
  background-color: var(--brand-primary);
  color: var(--brand-bg);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--brand-bg);
  color: var(--brand-text);
}

/* Marquee animation for carousels */
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* Smooth section transitions */
section, [id] > div {
  scroll-margin-top: 80px;
}

/* Focus-visible outlines for accessibility */
:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
${recipes}
${extras ? "\n/* Creative director extras */\n" + extras : ""}
`;
}

/** Darken + tint the bg for alternating sections (visible contrast) */
function adjustBgAlt(bgLight: string, primary?: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(bgLight);
  if (!result) return "#f0f0f0";

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  // Shift down by 14 for visible but subtle contrast (was 8 — invisible)
  r = Math.max(0, r - 14);
  g = Math.max(0, g - 14);
  b = Math.max(0, b - 14);

  // Tint slightly toward primary color for intentionality
  if (primary) {
    const pResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(primary);
    if (pResult) {
      const pr = parseInt(pResult[1], 16);
      const pg = parseInt(pResult[2], 16);
      const pb = parseInt(pResult[3], 16);
      // Mix 5% of primary into the bg-alt
      r = Math.round(r * 0.95 + pr * 0.05);
      g = Math.round(g * 0.95 + pg * 0.05);
      b = Math.round(b * 0.95 + pb * 0.05);
    }
  }

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
