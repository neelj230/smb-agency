// REFERENCE: LINEA — Design subscription site. Dot pattern bg, italic serif in hero,
// opposing-direction image marquees, word-by-word mission reveal, sliding service cards,
// sliding testimonials, pricing, FAQ. Typography-focused, minimal, black + red/peach accent.
"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Plus, Minus } from "lucide-react";
import { useRef, useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────


const navLinks = ["Home", "Services", "Testimonials", "Pricing", "FAQ"];

const services = [
  {
    title: "Precision Haircut & Shape-Up",
    description:
      "A full barbershop haircut with razor-sharp line detailing and edge work, tailored to your style.",
    tag: "Signature",
  },
  {
    title: "Kids' Haircut",
    description:
      "A welcoming, patient barbershop experience designed for children, with skilled cuts that parents and kids both love.",
    tag: "Family",
  },
  {
    title: "Fade & Taper",
    description:
      "Seamless low, mid, or high fades with precise tapering for a clean, polished finish.",
    tag: "Classic",
  },
  {
    title: "Beard Trim & Line-Up",
    description:
      "Expert beard shaping and trimming to keep your facial hair sharp and well-defined.",
    tag: "Grooming",
  },
  {
    title: "Hot Towel Shave",
    description:
      "A classic straight-razor shave with hot towel treatment for a smooth, close finish.",
    tag: "Straight Razor",
  },
  {
    title: "Hair Design & Custom Cuts",
    description:
      "Creative custom hair designs and signature cuts for clients who want something beyond the basics.",
    tag: "Creative",
  },
];

const imageCards = [
  { label: "Precision Cut", color: "bg-[#2A2A2A]" },
  { label: "Fresh Fade", color: "bg-[#E8584F]" },
  { label: "Shape-Up", color: "bg-[#1A1A1A]" },
  { label: "Kids' Cut", color: "bg-[#D4A574]" },
  { label: "Beard Trim", color: "bg-[#3A3A3A]" },
  { label: "Hot Towel Shave", color: "bg-[#C4704B]" },
];

const reviews = [
  {
    text: "Clean and comfortable. I've been going to them for years. They take pride in their appearance. They take almost all payment methods and will have you looking and feeling like a million bucks.",
    author: "Tyrie Masten",
    role: "Loyal Customer",
  },
  {
    text: "I've been going here for over 15 years and it's always been an excellent and professional barbershop! I go to Bryant and he's great. The owner Chuck is a great guy and runs a clean shop.",
    author: "K 'K-Roc' P",
    role: "15-Year Regular",
  },
  {
    text: "Took my 10 year old son there and was immediately greeted by GEE da barber. He was friendly but he has skills!! My son loved his service and even more, I loved the cut! Affordable, friendly, and skillful. Don't get any better.",
    author: "Penny Roll Crafts",
    role: "Satisfied Parent",
  },
  {
    text: "Pretty chill shop with laid back barbers. The vibe is comfortable and the cuts are on point. A solid spot on Market Street.",
    author: "Isaiah Jones",
    role: "New Customer",
  },
  {
    text: "Took my 10 year old son there and was immediately greeted by GEE da barber. He was friendly but he has skills!! My son loved his service and even more, I loved the cut. Affordable, friendly, and skillful.",
    author: "Penny Roll Crafts",
    role: "First-Time Parent",
  },
  {
    text: "Clean, professional, and the barbers take pride in their work. Accepts almost all payment methods so you walk in, sit down, and walk out feeling sharp.",
    author: "Tyrie Masten",
    role: "Repeat Customer",
  },
];

const pricingPlans = [
  {
    name: "Classic Cut",
    price: "$25",
    period: "+ up",
    description: "A clean, precise haircut with expert line work and edge-up.",
    features: [
      "Precision haircut & shape-up",
      "Razor-sharp edge detailing",
      "All hair types welcome",
      "Kids' cuts available",
      "Experienced barbers",
      "Flexible payment methods",
    ],
    highlighted: false,
  },
  {
    name: "Full Service",
    price: "$45",
    period: "+ up",
    description: "The complete grooming experience — cut, fade, and beard all in one visit.",
    features: [
      "Haircut & fade or taper",
      "Beard trim & line-up",
      "Hot towel treatment",
      "Custom hair design",
      "Priority seating available",
      "Cash, card & digital accepted",
      "Open early — 6 AM weekdays",
    ],
    highlighted: true,
  },
];

const faqs = [
  {
    q: "What are your hours and do I need an appointment?",
    a: "Major League Cuts is open Monday through Saturday from 6:00 AM to 9:00 PM, and Sunday from 7:00 AM to 6:00 PM. The early morning hours are perfect for clients who need a cut before work. Call ahead at (215) 747-1119 to check wait times or ask about your preferred barber's availability.",
  },
  {
    q: "What payment methods do you accept?",
    a: "The shop accepts almost all payment methods, so you won't need to worry about stopping at an ATM before your visit. Cash, card, and digital payments are all welcome.",
  },
  {
    q: "Is this a good shop for kids?",
    a: "Absolutely. GEE da barber is especially well-loved by parents bringing their children in for cuts. Customers describe him as friendly, skilled, and great at making kids feel comfortable in the chair. The whole shop has a laid-back, welcoming vibe.",
  },
  {
    q: "Can I request a specific barber?",
    a: "Yes — many regulars come specifically for Bryant or GEE. If you have a preferred barber, it's always a good idea to call ahead at (215) 747-1119 to confirm their schedule and minimize your wait.",
  },
  {
    q: "What makes Major League Cuts different from other shops in the area?",
    a: "Customers consistently point to three things: the cleanliness of the shop, the professionalism of the barbers, and the long-term relationships they build here. Many clients have been coming for 10 to 15-plus years. That kind of loyalty doesn't come from good marketing — it comes from consistently great cuts and a genuine community atmosphere.",
  },
  {
    q: "I'm new to the shop — what should I expect?",
    a: "New clients describe the shop as chill and laid-back with friendly, skilled barbers. You'll be greeted and taken care of. If you're unsure who to sit with, any barber on the floor will give you a quality cut — and you can always ask around for recommendations once you're in the door.",
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

export default function BusinessPage() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight lowercase">
            MLC
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
            className="hidden md:inline-block bg-[var(--brand-accent)] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Book a Cut
          </a>
          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 text-[var(--brand-text)]" aria-label="Menu">
            {mobileNav ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden bg-white border-b border-gray-100">
              <div className="flex flex-col py-4 px-6 gap-4">
                {navLinks.map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileNav(false)} className="text-[var(--brand-muted)] hover:text-[var(--brand-text)] text-sm transition-colors">{link}</a>
                ))}
                <a href="#pricing" onClick={() => setMobileNav(false)} className="bg-[var(--brand-accent)] text-white px-5 py-2.5 rounded-full text-sm font-medium text-center">Book a Cut</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              Major League Cuts
              <br />
              for{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal">
                West Philly Sharp.
              </span>
            </h1>
            <p className="mt-8 text-[var(--brand-muted)] text-lg max-w-md mx-auto leading-relaxed">
              West Philly&apos;s go-to barbershop since day one. Open at 6 AM,
              six days a week.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                See Services <ArrowRight className="w-4 h-4" />
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
            text="Precision cuts, sharp fades, and a vibe that keeps West Philly coming back for over a decade."
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
              Fifteen years on{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal">
                Market Street.
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
              Quality,{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal">
                consistent
              </span>{" "}
              pricing.
            </h2>
            <p className="mt-4 text-[var(--brand-muted)] text-lg max-w-md mx-auto">
              Walk-ins welcome. Open 6 AM six days a week.
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
                  Book Now
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
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, consistent 1px)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white">
              Ready for your freshest{" "}
              <span className="font-[family-name:var(--font-serif)] italic font-normal text-[var(--brand-accent)]">
                cut?
              </span>
            </h2>
            <p className="mt-6 text-white/50 text-lg max-w-md mx-auto">
              Join the neighborhood. Fresh cuts since day one on Market Street.
            </p>
            <div className="mt-10">
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 bg-[var(--brand-accent)] text-white px-10 py-4 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 lg:px-12 bg-[var(--brand-primary)] border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <span className="font-[family-name:var(--font-display)] text-xl font-bold text-white lowercase">
            MLC
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
            &copy; 2026 Major League Cuts. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
