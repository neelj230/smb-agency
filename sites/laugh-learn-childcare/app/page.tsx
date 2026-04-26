// Laugh & Learn Childcare — Wood Village, OR — Warm, rustic, home-like
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import { motion, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Phone,
  MapPin,
  Star,
  Baby,
  Sprout,
  HeartHandshake,
  BookOpen,
  Palette,
  GraduationCap,
  Plus,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Our Days", href: "#days" },
  { label: "Rabecca", href: "#rabecca" },
  { label: "Families", href: "#families" },
  { label: "Questions", href: "#faq" },
  { label: "Visit", href: "#visit" },
];

const chapters = [
  {
    n: "01",
    label: "Arrivals before sunrise",
    body: "Doors open at 6:30 AM. Parents drop off on the way to work — coffee in hand, confident they're leaving their kid with family.",
  },
  {
    n: "02",
    label: "Garden, corn, and soil hands",
    body: "Children plant, water, and harvest. Last fall we brought home an armful of sweet corn the four-year-olds shucked themselves.",
  },
  {
    n: "03",
    label: "Reading on the play mat",
    body: "A pile of books, a pile of kids. The photo text thread that goes out mid-morning is a small, quiet ritual for every parent on our roster.",
  },
  {
    n: "04",
    label: "Ready for kindergarten",
    body: "By the time they age out, they know their letters, their friends, and that school is a place they already belong.",
  },
];

const services = [
  {
    icon: Baby,
    name: "Infant & Toddler",
    sub: "From 4 months.",
    body: "Responsive, low-ratio care for the earliest months. Constant photo updates so nervous first-time parents feel it too.",
  },
  {
    icon: BookOpen,
    name: "Preschool Learning",
    sub: "Letters, listening, joy.",
    body: "A rhythm of storytelling, letter recognition, and art that builds kindergarten readiness without rushing childhood.",
  },
  {
    icon: HeartHandshake,
    name: "Individualized Support",
    sub: "For every kind of kid.",
    body: "Speech delays, developmental differences, unique learners — we figure out how each child learns and meet them there.",
  },
  {
    icon: Sprout,
    name: "Garden & Outdoors",
    sub: "Real dirt, real corn.",
    body: "Children plant, water, and harvest vegetables. Cornfields in fall, muddy rainboots in spring — the whole year outside.",
  },
  {
    icon: Palette,
    name: "Arts & Sensory Play",
    sub: "Paint on the fingers.",
    body: "Daily projects, seasonal crafts, sensory bins. The kind of mess that becomes fridge art and muscle memory.",
  },
  {
    icon: GraduationCap,
    name: "Kindergarten Readiness",
    sub: "Confident, kind, curious.",
    body: "By the time a child graduates, they know their letters, their friends, and that school is a place they already belong.",
  },
];

const stats = [
  { value: "15", suffix: "+", label: "Years with Rabecca" },
  { value: "5", suffix: "★", label: "Google average" },
  { value: "13", suffix: "", label: "Five-star reviews" },
  { value: "6:30", suffix: " AM", label: "Doors open, M–F" },
];

const reviews = [
  {
    text: "Rabecca has had all my grandchildren — 5 of them — over 15.5 years. My grandchildren cried they had to leave.",
    author: "Melissa Lopez",
    role: "Grandparent since 2010",
  },
  {
    text: "My three-year-old has speech delays. Rabecca and her team took the time to figure out how he learns best. He's THRIVING.",
    author: "Ali Pitt",
    role: "Mom of a determined kid",
  },
  {
    text: "My daughter started at 2. My son at 4 months. This year they're both graduating and a piece of our hearts will always be here.",
    author: "Maria Clegg",
    role: "Mom to Laugh & Learn kids",
  },
  {
    text: "Leaving your most precious gift in the hands of another is hard. Constant communication, pictures, extra snuggles — just going the extra mile.",
    author: "Heather O'Rourke",
    role: "First-time parent",
  },
  {
    text: "I recommend them to everyone I know who is looking for daycare. 10/10 loved this place!",
    author: "Alex Jorgenson",
    role: "Wood Village parent",
  },
];

