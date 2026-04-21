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
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const reviews: Review[] = [
  {
    text: "Patty's Little Minions Childcare is one of the best ones I've had. Patty is the best with kids. She goes above and beyond to bring so much joy into their daily lives. She has tons of activities, an outside playground, and an amazing dog that's great with kids. The kids are fed well and truly cared for.",
    author: "Damaris Torres",
    rating: 5,
    source: "google",
  },
  {
    text: "Absolutely love her childcare. My 3 children went with her for a little over 5 years from April 2019 to June 2024. They absolutely adore her and, to this day, miss her very much. The only reason I had to pull my children was because we moved to Keizer. Patty is very kind and is so good with kids.",
    author: "Nereida",
    rating: 5,
    source: "google",
  },
  {
    text: "I highly recommend this place, kind and friendly provider.",
    author: "Josefina Macias",
    rating: 5,
    source: "google",
  },
];

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-1.webp", alt: "Backyard playground with wooden playhouse, climbing dome, and fenced yard area", category: "work" },
  { src: "/photos/photo-3.webp", alt: "Covered indoor playroom with colorful play structures and climbing equipment for children.", category: "work" },
  { src: "/photos/photo-4.webp", alt: "Happy dog wearing fedora hat and red tie at outdoor park event", category: "work" },
  { src: "/photos/photo-5.webp", alt: "2026 childcare closing dates calendar for Patty's Little Minions with monthly highlights", category: "work" },
  { src: "/photos/photo-6.webp", alt: "Young child painting artwork at table with brushes and colorful paints", category: "work" },
  { src: "/photos/photo-7.webp", alt: "Covered patio deck with outdoor furniture, dining table, and backyard play area visible.", category: "work" },
  { src: "/photos/photo-9.webp", alt: "Children posing on wooden elevated playhouse with ladder and railings in backyard", category: "work" },
  { src: "/photos/photo-10.webp", alt: "Young child playing with purple kinetic sand and colorful ocean-themed toys in sensory bin", category: "work" },
];

const businessContact = {
  name: "Patty's Little Minions Childcare LLC",
  address: "4807 Camelot Ct NE",
  city: "Salem",
  state: "OR",
  zip: "97301",
  phone: "(503) 881-3580",
  email: "",
  hours: {
    Monday: "6:00 AM – 4:30 PM",
    Tuesday: "6:00 AM – 4:30 PM",
    Wednesday: "6:00 AM – 4:30 PM",
    Thursday: "6:00 AM – 4:30 PM",
    Friday: "6:00 AM – 4:30 PM",
    Saturday: "Closed",
    Sunday: "Closed",
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

export default function BusinessPage() {
  return (
    <>
      <Navbar
        businessName="Patty's"
        links={navLinks}
        ctaText="Get in Touch"
        ctaHref="tel:+15038813580"
      />

      {/* ── HERO: Blurred reveal with editorial typography ── */}
      <BlurredReveal
        src="/photos/photo-1.webp"
        alt="Patty's Little Minions Childcare LLC exterior"
        height="140vh"
      >
        <div className="text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6"
          >
            Camelot Ct NE &middot; Salem, Oregon
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.9]"
          >
            Patty's
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-white/80 mt-6 italic"
          >
            Home daycare. Five years and counting.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-10 flex gap-4 justify-center"
          >
            <a
              href="tel:+15038813580"
              className="px-8 py-3 bg-[var(--brand-primary)] text-white text-sm uppercase tracking-widest hover:bg-[var(--brand-primary)]/90 transition-colors"
            >
              Schedule a Tour
            </a>
            <a
              href="tel:+15038813580"
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
            "Full-Day Childcare",
            "Sensory Play",
            "Outdoor Playground",
            "Creative Arts",
            "Nutritious Meals",
            "Early Learning",
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
              Meet Patty
            </p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8">
              Kids. Dog. Backyard. Real meals.
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed text-base max-w-md">
              Patty watches a small group out of her Camelot Ct home in northeast Salem —
              sensory bins, painting at the kitchen table, a backyard with a climbing dome,
              and a gentle dog the kids adore. One family left her after five years only
              because they moved to Keizer. Their kids still ask about her.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
            <ZoomOutReveal startScale={1.15} endScale={1}>
              <div className="gallery-card aspect-[3/4]">
                <img
                  src="/photos/photo-2.webp"
                  alt="Inside Patty's Little Minions Childcare LLC"
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
              A day at Patty's
            </p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light">
              Play, paint, eat, nap.
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
              What parents say
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
              Schedule a Tour
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
              href="tel:+15038813580"
              className="inline-block mt-12 px-10 py-4 bg-[var(--brand-primary)] text-white text-sm uppercase tracking-widest hover:bg-[var(--brand-primary)]/90 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(503) 881-3580" />
    </>
  );
}
