// REFERENCE: MOBIUS — massive black typography hero, word-by-word text reveal, image cards, marquee ticker, lettered services, animated stats, awards, founders, logo marquee, process timeline, testimonials carousel, pricing, blog feed, conversational contact form, FAQ
"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Feed", href: "#feed" },
  { label: "Contact", href: "#contact" },
];

const heroWords = [
  "design",
  "studio",
  "shaping",
  "brands",
  "and",
  "digital",
  "experiences",
  "through",
  "motion,",
  "clarity,",
  "and",
  "timeless",
  "craft.",
  "Based",
  "online,",
  "working",
  "globally,",
  "we",
  "help",
  "ambitious",
  "teams",
  "express",
  "who",
  "they",
  "are",
  "and",
  "what",
  "they",
  "stand",
  "for.",
];

const projectImages = [
  { id: 1, color: "#1a1a1a", label: "Vela Studio", category: "Brand Identity" },
  {
    id: 2,
    color: "#2d2d2d",
    label: "Arcton Labs",
    category: "Digital Experience",
  },
  { id: 3, color: "#404040", label: "Norrhaven", category: "Visual System" },
  { id: 4, color: "#555555", label: "Lumen Tech", category: "Website Design" },
];

const manifestoWords = [
  "Vertex",
  "brings",
  "ideas",
  "and",
  "design",
  "together,",
  "turning",
  "imagination",
  "into",
  "clarity",
  "and",
  "connection",
  "into",
  "beauty.",
];

const services = [
  {
    letter: "A",
    title:
      "We create identity systems that bring clarity and distinction to brands — thoughtful visuals, cohesive structure, and design that lasts.",
    items: [
      "Brand Strategy",
      "Visual Identity System",
      "Logo & Mark Development",
      "Typography & Color System",
      "Guidelines & Asset Library",
    ],
  },
  {
    letter: "B",
    title:
      "We design intuitive, expressive digital experiences shaped by strong visual direction and seamless interaction across all screens.",
    items: [
      "Website & Platform Design",
      "Interaction & Motion Guidelines",
      "UI Systems",
      "Component Libraries",
      "Responsive Layouts",
    ],
  },
  {
    letter: "C",
    title:
      "We guide ideas from concept to execution, shaping visual and narrative direction for consistent expression across every touchpoint.",
    items: [
      "Visual Direction",
      "Campaign Concepts",
      "Art Direction for Photo & Film",
      "Tone & Narrative Guidance",
      "Style Frameworks",
    ],
  },
  {
    letter: "D",
    title:
      "We help teams make confident decisions by defining direction, sharpening positioning, and building the foundation for meaningful growth.",
    items: [
      "Brand Positioning",
      "Market & Audience Insights",
      "Naming & Messaging",
      "Design Audits",
      "Roadmaps & Recommendations",
    ],
  },
];

const statsCards = [
  {
    number: "25",
    label: "International",
    sublabel: "Awards",
    description:
      "Recognized across global juries for clarity, craft, and concept.",
    link: "Our Awards",
  },
  {
    number: "42",
    label: "Clients",
    sublabel: "Worldwide",
    description:
      "Built relationships, not transactions. We partner with teams who value dialogue, trust, and shared ambition.",
    link: "Our Clients",
  },
  {
    number: "83",
    label: "Completed",
    sublabel: "Projects",
    description:
      "Each project becomes part of the studio's rhythm. Ideas shaped, stories refined, and systems brought to life.",
    link: "Our Work",
  },
];

const awards = [
  { name: "Red Dot", category: "Brand & Communication Design" },
  { name: "European Design Awards", category: "Visual Identity" },
  { name: "ADC Europe", category: "Branding & Typography" },
  { name: "D&AD", category: "Digital Design" },
  { name: "Tokyo TDC", category: "Typography Excellence" },
  { name: "Awwwards", category: "Site of the Day" },
  { name: "Awwwards", category: "Honorable Mention" },
  { name: "FWA", category: "Site of the Day" },
];

