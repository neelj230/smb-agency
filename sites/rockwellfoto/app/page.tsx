// Rockwellfoto — massive black typography hero, word-by-word text reveal, image cards, marquee ticker, lettered services, animated stats, awards, founders, logo marquee, process timeline, testimonials carousel, pricing, blog feed, conversational contact form, FAQ
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
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroWords = [
  "Jeff",
  "Rockwell",
  "shoots",
  "from",
  "Ashland,",
  "Oregon.",
  "Portrait,",
  "commercial,",
  "architectural,",
  "video.",
  "Studio",
  "or",
  "on",
  "location.",
  "Every",
  "frame",
  "a",
  "conversation.",
];

const projectImages = [
  { id: 1, image: "/photos/photo-1.webp", label: "Portrait & Fashion", category: "Studio Photography" },
  { id: 2, image: "/photos/photo-9.webp", label: "Architectural", category: "Location Photography" },
  { id: 3, image: "/photos/photo-3.webp", label: "Pavilion Shoot", category: "On-Location Work" },
  { id: 4, image: "/photos/photo-8.webp", label: "Oregon Coast", category: "Landscape" },
];

const manifestoWords = [
  "Great",
  "photography",
  "is",
  "a",
  "conversation,",
  "not",
  "a",
  "transaction.",
  "Sometimes",
  "it",
  "starts",
  "over",
  "coffee.",
];

const services = [
  {
    letter: "A",
    title:
      "We craft portrait and fashion photography in-studio and on location — featuring professional lighting, styled backdrops, and a collaborative creative process tailored to your vision.",
    items: [
      "Studio Portrait Sessions",
      "Fashion & Editorial Photography",
      "Elinchrom Lighting Setups",
      "White Cyclorama Backdrops",
      "On-Location Portrait Shoots",
    ],
  },
  {
    letter: "B",
    title:
      "We produce high-end commercial and product imagery — from elegant jewelry campaigns to lifestyle content — crafted to elevate your brand across all platforms.",
    items: [
      "Product Photography",
      "Jewelry & Accessory Campaigns",
      "Lifestyle Brand Content",
      "Marketing Asset Creation",
      "E-Commerce Imagery",
    ],
  },
  {
    letter: "C",
    title:
      "We deliver full-service videography and content creation that combines cinematic storytelling with precision lighting to bring your brand narrative to life.",
    items: [
      "Brand Video Production",
      "Creative Content Creation",
      "Cinematic Storytelling",
      "Lighting & Composition Direction",
      "Post-Production & Editing",
    ],
  },
  {
    letter: "D",
    title:
      "We capture interiors, exteriors, and environmental spaces — from modern lofts to outdoor pavilions — with a photographer's eye for mood and light.",
    items: [
      "Interior Photography",
      "Exterior & Facade Shoots",
      "Poolside & Outdoor Venues",
      "Modern Loft & Urban Spaces",
      "Atmospheric Location Work",
    ],
  },
];

const statsCards = [
  {
    number: "5",
    label: "Star",
    sublabel: "Rating",
    description:
      "Every single client review is five stars — a reflection of Jeff's commitment to excellence and genuine creative partnership.",
    link: "Our Reviews",
  },
  {
    number: "100%",
    label: "Client",
    sublabel: "Satisfaction",
    description:
      "From coffee conversations to finished campaigns, clients consistently describe working with Rockwellfoto as exciting, collaborative, and rewarding.",
    link: "Our Work",
  },
  {
    number: "6",
    label: "Days",
    sublabel: "Available",
    description:
      "Open Monday through Saturday, the studio is ready to bring your creative vision to life whenever inspiration strikes.",
    link: "Book a Session",
  },
];

const awards = [
  { name: "Elinchrom Lighting", category: "Professional Studio Equipment" },
  { name: "White Cyclorama", category: "Studio Backdrop System" },
  { name: "Vintage Props Collection", category: "Creative Styling Assets" },
  { name: "Illuminated Vanity Suite", category: "Professional Dressing Room" },
  { name: "On-Location Versatility", category: "Oregon Coast to Los Angeles" },
  { name: "Portrait & Fashion", category: "Studio & Editorial Photography" },
  { name: "Commercial Campaigns", category: "Product & Brand Imagery" },
  { name: "Video Production", category: "Cinematic Content Creation" },
];

const founders = [
  { name: "Jeff Rockwell", role: "Photographer, Videographer & Creative Director" },
];

const partnerLogos = [
  "Portrait",
  "Fashion",
  "Commercial",
  "Product",
  "Architecture",
  "Video",
  "Lifestyle",
  "Editorial",
  "Branding",
  "Events",
  "Location",
];

