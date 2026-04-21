"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { StickySection } from "@/components/StickySection";
import { ParallaxImage } from "@/components/ParallaxImage";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ZoomOutReveal } from "@/components/ZoomOutReveal";
import type { NavLink, Photo, Review } from "@/components/types";
import { motion } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const reviews: Review[] = [
  {
    text: "After calling 12 other places I finally came across this place and I'm very glad I did. My work wasn't willing to work with me losing childcare and gave me one day to fix the issue. This Early Learning Center let my son start the next day! Everyone is very welcoming and happy.",
    author: "CSGmail Law",
    rating: 5,
    source: "google",
  },
  {
    text: "My son loves it here❤️ They have designated areas for each age range, which I find amazing. I've never seen my son happier at any other school. He gives his teacher a hug everyday before he leaves, which I've never seen him do!",
    author: "Michelle Dank",
    rating: 5,
    source: "google",
  },
  {
    text: "I have been to over 6 different childcare centers in the last two years since I moved to Salem because my daughter would always cry at other places and I felt uncomfortable leaving her there. This place is way different. My daughter never cries when I pick her up and the people are wonderful.",
    author: "steve guerrero",
    rating: 5,
    source: "google",
  },
  {
    text: "Director is amazingly kind, professional, and thoroughly educated in early childhood development. Staff are all professional early educators dedicated to the kids. My grandkids love going here and we love watching their personal growth and reading readiness!",
    author: "Nancy NW",
    rating: 5,
    source: "google",
  },
  {
    text: "Very happy I chose to bring my son here! Everyone is so nice and welcoming. It's also CLEAN. We drive from Keizer 15 minutes out of the way of my work because I now only want him here.",
    author: "Kristina Sheldon",
    rating: 5,
    source: "google",
  },
];

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-1.webp", alt: "Children learning together", category: "interior" },
  { src: "/photos/photo-2.webp", alt: "Classroom environment", category: "interior" },
  { src: "/photos/photo-3.webp", alt: "Play area", category: "interior" },
  { src: "/photos/photo-4.webp", alt: "Reading readiness activities", category: "interior" },
  { src: "/photos/photo-5.webp", alt: "Toddler care space", category: "interior" },
  { src: "/photos/photo-6.webp", alt: "Safe and welcoming facility", category: "interior" },
];

const businessContact = {
  name: "Early Learning Center",
  address: "765 14th St NE",
  city: "Salem",
  state: "OR",
  zip: "97301",
  phone: "(503) 391-4964",
  email: "",
  hours: {
    Monday: "Call for hours",
    Tuesday: "Call for hours",
    Wednesday: "Call for hours",
    Thursday: "Call for hours",
    Friday: "Call for hours",
    Saturday: "Call for hours",
    Sunday: "Closed",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const slowFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1.2 },
};

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────
// NARRATIVE FLOW: Immersive hero → Marquee → About (parallax) → Gallery (sticky cascade) → Reviews → Visit
// This is ATMOSPHERE-FIRST: let the photos and vibe do the selling.

