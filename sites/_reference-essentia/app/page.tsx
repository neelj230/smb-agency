// REFERENCE: ESSENTIA SKINCARE — cream/sage palette, scroll-following product icon, self-writing text,
// scroll-driven reason cards, step-by-step process with image fadeaway, flowing testimonial cards
"use client";

import { ClickToCall } from "@/components/ClickToCall";
import type { NavLink } from "@/components/types";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Star,
  ChevronDown,
  ArrowRight,
  Package,
  Sparkles,
  Shield,
  Droplets,
  FlaskConical,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Reviews", href: "#reviews" },
  { label: "Order", href: "#order" },
];

const reasons = [
  {
    number: "01",
    title: "Five ingredients. Nothing more.",
    description:
      "We use only what works: ceramides to repair, peptides to renew, niacinamide to calm, squalane to hydrate, and glycerin to protect. Nothing to irritate your skin, nothing to waste your money.",
  },
  {
    number: "02",
    title: "Proven by people like you.",
    description:
      "In real-world testing, 94% of users saw dramatic improvements in just 28 days. Not subtle changes\u2014the kind of results that friends notice and comment on.",
  },
  {
    number: "03",
    title: "Quality over quantity.",
    description:
      "Instead of diluting our formula with cheap fillers and fancy-sounding extracts, we use higher concentrations of ingredients that actually work.",
  },
  {
    number: "04",
    title: "The last skincare you\u2019ll need.",
    description:
      "Each ingredient was chosen for one reason: it works. No trendy botanicals that sound nice but do nothing. No irritating fragrances. Just five powerful ingredients working together.",
  },
];

const steps = [
  {
    step: "01",
    title: "Apply",
    description:
      "Apply a small pearl-sized amount to fingertips and gently dot onto clean face.",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=800&fit=crop",
  },
  {
    step: "02",
    title: "Distribute",
    description:
      "Use light upward strokes to distribute evenly across face, including around eyes and jawline.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop",
  },
  {
    step: "03",
    title: "Press",
    description:
      "Press formula into skin with palms for 10 seconds to enhance absorption and activate ingredients.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=800&fit=crop",
  },
];

const ingredients = [
  { name: "Ceramide NP", label: "Ingredient 01", icon: Shield },
  { name: "Peptides", label: "Ingredient 02", icon: Sparkles },
  { name: "Niacinamide", label: "Ingredient 03", icon: FlaskConical },
  { name: "Squalane", label: "Ingredient 04", icon: Droplets },
  { name: "Glycerin", label: "Ingredient 05", icon: Package },
];

const reviews = [
  {
    text: "Got sucked into the 12-step routines and destroyed my skin barrier. This fixed what fancy serums couldn\u2019t. Wish I hadn\u2019t wasted so much money before finding this!",
    author: "Diane Lawson",
    role: "recovering from over-exfoliation",
  },
  {
    text: "Not gonna lie, I was super skeptical about a one-product routine. But my skin was freaking out from all the stuff I was using. Two months and my coworkers keep asking what I\u2019m doing differently!",
    author: "Jennifer Thompson",
    role: "formerly used 9-step routine",
  },
  {
    text: "I\u2019m 52 and have tried it all over the years. This is the first product where I actually finished the jar and immediately bought another. My skin just looks... healthy.",
    author: "Aisha Rodriguez",
    role: "using Essentia for 6 months",
  },
  {
    text: "Honestly? I was just tired of the guesswork. This works, it\u2019s simple, and I\u2019ve saved a ton of money. My bathroom counter isn\u2019t cluttered with half-used bottles anymore.",
    author: "Sarah Mitchell",
    role: "combination skin",
  },
  {
    text: "My skin hated EVERYTHING. Literally everything broke me out. I tried this as a last resort and... yeah. Should\u2019ve started here. No more redness around my nose and cheeks!",
    author: "Michelle Kaplan",
    role: "sensitive skin",
  },
  {
    text: "I\u2019m on planes constantly and my skin was so dehydrated and angry. The travel size is perfect for my carry-on and actually WORKS, unlike all the other travel-sized stuff I\u2019ve tried.",
    author: "Kai Tanaka",
    role: "frequent traveler",
  },
];

