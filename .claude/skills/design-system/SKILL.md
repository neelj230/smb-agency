---
name: smb-design-system
description: "Design system rules, CSS recipes, font pairings, and visual techniques for generating award-winning SMB websites"
---

# SMB Agency Design System

## CSS Recipes (copy into every site's globals.css)

### Film Grain Overlay
```css
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: url('/noise.png');
  mix-blend-mode: hard-light;
  opacity: 0.03;
  pointer-events: none;
  image-rendering: pixelated;
}
```

### Custom Selection Colors
```css
::selection {
  background: var(--brand-primary);
  color: var(--brand-bg);
}
```

### Picture Frame Border (Tier 4)
```css
.frame::before {
  content: '';
  position: fixed;
  inset: 8px;
  z-index: 999;
  border: 1px solid rgba(0, 0, 0, 0.1);
  pointer-events: none;
}
```

### Mix-Blend-Mode Hover
```css
.card-hover {
  position: relative;
}
.card-hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--brand-primary);
  mix-blend-mode: difference;
  opacity: 0;
  transition: opacity 0.3s;
}
.card-hover:hover::after {
  opacity: 1;
}
```

## Font Pairings (via next/font)

```typescript
// Restaurant/Food
import { Instrument_Serif, Inter } from 'next/font/google'
const display = Instrument_Serif({ subsets: ['latin'], weight: '400' })
const body = Inter({ subsets: ['latin'] })

// Contractor/Trade
import { Space_Grotesk, Inter } from 'next/font/google'
const display = Space_Grotesk({ subsets: ['latin'] })
const body = Inter({ subsets: ['latin'] })

// Professional (Law/Med)
import { Libre_Baskerville, Source_Sans_3 } from 'next/font/google'
const display = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] })
const body = Source_Sans_3({ subsets: ['latin'] })

// Creative/Retail
import { Syne, DM_Sans } from 'next/font/google'
const display = Syne({ subsets: ['latin'] })
const body = DM_Sans({ subsets: ['latin'] })
```

## Framer Motion Scroll Reveal Pattern

```typescript
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

// Use on every section below the fold:
<motion.section {...fadeInUp}>
  {/* content */}
</motion.section>
```

## Staggered Children Pattern

```typescript
const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}
```

## Photo Gallery Grid

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
```

## Color Palette Generation Rules
1. Extract dominant color from logo/existing branding
2. Generate complementary colors ensuring WCAG AA contrast (4.5:1)
3. Always include: --brand-primary, --brand-secondary, --brand-bg, --brand-text, --brand-accent
4. Dark palettes: text should be > #E0E0E0, bg should be < #1A1A1A
5. Light palettes: text should be < #333333, bg should be > #F5F5F5

## Inspiration Reference
These sites define our quality bar:
- virgilabloh.com: bold color commitment, film grain, monospace labels, editorial grid
- press.stripe.com: per-product color theming, 3D rendering, rich material textures
- aidanjs.com: single bold color + white, canvas animations, extreme minimalism
- posthog.com: custom mascot/illustrations, playful personality, Squeak Bold font
- plasticlist.org: picture-frame border, 3-tier font system, data-as-design
- chloeyan.me/ferry: CSS 3D transforms, split-flap animations, custom themed fonts
- tempo.xyz: serif + line-drawing illustrations, monochrome, generous whitespace
- neelrjain.com: Instrument Serif, interactive inline text, live clock
- rjmgt.vercel.app: Instrument Serif + Inter, staggered animations, copper palette (our own baseline)
- source-accounting.com: clean professional layout, testimonials, certification badges (our own baseline)
