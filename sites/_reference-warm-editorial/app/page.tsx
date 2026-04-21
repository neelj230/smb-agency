"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { BlurredReveal } from "@/components/BlurredReveal";
import { ZoomOutReveal } from "@/components/ZoomOutReveal";
import type { NavLink, Photo, Review } from "@/components/types";
import { motion } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Lounge", href: "#about" },
  { label: "Work", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book", href: "#contact" },
];

const reviews: Review[] = [
  {
    text: "I'm one of the boring nail girls that just appreciates a clean pink or nude set done WELL. Tavi absolutely delivered. The shape, the clean cuticle work, the even application — exactly what I envisioned.",
    author: "Felicia C",
    rating: 5,
    source: "google",
  },
  {
    text: "This was my first time at a Black nail salon and I cannot express how much it meant to me. Brazil made me feel immediately at ease. The complimentary wine, the curated music — it felt like visiting a friend.",
    author: "Jo Givens",
    rating: 5,
    source: "google",
  },
  {
    text: "Tavi is absolutely detail-obsessed. I brought in a photo of Kiss By Chérie lip gloss-inspired nails and she matched it EXACTLY. The branded designs are her specialty and it shows.",
    author: "Who Is She",
    rating: 5,
    source: "google",
  },
];

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-3.webp", alt: "Nail art design", category: "work" },
  { src: "/photos/photo-4.webp", alt: "Custom nail set", category: "work" },
  { src: "/photos/photo-5.webp", alt: "Branded nail design", category: "work" },
  { src: "/photos/photo-6.webp", alt: "Acrylic full set", category: "work" },
  { src: "/photos/photo-7.webp", alt: "Nail art close-up", category: "work" },
  { src: "/photos/photo-8.webp", alt: "Gel manicure result", category: "work" },
];

const businessContact = {
  name: "Bellish Nail Lounge",
  address: "841 S 52nd St",
  city: "Philadelphia",
  state: "PA",
  zip: "19143",
  phone: "(484) 649-1931",
  email: "",
  hours: {
    Monday: "9 AM – 2 PM",
    Tuesday: "9 AM – 5 PM",
    Wednesday: "9 AM – 5 PM",
    Thursday: "9 AM – 5 PM",
    Friday: "9 AM – 5 PM",
    Saturday: "10 AM – 8 PM",
    Sunday: "10 AM – 7 PM",
  },
};

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true },
};

const staggerChild = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BellishPage() {
  return (
    <>
      <Navbar
        businessName="Bellish"
        links={navLinks}
        ctaText="Book on Booksy"
        ctaHref="http://bellishnails.booksy.com/"
      />

      {/* ── HERO: Blurred reveal with editorial typography ── */}
      <BlurredReveal
        src="/photos/photo-1.webp"
        alt="Bellish Nail Lounge exterior"
        height="140vh"
      >
        <div className="text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6"
          >
            52nd Street &middot; West Philadelphia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.9]"
          >
            Bellish
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-white/80 mt-6 italic"
          >
            Bold nails. Pure vibes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-10 flex gap-4 justify-center"
          >
            <a
              href="http://bellishnails.booksy.com/"
              className="px-8 py-3 bg-[var(--brand-primary)] text-white text-sm uppercase tracking-widest hover:bg-[var(--brand-primary)]/90 transition-colors"
            >
              Book Now
            </a>
            <a
              href="tel:+14846491931"
              className="px-8 py-3 border border-white/30 text-white text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Call
            </a>
          </motion.div>
        </div>
      </BlurredReveal>

      {/* ── MARQUEE: Services ticker ── */}
      <div className="bg-[var(--brand-primary)] text-white">
        <MarqueeTicker
          items={[
            "Acrylic Full Set",
            "Custom Nail Art",
            "Gel Manicure",
            "Same-Day Removal",
            "Brand-Inspired Design",
            "Lounge Experience",
          ]}
          separator="+"
          speed={25}
          variant="default"
        />
      </div>

      {/* ── ABOUT: Editorial story block ── */}
      <section id="about" className="py-32 lg:py-44 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4">
              The Lounge
            </p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8">
              Where your vision becomes the design.
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed text-base max-w-md">
              Brazil and Tavi run a lounge on 52nd Street where every set starts
              with listening. Complimentary wine, curated music, and zero rush.
              Black-owned, detail-obsessed, and built on making first-timers
              feel like regulars.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
            <ZoomOutReveal startScale={1.15} endScale={1}>
              <div className="gallery-card aspect-[3/4]">
                <img
                  src="/photos/photo-2.webp"
                  alt="Inside Bellish Nail Lounge"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ZoomOutReveal>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY: Asymmetric grid with zoom reveals ── */}
      <section
        id="gallery"
        className="py-24 lg:py-36 px-6 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4">
              Portfolio
            </p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light">
              The Work
            </h2>
          </motion.div>
          <motion.div
            {...stagger}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {galleryPhotos.map((photo, i) => (
              <motion.div
                key={i}
                {...staggerChild}
                className={`gallery-card ${i === 0 || i === 3 ? "row-span-2 aspect-[3/5]" : "aspect-square"}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS: Large editorial quotes ── */}
      <section id="reviews" className="py-32 lg:py-44 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="mb-20">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4">
              Words
            </p>
            <div className="editorial-rule" />
          </motion.div>
          <div className="space-y-24">
            {reviews.map((review, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="border-l-2 border-[var(--brand-primary)] pl-8 md:pl-12"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-[var(--brand-text)]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="text-sm text-[var(--brand-muted)] uppercase tracking-widest">
                    {review.author}
                  </span>
                  <span className="text-[var(--brand-primary)] text-xs">
                    {"★".repeat(review.rating)}
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT: Minimal ── */}
      <section
        id="contact"
        className="py-32 lg:py-44 px-6 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4">
              Visit
            </p>
            <div className="editorial-rule mx-auto" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light mt-6 mb-10">
              Book Your Set
            </h2>
            <div className="space-y-3 text-[var(--brand-muted)]">
              <p className="font-mono text-sm">{businessContact.address}</p>
              <p className="font-mono text-sm">
                {businessContact.city}, {businessContact.state}{" "}
                {businessContact.zip}
              </p>
              <p className="font-mono text-sm">
                <a
                  href={`tel:${businessContact.phone}`}
                  className="hover:text-[var(--brand-primary)] transition-colors"
                >
                  {businessContact.phone}
                </a>
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[var(--brand-muted)]">
              {Object.entries(businessContact.hours)
                .slice(0, 4)
                .map(([day, time]) => (
                  <div key={day}>
                    <p className="font-mono uppercase tracking-wider">
                      {day.slice(0, 3)}
                    </p>
                    <p className="mt-1">{time}</p>
                  </div>
                ))}
            </div>
            <a
              href="http://bellishnails.booksy.com/"
              className="inline-block mt-12 px-10 py-4 bg-[var(--brand-primary)] text-white text-sm uppercase tracking-widest hover:bg-[var(--brand-primary)]/90 transition-colors"
            >
              Book on Booksy
            </a>
          </motion.div>
        </div>
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(484) 649-1931" />
    </>
  );
}
