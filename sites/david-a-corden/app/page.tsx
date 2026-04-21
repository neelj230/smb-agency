// REFERENCE: ARPEGGIO — Bold orange/blue hero, scroll-shrink text, movie-theater reveal,
// floating cards, full-screen sticky projects, expanding "what we do", bento "why choose us",
// pac-man marquee, animated counters, expanding footer
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe,
  Star,
  Heart,
  Zap,
  Shield,
  Monitor,
  Palette,
  Code,
  Layers,
  Icon,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const projects = [
  {
    title: "Criminal Defense",
    client: "David A. Corden",
    category: "Drug Charge & Record Protection",
    image: "/photos/photo-1.webp",
  },
  {
    title: "Child Custody",
    client: "David A. Corden",
    category: "Full Custody Victory",
    image: "/photos/photo-1.webp",
  },
  {
    title: "Plea Negotiation",
    client: "David A. Corden",
    category: "Fast & Favorable Case Resolution",
    image: "/photos/photo-1.webp",
  },
];

const movieCards = [
  {
    image: "/photos/photo-1.webp",
    title: "Criminal Defense",
    subtitle: "Record Protection",
    rotation: -12,
    x: -320,
    y: -80,
  },
  {
    image: "/photos/photo-1.webp",
    title: "Drug Charges",
    subtitle: "Case Dismissal",
    rotation: 8,
    x: 280,
    y: -120,
  },
  {
    image: "/photos/photo-1.webp",
    title: "Child Custody",
    subtitle: "Family Law",
    rotation: -6,
    x: -280,
    y: 140,
  },
  {
    image: "/photos/photo-1.webp",
    title: "Plea Negotiation",
    subtitle: "Case Resolution",
    rotation: 15,
    x: 320,
    y: 100,
  },
  {
    image: "/photos/photo-1.webp",
    title: "Family Law",
    subtitle: "Parental Rights",
    rotation: -18,
    x: -160,
    y: 260,
  },
  {
    image: "/photos/photo-1.webp",
    title: "General Counsel",
    subtitle: "Personal Representation",
    rotation: 10,
    x: 160,
    y: 240,
  },
];

const stats = [
  { label: "Average Client Rating", value: 4.9, suffix: "★" },
  { label: "Years Serving Corvallis", value: 13, suffix: "+" },
  { label: "Personal Attorney Attention", value: 100, suffix: "%" },
  { label: "All Verified Client Experiences", value: 7, suffix: " Reviews" },
];

