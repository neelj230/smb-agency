// Current Electric — Medford, OR — story-driven redesign around the Kristi Lankford review
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import type { NavLink } from "@/components/types";
import { motion } from "framer-motion";
import { Phone, MapPin, ArrowUpRight, Zap } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

// Verbatim, real reviews only
const reviews = [
  {
    text: "I drive bus for RVTD and I see a lot of people drive by stalled cars in intersections, but not this guy. Today I watched him pull over, run through traffic (pretty fast for a middle aged guy, I might add!) and push a car out of the turn lane for someone… saving 30 plus people from getting stuck in the miserable, muggy heat today. You have my next electrical project!",
    author: "Kristi Lankford",
    meta: "RVTD bus driver · May 2020",
  },
  {
    text: "Great experience. Quick response. Very professional. Fair price. Highly recommend.",
    author: "Elise Sykes",
    meta: "Google · June 2024",
  },
  {
    text: "We have relied on Cory for electrical repair for years. We have always had a good experience.",
    author: "M. Chirgwin",
    meta: "Repeat customer · Aug 2022",
  },
];

const workList = [
  { no: "01", name: "Panel upgrades", note: "Old breaker boxes → safe, modern capacity" },
  { no: "02", name: "Troubleshooting", note: "Dead outlets, tripped breakers, mystery faults" },
  { no: "03", name: "Interior lighting", note: "Recessed, LED strip, accent — see photo 02" },
  { no: "04", name: "Cabin & rural wiring", note: "Southern Oregon properties, any distance" },
  { no: "05", name: "Residential service", note: "Fans, outlets, rewires, inspections" },
  { no: "06", name: "Safety checks", note: "Before you buy, before it becomes a problem" },
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
          <a href="#" className="flex items-center gap-2.5 text-white">
            <Zap className="w-4 h-4 text-[var(--brand-accent)] fill-[var(--brand-accent)]" />
            <span className="font-[family-name:var(--font-display)] text-sm tracking-[0.3em] uppercase">
              Current / Electric
            </span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <a href="tel:+15412100677" className="text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] font-mono">
            (541) 210-0677
          </a>
        </div>
      </nav>

      {/* ── HERO: 3-word statement, dark, asymmetric ── */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#0B0B14] text-white">
        {/* Ambient glow */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--brand-accent)]/15 blur-[140px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--brand-primary)]/60 blur-[120px]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-36 lg:pt-44 pb-16 min-h-[100svh] flex flex-col justify-between">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-white/60 text-[10px] uppercase tracking-[0.35em] font-mono"
          >
            Medford, Oregon · Cory, Owner · Est. a while ago
          </motion.p>

          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35 }}
              className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,13vw,12rem)] leading-[0.88] tracking-[-0.04em] font-light"
            >
              He pulls<br />
              <span className="italic text-[var(--brand-accent)]">over.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 text-white/70 text-base md:text-lg leading-relaxed max-w-xl"
            >
              A bus driver once watched Cory stop his truck in traffic to push a
              stranger&apos;s stalled car out of an intersection. Then he went back
              to work. That&apos;s Current Electric.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-10 flex items-center gap-6 flex-wrap"
            >
              <a href="tel:+15412100677" className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-black px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition">
                Call Cory <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="#reviews" className="text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] border-b border-white/30 pb-0.5">
                Read the whole review
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-3 md:grid-cols-3 gap-8 md:gap-16 max-w-2xl text-xs uppercase tracking-[0.2em] font-mono border-t border-white/10 pt-8"
          >
            <div>
              <span className="block text-3xl md:text-4xl font-[family-name:var(--font-display)] text-white font-light normal-case tracking-tight mb-1">5★</span>
              <span className="text-white/50">Google rating</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-[family-name:var(--font-display)] text-white font-light normal-case tracking-tight mb-1">10+</span>
              <span className="text-white/50">Years in the Valley</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-[family-name:var(--font-display)] text-white font-light normal-case tracking-tight mb-1">Same<span className="text-[var(--brand-accent)]">·</span>day</span>
              <span className="text-white/50">Most replies</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[var(--brand-accent)] text-black border-y-2 border-black">
        <MarqueeTicker
          items={["Panel upgrades", "Troubleshooting", "Lighting", "Cabin wiring", "Safety checks", "Same-day response", "Fair pricing, no games"]}
          separator="⚡"
          speed={28}
          variant="bold"
        />
      </div>

      {/* ── THE STORY — full review, editorial ── */}
      <section id="story" className="bg-[#FAF8F3] text-[var(--brand-text)] py-28 lg:py-40 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeUp} className="text-[var(--brand-muted)] text-[10px] uppercase tracking-[0.3em] font-mono mb-10">
            The story customers tell first ↓
          </motion.p>
          <motion.blockquote {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.25] font-light">
              &ldquo;I drive bus for RVTD and I see a lot of people drive by stalled
              cars in intersections, <span className="italic">but not this guy.</span>{" "}
              I watched him pull over, run through traffic and push a car out of the
              turn lane for someone&hellip; saving 30 plus people from getting stuck
              in the muggy heat. Then he just jogs back to his truck like he does it
              every day. You have my next electrical project.&rdquo;
            </p>
            <footer className="mt-12 flex items-baseline gap-4 text-sm border-t border-black/10 pt-6">
              <span className="font-semibold">Kristi Lankford</span>
              <span className="text-[var(--brand-muted)] font-mono text-xs">RVTD bus driver · 5★ Google</span>
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ── PHOTO SPLIT — small portfolio (only 3 photos exist, use them well) ── */}
      <section className="bg-black py-20 lg:py-28 px-6 lg:px-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-4 md:gap-6">
          <motion.div {...fadeUp} className="md:col-span-7 relative aspect-[4/3] md:aspect-auto md:min-h-[520px] overflow-hidden">
            <img src="/photos/photo-2.webp" alt="Interior with Cory's LED strip lighting installation along a wood-paneled windowsill" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <span className="absolute top-4 left-4 text-white/80 font-mono text-[10px] tracking-[0.25em] uppercase bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
              01 · LED strip install · Residential
            </span>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            <div className="relative aspect-[4/3] overflow-hidden flex-1">
              <img src="/photos/photo-1.webp" alt="Rustic cabin interior Cory has serviced" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-4 left-4 text-white/80 font-mono text-[10px] tracking-[0.25em] uppercase bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
                02 · Rural cabin
              </span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden flex-1 bg-black flex items-center justify-center">
              <img src="/photos/photo-3.webp" alt="Current Electric neon loop logo" className="w-4/5 h-4/5 object-contain" loading="lazy" />
              <span className="absolute top-4 left-4 text-white/80 font-mono text-[10px] tracking-[0.25em] uppercase bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
                03 · The loop
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WORK INDEX ── */}
      <section id="work" className="bg-[#FAF8F3] py-28 lg:py-40 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="mb-16 md:mb-20 flex items-end justify-between gap-8">
            <div>
              <p className="text-[var(--brand-muted)] text-[10px] uppercase tracking-[0.3em] font-mono mb-5">
                What Cory does
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] font-light">
                Six jobs.<br />
                One phone to call.
              </h2>
            </div>
            <p className="hidden md:block text-[var(--brand-muted)] text-sm max-w-xs leading-relaxed">
              Residential and light commercial. Medford, the Rogue Valley, and cabins well beyond the pavement.
            </p>
          </motion.div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {workList.map((item, i) => (
              <motion.div
                key={item.no}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid grid-cols-[3rem_1fr] md:grid-cols-[3rem_1fr_1.4fr] gap-4 md:gap-8 items-center py-7"
              >
                <span className="font-mono text-[var(--brand-muted)] text-xs">{item.no}</span>
                <span className="font-[family-name:var(--font-display)] text-xl md:text-3xl font-light">
                  {item.name}
                </span>
                <span className="col-span-2 md:col-span-1 text-[var(--brand-muted)] text-sm leading-relaxed">
                  {item.note}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS — three real ones ── */}
      <section id="reviews" className="bg-black text-white py-28 lg:py-40 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.p {...fadeUp} className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-5">
            Three people, in their own words
          </motion.p>
          <motion.h2 {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,4rem)] leading-[1] tracking-[-0.02em] font-light mb-20">
            No names invented.<br />
            <span className="italic text-[var(--brand-accent)]">No words edited.</span>
          </motion.h2>
          <div className="space-y-20 lg:space-y-28">
            {reviews.map((r, i) => (
              <motion.blockquote
                key={i}
                {...fadeUp}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 items-start border-t border-white/10 pt-10"
              >
                <span className="font-mono text-white/40 text-xs tracking-[0.25em]">
                  0{i + 1}
                </span>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl md:text-2xl lg:text-3xl leading-[1.3] font-light">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <footer className="mt-8 flex items-baseline gap-4 text-sm">
                    <span className="font-semibold">{r.author}</span>
                    <span className="text-white/40 font-mono text-xs">{r.meta}</span>
                  </footer>
                </div>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[var(--brand-accent)] text-black py-28 lg:py-40 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.p {...fadeUp} className="text-black/60 text-[10px] uppercase tracking-[0.3em] font-mono mb-6">
            For the stuff that needs a professional
          </motion.p>
          <motion.h2 {...fadeUp} transition={{ duration: 0.8, delay: 0.1 }} className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,10vw,9rem)] leading-[0.92] tracking-[-0.03em] font-light">
            Just call.
          </motion.h2>

          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }} className="mt-14 grid md:grid-cols-3 gap-10 md:gap-6 border-t border-black/20 pt-10">
            <div>
              <p className="text-black/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-3">Phone</p>
              <a href="tel:+15412100677" className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light hover:italic transition">
                (541) 210-0677
              </a>
            </div>
            <div>
              <p className="text-black/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-3">Based in</p>
              <p className="text-base leading-relaxed">2508 Jackson Drive<br />Medford, OR 97504</p>
            </div>
            <div>
              <p className="text-black/50 text-[10px] uppercase tracking-[0.3em] font-mono mb-3">Hours</p>
              <p className="text-base leading-relaxed font-mono">Mon – Fri<br />8:00 AM – 4:00 PM</p>
            </div>
          </motion.div>

          <motion.a
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.35 }}
            href="tel:+15412100677"
            className="inline-flex items-center gap-3 mt-16 bg-black text-[var(--brand-accent)] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-neutral-900 transition"
          >
            <Phone className="w-3.5 h-3.5" /> (541) 210-0677
          </motion.a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black text-white/60 py-12 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-6 text-xs font-mono uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2"><Zap className="w-3 h-3 text-[var(--brand-accent)]" /> Current Electric LLC</span>
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Medford, OR · Serving the Rogue Valley</span>
          <span>© 2026 — Wired right</span>
        </div>
      </footer>

      <ClickToCall phone="(541) 210-0677" />
    </>
  );
}