const founders = [
  { name: "Jonas Richter", role: "Co-Founder & Creative Director" },
  { name: "Tobias Keller", role: "Co-Founder & Design Director" },
];

const partnerLogos = [
  "Stripe",
  "Notion",
  "Linear",
  "Figma",
  "Vercel",
  "Arc",
  "Raycast",
  "Pitch",
  "Framer",
  "Webflow",
  "Loom",
];

const processSteps = [
  {
    label: "Discovery",
    title: "Discovery",
    description:
      "We start by listening. This phase is about understanding your goals, audience, and challenges \u2014 finding clarity before we begin designing.",
  },
  {
    label: "Strategy",
    title: "Strategy",
    description:
      "We translate insights into direction. Here, we define the concept, structure, and creative approach that shape your brand or digital product.",
  },
  {
    label: "Design & Build",
    title: "Design & Build",
    description:
      "Ideas take form. From visual identity to interactive experience, we design, prototype, and develop with precision and care.",
  },
  {
    label: "Launch & Beyond",
    title: "Launch & Beyond",
    description:
      "Delivery is only the beginning. We test, refine, and support long after launch \u2014 ensuring the work performs and evolves over time.",
  },
];

const testimonials = [
  {
    quote:
      "They turned our complex ideas into something clear and elegant. They understood our goals quickly and shaped a design language that feels natural to us.",
    author: "Clara Jensen",
    company: "Vela Studio",
    number: 1,
  },
  {
    quote:
      "They delivered a level of clarity we'd been missing for years. Took our scattered thoughts and shaped them into a cohesive identity that finally feels right.",
    author: "Jonas Berg",
    company: "Arcton Labs",
    number: 2,
  },
  {
    quote:
      "Working with Vertex was refreshingly straightforward. Strong ideas, precise execution, and a calm process from start to finish. The result speaks for itself.",
    author: "Markus Lehn",
    company: "Lumen Technologies",
    number: 3,
  },
  {
    quote:
      "They brought clarity to a project that had lost direction. They listened, understood our needs, and delivered a system that feels modern and grounded.",
    author: "Daniel Weiss",
    company: "Helio Projects",
    number: 4,
  },
  {
    quote:
      "From the very first meeting, there was a sense of trust. They challenged our assumptions and the result was stronger for it.",
    author: "Sophie Adler",
    company: "Norrhaven Collective",
    number: 5,
  },
];

const pricingPlans = [
  {
    name: "Foundation Package",
    description:
      "For early-stage companies or brands in need of a clear visual foundation.",
    items: [
      "Discovery session",
      "Brand direction",
      "Logo & mark",
      "Visual system",
      "Color & typography",
      "Basic brand guidelines",
    ],
    price: "$5,200",
    originalPrice: "$6,500",
  },
  {
    name: "Studio Package",
    description: "For websites, platforms, or digital-first brands.",
    items: [
      "UX structure & sitemap",
      "UI design",
      "Component system",
      "Responsive layouts",
      "Interaction & motion direction",
    ],
    price: "$6,400",
    originalPrice: "$8,000",
    featured: true,
  },
  {
    name: "Signature Package",
    description:
      "For teams that want everything aligned, from identity to digital presence.",
    items: [
      "Brand identity",
      "Digital design",
      "Visual language",
      "Motion direction",
      "Guidelines",
    ],
    price: "$11,200",
    originalPrice: "$14,000",
  },
];

const blogPosts = [
  {
    date: "April 26, 2026",
    title: "The Logic of Emotion",
    excerpt:
      "In design, clarity isn't about simplicity for its own sake. It's about removing what doesn't serve meaning.",
  },
  {
    date: "March 29, 2026",
    title: "Precision Over Perfection",
    excerpt:
      "Design isn't about getting everything right \u2014 it's about making the right things matter.",
  },
];

