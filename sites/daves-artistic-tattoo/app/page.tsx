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
    text: "This shop deserves 10 stars! Dave did my daughter Madison's septum piercing and was absolutely incredible. From the moment we walked in, he made us feel welcomed and comfortable. Madison was nervous, but he talked her through every part of the process in a calm and reassuring way.",
    author: "aysha steatean",
    rating: 5,
    source: "google",
  },
  {
    text: "Dave is great!! I just got my nipples pierced and I'm not scared of much but I was beyond nervous, he was funny, gentle, explained thoroughly how to care/clean it after. I will definitely be back for another piercing soon and I'm asking specifically for Dave!",
    author: "Ivy Marie",
    rating: 5,
    source: "google",
  },
  {
    text: "I had my industrial piercings yesterday and Dave was just so quick, kind, and patient — the piercing itself was honestly so quick and painless!! I didn't even realize he was done! Thanks Dave! Great shop.",
    author: "Trayonna A Pendleton",
    rating: 5,
    source: "google",
  },
];

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-3.webp", alt: "Dave's Artistic Tattoo photo 3", category: "work" },
  { src: "/photos/photo-4.webp", alt: "Dave's Artistic Tattoo photo 4", category: "work" },
  { src: "/photos/photo-5.webp", alt: "Dave's Artistic Tattoo photo 5", category: "work" },
  { src: "/photos/photo-6.webp", alt: "Dave's Artistic Tattoo photo 6", category: "work" },
  { src: "/photos/photo-7.webp", alt: "Dave's Artistic Tattoo photo 7", category: "work" },
  { src: "/photos/photo-8.webp", alt: "Dave's Artistic Tattoo photo 8", category: "work" },
];

const businessContact = {
  name: "Dave's Artistic Tattoo",
  address: "5 N 63rd St",
  city: "Philadelphia",
  state: "PA",
  zip: "19139",
  phone: "(215) 471-3113",
  email: "",
  hours: {
    Monday: "1:00 – 7:00 PM",
    Tuesday: "12:00 – 8:00 PM",
    Wednesday: "12:00 – 8:00 PM",
    Thursday: "12:00 – 8:00 PM",
    Friday: "12:00 – 8:00 PM",
    Saturday: "12:00 – 8:00 PM",
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
        businessName="Dave's"
        links={navLinks}
        ctaText="Book Now"
        ctaHref="#contact"
      />

      {/* ── HERO: Blurred reveal with editorial typography ── */}
      <BlurredReveal
        src="/photos/photo-1.webp"
        alt="Dave's Artistic Tattoo exterior"
        height="140vh"
      >
        <div className="text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6"
          >
            63rd Street &middot; West Philadelphia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.9]"
          >
            Dave's
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-white/80 mt-6 italic"
          >
            Art on skin, calm in the chair.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-10 flex gap-4 justify-center"
          >
            <a
              href="#contact"
              className="px-8 py-3 bg-[var(--brand-primary)] text-white text-sm uppercase tracking-widest hover:bg-[var(--brand-primary)]/90 transition-colors"
            >
              Book Now
            </a>
            <a
              href="tel:+12154713113"
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
            "Custom Tattoos",
            "Body Piercing",
            "Cover-Ups",
            "Walk-Ins Welcome",
            "Septum Piercing",
            "Original Artwork",
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
              The Studio
            </p>
            <div className="editorial-rule" />
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8">
              Where your idea becomes your ink.
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed text-base max-w-md">
              Dave runs a tattoo and piercing studio on 63rd Street where
              every session starts with a conversation. Calm energy, clean
              technique, and zero attitude. Detail-obsessed, and built on
              making nervous first-timers feel completely at ease.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
            <ZoomOutReveal startScale={1.15} endScale={1}>
              <div className="gallery-card aspect-[3/4]">
                <img
                  src="/photos/photo-2.webp"
                  alt="Inside Dave's Artistic Tattoo"
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
              The Ink
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
              Book Your Session
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
              href="tel:+12154713113"
              className="inline-block mt-12 px-10 py-4 bg-[var(--brand-primary)] text-white text-sm uppercase tracking-widest hover:bg-[var(--brand-primary)]/90 transition-colors"
            >
              Call to Book
            </a>
          </motion.div>
        </div>
      </section>

      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      <ClickToCall phone="(215) 471-3113" />
    </>
  );
}
