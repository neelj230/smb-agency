"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  MessageCircle,
  ClipboardCheck,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Calculator,
  Atom,
  FlaskConical,
  Check,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "See It Work", href: "#demo" },
    { label: "FAQ", href: "#faq" },
    { label: "For Teachers", href: "/teachers" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--brand-bg)]/90 backdrop-blur-xl border-b border-[var(--brand-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold text-sm">
            V
          </div>
          <span className="font-semibold text-white tracking-tight">
            Veradic AI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://veradicai.com"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[var(--brand-cta)] text-white hover:bg-red-500 transition-all"
          >
            Get Started
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[var(--brand-surface)] border-b border-[var(--brand-border)] px-6 py-4 space-y-3"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm py-2 text-white/60"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://veradicai.com"
            className="block text-sm font-semibold text-center px-5 py-2.5 rounded-full bg-[var(--brand-cta)] text-white"
          >
            Get Started
          </a>
        </motion.div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   HERO — Marquee topic cards (8 per column, even)
   ═══════════════════════════════════════════════ */
const leftTopics = [
  { label: "Quadratic Equations", icon: Calculator, tag: "ALGEBRA" },
  { label: "Derivatives & Integrals", icon: Calculator, tag: "CALCULUS" },
  { label: "Statistical Analysis", icon: Calculator, tag: "STATISTICS" },
  { label: "Linear Systems", icon: Calculator, tag: "ALGEBRA" },
  { label: "Trigonometric Identities", icon: Calculator, tag: "GEOMETRY" },
  { label: "Probability Distributions", icon: Calculator, tag: "STATISTICS" },
  { label: "Polynomial Division", icon: Calculator, tag: "ALGEBRA" },
  { label: "Series & Sequences", icon: Calculator, tag: "CALCULUS" },
];

const rightTopics = [
  { label: "Free Fall Motion", icon: Atom, tag: "PHYSICS" },
  { label: "Chemical Reactions", icon: FlaskConical, tag: "CHEMISTRY" },
  { label: "Wave Functions", icon: Atom, tag: "PHYSICS" },
  { label: "Stoichiometry", icon: FlaskConical, tag: "CHEMISTRY" },
  { label: "Thermodynamics", icon: Atom, tag: "PHYSICS" },
  { label: "Organic Chemistry", icon: FlaskConical, tag: "CHEMISTRY" },
  { label: "Electric Circuits", icon: Atom, tag: "PHYSICS" },
  { label: "Acid-Base Reactions", icon: FlaskConical, tag: "CHEMISTRY" },
];

function TopicCard({
  label,
  tag,
  icon: Icon,
}: {
  label: string;
  tag: string;
  icon: React.ElementType;
}) {
  return (
    <div className="topic-card flex items-center gap-3 mb-3">
      <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white/40" />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
          {tag}
        </p>
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HERO — Center Profile Card (animated)
   ═══════════════════════════════════════════════ */
function HeroCard() {
  const [nameIndex, setNameIndex] = useState(0);
  const names = [
    { name: "Sarah", detail: "Solving Quadratic Equations", emoji: "📐" },
    { name: "Marcus", detail: "Studying Free Fall Motion", emoji: "🔬" },
    { name: "Priya", detail: "Balancing Chemical Equations", emoji: "⚗️" },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setNameIndex((i) => (i + 1) % names.length),
      3000,
    );
    return () => clearInterval(interval);
  }, []);

  const current = names[nameIndex];

  return (
    <div className="bg-[var(--brand-surface)] rounded-3xl shadow-2xl shadow-black/30 p-0 w-[300px] overflow-hidden border border-[var(--brand-border)]">
      <div className="h-28 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-primary-dark)] relative">
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-[var(--brand-surface-light)] shadow-lg flex items-center justify-center text-2xl border border-[var(--brand-border)]">
          <AnimatePresence mode="wait">
            <motion.span
              key={nameIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {current.emoji}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="pt-12 pb-6 px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={nameIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-[family-name:var(--font-display)] font-bold text-xl text-white">
              {current.name}
            </p>
            <p className="text-xs text-[var(--brand-muted)] mt-1">
              {current.detail}
            </p>
          </motion.div>
        </AnimatePresence>
        <a
          href="https://veradicai.com"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--brand-primary)] text-white text-sm font-semibold hover:bg-[var(--brand-primary-dark)] transition-colors"
        >
          Start learning <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-[var(--brand-muted)]">
          <span className="px-2 py-1 rounded-full bg-[var(--brand-bg-alt)] font-semibold text-white/70">
            VERADIC
          </span>
          <span>Free for students</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCROLL-PINNED DYNAMIC MOCKUP
   ═══════════════════════════════════════════════ */
const mockupPhases = [
  {
    label: "STEP-BY-STEP",
    title: "Every problem, broken down.",
    desc: "Snap a photo of any problem. Veradic breaks it into numbered steps with clear explanations — not just the answer, but the understanding.",
    features: [
      "Handwriting recognition",
      "Multiple solution methods",
      "Adapts to your level",
    ],
  },
  {
    label: "CHAT TUTOR",
    title: "Ask follow-ups, like a real tutor.",
    desc: 'Confused by a step? Ask "why?" in plain English. Veradic explains further, tries a different angle, or gives a simpler example.',
    features: [
      "Natural language chat",
      "Remembers context",
      "Patient explanations",
    ],
  },
  {
    label: "PRACTICE",
    title: "Quiz your weak spots.",
    desc: "AI-generated quizzes target exactly what you struggle with. No more drilling problems you already know.",
    features: [
      "Adaptive difficulty",
      "Instant explanations",
      "Progress tracking",
    ],
  },
];

function MockupMathContent() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-[var(--brand-primary)]/15 flex items-center justify-center">
          <Calculator className="w-3.5 h-3.5 text-[var(--brand-primary-light)]" />
        </div>
        <span className="text-xs font-semibold text-white">Math Solver</span>
      </div>
      <div className="bg-[var(--brand-bg-alt)] rounded-xl p-3 mb-4">
        <p className="mono-text text-sm font-medium text-center text-white">
          2x² + 5x − 3 = 0
        </p>
      </div>
      <div className="space-y-2.5">
        {[
          {
            step: 1,
            title: "Identify coefficients",
            desc: "a = 2, b = 5, c = −3",
          },
          {
            step: 2,
            title: "Apply quadratic formula",
            desc: "x = (−b ± √(b²−4ac)) / 2a",
          },
          {
            step: 3,
            title: "Calculate discriminant",
            desc: "√(25 + 24) = √49 = 7",
          },
          { step: 4, title: "Solutions", desc: "x = ½ or x = −3" },
        ].map((s) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: s.step * 0.15 }}
            className="flex gap-2.5"
          >
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--brand-primary)] text-white text-[10px] flex items-center justify-center font-bold">
              {s.step}
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">{s.title}</p>
              <p className="mono-text text-[10px] text-[var(--brand-text-secondary)]">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-[var(--brand-border)] flex items-center gap-1.5">
        <Check className="w-3.5 h-3.5 text-[var(--brand-success)]" />
        <span className="text-[10px] font-medium text-[var(--brand-success)]">
          Solution verified
        </span>
      </div>
    </div>
  );
}