const faqs = [
  {
    q: "What makes Laugh & Learn different?",
    a: "Relationships that last years — sometimes decades. One family has enrolled five grandchildren here over 15.5 years. Rabecca learns how each child thinks, sends constant photo updates, and creates an environment kids don't want to leave at pickup.",
  },
  {
    q: "My child has speech or developmental delays. Can you help?",
    a: "Yes. Rabecca and her team have a strong track record with speech delays, developmental differences, and unique learning needs. One parent shared that her son's speech, listening, and social engagement improved dramatically because the team took time to figure out how he learns best.",
  },
  {
    q: "I'm a first-time parent and terrified. How does the transition work?",
    a: "This is the most common feeling families bring through the door. The team keeps constant communication — photos, updates, stories throughout the day — plus the extra reassurance that makes the drop-off feel manageable.",
  },
  {
    q: "What does a day here actually look like?",
    a: "A blend of structured learning and joyful play: letter recognition on learning cards, creative art projects, outdoor exploration, gardening and harvesting, storytime on play mats, building and sensory play — woven together in a way that feels natural, not rigid.",
  },
  {
    q: "Hours and ages?",
    a: "Open Monday through Friday, 6:30 AM to 6:00 PM, closed weekends. We welcome children starting as young as 4 months old through kindergarten age.",
  },
  {
    q: "How do I secure a spot?",
    a: "Spots here are genuinely in high demand — longtime families advise prospective parents not to lose their slot if offered one. Call (503) 317-3811 as early as possible to ask about availability and the waitlist.",
  },
];

