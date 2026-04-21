---
name: smb-design-system
description: "Design portfolio reference, CSS recipes, font pairings, animation patterns, and implementation snippets for building Framer-quality SMB websites"
---

# SMB Agency Design System

The full design portfolio lives in `data/design-elements-database.json` (177+ elements from 55+ analyzed sites). This skill provides implementation recipes — the code to bring those elements to life.

## Philosophy

Be a curator, not a prescriber. Browse the database for inspiration, then combine elements into something bespoke for each business. No element is locked to any industry. Choose by vibe.

---

## Font Pairing Recipes (via next/font)

The database has 27 pairings. Here are implementation snippets for the most versatile ones:

```typescript
// Friendly, approachable (plumber, dentist, SaaS, anyone warm)
import { Figtree, Inter } from "next/font/google";
const display = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});
const body = Inter({ subsets: ["latin"] });

// Modern, clean, current (tech, contractor, anyone contemporary)
import { Geist, Inter } from "next/font/google";
const display = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});
const body = Inter({ subsets: ["latin"] });

// Calm, geometric, wellness (therapist, yoga, spa, anyone serene)
// Note: Satoshi is not on Google Fonts — use next/font/local
import localFont from "next/font/local";
import { Inter } from "next/font/google";
const display = localFont({ src: "./fonts/Satoshi-Variable.woff2" });
const body = Inter({ subsets: ["latin"] });

// Elegant serif (gardener, law firm, upscale restaurant, anyone premium)
import { Playfair_Display, Inter } from "next/font/google";
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});
const body = Inter({ subsets: ["latin"] });

// Warm editorial (personal brand, café, boutique, anyone storytelling)
import { Instrument_Serif, Inter } from "next/font/google";
const display = Instrument_Serif({ subsets: ["latin"], weight: "400" });
const body = Inter({ subsets: ["latin"] });

// Professional consulting (advisor, firm, agency, anyone established)
import { Hedvig_Letters_Serif, Inter } from "next/font/google";
const display = Hedvig_Letters_Serif({ subsets: ["latin"], weight: "400" });
const body = Inter({ subsets: ["latin"] });

// Bold, punchy (portfolio, contractor who stands out, anyone attention-grabbing)
import { Be_Vietnam_Pro, Inter } from "next/font/google";
const display = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const body = Inter({ subsets: ["latin"] });

// Rounded SaaS, warm tech (project management tool, friendly dental office)
// Open Runde is not on Google Fonts — use next/font/local
import localFont from "next/font/local";
import { Inter } from "next/font/google";
const display = localFont({ src: "./fonts/OpenRunde-Variable.woff2" });
const body = Inter({ subsets: ["latin"] });

// Tech-forward, AI aesthetic (modern auto shop, tech studio)
import { Inter } from "next/font/google";
import localFont from "next/font/local";
const display = localFont({ src: "./fonts/Switzer-Variable.woff2" });
const mono = localFont({ src: "./fonts/FragmentMono-Regular.woff2" });
const body = Inter({ subsets: ["latin"] });

// Decorative + technical (consulting, creative, architectural)
import { Red_Hat_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
const display = localFont({ src: "./fonts/Carattere-Regular.woff2" });
const mono = Red_Hat_Mono({ subsets: ["latin"] });
const body = Inter({ subsets: ["latin"] });

// Creative bold (agency, retail, anyone playful)
import { Syne, DM_Sans } from "next/font/google";
const display = Syne({ subsets: ["latin"] });
const body = DM_Sans({ subsets: ["latin"] });

// Premium designer (portfolio, luxury)
import { Inter } from "next/font/google";
import localFont from "next/font/local";
const display = localFont({ src: "./fonts/NeueHaasDisplay-Medium.woff2" });
const mono = localFont({ src: "./fonts/FragmentMono-Regular.woff2" });
const body = Inter({ subsets: ["latin"] });

// Modern SaaS, flexible (startup, any modern business)
import { Outfit, Poppins, Inter } from "next/font/google";
const display = Outfit({ subsets: ["latin"] });
const secondary = Poppins({ subsets: ["latin"], weight: ["400", "600"] });
const body = Inter({ subsets: ["latin"] });

// Quirky, characterful (creative agency, artisanal, distinctive brand)
import { Bricolage_Grotesque, Inter } from "next/font/google";
const display = Bricolage_Grotesque({ subsets: ["latin"] });
const body = Inter({ subsets: ["latin"] });

// Luxury editorial (hotel, design studio, high-end hospitality)
import { Cormorant_Garamond, Inter } from "next/font/google";
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});
const body = Inter({ subsets: ["latin"] });

// Clean premium (skincare, health, premium services)
// General Sans is not on Google Fonts — use next/font/local
import localFont from "next/font/local";
import { Inter } from "next/font/google";
const display = localFont({ src: "./fonts/GeneralSans-Variable.woff2" });
const body = Inter({ subsets: ["latin"] });

// Bold geometric statement (design studio, agency, architectural)
// Clash Display is not on Google Fonts — use next/font/local
import localFont from "next/font/local";
import { Inter } from "next/font/google";
const display = localFont({ src: "./fonts/ClashDisplay-Variable.woff2" });
const body = Inter({ subsets: ["latin"] });

// Therapeutic, personal (wellness, therapy, retreats, personal service)
import { Pinyon_Script, Playfair_Display, Inter } from "next/font/google";
const script = Pinyon_Script({ subsets: ["latin"], weight: "400" });
const display = Playfair_Display({ subsets: ["latin"] });
const body = Inter({ subsets: ["latin"] });

// Ultra-clean typography (real estate, premium photography-driven sites)
// Inter Display optimized for large sizes — tighter spacing than regular Inter
import localFont from "next/font/local";
import { Inter } from "next/font/google";
const display = localFont({ src: "./fonts/InterDisplay-Variable.woff2" });
const body = Inter({ subsets: ["latin"] });
```