function MockupChatContent() {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center">
          <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <span className="text-xs font-semibold text-white">Chat Tutor</span>
      </div>
      <div className="space-y-2.5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-end"
        >
          <div className="bg-[var(--brand-primary)] text-white rounded-2xl rounded-br-md px-3.5 py-2 max-w-[80%]">
            <p className="text-[11px]">How do I balance Fe + O₂ → Fe₂O₃?</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-start"
        >
          <div className="bg-[var(--brand-bg-alt)] rounded-2xl rounded-bl-md px-3.5 py-2 max-w-[85%]">
            <p className="text-[11px] text-white">
              Count atoms on each side first:
            </p>
            <div className="mt-1.5 space-y-0.5">
              <p className="mono-text text-[10px] text-[var(--brand-text-secondary)]">
                Left: 1 Fe, 2 O
              </p>
              <p className="mono-text text-[10px] text-[var(--brand-text-secondary)]">
                Right: 2 Fe, 3 O
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex justify-start"
        >
          <div className="bg-[var(--brand-bg-alt)] rounded-2xl rounded-bl-md px-3.5 py-2 max-w-[85%]">
            <p className="text-[11px] text-white">Balanced:</p>
            <div className="mt-1.5 bg-[var(--brand-bg-alt)] rounded-lg p-2">
              <p className="mono-text text-xs text-center font-medium text-white">
                4Fe + 3O₂ → 2Fe₂O₃
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MockupQuizContent() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
            <ClipboardCheck className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-xs font-semibold text-white">
            Practice Quiz
          </span>
        </div>
        <span className="mono-text text-[10px] px-2 py-0.5 rounded-full bg-[var(--brand-bg-alt)] text-[var(--brand-text-secondary)]">
          3/10
        </span>
      </div>
      <div className="bg-[var(--brand-bg-alt)] rounded-xl p-3 mb-3">
        <p className="text-[11px] text-white font-medium">
          A right triangle has legs 3 and 4. Hypotenuse?
        </p>
      </div>
      <div className="space-y-1.5">
        {[
          { label: "A", value: "5", correct: true },
          { label: "B", value: "6", correct: false },
          { label: "C", value: "7", correct: false },
          { label: "D", value: "√7", correct: false },
        ].map((opt, i) => (
          <motion.div
            key={opt.label}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-[11px] ${opt.correct ? "border-[var(--brand-success)] bg-[var(--brand-success)]/10" : "border-[var(--brand-border)]"}`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${opt.correct ? "bg-[var(--brand-success)] text-white" : "bg-white/[0.06] text-[var(--brand-text-secondary)]"}`}
            >
              {opt.correct ? <Check className="w-3 h-3" /> : opt.label}
            </div>
            <span
              className={`mono-text ${opt.correct ? "font-semibold text-[var(--brand-success)]" : "text-white/70"}`}
            >
              {opt.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScrollPinnedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const activePhaseRaw = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0, 1, 2, 2],
  );
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const unsubscribe = activePhaseRaw.on("change", (v) =>
      setActivePhase(Math.round(v)),
    );
    return unsubscribe;
  }, [activePhaseRaw]);

  const mockupContents = [
    <MockupMathContent key="math" />,
    <MockupChatContent key="chat" />,
    <MockupQuizContent key="quiz" />,
  ];

  return (
    <section
      ref={containerRef}
      id="features"
      className="scroll-pin-container"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                    {mockupPhases[activePhase].label}
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight mt-4 leading-[1.1]">
                    {mockupPhases[activePhase].title}
                  </h2>
                  <p className="mt-5 text-[var(--brand-text-secondary)] leading-relaxed max-w-md">
                    {mockupPhases[activePhase].desc}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {mockupPhases[activePhase].features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm text-[var(--brand-text-secondary)]"
                      >
                        <Check className="w-4 h-4 text-[var(--brand-success)] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
              <div className="mt-10 flex gap-2">
                {mockupPhases.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === activePhase ? "w-8 bg-[var(--brand-primary)]" : "w-3 bg-[var(--brand-border)]"}`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-[320px]">
                <div className="mockup-frame overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhase}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.5 }}
                      className="pt-6"
                    >
                      {mockupContents[activePhase]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   LIVE PRODUCT DEMO — Auto-playing dark UI
   Replaces the static subjects section
   ═══════════════════════════════════════════════ */
function LiveProductDemo() {
  const [phase, setPhase] = useState(0); // 0=typing, 1=solving, 2=chatting, 3=quizzing
  const [subStep, setSubStep] = useState(0);

  const advanceDemo = useCallback(() => {
    setSubStep((prev) => {
      const maxSteps = [3, 5, 4, 4]; // max substeps per phase
      if (prev >= maxSteps[phase] - 1) {
        setPhase((p) => (p + 1) % 4);
        return 0;
      }
      return prev + 1;
    });
  }, [phase]);

  useEffect(() => {
    const delays = [1200, 1400, 1500, 1800]; // pace per phase
    const timer = setTimeout(advanceDemo, delays[phase]);
    return () => clearTimeout(timer);
  }, [phase, subStep, advanceDemo]);

  const phaseLabels = [
    "Snap a Problem",
    "Step-by-Step Solution",
    "Chat With Tutor",
    "Practice Quiz",
  ];

  return (
    <section id="demo" className="py-0">
      <div className="bg-[#0d0b1a] text-white">
        {/* Section header */}
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary-light)]">
              See It In Action
            </span>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight mt-4 text-white">
              Watch Veradic solve, teach, and quiz.
            </h2>
          </motion.div>
        </div>

        {/* The "browser" frame */}
        <div className="max-w-4xl mx-auto px-6 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#131127] shadow-2xl shadow-purple-900/20"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-[#0d0b1a]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-full bg-white/[0.06] text-[11px] text-white/40 mono-text">
                  veradicai.com
                </div>
              </div>
            </div>

            {/* Phase indicator tabs */}
            <div className="flex border-b border-white/[0.06]">
              {phaseLabels.map((label, i) => (
                <button
                  key={label}
                  onClick={() => {
                    setPhase(i);
                    setSubStep(0);
                  }}
                  className={`flex-1 py-3 text-[11px] font-medium transition-all ${i === phase ? "text-white bg-white/[0.04] border-b-2 border-[var(--brand-primary)]" : "text-white/30 hover:text-white/50"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="min-h-[420px] p-8">
              <AnimatePresence mode="wait">
                {/* Phase 0: Typing a problem */}
                {phase === 0 && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">
                      Problem
                    </p>
                    <div className="text-xl font-semibold text-white mb-4">
                      <span>Solve for x: 2x² + 5x − 3 = 0</span>
                      {subStep < 2 && (
                        <span className="inline-block w-0.5 h-5 bg-[var(--brand-primary)] ml-1 animate-pulse" />
                      )}
                    </div>
                    {subStep >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-4"
                      >
                        <div className="h-2 rounded-full bg-[var(--brand-primary)] w-32" />
                        <span className="text-[10px] text-white/30 mono-text">
                          Analyzing...
                        </span>
                      </motion.div>
                    )}
                    {subStep >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                      >
                        <p className="text-sm text-white/60">
                          Identified as a{" "}
                          <span className="text-white font-semibold">
                            quadratic equation
                          </span>
                          . Finding solutions using the quadratic formula...
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Phase 1: Step-by-step solving */}
                {phase === 1 && (
                  <motion.div
                    key="solving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[11px] text-white/40 uppercase tracking-wider">
                        Problem
                      </p>
                      <span className="mono-text text-[11px] text-white/30">
                        Step {Math.min(subStep + 1, 4)} of 5
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-white mb-2">
                      Solve for x: 2x² + 5x − 3 = 0
                    </p>
                    <div className="h-1.5 rounded-full bg-white/[0.06] mb-6">
                      <motion.div
                        className="h-full rounded-full bg-[var(--brand-primary)]"
                        animate={{
                          width: `${Math.min((subStep + 1) * 20, 80)}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <div className="space-y-4">
                      {subStep >= 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-[var(--brand-success)]" />
                            <span className="text-sm font-semibold text-[var(--brand-success)]">
                              Step 1 — Understand the Problem
                            </span>
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed">
                            We have a{" "}
                            <span className="text-white font-semibold">
                              quadratic equation
                            </span>{" "}
                            2x² + 5x − 3 = 0. Since the highest power is x², we
                            expect two solutions.
                          </p>
                        </motion.div>
                      )}

                      {subStep >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)] text-white text-[10px] flex items-center justify-center font-bold">
                              2
                            </div>
                            <span className="text-sm font-semibold text-[var(--brand-primary-light)]">
                              Identify Coefficients
                            </span>
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed mb-2">
                            In the standard form ax² + bx + c = 0, we identify:
                          </p>
                          <div className="mono-text text-sm text-white/70 space-y-1 ml-4">
                            <p>• a = 2 (coefficient of x²)</p>
                            <p>• b = 5 (coefficient of x)</p>
                            <p>• c = −3 (constant term)</p>
                          </div>
                        </motion.div>
                      )}

                      {subStep >= 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                        >
                          <input
                            className="flex-1 bg-transparent text-sm text-white/40 outline-none"
                            placeholder="Ask a question about this step..."
                            readOnly
                          />
                          <div className="px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-white text-xs font-semibold">
                            I Understand
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Phase 2: Chat with tutor */}
                {phase === 2 && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      {subStep >= 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)] text-white text-[10px] flex items-center justify-center font-bold">
                              2
                            </div>
                            <span className="text-sm font-semibold text-[var(--brand-primary-light)]">
                              Balance the Equation
                            </span>
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed">
                            Balance the chemical equation: Fe + O₂ → Fe₂O₃.
                            Start with the most complex molecule and work
                            outward.
                          </p>
                        </motion.div>
                      )}

                      {subStep >= 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-end"
                        >
                          <div className="px-4 py-2.5 rounded-2xl rounded-br-md bg-[var(--brand-primary)]/30 border border-[var(--brand-primary)]/40 text-sm text-white max-w-[70%]">
                            What does &quot;balancing&quot; actually mean?
                          </div>
                        </motion.div>
                      )}

                      {subStep >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <MessageCircle className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-semibold text-white">
                              Tutor
                            </span>
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed">
                            Balancing means making sure the{" "}
                            <span className="text-white font-semibold">
                              same number of each type of atom
                            </span>{" "}
                            appears on both sides of the arrow. Atoms can&apos;t
                            be created or destroyed in a reaction — so if you
                            start with 2 iron atoms, you must end with 2.
                          </p>
                        </motion.div>
                      )}

                      {subStep >= 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                        >
                          <input
                            className="flex-1 bg-transparent text-sm text-white/40 outline-none"
                            placeholder="Ask a question..."
                            readOnly
                          />
                          <div className="px-4 py-2 rounded-lg bg-[var(--brand-primary)] text-white text-xs font-semibold">
                            I Understand
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Phase 3: Practice quiz */}
                {phase === 3 && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-white/40 uppercase tracking-wider">
                        Question 4 of 5
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] mb-6">
                      <div className="h-full rounded-full bg-[var(--brand-primary)] w-4/5" />
                    </div>

                    <div className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-6">
                      <p className="text-base text-white leading-relaxed">
                        A right triangle has legs of length 5 and 12. What is
                        the length of the hypotenuse?
                      </p>
                      {subStep >= 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-4 flex justify-center"
                        >
                          <svg
                            width="140"
                            height="90"
                            viewBox="0 0 140 90"
                            className="text-white/30"
                          >
                            <line
                              x1="10"
                              y1="80"
                              x2="120"
                              y2="80"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="120"
                              y1="80"
                              x2="120"
                              y2="10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="10"
                              y1="80"
                              x2="120"
                              y2="10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                            />
                            <text
                              x="65"
                              y="95"
                              textAnchor="middle"
                              fill="white"
                              opacity="0.5"
                              fontSize="11"
                            >
                              12
                            </text>
                            <text
                              x="130"
                              y="50"
                              textAnchor="middle"
                              fill="white"
                              opacity="0.5"
                              fontSize="11"
                            >
                              5
                            </text>
                            <text
                              x="55"
                              y="40"
                              textAnchor="middle"
                              fill="white"
                              opacity="0.5"
                              fontSize="11"
                            >
                              ?
                            </text>
                            <rect
                              x="112"
                              y="72"
                              width="8"
                              height="8"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "A", value: "10", correct: false },
                        { label: "B", value: "13", correct: true },
                        { label: "C", value: "15", correct: false },
                        { label: "D", value: "17", correct: false },
                      ].map((opt, i) => (
                        <motion.div
                          key={opt.label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{
                            opacity: subStep >= 2 ? 1 : i <= subStep ? 1 : 0.3,
                            y: 0,
                          }}
                          transition={{ delay: i * 0.08 }}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all ${
                            subStep >= 3 && opt.correct
                              ? "border-[var(--brand-success)] bg-[var(--brand-success)]/10"
                              : "border-white/[0.08] bg-white/[0.02]"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              subStep >= 3 && opt.correct
                                ? "bg-[var(--brand-success)] text-white"
                                : "bg-white/[0.06] text-white/50"
                            }`}
                          >
                            {subStep >= 3 && opt.correct ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              opt.label
                            )}
                          </div>
                          <span
                            className={`mono-text text-sm ${subStep >= 3 && opt.correct ? "text-[var(--brand-success)] font-semibold" : "text-white/70"}`}
                          >
                            {opt.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════════ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[var(--brand-border)] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-base font-medium text-white pr-8">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--brand-muted)] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-[var(--brand-text-secondary)] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */
export default function HomePage() {
  const [heroTab, setHeroTab] = useState<"students" | "teachers">("students");

  const faqs = [
    {
      q: "How does the AI tutoring work?",
      a: "Take a photo of any math or science problem, and our AI breaks it down into clear, numbered steps. Each step explains the reasoning — not just what to do, but why. You can ask follow-up questions at any point.",
    },
    {
      q: "Is this just a homework answer machine?",
      a: "No. Veradic is designed to teach, not cheat. We show the full process so you understand the method. Teachers can see solution paths too. The goal is learning, not shortcuts.",
    },
    {
      q: "What subjects do you cover?",
      a: "Mathematics (algebra, geometry, calculus, statistics), Physics (mechanics, thermodynamics, waves), and Chemistry (stoichiometry, reactions, organic). More subjects coming soon.",
    },
    {
      q: "Is it free?",
      a: "The core experience is free for students — snap, solve, and learn. We offer a premium tier with unlimited practice quizzes, mock exams, and priority support.",
    },
    {
      q: "How is this different from ChatGPT?",
      a: "We focus specifically on STEM education with step-by-step pedagogy. Our AI is tuned for teaching — it explains concepts, diagnoses mistakes, and adapts to your level. General AI tools give answers; we build understanding.",
    },
    {
      q: "Can teachers use Veradic?",
      a: "Yes! Teachers get a dashboard to track student progress, identify common mistakes, and assign targeted practice. Visit our Teachers page to learn more.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen hero-gradient overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/4 overflow-hidden opacity-50 hidden lg:block">
            <div className="marquee-up">
              {[...leftTopics, ...leftTopics].map((t, i) => (
                <TopicCard key={i} {...t} />
              ))}
            </div>
          </div>
          <div className="flex-1" />
          <div className="w-1/4 overflow-hidden opacity-50 hidden lg:block">
            <div className="marquee-down">
              {[...rightTopics, ...rightTopics].map((t, i) => (
                <TopicCard key={i} {...t} />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]"
          >
            Snap. Learn. Master.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 text-lg text-white/70 max-w-xl"
          >
            AI tutor that breaks any math or science problem into steps you
            actually understand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10"
          >
            <HeroCard />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-sm text-white/50"
          >
            Join thousands of students learning smarter
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6"
          >
            <div className="toggle-pill">
              <button
                className={heroTab === "students" ? "active" : ""}
                onClick={() => setHeroTab("students")}
              >
                ✦ Students
              </button>
              <button
                className={heroTab === "teachers" ? "active" : ""}
                onClick={() => {
                  setHeroTab("teachers");
                  window.location.href = "/teachers";
                }}
              >
                ✦ Teachers
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ SCROLL-PINNED PRODUCT SHOWCASE ══ */}
      <ScrollPinnedShowcase />

      {/* ══ LIVE PRODUCT DEMO (replaces subjects) ══ */}
      <LiveProductDemo />

      {/* ══ FAQ ══ */}
      <section id="faq" className="py-28 lg:py-36 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
              FAQ
            </span>
            <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl tracking-tight mt-4">
              Common questions
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--brand-surface)] rounded-3xl border border-[var(--brand-border)] px-8"
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-28 lg:py-36 px-6 hero-gradient text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-display)] font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Stop guessing. Start learning.
            </h2>
            <p className="mt-6 text-lg text-white/60 max-w-md mx-auto">
              Join thousands of students who finally understand math and
              science.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://veradicai.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0F0D1B] font-semibold text-sm hover:bg-gray-100 transition-all"
              >
                Try Veradic Free <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/teachers"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-colors"
              >
                For Teachers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-16 px-6 bg-[var(--brand-bg)] text-[var(--brand-muted)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <span className="font-[family-name:var(--font-display)] font-bold text-xl text-white">
                veradic
              </span>
              <p className="mt-4 text-sm leading-relaxed">
                AI tutor for math and science. Built for students who want to
                understand, not just answer.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                Subjects
              </h4>
              <ul className="space-y-2.5">
                {["Mathematics", "Physics", "Chemistry"].map((s) => (
                  <li key={s}>
                    <a
                      href="#demo"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Features", href: "#features" },
                  { label: "For Teachers", href: "/teachers" },
                  { label: "FAQ", href: "#faq" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service"].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Veradic AI. All rights reserved.
            </p>
            <p className="text-xs">Made with care for students everywhere.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