const businessContact = {
  name: "Laugh & Learn Childcare",
  address: "23445 NW Glisan St",
  city: "Wood Village",
  state: "OR",
  zip: "97060",
  phone: "(503) 317-3811",
};

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function CountUp({ to, suffix = "" }: { to: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(to);

  useEffect(() => {
    if (!inView) return;
    // If the stat is purely numeric, animate; otherwise just reveal.
    const numeric = /^\d+(\.\d+)?$/.test(to) ? parseFloat(to) : null;
    if (numeric === null) {
      setDisplay(to);
      return;
    }
    const mv = { n: 0 };
    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate(v) {
        setDisplay(Number.isInteger(numeric) ? Math.round(v).toString() : v.toFixed(1));
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-[var(--brand-accent)]">{suffix}</span>
    </span>
  );
}

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.04 }}
      className="border-b border-[var(--brand-cocoa)]/15"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-8 py-7 text-left group"
      >
        <span className="font-[family-name:var(--font-display)] text-lg md:text-2xl text-[var(--brand-cocoa)] leading-snug group-hover:text-[var(--brand-accent)] transition-colors">
          {q}
        </span>
        <span
          className="rotate-on-open shrink-0 mt-1 md:mt-2 w-9 h-9 rounded-full border border-[var(--brand-cocoa)]/20 grid place-items-center text-[var(--brand-cocoa)] group-hover:border-[var(--brand-accent)] group-hover:text-[var(--brand-accent)]"
          data-open={open}
        >
          <Plus className="w-4 h-4" />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-8 pr-14 text-[var(--brand-muted)] text-base leading-relaxed max-w-3xl">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function BusinessPage() {
  return (
    <>
      {/* ── HERO — warm cream, full-bleed portrait of home life ── */}
      <section className="relative bg-[var(--brand-bg)] paper-grain overflow-hidden">
        {/* Nav */}
        <nav className="relative z-50 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex items-center justify-between">
            <span className="font-[family-name:var(--font-display)] text-lg italic tracking-tight text-[var(--brand-cocoa)]">
              Laugh &amp; Learn
            </span>
            <div className="hidden md:flex items-center gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[var(--brand-cocoa)]/70 hover:text-[var(--brand-cocoa)] text-sm tracking-wide transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="tel:+15033173811"
              className="inline-flex items-center gap-2 border-b border-[var(--brand-cocoa)] text-[var(--brand-cocoa)] pb-1 text-sm font-[family-name:var(--font-mono)] hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)] transition-colors"
            >
              (503) 317-3811
            </a>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-6 lg:pt-10 pb-24 lg:pb-32 grid lg:grid-cols-12 gap-10 lg:items-center">
          {/* Left: display text */}
          <div className="lg:col-span-7">
            <motion.p
              className="text-[var(--brand-primary)] text-xs tracking-[0.3em] uppercase mb-8 font-[family-name:var(--font-mono)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              ✦ Wood Village, Oregon · Est. 2010
            </motion.p>

            <motion.h1
              className="font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--brand-cocoa)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              A small house
              <br />
              <span className="font-[family-name:var(--font-hand)] not-italic text-[var(--brand-accent)] font-normal">full of</span>{" "}
              big days.
            </motion.h1>

            <motion.p
              className="mt-10 text-[var(--brand-muted)] text-base md:text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Fifteen years of reading, gardening, and growing up with Rabecca. Infants through kindergarten, five days a week.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a
                href="#visit"
                className="inline-flex items-center gap-3 bg-[var(--brand-cocoa)] text-[var(--brand-bg)] px-7 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-accent)] transition"
              >
                Ask about a spot <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-wider">
                ★★★★★ 13 REVIEWS · GOOGLE
              </span>
            </motion.div>
          </div>

          {/* Right: stacked polaroids */}
          <div className="lg:col-span-5 relative h-[420px] md:h-[520px] lg:h-[580px]">
            <motion.div
              className="absolute top-2 right-2 w-[62%] polaroid rotate-[4deg]"
              initial={{ opacity: 0, y: 30, rotate: 8 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <div className="aspect-[3/4]">
                <img src="/photos/photo-10.webp" alt="Child harvesting fresh corn" />
              </div>
              <p className="text-center text-xs text-[var(--brand-cocoa)] italic font-[family-name:var(--font-display)] mt-2">
                Sweet corn · October
              </p>
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 w-[58%] polaroid -rotate-[6deg]"
              initial={{ opacity: 0, y: 30, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              <div className="aspect-[4/5]">
                <img src="/photos/photo-4.webp" alt="Reading together on the play mat" />
              </div>
              <p className="text-center text-xs text-[var(--brand-cocoa)] italic font-[family-name:var(--font-display)] mt-2">
                Storytime, mid-morning
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STICKY QUOTE (pull quote section) ── */}
      <section className="relative bg-[var(--brand-cocoa)] text-[var(--brand-bg)] py-28 lg:py-36 px-6 lg:px-12 paper-grain overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-[var(--brand-accent)] text-xs font-[family-name:var(--font-mono)] tracking-[0.3em] uppercase mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ✦ From Melissa Lopez, grandmother of five
          </motion.p>
          <motion.blockquote
            className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4.2vw,3.3rem)] leading-[1.15] italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            &ldquo;If you&apos;re lucky enough to get a spot, don&apos;t lose it.
            You won&apos;t find better care in the Portland Metro area.&rdquo;
          </motion.blockquote>
          <motion.p
            className="mt-10 text-sm text-[var(--brand-bg)]/60 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            15.5 years · 5 grandchildren · still in touch
          </motion.p>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="relative bg-[var(--brand-bg)] border-t border-[var(--brand-cocoa)]/10 border-b border-[var(--brand-cocoa)]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="relative px-6 md:px-10 py-14 md:py-20 border-r last:border-r-0 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:last:border-r-0 border-[var(--brand-cocoa)]/10 stat-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4.5rem)] leading-none text-[var(--brand-cocoa)]">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 text-xs font-[family-name:var(--font-mono)] uppercase tracking-[0.25em] text-[var(--brand-muted)]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── A DAY AT LAUGH & LEARN (numbered chapters) ── */}
      <section
        id="days"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)] paper-grain overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-20 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--brand-primary)] text-xs tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-mono)]">
              ✦ One of our days
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[var(--brand-cocoa)]">
              Not a curriculum.
              <br />
              <span className="italic">A rhythm.</span>
            </h2>
          </motion.div>

          <div className="space-y-0 border-t border-[var(--brand-cocoa)]/15">
            {chapters.map((c, i) => (
              <motion.div
                key={c.n}
                className="grid md:grid-cols-12 gap-8 py-10 border-b border-[var(--brand-cocoa)]/15 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <div className="md:col-span-2 font-[family-name:var(--font-mono)] text-[var(--brand-accent)] text-sm tracking-widest">
                  {c.n}
                </div>
                <h3 className="md:col-span-4 font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--brand-cocoa)] leading-snug">
                  {c.label}
                </h3>
                <p className="md:col-span-6 text-[var(--brand-muted)] text-base leading-relaxed">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GARDEN BAND (horizontal photo strip) ── */}
      <section className="py-0 bg-[var(--brand-bg-alt)] overflow-hidden">
        <div className="py-4">
          <div className="flex gap-5 marquee-track w-max">
            {[
              "/photos/photo-2.webp",
              "/photos/photo-10.webp",
              "/photos/photo-3.webp",
              "/photos/photo-9.webp",
              "/photos/photo-8.webp",
              "/photos/photo-5.webp",
              "/photos/photo-7.webp",
              "/photos/photo-1.webp",
              "/photos/photo-2.webp",
              "/photos/photo-10.webp",
              "/photos/photo-3.webp",
              "/photos/photo-9.webp",
              "/photos/photo-8.webp",
              "/photos/photo-5.webp",
              "/photos/photo-7.webp",
              "/photos/photo-1.webp",
            ].map((src, i) => (
              <div
                key={i}
                className="h-52 md:h-72 w-64 md:w-80 flex-shrink-0 overflow-hidden"
              >
                <img
                  src={src}
                  alt="Days at Laugh &amp; Learn"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO (services) ── */}
      <section
        id="services"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)] paper-grain overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-16 lg:mb-20 grid lg:grid-cols-12 gap-8 items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="lg:col-span-7">
              <p className="text-[var(--brand-primary)] text-xs tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-mono)]">
                ✦ What we do, in plain words
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] leading-[1.02] text-[var(--brand-cocoa)]">
                Six ways we take
                <br />
                <span className="italic">care of your kid.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-3">
              <p className="text-[var(--brand-muted)] text-base md:text-lg leading-relaxed max-w-md lg:ml-auto">
                From four-month-olds to kindergarten graduates, every program is tuned to the child in front of us — not a checklist.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((s, i) => (
              <motion.article
                key={s.name}
                className="letterpress p-8 md:p-9"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-full bg-[var(--brand-bg-alt)] grid place-items-center">
                    <s.icon className="w-5 h-5 text-[var(--brand-cocoa)]" strokeWidth={1.6} />
                  </div>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.25em] text-[var(--brand-accent)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--brand-cocoa)] leading-tight">
                  {s.name}
                </h3>
                <p className="mt-1 text-[var(--brand-accent)] italic font-[family-name:var(--font-display)] text-sm">
                  {s.sub}
                </p>
                <p className="mt-5 text-[var(--brand-muted)] text-sm leading-relaxed">
                  {s.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RABECCA (owner portrait) ── */}
      <section
        id="rabecca"
        className="py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg)] paper-grain overflow-hidden"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="polaroid rotate-[-2deg] max-w-sm mx-auto md:mx-0">
              <div className="aspect-[4/5]">
                <img src="/photos/photo-6.webp" alt="Learning letters in the kitchen" />
              </div>
              <p className="text-center text-xs text-[var(--brand-cocoa)] italic font-[family-name:var(--font-display)] mt-2">
                Letters at the kitchen table
              </p>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[var(--brand-primary)] text-xs tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-mono)]">
              ✦ The one who&apos;s been here all along
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] text-[var(--brand-cocoa)] leading-[1.05]">
              <span className="hand-underline">Rabecca</span> has done this
              <br />
              for fifteen years.
            </h2>
            <div className="mt-10 space-y-5 text-[var(--brand-muted)] text-base leading-relaxed max-w-lg">
              <p>
                She knows which four-year-old is about to cry and which one
                just needs a snack. She kneels next to the kid who isn&apos;t
                talking yet and figures out how they learn best. She texts
                nervous first-time moms a photo before they&apos;ve finished
                their morning coffee.
              </p>
              <p>
                Families stay for a decade. Five grandchildren in one family.
                A speech-delayed three-year-old who now loves school. The
                people who leave here don&apos;t really leave.
              </p>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md font-[family-name:var(--font-mono)]">
              <div>
                <dt className="text-xs tracking-widest text-[var(--brand-primary)] uppercase">Years</dt>
                <dd className="text-2xl text-[var(--brand-cocoa)] mt-1">15+</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-[var(--brand-primary)] uppercase">Ages</dt>
                <dd className="text-2xl text-[var(--brand-cocoa)] mt-1">4mo — K</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-[var(--brand-primary)] uppercase">Open</dt>
                <dd className="text-2xl text-[var(--brand-cocoa)] mt-1">6:30am</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* ── FAMILIES (pull-quote marquee) ── */}
      <section id="families" className="py-24 bg-[var(--brand-bg-alt)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14">
          <p className="text-[var(--brand-primary)] text-xs tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-mono)]">
            ✦ What families say
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.05] text-[var(--brand-cocoa)] max-w-3xl">
            Five-star Google reviews,
            <br />
            <span className="italic">written by the people who matter.</span>
          </h2>
        </div>
        <div className="testimonial-marquee flex gap-6 w-max px-6">
          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[360px] bg-[var(--brand-bg)] p-7 border border-[var(--brand-cocoa)]/10 relative"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-3.5 h-3.5 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>
              <p className="font-[family-name:var(--font-display)] text-[var(--brand-cocoa)] text-base leading-snug italic mb-6">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="pt-4 border-t border-[var(--brand-cocoa)]/10">
                <p className="text-sm text-[var(--brand-cocoa)]">{r.author}</p>
                <p className="text-xs text-[var(--brand-muted)] font-[family-name:var(--font-mono)] tracking-wide mt-1">
                  {r.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)] paper-grain overflow-hidden"
      >
        <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--brand-primary)] text-xs tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-mono)]">
              ✦ Parents ask
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.05] text-[var(--brand-cocoa)]">
              The questions
              <br />
              <span className="italic">we&apos;ve heard most.</span>
            </h2>
            <p className="mt-8 text-[var(--brand-muted)] text-sm leading-relaxed max-w-sm">
              Can&apos;t find the answer? Call Rabecca directly — she picks up whenever she&apos;s not mid-storytime.
            </p>
          </motion.div>
          <div className="lg:col-span-8">
            <div className="border-t border-[var(--brand-cocoa)]/15">
              {faqs.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISIT / CONTACT ── */}
      <section
        id="visit"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg)] paper-grain overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--brand-primary)] text-xs tracking-[0.3em] uppercase mb-6 font-[family-name:var(--font-mono)]">
              ✦ Come see it
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] text-[var(--brand-cocoa)] max-w-3xl">
              Spots go to the families
              <br />
              <span className="italic text-[var(--brand-accent)]">who show up.</span>
            </h2>
          </motion.div>

          <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-9 font-[family-name:var(--font-mono)] text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--brand-primary)] mb-2">
                  Call
                </p>
                <a
                  href="tel:+15033173811"
                  className="text-3xl md:text-4xl text-[var(--brand-cocoa)] hover:text-[var(--brand-accent)] transition-colors font-[family-name:var(--font-display)]"
                >
                  (503) 317-3811
                </a>
                <p className="mt-2 text-[var(--brand-muted)]">
                  Rabecca answers — even from storytime.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--brand-primary)] mb-2">
                  Find us
                </p>
                <p className="text-[var(--brand-cocoa)] text-base leading-relaxed">
                  {businessContact.address}
                  <br />
                  {businessContact.city}, {businessContact.state} {businessContact.zip}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${businessContact.address}, ${businessContact.city}, ${businessContact.state} ${businessContact.zip}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-widest text-[var(--brand-accent)] hover:text-[var(--brand-cocoa)] transition-colors"
                >
                  Get directions <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--brand-primary)] mb-2">
                  Hours
                </p>
                <p className="text-[var(--brand-cocoa)] text-base">
                  Monday – Friday · 6:30 AM – 6:00 PM
                </p>
                <p className="text-[var(--brand-muted)] text-xs mt-1">
                  Closed weekends
                </p>
              </div>
              <div className="pt-6 border-t border-[var(--brand-cocoa)]/15">
                <a
                  href="tel:+15033173811"
                  className="inline-flex items-center gap-3 bg-[var(--brand-cocoa)] text-[var(--brand-bg)] px-7 py-4 rounded-full text-sm font-medium hover:bg-[var(--brand-accent)] transition font-[family-name:var(--font-source-sans-3)]"
                >
                  <Phone className="w-4 h-4" /> Call about a spot
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                className="relative overflow-hidden border border-[var(--brand-cocoa)]/10 bg-[var(--brand-bg-alt)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8 }}
              >
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${businessContact.address}, ${businessContact.city}, ${businessContact.state} ${businessContact.zip}`
                  )}&z=15&output=embed`}
                  width="100%"
                  height="440"
                  style={{ border: 0, filter: "sepia(0.15) saturate(0.9)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Laugh & Learn Childcare map"
                />
                <div className="p-6 border-t border-[var(--brand-cocoa)]/10 flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-[var(--brand-accent)] shrink-0" />
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-[var(--brand-cocoa)] text-base">
                      Just off NW Glisan, 20 minutes from downtown Portland.
                    </p>
                    <p className="text-[var(--brand-muted)] text-xs font-[family-name:var(--font-mono)] tracking-wide mt-1">
                      Easy drop-off · quiet residential street
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[var(--brand-cocoa)] text-[var(--brand-bg)]/80 py-14 px-6 lg:px-12 paper-grain overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl italic">
              Laugh &amp; Learn
            </p>
            <p className="text-xs mt-2 font-[family-name:var(--font-mono)] tracking-wide opacity-70">
              Wood Village · since 2010
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-1 text-sm">
            <a href="tel:+15033173811" className="hover:text-[var(--brand-accent)] transition-colors font-[family-name:var(--font-mono)]">
              (503) 317-3811
            </a>
            <span className="text-xs opacity-70 font-[family-name:var(--font-mono)]">
              23445 NW Glisan St · Wood Village, OR
            </span>
          </div>
          <div className="text-xs font-[family-name:var(--font-mono)] opacity-70 tracking-wider">
            © 2026 Laugh &amp; Learn Childcare
          </div>
        </div>
      </footer>

      <ClickToCall phone="(503) 317-3811" />
    </>
  );
}
