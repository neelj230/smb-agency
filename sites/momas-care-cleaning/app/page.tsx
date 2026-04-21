// Moma's Care Cleaning — Philadelphia — Warm editorial, trust-first
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Star } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "The Way", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book", href: "#contact" },
];

const services = [
  {
    n: "01",
    name: "Deep Home Reset",
    copy: "Top-to-bottom, every cabinet and corner — the serious reset you've been putting off.",
  },
  {
    n: "02",
    name: "Move-In / Move-Out",
    copy: "Same-week turnarounds. We schedule around your moving truck, not the other way around.",
  },
  {
    n: "03",
    name: "Post-Surgery Care",
    copy: "Coordinated with family. Gentle, quiet, thorough — so recovery happens at home, not a hotel.",
  },
  {
    n: "04",
    name: "Recurring Maintenance",
    copy: "Weekly, bi-weekly, monthly. The kind of rhythm that keeps a home feeling handled.",
  },
  {
    n: "05",
    name: "Carpet Shampoo & Steam",
    copy: "Lifts odor, lifts stains, lifts the mood. Mention it on the call so the crew arrives ready.",
  },
  {
    n: "06",
    name: "Vacant Property",
    copy: "For landlords and property managers — full clean of empty units, garages, storage.",
  },
];

const process = [
  {
    k: "Step one",
    t: "You call Jason.",
    d: "Same day, six days a week. He listens, asks the right questions, and finds you a slot.",
  },
  {
    k: "Step two",
    t: "We walk the home.",
    d: "A quick walkthrough so we know what matters to you — your priorities become our checklist.",
  },
  {
    k: "Step three",
    t: "The work gets done.",
    d: "Top to bottom. Every nook, every corner. You come home to a house that feels taken care of.",
  },
];

const reviews = [
  {
    text: "From the first call I felt like I was in great hands. My mom said, 'the place sure is clean now.'",
    author: "Denise Dalton",
    context: "Hired after her mom's hip replacement",
  },
  {
    text: "Came highly recommended by a friend & I was not disappointed. My house is sparkling.",
    author: "Susan Schuman",
    context: "Now a recurring client",
  },
  {
    text: "I needed two apartments cleaned on a quick turnaround. They got me on the books and the crew was kind, professional, excellent.",
    author: "Summer P.",
    context: "Mid-move, both apartments",
  },
];

const bigQuote = {
  text: "the place sure is clean now.",
  lead: "My mom said,",
  author: "Denise Dalton",
  context: "Hired Moma's after her mom's hip replacement surgery",
};

const marquee = [
  "24 hours, 6 days",
  "Same-week booking",
  "Post-surgery care",
  "Move-in / move-out",
  "Walk-through first",
  "Ask for Jason",
];

const contact = {
  address: "6140 Lansdowne Ave",
  neighborhood: "Overbrook",
  city: "Philadelphia",
  state: "PA",
  zip: "19151",
  phone: "(267) 990-2478",
};