const faqItems = [
  {
    question: "How do you start a new project?",
    answer:
      "We start by listening. Every project begins with a short discovery phase where we learn about your goals, audience, and what makes your brand unique.",
  },
  {
    question: "Can you help with strategy, not just design?",
    answer:
      "Yes \u2014 strategy is part of everything we do. Before we design, we help define your message, audience, and creative direction.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A small website or brand refresh may take 4\u20136 weeks, while a full identity and digital system could span 8\u201312 weeks.",
  },
  {
    question: "What if I don't know exactly what I need?",
    answer:
      "That's completely fine. Many collaborations start that way. We'll guide you through discovery to define what makes sense.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── WORD REVEAL COMPONENT ──────────────────────────────────────────────────

function WordReveal({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"],
  });

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap gap-x-[0.35em] gap-y-1 leading-relaxed">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <WordItem
              key={`${word}-${i}`}
              word={word}
              range={[start, end]}
              progress={scrollYProgress}
            />
          );
        })}
      </p>
    </div>
  );
}

function WordItem({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  );
}

// ─── MANIFESTO WORD REVEAL ──────────────────────────────────────────────────

function ManifestoReveal({ words }: { words: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.25"],
  });

  return (
    <div ref={containerRef}>
      <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.15] tracking-[-0.03em] flex flex-wrap gap-x-[0.3em] gap-y-1">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <WordItem
              key={`m-${word}-${i}`}
              word={word}
              range={[start, end]}
              progress={scrollYProgress}
            />
          );
        })}
      </h2>
    </div>
  );
}

// ─── STATS COUNTER ──────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}