const processSteps = [
  {
    label: "Discovery",
    title: "Discovery",
    description:
      "Every project starts with a conversation — sometimes literally over coffee. Jeff listens to your vision, your goals, and what makes your project unique before a single light is set.",
  },
  {
    label: "Creative Direction",
    title: "Creative Direction",
    description:
      "Jeff brings his own creative instincts to the table alongside yours. Together, you define the visual approach, location or studio setup, and the story you want to tell.",
  },
  {
    label: "Shoot & Capture",
    title: "Shoot & Capture",
    description:
      "In studio or on location, Jeff's eye for lighting and storytelling elevates every frame. The shoot is collaborative, energetic, and designed to make you feel confident and comfortable.",
  },
  {
    label: "Deliver & Beyond",
    title: "Deliver & Beyond",
    description:
      "Premium quality imagery and video delivered with care. Jeff's commitment to excellence doesn't end at delivery — clients return again and again because the partnership feels ongoing.",
  },
];

const testimonials = [
  {
    quote:
      "Whether you are sitting down for coffee, discussing the next big creative project, or sharing outdoor adventures, you can count on Jeff to be authentic and a joy to be around. He's someone you're excited to work with.",
    author: "Samantha Zid",
    company: "Rockwellfoto Client",
    number: 1,
  },
  {
    quote:
      "Talented, trustworthy, and versatile are only 3 out of many words to describe Jeff at Rockwellfoto! His authenticity and professionalism are proven in his work. The studio has a way of making you feel comfortable, but know you're in an incredibly creative space.",
    author: "Tayler Czarnezki",
    company: "Rockwellfoto Client",
    number: 2,
  },
  {
    quote:
      "Always fun to work with while delivering excellent imagery and video content. Jeff's eye for lighting and storytelling elevate any project to the next level. Highly recommend working with Jeff on your future content to fulfill your vision.",
    author: "Alex Leone",
    company: "Rockwellfoto Client",
    number: 3,
  },
  {
    quote:
      "Jeff is dedicated to providing premium quality photography results to his clients. He is successful, in part, because of his commitment to excellence, his willingness to collaborate, and his desire to innovate.",
    author: "Jennifer Theel",
    company: "Rockwellfoto Client",
    number: 4,
  },
  {
    quote:
      "World-class studio and talent!",
    author: "Trevor Heinsohn",
    company: "Rockwellfoto Client",
    number: 5,
  },
];

const pricingPlans = [
  {
    name: "Portrait Session",
    description:
      "For individuals, creatives, and brands who need portraits or fashion work shot right.",
    items: [
      "Pre-shoot discovery call",
      "Studio or on-location shoot",
      "Elinchrom lighting setup",
      "Styled backdrops available",
      "Edited image delivery",
      "Personal use licensing",
    ],
    price: "From $450",
  },
  {
    name: "Commercial Package",
    description:
      "For brands that need product, jewelry, or campaign imagery with staying power.",
    items: [
      "Creative direction session",
      "Product or lifestyle photography",
      "Commercial lighting setups",
      "Multiple looks or scenes",
      "Full commercial licensing",
    ],
    price: "From $1,200",
    featured: true,
  },
  {
    name: "Full Production",
    description:
      "Photo + video, concept to final cut. For teams that want everything in one shoot.",
    items: [
      "Photo & video production",
      "Creative concept development",
      "Studio or on-location shoot",
      "Cinematic editing & post",
      "Full licensing & asset library",
    ],
    price: "From $2,800",
  },
];

