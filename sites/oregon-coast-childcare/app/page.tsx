// Oregon Coast Childcare — Lincoln City, OR — Coastal, airy, Diana-forward
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Star } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Diana", href: "#diana" },
  { label: "A Day Here", href: "#day" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

const dayMoments = [
  {
    k: "07:00",
    w: "Drop off",
    d: "Muffin batter measured by small hands. Parents leave with a photo already waiting in their inbox.",
  },
  {
    k: "10:30",
    w: "Tide walk",
    d: "Down to the beach to hunt crabs, count gulls, and race chalk tracks in the driveway on the way back.",
  },
  {
    k: "12:15",
    w: "Garden lunch",
    d: "Vegetables from the backyard, toilet-paper-roll bird feeders drying on the windowsill.",
  },
  {
    k: "15:00",
    w: "Quiet time",
    d: "Books, puzzles, or watching the deer cross the yard. Whatever the afternoon needs.",
  },
];

const reviews = [
  {
    text: "My son would wake up in the morning begging to go to Diana's house.",
    author: "Lindsay Maisch",
    context: "Visiting on maternity leave, 2023",
  },
  {
    text: "We've moved out of the area and she is still my go-to when I need to come to the coast.",
    author: "Theresa Harper",
    context: "Returning family, 2022",
  },
  {
    text: "Diana takes the kids on lots of outdoor adventures to the beach.",
    author: "Amanda Kotzian",
    context: "Portland / Lincoln City, 2025",
  },
  {
    text: "He loved seeing the birds, deer, chipmunks. She was super flexible with our schedules.",
    author: "David & Natashia Szugyi",
    context: "Parents of a 2-year-old, 2025",
  },
  {
    text: "She has over 35 years of childhood education experience. 10/10 highly recommend.",
    author: "Jesse Ward",
    context: "Parent of two boys, 2022",
  },
];

const markers = [
  "Blueberry muffins",
  "Tide pool walks",
  "Toilet-paper bird feeders",
  "Chalk race tracks",
  "Garden harvest",
  "Wildlife spotting",
  "Dance + puzzles",
  "Photos all day",
];

const contact = {
  address: "7659 NW Logan Rd",
  city: "Lincoln City",
  state: "OR",
  zip: "97367",
  phone: "(503) 313-8668",
};

export default function BusinessPage() {
  return (
    <>
      {/* ── HERO — airy sand + full-bleed beach photo right ── */}
      <section className="relative min-h-screen flex flex-col bg-[var(--brand-sand)] sand-grain">
        <nav className="relative z-50 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex items-center justify-between">
            <a href="#" className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--brand-sea)] tracking-tight">
              Oregon Coast <span className="italic font-normal">Childcare</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[var(--brand-ink)]/70 hover:text-[var(--brand-sea)] text-sm transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="tel:+15033138668"
              className="text-[var(--brand-sea)] text-sm font-[family-name:var(--font-mono)] tracking-tight border-b border-[var(--brand-sea)] pb-0.5"
            >
              (503) 313-8668
            </a>
          </div>
        </nav>

        <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-10 lg:py-16 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.p
              className="text-[var(--brand-tide)] text-xs uppercase tracking-[0.35em] mb-8 font-[family-name:var(--font-mono)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Lincoln City, Oregon · 44.97°N
            </motion.p>
            <motion.h1
              className="font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.03em] text-[var(--brand-sea)] font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              The coast,
              <br />
              <span className="italic font-normal">their</span> classroom.
            </motion.h1>
            <motion.p
              className="mt-10 text-[var(--brand-muted)] text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Run by Diana — a preschool teacher of 35 years — from a warm home two miles from the water.
            </motion.p>
            <motion.div
              className="mt-12 flex flex-wrap gap-x-10 gap-y-4 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a
                href="#visit"
                className="inline-flex items-center gap-3 text-[var(--brand-sea)] text-lg font-[family-name:var(--font-display)] border-b-2 border-[var(--brand-sea)] pb-1 hover:border-[var(--brand-coral)] hover:text-[var(--brand-coral)] transition-colors"
              >
                Ask about a spot <ArrowUpRight className="w-5 h-5" />
              </a>
              <span className="text-xs text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-wider">
                ★ 4.5 · 15 Google reviews
              </span>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 relative h-[400px] md:h-[560px] overflow-hidden"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <img
              src="/photos/photo-6.webp"
              alt="A child on the rocky Oregon coast"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 text-[var(--brand-sand)] font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] uppercase flex justify-between">
              <span>No. 01</span>
              <span>Tide pool hunt</span>
            </div>
          </motion.div>
        </div>

        {/* bottom marker band */}
        <div className="relative z-10 border-t border-[var(--brand-sea)]/15 overflow-hidden bg-[var(--brand-sand)]">
          <div className="drift-track flex gap-12 w-max py-4 px-6">
            {[...markers, ...markers, ...markers].map((m, i) => (
              <span
                key={i}
                className="text-[var(--brand-sea)] text-xs font-[family-name:var(--font-mono)] uppercase tracking-[0.3em] whitespace-nowrap"
              >
                ◉ {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG PULL QUOTE ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-sand)]">
        <div className="max-w-5xl mx-auto">
          <motion.blockquote
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.1] text-[var(--brand-sea)] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            &ldquo;My son would wake up in the morning
            <span className="italic"> begging to go to Diana&apos;s house.&rdquo;</span>
          </motion.blockquote>
          <motion.p
            className="mt-10 text-[var(--brand-muted)] text-sm font-[family-name:var(--font-mono)] tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            — LINDSAY MAISCH · VISITING ON MATERNITY LEAVE, 2023
          </motion.p>
        </div>
      </section>

      {/* ── DIANA (full-bleed portrait + inline copy) ── */}
      <section id="diana" className="relative bg-[var(--brand-fog)]">
        <div className="grid lg:grid-cols-2 min-h-[700px]">
          <div className="relative h-[420px] lg:h-auto">
            <img
              src="/photos/photo-1.webp"
              alt="Diana reading with two young children"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-6 lg:px-16 py-20 lg:py-24 flex flex-col justify-center max-w-2xl">
            <motion.p
              className="text-[var(--brand-coral)] text-xs uppercase tracking-[0.35em] mb-8 font-[family-name:var(--font-mono)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Who&apos;s here all day
            </motion.p>
            <motion.h2
              className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-[var(--brand-sea)] font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="wave-underline">Diana.</span> That&apos;s it.
              <br />
              That&apos;s the whole school.
            </motion.h2>
            <motion.div
              className="mt-10 space-y-5 text-[var(--brand-ink)]/75 text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                A preschool teacher for three and a half decades before she opened her doors in Lincoln City. She runs her days herself, with one small group, out of her home near the water.
              </p>
              <p>
                Families find her because the coast is short on quality childcare. They stay because she remembers the names, sends the photos, and somehow makes a muffin-baking Tuesday feel like the most important day of a kid&apos;s week.
              </p>
            </motion.div>
            <motion.dl
              className="mt-14 grid grid-cols-3 gap-8 font-[family-name:var(--font-mono)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-[var(--brand-coral)]">Years</dt>
                <dd className="text-3xl text-[var(--brand-sea)] mt-2">35+</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-[var(--brand-coral)]">Open</dt>
                <dd className="text-3xl text-[var(--brand-sea)] mt-2">6 / wk</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-[var(--brand-coral)]">Group</dt>
                <dd className="text-3xl text-[var(--brand-sea)] mt-2">Small</dd>
              </div>
            </motion.dl>
          </div>
        </div>
      </section>

      {/* ── A DAY HERE (timeline) ── */}
      <section id="day" className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-sand)] sand-grain">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <p className="text-[var(--brand-tide)] text-xs tracking-[0.35em] uppercase mb-6 font-[family-name:var(--font-mono)]">
                A Day, Roughly
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[var(--brand-sea)] font-medium">
                Mornings at Diana&apos;s
                <br />
                <span className="italic font-normal">follow the tide.</span>
              </h2>
            </div>
            <p className="text-[var(--brand-muted)] text-sm md:text-base max-w-sm">
              No two days look identical. This is what one of them might hold.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 border-t border-[var(--brand-sea)]/15">
            {dayMoments.map((m, i) => (
              <motion.div
                key={m.k}
                className="py-8 border-b border-[var(--brand-sea)]/15 flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--brand-coral)] tracking-wider shrink-0 w-16">
                  {m.k}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--brand-sea)] mb-2">
                    {m.w}
                  </h3>
                  <p className="text-[var(--brand-muted)] text-sm leading-relaxed">{m.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO BAND (horizontal) ── */}
      <section className="bg-[var(--brand-fog)] overflow-hidden py-0">
        <div className="flex gap-3 drift-track w-max">
          {[
            "/photos/photo-3.webp",
            "/photos/photo-8.webp",
            "/photos/photo-2.webp",
            "/photos/photo-9.webp",
            "/photos/photo-5.webp",
            "/photos/photo-7.webp",
            "/photos/photo-4.webp",
            "/photos/photo-10.webp",
            "/photos/photo-3.webp",
            "/photos/photo-8.webp",
            "/photos/photo-2.webp",
            "/photos/photo-9.webp",
            "/photos/photo-5.webp",
            "/photos/photo-7.webp",
            "/photos/photo-4.webp",
            "/photos/photo-10.webp",
          ].map((src, i) => (
            <div key={i} className="h-56 md:h-80 w-72 md:w-96 flex-shrink-0">
              <img src={src} alt="Days on the coast" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS marquee ── */}
      <section id="reviews" className="py-24 lg:py-32 bg-[var(--brand-sand)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--brand-coral)] text-xs uppercase tracking-[0.35em] mb-6 font-[family-name:var(--font-mono)]">
              From the parents
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] text-[var(--brand-sea)] max-w-3xl">
              Quiet praise, from families
              <br />
              <span className="italic">who kept calling back.</span>
            </h2>
          </motion.div>
        </div>
        <div className="testimonial-marquee flex gap-6 w-max px-6">
          {[...reviews, ...reviews].map((r, i) => (
            <figure
              key={i}
              className="flex-shrink-0 w-[380px] bg-[var(--brand-fog)] p-8 border-t-2 border-[var(--brand-sea)]"
            >
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-[var(--brand-coral)] text-[var(--brand-coral)]" />
                ))}
              </div>
              <blockquote className="font-[family-name:var(--font-display)] text-[var(--brand-sea)] text-lg leading-snug italic">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-[var(--brand-sea)]/20">
                <p className="text-sm text-[var(--brand-ink)]">{r.author}</p>
                <p className="text-[10px] text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-widest uppercase mt-1">
                  {r.context}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── VISIT / CTA ── */}
      <section
        id="visit"
        className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-sea)] text-[var(--brand-sand)] sand-grain"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[var(--brand-tide)] text-xs uppercase tracking-[0.35em] mb-8 font-[family-name:var(--font-mono)]">
              Call first
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-medium">
              Coming to the coast?
              <br />
              <span className="italic">Call Diana first.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid md:grid-cols-3 gap-10 font-[family-name:var(--font-mono)]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-tide)] mb-3">Phone</p>
              <a
                href="tel:+15033138668"
                className="text-2xl md:text-3xl font-[family-name:var(--font-display)] hover:text-[var(--brand-coral)] transition-colors block"
              >
                {contact.phone}
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-tide)] mb-3">Find us</p>
              <p className="text-sm leading-relaxed">
                {contact.address}
                <br />
                {contact.city}, {contact.state} {contact.zip}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-tide)] mb-3">Hours</p>
              <p className="text-sm leading-relaxed">
                Mon – Sat · 7am – 6pm
                <br />
                Flexible + seasonal
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-5">
            <a
              href="tel:+15033138668"
              className="inline-flex items-center gap-3 bg-[var(--brand-sand)] text-[var(--brand-sea)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-coral)] hover:text-[var(--brand-sand)] transition"
            >
              <Phone className="w-4 h-4" /> Call Diana
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 lg:px-12 bg-[var(--brand-sea)] text-[var(--brand-sand)]/70 border-t border-[var(--brand-sand)]/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-[family-name:var(--font-mono)] text-xs tracking-wider">
          <p>Oregon Coast Childcare · Lincoln City, OR</p>
          <p>© 2026</p>
        </div>
      </footer>

      <ClickToCall phone="(503) 313-8668" />
    </>
  );
}
