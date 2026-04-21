// REFERENCE: REAL ESTATE DEVELOPER — cinematic dark hero with construction bg, scroll-driven about story, animated stats, property cards, reviews, blog grid, landowners CTA
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Building2,
  Ruler,
  Users,
  Award,
  ChevronDown,
  Calendar,
  User,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Blog", href: "#blog" },
  { label: "Landowners", href: "#landowners" },
  { label: "Contact", href: "#contact" },
];

const scrollStoryPhrases = [
  "We started with a simple idea —",
  "that buildings should serve people,",
  "not the other way around.",
  "For over two decades,",
  "we have designed spaces",
  "where families grow,",
  "businesses thrive,",
  "and communities come alive.",
  "Every project begins with listening.",
  "Every detail is intentional.",
  "This is development done differently.",
];

const stats = [
  {
    value: 22,
    suffix: "+",
    label: "Years",
    description: "of building spaces that people genuinely love living in.",
  },
  {
    value: 98,
    suffix: "%",
    label: "On-time delivery",
    description:
      "because your keys should arrive on time just like we promised.",
  },
  {
    value: 222,
    suffix: "+",
    label: "Projects",
    description: "delivered with care, craftsmanship, and zero shortcuts.",
  },
];

const properties = [
  {
    name: "Orion Sky Penthouses",
    location: "Rittenhouse Square",
    size: "3,800 - 12,500 sq ft",
    categories: ["Penthouse", "Apartment"],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  },
  {
    name: "Verdancia Estate",
    location: "Main Line",
    size: "1,450 - 6,200 sq ft",
    categories: ["Townhouse", "Villa"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  },
  {
    name: "Aurelius Skyline",
    location: "Center City",
    size: "480 - 2,700 sq ft",
    categories: ["Apartment", "Penthouse"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
];

const reviews = [
  {
    text: "The entire process was seamless. From the first consultation to handing over the keys, every step felt thoughtful and well-managed.",
    author: "David Chen",
    role: "Penthouse Owner, Rittenhouse",
  },
  {
    text: "They treated my small studio investment like a flagship project. The attention to detail was extraordinary.",
    author: "Maria Santos",
    role: "Studio Owner, Center City",
  },
  {
    text: "The craftsmanship in our townhouse is remarkable. Every corner reveals another thoughtful design choice.",
    author: "James Mitchell",
    role: "Townhouse Owner, Main Line",
  },
  {
    text: "Moving in felt like an upgrade to my whole lifestyle. The building, the community, everything just works.",
    author: "Sarah Williams",
    role: "Villa Owner, Chestnut Hill",
  },
  {
    text: "I felt part of the Meridian family before I even moved in. Every email got a personal response within hours.",
    author: "Robert Kim",
    role: "Apartment Owner, University City",
  },
  {
    text: "It honestly felt like moving into a community, not just a house. The shared spaces are beautifully designed.",
    author: "Lisa Thompson",
    role: "Townhouse Owner, Society Hill",
  },
];

const services = [
  {
    title: "On-time delivery",
    description:
      "We plan every stage with precision and execute with discipline — so your keys arrive exactly when promised.",
  },
  {
    title: "Prime urban locations",
    description:
      "Our developments sit in carefully selected neighborhoods, offering strong connectivity and long-term value.",
  },
  {
    title: "Top consultants",
    description:
      "From architects to engineers to interior specialists, we collaborate with industry-leading experts.",
  },
  {
    title: "High-quality materials",
    description:
      "Every detail from structural components to interior finishes is sourced to meet elevated standards.",
  },
  {
    title: "Transparent process",
    description:
      "No hidden steps, no hidden costs. We keep you informed at every stage so you always know exactly what is happening.",
  },
  {
    title: "Premium customer support",
    description:
      "Our team is warm, responsive, and always ready to help — offering a smooth, stress-free experience.",
  },
];

const blogPosts = [
  {
    title:
      "A complete guide to choosing the right community amenities before buying a home",
    date: "Dec 5, 2024",
    category: "Guides",
    author: "Michael Rivera",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop",
  },
  {
    title: "Off-plan vs ready property: A complete buyer's comparison guide",
    date: "Dec 16, 2024",
    category: "Guides",
    author: "Michael Rivera",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",
  },
  {
    title: "Meridian wins Excellence in Real Estate Innovation Award",
    date: "Jul 5, 2024",
    category: "News",
    author: "Michael Rivera",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=500&fit=crop",
  },
];

// ─── ANIMATED COUNTER COMPONENT ─────────────────────────────────────────────

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (v) => setDisplayValue(Math.round(v)),
      });
      return controls.stop;
    }
  }, [isInView, target, count]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

