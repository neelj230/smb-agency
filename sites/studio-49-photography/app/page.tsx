// Studio 49 Photography — Bend, OR — editorial photo-led redesign
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ParallaxImage } from "@/components/ParallaxImage";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MapPin } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Index", href: "#index" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

// Real review, verbatim (Michael Womack, 5★)
const pulledQuote = {
  text: "Very nice and knowledgeable.",
  author: "Michael Womack",
  meta: "Google review · 5★",
};

const workIndex = [
  { no: "01", title: "Rainbow over the pass", kind: "Landscape", place: "Hwy 97, outside Bend", photo: "/photos/photo-2.webp" },
  { no: "02", title: "Blaine Construction", kind: "Commercial signage", place: "Central Oregon", photo: "/photos/photo-3.webp" },
  { no: "03", title: "Shadow Hills Apartments", kind: "Property & exterior", place: "NE Third St", photo: "/photos/photo-5.webp" },
  { no: "04", title: "Rod wall, sporting goods", kind: "Retail interior", place: "Bend, OR", photo: "/photos/photo-6.webp" },
  { no: "05", title: "Patriotic bunting, red SUV", kind: "Lifestyle / place", place: "Old town Bend", photo: "/photos/photo-9.webp" },
  { no: "06", title: "White chapel, cloud deck", kind: "Architectural", place: "Rogue Valley", photo: "/photos/photo-10.webp" },
];