export default function BusinessPage() {
  return (
    <>
      <Navbar
        businessName="Early Learning Center"
        links={navLinks}
        ctaText="Visit"
        ctaHref="#visit"
      />

      {/* ── HERO: Full-bleed parallax with cinematic text ── */}
      <section className="relative h-screen overflow-hidden">
        <ParallaxImage
          src="/photos/photo-1.webp"
          alt="Early Learning Center exterior on the waterfront"
          speed={0.15}
          overlay
          overlayOpacity={0.5}
          containerClassName="h-full"
        >
          <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xs uppercase tracking-[0.4em] text-[var(--brand-primary)] mb-8"
            >
              Salem &middot; 14th St NE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="font-[family-name:var(--font-display)] text-7xl md:text-9xl lg:text-[10rem] font-normal text-white tracking-tight leading-[0.85] italic"
            >
              Early Learning Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 text-sm text-white/50 tracking-widest uppercase"
            >
              Infant care &middot; Preschool &middot; School-age &middot; Salem
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="mt-16"
            >
              <a
                href="#about"
                className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white/80 transition-colors"
              >
                Scroll ↓
              </a>
            </motion.div>
          </div>
        </ParallaxImage>
      </section>

      {/* ── MARQUEE: Menu items ── */}
      <div className="section-line bg-[var(--brand-bg-alt)]">
        <MarqueeTicker
          items={[
            "Infant Care",
            "Toddler Program",
            "Preschool",
            "School-Age Care",
            "Reading Readiness",
            "Flexible Enrollment",
            "Full-Day Childcare",
            "Age-Designated Spaces",
          ]}
          separator="·"
          speed={35}
          variant="default"
          className="text-[var(--brand-muted)]"
        />
      </div>

      {/* ── ABOUT: Two-column with parallax photo ── */}
      <section id="about" className="py-32 lg:py-44 px-6 section-line">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 items-center">
          <motion.div {...fadeUp} className="md:col-span-2">
            <div className="brand-hr mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal italic leading-[1.05] mb-8">
              Where kids run in, not out.
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed">
              Early Learning Center on 14th St NE in Salem is the place parents drive past
              a dozen other options to reach. Designated areas for each age group mean
              toddlers aren&apos;t overwhelmed by older kids. The director is thoroughly
              educated in early childhood development, and the staff treat everyone
              with genuine respect.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="md:col-span-3"
          >
            <ZoomOutReveal startScale={1.2} endScale={1}>
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <img
                  src="/photos/photo-2.webp"
                  alt="Inside Early Learning Center"
                  className="w-full h-full object-cover image-warm"
                  loading="lazy"
                />
              </div>
            </ZoomOutReveal>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY: Sticky section cascade — photos stack as you scroll ── */}
      <section id="gallery" className="section-line">
        <motion.div {...slowFade} className="py-20 px-6 text-center">
          <div className="brand-hr mx-auto mb-6" />
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal italic">
            The Center
          </h2>
        </motion.div>

        <div className="sticky-stack">
          {galleryPhotos.map((photo, i) => (
            <StickySection key={i} index={i + 1} scaleOnScroll>
              <div className="h-screen flex items-center justify-center px-4 md:px-16 bg-[var(--brand-bg)]">
                <div className="w-full max-w-5xl">
                  <div
                    className={`overflow-hidden rounded-sm ${i % 2 === 0 ? "aspect-[16/10]" : "aspect-[4/3] max-w-3xl mx-auto"}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover image-warm"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 text-xs text-[var(--brand-muted)] tracking-widest uppercase text-center">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </StickySection>
          ))}
        </div>
      </section>

      {/* ── REVIEWS: Oversized editorial quotes ── */}
      <section id="reviews" className="py-32 lg:py-44 px-6 section-line">
        <div className="max-w-4xl mx-auto">
          <motion.div {...slowFade} className="mb-20 text-center">
            <div className="brand-hr mx-auto mb-6" />
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-muted)]">
              What people say
            </p>
          </motion.div>
          <div className="space-y-32">
            {reviews.map((review, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-normal italic leading-snug text-[var(--brand-text)]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="mt-8">
                  <span className="text-[var(--brand-primary)] text-xs tracking-[0.3em] uppercase">
                    {review.author}
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT: Hours + location ── */}
      <section
        id="visit"
        className="py-32 lg:py-44 px-6 section-line bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="brand-hr mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-normal italic mb-12">
              Come find us.
            </h2>
            <p className="text-[var(--brand-muted)] text-sm mb-2 font-mono">
              {businessContact.address}
            </p>
            <p className="text-[var(--brand-muted)] text-sm mb-8 font-mono">
              {businessContact.city}, {businessContact.state}{" "}
              {businessContact.zip}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {Object.entries(businessContact.hours)
                .slice(0, 4)
                .map(([day, time]) => (
                  <div key={day}>
                    <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wider font-mono">
                      {day.slice(0, 3)}
                    </p>
                    <p className="text-sm mt-1 text-[var(--brand-text)]">
                      {time}
                    </p>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4 max-w-xs mx-auto">
              {Object.entries(businessContact.hours)
                .slice(4)
                .map(([day, time]) => (
                  <div key={day}>
                    <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wider font-mono">
                      {day.slice(0, 3)}
                    </p>
                    <p className="text-sm mt-1 text-[var(--brand-text)]">
                      {time}
                    </p>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />
    </>
  );
}
