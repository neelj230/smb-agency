"use client";

import { Navbar } from "@/components/Navbar";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import type { NavLink, Review, FAQItem } from "@/components/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Star,
  Check,
  ShieldCheck,
  Leaf,
  Droplets,
  Sparkles,
  Package,
  Truck,
  CreditCard,
  ArrowRight,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Journal", href: "#journal" },
  { label: "Support", href: "#faq" },
];

const reviews: Review[] = [
  {
    author: "Kai Tanaka",
    text: "I've tried everything from high-end serums to drugstore basics. Essentia is the first product where I actually saw results in two weeks. My skin has never been this calm and clear. I threw out all my other travel-sized stuff I've tried.",
    rating: 5,
    source: "google",
  },
  {
    author: "Sarah Mitchell",
    text: "Not gonna lie, I was super skeptical about a one-product routine. But my skin was freaking out from all the stuff I was using. Two months with Essentia and my coworkers keep asking what I'm doing differently!",
    rating: 5,
    source: "google",
  },
  {
    author: "Jennifer Thompson",
    text: "My skin hated EVERYTHING. Literally every product I tried would leave me red and blotchy. Essentia is the only thing that hasn't irritated my skin — and it actually made it better. I use it morning and night.",
    rating: 5,
    source: "google",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Will simplifying my routine really improve my skin?",
    answer:
      "Yes. Most skin issues come from over-processing with too many products. Our five-ingredient formula gives your skin exactly what it needs — nothing more, nothing less.",
  },
  {
    question: "How long until I see results?",
    answer:
      "28 days is all it takes to see significant improvements in texture, tone, and overall skin health. Many customers report visible changes in as little as two weeks.",
  },
  {
    question: "Is Essentia suitable for all skin types?",
    answer:
      "Absolutely. Our formula was developed with dermatologists and tested across diverse skin types and conditions. The five core ingredients work in harmony with your skin, not against it.",
  },
  {
    question: "How does Essentia compare to my multi-step routine?",
    answer:
      "One jar of Essentia replaces your cleanser, serum, moisturizer, and treatment. Fewer products, better results, and significant savings over time.",
  },
  {
    question: "Is the refill system easy to use?",
    answer:
      "Simply twist off the empty pod, click in the refill, and you are good to go. It takes about 5 seconds and produces 80% less packaging waste.",
  },
  {
    question: "Do you offer samples before committing?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you do not love it, we will refund your purchase — no questions asked.",
  },
];

