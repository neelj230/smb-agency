// REFERENCE: LINEA — Design subscription site. Dot pattern bg, italic serif in hero,
// opposing-direction image marquees, word-by-word mission reveal, sliding service cards,
// sliding testimonials, pricing, FAQ. Typography-focused, minimal, black + red/peach accent.
"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Star, Plus, Minus } from "lucide-react";
import { useRef, useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks = ["Home", "Services", "Testimonials", "Pricing", "FAQ"];

const services = [
  {
    title: "Brand Identity",
    description:
      "Logos, brand guides, and visual systems that make your brand unmistakable.",
    tag: "Branding",
  },
  {
    title: "Web Design",
    description:
      "Responsive websites that convert visitors into loyal customers.",
    tag: "Digital",
  },
  {
    title: "UI/UX Design",
    description:
      "Intuitive interfaces and experiences that users genuinely enjoy.",
    tag: "Product",
  },
  {
    title: "Pitch Decks",
    description: "Presentations that tell your story and close the deal.",
    tag: "Strategy",
  },
  {
    title: "Social Media",
    description: "Scroll-stopping content and templates for every platform.",
    tag: "Content",
  },
  {
    title: "Illustrations",
    description: "Custom artwork and graphics that bring your brand to life.",
    tag: "Creative",
  },
];

const imageCards = [
  { label: "Brand System", color: "bg-[#2A2A2A]" },
  { label: "Web Platform", color: "bg-[#E8584F]" },
  { label: "Product UI", color: "bg-[#1A1A1A]" },
  { label: "Mobile App", color: "bg-[#D4A574]" },
  { label: "Dashboard", color: "bg-[#3A3A3A]" },
  { label: "Packaging", color: "bg-[#C4704B]" },
];

const reviews = [
  {
    text: "Linea completely transformed how we approach design. Fast turnaround, incredible quality. It feels like having a full design team on call.",
    author: "Sarah Chen",
    role: "CEO, Bloom",
  },
  {
    text: "We replaced our entire freelancer workflow with Linea. The consistency and speed are unmatched. Best decision we made this year.",
    author: "Marcus Webb",
    role: "Founder, Velo",
  },
  {
    text: "The quality rivals top agencies but at a fraction of the cost. Our brand has never looked this good.",
    author: "Priya Patel",
    role: "CMO, Norde",
  },
  {
    text: "Turnaround is incredibly fast and the designs are always on point. Linea gets our brand better than anyone.",
    author: "Jake Morrison",
    role: "Head of Marketing",
  },
  {
    text: "We have scaled our content production 4x since switching to Linea. Cannot recommend enough.",
    author: "Lena Schultz",
    role: "Creative Director",
  },
  {
    text: "Professional, responsive, and genuinely talented. Every deliverable exceeds expectations.",
    author: "Tom Bakker",
    role: "Founder, Apex",
  },
];

const pricingPlans = [
  {
    name: "Standard",
    price: "$3,995",
    period: "/mo",
    description: "One request at a time. Pause or cancel anytime.",
    features: [
      "One request at a time",
      "Average 48hr delivery",
      "Unlimited revisions",
      "Unlimited brands",
      "Webflow & Figma source files",
      "Pause or cancel anytime",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$6,995",
    period: "/mo",
    description: "Double the speed. Two requests running in parallel.",
    features: [
      "Two requests at a time",
      "Average 24hr delivery",
      "Unlimited revisions",
      "Unlimited brands",
      "Webflow & Figma source files",
      "Priority support",
      "Pause or cancel anytime",
    ],
    highlighted: true,
  },
];

const faqs = [
  {
    q: "How does the design subscription work?",
    a: "Simply subscribe to a plan and submit your design requests. We will work through them one (or two) at a time, delivering most requests within 24-48 hours.",
  },
  {
    q: "What if I do not like the design?",
    a: "No problem. We offer unlimited revisions. We will keep iterating until you are 100% satisfied with the result.",
  },
  {
    q: "Is there a limit to how many requests I can make?",
    a: "No. You can add as many design requests to your queue as you like. We will work through them based on your plan.",
  },
  {
    q: "How fast will I receive my designs?",
    a: "Most requests are completed within 48 hours for Standard and 24 hours for Pro. Complex projects like full websites may take longer.",
  },
  {
    q: "Can I pause my subscription?",
    a: "Absolutely. You can pause and resume your subscription at any time. Your billing cycle will be adjusted accordingly.",
  },
  {
    q: "What design tools do you use?",
    a: "We primarily use Figma for design and Webflow for development. All source files are included with every delivery.",
  },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// ─── WORD-BY-WORD REVEAL COMPONENT ──────────────────────────────────────────

function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0.12 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0.12 }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// ─── FAQ ITEM COMPONENT ─────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-4"
      >
        <span className="text-lg font-medium">{q}</span>
        {open ? (
          <Minus className="w-5 h-5 flex-shrink-0 text-[var(--brand-muted)]" />
        ) : (
          <Plus className="w-5 h-5 flex-shrink-0 text-[var(--brand-muted)]" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-[var(--brand-muted)] leading-relaxed max-w-2xl">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function LineaPage() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight lowercase">
            linea
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[var(--brand-muted)] hover:text-[var(--brand-text)] text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <a
            href="#pricing"
            className="bg-[var(--brand-accent)] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Template
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden dot-pattern"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pt-36 pb-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-[clamp(3rem,7.5vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--brand-primary)]">
              On-Demand Design
              <br />
              for{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal">
                Scaling Brands.
              </span>
            </h1>
            <p className="mt-8 text-[var(--brand-muted)] text-lg max-w-md mx-auto leading-relaxed">
              Design subscription, made for those who move fast and scale
              faster.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                See Plans <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-3 border border-gray-300 text-[var(--brand-primary)] px-8 py-4 rounded-full text-sm font-semibold hover:border-gray-500 transition-colors"
              >
                How It Works
              </a>
            </div>
          </motion.div>

          {/* ── IMAGE CARDS — opposing scroll directions ── */}
          <div className="mt-20 overflow-hidden -mx-6 lg:-mx-12">
            {/* Row 1: scrolls left */}
            <div className="marquee-left flex gap-5 w-max mb-5">
              {[...imageCards, ...imageCards, ...imageCards, ...imageCards].map(
                (card, i) => (
                  <div
                    key={`l-${i}`}
                    className={`flex-shrink-0 w-[300px] h-[200px] rounded-2xl ${card.color} flex items-end p-6 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <p className="relative z-10 text-white font-medium text-sm">
                      {card.label}
                    </p>
                  </div>
                ),
              )}
            </div>
            {/* Row 2: scrolls right (opposite direction) */}
            <div className="marquee-right flex gap-5 w-max">
              {[
                ...imageCards.slice().reverse(),
                ...imageCards.slice().reverse(),
                ...imageCards.slice().reverse(),
                ...imageCards.slice().reverse(),
              ].map((card, i) => (
                <div
                  key={`r-${i}`}
                  className={`flex-shrink-0 w-[300px] h-[200px] rounded-2xl ${card.color} flex items-end p-6 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <p className="relative z-10 text-white font-medium text-sm">
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION — word-by-word reveal ── */}
      <section className="py-32 lg:py-40 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <WordReveal
            text="We help brands show up with clarity, confidence, and design that's impossible to ignore."
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.15] tracking-[-0.02em]"
          />
        </div>
      </section>

      {/* ── SERVICES — sliding card list ── */}
      <section
        id="services"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-bg-alt)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <p className="text-[var(--brand-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
              Services
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight">
              Everything you need,{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal">
                nothing you don&apos;t.
              </span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="flex items-start gap-6 flex-1">
                  <span className="text-[var(--brand-muted)] text-sm font-mono mt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 group-hover:text-[var(--brand-accent)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[var(--brand-muted)] text-sm leading-relaxed max-w-md">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--brand-muted)] border border-gray-200 rounded-full px-3 py-1">
                    {service.tag}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--brand-muted)] group-hover:text-[var(--brand-accent)] group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECOND IMAGE STRIP — opposing directions again ── */}
      <section className="py-20 bg-white overflow-hidden">
        <div
          className="marquee-right flex gap-5 w-max mb-5"
          style={{ animationDuration: "35s" }}
        >
          {[...imageCards, ...imageCards, ...imageCards, ...imageCards].map(
            (card, i) => (
              <div
                key={`s1-${i}`}
                className={`flex-shrink-0 w-[260px] h-[170px] rounded-xl ${card.color} flex items-end p-5 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <p className="relative z-10 text-white/80 font-medium text-xs">
                  {card.label}
                </p>
              </div>
            ),
          )}
        </div>
        <div
          className="marquee-left flex gap-5 w-max"
          style={{ animationDuration: "35s" }}
        >
          {[
            ...imageCards.slice().reverse(),
            ...imageCards.slice().reverse(),
            ...imageCards.slice().reverse(),
            ...imageCards.slice().reverse(),
          ].map((card, i) => (
            <div
              key={`s2-${i}`}
              className={`flex-shrink-0 w-[260px] h-[170px] rounded-xl ${card.color} flex items-end p-5 relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <p className="relative z-10 text-white/80 font-medium text-xs">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS — sliding reviews ── */}
      <section
        id="testimonials"
        className="py-24 lg:py-32 bg-[var(--brand-bg-alt)] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <motion.div {...fadeUp}>
            <p className="text-[var(--brand-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
              Testimonials
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight">
              Loved by{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal">
                scaling teams.
              </span>
            </h2>
          </motion.div>
        </div>
        <div className="testimonial-marquee flex gap-6 w-max">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[400px] bg-white rounded-2xl p-8 border border-gray-100"
            >
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>
              <p className="text-[var(--brand-text)] text-sm leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white text-xs font-semibold">
                  {review.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
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

      {/* ── PRICING ── */}
      <section
        id="pricing"
        className="py-24 lg:py-32 px-6 lg:px-12 bg-white dot-pattern"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight">
              Simple,{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal">
                transparent
              </span>{" "}
              pricing.
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] text-lg max-w-md mx-auto">
              No contracts. Pause or cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-3xl p-8 lg:p-10 ${
                  plan.highlighted
                    ? "bg-[var(--brand-primary)] text-white"
                    : "bg-white border border-gray-200"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p
                  className={`text-sm font-semibold uppercase tracking-widest mb-2 ${plan.highlighted ? "text-[var(--brand-accent)]" : "text-[var(--brand-muted)]"}`}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span
                    className={`text-sm ${plan.highlighted ? "text-white/50" : "text-[var(--brand-muted)]"}`}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm mb-8 ${plan.highlighted ? "text-white/60" : "text-[var(--brand-muted)]"}`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`text-sm flex items-start gap-3 ${plan.highlighted ? "text-white/80" : "text-[var(--brand-text)]"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${plan.highlighted ? "bg-[var(--brand-accent)]" : "bg-[var(--brand-primary)]"}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`block text-center py-4 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 ${
                    plan.highlighted
                      ? "bg-[var(--brand-accent)] text-white"
                      : "bg-[var(--brand-primary)] text-white"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[var(--brand-accent)] text-sm font-semibold uppercase tracking-widest mb-4">
              FAQ
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight">
              Questions &{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal">
                answers.
              </span>
            </h2>
          </motion.div>

          <div className="border-t border-gray-200">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 lg:py-32 px-6 lg:px-12 bg-[var(--brand-primary)] dot-pattern"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white">
              Ready to scale your{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal text-[var(--brand-accent)]">
                brand?
              </span>
            </h2>
            <p className="mt-6 text-white/50 text-lg max-w-md mx-auto">
              Join hundreds of teams using Linea to ship design faster.
            </p>
            <div className="mt-10">
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-10 py-4 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-12 bg-[var(--brand-primary)] border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <span className="font-[family-name:var(--font-display)] text-xl font-bold text-white lowercase">
            linea
          </span>
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-white/30 text-sm">
            &copy; 2026 Linea. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
