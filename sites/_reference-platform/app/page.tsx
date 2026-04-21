// REFERENCE: PLATFORM — SOURCE: https://plat-form.framer.ai/
"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Globe,
  Lock,
  Layers,
  Activity,
  Star,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Send,
  Play,
  Clock,
  Users,
  TrendingUp,
  Eye,
  CircleDot,
  Sparkles,
  Box,
  ChevronLeft,
} from "lucide-react";

// ─── HELPERS ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="w-6 h-6 rounded-full border border-[var(--brand-border)] flex items-center justify-center">
        <CircleDot size={10} className="text-[var(--brand-primary)]" />
      </div>
      <span className="section-marker">
        {number} / {label}
      </span>
    </div>
  );
}

function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

// ─── PARTICLE BACKGROUND (dense twinkling star dust on black) ───
function ParticleField() {
  // Dense cluster of particles — concentrated more toward center
  const particles = Array.from({ length: 200 }, (_, i) => {
    // Bias particles toward center for nebula cluster effect
    const centerBias = Math.random() < 0.6;
    const x = centerBias
      ? 30 + Math.random() * 40 + (Math.random() - 0.5) * 20
      : Math.random() * 100;
    const y = centerBias
      ? 25 + Math.random() * 50 + (Math.random() - 0.5) * 20
      : Math.random() * 100;
    // Some particles are bright "stars", most are dim dust
    const isStar = Math.random() < 0.15;
    return {
      id: i,
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
      size: isStar ? Math.random() * 3 + 2 : Math.random() * 2 + 0.5,
      isStar,
      delay: Math.random() * 12,
      duration: isStar ? Math.random() * 3 + 2 : Math.random() * 8 + 6,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep black base */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Primary warm glow — golden nebula center-right */}
      <div
        className="absolute top-[35%] left-[45%] w-[800px] h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200, 120, 60, 0.18) 0%, rgba(180, 100, 40, 0.08) 30%, transparent 65%)",
        }}
      />
      {/* Secondary orange bloom — lower right */}
      <div
        className="absolute top-[50%] left-[60%] w-[500px] h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(220, 140, 70, 0.12) 0%, transparent 55%)",
        }}
      />
      {/* Subtle warm wash across center */}
      <div
        className="absolute top-[30%] left-[30%] w-[1000px] h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(160, 100, 50, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Twinkling particles — rendered as CSS-animated dots */}
      {particles.map((p) =>
        p.isStar ? (
          // Bright twinkling stars with glow
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: "white",
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(255,255,255,0.4), 0 0 ${p.size * 6}px ${p.size * 2}px rgba(255,255,255,0.15)`,
            }}
            animate={{
              opacity: [0.3, 0.9, 0.4, 1, 0.3],
              scale: [1, 1.3, 0.9, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          // Dim floating dust particles
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -(Math.random() * 25 + 5), 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
              opacity: [0.05, 0.3 + Math.random() * 0.3, 0.05],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ),
      )}

      {/* Extra static dust layer via CSS radial dots — adds density without JS cost */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 25% 45%, white 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 40% 15%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 55% 70%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 70% 35%, white 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 85% 55%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 15% 75%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 60% 90%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 90% 15%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 35% 85%, white 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 50% 40%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 75% 80%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 20% 55%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 80% 25%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 45% 60%, white 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 65% 10%, white 50%, transparent 100%)
          `,
        }}
      />

      {/* Second static dust layer offset for more density */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 5% 10%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 18% 38%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 32% 62%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 48% 22%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 62% 48%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 78% 72%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 92% 32%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 8% 88%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 42% 52%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 58% 8%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 72% 92%, white 50%, transparent 100%),
            radial-gradient(1px 1px at 88% 42%, white 50%, transparent 100%)
          `,
        }}
      />
    </div>
  );
}

// ─── NAV ───
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    "Work",
    "Services",
    "Process",
    "Analytics",
    "Pricing",
    "Team",
    "Blog",
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--brand-bg)]/90 backdrop-blur-xl border-b border-[var(--brand-border)]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
        >
          plat<span className="text-[var(--brand-primary)]">form</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#pricing"
            className="text-sm text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
          >
            Log in
          </a>
          <a
            href="#contact"
            className="text-sm px-5 py-2 rounded-full bg-[var(--brand-primary)] text-[var(--brand-bg)] font-medium hover:brightness-110 transition-all"
          >
            Book a Demo
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[var(--brand-bg)] border-b border-[var(--brand-border)] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="text-sm text-[var(--brand-muted)]"
                  onClick={() => setOpen(false)}
                >
                  {l}
                </a>
              ))}
              <a
                href="#contact"
                className="text-sm px-5 py-2 rounded-full bg-[var(--brand-primary)] text-[var(--brand-bg)] font-medium text-center mt-2"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ───
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      <ParticleField />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-8 min-h-[calc(100vh-64px)] flex flex-col justify-between">
        {/* Top row: tagline left, neural network card right */}
        <div className="flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pt-4"
          >
            <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
              You innovate,
              <br />
              <span className="text-[var(--brand-text)] font-medium">
                we automate.
              </span>
            </p>
          </motion.div>

          {/* Neural Network card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="glass-card rounded-2xl p-4 pr-6 flex items-center gap-4 group cursor-pointer hover:border-[var(--brand-primary)]/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] flex items-center justify-center">
                <Cpu size={20} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--brand-text)]">
                  Neural Network
                </div>
                <div className="text-xs text-[var(--brand-muted)]">
                  // Latest Release
                </div>
              </div>
              <motion.div
                className="ml-4 w-8 h-8 rounded-full border border-[var(--brand-primary)] flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <ArrowRight size={14} className="text-[var(--brand-primary)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Center: giant headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex items-center justify-center py-8"
        >
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold leading-[1.05] tracking-tight text-center max-w-5xl">
            — The smarter way
            <br />
            to <span className="text-[var(--brand-primary)]">
              build, run,
            </span>{" "}
            and
            <br />
            <span className="text-[var(--brand-primary)]">scale</span> your
            business.
          </h1>
        </motion.div>

        {/* Bottom row: CTA left, stats center-left, template card right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-end justify-between flex-wrap gap-6 pb-6"
        >
          {/* CTA section */}
          <div className="flex flex-col gap-3">
            <p className="text-sm text-[var(--brand-muted)]">
              <span className="font-medium text-[var(--brand-text)]">
                See Platform in action
              </span>
              <br />
              <span className="text-xs">
                Join our guided tour and explore
                <br />
                all features live.
              </span>
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--brand-primary)] text-[var(--brand-bg)] font-medium text-sm hover:brightness-110 transition-all w-fit"
            >
              Book a Demo
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-end gap-10">
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold">
                  97.8
                </span>
                <span className="text-sm text-[var(--brand-primary)] font-medium align-super">
                  %
                </span>
              </div>
              <div className="text-xs text-[var(--brand-muted)] mt-1">
                Uptime
              </div>
              <div className="text-[10px] text-[var(--brand-muted)]/60">
                30-day monitoring
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold">
                  +31.2
                </span>
                <span className="text-sm text-[var(--brand-primary)] font-medium align-super">
                  %
                </span>
              </div>
              <div className="text-xs text-[var(--brand-muted)] mt-1">
                Performance
              </div>
              <div className="text-[10px] text-[var(--brand-muted)]/60">
                AI optimized bundle
              </div>
            </div>
          </div>

          {/* Template preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-xl p-3 w-48">
              <div className="w-full h-24 rounded-lg bg-gradient-to-b from-[var(--brand-bg-card)] to-[var(--brand-bg-alt)] mb-3 flex items-center justify-center overflow-hidden">
                <div className="text-xs text-[var(--brand-muted)]/40 font-[family-name:var(--font-display)] tracking-wider">
                  PREVIEW
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[var(--brand-muted)]">
                    New Template
                  </div>
                  <div className="text-sm font-medium font-[family-name:var(--font-display)]">
                    vertical
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--brand-primary)] text-[var(--brand-bg)] font-medium">
                    Preview
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-[var(--brand-muted)]">
                Buy Template
                <ArrowRight size={10} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SCROLL TEXT REVEAL (typing + 3D orange polyhedrons) ───
function ScrollTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hero fade out
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const fullText =
    "We run your infrastructure so you can focus on building great products.";
  const totalChars = fullText.length;

  // Text reveal maps scroll to character count — faster reveal
  const revealedChars = useTransform(
    scrollYProgress,
    [0.05, 0.6],
    [0, totalChars],
  );

  // Orange balls float upward as scroll progresses
  const ballY1 = useTransform(scrollYProgress, [0.15, 0.8], [200, -80]);
  const ballY2 = useTransform(scrollYProgress, [0.2, 0.85], [300, -50]);
  const ballY3 = useTransform(scrollYProgress, [0.18, 0.75], [250, -120]);
  const ballOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.8, 0.95],
    [0, 1, 1, 0],
  );
  const ballScale1 = useTransform(scrollYProgress, [0.15, 0.5], [0.6, 1]);
  const ballScale2 = useTransform(scrollYProgress, [0.2, 0.55], [0.5, 1]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Persistent particle background */}
        <ParticleField />

        {/* Hero content fading out */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 z-10 pointer-events-none"
        />

        {/* Typing text */}
        <div className="relative z-20 flex items-center h-full max-w-6xl mx-auto px-6">
          <div className="w-full">
            <ScrollTypingText
              fullText={fullText}
              revealedChars={revealedChars}
            />
          </div>
        </div>

        {/* 3D Orange polyhedron balls */}
        <div
          className="absolute inset-0 z-15 pointer-events-none"
          style={{ perspective: "1200px" }}
        >
          {/* Ball 1 — large, right side */}
          <motion.div
            className="absolute right-[12%] bottom-[20%]"
            style={{
              y: ballY1,
              opacity: ballOpacity,
              scale: ballScale1,
            }}
          >
            <OrangePolyhedron size={140} hue={0} />
          </motion.div>

          {/* Ball 2 — medium, right-center */}
          <motion.div
            className="absolute right-[25%] bottom-[10%]"
            style={{
              y: ballY2,
              opacity: ballOpacity,
              scale: ballScale2,
            }}
          >
            <OrangePolyhedron size={110} hue={10} />
          </motion.div>

          {/* Ball 3 — small, far right with glow */}
          <motion.div
            className="absolute right-[5%] bottom-[30%]"
            style={{
              y: ballY3,
              opacity: ballOpacity,
              scale: ballScale1,
            }}
          >
            <OrangePolyhedron size={70} hue={-5} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScrollTypingText({
  fullText,
  revealedChars,
}: {
  fullText: string;
  revealedChars: MotionValue<number>;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = revealedChars.on("change", (v: number) => {
      setCount(Math.round(v));
    });
    return unsubscribe;
  }, [revealedChars]);

  const revealed = fullText.slice(0, count);
  const unrevealed = fullText.slice(count);

  // Split into words for wrapping, preserving which chars are revealed
  // We render the full text but color unrevealed chars as dim
  return (
    <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.08] tracking-tight">
      <span className="text-[var(--brand-text)]">{revealed}</span>
      <span className="text-[var(--brand-text)]/[0.08]">{unrevealed}</span>
    </h2>
  );
}

// CSS-only 3D polyhedron (icosahedron-inspired faceted ball)
function OrangePolyhedron({ size, hue }: { size: number; hue: number }) {
  const baseColor = `hsl(${20 + hue}, 70%, 55%)`;
  const lightColor = `hsl(${20 + hue}, 75%, 65%)`;
  const darkColor = `hsl(${20 + hue}, 65%, 40%)`;
  const shadowColor = `hsl(${20 + hue}, 60%, 30%)`;

  return (
    <motion.div
      className="relative"
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: [0, 15, -10, 5, 0],
        rotateY: [0, -20, 15, -10, 0],
        rotateZ: [0, 5, -5, 3, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Multi-faceted ball using layered gradients */}
      <div
        className="absolute inset-0 rounded-[35%]"
        style={{
          background: `
            radial-gradient(ellipse at 30% 25%, ${lightColor} 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, ${shadowColor} 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, ${baseColor} 0%, ${darkColor} 100%)
          `,
          boxShadow: `
            inset -8px -8px 20px rgba(0,0,0,0.4),
            inset 6px 6px 15px rgba(255,200,150,0.2),
            0 0 60px rgba(212,132,90,0.3),
            0 0 120px rgba(212,132,90,0.15)
          `,
        }}
      />
      {/* Facet highlights */}
      <div
        className="absolute inset-[15%] rounded-[40%] opacity-30"
        style={{
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(255,200,150,0.3) 30deg,
              transparent 60deg,
              rgba(255,180,130,0.2) 120deg,
              transparent 150deg,
              rgba(255,200,150,0.25) 210deg,
              transparent 240deg,
              rgba(255,180,130,0.15) 300deg,
              transparent 330deg
            )
          `,
        }}
      />
      {/* Specular highlight */}
      <div
        className="absolute top-[12%] left-[18%] w-[30%] h-[25%] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,230,200,0.6) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// ─── PRODUCT RENDER VISUALS ───