// ─── SCROLL STORY SECTION ───────────────────────────────────────────────────

function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative bg-[var(--brand-bg)]"
      style={{ height: `${scrollStoryPhrases.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          {scrollStoryPhrases.map((phrase, i) => (
            <ScrollPhrase
              key={i}
              index={i}
              total={scrollStoryPhrases.length}
              scrollYProgress={scrollYProgress}
              phrase={phrase}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollPhrase({
  index,
  total,
  scrollYProgress,
  phrase,
}: {
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  phrase: string;
}) {
  const start = index / total;
  const peak = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.02), start + 0.03, peak, end - 0.02, end],
    [0, 1, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [start, start + 0.05, peak, end - 0.02, end],
    [60, 0, 0, 0, -40],
  );
  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.05, peak],
    [0.9, 1, 1],
  );

  return (
    <motion.p
      style={{ opacity, y, scale, position: "absolute", left: 0, right: 0 }}
      className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-[family-name:var(--font-display)] font-light leading-tight text-white/90 tracking-[-0.02em] px-6"
    >
      {phrase}
    </motion.p>
  );
}

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function RealDevPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background image with warm sunset construction scene */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop)",
          }}
        />
        {/* Warm golden overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

        {/* ── NAVBAR ── */}
        <nav className="relative z-50 w-full">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white">
              MERIDIAN
              <span className="block text-[10px] font-[family-name:var(--font-body)] tracking-[0.3em] text-white/60 uppercase">
                Development
              </span>
            </span>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/70 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Template <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>

        {/* Horizontal line with keywords */}
        <div className="relative z-10 mt-8 lg:mt-12">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center gap-6">
            <motion.span
              className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Shaping
            </motion.span>
            <motion.div
              className="flex-1 h-px bg-white/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ transformOrigin: "left" }}
            />
            <motion.span
              className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Excellence
            </motion.span>
          </div>
        </div>

        {/* ── HERO CONTENT ── */}
        <div className="relative z-10 flex-1 flex items-end pb-24 lg:pb-32 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto w-full">
            <motion.h1
              className="text-[clamp(2.5rem,6vw,5rem)] font-[family-name:var(--font-display)] font-light leading-[1.1] tracking-[-0.02em] text-white max-w-4xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              Reimagining urban living through sustainable design and
              human-centered development.
            </motion.h1>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="#properties"
                className="inline-flex items-center gap-3 border border-white/40 text-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
              >
                View Properties <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SCROLL-DRIVEN ABOUT STORY ── */}
      <ScrollStorySection />

      {/* ── STATS SECTION ── */}
      <section className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-bg)] border-t border-[var(--brand-border)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
              >
                <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                  <span className="text-[clamp(4rem,8vw,7rem)] font-[family-name:var(--font-display)] font-light text-white leading-none">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[var(--brand-accent)] mt-2 uppercase tracking-widest text-xs">
                  {stat.label}
                </h3>
                <p className="text-[var(--brand-muted)] text-sm mt-3 max-w-xs mx-auto lg:mx-0 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section
        id="properties"
        className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <p className="text-[var(--brand-accent)] text-xs font-medium uppercase tracking-[0.3em] mb-4">
              Featured Properties
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-light leading-tight max-w-2xl">
              Explore standout spaces shaping the future of modern living
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {properties.map((property, i) => (
              <motion.div
                key={property.name}
                className="group property-card cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="relative overflow-hidden aspect-[4/3] rounded-sm">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="property-image w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-white/10 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex items-center gap-2 text-[var(--brand-muted)] text-xs mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{property.location}</span>
                    <span className="mx-2 text-[var(--brand-border)]">|</span>
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{property.size}</span>
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-display)] font-medium group-hover:text-[var(--brand-accent)] transition-colors">
                    {property.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <a
              href="#properties"
              className="inline-flex items-center gap-3 border border-[var(--brand-border)] text-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] transition-all duration-300"
            >
              View All Properties <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CLIENT REVIEWS MARQUEE ── */}
      <section
        id="reviews"
        className="py-32 lg:py-40 bg-[var(--brand-bg-alt)] overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-xs font-medium uppercase tracking-[0.3em] mb-4">
              Client Stories
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-[family-name:var(--font-display)] font-light leading-tight max-w-2xl">
              The compliments we never get tired of hearing
            </h2>
          </motion.div>
        </div>
        <div className="testimonial-marquee flex gap-6 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[420px] bg-[var(--brand-bg)] border border-[var(--brand-border)] rounded-sm p-8"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-accent)]/30 to-[var(--brand-accent)]/10 flex items-center justify-center mb-6">
                <User className="w-5 h-5 text-[var(--brand-accent)]" />
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-[family-name:var(--font-display)] italic text-lg">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-white">
                  {review.author}
                </p>
                <p className="text-xs text-[var(--brand-muted)] mt-1">
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY MERIDIAN (SERVICES ACCORDION) ── */}
      <section
        id="services"
        className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-accent)] text-xs font-medium uppercase tracking-[0.3em] mb-4">
                Why Meridian
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-light leading-tight">
                A collection of promises we actually keep.
              </h2>
            </motion.div>

            <div className="space-y-0">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  className="border-b border-[var(--brand-border)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <button
                    onClick={() =>
                      setExpandedService(expandedService === i ? null : i)
                    }
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <h3 className="text-lg font-medium group-hover:text-[var(--brand-accent)] transition-colors">
                      {service.title}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[var(--brand-muted)] transition-transform duration-300 ${expandedService === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedService === i ? "auto" : 0,
                      opacity: expandedService === i ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-[var(--brand-muted)] text-sm leading-relaxed pb-6 max-w-lg">
                      {service.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section
        id="blog"
        className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            {...fadeUp}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <p className="text-[var(--brand-accent)] text-xs font-medium uppercase tracking-[0.3em] mb-4">
                Blog
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-[family-name:var(--font-display)] font-light leading-tight max-w-xl">
                Your window into real estate, design, and community life
              </h2>
            </div>
            <a
              href="#blog"
              className="hidden md:inline-flex items-center gap-2 text-[var(--brand-accent)] text-xs uppercase tracking-widest hover:underline"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                className="blog-card group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="overflow-hidden aspect-[16/10] rounded-sm mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-image w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-3 text-[var(--brand-muted)] text-[11px] uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="text-[var(--brand-border)]">|</span>
                  <span className="text-[var(--brand-accent)]">
                    {post.category}
                  </span>
                  <span className="text-[var(--brand-border)]">|</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-lg font-[family-name:var(--font-display)] font-medium leading-snug group-hover:text-[var(--brand-accent)] transition-colors">
                  {post.title}
                </h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANDOWNERS CTA ── */}
      <section
        id="landowners"
        className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-bg)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-accent)] text-xs font-medium uppercase tracking-[0.3em] mb-4">
                Landowners
              </p>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-[family-name:var(--font-display)] font-light leading-tight mb-6">
                Are you a Landowner?
              </h2>
              <p className="text-[var(--brand-muted)] text-base leading-relaxed max-w-lg mb-8">
                Thinking about developing your land? Reach out and let&apos;s
                explore how we can turn your location into a landmark that
                serves families and communities for generations.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300"
              >
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              className="relative overflow-hidden aspect-[4/3] rounded-sm"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
                alt="Luxury property exterior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section
        id="contact"
        className="py-32 lg:py-40 px-6 lg:px-12 bg-[var(--brand-bg-alt)] border-t border-[var(--brand-border)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div {...fadeUp}>
              <p className="text-[var(--brand-accent)] text-xs font-medium uppercase tracking-[0.3em] mb-4">
                Contact
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[family-name:var(--font-display)] font-light leading-tight mb-8">
                Let&apos;s build something remarkable together
              </h2>
              <div className="space-y-5 text-[var(--brand-muted)] text-sm">
                <p className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[var(--brand-accent)] flex-shrink-0" />
                  1700 Market Street, Philadelphia, PA 19103
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--brand-accent)] flex-shrink-0" />
                  (215) 555-0320
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--brand-accent)] flex-shrink-0" />
                  hello@meridiandev.com
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[var(--brand-accent)] flex-shrink-0" />
                  Mon - Fri: 9AM - 6PM
                </p>
              </div>
            </motion.div>

            <motion.form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-widest text-[var(--brand-muted)] mb-2 block"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    className="w-full bg-transparent border border-[var(--brand-border)] px-4 py-3.5 text-sm text-white placeholder-[var(--brand-muted)]/50 focus:border-[var(--brand-accent)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-widest text-[var(--brand-muted)] mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@email.com"
                    className="w-full bg-transparent border border-[var(--brand-border)] px-4 py-3.5 text-sm text-white placeholder-[var(--brand-muted)]/50 focus:border-[var(--brand-accent)] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="text-xs uppercase tracking-widest text-[var(--brand-muted)] mb-2 block"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(215) 555-0000"
                    className="w-full bg-transparent border border-[var(--brand-border)] px-4 py-3.5 text-sm text-white placeholder-[var(--brand-muted)]/50 focus:border-[var(--brand-accent)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="interest"
                    className="text-xs uppercase tracking-widest text-[var(--brand-muted)] mb-2 block"
                  >
                    Interest
                  </label>
                  <select
                    id="interest"
                    className="w-full bg-transparent border border-[var(--brand-border)] px-4 py-3.5 text-sm text-[var(--brand-muted)]/50 focus:border-[var(--brand-accent)] focus:outline-none transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select interest
                    </option>
                    <option value="buy">Buying a Property</option>
                    <option value="invest">Investment Opportunity</option>
                    <option value="land">Land Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-widest text-[var(--brand-muted)] mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-transparent border border-[var(--brand-border)] px-4 py-3.5 text-sm text-white placeholder-[var(--brand-muted)]/50 focus:border-[var(--brand-accent)] focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--brand-accent)] text-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Send Message <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 lg:px-12 bg-[var(--brand-bg)] border-t border-[var(--brand-border)]">
        <div className="max-w-[1400px] mx-auto">
          {/* Newsletter + Landowner CTA Row */}
          <div className="grid lg:grid-cols-2 gap-12 pb-16 mb-16 border-b border-[var(--brand-border)]">
            <div>
              <h3 className="text-2xl font-[family-name:var(--font-display)] font-light mb-4">
                Get Property Updates
              </h3>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="jane@email.com"
                  className="flex-1 bg-transparent border border-[var(--brand-border)] px-4 py-3 text-sm text-white placeholder-[var(--brand-muted)]/50 focus:border-[var(--brand-accent)] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[var(--brand-accent)] text-black px-6 py-3 text-xs font-medium uppercase tracking-widest hover:brightness-110 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer columns */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)] mb-6">
                Pages
              </h4>
              <div className="space-y-3">
                {[
                  "Home",
                  "About",
                  "Services",
                  "Properties",
                  "Reviews",
                  "Landowners",
                  "Blog",
                  "Contact",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-[var(--brand-muted)] text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)] mb-6">
                Locations
              </h4>
              <div className="space-y-3">
                {[
                  "Rittenhouse Square",
                  "Center City",
                  "University City",
                  "Main Line",
                  "Chestnut Hill",
                  "Society Hill",
                  "Manayunk",
                  "Old City",
                ].map((loc) => (
                  <a
                    key={loc}
                    href="#"
                    className="block text-[var(--brand-muted)] text-sm hover:text-white transition-colors"
                  >
                    {loc}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)] mb-6">
                Categories
              </h4>
              <div className="space-y-3">
                {[
                  "All",
                  "Apartment",
                  "Townhouse",
                  "Penthouse",
                  "Office Space",
                  "Villa",
                  "Duplex",
                ].map((cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="block text-[var(--brand-muted)] text-sm hover:text-white transition-colors"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-[var(--brand-accent)] mb-6">
                Socials
              </h4>
              <div className="space-y-3">
                {[
                  "LinkedIn",
                  "Instagram",
                  "Facebook",
                  "X / Twitter",
                  "YouTube",
                ].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="block text-[var(--brand-muted)] text-sm hover:text-white transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Giant Logo */}
          <div className="mb-12">
            <span className="text-[clamp(5rem,15vw,12rem)] font-[family-name:var(--font-display)] font-light leading-none text-white/5 select-none block">
              MERI<span className="text-white/10">DIAN</span>
            </span>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--brand-border)]">
            <p className="text-[var(--brand-muted)] text-xs">
              &copy; 2026 Meridian Development. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-[var(--brand-muted)] text-xs hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[var(--brand-muted)] text-xs hover:text-white transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