// ─── FAQ ITEM ──────────────────────────────────────────────────────────────

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-[var(--brand-border)] py-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <button
        className="w-full flex items-center justify-between text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg md:text-xl font-semibold pr-8">
          {question}
        </span>
        <span className="flex-shrink-0 w-10 h-10 rounded-full border border-[var(--brand-border)] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pt-4 text-[var(--brand-muted)] leading-relaxed max-w-2xl">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function MobiusPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(heroProgress, [0.5, 1], [1, 0]);

  const [activeProcess, setActiveProcess] = useState(0);

  return (
    <>
      {/* ── STICKY NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <a
            href="#"
            className="font-[family-name:var(--font-display)] text-sm font-bold text-white tracking-wider uppercase"
          >
            Vertex
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white text-xs font-medium uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>
          <span className="text-white text-xs font-medium">&copy; 2018-26</span>
        </div>
      </nav>

      {/* ── HERO: MASSIVE TYPOGRAPHY ── */}
      <section ref={heroRef} className="relative min-h-[200vh]">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="sticky top-0 h-screen flex flex-col justify-end overflow-hidden px-4 pb-8"
        >
          {/* Giant brand name */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(6rem,22vw,20rem)] font-black leading-[0.85] tracking-[-0.04em] text-black select-none">
            Vertex<span className="text-[0.6em] align-super">&reg;</span>
          </h1>

          {/* Overlaid word cloud / description */}
          <div className="absolute bottom-[15%] left-6 lg:left-12 max-w-sm">
            <WordReveal
              words={heroWords}
              className="text-sm leading-relaxed text-[var(--brand-muted)]"
            />
          </div>
        </motion.div>
      </section>

      {/* ── PROJECT IMAGE CARDS ── */}
      <section id="work" className="py-32 lg:py-44 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectImages.map((project, i) => (
              <motion.div
                key={project.id}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                style={{ backgroundColor: project.color }}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Project label */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-white text-xl font-bold">
                      {project.label}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO / ABOUT ── */}
      <section className="py-32 lg:py-44 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <ManifestoReveal words={manifestoWords} />
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <motion.p
              className="text-[var(--brand-muted)] leading-relaxed"
              {...fadeUp}
            >
              At Vertex, we keep our process clear, collaborative, and focused.
              We work closely as a small team, shaping each project with
              intention and care. Every idea is explored from multiple angles,
              refined together, and guided by a shared sense of purpose.
            </motion.p>
            <motion.p
              className="text-[var(--brand-muted)] leading-relaxed"
              {...fadeUp}
            >
              Our way of working is straightforward. We stay small by choice,
              keeping the process open and honest so decisions remain
              meaningful. We believe clarity comes from collaboration, and that
              strong ideas emerge when the team thinks as one.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── IDEAS IN MOTION MARQUEE ── */}
      <section className="py-16 border-y border-[var(--brand-border)] overflow-hidden">
        <div className="marquee-track flex gap-16 w-max">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="text-[clamp(3rem,8vw,6rem)] font-[family-name:var(--font-display)] font-black tracking-[-0.03em] whitespace-nowrap text-black"
            >
              Ideas in Motion.
            </span>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-32 lg:py-44 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--brand-muted)] mb-4">
                Our Services
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight max-w-xl">
                If you&apos;re looking for clarity in design, let&apos;s build
                it together.
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-black text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors self-start"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.div
                key={service.letter}
                className="border-t border-[var(--brand-border)] py-12 md:py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="grid md:grid-cols-[80px_1fr_280px] gap-8 items-start">
                  <span className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-black text-black/20">
                    {service.letter} /
                  </span>
                  <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                    {service.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs text-[var(--brand-muted)] bg-[var(--brand-bg-alt)] rounded-full px-4 py-2"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS CARDS ── */}
      <section
        id="studio"
        className="py-32 lg:py-44 px-6 lg:px-12 bg-black text-white"
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20"
          >
            <div>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
                Vertex<span className="text-[0.6em] align-super">&reg;</span>
              </h2>
              <h3 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight text-white/40">
                In Numbers
              </h3>
            </div>
            <p className="text-white/50 max-w-md leading-relaxed">
              A closer look at the milestones and collaborations that define our
              ongoing practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {statsCards.map((stat, i) => (
              <motion.div
                key={stat.number}
                className="bg-white/5 border border-white/10 rounded-3xl p-10 flex flex-col justify-between min-h-[360px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <AnimatedNumber
                      value={stat.number}
                      className="text-6xl md:text-7xl font-black"
                    />
                  </div>
                  <p className="text-xl font-semibold">{stat.label}</p>
                  <p className="text-xl font-semibold text-white/40">
                    {stat.sublabel}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {stat.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer">
                    {stat.link} <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="py-32 lg:py-44 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          >
            <div>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight">
                Our
              </h2>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight text-black/30">
                Awards
              </h2>
            </div>
            <p className="text-[var(--brand-muted)] max-w-sm">
              Selected moments where our work was acknowledged by others.
            </p>
          </motion.div>

          <div className="space-y-0">
            {awards.map((award, i) => (
              <motion.div
                key={`${award.name}-${i}`}
                className="border-t border-[var(--brand-border)] py-5 flex items-center justify-between group hover:bg-[var(--brand-bg-alt)] px-4 -mx-4 rounded-lg transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex items-center gap-8">
                  <span className="text-lg font-semibold min-w-[200px]">
                    {award.name}
                  </span>
                  <span className="text-sm text-[var(--brand-muted)]">
                    {award.category}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-[var(--brand-border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="py-32 lg:py-44 px-6 lg:px-12 bg-[var(--brand-bg-alt)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-6">
              Our Founders
            </h2>
            <p className="text-[var(--brand-muted)] max-w-2xl leading-relaxed mb-16">
              Founded by Jonas Richter and Tobias Keller, Vertex began as a
              shared belief in how design should feel: clear, thoughtful, and
              human. What started as a focused partnership has grown into a
              small team with a strong collective mindset.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
              >
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-gray-300 to-gray-500 mb-6 overflow-hidden">
                  <div className="w-full h-full bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <h3 className="text-xl font-bold">{founder.name}</h3>
                <p className="text-[var(--brand-muted)] text-sm mt-1">
                  {founder.role}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-16">
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-black text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors"
            >
              Meet the Team <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PARTNER LOGOS MARQUEE ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto mb-12">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-3">
              Our Partners
            </h2>
            <p className="text-[var(--brand-muted)]">
              Here are some of the brands we&apos;ve had the privilege to
              collaborate with.
            </p>
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <div className="logo-marquee flex gap-16 w-max items-center">
            {[...partnerLogos, ...partnerLogos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-bold text-black/20 whitespace-nowrap hover:text-black transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-32 lg:py-44 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-20">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-4">
              The Process
            </h2>
            <p className="text-white/50 max-w-lg">
              Honest impressions from the teams we&apos;ve collaborated with
              across brand and digital work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-[300px_1fr] gap-12 lg:gap-20">
            {/* Process nav */}
            <div className="space-y-0">
              {processSteps.map((step, i) => (
                <button
                  key={step.label}
                  className={`block w-full text-left py-4 border-b border-white/10 text-lg font-medium transition-colors ${activeProcess === i ? "text-white" : "text-white/30 hover:text-white/60"}`}
                  onClick={() => setActiveProcess(i)}
                >
                  {step.label}
                </button>
              ))}
            </div>

            {/* Process content */}
            <div className="flex items-start">
              <motion.div
                key={activeProcess}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  {processSteps[activeProcess].title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                  {processSteps[activeProcess].description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-32 lg:py-44 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-3">
              Client Reflections
            </h2>
            <p className="text-[var(--brand-muted)]">
              Honest impressions from the teams we&apos;ve collaborated with
              across brand and digital work.
            </p>
          </motion.div>
        </div>

        <div className="testimonial-track flex gap-8 w-max px-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[500px] bg-[var(--brand-bg-alt)] rounded-3xl p-10 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-5xl font-black text-black/10">/</span>
                  <span className="text-5xl font-black text-black/10">
                    {t.number}
                  </span>
                </div>
                <p className="text-lg leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500" />
                <div>
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-[var(--brand-muted)]">
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-32 lg:py-44 px-6 lg:px-12 bg-[var(--brand-bg-alt)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-20">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
              Pricing
            </h2>
            <p className="text-[var(--brand-muted)] max-w-lg leading-relaxed">
              Choose a plan that fits your pace, your team, and your goals. From
              startups to scaling brands, our monthly options give you the
              design support you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-3xl p-10 flex flex-col justify-between min-h-[480px] ${plan.featured ? "bg-black text-white" : "bg-white border border-[var(--brand-border)]"}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div>
                  <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                  <p
                    className={`text-sm leading-relaxed mb-8 ${plan.featured ? "text-white/60" : "text-[var(--brand-muted)]"}`}
                  >
                    {plan.description}
                  </p>
                  <div className="space-y-3">
                    {plan.items.map((item) => (
                      <p
                        key={item}
                        className={`text-sm ${plan.featured ? "text-white/70" : "text-[var(--brand-text)]"}`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-10">
                  <p
                    className={`text-xs mb-2 ${plan.featured ? "text-white/40" : "text-[var(--brand-muted)]"}`}
                  >
                    Starting from
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black">{plan.price}</span>
                    <span
                      className={`text-sm ${plan.featured ? "text-white/40" : "text-[var(--brand-muted)]"}`}
                    >
                      /month
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-1 line-through ${plan.featured ? "text-white/30" : "text-[var(--brand-muted)]"}`}
                  >
                    {plan.originalPrice}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG / FEED ── */}
      <section id="feed" className="py-32 lg:py-44 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          >
            <div>
              <p className="text-[var(--brand-muted)] text-sm mb-4">
                Our thoughts on how brands, systems, and stories find their
                form.
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold">
                Studio Notes
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-60 transition-opacity"
            >
              Read All <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-gray-200 to-gray-400 mb-6 overflow-hidden group-hover:scale-[1.02] transition-transform">
                  <div className="w-full h-full" />
                </div>
                <p className="text-xs text-[var(--brand-muted)] mb-2">
                  {post.date}
                </p>
                <h3 className="text-xl font-bold mb-2 group-hover:opacity-60 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--brand-muted)] leading-relaxed">
                  {post.excerpt}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN TEAM CTA ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]">
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.h2
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight mb-8"
            {...fadeUp}
          >
            Do you feel ready to become part of our growing team?
          </motion.h2>
          <motion.div {...fadeUp}>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors"
            >
              Join Us <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT FORM (Conversational style) ── */}
      <section id="contact" className="py-32 lg:py-44 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <motion.h2
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-16"
            {...fadeUp}
          >
            Let&apos;s Talk!
          </motion.h2>

          <motion.form
            className="space-y-0"
            onSubmit={(e) => e.preventDefault()}
            {...fadeUp}
          >
            <p className="text-xl md:text-2xl leading-[2.5] font-medium">
              Hey Vertex, my name is{" "}
              <input
                type="text"
                placeholder="Your Name"
                className="border-b-2 border-black bg-transparent outline-none text-xl md:text-2xl font-medium w-[200px] placeholder:text-black/20 focus:border-black/50 transition-colors"
              />{" "}
              and I&apos;m writing from{" "}
              <input
                type="text"
                placeholder="Company Name"
                className="border-b-2 border-black bg-transparent outline-none text-xl md:text-2xl font-medium w-[220px] placeholder:text-black/20 focus:border-black/50 transition-colors"
              />
              . I&apos;m getting in touch because I&apos;d like{" "}
              <input
                type="text"
                placeholder="your message here"
                className="border-b-2 border-black bg-transparent outline-none text-xl md:text-2xl font-medium w-full placeholder:text-black/20 focus:border-black/50 transition-colors"
              />
              . My budget is roughly{" "}
              <select className="border-b-2 border-black bg-transparent outline-none text-xl md:text-2xl font-medium placeholder:text-black/20 cursor-pointer">
                <option value="">Select a Budget</option>
                <option value="5-10">$5,000 - $10,000</option>
                <option value="10-20">$10,000 - $20,000</option>
                <option value="20+">$20,000 +</option>
              </select>{" "}
              and I&apos;d like to start{" "}
              <select className="border-b-2 border-black bg-transparent outline-none text-xl md:text-2xl font-medium placeholder:text-black/20 cursor-pointer">
                <option value="">Choose a Timeframe</option>
                <option value="asap">As soon as possible</option>
                <option value="next-month">Next month</option>
                <option value="whenever">Whenever you&apos;re available</option>
              </select>
              . You can contact me at{" "}
              <input
                type="email"
                placeholder="your@email.com"
                className="border-b-2 border-black bg-transparent outline-none text-xl md:text-2xl font-medium w-[280px] placeholder:text-black/20 focus:border-black/50 transition-colors"
              />
              . Looking forward to your reply!
            </p>

            <div className="mt-12 flex items-center justify-between">
              <p className="text-xs text-[var(--brand-muted)]">
                By submitting, you agree to our Terms and Privacy Policy.
              </p>
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 lg:py-44 px-6 lg:px-12 bg-[var(--brand-bg-alt)]">
        <div className="max-w-[900px] mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-4">
              Questions, answered.
            </h2>
            <p className="text-[var(--brand-muted)]">
              Learn more about the people and principles behind Vertex.
            </p>
          </motion.div>

          <div>
            {faqItems.map((item, i) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 flex items-center gap-4">
            <p className="text-sm text-[var(--brand-muted)]">
              Still have questions? Let&apos;s talk about your project.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors"
            >
              Ask a question <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 lg:py-28 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1fr_auto] gap-16 mb-20">
            {/* Brand + copyright */}
            <div>
              <span className="font-[family-name:var(--font-display)] text-2xl font-black">
                Vertex<span className="text-[0.6em] align-super">&reg;</span>
              </span>
              <p className="text-white/30 text-sm mt-4">&copy; 2018-26</p>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                Join our studio newsletter for thoughts on design, brand
                systems, and creative direction \u2014 sent occasionally, when
                there&apos;s something worth saying.
              </p>
              <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="YOUR EMAIL HERE"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
                  Social
                </p>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block text-sm font-medium hover:text-white/60 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium hover:text-white/60 transition-colors"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium hover:text-white/60 transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
                  Legal
                </p>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block text-sm font-medium hover:text-white/60 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="block text-sm font-medium hover:text-white/60 transition-colors"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex items-center justify-between">
            <p className="text-white/20 text-xs">
              &copy; 2026 Vertex Studio. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">BERLIN, DE</p>
          </div>
        </div>
      </footer>
    </>
  );
}