// ─── PRODUCT IMAGE CARDS (Unsplash stock images) ───
const PRODUCT_IMAGES = {
  neuralCore:
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80&fit=crop",
  designEngine:
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80&fit=crop",
  scaleMatrix:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
  neuralNet:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop",
  shieldCore:
    "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&q=80&fit=crop",
};

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0f0e0d]">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Subtle dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </div>
  );
}

function ProductImageWithPlay({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#0f0e0d]">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        <Play size={16} className="text-[var(--brand-bg)] ml-0.5" />
      </motion.div>
    </div>
  );
}

function PlatformSuitePanel() {
  // Animated floating dots/particles
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[var(--brand-primary)]">
      {/* Moving dots pattern */}
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -15, 5, -20, 0],
            x: [0, 8, -5, 12, 0],
            opacity: [0.1, 0.3, 0.15, 0.25, 0.1],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col justify-between h-full">
        <div>
          <div className="text-xs text-white/60 uppercase tracking-wider mb-2">
            Product Groups
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
            Platform Suite
            <br />
            Neural-Powered
            <br />
            Infrastructure
          </h3>
          <p className="text-sm text-white/70 max-w-xs leading-relaxed">
            A complete system of smart products that transform how
            infrastructure thinks, learns, and evolves.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <CircleDot size={10} className="text-white" />
          <span>Neural intelligence inside</span>
        </div>
      </div>
    </div>
  );
}