const photoStrip = [
  "/photos/photo-2.webp",
  "/photos/photo-6.webp",
  "/photos/photo-7.webp",
  "/photos/photo-3.webp",
  "/photos/photo-9.webp",
  "/photos/photo-5.webp",
  "/photos/photo-10.webp",
  "/photos/photo-4.webp",
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BusinessPage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <a href="#" className="font-[family-name:var(--font-display)] text-sm tracking-[0.3em] uppercase text-white">
            Studio 49
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <a href="tel:+15413316494" className="text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] font-mono">
            (541) 331-6494
          </a>
        </div>
      </nav>

      {/* ── HERO: Single big photo + 3-word statement ── */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black">
        <img
          src="/photos/photo-2.webp"
          alt="Triple rainbow spanning a mountain valley outside Bend, Oregon"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-between pt-28 pb-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-white/80 text-[10px] uppercase tracking-[0.35em] font-mono"
          >
            Bend · Oregon · Est. photography
          </motion.p>

          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-[family-name:var(--font-display)] text-white text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-[-0.03em] font-light"
            >
              Oregon, <span className="italic">framed.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-white/70 text-base md:text-lg leading-relaxed max-w-xl"
            >
              A one-person studio on Reed Lane shooting portraits, storefronts,
              winery events and high-desert light &mdash; anywhere from the Cascades
              to the Rogue Valley.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-10 flex items-center gap-6"
            >
              <a href="#contact" className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-black px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition">
                Book a session <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="#work" className="text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] border-b border-white/30 pb-0.5">
                See the work
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE: curious one-liner ── */}
      <div className="bg-black text-white/80 border-y border-white/10">
        <MarqueeTicker
          items={["Portraits", "Winery events", "Storefronts & signage", "Retail interiors", "Apartment exteriors", "Rogue Valley landscapes", "On-location anywhere"]}
          separator="·"
          speed={30}
          variant="default"
        />
      </div>

      {/* ── PULLED QUOTE — editorial ── */}
      <section className="bg-[#FAF8F3] py-28 lg:py-40 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeUp} className="text-[var(--brand-muted)] text-[10px] uppercase tracking-[0.3em] font-mono mb-8">
            Five words from a client ↓
          </motion.p>
          <motion.blockquote {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
            <p className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-[-0.02em] font-light text-[var(--brand-text)]">
              &ldquo;{pulledQuote.text}&rdquo;
            </p>
            <footer className="mt-10 flex items-baseline gap-4 text-sm">
              <span className="font-semibold">{pulledQuote.author}</span>
              <span className="text-[var(--brand-muted)] font-mono text-xs">{pulledQuote.meta}</span>
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ── HORIZONTAL PHOTO BAND — the distinctive element ── */}
      <section className="bg-black py-20 overflow-hidden">
        <motion.div {...fadeUp} className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-10 flex items-end justify-between">
          <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-mono">
            Recent frames — scroll →
          </p>
          <p className="text-white/40 text-[10px] font-mono">{photoStrip.length} selected</p>
        </motion.div>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 lg:px-10 scrollbar-hide pb-2">
          {photoStrip.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="relative flex-shrink-0 snap-start w-[78vw] md:w-[42vw] lg:w-[32vw] aspect-[4/5] overflow-hidden bg-neutral-900"
            >
              <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-3 left-3 text-white/80 font-mono text-[10px] tracking-[0.2em]">
                {String(i + 1).padStart(2, "0")} / {String(photoStrip.length).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WORK INDEX — numbered editorial list ── */}
      <section id="work" className="bg-[#FAF8F3] py-28 lg:py-40 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="mb-16 md:mb-24 flex items-end justify-between gap-8">
            <div>
              <p className="text-[var(--brand-muted)] text-[10px] uppercase tracking-[0.3em] font-mono mb-5">
                Index — a sampling
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] font-light">
                Six frames.<br />
                Six different kinds of job.
              </h2>
            </div>
            <p className="hidden md:block text-[var(--brand-muted)] text-sm max-w-xs leading-relaxed">
              Not a portfolio. A sample of the range &mdash; portraits sit beside storefronts sit beside rainbow-lit passes.
            </p>
          </motion.div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {workIndex.map((item, i) => (
              <motion.a
                key={item.no}
                href="#contact"
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group grid grid-cols-[3rem_1fr] md:grid-cols-[3rem_1.1fr_1fr_0.8fr_auto] gap-4 md:gap-8 items-center py-6 md:py-7 hover:bg-white/50 transition-colors px-2 -mx-2"
              >
                <span className="font-mono text-[var(--brand-muted)] text-xs">{item.no}</span>
                <span className="font-[family-name:var(--font-display)] text-xl md:text-3xl font-light leading-tight group-hover:italic transition-all">
                  {item.title}
                </span>
                <span className="hidden md:block text-[var(--brand-muted)] text-sm uppercase tracking-wider">
                  {item.kind}
                </span>
                <span className="hidden md:block text-[var(--brand-muted)] text-sm font-mono">
                  {item.place}
                </span>
                <ArrowUpRight className="w-5 h-5 text-[var(--brand-muted)] group-hover:text-[var(--brand-text)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO / ABOUT — parallax half-photo ── */}
      <section id="studio" className="bg-black text-white py-28 lg:py-40 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <motion.div {...fadeUp}>
            <p className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-5">
              The studio
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,4rem)] leading-[1] tracking-[-0.02em] font-light mb-10">
              One photographer.<br />
              No showroom. <span className="italic text-[var(--brand-accent)]">All the range you need.</span>
            </h2>
            <div className="space-y-5 text-white/70 text-base leading-relaxed max-w-md">
              <p>
                Studio 49 runs lean out of a home base on Reed Lane in southeast
                Bend. No storefront, no sales pitch &mdash; just a photographer who
                shows up, reads the room, and gets the frame.
              </p>
              <p className="font-mono text-xs text-white/50 uppercase tracking-[0.2em]">
                100+ sessions across Oregon · 13 verified reviews · Since 2018
              </p>
            </div>
          </motion.div>

          <ParallaxImage src="/photos/photo-9.webp" alt="Lifestyle work in old-town Bend" speed={0.3} className="aspect-[4/5] rounded-sm overflow-hidden" />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[var(--brand-accent)] text-black py-28 lg:py-40 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.p {...fadeUp} className="text-black/60 text-[10px] uppercase tracking-[0.3em] font-mono mb-6">
            Let&apos;s shoot something
          </motion.p>
          <motion.h2 {...fadeUp} transition={{ duration: 0.8, delay: 0.1 }} className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,9vw,8rem)] leading-[0.95] tracking-[-0.03em] font-light">
            A call<br />works best.
          </motion.h2>

          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }} className="mt-14 grid md:grid-cols-3 gap-10 md:gap-6 border-t border-black/20 pt-10">
            <div>
              <p className="text-black/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-3">Phone</p>
              <a href="tel:+15413316494" className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light hover:italic transition">
                (541) 331-6494
              </a>
            </div>
            <div>
              <p className="text-black/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-3">Studio</p>
              <p className="text-base leading-relaxed">20240 Reed Ln<br />Bend, OR 97702</p>
            </div>
            <div>
              <p className="text-black/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-3">Covers</p>
              <p className="text-base leading-relaxed">Central & Southern Oregon.<br />Travel on request.</p>
            </div>
          </motion.div>

          <motion.a
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.35 }}
            href="tel:+15413316494"
            className="inline-flex items-center gap-3 mt-16 bg-black text-[var(--brand-accent)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-900 transition"
          >
            <Phone className="w-3.5 h-3.5" /> Call Studio 49
          </motion.a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black text-white/60 py-12 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-6 text-xs font-mono uppercase tracking-[0.2em]">
          <span>Studio 49 Photography</span>
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Bend, OR</span>
          <span>© 2026 — All frames reserved</span>
        </div>
      </footer>

      <ClickToCall phone="(541) 331-6494" />
    </>
  );
}