const services = [
  {
    number: "001",
    title: "Criminal Defense",
    description:
      "Aggressive representation for criminal charges — from drug offenses to misdemeanors — with a focus on protecting your record and your future.",
    items: [
      "Drug Charge Defense",
      "Misdemeanor Defense",
      "Record Protection",
      "Case Dismissal Strategy",
      'Court Representation',
      "Charge Reduction",
    ],
  },
  {
    number: "002",
    title: "Family Law",
    description:
      "Strategic advocacy in custody disputes and family matters, with a client-centered approach that keeps your child's best interest front and center.",
    items: [
      "Child Custody",
      "Full Custody Cases",
      "Divorce Proceedings",
      "Parental Rights",
      "Custody Arrangements",
      "Benton County Family Court",
    ],
  },
  {
    number: "003",
    title: "Case Resolution",
    description:
      "Efficient negotiation and personal legal counsel to secure favorable outcomes for clients who need a trusted attorney to be there when it matters most.",
    items: [
      "Plea Negotiation",
      "Deal Negotiation",
      "Fast Case Resolution",
      "General Legal Counsel",
      "Personal Representation",
      "Ongoing Client Support",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Way back in 2011 I hired Mr Corden to fight a drug charge, he not only won my case for me he also made sure nothing went on my record. Mr Corden went over and above for me. I would highly recommend David.",
    name: "Jolyn Jacobs",
    role: "Criminal Defense Client",
    rating: 5,
  },
  {
    quote:
      "He really really can move mountains...he helped facilitate getting full custody of my son. Not only is he a great lawyer he is a great person!",
    name: "Elroy Beard",
    role: "Child Custody Client",
    rating: 5,
  },
  {
    quote:
      "He worked fast and efficiently to get me a deal I was pleased with. He is a great attorney.",
    name: "Heather Monson",
    role: "Plea Negotiation Client",
    rating: 5,
  },
  {
    quote:
      "Overall David has been there when I needed him most.",
    name: "Ye Ole Yankee Trader",
    role: "General Counsel Client",
    rating: 4,
  },
  {
    quote:
      "David not only won my case, he made sure nothing went on my record. That kind of outcome isn't accidental — it's the result of someone who genuinely goes over and above.",
    name: "Jolyn Jacobs",
    role: "Drug Charge Defense Client",
    rating: 5,
  },
  {
    quote:
      "He helped me get full custody of my son. I can't say enough about what that means. A great lawyer and a great person.",
    name: "Elroy Beard",
    role: "Family Law Client",
    rating: 5,
  },
];

const faqs = [
  {
    q: "Can David Corden actually get charges removed from my record?",
    a: "Yes — one client specifically noted that David not only won her drug case but made sure nothing went on her record. Record protection is a core part of how David approaches criminal defense cases.",
  },
  {
    q: "How quickly does David work on cases?",
    a: "Heather Monson praised David for working 'fast and efficiently' to reach a deal she was pleased with. David understands that legal uncertainty is its own burden, and he moves with purpose to resolve cases without unnecessary delays.",
  },
  {
    q: "Does David handle custody cases, including full custody?",
    a: "Absolutely. David helped one client successfully obtain full custody of his son — a result that client described as 'moving mountains.' He handles contested and complex custody matters throughout the Corvallis area.",
  },
  {
    q: "Is David Corden the attorney I'll actually work with, or will I be passed to someone else?",
    a: "David runs a personal practice, which means you work directly with him — not a paralegal or junior associate. Clients consistently describe a direct, invested relationship with David himself.",
  },
  {
    q: "What makes David different from other attorneys in Corvallis?",
    a: "Clients describe him not just as a great lawyer but as 'a great person.' His 4.9-star rating and reviews spanning over a decade reflect someone who earns trust through outcomes and character, not just credentials.",
  },
];

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────


// ─── PAC-MAN COMPONENT ──────────────────────────────────────────────────────


// ─── FAQ ITEM ────────────────────────────────────────────────────────────────


// ─── FULL-SCREEN STICKY PROJECT ──────────────────────────────────────────────


// ─── PAGE ────────────────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}
function PacMan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="var(--brand-accent)">
      <path
        d="M20 0 A20 20 0 1 1 20 40 A20 20 0 1 1 20 0 Z M20 20 L35 8 L35 32 Z"
        fillRule="evenodd"
      >
        <animate
          attributeName="d"
          values="M20 0 A20 20 0 1 1 20 40 A20 20 0 1 1 20 0 Z M20 20 L38 6 L38 34 Z;M20 0 A20 20 0 1 1 20 40 A20 20 0 1 1 20 0 Z M20 20 L38 18 L38 22 Z;M20 0 A20 20 0 1 1 20 40 A20 20 0 1 1 20 0 Z M20 20 L38 6 L38 34 Z"
          dur="0.4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-white text-lg md:text-xl font-semibold pr-8">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--brand-accent)] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-white/60 text-sm leading-relaxed pb-6 max-w-2xl">
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
}
function FullScreenProject({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div
      ref={ref}
      className="relative h-[100vh]"
      style={{ zIndex: 10 + index }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-2">
                VISIT
              </p>
              <h3 className="text-white text-3xl md:text-5xl font-extrabold leading-none mb-2">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm">{project.category}</p>
            </div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-widest text-right">
              {project.client}
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.button
              className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black text-xs font-bold uppercase tracking-widest hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
            >
              VISIT
            </motion.button>
          </div>

          <div className="flex items-end justify-between">
            <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessPage() {
  // ── Hero scroll tracking
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroContainerProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"],
  });

  const heroImageScale = useTransform(
    heroContainerProgress,
    [0, 0.3],
    [1, 1.3],
  );
  const heroImageOpacity = useTransform(
    heroContainerProgress,
    [0.15, 0.4],
    [1, 0],
  );
  const heroImageShrinkScale = useTransform(
    heroContainerProgress,
    [0.15, 0.4],
    [1, 0.5],
  );

  const subTextScale = useTransform(
    heroContainerProgress,
    [0, 0.15, 0.35],
    [1, 1, 0.35],
  );
  const subTextY = useTransform(
    heroContainerProgress,
    [0, 0.15, 0.35],
    [0, 0, -300],
  );
  const subTextOpacity = useTransform(
    heroContainerProgress,
    [0.3, 0.45],
    [1, 0],
  );
  const agencyTextOpacity = useTransform(
    heroContainerProgress,
    [0.3, 0.45],
    [1, 0],
  );

  const bgOpacity = useTransform(heroContainerProgress, [0.3, 0.5], [0, 1]);

  const cadenzaTextX = useTransform(heroContainerProgress, [0, 0.2], [0, -300]);
  const cadenzaTextOpacity = useTransform(
    heroContainerProgress,
    [0.05, 0.2],
    [1, 0],
  );

  // Movie theater section
  const movieRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: movieProgress } = useScroll({
    target: movieRef,
    offset: ["start end", "end start"],
  });
  const movieScale = useTransform(movieProgress, [0, 0.3, 0.5], [0.6, 1, 1]);
  const movieOpacity = useTransform(movieProgress, [0, 0.2], [0, 1]);

  // Floating cards
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardsProgress } = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"],
  });

  // "What We Do" expanding circle
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: whatWeDoProgress } = useScroll({
    target: whatWeDoRef,
    offset: ["start end", "start 0.2"],
  });
  const circleScale = useTransform(whatWeDoProgress, [0, 0.8, 1], [0, 0.5, 60]);
  const circleOpacity = useTransform(whatWeDoProgress, [0, 0.3], [0, 1]);
  const whatWeDoContentOpacity = useTransform(
    whatWeDoProgress,
    [0.7, 1],
    [0, 1],
  );

  // For the expanding footer
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const footerScale = useTransform(footerProgress, [0, 0.5], [0.9, 1]);
  const footerRadius = useTransform(footerProgress, [0, 0.5], [48, 0]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-white text-xs font-medium uppercase tracking-widest opacity-70 hover:opacity-100 transition cursor-pointer">
              WA
            </span>
            <span className="text-white text-xs font-medium uppercase tracking-widest opacity-70 hover:opacity-100 transition cursor-pointer">
              X
            </span>
            <span className="text-white text-xs font-medium uppercase tracking-widest opacity-70 hover:opacity-100 transition cursor-pointer">
              IG
            </span>
            <span className="text-white text-xs font-medium uppercase tracking-widest opacity-70 hover:opacity-100 transition cursor-pointer">
              LI
            </span>
            <span className="text-white text-xs font-medium uppercase tracking-widest opacity-70 hover:opacity-100 transition cursor-pointer">
              EMAIL
            </span>
          </div>
          <span className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wider text-[var(--brand-accent)]">
            Corden Law
          </span>
          <button className="text-white text-sm font-medium uppercase tracking-widest opacity-70 hover:opacity-100 transition flex items-center gap-2">
            <span className="hidden md:inline">Menu</span>
            <div className="flex flex-col gap-1">
              <div className="w-5 h-0.5 bg-white" />
              <div className="w-5 h-0.5 bg-white" />
            </div>
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO MEGA-SECTION: hero + scroll-shrink text + image fade
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={heroContainerRef}
        className="relative"
        style={{ height: "350vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Blue gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3B7BC0] via-[#2B6CB0] to-[#1a4c80]" />

          {/* Black background (fades in) */}
          <motion.div
            className="absolute inset-0 bg-[#0a0a0a]"
            style={{ opacity: bgOpacity }}
          />

          {/* Glimmer light at top center */}
          <motion.div
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]"
            style={{ opacity: heroImageOpacity }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(200,230,255,0.15) 40%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* Woman image */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: heroImageOpacity, scale: heroImageShrinkScale }}
          >
            <motion.div
              className="relative w-[55vw] max-w-[700px] h-[75vh] max-h-[800px]"
              style={{ scale: heroImageScale }}
            >
              <img
                src="/hero-woman.jpg"
                alt=""
                className="w-full h-full object-cover object-top"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 80% 85% at 50% 40%, black 40%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 85% at 50% 40%, black 40%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B6CB0]/60 via-transparent to-[#3B7BC0]/40" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1a4c80] to-transparent" />
            </motion.div>
          </motion.div>

          {/* "One attorney, your case handled personally." (left) */}
          <motion.div
            className="absolute top-[15%] left-8 md:left-12 lg:left-16 z-20 max-w-[45%]"
            style={{
              scale: subTextScale,
              y: subTextY,
              opacity: subTextOpacity,
              transformOrigin: "top center",
            }}
          >
            <h2 className="text-white text-[clamp(1.5rem,3.5vw,3.2rem)] font-extrabold leading-[1.1] tracking-tight">
              One attorney,
              <br />
              your case handled
              <br />
              personally.
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
              <p className="text-[var(--brand-accent)] text-xs font-medium">
                Counsel beyond the standard
                <br />
                billable hour
              </p>
            </div>
          </motion.div>

          {/* "The Corvallis Agency—" (right) */}
          <motion.div
            className="absolute top-[15%] right-8 md:right-12 lg:right-16 z-20 text-right"
            style={{ opacity: agencyTextOpacity }}
          >
            <h2 className="text-white text-[clamp(1.5rem,3vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
              The Corvallis
              <br />
              Attorney&mdash;
            </h2>
          </motion.div>

          {/* Giant "Cadenza®" text at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 px-4"
            style={{ x: cadenzaTextX, opacity: cadenzaTextOpacity }}
          >
            <h1 className="hero-text-pan text-[clamp(5rem,18vw,16rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-[var(--brand-accent)] whitespace-nowrap">
              Corden<sup className="text-[0.3em] align-super">&reg;</sup>
            </h1>
          </motion.div>

          {/* Decorative cross markers (on dark bg) */}
          <motion.div
            style={{ opacity: bgOpacity }}
            className="absolute inset-0 pointer-events-none z-10"
          >
            {[
              { top: "10%", left: "3%" },
              { top: "10%", left: "35%" },
              { top: "10%", left: "67%" },
              { top: "50%", left: "3%" },
              { top: "50%", left: "35%" },
              { top: "50%", left: "67%" },
              { top: "80%", left: "3%" },
              { top: "80%", left: "35%" },
              { top: "80%", left: "67%" },
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute text-white/15 text-lg font-light"
                style={pos}
              >
                +
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOVIE THEATER SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={movieRef}
        className="relative py-32 lg:py-48 bg-[#0a0a0a] overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            className="relative mx-auto"
            style={{ scale: movieScale, opacity: movieOpacity }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src="/movie-face.jpg"
                alt=""
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
                <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-center drop-shadow-2xl">
                  Defense that
                  <br />
                  moves mountains
                  <br />& inspires
                  <br />
                  and closes cases.
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/3 left-[15%] w-3 h-3 rounded-full bg-[var(--brand-accent)]" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FLOATING MOVIE CARDS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={cardsRef}
        className="relative bg-[#0a0a0a] overflow-hidden"
        style={{ minHeight: "200vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <h2 className="text-white/10 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-center">
              Defense that
              <br />
              moves mountains
              <br />
              &inspires
              <br />
              and closes cases.
            </h2>
          </div>

          {movieCards.map((card, i) => {
            const cardProgress = useTransform(
              cardsProgress,
              [0, 0.2 + i * 0.05, 0.5 + i * 0.05, 1],
              [0, 0, 1, 1],
            );
            const cardX = useTransform(
              cardProgress,
              [0, 1],
              [card.x * 2.5, card.x],
            );
            const cardY = useTransform(
              cardProgress,
              [0, 1],
              [card.y * 2.5 + 400, card.y],
            );
            const cardRotation = useTransform(
              cardProgress,
              [0, 1],
              [card.rotation * 3, card.rotation],
            );
            const cardOpacity = useTransform(cardProgress, [0, 0.3], [0, 1]);
            const cardScale = useTransform(cardProgress, [0, 1], [0.4, 1]);

            return (
              <motion.div
                key={card.title}
                className="absolute z-10"
                style={{
                  x: cardX,
                  y: cardY,
                  rotate: cardRotation,
                  opacity: cardOpacity,
                  scale: cardScale,
                }}
              >
                <div className="w-48 md:w-56 lg:w-64 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group cursor-pointer">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-bold">
                        {card.title}
                      </p>
                      <p className="text-white/50 text-xs">{card.subtitle}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FULL-SCREEN STICKY PROJECTS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative bg-[#0a0a0a]">
        {projects.map((project, i) => (
          <FullScreenProject key={project.title} project={project} index={i} />
        ))}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ACHIEVEMENTS / STATS — custom style with image + read reviews
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg-dark)] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header row */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-2 h-2 mt-2 rounded-full bg-[var(--brand-accent)]" />
            <div>
              <div className="flex items-center gap-4 mb-1">
                <p className="text-white text-sm font-medium">
                  Our Record
                </p>
                <div className="w-px h-4 bg-white/20" />
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  cases & outcomes
                </p>
              </div>
            </div>
          </div>

          <motion.h2
            className="text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 max-w-2xl"
            {...fadeUp}
          >
            Behind every case is someone whose life depends on it
          </motion.h2>
          <motion.p className="text-white/40 text-sm mb-12" {...fadeUp}>
            Fighting charges, one client at a time
          </motion.p>

          {/* Main content: Image + Campaign + Stats */}
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 mb-16">
            {/* Left: VR person image with "read reviews" overlay */}
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              {...fadeUp}
            >
              <img
                src="/person-vr.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 cursor-pointer hover:bg-white/20 transition">
                  <div className="w-3 h-3 rounded-full bg-[var(--brand-accent)]" />
                  <span className="text-white text-sm font-medium italic">
                    read reviews
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: Campaign details + percentages */}
            <div className="flex flex-col justify-between gap-6">
              {/* Campaign card */}
              <motion.div
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
                {...fadeUp}
              >
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
                  4.9 Stars on Google
                </p>
                <h3 className="text-white text-2xl font-extrabold mb-2">
                  7 Client Reviews
                </h3>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">
                  David A. Corden has built a 4.9-star reputation over a decade of criminal defense and family law work in Corvallis, OR. Clients describe outcomes that changed their lives.
                </p>
                <a
                  href="#projects"
                  className="text-white text-sm font-medium hover:text-[var(--brand-accent)] transition flex items-center gap-1"
                >
                  view reviews <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Percentage cards row */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="p-5 rounded-2xl bg-white/5 border border-white/10"
                  {...fadeUp}
                >
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">
                    Cases Resolved
                  </p>
                  <p className="text-[var(--brand-accent)] text-4xl md:text-5xl font-extrabold">
                    <AnimatedNumber value={35} suffix="%" />
                  </p>
                </motion.div>
                <motion.div
                  className="p-5 rounded-2xl bg-white/5 border border-white/10"
                  {...fadeUp}
                >
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">
                    Charges Reduced
                  </p>
                  <p className="text-[var(--brand-accent)] text-4xl md:text-5xl font-extrabold">
                    <AnimatedNumber value={24} suffix="%" />
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Performance snapshot heading */}
          <motion.p
            className="text-white/20 text-xs uppercase tracking-[0.3em] text-center mb-8"
            {...fadeUp}
          >
            Case Snapshot
          </motion.p>

          {/* Stats row */}
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="text-white text-3xl md:text-4xl font-extrabold">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix || ""}
                  />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pac-Man eating scrolling logos marquee */}
          <div className="relative overflow-hidden">
            {/* Pac-Man at the right edge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center">
              <div
                className="w-16 h-16 bg-[var(--brand-bg-dark)]"
                style={{ boxShadow: "-20px 0 30px 20px var(--brand-bg-dark)" }}
              />
              <PacMan className="w-10 h-10 -ml-12" />
            </div>
            {/* Fade mask on right */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--brand-bg-dark)] to-transparent z-10" />

            <div className="marquee-track flex items-center gap-12 w-max py-4">
              {[...Array(2)].map((_, setIdx) =>
                [
                  { name: "Criminal Defense", icon: "⚖️" },
                  { name: "Family Law", icon: null },
                  { name: "Child Custody", icon: null },
                  { name: "Drug Charges", icon: null },
                  { name: "Plea Negotiation", icon: null },
                  { name: "Record Protection", icon: null },
                  { name: "Corvallis, OR", icon: null },
                  { name: "13+ Years", icon: null },
                ].map((brand, i) => (
                  <div
                    key={`${setIdx}-${i}`}
                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10"
                  >
                    <span className="text-white/40 text-sm font-medium whitespace-nowrap">
                      {brand.name}
                    </span>
                  </div>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHAT WE DO — Expanding circle reveal + huge text + custom layout
      ═══════════════════════════════════════════════════════════════════════ */}
      <div ref={whatWeDoRef} className="relative" style={{ height: "150vh" }}>
        {/* Expanding circle overlay */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* The expanding white circle */}
          <motion.div
            className="absolute top-[10%] left-[5%] w-16 h-16 rounded-full bg-white"
            style={{
              scale: circleScale,
              opacity: circleOpacity,
              transformOrigin: "center center",
            }}
          />

          {/* Orange dot at top-left (visible as circle expands) */}
          <motion.div
            className="absolute top-[8%] left-[3%] w-3 h-3 rounded-full bg-[var(--brand-accent)] z-20"
            style={{ opacity: whatWeDoContentOpacity }}
          />

          {/* Content that appears after circle fills screen */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-start pt-24 px-8 md:px-16 lg:px-20"
            style={{ opacity: whatWeDoContentOpacity }}
          >
            <div className="max-w-6xl mx-auto w-full">
              <h2 className="text-[var(--brand-text)] text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[0.9] tracking-tight mb-6">
                how we help
              </h2>
              <p className="text-[var(--brand-muted)] text-lg md:text-xl max-w-2xl mb-16 leading-relaxed">
                Personal, invested legal representation for criminal defense, custody, and family law in Corvallis, OR.
              </p>

              {/* Services list — custom style: number + title left, description center, items right */}
              <div className="space-y-0">
                {services.map((service, i) => (
                  <motion.div
                    key={service.number}
                    className="grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr] gap-6 lg:gap-12 border-t border-gray-200 py-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Left: Number + Title */}
                    <div className="flex items-baseline gap-4">
                      <span className="text-[var(--brand-muted)] text-xs font-mono">
                        {service.number}
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold">
                        {service.title} &mdash;
                      </h3>
                    </div>

                    {/* Center: Description */}
                    <p className="text-[var(--brand-muted)] text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Right: Items list */}
                    <div className="flex flex-col items-end gap-1">
                      {service.items.map((item) => (
                        <span
                          key={item}
                          className="text-[var(--brand-text)] text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200">
                <p className="text-[var(--brand-muted)] text-sm italic">
                  Ready to fight back?
                </p>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 border border-[var(--brand-primary)] text-[var(--brand-primary)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition"
                >
                  view practice areas
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 border border-[var(--brand-primary)] text-[var(--brand-primary)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition"
                >
                  get counsel
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY CHOOSE US — bento grid with images and sliding elements
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg)] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[var(--brand-accent)]" />
              <span className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wider text-[var(--brand-accent)]">
                Corden Law
              </span>
            </div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3"
              {...fadeUp}
            >
              Representation, Not Just Paperwork
            </motion.h2>
            <motion.p
              className="text-[var(--brand-muted)] text-sm max-w-lg"
              {...fadeUp}
            >
              One attorney, direct attention, real outcomes for your case
            </motion.p>
          </div>

          {/* Bento Grid — matching custom reference */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Row 1 */}
            {/* Legal Services - large card with image */}
            <motion.div
              className="col-span-1 row-span-2 bg-[var(--brand-primary)] rounded-2xl p-6 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
              {...fadeUp}
            >
              <div className="relative z-10">
                <div className="w-2 h-2 rounded-full bg-[var(--brand-accent)] mb-4" />
                <h3 className="text-white text-xl font-extrabold mb-1">
                  Legal Services
                </h3>
                <p className="text-white/40 text-xs">
                  Criminal defense, family law, and personal legal counsel in Corvallis
                </p>
              </div>
              <img
                src="/cupcake.jpg"
                alt=""
                className="absolute bottom-0 left-0 right-0 h-1/2 object-cover opacity-40 rounded-b-2xl"
              />
            </motion.div>

            {/* Your Case — Our Fight */}
            <motion.div
              className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center text-center"
              {...fadeUp}
            >
              <p className="text-[var(--brand-muted)] text-[10px] uppercase tracking-widest mb-3">
                Your Case — Our Fight
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-[var(--brand-accent)]" />
                <span className="text-gray-300">+</span>
                <Zap className="w-5 h-5 text-[var(--brand-accent)]" />
              </div>
              <p className="text-[var(--brand-text)] text-sm font-bold">
                Real defense built
                <br />
                around your case
              </p>
            </motion.div>

            {/* Person photo card */}
            <motion.div
              className="row-span-2 rounded-2xl overflow-hidden relative"
              {...fadeUp}
            >
              <img
                src="/person-standing.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Case Portal with sliding preview */}
            <motion.div
              className="bg-[var(--brand-accent)] rounded-2xl p-5 flex flex-col justify-between overflow-hidden"
              {...fadeUp}
            >
              <p className="text-white text-sm font-bold mb-2">
                Case Portal
              </p>
              <p className="text-white/70 text-[10px] mb-3">
                Track your case and reach David directly
              </p>
              {/* Mini dashboard mockup */}
              <div className="bg-white/20 backdrop-blur rounded-lg p-2">
                <div className="flex gap-1 mb-2">
                  <div className="w-1 h-1 rounded-full bg-white/50" />
                  <div className="w-1 h-1 rounded-full bg-white/50" />
                  <div className="w-1 h-1 rounded-full bg-white/50" />
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-white/30 rounded w-full" />
                  <div className="h-1.5 bg-white/20 rounded w-3/4" />
                  <div className="h-1.5 bg-white/20 rounded w-1/2" />
                </div>
              </div>
            </motion.div>

            {/* Row 2 (continuation) */}
            {/* Transparent Fees */}
            <motion.div
              className="bg-amber-50 rounded-2xl p-6 flex flex-col justify-between"
              {...fadeUp}
            >
              <div className="w-2 h-2 rounded-full bg-[var(--brand-accent)] mb-3" />
              <div>
                <h3 className="text-[var(--brand-text)] text-lg font-extrabold mb-1">
                  Transparent Fees
                </h3>
                <p className="text-[var(--brand-muted)] text-xs">
                  No surprise fees — David communicates clearly about costs from day one
                </p>
              </div>
            </motion.div>

            {/* Row 3 */}
            {/* Direct case updates with sliding cards */}
            <motion.div
              className="bg-[var(--brand-primary)] rounded-2xl p-5 overflow-hidden"
              {...fadeUp}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
                    <Monitor className="w-3 h-3 text-white/50" />
                  </div>
                  <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
                    <Palette className="w-3 h-3 text-white/50" />
                  </div>
                  <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
                    <Code className="w-3 h-3 text-white/50" />
                  </div>
                </div>
                <span className="text-white/30 text-[10px] ml-1">
                  Practice Areas
                </span>
              </div>
              <p className="text-white text-xs font-bold mb-0.5">
                Defense & Resolution
              </p>
              <p className="text-white/40 text-[10px] mb-3">
                Moving mountains to get your record clean
              </p>
              <h3 className="text-white text-sm font-extrabold">
                Direct
                <br />
                case updates
              </h3>
            </motion.div>

            {/* New Client stat */}
            <motion.div
              className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col justify-between"
              {...fadeUp}
            >
              <div>
                <p className="text-[var(--brand-muted)] text-[10px] uppercase tracking-wider mb-1">
                  New Client
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center">
                    <Heart className="w-3 h-3 text-[var(--brand-accent)]" />
                  </div>
                </div>
                <p className="text-[var(--brand-text)] text-3xl font-extrabold">
                  33+
                </p>
                <p className="text-[var(--brand-muted)] text-[10px]">
                  Retained in Corvallis, OR
                </p>
              </div>
            </motion.div>

            {/* Client Growth stat */}
            <motion.div
              className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col justify-between"
              {...fadeUp}
            >
              <p className="text-[var(--brand-muted)] text-[10px] uppercase tracking-wider mb-1">
                Client Growth
              </p>
              <p className="text-[var(--brand-text)] text-3xl font-extrabold">
                128%
              </p>
              <p className="text-[var(--brand-muted)] text-[10px]">
                Compared to the previous year
              </p>
            </motion.div>

            {/* Tools & Integration with icons */}
            <motion.div
              className="bg-white rounded-2xl p-5 border border-gray-100"
              {...fadeUp}
            >
              <p className="text-[var(--brand-text)] text-sm font-bold mb-3">
                Tools & Integration
              </p>
              <p className="text-[var(--brand-muted)] text-[10px] mb-3">
                Criminal defense, custody, plea negotiation, and family law
              </p>
              <div className="flex gap-3">
                {[Layers, Code, Palette, Monitor].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
                  >
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Row 4 */}
            {/* Satisfaction Rate */}
            <motion.div
              className="bg-white rounded-2xl p-5 border border-gray-100 relative overflow-hidden"
              {...fadeUp}
            >
              <p className="text-[var(--brand-muted)] text-[10px] uppercase tracking-wider mb-1">
                Satisfaction Rate
              </p>
              <p className="text-[var(--brand-text)] text-4xl font-extrabold mb-1">
                98%
              </p>
              <p className="text-[var(--brand-muted)] text-[10px]">
                From project feedback
              </p>
              <img
                src="/hands-creative.jpg"
                alt=""
                className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover opacity-20 rounded-br-2xl"
              />
            </motion.div>

            {/* Flexible & Scalable */}
            <motion.div
              className="bg-gray-100 rounded-2xl p-5 flex flex-col justify-between"
              {...fadeUp}
            >
              <div className="flex gap-2 mb-3">
                {[Shield, Zap, Layers, Globe].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded bg-white flex items-center justify-center"
                  >
                    <Icon className="w-3 h-3 text-gray-400" />
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-[var(--brand-text)] text-sm font-extrabold mb-1">
                  Flexible & Scalable
                </h3>
                <p className="text-[var(--brand-muted)] text-[10px]">
                  Easily adjust your service level as your business grows
                </p>
              </div>
            </motion.div>

            {/* Dedicated Assistance */}
            <motion.div
              className="bg-[var(--brand-accent)] rounded-2xl p-5 text-white relative overflow-hidden"
              {...fadeUp}
            >
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-white text-white" />
                ))}
              </div>
              <h3 className="text-sm font-extrabold mb-1">
                Dedicated Assistance
              </h3>
              <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 mb-2">
                <p className="text-white/80 text-[10px] font-bold">
                  99.9% Uptime Guarantee
                </p>
              </div>
              <p className="text-white/70 text-[10px]">
                Round-the-clock expert support for uninterrupted service and
                reliability
              </p>
            </motion.div>

            {/* Person photo */}
            <motion.div className="rounded-2xl overflow-hidden" {...fadeUp}>
              <img
                src="/person-sitting.jpg"
                alt=""
                className="w-full h-full object-cover"
                style={{ minHeight: "160px" }}
              />
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-200">
            <p className="text-[var(--brand-text)] text-sm font-medium italic">
              Flexible & Dedicated
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-[var(--brand-primary)] text-[var(--brand-primary)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition"
            >
              view practice areas
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 border border-[var(--brand-primary)] text-[var(--brand-primary)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition"
            >
              get counsel
            </a>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section
        id="pricing"
        className="py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-widest mb-3">
              Membership Plans
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight">
              Your passport to flexible design revisions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Core Plan",
                price: "$2,995",
                period: "/mo",
                features: [
                  "First Mockup in 72hrs",
                  "Single Project Queue",
                  "Basic Design Iterations",
                  "Dedicated Senior Designer",
                  "Standard Development",
                ],
                highlighted: false,
              },
              {
                name: "Pro Plan",
                price: "$5,995",
                period: "/mo",
                features: [
                  "First Mockup in 48hrs",
                  "Dual Project Queue",
                  "Unlimited Design Iterations",
                  "Dedicated Design Team",
                  "Priority Development",
                ],
                highlighted: true,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-3xl p-8 md:p-10 border ${
                  plan.highlighted
                    ? "bg-[var(--brand-primary)] border-[var(--brand-accent)]/30"
                    : "bg-white border-gray-200"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.highlighted ? "text-[var(--brand-accent)]" : "text-[var(--brand-muted)]"}`}
                >
                  {plan.name}
                </p>
                <p
                  className={`text-4xl md:text-5xl font-extrabold mb-1 ${plan.highlighted ? "text-white" : "text-[var(--brand-text)]"}`}
                >
                  {plan.price}
                  <span className="text-lg font-medium opacity-50">
                    {plan.period}
                  </span>
                </p>
                <p
                  className={`text-sm mb-8 ${plan.highlighted ? "text-white/50" : "text-[var(--brand-muted)]"}`}
                >
                  Pause or cancel whenever you wish.
                </p>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? "bg-[var(--brand-accent)]" : "bg-[var(--brand-accent)]/10"}`}
                      >
                        <Check
                          className={`w-3 h-3 ${plan.highlighted ? "text-white" : "text-[var(--brand-accent)]"}`}
                        />
                      </div>
                      <p
                        className={`text-sm font-medium ${plan.highlighted ? "text-white" : "text-[var(--brand-text)]"}`}
                      >
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    className={`flex-1 px-6 py-3.5 rounded-full text-sm font-semibold transition ${
                      plan.highlighted
                        ? "bg-[var(--brand-accent)] text-white hover:opacity-90"
                        : "bg-[var(--brand-primary)] text-white hover:opacity-90"
                    }`}
                  >
                    select plan
                  </button>
                  <button
                    className={`px-6 py-3.5 rounded-full text-sm font-semibold border transition ${
                      plan.highlighted
                        ? "border-white/30 text-white hover:bg-white/10"
                        : "border-gray-300 text-[var(--brand-text)] hover:bg-[var(--brand-bg-alt)]"
                    }`}
                  >
                    quick call
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg-dark)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-widest mb-2">
                Popular Queries
              </p>
              <p className="text-white/40 text-sm uppercase tracking-widest">
                faq
              </p>
            </motion.div>
            <motion.h2
              className="text-white text-3xl md:text-4xl font-extrabold leading-tight max-w-md"
              {...fadeUp}
            >
              Quick and clear answers to your key questions
            </motion.h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>

          <motion.div
            className="mt-16 p-10 rounded-3xl bg-white/5 border border-white/10 text-center"
            {...fadeUp}
          >
            <h3 className="text-white text-2xl font-extrabold mb-3">
              Still looking for answers?
            </h3>
            <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
              Our team will guide you through our design process, project
              specifications and cost estimate.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[var(--brand-accent)] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
              >
                book a call
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition"
              >
                contact us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 lg:py-36 bg-[var(--brand-bg)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-accent)] text-xs font-bold uppercase tracking-widest mb-2">
                Client Stories
              </p>
              <p className="text-[var(--brand-muted)] text-sm uppercase tracking-widest">
                testimonials
              </p>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-extrabold leading-tight"
              {...fadeUp}
            >
              Inspiring client experiences
            </motion.h2>
          </div>
        </div>

        <div className="relative">
          <div className="testimonial-slide flex gap-5 w-max px-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[380px] bg-[var(--brand-bg-alt)] rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg
                      key={s}
                      className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-[var(--brand-muted)]">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-12">
          <motion.div className="flex gap-4" {...fadeUp}>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              membership plans
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-[var(--brand-primary)] text-[var(--brand-primary)] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition"
            >
              view reviewss
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        className="py-24 lg:py-36 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="w-16 h-16 rounded-full bg-[var(--brand-accent)]/10 flex items-center justify-center mx-auto mb-8">
              <div className="w-8 h-8 rounded-full bg-[var(--brand-accent)]" />
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-6">
              We transform brands.
              <br />
              <span className="text-[var(--brand-accent)]">
                Your success is next.
              </span>
            </h2>
            <p className="text-[var(--brand-muted)] text-lg max-w-md mx-auto mb-10">
              Start your project now by booking a one-on-one consultation with
              our expert.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-bold hover:opacity-90 transition"
              >
                book a call <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-[var(--brand-primary)] text-[var(--brand-primary)] px-8 py-4 rounded-full text-sm font-bold hover:bg-[var(--brand-primary)] hover:text-white transition"
              >
                chat on whatsapp
              </a>
            </div>
          </motion.div>

          <motion.div className="mt-20" {...fadeUp}>
            <p className="text-[var(--brand-muted)] text-xs uppercase tracking-widest mb-6">
              Meet the partners who are part of our success story
            </p>
            <div className="overflow-hidden">
              <div className="marquee-track flex items-center gap-12 w-max">
                {[...Array(2)].map((_, setIdx) =>
                  [
                    "Acme Co",
                    "TechFlow",
                    "NovaBrand",
                    "Orbit",
                    "Zenith",
                    "Apex Labs",
                    "Stellar",
                    "Quantum",
                    "Vertex",
                    "Prism",
                  ].map((brand, i) => (
                    <span
                      key={`${setIdx}-${i}`}
                      className="text-gray-300 text-lg font-bold whitespace-nowrap"
                    >
                      {brand}
                    </span>
                  )),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPANDING FOOTER ── */}
      <motion.footer
        ref={footerRef}
        className="relative bg-[var(--brand-bg-dark)] text-white overflow-hidden"
        style={{ scale: footerScale, borderRadius: footerRadius }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-20 pb-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
            <div>
              <p className="text-white/50 text-sm mb-1">
                We are currently based in Philadelphia and work remotely.
              </p>
              <p className="text-white/30 text-xs">Timezone (EST)</p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--brand-accent)]" />
              <span className="text-white/50 text-sm">Philadelphia, PA</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-white/30 text-xs uppercase tracking-widest mb-5">
                Pages
              </h4>
              <div className="space-y-3">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white/30 text-xs uppercase tracking-widest mb-5">
                Legal
              </h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-white/60 text-sm hover:text-white transition-colors"
                >
                  Disclaimer
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white/30 text-xs uppercase tracking-widest mb-5">
                Stay in the Loop
              </h4>
              <p className="text-white/50 text-sm mb-4">
                Stay informed about our latest news and updates.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-[var(--brand-accent)] flex items-center justify-center hover:opacity-90 transition"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-3 mb-16">
            {["Whatsapp", "X (Twitter)", "Linkedin", "Instagram", "Email"].map(
              (social) => (
                <a
                  key={social}
                  href="#"
                  className="flex items-center justify-between py-3 border-b border-white/10 group"
                >
                  <span className="text-white/60 text-sm group-hover:text-white transition">
                    {social}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[var(--brand-accent)] transition" />
                </a>
              ),
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-white/30 text-xs">Online</span>
            </div>
            <div className="text-center">
              <p className="text-white/40 text-xs">David A. Corden, Attorney at Law</p>
              <p className="text-white/30 text-xs">
                230 SW 6th St, Corvallis, OR 97333
              </p>
            </div>
            <p className="text-white/30 text-xs">
              &copy; 2026 David A. Corden. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