// ─── OUR WORK (001) ───
function OurWork() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="work" className="py-32 border-t border-[var(--brand-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              Our Work
            </h2>
            <div className="flex items-start gap-8">
              <div>
                <div className="text-xs text-[var(--brand-muted)] uppercase tracking-wider mb-1">
                  001
                </div>
                <div className="text-xs text-[var(--brand-muted)]">
                  plat—form
                </div>
              </div>
              <p className="text-[var(--brand-muted)] max-w-md leading-relaxed">
                Designed with purpose, automated for speed and built to help you
                move faster, with less friction.
              </p>
            </div>
          </motion.div>

          {/* Hero product grid — 2 large cards side by side */}
          <motion.div
            variants={fadeUp}
            className="grid md:grid-cols-[1.2fr_0.8fr] gap-3 mb-3"
          >
            {/* Neural Core — featured */}
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-[380px]">
              <ProductImage src={PRODUCT_IMAGES.neuralCore} alt="Neural Core" />
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                  Featured Product
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  Neural Core
                </h3>
              </div>
            </div>

            {/* Platform Suite — orange panel */}
            <div className="h-[380px]">
              <PlatformSuitePanel />
            </div>
          </motion.div>

          {/* Description + CTA row */}
          <motion.div
            variants={fadeUp}
            className="grid md:grid-cols-[1.2fr_0.8fr] gap-3 mb-3"
          >
            <div className="glass-card rounded-2xl p-8 flex flex-col justify-between">
              <p className="text-[var(--brand-muted)] leading-relaxed max-w-md">
                Transform how your infrastructure thinks and evolves. Neural
                Core combines AI-driven automation with intelligent scaling to
                create a self-evolving system.
              </p>
              <div className="mt-6">
                <motion.div
                  className="w-10 h-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowRight size={16} className="text-[var(--brand-bg)]" />
                </motion.div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 flex items-center justify-center">
              <div className="flex items-center gap-2 text-xs text-[var(--brand-muted)]">
                <CircleDot size={10} className="text-[var(--brand-primary)]" />
                Neural intelligence inside
              </div>
            </div>
          </motion.div>

          {/* Small product cards — 3 col with image renders */}
          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-3 gap-3 mb-3"
          >
            <div className="group cursor-pointer">
              <div className="h-52 mb-0 overflow-hidden rounded-2xl relative">
                <ProductImageWithPlay
                  src={PRODUCT_IMAGES.designEngine}
                  alt="Design Engine"
                />
              </div>
              <div className="glass-card rounded-b-2xl rounded-t-none p-4 -mt-[1px]">
                <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm">
                  Design Engine
                </h4>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="h-52 mb-0 overflow-hidden rounded-2xl relative">
                <ProductImageWithPlay
                  src={PRODUCT_IMAGES.scaleMatrix}
                  alt="Scale Matrix"
                />
              </div>
              <div className="glass-card rounded-b-2xl rounded-t-none p-4 -mt-[1px]">
                <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm">
                  Scale Matrix
                </h4>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="h-52 mb-0 overflow-hidden rounded-2xl relative">
                <ProductImageWithPlay
                  src={PRODUCT_IMAGES.neuralNet}
                  alt="Neural Net"
                />
              </div>
              <div className="glass-card rounded-b-2xl rounded-t-none p-4 -mt-[1px]">
                <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm">
                  Neural Net
                </h4>
              </div>
            </div>
          </motion.div>

          {/* Bottom row: Shield Core + version */}
          <motion.div
            variants={fadeUp}
            className="grid sm:grid-cols-[1fr_2fr] gap-3"
          >
            <div className="group cursor-pointer">
              <div className="h-44 overflow-hidden rounded-2xl relative">
                <ProductImageWithPlay
                  src={PRODUCT_IMAGES.shieldCore}
                  alt="Shield Core"
                />
              </div>
              <div className="glass-card rounded-b-2xl rounded-t-none p-4 -mt-[1px]">
                <h4 className="font-[family-name:var(--font-display)] font-semibold text-sm">
                  Shield Core
                </h4>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 flex items-end justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold">
                  Neural Core{" "}
                  <span className="text-[var(--brand-primary)]">4.0b</span>
                </h3>
                <p className="text-sm text-[var(--brand-muted)] mt-2">
                  Early beta access now available.
                </p>
              </div>
              <a
                href="#contact"
                className="text-xs text-[var(--brand-primary)] flex items-center gap-1 hover:underline"
              >
                Buy Template <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── OUR SERVICES (002) ───