const faqItems = [
  {
    q: "Will simplifying my routine really improve my skin?",
    a: "Most dermatologists now recognize that over-treatment is one of the primary causes of skin sensitivity and barrier damage. By reducing ingredients and steps, you allow your skin\u2019s natural functions to rebalance.",
  },
  {
    q: "How long until I see results?",
    a: "Most users notice improved texture and hydration within 7-10 days. More significant changes in tone, resilience, and fine lines typically emerge after 28 days.",
  },
  {
    q: "Is Essentia suitable for all skin types?",
    a: "Yes. We\u2019ve developed one formulation that supports fundamental skin functions that benefit all skin. The variable is amount and frequency, not formulation.",
  },
  {
    q: "How does Essentia compare to my multi-step routine?",
    a: "Essentia provides all the essential nutrients your skin needs in one product. Most multi-step routines contain redundant ingredients that can actually counteract each other.",
  },
];

const badges = [
  "Stronger barrier",
  "Even complexion",
  "Smoother texture",
  "Enhanced firmness",
  "Long-lasting hydration",
  "Reduced sensitivity",
  "Improved clarity",
  "Natural radiance",
  "Clearer skin",
  "Smaller pores",
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── TYPEWRITER COMPONENT ────────────────────────────────────────────────────

function TypewriterText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {!done && isInView && <span className="typewriter-cursor" />}
    </span>
  );
}

// ─── SCROLL-FOLLOWING PRODUCT ICON ───────────────────────────────────────────

function FloatingProductIcon() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.5],
    [100, -20, -100, -200],
  );
  const x = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.35],
    [0, 100, -50, 0],
  );
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 0.35],
    [0.8, 1, 1.1, 0.9],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.4, 0.45],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
      style={{ y, x, rotate, scale, opacity }}
    >
      <div className="w-28 h-36 md:w-36 md:h-44 rounded-2xl bg-white shadow-2xl flex flex-col items-center justify-center border border-gray-100">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--brand-sage)] mb-2 flex items-center justify-center">
          <Droplets className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </div>
        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[var(--brand-text)]">
          Essentia
        </span>
        <span className="text-[8px] md:text-[10px] text-[var(--brand-muted)]">
          50 ml
        </span>
      </div>
    </motion.div>
  );
}

// ─── SCROLL-DRIVEN REASONS ───────────────────────────────────────────────────

