// REFERENCE: NORDIQ — Scandinavian furniture design studio, warm cream palette, giant brand text hero,
// scroll-rotating product, category marquee, materials with tree icons, elegant testimonials,
// studio tour, rotating words, collection showcases, awards list, newsletter footer
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Play,
  TreePine,
  TreeDeciduous,
  Leaf,
  Sprout,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Collection", href: "#collection" },
  { label: "Showroom", href: "#showroom" },
  { label: "Clients", href: "#clients" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

const categories = [
  { name: "Chairs", href: "#collection" },
  { name: "Sofas", href: "#collection" },
  { name: "Sidetables", href: "#collection" },
  { name: "Tables", href: "#collection" },
  { name: "Beds", href: "#collection" },
  { name: "Decor", href: "#collection" },
];

const featuredProducts = [
  {
    name: "Arvo Lounge Chair",
    price: "EUR 2,500",
    sku: "8465456",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
  },
  {
    name: "Tova Side Table",
    price: "EUR 1,200",
    sku: "7834521",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    name: "Soft Cotton Sofa",
    price: "EUR 4,800",
    sku: "6523187",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  },
];

const processSteps = [
  {
    title: "Sourcing",
    description:
      "We begin with honest materials -- responsibly sourced wood, textiles and metal -- selected for longevity and beauty.",
  },
  {
    title: "Design & Proportion",
    description:
      "Each piece is thoughtfully shaped to balance function and form. We refine proportions, ergonomics and visual weight.",
  },
  {
    title: "Crafting",
    description:
      "Our workshop brings the design to life using traditional joinery, precision tools and human touch.",
  },
  {
    title: "Finishing & Assembly",
    description:
      "Natural oils, soft matte coatings and hand-polished surfaces complete the piece -- ready to live in real spaces.",
  },
];

const materials = [
  {
    name: "Birch",
    icon: TreePine,
    description:
      "Smooth, fine-grained hardwood with high strength and light color. Takes stains evenly and resists warping.",
  },
  {
    name: "Pine",
    icon: TreeDeciduous,
    description:
      "Lightweight and easy to work with. Warm tone and natural charm with soft texture for graceful aging.",
  },
  {
    name: "Oak",
    icon: Leaf,
    description:
      "Very hard and dense with a pronounced grain. Naturally resistant to moisture and wear.",
  },
  {
    name: "Ash",
    icon: Sprout,
    description:
      "Tough and elastic with straight grain and good shock resistance. Bends well and finishes smoothly.",
  },
];

const testimonials = [
  {
    name: "Lena Whitmore",
    role: "Interior Designer at Northlight Concepts",
    text: "Every detail was perfect -- from materials to final finish. True craftsmanship you can feel.",
  },
  {
    name: "John Rivers",
    role: "Creative Director at Studio Vento",
    text: "They understood our brand vision instantly and translated it into timeless furniture.",
  },
  {
    name: "Astrid Engman",
    role: "Architect at Form & Light",
    text: "The quality speaks for itself. Our clients always notice the Nordiq pieces first.",
  },
  {
    name: "Marcus Holm",
    role: "Founder at Holm Residences",
    text: "Working with their team felt like a true collaboration. Every piece tells a story.",
  },
];

const awards = [
  { year: "2025", name: "Scandinavian Design Awards", medal: "Gold" },
  { year: "2025", name: "European Furniture Prize", medal: "Gold" },
  { year: "2024", name: "International Craft & Form Fair", medal: "Silver" },
  {
    year: "2023",
    name: "Minimal Design Showcase, Copenhagen",
    medal: "Bronze",
  },
  { year: "2022", name: "Global Woodwork Excellence Awards", medal: "Gold" },
];

const stories = [
  {
    date: "Jul 25, 2025",
    title: "NORDIQ Wins Gold at Scandinavian Design Awards 2025",
    excerpt: "Recognized for timeless design and material integrity.",
  },
  {
    date: "Jul 25, 2025",
    title: "Introducing the Arvo Collection",
    excerpt: "Minimal seating, crafted in ash and made to move between spaces.",
  },
];

const rotatingWords = [
  "Crafted for calm",
  "Natural materials only",
  "Scandinavian soul",
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function RotatingProductImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div
      ref={ref}
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ rotateY: rotate, scale }}
        className="w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl"
      >
        <img
          src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80"
          alt="Featured chair"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative">
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-display)] leading-snug mb-10">
          &ldquo;{testimonials[current].text}&rdquo;
        </p>
        <p className="text-sm font-semibold tracking-wide uppercase">
          {testimonials[current].name}
        </p>
        <p className="text-sm text-[var(--brand-muted)] mt-1">
          {testimonials[current].role}
        </p>
      </motion.div>
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full border border-[var(--brand-text)]/20 flex items-center justify-center hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-[var(--brand-muted)] tabular-nums">
          {current + 1} / {testimonials.length}
        </span>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full border border-[var(--brand-text)]/20 flex items-center justify-center hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function NordiqPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextScale = useTransform(heroScroll, [0, 0.5], [1, 1.3]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroImageY = useTransform(heroScroll, [0, 0.5], [0, -80]);
  const heroImageScale = useTransform(heroScroll, [0, 0.5], [1, 1.15]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--brand-bg)]/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-xl tracking-[0.15em] uppercase font-normal"
          >
            NORDIQ
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[var(--brand-text)]/70 hover:text-[var(--brand-text)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="divider" />
      </nav>

      {/* ── HERO ── */}
      <section
        id="top"
        ref={heroRef}
        className="relative min-h-[100vh] flex flex-col justify-center pt-20 overflow-hidden"
      >
        {/* Giant NORDIQ text */}
        <motion.div
          style={{ scale: heroTextScale, opacity: heroTextOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <h1 className="text-[clamp(6rem,20vw,18rem)] font-[family-name:var(--font-display)] tracking-[-0.02em] leading-none text-[var(--brand-text)]">
            NORDIQ
          </h1>
        </motion.div>

        {/* Chair image overlaying the text */}
        <motion.div
          style={{ y: heroImageY, scale: heroImageScale }}
          className="relative z-10 flex justify-center mx-auto max-w-[600px] w-full"
        >
          <img
            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80"
            alt="Signature wooden chair"
            className="w-full h-auto max-h-[70vh] object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Bottom info bar */}
        <div className="relative z-10 mt-auto pb-8 px-6 lg:px-12">
          <div className="divider mb-6" />
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <motion.h2
              className="text-2xl md:text-3xl font-[family-name:var(--font-display)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Intelligent Comfort. Naturally.
            </motion.h2>
            <motion.div
              className="flex items-center gap-8 text-sm text-[var(--brand-muted)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="tel:+46866577 88"
                className="hover:text-[var(--brand-text)] transition-colors"
              >
                +46 8 665 77 88
              </a>
              <span>Stockholm, Sweden</span>
            </motion.div>
          </div>
          <div className="divider mt-6" />
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#about"
              className="w-10 h-10 rounded-full border border-[var(--brand-text)]/20 flex items-center justify-center hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] transition-all"
            >
              <ArrowDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 lg:py-40 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-6">
              About
            </p>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-[family-name:var(--font-display)] leading-[1.15] max-w-4xl">
              From raw materials to warm products — all in one studio.
            </h2>
          </motion.div>
          <motion.div
            className="mt-12 grid md:grid-cols-2 gap-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg text-[var(--brand-muted)] leading-relaxed">
              We are a Stockholm-based design studio crafting furniture that
              blends Scandinavian minimalism with organic warmth. Every piece
              starts as raw timber and leaves our workshop as a lasting
              companion for real living spaces.
            </p>
            <p className="text-lg text-[var(--brand-muted)] leading-relaxed">
              Our approach is simple: use fewer materials, use them better, and
              let the natural character of each grain guide the final form. No
              veneer. No shortcuts. Just honest craft.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY MARQUEE ── */}
      <section className="py-6 border-y border-[var(--brand-text)]/10 overflow-hidden">
        <div className="marquee-track flex gap-0 w-max">
          {[...categories, ...categories, ...categories, ...categories].map(
            (cat, i) => (
              <a
                key={i}
                href={cat.href}
                className="flex-shrink-0 px-10 py-3 text-3xl md:text-5xl font-[family-name:var(--font-display)] text-[var(--brand-text)]/20 hover:text-[var(--brand-text)] transition-colors whitespace-nowrap"
              >
                {cat.name}
              </a>
            ),
          )}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS (scroll-rotating image) ── */}
      <section id="collection" className="py-32 lg:py-40 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            {...fadeUp}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4">
                Collection
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)]">
                Featured Products
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                className="w-12 h-12 rounded-full border border-[var(--brand-text)]/20 flex items-center justify-center hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-[var(--brand-text)]/20 flex items-center justify-center hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.name}
                className="group cursor-pointer"
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="relative aspect-[3/4] bg-[var(--brand-bg-alt)] rounded-xl overflow-hidden mb-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-lg font-[family-name:var(--font-display)]">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-[var(--brand-muted)]">
                    {product.price}
                  </p>
                  <p className="text-xs text-[var(--brand-muted)]">
                    SKU [{product.sku}]
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROTATING PRODUCT ON SCROLL ── */}
      <RotatingProductImage />

      {/* ── PROCESS ── */}
      <section className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-dark)] text-[var(--brand-bg)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-warm)] mb-6">
              Process
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] mb-20">
              How we craft
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative"
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="text-7xl font-[family-name:var(--font-display)] text-[var(--brand-warm)]/15 leading-none block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-[family-name:var(--font-display)] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--brand-bg)]/60 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIALS (with tree icons) ── */}
      <section className="py-32 lg:py-40 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-6">
              Materials
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)]">
              Our Materials
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {materials.map((mat, i) => (
              <motion.div
                key={mat.name}
                className="group"
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--brand-bg-alt)] flex items-center justify-center mb-6 group-hover:bg-[var(--brand-accent)]/10 transition-colors">
                  <mat.icon className="w-7 h-7 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-xl font-[family-name:var(--font-display)] mb-3">
                  {mat.name}
                </h3>
                <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                  {mat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id="clients"
        className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-6">
              Testimonials
            </p>
          </motion.div>
          <motion.div {...fadeUp}>
            <TestimonialCarousel />
          </motion.div>
        </div>
      </section>

      {/* ── COLLECTION SHOWCASE 1 ── */}
      <section className="relative overflow-hidden">
        <motion.div className="relative h-[70vh] overflow-hidden" {...fadeUp}>
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80"
            alt="New Sidetables Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-12 left-12 text-white">
            <p className="text-sm tracking-[0.2em] uppercase mb-2">2026</p>
            <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-display)]">
              New Sidetables Collection
            </h3>
          </div>
          <a
            href="#collection"
            className="absolute bottom-12 right-12 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* ── STUDIO TOUR ── */}
      <section id="showroom" className="py-32 lg:py-40 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            {...fadeUp}
            className="relative rounded-2xl overflow-hidden h-[500px] bg-[var(--brand-dark)]"
          >
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80"
              alt="Studio Tour"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                aria-label="Play studio tour"
              >
                <Play className="w-8 h-8 text-[var(--brand-dark)] ml-1" />
              </button>
            </div>
            <div className="absolute bottom-12 left-12">
              <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-2">
                Experience
              </p>
              <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] text-white">
                Studio Tour
              </h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ROTATING WORDS MARQUEE ── */}
      <section className="py-10 border-y border-[var(--brand-text)]/10 overflow-hidden bg-[var(--brand-dark)]">
        <div className="words-marquee flex gap-0 w-max">
          {[
            ...rotatingWords,
            ...rotatingWords,
            ...rotatingWords,
            ...rotatingWords,
            ...rotatingWords,
            ...rotatingWords,
          ].map((word, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-12 text-3xl md:text-5xl font-[family-name:var(--font-display)] text-[var(--brand-bg)]/30 whitespace-nowrap"
            >
              {word}
              <span className="inline-block mx-8 text-[var(--brand-warm)]/40">
                /
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* ── COLLECTION SHOWCASE 2 ── */}
      <section className="relative overflow-hidden">
        <motion.div className="relative h-[70vh] overflow-hidden" {...fadeUp}>
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80"
            alt="Organic Beds Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-12 left-12 text-white">
            <p className="text-sm tracking-[0.2em] uppercase mb-2">2025</p>
            <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-display)]">
              Organic Beds Collection
            </h3>
          </div>
          <a
            href="#collection"
            className="absolute bottom-12 right-12 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* ── COLLABORATION & AWARDS ── */}
      <section className="py-32 lg:py-40 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20">
          {/* Collaboration */}
          <motion.div {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-6">
              Collaboration
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-[family-name:var(--font-display)] mb-6">
              We work with interior designers, architects and spatial thinkers.
            </h2>
            <p className="text-[var(--brand-muted)] leading-relaxed mb-8">
              Whether you are furnishing a private home, a boutique hotel, or a
              curated retail space -- we offer tailored solutions and dedicated
              support throughout the process.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[var(--brand-text)] text-[var(--brand-bg)] px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Awards */}
          <motion.div {...fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-6">
              Awards
            </p>
            <p className="text-lg text-[var(--brand-muted)] mb-10">
              We don&apos;t design for trophies. We design to earn respect.
            </p>
            <div className="space-y-0">
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 py-5 border-b border-[var(--brand-text)]/10 group hover:bg-[var(--brand-bg-alt)] transition-colors px-4 -mx-4 rounded-lg"
                >
                  <span className="text-sm text-[var(--brand-muted)] w-12 flex-shrink-0">
                    {award.year}
                  </span>
                  <span className="flex-1 text-sm">{award.name}</span>
                  <span className="text-sm font-medium text-[var(--brand-accent)]">
                    {award.medal}
                  </span>
                </div>
              ))}
              <div className="pt-6">
                <a
                  href="#about"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] hover:text-[var(--brand-text)] transition-colors"
                >
                  2010 - 2025 &mdash; View All Awards
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STORIES ── */}
      <section
        id="stories"
        className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            {...fadeUp}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4">
                Journal
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)]">
                Stories
              </h2>
            </div>
            <a
              href="#stories"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition"
            >
              All Stories <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {stories.map((story, i) => (
              <motion.article
                key={story.title}
                className="group cursor-pointer"
                {...stagger}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="aspect-[16/10] bg-[var(--brand-dark)] rounded-xl overflow-hidden mb-6">
                  <img
                    src={`https://images.unsplash.com/photo-${i === 0 ? "1524758631624-e2822e304c36" : "1555041469-a586c61ea9bc"}?w=800&q=80`}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                </div>
                <time className="text-xs text-[var(--brand-muted)]">
                  {story.date}
                </time>
                <h3 className="text-xl font-[family-name:var(--font-display)] mt-2 mb-2 group-hover:text-[var(--brand-accent)] transition-colors">
                  {story.title}
                </h3>
                <p className="text-sm text-[var(--brand-muted)]">
                  {story.excerpt}
                </p>
                <span className="inline-block mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-text)] group-hover:text-[var(--brand-accent)] transition-colors">
                  Read More
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER + FOOTER ── */}
      <footer
        id="contact"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-dark)] text-[var(--brand-bg)]"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Newsletter */}
          <motion.div {...fadeUp} className="mb-24">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] mb-4">
              Subscribe to Newsletter
            </h2>
            <p className="text-[var(--brand-bg)]/50 mb-10">
              Get furniture notes, once a month
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="mail@gmail.com"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand-warm)]"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-[var(--brand-bg)] text-[var(--brand-dark)] text-sm font-medium hover:opacity-90 transition"
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          {/* Footer Grid */}
          <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg tracking-[0.15em] uppercase mb-4">
                NORDIQ
              </p>
              <p className="text-sm text-[var(--brand-bg)]/50 leading-relaxed">
                Stockholm, Sweden
                <br />
                Lofstromsvagen 8, 57 office
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors"
                  aria-label="Twitter"
                >
                  <span className="text-xs">X</span>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors"
                  aria-label="Instagram"
                >
                  <span className="text-xs">IG</span>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors"
                  aria-label="YouTube"
                >
                  <span className="text-xs">YT</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-bg)]/40 mb-5">
                Navigate
              </h4>
              <div className="space-y-3">
                {[
                  "Collection",
                  "Showroom",
                  "Clients",
                  "About",
                  "Stories",
                  "Contact",
                ].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-sm text-[var(--brand-bg)]/60 hover:text-[var(--brand-bg)] transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-bg)]/40 mb-5">
                Company
              </h4>
              <div className="space-y-3">
                {[
                  "Become a Supplier",
                  "Clients",
                  "Returns",
                  "Delivery",
                  "Documents",
                  "Terms of Use",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-sm text-[var(--brand-bg)]/60 hover:text-[var(--brand-bg)] transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-bg)]/40 mb-5">
                Contact
              </h4>
              <div className="space-y-3 text-sm text-[var(--brand-bg)]/60">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" /> +46 8 665 77 88
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" /> hello@nordiq.studio
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" /> Stockholm, Sweden
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <p className="text-[var(--brand-bg)]/30 text-sm">
              &copy; NORDIQ - Furniture Design Studio. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