function OurServices() {
  const { ref, isInView } = useScrollReveal();
  const [activeService, setActiveService] = useState(0);
  const services = [
    {
      num: "01",
      title: "Neural Network",
      desc: "A self-learning intelligence core that observes, learns, and makes smart decisions in milliseconds to optimize your operations.",
      tag: "learning",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&fit=crop",
    },
    {
      num: "02",
      title: "Architecture",
      desc: "Cloud-native infrastructure built for scale and resilience.",
      tag: "architecture",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&fit=crop",
    },
    {
      num: "03",
      title: "Protection",
      desc: "Zero-trust security framework with real-time threat detection.",
      tag: "protection",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&q=80&fit=crop",
    },
    {
      num: "04",
      title: "Growth",
      desc: "Data-driven scaling strategies that optimize cost and performance.",
      tag: "growth",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fit=crop",
    },
  ];

  return (
    <section
      id="services"
      className="py-32 bg-[var(--brand-bg-alt)] border-t border-[var(--brand-border)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              Our Services
            </h2>
            <div className="flex items-start justify-between gap-8">
              <div className="flex items-start gap-8">
                <div>
                  <div className="text-xs text-[var(--brand-muted)] uppercase tracking-wider mb-1">
                    002
                  </div>
                  <div className="text-xs text-[var(--brand-muted)]">
                    plat—form
                  </div>
                </div>
                <p className="text-[var(--brand-muted)] max-w-md leading-relaxed">
                  Flexible solutions for building modern digital infrastructure.
                </p>
              </div>
              <p className="text-xs text-[var(--brand-muted)] max-w-[180px] text-right hidden md:block">
                Future-proof systems that scale seamlessly.
              </p>
            </div>
          </motion.div>

          {/* Main content grid: numbered columns left + text panel right */}
          <motion.div
            variants={fadeUp}
            className="grid lg:grid-cols-[1fr_1fr] gap-3"
          >
            {/* Left: numbered service columns */}
            <div className="grid grid-cols-4 gap-2 h-[420px]">
              {services.map((s, i) => (
                <div
                  key={s.num}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    activeService === i ? "col-span-1" : "col-span-1"
                  }`}
                  onClick={() => setActiveService(i)}
                >
                  {activeService === i ? (
                    /* Active card — orange bg with image + content */
                    <div className="h-full bg-[var(--brand-primary)] rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="text-xs text-white/60 mb-1">
                          ↘ {s.num}
                        </div>
                        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white leading-tight mb-2">
                          {s.title}
                        </h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">
                        {s.tag}
                      </div>
                      {/* Background image overlay */}
                      <div className="absolute inset-0 opacity-20">
                        <img
                          src={s.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Inactive card — dark with number + image */
                    <div className="h-full glass-card rounded-2xl overflow-hidden flex flex-col">
                      <div className="p-3 flex items-center gap-2">
                        <span className="text-xs text-[var(--brand-muted)]">
                          ↓
                        </span>
                        <span className="text-xs text-[var(--brand-muted)]">
                          {s.num}
                        </span>
                      </div>
                      <div className="flex-1 relative">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)] via-transparent to-transparent" />
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] text-[var(--brand-muted)] uppercase tracking-wider">
                          {s.tag}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: description panel */}
            <div className="glass-card rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] text-[var(--brand-muted)] uppercase tracking-wider">
                    Core Services
                  </span>
                  <span className="text-[10px] text-[var(--brand-muted)]">
                    4/4
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold leading-tight mb-4">
                  Modular, flexible
                  <br />
                  solutions for modern
                  <br />
                  digital infrastructure
                </h3>
                <p className="text-sm text-[var(--brand-muted)] leading-relaxed max-w-sm">
                  We create future-proof systems that scale seamlessly and adapt
                  to your business needs. Platform&apos;s key capabilities
                  include:
                </p>
              </div>

              {/* Dot grid pattern */}
              <div className="mt-6 grid grid-cols-8 gap-2">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        i < 12 ? "var(--brand-primary)" : "var(--brand-border)",
                      opacity: i < 12 ? 0.8 : 0.4,
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-[var(--brand-muted)]">
                <Shield size={12} className="text-[var(--brand-primary)]" />
                Design, optimize, scale, and secure.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── OUR PROCESS (003) ───
function OurProcess() {
  const { ref, isInView } = useScrollReveal();
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      num: "01",
      title: "Smart Connect",
      fullDesc:
        "Platform AI analyzes your tech stack and swiftly configures your ideal environment. One connection is all it takes to set everything up following industry best practices.",
      metric: "30",
      metricUnit: "sec",
      metricLabel: "Average connection time",
    },
    {
      num: "02",
      title: "Deep Scan",
      fullDesc:
        "Full-stack analysis identifies bottlenecks, vulnerabilities, and optimization opportunities across your entire infrastructure.",
      metric: "500+",
      metricUnit: "",
      metricLabel: "Data points analyzed",
    },
    {
      num: "03",
      title: "Auto Scale",
      fullDesc:
        "Dynamic resource allocation adapts to your traffic patterns in real-time, ensuring peak performance at optimal cost.",
      metric: "99.99",
      metricUnit: "%",
      metricLabel: "Uptime guaranteed",
    },
    {
      num: "04",
      title: "Auto Guard",
      fullDesc:
        "Continuous monitoring with automated threat response and compliance checks protect your infrastructure 24/7.",
      metric: "<1",
      metricUnit: "ms",
      metricLabel: "Threat response",
    },
  ];

  const processImage =
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80&fit=crop";

  return (
    <section
      id="process"
      className="py-32 border-t border-[var(--brand-border)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              Our Process
            </h2>
            <div className="flex items-start justify-between gap-8">
              <div className="flex items-start gap-8">
                <div>
                  <div className="text-xs text-[var(--brand-muted)] uppercase tracking-wider mb-1">
                    003
                  </div>
                  <div className="text-xs text-[var(--brand-muted)]">
                    plat—form
                  </div>
                </div>
                <p className="text-[var(--brand-muted)] max-w-md leading-relaxed">
                  Optimized processes through simplified workflows.
                </p>
              </div>
              <p className="text-xs text-[var(--brand-muted)] max-w-[180px] text-right hidden md:block">
                Seamless operations and processes from start to finish.
              </p>
            </div>
          </motion.div>

          {/* Main content: image left + card right */}
          <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-3">
            {/* Left: large product image with orange glow */}
            <div className="relative rounded-2xl overflow-hidden h-[520px] bg-[#0f0e0d]">
              <img
                src={processImage}
                alt="Platform Process"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
              {/* Orange glow at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[30%]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(212,132,90,0.25), transparent)",
                }}
              />
              {/* Top label */}
              <div className="absolute top-4 left-4 text-[10px] text-white/50 uppercase tracking-wider">
                Platform Process
              </div>
              {/* Step indicators */}
              <div className="absolute top-4 right-4 flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeStep === i
                        ? "bg-[var(--brand-primary)] w-6"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: step card */}
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-8 flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Navigation arrows */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setActiveStep(Math.max(0, activeStep - 1))
                          }
                          className="w-8 h-8 rounded-full border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-muted)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          onClick={() =>
                            setActiveStep(
                              Math.min(steps.length - 1, activeStep + 1),
                            )
                          }
                          className="w-8 h-8 rounded-full border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-muted)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-4">
                      Step {steps[activeStep].num} — {steps[activeStep].title}
                    </h3>
                    <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                      {steps[activeStep].fullDesc}
                    </p>
                  </div>

                  {/* Bottom: metric + CTA */}
                  <div className="mt-8 flex items-end justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-[family-name:var(--font-display)] text-4xl font-bold">
                          {steps[activeStep].metric}
                        </span>
                        <span className="text-sm text-[var(--brand-primary)] font-medium">
                          {steps[activeStep].metricUnit}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--brand-muted)] mt-1">
                        {steps[activeStep].metricLabel}
                      </div>
                    </div>

                    <div className="text-right">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--brand-primary)] text-[var(--brand-bg)] text-sm font-medium hover:brightness-110 transition-all"
                      >
                        <Send size={14} />
                        Book a Demo
                      </a>
                      <p className="text-[10px] text-[var(--brand-muted)] mt-2">
                        Book a demo to see
                        <br />
                        the process in action.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SMART ANALYTICS (004) ───
function SmartAnalytics() {
  const { ref, isInView } = useScrollReveal();

  const evolutionData = [
    { label: "Integration", value: 38, color: "#D4845A" },
    { label: "Efficiency", value: 79, color: "#4A9EAF" },
    { label: "Security", value: 92, color: "#E8956A" },
    { label: "Scaling", value: 84, color: "#8B6F47" },
    { label: "Uptime", value: 98, color: "#6BC5A0" },
  ];

  const cities = [
    { name: "Amsterdam", status: "online", latency: "12ms" },
    { name: "New York", status: "online", latency: "8ms" },
    { name: "Dubai", status: "online", latency: "18ms" },
    { name: "Singapore", status: "online", latency: "22ms" },
    { name: "Tokyo", status: "online", latency: "15ms" },
  ];

  const partners = [
    "Vercel",
    "Stripe",
    "AWS",
    "Cloudflare",
    "GitHub",
    "Docker",
    "MongoDB",
    "Redis",
  ];

  return (
    <section
      id="analytics"
      className="py-32 bg-[var(--brand-bg-alt)] border-t border-[var(--brand-border)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionMarker number="004" label="Smart Analytics" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-4">
              Real-time intelligence
            </h2>
            <p className="text-[var(--brand-muted)] max-w-lg">
              Every metric, every node, every millisecond — monitored and
              optimized.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* System Health — Donut */}
            <motion.div
              variants={fadeUp}
              className="glass-card rounded-2xl p-6"
            >
              <h4 className="text-sm text-[var(--brand-muted)] mb-6">
                System Health
              </h4>
              <div className="flex items-center justify-center">
                <div
                  className="donut-chart w-40 h-40 relative"
                  style={{
                    background: `conic-gradient(
                      #6BC5A0 0deg 270deg,
                      #D4845A 270deg 320deg,
                      #E8956A 320deg 345deg,
                      rgba(255,255,255,0.05) 345deg 360deg
                    )`,
                  }}
                >
                  <div className="w-28 h-28 rounded-full bg-[var(--brand-bg-alt)] flex flex-col items-center justify-center">
                    <span className="font-[family-name:var(--font-display)] text-2xl font-bold">
                      97.2
                    </span>
                    <span className="text-[10px] text-[var(--brand-muted)]">
                      Health Score
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="w-2 h-2 rounded-full bg-[#6BC5A0] mx-auto mb-1" />
                  <span className="text-[10px] text-[var(--brand-muted)]">
                    Core
                  </span>
                </div>
                <div>
                  <div className="w-2 h-2 rounded-full bg-[#D4845A] mx-auto mb-1" />
                  <span className="text-[10px] text-[var(--brand-muted)]">
                    Network
                  </span>
                </div>
                <div>
                  <div className="w-2 h-2 rounded-full bg-[#E8956A] mx-auto mb-1" />
                  <span className="text-[10px] text-[var(--brand-muted)]">
                    Storage
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Global Status — Bars */}
            <motion.div
              variants={fadeUp}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm text-[var(--brand-muted)]">
                  Global Status
                </h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All Systems
                </span>
              </div>
              <div className="flex items-end gap-[3px] h-32">
                {Array.from({ length: 30 }, (_, i) => {
                  const h = 20 + Math.random() * 80;
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        backgroundColor:
                          h > 80
                            ? "#6BC5A0"
                            : h > 50
                              ? "var(--brand-primary)"
                              : "var(--brand-accent)",
                      }}
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${h}%` } : {}}
                      transition={{ duration: 0.8, delay: i * 0.03 }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-3 text-[10px] text-[var(--brand-muted)]">
                <span>00:00</span>
                <span>12:00</span>
                <span>24:00</span>
              </div>
            </motion.div>

            {/* City Nodes */}
            <motion.div
              variants={fadeUp}
              className="glass-card rounded-2xl p-6"
            >
              <h4 className="text-sm text-[var(--brand-muted)] mb-6">
                Active Nodes
              </h4>
              <div className="space-y-3">
                {cities.map((city, i) => (
                  <motion.div
                    key={city.name}
                    className="flex items-center justify-between py-2 border-b border-[var(--brand-border)] last:border-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        style={{
                          animation: "pulseDot 2s infinite",
                          animationDelay: `${i * 0.3}s`,
                        }}
                      />
                      <span className="text-sm">{city.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--brand-primary)] font-mono">
                        {city.latency}
                      </span>
                      <span className="text-[10px] text-emerald-400 uppercase">
                        {city.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Evolution Score */}
          <motion.div
            variants={fadeUp}
            className="glass-card rounded-2xl p-6 mt-6"
          >
            <h4 className="text-sm text-[var(--brand-muted)] mb-6">
              Evolution Score
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              {evolutionData.map((d, i) => (
                <div key={d.label} className="text-center">
                  <div className="h-32 flex items-end justify-center mb-3">
                    <motion.div
                      className="w-12 rounded-t-lg"
                      style={{ backgroundColor: d.color }}
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${d.value}%` } : {}}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                  <div className="font-[family-name:var(--font-display)] font-bold text-lg">
                    {d.value}%
                  </div>
                  <div className="text-[10px] text-[var(--brand-muted)] mt-1">
                    {d.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Partner logos marquee */}
          <motion.div variants={fadeUp} className="mt-6 overflow-hidden">
            <div className="text-xs text-[var(--brand-muted)] mb-4 text-center uppercase tracking-widest">
              Trusted Partners
            </div>
            <div className="relative">
              <div className="flex marquee-track">
                {[...partners, ...partners].map((p, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 mx-8 text-sm text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors font-[family-name:var(--font-display)] font-semibold"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* News ticker */}
          <motion.div
            variants={fadeUp}
            className="mt-6 glass-card rounded-full py-3 px-6 overflow-hidden"
          >
            <div className="flex marquee-track-reverse">
              {[
                "Platform v4.2 released — 30% faster inference",
                "New Singapore node live — APAC latency reduced by 40%",
                "SOC 2 Type II certification achieved",
                "Series B: $85M raised to scale globally",
                "Platform v4.2 released — 30% faster inference",
                "New Singapore node live — APAC latency reduced by 40%",
                "SOC 2 Type II certification achieved",
                "Series B: $85M raised to scale globally",
              ].map((news, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 mx-8 text-sm text-[var(--brand-muted)] flex items-center gap-2"
                >
                  <Zap size={12} className="text-[var(--brand-primary)]" />
                  {news}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PRICING (005) ───
function Pricing() {
  const { ref, isInView } = useScrollReveal();
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Studio",
      price: yearly ? 39 : 49,
      desc: "For individuals and small teams getting started.",
      features: [
        "5 Projects",
        "10GB Storage",
        "Basic Analytics",
        "Email Support",
        "API Access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Scale",
      price: yearly ? 69 : 89,
      desc: "For growing teams that need more power and flexibility.",
      features: [
        "Unlimited Projects",
        "100GB Storage",
        "Advanced Analytics",
        "Priority Support",
        "Custom Integrations",
        "Team Collaboration",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Supreme",
      price: yearly ? 199 : 249,
      desc: "Enterprise-grade infrastructure for large organizations.",
      features: [
        "Everything in Scale",
        "1TB Storage",
        "Custom SLA",
        "Dedicated Support",
        "On-premise Option",
        "Audit Logs",
        "SSO / SAML",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-32 border-t border-[var(--brand-border)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionMarker number="005" label="Pricing" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-[var(--brand-muted)] max-w-md mx-auto mb-8">
              Start free, scale when ready. No hidden fees.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-full border border-[var(--brand-border)]">
              <button
                onClick={() => setYearly(false)}
                className={`text-sm px-4 py-1.5 rounded-full transition-all ${
                  !yearly
                    ? "bg-[var(--brand-primary)] text-[var(--brand-bg)]"
                    : "text-[var(--brand-muted)]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`text-sm px-4 py-1.5 rounded-full transition-all ${
                  yearly
                    ? "bg-[var(--brand-primary)] text-[var(--brand-bg)]"
                    : "text-[var(--brand-muted)]"
                }`}
              >
                Yearly
                <span className="ml-1 text-[10px] text-emerald-400">-20%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`rounded-3xl p-8 relative ${
                  plan.popular
                    ? "bg-[var(--brand-primary)] text-[var(--brand-bg)]"
                    : "glass-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--brand-bg)] text-[var(--brand-primary)] text-xs px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mb-6 ${plan.popular ? "text-[var(--brand-bg)]/70" : "text-[var(--brand-muted)]"}`}
                >
                  {plan.desc}
                </p>
                <div className="mb-8">
                  <span className="font-[family-name:var(--font-display)] text-5xl font-bold">
                    ${plan.price}
                  </span>
                  <span
                    className={`text-sm ${plan.popular ? "text-[var(--brand-bg)]/70" : "text-[var(--brand-muted)]"}`}
                  >
                    /mo
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check
                        size={14}
                        className={
                          plan.popular
                            ? "text-[var(--brand-bg)]"
                            : "text-[var(--brand-primary)]"
                        }
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full text-sm font-medium transition-all ${
                    plan.popular
                      ? "bg-[var(--brand-bg)] text-[var(--brand-text)] hover:opacity-90"
                      : "border border-[var(--brand-border)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ (006) ───
function FAQ() {
  const { ref, isInView } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does Platform integrate with existing infrastructure?",
      a: "Platform connects to your existing stack through our Smart Connect protocol. It supports all major cloud providers, databases, and CI/CD pipelines out of the box. Setup typically takes under 5 minutes.",
    },
    {
      q: "What kind of uptime guarantee do you offer?",
      a: "We guarantee 99.99% uptime on our Scale and Supreme plans. Our distributed architecture across 12 global regions ensures redundancy and minimal latency.",
    },
    {
      q: "Can I migrate from another platform?",
      a: "Yes. Our migration toolkit handles automated data transfer from competing platforms. Most migrations complete within 24 hours with zero downtime.",
    },
    {
      q: "Is my data encrypted?",
      a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We also support customer-managed encryption keys on the Supreme plan.",
    },
    {
      q: "Do you offer custom enterprise solutions?",
      a: "Absolutely. Our enterprise team works directly with large organizations to build custom infrastructure solutions, including on-premise deployments and dedicated support.",
    },
    {
      q: "What programming languages are supported?",
      a: "Platform supports all major languages and frameworks including Node.js, Python, Go, Rust, Java, and .NET. Our SDKs make integration seamless.",
    },
    {
      q: "How does billing work?",
      a: "We bill monthly or yearly (with a 20% discount). You can upgrade, downgrade, or cancel at any time. No long-term contracts required.",
    },
    {
      q: "What support channels are available?",
      a: "Studio plans include email support. Scale adds priority chat support with 2-hour response times. Supreme includes dedicated account management and 24/7 phone support.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-32 bg-[var(--brand-bg-alt)] border-t border-[var(--brand-border)]"
    >
      <div className="max-w-3xl mx-auto px-6">
        <SectionMarker number="006" label="Q&A" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-4">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border-b border-[var(--brand-border)]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-sm sm:text-base pr-8">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      size={18}
                      className="text-[var(--brand-muted)] group-hover:text-[var(--brand-primary)] transition-colors"
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-[var(--brand-muted)] pb-5 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TEAM (007) ───
function Team() {
  const { ref, isInView } = useScrollReveal();

  const members = [
    { name: "Alex Mercer", role: "CEO & Co-founder", color: "#D4845A" },
    { name: "Sarah Chen", role: "CTO", color: "#4A9EAF" },
    { name: "Marcus Webb", role: "Head of Design", color: "#E8956A" },
    { name: "Lina Patel", role: "VP Engineering", color: "#8B6F47" },
    { name: "James Okafor", role: "Head of Sales", color: "#6BC5A0" },
    { name: "Eva Lindström", role: "Lead Architect", color: "#9B8EC4" },
  ];

  return (
    <section id="team" className="py-32 border-t border-[var(--brand-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionMarker number="007" label="Meet the Team" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={fadeUp}
            className="mb-16 grid md:grid-cols-2 gap-8"
          >
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold">
              The people behind
              <br />
              the platform
            </h2>
            <div className="flex items-end">
              <p className="text-[var(--brand-muted)] max-w-md">
                A diverse team of engineers, designers, and strategists building
                the future of infrastructure.
              </p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((m) => (
              <motion.div
                key={m.name}
                variants={fadeUp}
                className="glass-card rounded-2xl p-6 group"
              >
                {/* Photo placeholder */}
                <div
                  className="w-full aspect-[4/5] rounded-xl mb-5 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${m.color}30, ${m.color}10)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 40%, ${m.color} 0%, transparent 70%)`,
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-[var(--brand-bg)]/50 backdrop-blur flex items-center justify-center hover:bg-[var(--brand-bg)]/80 transition-all"
                    >
                      <Twitter size={12} />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-[var(--brand-bg)]/50 backdrop-blur flex items-center justify-center hover:bg-[var(--brand-bg)]/80 transition-all"
                    >
                      <Linkedin size={12} />
                    </a>
                  </div>
                </div>
                <h4 className="font-[family-name:var(--font-display)] font-semibold text-lg">
                  {m.name}
                </h4>
                <p className="text-sm text-[var(--brand-muted)]">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS (008) ───
function Testimonials() {
  const { ref, isInView } = useScrollReveal();
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      quote:
        "Platform reduced our infrastructure costs by 40% while improving reliability. The automation is genuinely impressive.",
      name: "David Park",
      role: "CTO, Nexus Labs",
      color: "#D4845A",
    },
    {
      quote:
        "We migrated our entire stack in under a day. The Smart Connect feature is a game-changer for enterprise teams.",
      name: "Maria Santos",
      role: "VP Engineering, Flux",
      color: "#4A9EAF",
    },
    {
      quote:
        "The analytics dashboard alone is worth the price. Real-time visibility into every corner of our infrastructure.",
      name: "Ryan O'Brien",
      role: "Lead DevOps, Vertex",
      color: "#E8956A",
    },
    {
      quote:
        "After trying every platform on the market, this is the one that actually delivers on its promises. Clean, fast, reliable.",
      name: "Aisha Kimura",
      role: "Founder, CloudScale",
      color: "#8B6F47",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-32 bg-[var(--brand-bg-alt)] border-t border-[var(--brand-border)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionMarker number="008" label="Testimonials" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-4">
              What clients say
            </h2>
          </motion.div>

          {/* Active testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-3xl p-8 sm:p-12 mb-8"
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-[var(--brand-primary)] fill-[var(--brand-primary)]"
                      />
                    ))}
                  </div>
                  <blockquote className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-medium leading-relaxed mb-8">
                    &ldquo;{testimonials[active].quote}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-semibold">
                      {testimonials[active].name}
                    </div>
                    <div className="text-sm text-[var(--brand-muted)]">
                      {testimonials[active].role}
                    </div>
                  </div>
                </div>
                <div
                  className="w-32 h-32 rounded-2xl hidden md:block"
                  style={{
                    background: `linear-gradient(135deg, ${testimonials[active].color}40, ${testimonials[active].color}15)`,
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnail nav */}
          <div className="flex gap-3 justify-center">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${
                  active === i
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10"
                    : "border-[var(--brand-border)] hover:border-[var(--brand-muted)]"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}60, ${t.color}30)`,
                  }}
                />
                <span className="text-xs text-[var(--brand-muted)] hidden sm:inline">
                  {t.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── BLOG (009) ───
function Blog() {
  const { ref, isInView } = useScrollReveal();

  const posts = [
    {
      title: "Scaling to 10M Requests: Lessons Learned",
      category: "Engineering",
      date: "Mar 2026",
      color: "#D4845A",
    },
    {
      title: "Zero-Trust Architecture in Practice",
      category: "Security",
      date: "Feb 2026",
      color: "#4A9EAF",
    },
    {
      title: "The Future of Edge Computing",
      category: "Research",
      date: "Feb 2026",
      color: "#E8956A",
    },
    {
      title: "Building ML Pipelines That Scale",
      category: "AI / ML",
      date: "Jan 2026",
      color: "#8B6F47",
    },
  ];

  return (
    <section id="blog" className="py-32 border-t border-[var(--brand-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionMarker number="009" label="Platform Labs" />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={fadeUp}
            className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-4">
                From the lab
              </h2>
              <p className="text-[var(--brand-muted)]">
                Technical deep-dives and engineering insights.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[var(--brand-primary)] hover:underline"
            >
              View all posts <ArrowRight size={14} />
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <motion.article
                key={post.title}
                variants={fadeUp}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-[var(--brand-primary)]/20 transition-all"
              >
                <div
                  className="h-40 relative"
                  style={{
                    background: `linear-gradient(135deg, ${post.color}15, ${post.color}05)`,
                  }}
                >
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[var(--brand-muted)]">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-[family-name:var(--font-display)] font-semibold mb-3 group-hover:text-[var(--brand-primary)] transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--brand-muted)]">
                      {post.date}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-[var(--brand-muted)] group-hover:text-[var(--brand-primary)] transition-colors"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer
      id="contact"
      className="py-20 bg-[var(--brand-bg-alt)] border-t border-[var(--brand-border)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <a
              href="#"
              className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight"
            >
              plat<span className="text-[var(--brand-primary)]">form</span>
            </a>
            <p className="text-sm text-[var(--brand-muted)] mt-4 leading-relaxed">
              The smarter way to build, run, and scale your business
              infrastructure.
            </p>
            <div className="flex gap-3 mt-6">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-muted)] hover:text-[var(--brand-text)] hover:border-[var(--brand-muted)] transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: [
                "Features",
                "Pricing",
                "Security",
                "Roadmap",
                "Changelog",
              ],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press", "Contact"],
            },
            {
              title: "Resources",
              links: [
                "Documentation",
                "API Reference",
                "Status",
                "Support",
                "Community",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="font-[family-name:var(--font-display)] font-semibold mb-4 text-sm">
                {col.title}
              </h5>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="glass-card rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2">
                Stay in the loop
              </h4>
              <p className="text-sm text-[var(--brand-muted)]">
                Engineering insights and product updates. No spam.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-[var(--brand-bg)] border border-[var(--brand-border)] rounded-full px-5 py-3 text-sm text-[var(--brand-text)] placeholder:text-[var(--brand-muted)]/50 focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
              />
              <button className="px-6 py-3 rounded-full bg-[var(--brand-primary)] text-[var(--brand-bg)] text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2">
                <Send size={14} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--brand-border)]">
          <span className="text-xs text-[var(--brand-muted)]">
            &copy; 2026 Platform. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ───
export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <ScrollTextReveal />
      <OurWork />
      <OurServices />
      <OurProcess />
      <SmartAnalytics />
      <Pricing />
      <FAQ />
      <Team />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}