function ScrollReasons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const idx = Math.min(
      Math.floor(value * reasons.length),
      reasons.length - 1,
    );
    setActiveIndex(idx);
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--brand-sage)]"
      style={{ height: `${reasons.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: number + progress */}
            <div className="flex flex-col gap-6">
              <div className="flex items-baseline gap-4">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[8rem] md:text-[10rem] font-extrabold leading-none text-[var(--brand-primary)]/10"
                >
                  {reasons[activeIndex].number}
                </motion.span>
              </div>
              {/* Progress dots */}
              <div className="flex gap-3">
                {reasons.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-10 bg-[var(--brand-primary)]"
                        : "w-4 bg-[var(--brand-primary)]/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            {/* Right: content */}
            <div className="min-h-[280px] flex flex-col justify-center">
              <motion.h3
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight text-[var(--brand-primary)] mb-6"
              >
                {reasons[activeIndex].title}
              </motion.h3>
              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[var(--brand-primary)]/70 text-lg leading-relaxed max-w-lg"
              >
                {reasons[activeIndex].description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── STEP WITH IMAGE FADE ────────────────────────────────────────────────────

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const imgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <motion.div
      ref={ref}
      className="grid md:grid-cols-2 gap-8 items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
        <span className="text-xs font-bold tracking-widest uppercase text-[var(--brand-accent)] mb-2 block">
          Step {step.step}
        </span>
        <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
          {step.title}
        </h3>
        <p className="text-[var(--brand-muted)] leading-relaxed">
          {step.description}
        </p>
      </div>
      <motion.div
        className={`relative rounded-2xl overflow-hidden aspect-[3/4] bg-[var(--brand-sage)]/30 ${index % 2 === 1 ? "md:order-1" : ""}`}
        style={{ opacity: imgOpacity }}
      >
        <motion.img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover"
          style={{ scale: imgScale }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── FAQ ITEM ────────────────────────────────────────────────────────────────

function FAQItem({ item }: { item: (typeof faqItems)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--brand-primary)]/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-4"
      >
        <span className="text-lg font-semibold">{item.q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-[var(--brand-muted)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-[var(--brand-muted)] leading-relaxed">
          {item.a}
        </p>
      </motion.div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function EssentiaPage() {
  return (
    <>
      <FloatingProductIcon />

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg)]/80 backdrop-blur-md border-b border-[var(--brand-primary)]/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight">
            Essentia<span className="text-[var(--brand-accent)]">&trade;</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[var(--brand-muted)] hover:text-[var(--brand-text)] text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#order"
            className="bg-[var(--brand-primary)] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Order Now
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-end pb-20 pt-32 px-6 lg:px-12 bg-[var(--brand-bg)] relative overflow-hidden">
        {/* Large sage background shape */}
        <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-[var(--brand-sage)] rounded-bl-[120px] opacity-40" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <motion.h1
                className="text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--brand-text)]"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Your
                <br />
                healthiest
                <br />
                skin
                <br />
                revealed.
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-6"
            >
              <p className="text-[var(--brand-muted)] text-lg md:text-xl leading-relaxed max-w-md">
                We strip away the unnecessary to focus on what truly works.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#order"
                  className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
                >
                  Shop Now <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors underline underline-offset-4"
                >
                  Learn more
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--brand-muted)]" />
        </motion.div>
      </section>

      {/* ── SELF-WRITING TEXT ── */}
      <section
        id="about"
        className="py-32 lg:py-44 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--brand-text)]">
            <TypewriterText text="Five proven ingredients that actually work. Less bottles. Better skin. Smarter routine." />
          </h2>
        </div>
      </section>

      {/* ── SCROLL-DRIVEN REASONS ── */}
      <ScrollReasons />

      {/* ── STEP-BY-STEP ROUTINE ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-20">
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-tight">
              Your new skincare routine is
              <br />
              <span className="text-[var(--brand-accent)]">
                beautifully simple.
              </span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-24 lg:gap-32">
            {steps.map((step, i) => (
              <StepCard key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ── */}
      <section
        id="ingredients"
        className="py-24 lg:py-36 px-6 lg:px-12 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeUp}>
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight mb-6">
                Simple ingredients,
                <br />
                <span className="text-[var(--brand-accent)]">
                  powerful results.
                </span>
              </h2>
              <p className="text-[var(--brand-muted)] text-lg leading-relaxed max-w-md">
                Each ingredient in Essentia was chosen for one reason: it works.
                No trendy botanicals. No irritating fragrances. Just five
                powerful ingredients working together.
              </p>
            </motion.div>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold tracking-widest uppercase text-[var(--brand-muted)] mb-2">
                Active Ingredients
              </p>
              {ingredients.map((ing, i) => (
                <motion.div
                  key={ing.name}
                  className="flex items-center gap-5 p-5 rounded-xl bg-[var(--brand-bg)] hover:bg-[var(--brand-sage)]/20 transition-colors group"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-sage)]/30 flex items-center justify-center group-hover:bg-[var(--brand-sage)] transition-colors">
                    <ing.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--brand-text)]">
                      {ing.name}
                    </p>
                    <p className="text-xs text-[var(--brand-muted)]">
                      {ing.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3 trust badges */}
          <div className="grid sm:grid-cols-3 gap-6 mt-20">
            {[
              {
                title: "5 Ingredients or Fewer",
                desc: "Only what works, nothing that doesn\u2019t.",
              },
              {
                title: "Clinically Tested",
                desc: "83% improvement in just 28 days in independent testing.",
              },
              {
                title: "Dermatologist Approved",
                desc: "Safe for even the most sensitive skin types.",
              },
            ].map((badge, i) => (
              <motion.div
                key={badge.title}
                className="text-center p-8 rounded-2xl bg-[var(--brand-bg)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-[var(--brand-sage)]/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-5 h-5 text-[var(--brand-sage-dark)]" />
                </div>
                <h4 className="font-bold mb-2">{badge.title}</h4>
                <p className="text-sm text-[var(--brand-muted)]">
                  {badge.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-primary)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-sage)] text-xs font-bold uppercase tracking-widest mb-4">
                The Problem
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight text-white mb-6">
                Most skincare is doing too much.
              </h2>
              <p className="text-white/60 leading-relaxed">
                Ever notice how your skin gets worse the more products you try?
                Most brands pile on ingredients, hoping a few might work. Your
                skin is overwhelmed, irritated, and nowhere near its best.
              </p>
            </motion.div>
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-sage)] text-xs font-bold uppercase tracking-widest mb-4">
                The Solution
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight text-white mb-6">
                What if less actually worked better?
              </h2>
              <p className="text-white/60 leading-relaxed">
                We stripped away everything unnecessary and focused on five
                ingredients proven to strengthen your skin&apos;s natural
                barrier. Skin that looks better, feels better, and actually gets
                healthier.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESULTS / STATS ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg)]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-tight">
              Real results you can see and feel.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 mb-20">
            <motion.div
              className="bg-white rounded-3xl p-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-6xl md:text-7xl font-extrabold text-[var(--brand-accent)] mb-3">
                94%
              </p>
              <p className="text-[var(--brand-muted)]">
                of users reported calmer, less irritated skin within two weeks.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-3xl p-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-6xl md:text-7xl font-extrabold text-[var(--brand-accent)] mb-3">
                28 Days
              </p>
              <p className="text-[var(--brand-muted)]">
                is all it takes to see significant improvements in texture,
                tone, and overall health.
              </p>
            </motion.div>
          </div>

          {/* Benefit badges */}
          <motion.div {...fadeUp} className="text-center mb-8">
            <h3 className="text-2xl font-bold">Your skin deserves better.</h3>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {badges.map((badge, i) => (
              <motion.span
                key={badge}
                className="px-5 py-2.5 rounded-full bg-white text-sm font-medium text-[var(--brand-text)] border border-[var(--brand-primary)]/10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS / TESTIMONIALS ── */}
      <section
        id="reviews"
        className="py-24 lg:py-36 bg-[var(--brand-bg)] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-16">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-sm font-semibold mb-3">
              2500+ five-star reviews
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-tight max-w-2xl">
              Join the community that&apos;s redefining skincare.
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mt-12">
            <h3 className="text-[clamp(3rem,8vw,7rem)] font-extrabold leading-none tracking-[-0.04em] text-[var(--brand-primary)]/10">
              What they
              <br />
              are saying
            </h3>
          </motion.div>
        </div>

        {/* Flowing review cards marquee */}
        <div className="testimonial-marquee flex gap-5 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[380px] bg-white rounded-2xl p-7 border border-[var(--brand-primary)]/5"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-[var(--brand-sage-dark)] text-[var(--brand-sage-dark)]"
                  />
                ))}
              </div>
              <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--brand-sage)] to-[var(--brand-sage-dark)]" />
                <div>
                  <p className="text-sm font-semibold">{review.author}</p>
                  <p className="text-xs text-[var(--brand-muted)]">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ORDER / PRODUCT ── */}
      <section id="order" className="py-24 lg:py-36 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product visual */}
            <motion.div
              className="aspect-square rounded-3xl bg-[var(--brand-sage)]/30 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-40 h-52 rounded-2xl bg-white shadow-xl flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[var(--brand-sage)] mb-3 flex items-center justify-center">
                  <Droplets className="w-10 h-10 text-white" />
                </div>
                <span className="text-sm font-bold tracking-widest uppercase">
                  Essentia
                </span>
                <span className="text-xs text-[var(--brand-muted)]">50 ml</span>
              </div>
            </motion.div>
            {/* Product info */}
            <motion.div {...fadeUp}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
                Essentia&trade;
              </h2>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold">$85</span>
                <span className="text-xl text-[var(--brand-muted)] line-through">
                  $125
                </span>
              </div>
              <div className="flex gap-3 mb-6">
                <button className="px-5 py-2.5 rounded-full bg-[var(--brand-primary)] text-white text-sm font-semibold">
                  Standard (50 ml)
                </button>
                <button className="px-5 py-2.5 rounded-full border border-[var(--brand-primary)]/20 text-sm font-medium">
                  Travel (20 ml)
                </button>
              </div>
              <p className="text-[var(--brand-muted)] leading-relaxed mb-8">
                Your skin doesn&apos;t need 50 ingredients and 10 steps. It
                needs the right ones. One product with five powerful ingredients
                that does what others promise but fail to deliver.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-bold hover:opacity-90 transition w-full justify-center"
              >
                Add to Bag <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex flex-wrap gap-4 mt-6 text-xs text-[var(--brand-muted)]">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Free Shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" /> Sustainable Packaging
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Made in Switzerland
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg)]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight">
              Frequently asked questions.
            </h2>
          </motion.div>
          <div>
            {faqItems.map((item) => (
              <FAQItem key={item.q} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNAL / BLOG PREVIEW ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp}
            className="flex items-end justify-between mb-12"
          >
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight">
              From our journal.
            </h2>
            <span className="text-sm font-medium text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors cursor-pointer">
              View All
            </span>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                tag: "Trends",
                date: "Mar 14, 2025",
                title: "Why fewer ingredients work better.",
                img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=350&fit=crop",
              },
              {
                tag: "Trends",
                date: "Feb 6, 2025",
                title: "Skincare science vs. trend cycles",
                img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&h=350&fit=crop",
              },
              {
                tag: "Insights",
                date: "Jan 3, 2025",
                title: "The foundation of healthy skin.",
                img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&h=350&fit=crop",
              },
            ].map((post, i) => (
              <motion.div
                key={post.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-[var(--brand-sage)]/20">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--brand-muted)] mb-2">
                  <span className="text-[var(--brand-accent)] font-semibold">
                    {post.tag}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-bold text-lg group-hover:text-[var(--brand-accent)] transition-colors">
                  {post.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 lg:px-12 bg-[var(--brand-primary)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-white font-semibold mb-5">Menu</h3>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-5">Socials</h3>
              <div className="space-y-3">
                {["Instagram", "X / Twitter", "TikTok"].map((s) => (
                  <span
                    key={s}
                    className="block text-white/50 text-sm hover:text-white transition-colors cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Stay essential.
              </h3>
              <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-xs">
                Join our community for evidence-based skincare insights and
                exclusive access to new formulations.
              </p>
              <div className="mt-5 flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-3 rounded-l-full bg-white/10 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[var(--brand-sage)]"
                />
                <button className="px-5 py-3 bg-[var(--brand-sage)] text-[var(--brand-primary)] rounded-r-full text-sm font-semibold hover:opacity-90 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
              Essentia<span className="text-[var(--brand-sage)]">&trade;</span>
            </span>
            <p className="text-white/30 text-sm">
              &copy; 2026 Essentia&trade; All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      <ClickToCall phone="(212) 555-0342" />
    </>
  );
}