const ingredients = [
  { name: "Ceramide NP", label: "Ingredient 01" },
  { name: "Peptides", label: "Ingredient 02" },
  { name: "Niacinamide", label: "Ingredient 03" },
  { name: "Squalane", label: "Ingredient 04" },
  { name: "Glycerin", label: "Ingredient 05" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// ─── CREAM JAR (realistic glass jar with cream swirl) ──────────────────────
function CreamJar({ size = "lg" }: { size?: "md" | "lg" }) {
  const s =
    size === "lg" ? "w-64 h-44 lg:w-80 lg:h-56" : "w-52 h-36 lg:w-64 lg:h-44";
  return (
    <div className={`relative ${s}`}>
      {/* Cream swirl on top */}
      <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[60%] h-[35%] z-10">
        <div
          className="w-full h-full rounded-[50%_50%_40%_40%] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          style={{
            background:
              "radial-gradient(ellipse at 40% 60%, white 0%, #F5F2EE 50%, #EDE8E2 100%)",
          }}
        />
      </div>
      {/* Lid */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[18%] rounded-t-xl z-[5]"
        style={{
          background:
            "linear-gradient(180deg, #D8D4CE 0%, #C0BCB4 60%, #B0ACA4 100%)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      />
      {/* Jar body */}
      <div
        className="w-full h-full rounded-xl relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #E0DCD6 0%, #D0CBC3 30%, #C5C0B8 60%, #D0CBC3 85%, #DAD6CE 100%)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="absolute top-0 left-0 w-[25%] h-full bg-gradient-to-r from-white/15 to-transparent" />
        <div className="absolute top-0 right-0 w-[6%] h-full bg-gradient-to-l from-[rgba(0,0,0,0.06)] to-transparent" />
      </div>
      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] lg:text-xs tracking-[0.25em] uppercase font-medium text-[#807A72]">
          Essentia
        </span>
      </div>
    </div>
  );
}

// ─── WORD REVEAL (scroll-linked word-by-word color transition) ──────────────

const revealLine1 = "Five proven ingredients that actually work.".split(" ");
const revealLine2 = "Less bottles. Better skin. Smarter routine.".split(" ");
const allRevealWords = [...revealLine1, ...revealLine2];

function RevealWord({
  word,
  index,
  total,
  progress,
  phaseStart,
  phaseEnd,
}: {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  phaseStart: number;
  phaseEnd: number;
}) {
  const range = phaseEnd - phaseStart;
  const wordStart = phaseStart + (index / total) * range;
  const wordEnd = phaseStart + ((index + 1) / total) * range;
  const color = useTransform(
    progress,
    [wordStart, wordEnd],
    ["#d4d4d4", "#1A1A1A"],
  );
  return (
    <motion.span style={{ color }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
}

// ─── SCROLL CARDS ────────────────────────────────────────────────────────────

const scrollCards = [
  {
    num: "01",
    title: "Five ingredients.\nNothing more.",
    desc: "We use only what works: ceramides to repair, peptides to renew, niacinamide to calm, squalane to hydrate, and glycerin to protect. Nothing to irritate your skin, nothing to waste your money. Just the essentials that deliver real results.",
  },
  {
    num: "02",
    title: "Proven by people\nlike you.",
    desc: 'In real-world testing, 94% of users saw dramatic improvements in just 28 days. Not subtle changes\u2014we\'re talking about the "what have you done differently?" kind of results that friends notice and comment on.',
  },
  {
    num: "03",
    title: "Quality over quantity.",
    desc: "We spend more on fewer, better ingredients. No fillers, no fragrance, no unnecessary additives. Every batch is third-party tested for purity and potency.",
  },
  {
    num: "04",
    title: "The last skincare\nyou'll ever need.",
    desc: "One jar. Morning and night. Replace your cleanser, serum, moisturizer, and treatment with a single product that actually delivers on its promises.",
  },
];

function ScrollCard({
  num,
  title,
  desc,
  progress,
  index,
  total,
  startOffset,
}: {
  num: string;
  title: string;
  desc: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
  startOffset: number;
}) {
  const cardRange = 1 - startOffset;
  const segment = cardRange / total;
  const start = startOffset + index * segment;
  const end = startOffset + (index + 1) * segment;
  const fadeIn = start + segment * 0.15;
  const holdStart = start + segment * 0.25;
  const holdEnd = start + segment * 0.7;
  const fadeOut = start + segment * 0.85;

  const opacity = useTransform(
    progress,
    [start, fadeIn, holdStart, holdEnd, fadeOut, end],
    [0, 0, 1, 1, 0, 0],
  );
  const y = useTransform(
    progress,
    [start, holdStart, holdEnd, end],
    [40, 0, 0, -30],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute top-[50%] -translate-y-1/2 left-8 lg:left-20 z-10 max-w-[520px]"
    >
      <span className="inline-block mb-5 px-4 py-2 text-sm rounded-full bg-[var(--brand-sage)] text-[var(--brand-text)] font-medium">
        {num}
      </span>
      <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.04em] leading-[1.08] text-[var(--brand-text)] whitespace-pre-line">
        {title}
      </h2>
      <p className="mt-6 text-[var(--brand-muted)] leading-relaxed max-w-[440px]">
        {desc}
      </p>
    </motion.div>
  );
}

// ─── UNIFIED HERO + WORD REVEAL + SCROLL CARDS ─────────────────────────────
// Phases: hero (0-0.08) → transition (0.08-0.12) → word reveal (0.12-0.38) → cards (0.40-1.0)

function HeroScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── PHASE 1: Hero (0 → 0.08) ──
  const heroOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0.05, 0.1], [0, -60]);

  // ── PHASE 2: "We strip away..." text (0.06 → 0.12, then fades) ──
  const stripOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.09, 0.12, 0.15],
    [0, 1, 1, 0],
  );

  // ── PHASE 3: Word reveal section (0.12 → 0.38) ──
  const wordRevealOpacity = useTransform(
    scrollYProgress,
    [0.11, 0.14, 0.36, 0.4],
    [0, 1, 1, 0],
  );

  // ── PHASE 4: Cards (0.40 → 1.0) ──
  // Cards handled by ScrollCard components with startOffset=0.40

  // ── JAR: moves through all phases ──
  // Hero: top-right → Word reveal: moves to bottom-center → Cards: right side, vertically centered
  const jarX = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.36, 0.43],
    [0, 0, -120, -120, 0],
  );
  const jarY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.36, 0.43, 1],
    [0, 60, 200, 200, 180, 160],
  );
  const jarScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.36, 0.43],
    [1, 0.8, 0.8, 1],
  );

  return (
    <div ref={containerRef} className="relative" style={{ height: "900vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--brand-bg)]">
        {/* Essentia watermark — always visible */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
          <p className="text-[clamp(8rem,20vw,18rem)] font-bold tracking-[-0.06em] text-[var(--brand-text)] opacity-[0.04] leading-[0.85] whitespace-nowrap">
            Essentia
          </p>
        </div>

        {/* ── HERO CONTENT ── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute top-24 left-6 lg:left-16 z-10 max-w-[560px]"
        >
          <h1 className="text-[clamp(3rem,6.5vw,5.5rem)] font-semibold tracking-[-0.05em] leading-[1.02] text-[var(--brand-text)]">
            Your healthiest skin revealed.
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[var(--brand-bg)]"
                  style={{
                    backgroundColor: [
                      "#D4A574",
                      "#8B6F5C",
                      "#C4956A",
                      "#A0785C",
                    ][i],
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[var(--brand-text)] text-[var(--brand-text)]"
                />
              ))}
            </div>
            <span className="text-sm text-[var(--brand-muted)]">
              2500+ Happy Customers
            </span>
          </div>
        </motion.div>

        {/* ── "WE STRIP AWAY..." TEXT (appears during hero→reveal transition) ── */}
        <motion.div
          style={{ opacity: stripOpacity }}
          className="absolute top-[55%] right-6 lg:right-16 z-30 max-w-[380px] text-right"
        >
          <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-[1.4] tracking-[-0.02em] text-[var(--brand-text)] italic">
            We strip away the unnecessary to focus on what truly works.
          </p>
        </motion.div>

        {/* ── WORD REVEAL SECTION ── */}
        <motion.div
          style={{ opacity: wordRevealOpacity }}
          className="absolute inset-0 flex items-center justify-center z-10 px-8"
        >
          <div className="max-w-[1200px] text-center">
            <p className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-[-0.04em] leading-[1.15]">
              {revealLine1.map((word, i) => (
                <RevealWord
                  key={`l1-${i}`}
                  word={word}
                  index={i}
                  total={allRevealWords.length}
                  progress={scrollYProgress}
                  phaseStart={0.14}
                  phaseEnd={0.35}
                />
              ))}
            </p>
            <p className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold tracking-[-0.04em] leading-[1.15] mt-1">
              {revealLine2.map((word, i) => (
                <RevealWord
                  key={`l2-${i}`}
                  word={word}
                  index={revealLine1.length + i}
                  total={allRevealWords.length}
                  progress={scrollYProgress}
                  phaseStart={0.14}
                  phaseEnd={0.35}
                />
              ))}
            </p>
          </div>
        </motion.div>

        {/* ── SCROLL CARDS ── */}
        {scrollCards.map((card, i) => (
          <ScrollCard
            key={card.num}
            num={card.num}
            title={card.title}
            desc={card.desc}
            progress={scrollYProgress}
            index={i}
            total={scrollCards.length}
            startOffset={0.4}
          />
        ))}

        {/* ── CREAM JAR (persists through all phases) ── */}
        <motion.div
          style={{ x: jarX, y: jarY, scale: jarScale }}
          className="absolute top-[12%] right-[8%] lg:right-[15%] z-20"
        >
          <CreamJar size="lg" />
        </motion.div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--brand-bg)]">
      {/* NAV */}
      <Navbar
        businessName="Essentia™"
        links={navLinks}
        ctaText="Order Now"
        ctaHref="#product"
        variant="light"
      />

      {/* ─── HERO + SCROLL CARDS (unified, jar moves with scroll) ─── */}
      <HeroScrollSection />

      {/* ─── PHILOSOPHY SECTIONS (scrolling feature blocks) ─── */}
      <section id="about" className="px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto space-y-32">
          {/* Block 1: Five ingredients */}
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            <div>
              <div className="w-10 h-10 rounded-full border border-[var(--brand-muted)] flex items-center justify-center mb-8">
                <Sparkles className="w-5 h-5 text-[var(--brand-muted)]" />
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1]">
                Five ingredients.
                <br />
                Nothing more.
              </h2>
              <p className="mt-6 text-[var(--brand-muted)] leading-relaxed max-w-md">
                We use only what works: ceramides to repair, peptides to renew,
                niacinamide to calm, squalane to hydrate, and glycerin to
                protect. Nothing to irritate your skin, nothing to waste your
                money. Just the essentials that deliver real results.
              </p>
            </div>
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#E8E4DE] to-[#D4CFC7]" />
          </motion.div>

          {/* Block 2: Quality over quantity */}
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            <div>
              <div className="w-10 h-10 rounded-full border border-[var(--brand-muted)] flex items-center justify-center mb-8">
                <ShieldCheck className="w-5 h-5 text-[var(--brand-muted)]" />
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1]">
                Quality over
                <br />
                quantity.
              </h2>
              <p className="mt-6 text-[var(--brand-muted)] leading-relaxed max-w-md">
                Instead of diluting our formula with cheap fillers and
                fancy-sounding extracts, we use higher concentrations of
                ingredients that actually work. Your skin gets exactly what it
                needs, delivered exactly where it needs it.
              </p>
            </div>
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#E8E4DE] to-[#D4CFC7]" />
          </motion.div>
        </div>
      </section>

      {/* ─── SKINCARE ROUTINE ─── */}
      <section className="px-8 lg:px-16 py-16 lg:py-24 bg-[var(--brand-bg-alt)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1]">
              Your new skincare routine is{" "}
              <span className="italic font-normal">beautifully simple.</span>
            </h2>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden bg-[#B8AFA3] aspect-[4/3]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-[0.15em] opacity-70">
                Step 01
              </span>
              <h3 className="text-xl font-medium mt-1">Distribute</h3>
              <p className="text-sm opacity-70 mt-1">
                Use half-upward strokes to apply evenly across face, including
                problem areas and jawline.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── INGREDIENTS ─── */}
      <section className="px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1] max-w-lg">
              Simple ingredients, powerful results.
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed max-w-lg">
              Each ingredient in Essentia was chosen for one reason: it works.
              No trendy botanicals that sound nice but do nothing. No irritating
              fragrances. Just five powerful ingredients working together to
              transform your skin.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Photo placeholder */}
            <motion.div
              {...fadeUp}
              className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#D8CFC2] to-[#C4B8A8]"
            />

            {/* Ingredient list */}
            <div className="flex flex-col justify-center">
              <motion.div {...fadeUp} className="mb-8">
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 text-sm border border-[var(--brand-text)] rounded-full px-5 py-2.5 hover:bg-[var(--brand-text)] hover:text-white transition-colors"
                >
                  Active Ingredients
                </a>
              </motion.div>
              <div className="space-y-0">
                {ingredients.map((item, i) => (
                  <motion.div
                    key={item.name}
                    {...stagger}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-center justify-between py-5 border-b border-[#E5E5E0]"
                  >
                    <span className="font-medium text-lg">{item.name}</span>
                    <span className="text-sm text-[var(--brand-muted)]">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM STATEMENT ─── */}
      <section className="px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1]">
              Most skincare is doing too much.
            </h2>
            <p className="mt-6 text-[var(--brand-muted)] leading-relaxed">
              Ever notice how your skin gets worse the more products you try?
              There&apos;s a reason. Most brands pile on ingredients, hoping a
              few might work. Your poor skin is overwhelmed, irritated, and
              nowhere near its natural best.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#D4C4B0] to-[#B8A898]"
          />
        </div>
      </section>

      {/* ─── RESULTS (sage green bg) ─── */}
      <section className="px-8 lg:px-16 py-16 lg:py-24 bg-[var(--brand-sage)]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1] italic">
              Real results{" "}
              <span className="not-italic">you can see and feel.</span>
            </h2>
          </motion.div>

          {/* Stats + proof */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-white/40 backdrop-blur-sm rounded-2xl p-8"
            >
              <p className="text-sm text-[var(--brand-muted)] mb-2">
                of users reported calmer, less irritated skin within two weeks
                of switching.
              </p>
              <p className="text-[4rem] font-bold tracking-[-0.04em] leading-none mt-4">
                28 Days
              </p>
              <p className="text-sm text-[var(--brand-muted)] mt-2">
                is all it takes to see significant improvements in texture,
                tone, and overall skin health.
              </p>
            </motion.div>

            <motion.div
              {...stagger}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center mb-4">
                <ShieldCheck className="w-10 h-10 text-[var(--brand-primary)]" />
              </div>
              <p className="text-center font-medium">Dermatologist Approved</p>
              <p className="text-sm text-[var(--brand-muted)] text-center mt-2">
                Developed in partnership with dermatological researchers, our
                formulation philosophy is built on clinical evidence.
              </p>
            </motion.div>

            <motion.div {...stagger} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="bg-[var(--brand-text)] text-white rounded-2xl p-8 mb-4">
                <p className="text-lg italic">Your skin deserves better.</p>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 text-center">
                <p className="text-[4rem] font-bold tracking-[-0.04em] leading-none">
                  5x
                </p>
                <p className="text-sm text-[var(--brand-muted)] mt-2">
                  more concentrated active ingredients than leading competitors.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS (giant text bg) ─── */}
      <section
        id="reviews"
        className="relative px-8 lg:px-16 py-24 lg:py-40 overflow-hidden"
      >
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h2 className="text-[clamp(5rem,14vw,13rem)] font-bold tracking-[-0.05em] text-[var(--brand-text)] opacity-[0.06] leading-[1] text-center whitespace-nowrap">
            What they
            <br />
            are saying
          </h2>
        </div>

        {/* Floating review cards */}
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={review.author}
                initial={{
                  opacity: 0,
                  y: 40,
                  rotate: i === 0 ? -2 : i === 2 ? 2 : 0,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: i === 0 ? -2 : i === 2 ? 2 : 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
                style={{ transform: `translateY(${i === 1 ? "40px" : "0px"})` }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[var(--brand-text)] text-[var(--brand-text)]"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4C4B0]" />
                  <div>
                    <p className="font-medium text-sm">{review.author}</p>
                    <p className="text-xs text-[var(--brand-muted)]">
                      {review.source}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY CTA ─── */}
      <section className="px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[var(--brand-text)] text-[var(--brand-text)]"
                />
              ))}
            </div>
            <p className="text-sm text-[var(--brand-muted)] mb-6">
              2500+ five-star reviews
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.15] max-w-2xl mx-auto">
              Join the community that&apos;s redefining skincare, one ingredient
              at a time.
            </h2>
          </motion.div>

          {/* Photo row */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 flex justify-center gap-3"
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-36 h-48 rounded-xl"
                style={{
                  backgroundColor: [
                    "#D4C4B0",
                    "#B8A898",
                    "#C4B8A8",
                    "#D8CFC2",
                    "#C0B0A0",
                    "#A89888",
                  ][i],
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PRODUCT ─── */}
      <section id="product" className="px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product image */}
          <motion.div
            {...fadeUp}
            className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#E8E4DE] to-[#D4CFC7] flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-lg italic text-[var(--brand-muted)] mb-4">
                Your healthiest
                <br />
                skin revealed.
              </p>
              <div className="w-40 h-28 rounded-lg bg-[#C5C0B8] mx-auto opacity-60" />
            </div>
          </motion.div>

          {/* Product details */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              Essentia™
            </h2>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-xl font-semibold">$85</span>
              <span className="text-[var(--brand-muted)] line-through">
                $105
              </span>
            </div>

            {/* Size options */}
            <div className="flex gap-3 mt-6">
              <button className="px-5 py-2.5 rounded-full border-2 border-[var(--brand-text)] text-sm font-medium">
                Standard (50 ml)
              </button>
              <button className="px-5 py-2.5 rounded-full border border-[#E5E5E0] text-sm text-[var(--brand-muted)]">
                Travel (20 ml)
              </button>
            </div>

            <p className="mt-6 text-sm text-[var(--brand-muted)] leading-relaxed">
              Your skin doesn&apos;t need 52 ingredients and 10 steps. It needs
              the right ones. Essentia is one product with five powerful
              ingredients that does what others promise but fail to deliver:
              healthier, calmer, more radiant skin. No complexity. No confusion.
              Just results.
            </p>

            {/* Expandable sections */}
            <div className="mt-8 space-y-0">
              <div className="flex items-center justify-between py-4 border-b border-[#E5E5E0] cursor-pointer">
                <span className="font-medium">Shipping</span>
                <Plus className="w-4 h-4 text-[var(--brand-muted)]" />
              </div>
              <div className="flex items-center justify-between py-4 border-b border-[#E5E5E0] cursor-pointer">
                <span className="font-medium">Return Policy</span>
                <Plus className="w-4 h-4 text-[var(--brand-muted)]" />
              </div>
            </div>

            {/* Quantity + Add to bag */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-[#E5E5E0] rounded-full">
                <button className="px-4 py-2.5 text-[var(--brand-muted)]">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-2 text-sm font-medium">1</span>
                <button className="px-4 py-2.5 text-[var(--brand-muted)]">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-[var(--brand-primary)] text-white py-3.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
                Add to Bag
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST MARQUEE ─── */}
      <div className="border-y border-[#E5E5E0] py-4 overflow-hidden">
        <div className="marquee-ticker flex gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-12 items-center">
              {[
                "Sustainable Packaging",
                "Free Shipping",
                "Secure Payment",
                "Made in Switzerland",
              ].map((text, i) => (
                <div
                  key={`${setIdx}-${i}`}
                  className="flex items-center gap-2 text-sm text-[var(--brand-muted)]"
                >
                  {[<Leaf />, <Truck />, <CreditCard />, <Package />][i] && (
                    <span className="text-[var(--brand-muted)]">
                      {
                        [
                          <Leaf className="w-4 h-4" />,
                          <Truck className="w-4 h-4" />,
                          <CreditCard className="w-4 h-4" />,
                          <Package className="w-4 h-4" />,
                        ][i]
                      }
                    </span>
                  )}
                  {text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── FAQ ─── */}
      <section id="faq" className="px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1]">
              Frequently
              <br />
              asked questions.
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-6 text-sm text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
            >
              Contact Support <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
            <FAQAccordion items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* ─── SOCIAL GRID ─── */}
      <section className="px-8 lg:px-16 py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            {...fadeUp}
            className="flex items-end justify-between mb-12"
          >
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1]">
              ...continues
              <br />
              on social.
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--brand-text)] text-sm font-medium hover:bg-[var(--brand-text)] hover:text-white transition-colors"
            >
              Follow Along
            </a>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="aspect-[3/4] rounded-xl"
                style={{
                  backgroundColor: [
                    "#C4B8A8",
                    "#D4C4B0",
                    "#B8A898",
                    "#D8CFC2",
                    "#A89888",
                    "#C0B0A0",
                  ][i],
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOURNAL ─── */}
      <section
        id="journal"
        className="px-8 lg:px-16 py-16 lg:py-24 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            {...fadeUp}
            className="text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[1.1] mb-12"
          >
            From our journal.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Why fewer ingredients work better.",
                tag: "Science",
                date: "Dec 14, 2024",
              },
              {
                title: "The truth about skincare marketing.",
                tag: "Beauty",
                date: "Nov 28, 2024",
              },
              {
                title: "Building a routine that lasts.",
                tag: "Insights",
                date: "Nov 12, 2024",
              },
            ].map((post, i) => (
              <motion.div
                key={post.title}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div
                  className="aspect-[4/3] rounded-2xl mb-4 overflow-hidden"
                  style={{
                    backgroundColor: ["#D4C4B0", "#B8A898", "#C0B0A0"][i],
                  }}
                >
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-[0.1em] text-[var(--brand-muted)]">
                    {post.tag}
                  </span>
                  <span className="text-xs text-[var(--brand-muted)]">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-medium tracking-[-0.02em] group-hover:text-[var(--brand-primary)] transition-colors">
                  {post.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer
        business={{
          name: "Essentia™",
          address: "123 Beauty Lane",
          city: "New York",
          state: "NY",
          zip: "10001",
          phone: "(212) 555-0147",
          email: "hello@essentia.com",
        }}
        links={navLinks}
      />
    </main>
  );
}