export default function MomasCareCleaning() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col bg-[var(--brand-bone)]">
        <nav className="relative z-50 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex items-center justify-between">
            <a href="#" className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--brand-moss)] tracking-tight">
              Moma&apos;s <span className="italic font-normal">Care</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[var(--brand-ink)]/70 hover:text-[var(--brand-moss)] text-sm transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="tel:+12679902478"
              className="text-[var(--brand-moss)] text-sm font-[family-name:var(--font-mono)] tracking-tight border-b border-[var(--brand-moss)] pb-0.5"
            >
              (267) 990-2478
            </a>
          </div>
        </nav>

        <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-10 lg:py-14 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.p
              className="text-[var(--brand-rust)] text-xs uppercase tracking-[0.35em] mb-8 font-[family-name:var(--font-mono)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Overbrook, Philadelphia · Since the first call
            </motion.p>
            <motion.h1
              className="font-[family-name:var(--font-display)] text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.9] tracking-[-0.035em] text-[var(--brand-ink)] font-semibold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Clean like
              <br />
              <span className="italic font-normal text-[var(--brand-moss)]">Moma</span> would.
            </motion.h1>
            <motion.p
              className="mt-10 text-[var(--brand-muted)] text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              A Philadelphia cleaning crew built for the moments that matter — moving week, post-surgery recovery, the deep reset you keep pushing off.
            </motion.p>
            <motion.div
              className="mt-12 flex flex-wrap gap-x-10 gap-y-4 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a
                href="tel:+12679902478"
                className="inline-flex items-center gap-3 text-[var(--brand-moss)] text-lg font-[family-name:var(--font-display)] border-b-2 border-[var(--brand-moss)] pb-1 hover:border-[var(--brand-rust)] hover:text-[var(--brand-rust)] transition-colors"
              >
                Book a clean <ArrowUpRight className="w-5 h-5" />
              </a>
              <span className="text-xs text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-wider">
                ★ 4.5 · 55 Google reviews
              </span>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 relative h-[400px] md:h-[560px] overflow-hidden bg-[var(--brand-moss)]"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <img
              src="/photos/photo-1.webp"
              alt="Moma's Care Cleaning crew at work in a Philadelphia home"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 text-[var(--brand-bone)] font-[family-name:var(--font-mono)] text-xs tracking-[0.3em] uppercase flex justify-between">
              <span>No. 01</span>
              <span>The work</span>
            </div>
          </motion.div>
        </div>

        {/* ticker */}
        <div className="relative z-10 border-y border-[var(--brand-moss)]/20 overflow-hidden bg-[var(--brand-moss)]">
          <div className="ticker-track flex gap-12 w-max py-4 px-6">
            {[...marquee, ...marquee, ...marquee].map((m, i) => (
              <span
                key={i}
                className="text-[var(--brand-lime)] text-xs font-[family-name:var(--font-mono)] uppercase tracking-[0.3em] whitespace-nowrap"
              >
                ✦ {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG PULL QUOTE ──────────────────────────────────────────────── */}
      <section className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bone)]">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-[var(--brand-rust)] text-xs uppercase tracking-[0.35em] mb-10 font-[family-name:var(--font-mono)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What a mother said after
          </motion.p>
          <motion.blockquote
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,4.75rem)] leading-[1.05] text-[var(--brand-ink)] tracking-[-0.02em] font-medium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            {bigQuote.lead}
            <br />
            <span className="italic text-[var(--brand-moss)]">&ldquo;{bigQuote.text}&rdquo;</span>
          </motion.blockquote>
          <motion.p
            className="mt-10 text-[var(--brand-muted)] text-sm font-[family-name:var(--font-mono)] tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            — {bigQuote.author} · {bigQuote.context}
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES — editorial list ──────────────────────────────────── */}
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-ink)] text-[var(--brand-bone)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-16 grid md:grid-cols-12 gap-8 items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:col-span-7">
              <p className="text-[var(--brand-lime)] text-xs uppercase tracking-[0.35em] mb-6 font-[family-name:var(--font-mono)]">
                What we do
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-medium">
                Six services.
                <br />
                <span className="italic">One standard.</span>
              </h2>
            </div>
            <p className="md:col-span-5 text-[var(--brand-bone)]/65 text-base leading-relaxed max-w-sm">
              Whatever the call, the same crew, the same attention. Mention the service you need on the phone and we&apos;ll bring the right kit.
            </p>
          </motion.div>

          <div className="border-t border-[var(--brand-bone)]/15">
            {services.map((s, i) => (
              <motion.div
                key={s.n}
                className="py-7 border-b border-[var(--brand-bone)]/15 grid md:grid-cols-12 gap-6 items-baseline group hover:bg-[var(--brand-moss)]/25 transition-colors px-2 md:px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <span className="md:col-span-1 font-[family-name:var(--font-mono)] text-sm text-[var(--brand-lime)]">
                  {s.n}
                </span>
                <h3 className="md:col-span-4 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-medium">
                  {s.name}
                </h3>
                <p className="md:col-span-6 text-[var(--brand-bone)]/70 text-sm leading-relaxed">
                  {s.copy}
                </p>
                <ArrowUpRight className="md:col-span-1 w-5 h-5 text-[var(--brand-lime)] justify-self-end opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS — three steps ──────────────────────────────────────── */}
      <section id="process" className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bone)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <p className="text-[var(--brand-rust)] text-xs tracking-[0.35em] uppercase mb-6 font-[family-name:var(--font-mono)]">
                The way we work
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4rem)] leading-[1.02] text-[var(--brand-ink)] font-medium">
                Three calls,
                <br />
                <span className="italic">one clean home.</span>
              </h2>
            </div>
            <p className="text-[var(--brand-muted)] text-sm md:text-base max-w-sm">
              No hidden fees, no up-sells. Just the crew, your priorities, and the work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-[var(--brand-ink)]/15">
            {process.map((p, i) => (
              <motion.div
                key={p.t}
                className="py-10 md:py-14 md:px-8 border-b md:border-b-0 md:border-r last:md:border-r-0 border-[var(--brand-ink)]/15 first:pl-0 first:md:pl-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--brand-rust)] uppercase tracking-[0.3em] mb-6">
                  {p.k}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--brand-ink)] mb-5 leading-[1.05] font-medium">
                  {p.t}
                </h3>
                <p className="text-[var(--brand-muted)] text-sm leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JASON moment ──────────────────────────────────────────────── */}
      <section className="relative bg-[var(--brand-moss)] text-[var(--brand-bone)]">
        <div className="grid lg:grid-cols-2 min-h-[560px]">
          <div className="px-6 lg:px-16 py-20 lg:py-28 flex flex-col justify-center max-w-2xl">
            <motion.p
              className="text-[var(--brand-lime)] text-xs uppercase tracking-[0.35em] mb-8 font-[family-name:var(--font-mono)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ask for Jason
            </motion.p>
            <motion.h2
              className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              The voice on
              <br />
              <span className="italic">the first call.</span>
            </motion.h2>
            <motion.div
              className="mt-10 space-y-5 text-[var(--brand-bone)]/85 text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                Jason picks up the phone, listens carefully, and makes scheduling happen that feels impossible elsewhere — like getting two apartments cleaned back-to-back the same week of a move.
              </p>
              <p>
                He&apos;s the reason customers stay. The reason Denise felt like her parents were in good hands the moment she called. The reason a one-time booking turns into a long-term relationship.
              </p>
            </motion.div>
          </div>
          <div className="relative h-[420px] lg:h-auto order-first lg:order-last">
            <img
              src="/photos/photo-2.webp"
              alt="Freshly cleaned interior on Lansdowne Ave"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── REVIEWS — three columns ─────────────────────────────────── */}
      <section id="reviews" className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bone)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--brand-rust)] text-xs uppercase tracking-[0.35em] mb-6 font-[family-name:var(--font-mono)]">
              From Philly homes
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-[var(--brand-ink)] max-w-3xl font-medium">
              Word of mouth
              <br />
              <span className="italic">is how we grew.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((r, i) => (
              <motion.figure
                key={r.author}
                className="bg-white p-8 border-t-2 border-[var(--brand-moss)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-[var(--brand-rust)] text-[var(--brand-rust)]" />
                  ))}
                </div>
                <blockquote className="font-[family-name:var(--font-display)] text-[var(--brand-ink)] text-xl leading-snug italic">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-[var(--brand-ink)]/10">
                  <p className="text-sm text-[var(--brand-ink)] font-medium">{r.author}</p>
                  <p className="text-[10px] text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-widest uppercase mt-1">
                    {r.context}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ─────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 lg:py-36 px-6 lg:px-12 bg-[var(--brand-ink)] text-[var(--brand-bone)]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[var(--brand-lime)] text-xs uppercase tracking-[0.35em] mb-8 font-[family-name:var(--font-mono)]">
              Book the clean
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] font-medium">
              Ready when
              <br />
              <span className="italic text-[var(--brand-lime)]">you are.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid md:grid-cols-3 gap-10 font-[family-name:var(--font-mono)]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-lime)] mb-3">Phone</p>
              <a
                href="tel:+12679902478"
                className="text-2xl md:text-3xl font-[family-name:var(--font-display)] hover:text-[var(--brand-lime)] transition-colors block"
              >
                {contact.phone}
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-lime)] mb-3">Home base</p>
              <p className="text-sm leading-relaxed">
                {contact.address}
                <br />
                {contact.neighborhood}
                <br />
                {contact.city}, {contact.state} {contact.zip}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-lime)] mb-3">Hours</p>
              <p className="text-sm leading-relaxed">
                Mon – Sat · 24 hours
                <br />
                Sunday closed
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-5">
            <a
              href="tel:+12679902478"
              className="inline-flex items-center gap-3 bg-[var(--brand-lime)] text-[var(--brand-ink)] px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-bone)] transition"
            >
              <Phone className="w-4 h-4" /> Call Jason
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 lg:px-12 bg-[var(--brand-ink)] text-[var(--brand-bone)]/70 border-t border-[var(--brand-bone)]/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-[family-name:var(--font-mono)] text-xs tracking-wider">
          <p>Moma&apos;s Care Cleaning · Philadelphia, PA</p>
          <p>© 2026</p>
        </div>
      </footer>

      <ClickToCall phone="(267) 990-2478" />
    </>
  );
}