### Font Application Pattern

```typescript
// In layout.tsx:
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}

// In tailwind.config.ts:
fontFamily: {
  display: ['var(--font-display)', 'serif'],
  body: ['var(--font-body)', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
}
```

---

## CSS Recipes (globals.css)

### Custom Selection Colors

```css
::selection {
  background: var(--brand-primary);
  color: var(--brand-bg);
}
```

### Film Grain Overlay (optional — adds warmth/analog feel)

```css
.grain::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: url("/noise.png");
  mix-blend-mode: hard-light;
  opacity: 0.03;
  pointer-events: none;
  image-rendering: pixelated;
}
```

### Picture Frame Border (editorial/gallery feel)

```css
.frame::before {
  content: "";
  position: fixed;
  inset: 8px;
  z-index: 999;
  border: 1px solid rgba(0, 0, 0, 0.1);
  pointer-events: none;
}
```

### Mix-Blend-Mode Hover on Cards

```css
.card-hover {
  position: relative;
  overflow: hidden;
}
.card-hover::after {
  content: "";
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

### Dot Pattern Background Decoration

```css
.dot-pattern {
  background-image: radial-gradient(circle, #00000010 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

## Framer Motion Animation Recipes

### Fade-Up on Scroll (baseline — every section below the fold)

```typescript
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

<motion.section {...fadeInUp}>
  {/* content */}
</motion.section>
```

### Staggered Children (cards, grid items, lists)

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

<motion.div {...staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} {...staggerItem}>{item.content}</motion.div>
  ))}
</motion.div>
```

### Animated Number Counter (stats sections)

```typescript
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: 'easeOut' })
    }
  }, [isInView, count, target])

  return (
    <motion.span ref={ref}>
      {rounded}
      {suffix}
    </motion.span>
  )
}
```

### Horizontal Auto-Scrolling Carousel (testimonials, logos, gallery)

```typescript
import { motion } from 'framer-motion'

function ScrollingCarousel({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex-shrink-0">{item}</div>
        ))}
      </motion.div>
    </div>
  )
}
```

### Scroll-Pinned Section Cascade (premium — sections cover each other)

```typescript
// Each section uses position: sticky + z-index stacking
function StickySection({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div
      className="sticky top-0 min-h-screen"
      style={{ zIndex: index }}
    >
      {children}
    </div>
  )
}

// Usage: wrap each section, incrementing index
<StickySection index={1}><HeroSection /></StickySection>
<StickySection index={2}><ServicesSection /></StickySection>
<StickySection index={3}><AboutSection /></StickySection>
```

### 3D Perspective Dashboard (scroll-linked depth)

```typescript
import { useScroll, useTransform, motion } from 'framer-motion'

function PerspectiveDashboard({ imageSrc }: { imageSrc: string }) {
  const { scrollYProgress } = useScroll()
  const perspective = useTransform(scrollYProgress, [0, 0.3], [800, 1200])
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  const translateZ = useTransform(scrollYProgress, [0, 0.3], [-200, 0])

  return (
    <div style={{ perspective: '1200px' }}>
      <motion.div
        style={{ rotateX, translateZ }}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        <img src={imageSrc} alt="Dashboard" className="w-full" />
      </motion.div>
    </div>
  )
}
```

### Zoom-Out Product Reveal (scroll-linked scale)

```typescript
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

function ZoomOutReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.5, 1])

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ scale }}>{children}</motion.div>
    </div>
  )
}
```

### Video Background Hero

```typescript
// For timelapse or cinematic video heroes (RealDev, Yogus, Yachtera patterns)
function VideoHero({ videoSrc, children }: { videoSrc: string; children: React.ReactNode }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
// Note: Compress video to WebM + MP4 fallback, keep under 8MB
```

### Self-Writing Text (Ambient)

```typescript
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

function SelfWritingText({ text, speed = 0.03 }: { text: string; speed?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const displayText = useTransform(count, (v) => text.slice(0, Math.round(v)))

  useEffect(() => {
    if (isInView) {
      animate(count, text.length, { duration: text.length * speed, ease: 'linear' })
    }
  }, [isInView, count, text, speed])

  return (
    <span ref={ref}>
      <motion.span>{displayText}</motion.span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-0.5 h-[1em] bg-current ml-1 align-baseline"
      />
    </span>
  )
}
```

### Blurred-to-Clear Image Reveal (Realisting pattern)

```typescript
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

function BlurredReveal({ imageSrc, children }: { imageSrc: string; children: React.ReactNode }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const blur = useTransform(scrollYProgress, [0, 0.6], [20, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1])

  return (
    <section ref={ref} className="relative min-h-[120vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.img
          src={imageSrc}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: useTransform(blur, v => `blur(${v}px)`), opacity }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  )
}
```

### Cards Zooming From Below (Forest Therapy pattern)

```typescript
// Apply to about/feature cards for dramatic entrance
const zoomFromBelow = {
  initial: { opacity: 0, y: 100, scale: 0.8 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" },
};
// Use with stagger: add delay based on index
// transition: { duration: 0.8, ease: 'easeOut', delay: index * 0.15 }
```

---

## Layout Recipes

### Photo Gallery Grid

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
```

### Comparison Table (With Us vs Without Us)

```typescript
function ComparisonTable({ withUs, withoutUs }: { withUs: string[]; withoutUs: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-100 rounded-2xl p-8">
        <h3 className="font-display text-lg mb-6 text-gray-500">Without Us</h3>
        {withoutUs.map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <span className="text-red-500">✗</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="bg-brand-primary text-white rounded-2xl p-8">
        <h3 className="font-display text-lg mb-6">With Us</h3>
        {withUs.map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <span className="text-green-300">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Process Steps (numbered, with optional images)

```typescript
function ProcessSteps({ steps }: { steps: { title: string; description: string; image?: string }[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <motion.div key={i} {...staggerItem} className="relative">
          <span className="font-mono text-5xl font-bold text-brand-primary/20">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-xl mt-2">{step.title}</h3>
          <p className="text-gray-600 mt-2">{step.description}</p>
          {step.image && (
            <div className="mt-4 rounded-xl overflow-hidden">
              <img src={step.image} alt={step.title} className="w-full object-cover" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
```

---

## Color Palette Generation

```typescript
// CSS custom properties pattern (in globals.css or inline)
:root {
  --brand-primary: #1e64e6;
  --brand-accent: #f6e304;
  --brand-bg: #f0f4fa;
  --brand-text: #081d3a;
  --brand-muted: #666666;
}

// Dark variant
:root {
  --brand-primary: #bfe15f;
  --brand-bg: #0a0a0a;
  --brand-text: #f5f5f5;
  --brand-muted: #888888;
}
```

### Color Rules

1. Extract dominant color from logo/existing branding
2. Generate complementary colors ensuring WCAG AA contrast (4.5:1 for body text)
3. Follow 70/20/10: 70% neutrals (bg + text), 20% primary, 10% accent
4. Dark palettes: text > #E0E0E0, bg < #1A1A1A
5. Light palettes: text < #333333, bg > #F5F5F5
6. Bold commitment — 2-3 colors used consistently, not 7 colors used tentatively

---

## Integration Recipes (Phase 1 — ships with every site)

### Contact Form (Resend)

```typescript
// Server action: app/actions/contact.ts
"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: FormData) {
  await resend.emails.send({
    from: "website@yourdomain.com",
    to: "business-public-email@gmail.com",
    subject: `New inquiry from ${formData.get("name")}`,
    text: `Name: ${formData.get("name")}\nPhone: ${formData.get("phone")}\nMessage: ${formData.get("message")}`,
  });
}
```

### Click-to-Call (sticky mobile)

```typescript
<a
  href={`tel:${business.phone}`}
  className="fixed bottom-4 right-4 z-50 md:hidden bg-brand-primary text-white rounded-full p-4 shadow-lg"
>
  <Phone className="w-6 h-6" />
</a>
```

### Schema.org JSON-LD

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.name,
      address: { '@type': 'PostalAddress', streetAddress: business.address, ... },
      telephone: business.phone,
      aggregateRating: { '@type': 'AggregateRating', ratingValue: business.rating, reviewCount: business.reviewCount }
    })
  }}
/>
```

---

## Quality Bar

The question for every site: **"Could this pass as a Framer template?"**

If the answer isn't "yes," keep iterating. The design elements database has 130+ patterns to draw from — there's always a way to elevate.
