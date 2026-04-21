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
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const reviews: Review[] = [
  {
    text: "Fabby is so patient and kind. I have been taking my dog Freddy over 2 years. He is a stray with a shady background. He does not cooperate with grooming at all. But a lot of progress has been made with Fabby's help. Thanks again Fabby for being you ❤️",
    author: "Judith Stodola",
    rating: 5,
    source: "google",
  },
  {
    text: "I have a shih tzu and she's very temperamental. She was incredibly patient and accommodating. Using scissors when necessary. Taking extra time with her around her face. When it was time to pick her up she presented her to me carrying her and my dog did not want to leave her arms....",
    author: "Dolores Sotelo",
    rating: 5,
    source: "google",
  },
  {
    text: "Our first visit here and we are very pleased. Our sweet Izabella looked so beautiful. The owner is kind, the shop is adorable and clean. We were impressed and continue to have our baby groomed 🐾",
    author: "Kim Hurd",
    rating: 5,
    source: "google",
  },
];

const services = [
  {
    name: "Full Groom & Style",
    description:
      "Bath, blow-dry, breed-specific haircut, and finishing touches — bows, bandanas, or exactly what you ask for.",
  },
  {
    name: "Anxiety-Sensitive Grooming",
    description:
      "Slow, patient grooming for dogs with fear responses or difficult histories. Fabby's specialty.",
  },
  {
    name: "Creative Color & Style",
    description:
      "Pet-safe fur dye and bold styling — like the vibrant orange work in our portfolio.",
  },
  {
    name: "Face & Paw Detail Trim",
    description:
      "Scissor work around face, eyes, and paws — essential for temperamental breeds.",
  },
  {
    name: "Bath & Brush-Out",
    description:
      "Deep cleansing bath, conditioner, thorough brush-out, and blow-dry. No full haircut.",
  },
  {
    name: "Open Lounge & Play Time",
    description:
      "Dogs relax in our open lounge with pet beds — no crates, no stress.",
  },
];

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-1.webp", alt: "Award plaque for Jazzy's Doggy Spaw, Best Pet Grooming Company 2025", category: "product" },
  { src: "/photos/photo-3.webp", alt: "Groomed small dog with pink bow and pearl collar on black mat", category: "product" },
  { src: "/photos/photo-4.webp", alt: "Three dogs relaxing together on a large circular white pet bed indoors", category: "product" },
  { src: "/photos/photo-5.webp", alt: "Tabby and white cat sitting on beige couch, looking at camera", category: "interior" },
  { src: "/photos/photo-7.webp", alt: "White fluffy dog wearing black bow tie on grooming table", category: "product" },
  { src: "/photos/photo-10.webp", alt: "Small dog with bright orange fur dye wearing white patterned sweater indoors", category: "product" },
];

const businessContact = {
  name: "Jazzy's Doggy Spaw",
  address: "628 N Riverside Ave # C",
  city: "Medford",
  state: "OR",
  zip: "97501",
  phone: "(541) 531-0947",
  email: "",
  hours: {
    Monday: "Closed",
    Tuesday: "10:00 AM – 5:00 PM",
    Wednesday: "10:00 AM – 5:00 PM",
    Thursday: "10:00 AM – 5:00 PM",
    Friday: "10:00 AM – 5:00 PM",
    Saturday: "Closed",
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
        businessName="Jazzy’s Doggy Spaw"
        links={navLinks}
        ctaText="Visit"
        ctaHref="#visit"
      />

      {/* ── HERO: Full-bleed parallax with cinematic text ── */}
      <section className="relative h-screen overflow-hidden">
        <ParallaxImage
          src="/photos/photo-1.webp"
          alt="Jazzy’s Doggy Spaw exterior on the waterfront"
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
              Best Pet Grooming 2025 &middot; Medford, OR
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="font-[family-name:var(--font-display)] text-7xl md:text-9xl lg:text-[10rem] font-normal text-white tracking-tight leading-[0.85] italic"
            >
              Jazzy’s Doggy Spaw
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 text-sm text-white/50 tracking-widest uppercase"
            >
              Anxiety-friendly &middot; Creative styles &middot; Medford, OR
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
            "Full Groom & Style",
            "Anxiety-Sensitive Grooming",
            "Creative Color & Style",
            "Face & Paw Detail Trim",
            "Bath & Brush-Out",
            "Open Lounge & Play Time",
            "Best Pet Grooming 2025",
            "5-Star Rated",
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
              Where nervous dogs become regulars.
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed">
              At 628 N Riverside in Medford, Fabby and Jazzy have built
              something rare: a grooming experience rooted in patience and
              a deep understanding of anxious animals. Even the most reluctant
              rescue dogs make real progress here, and temperamental pups
              end up not wanting to leave Fabby&apos;s arms.
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
                  alt="Inside Jazzy’s Doggy Spaw"
                  className="w-full h-full object-cover image-warm"
                  loading="lazy"
                />
              </div>
            </ZoomOutReveal>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES: Editorial list of what we do ── */}
      <section id="services" className="py-32 lg:py-40 px-6 section-line bg-[var(--brand-bg)]">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="mb-20 text-center">
            <div className="brand-hr mx-auto mb-6" />
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--brand-muted)] mb-4">
              What we do
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal italic">
              Grooming, unhurried.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
                className="border-t border-[var(--brand-border)] py-8"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs text-[var(--brand-muted)] mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl italic mb-2">
                      {service.name}
                    </h3>
                    <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY: Sticky section cascade — photos stack as you scroll ── */}
      <section id="gallery" className="section-line">
        <motion.div {...slowFade} className="py-20 px-6 text-center">
          <div className="brand-hr mx-auto mb-6" />
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal italic">
            The Doggy Spaw
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