const faqItems = [
  {
    question: "What makes Rockwellfoto different from other photography studios?",
    answer:
      "Every client review points to the same thing: Jeff. His combination of world-class technical skill and genuine warmth makes the entire process feel collaborative and fun — not transactional. Clients consistently say they're excited to work with him again, not just satisfied with the results.",
  },
  {
    question: "What kinds of projects does Jeff shoot?",
    answer:
      "Jeff is remarkably versatile. His portfolio spans fashion and portrait photography, commercial product work, architectural and interior photography, video production, and on-location shoots ranging from the Oregon coast to Los Angeles. If it requires a great eye for light and storytelling, Jeff is in his element.",
  },
  {
    question: "What is the studio space like?",
    answer:
      "The Rockwellfoto studio is a fully professional creative environment featuring Elinchrom lighting equipment, a white cyclorama backdrop, vintage props including a skateboard and bicycle, and a modern dressing room with illuminated vanity mirrors. Clients describe it as a space that makes you feel comfortable while knowing you're in a seriously creative environment.",
  },
  {
    question: "Does Jeff only shoot in the studio, or does he do on-location work?",
    answer:
      "Both. Jeff works extensively on location — his portfolio includes poolside pavilions with mountain views, coastal sea stacks, urban alleyways, modern loft interiors, and even the Paramount Pictures lot. If your vision requires a specific setting, he'll make it happen.",
  },
  {
    question: "How does Jeff approach creative collaboration?",
    answer:
      "Jeff starts with a conversation — sometimes literally over coffee. Clients describe his process as highly collaborative and innovation-driven. He listens to your vision, brings his own creative instincts to the table, and works with you to produce imagery that fulfills — and often exceeds — what you originally imagined.",
  },
  {
    question: "What are Rockwellfoto's studio hours and how do I book?",
    answer:
      "The studio is open Monday through Friday from 9:00 AM to 5:00 PM and Saturday from 9:00 AM to 1:00 PM, with Sundays closed. To book a session or discuss your project, call (541) 646-5290 or visit the studio at 590 Weller Ln, Ashland, OR 97520.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

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

export default function BusinessPage() {
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
            Rockwellfoto
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
            Rockwellfoto
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
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-black"
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
                <img
                  src={project.image}
                  alt={project.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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
              Jeff built Rockwellfoto from a simple conviction: great photography
              is a conversation, not a transaction. Based in Ashland, Oregon,
              he has cultivated a studio practice spanning portraits, commercial work,
              video production, and on-location shoots from the Oregon coast to Hollywood.
            </motion.p>
            <motion.p
              className="text-[var(--brand-muted)] leading-relaxed"
              {...fadeUp}
            >
              Clients consistently describe Jeff the same way: someone who listens
              first, collaborates fully, and delivers imagery that exceeds what they
              imagined. His enthusiasm for the work is contagious, whether rigging
              Elinchrom strobes in the studio or shooting poolside pavilions outdoors.
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
              Where Vision Meets Light.
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
                If you're looking for imagery that delivers, let's shoot.
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
                Rockwellfoto
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
                The
              </h2>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight text-black/30">
                Studio
              </h2>
            </div>
            <p className="text-[var(--brand-muted)] max-w-sm">
              Elinchrom strobes, white cyclorama, vintage props, and a full dressing room. Built for real work.
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
              Behind the Lens
            </h2>
            <p className="text-[var(--brand-muted)] max-w-2xl leading-relaxed mb-16">
              Jeff Rockwell is the creative force behind Rockwellfoto — a photographer,
              videographer, and storyteller whose clients call him authentic, talented,
              and genuinely fun to work with. His technical mastery of lighting is matched
              only by his commitment to collaboration on every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                  <img
                    src="/photos/photo-2.webp"
                    alt="Rockwellfoto studio with Elinchrom lighting"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold">{founder.name}</h3>
                <p className="text-[var(--brand-muted)] text-sm mt-1">
                  {founder.role}
                </p>
              </motion.div>
            ))}
            <motion.div
              className="flex items-end"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden">
                <img
                  src="/photos/photo-10.webp"
                  alt="Rockwellfoto dressing room with illuminated vanity"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeUp} className="mt-16">
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-black text-white px-7 py-4 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors"
            >
              Meet Jeff <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PARTNER LOGOS MARQUEE ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto mb-12">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold mb-3">
              What We Shoot
            </h2>
            <p className="text-[var(--brand-muted)]">
              From Paramount gates to Oregon coastline — Jeff&apos;s portfolio moves freely between subjects.
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
              How We Shoot
            </h2>
            <p className="text-white/50 max-w-lg">
              Every project follows the same rhythm — from coffee conversation to final delivery.
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
              Client Words
            </h2>
            <p className="text-[var(--brand-muted)]">
              Five reviews. Five stars. Here&apos;s what they sound like.
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
              Three ways to work together — pick the one that fits your shoot.
              Custom quotes welcome.
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
                    Investment
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black">{plan.price}</span>
                  </div>
                </div>
              </motion.div>
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
            Have a shoot in mind? Let's make it happen.
          </motion.h2>
          <motion.div {...fadeUp}>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors"
            >
              Book a Shoot <ArrowRight className="w-4 h-4" />
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
            Let's Talk!
          </motion.h2>

          <motion.form
            className="space-y-0"
            onSubmit={(e) => e.preventDefault()}
            {...fadeUp}
          >
            <p className="text-xl md:text-2xl leading-[2.5] font-medium">
              Hey Rockwellfoto, my name is{" "}
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
                Book a Session <ArrowRight className="w-4 h-4" />
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
              Jeff is a photographer, videographer, and creative based in Ashland, OR. Clients describe his work as talented, trustworthy, and versatile. Every shoot is a collaboration built around your vision.
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
              Still have questions? Let's talk about your shoot.
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
                Rockwellfoto
              </span>
              <p className="text-white/30 text-sm mt-4">&copy; 2018-26</p>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                Book a shoot, ask a question, or say hi — Jeff reads every note.
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
              &copy; 2026 Rockwellfoto. All rights reserved.
            </p>
            <p className="text-white/20 text-xs">ASHLAND, OR</p>
          </div>
        </div>
      </footer>
    </>
  );
}
