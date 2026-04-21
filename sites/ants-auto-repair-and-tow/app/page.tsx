"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCards } from "@/components/ServiceCards";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { StatsCounter } from "@/components/StatsCounter";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import type {
  NavLink,
  Photo,
  Service,
  Review,
  Stat,
  FAQItem,
} from "@/components/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Ant's Auto Repair and Tow shop on North Broad Street",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Inside Ant's Auto Repair — lift bay",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-3.webp", alt: "Vehicle up on the lift for honest inspection", category: "work" },
  { src: "/photos/photo-4.webp", alt: "Brake and electrical repair in progress", category: "work" },
  { src: "/photos/photo-5.webp", alt: "Engine diagnostics at Ant's Auto", category: "work" },
  { src: "/photos/photo-6.webp", alt: "Suspension inspection bay", category: "work" },
  { src: "/photos/photo-7.webp", alt: "24/7 tow truck — Ant's Auto", category: "work" },
  { src: "/photos/photo-8.webp", alt: "North Broad Street auto shop floor", category: "work" },
  { src: "/photos/photo-9.webp", alt: "Working under the hood — Anthony on a repair", category: "work" },
  { src: "/photos/photo-10.webp", alt: "Finished repair ready for pickup", category: "work" },
];

const services: Service[] = [
  {
    name: "Brake Light & Electrical Repair",
    description:
      "Full diagnosis and repair of brake lights, headlights, and vehicle electrical systems — caught and corrected without upselling.",
    icon: "zap",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Exhaust Leak Diagnosis & Repair",
    description:
      "Fast identification and repair of exhaust leaks, often completed same-day or within 48 hours of parts arrival.",
    icon: "wind",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Oil Leak & Consumption Repair",
    description:
      "Pinpoint diagnosis of oil loss issues with transparent repair timelines — typically resolved in under two hours.",
    icon: "droplets",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Suspension Inspection & Honest Assessment",
    description:
      "Thorough lift inspection of shocks, struts, and suspension components with a straight answer on what actually needs fixing.",
    icon: "car",
    image: "/photos/photo-6.webp",
  },
  {
    name: "24/7 Emergency Towing",
    description:
      "Around-the-clock towing service available every day of the week — no waiting until Monday morning.",
    icon: "truck",
    image: "/photos/photo-7.webp",
  },
  {
    name: "General Mechanical Repair",
    description:
      "Comprehensive vehicle repair covering engine noises, brake systems, and multi-issue diagnostics handled with same-day attention.",
    icon: "wrench",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "I have to give the biggest shoutout to Anthony, because this man is truly one of the smartest, most realistic, and most honest mechanics I've ever dealt with in my life. I brought my 2002 Jeep Grand Cherokee Laredo in after another shop tried to play me. They gave me an $1,800 es...",
    author: "Angel Odd",
    rating: 5,
    source: "google",
  },
  {
    text: "Car started making loud engine noises over the weekend all of a sudden, it was a Sunday and I needed it to get checked and fixed by the following Saturday. Luckily, Ant's is one of the few places open on that day and he took care of it by taking the car in the day of, diagnosing ...",
    author: "Koomi",
    rating: 5,
    source: "google",
  },
  {
    text: "Great mechanic! My car started making a scary noise out of nowhere on Friday. Only place that was able to help me and so quickly. Even fixed other things on my car for no extra charge, would 10/10 recommend!!",
    author: "Kemi Martins",
    rating: 5,
    source: "google",
  },
  {
    text: "Anthony, the mechanic, is great! He is very kind, clear and direct.. service is fast and quality care! I took my car to him yesterday evening and it was done today! I am very happy with the service and time frame!! Prices are reasonable. You won't regret letting Anthony work on y...",
    author: "Lissette Alvarez",
    rating: 5,
    source: "google",
  },
  {
    text: "My vehicle was running out of oil every other day. Luis diagnosed my vehicle and fixed it with in 2 hours, I love that he kept me informed every step of the way!! He deserves a raise. 10/10 I would Highly recommend",
    author: "Danielle Jazz",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.7, suffix: "★", label: "Average Customer Rating" },
  { value: 105, suffix: "+", label: "Verified Customer Reviews" },
  { value: 24, suffix: "/7", label: "Hours Open Every Day of the Week" },
  { value: 2, suffix: " hrs", label: "Typical Diagnostic Turnaround" },
];

const faqItems: FAQItem[] = [
  {
    question: "Are you actually open 24 hours, every day of the week?",
    answer:
      "Yes — Ant's Auto Repair and Tow operates 24 hours a day, 7 days a week, including Sundays and holidays. Multiple customers have had their cars taken in on Sundays when every other shop was closed.",
  },
  {
    question:
      "How do I know I won't get overcharged or upsold on parts I don't need?",
    answer:
      "Anthony's approach is to put your car on the lift and show you exactly what's wrong — and what isn't. Several customers specifically mention being saved from inflated estimates at other shops.",
  },
  {
    question: "How fast can you turn my car around?",
    answer:
      "Turnaround is fast. Customers have had cars diagnosed within a few hours of drop-off, with repairs completed the same day or the very next morning.",
  },
  {
    question: "Will you keep me updated while my car is being worked on?",
    answer:
      "Yes — the team communicates throughout the process, including via text. Customers specifically highlight the consistent updates as one of the best parts of the experience.",
  },
];

const businessContact = {
  name: "Ant's Auto Repair and Tow",
  address: "2750 N Broad St",
  city: "Philadelphia",
  state: "PA",
  zip: "19132",
  phone: "(267) 774-6361",
  email: "",
  hours: {
    Monday: "Open 24 hours",
    Tuesday: "Open 24 hours",
    Wednesday: "Open 24 hours",
    Thursday: "Open 24 hours",
    Friday: "Open 24 hours",
    Saturday: "Open 24 hours",
    Sunday: "Open 24 hours",
  },
};

// ─── TRUST BADGE STRIP ───────────────────────────────────────────────────────

const trustBadges = [
  { icon: "🔧", label: "Same-Day Repairs" },
  { icon: "🕐", label: "Open 24/7" },
  { icon: "📍", label: "North Philly" },
  { icon: "✅", label: "No Upsells Ever" },
  { icon: "⚡", label: "2-Hr Diagnosis" },
  { icon: "🚛", label: "Emergency Tow" },
  { icon: "💬", label: "Text Updates" },
  { icon: "⭐", label: "4.7 Stars · 105 Reviews" },
];

function TrustStrip() {
  const doubled = [...trustBadges, ...trustBadges];
  return (
    <div className="trust-strip-wrapper bg-[#156cc2] py-3 overflow-hidden">
      <div className="trust-strip-track flex gap-0">
        {doubled.map((b, i) => (
          <div
            key={i}
            className="trust-strip-item flex items-center gap-2 px-6 shrink-0 text-white/90 text-sm font-medium"
          >
            <span className="text-base">{b.icon}</span>
            <span className="whitespace-nowrap tracking-wide uppercase text-xs font-semibold">
              {b.label}
            </span>
            <span className="mx-3 text-white/30">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HONEST MECHANIC CALLOUT ─────────────────────────────────────────────────

function HonestCallout() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Dot pattern bg */}
      <div className="dot-pattern absolute inset-0 opacity-40 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="ant-callout-card"
        >
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left: big quote */}
            <div className="flex-1">
              <div
                className="text-6xl leading-none mb-4 font-serif"
                style={{
                  color: "#156cc2",
                  fontFamily: "Hedvig Letters Serif, serif",
                }}
              >
                "
              </div>
              <p
                className="text-2xl md:text-3xl leading-snug text-gray-900 font-medium mb-6"
                style={{ fontFamily: "Hedvig Letters Serif, serif" }}
              >
                He put my car on the lift and showed me exactly what was — and
                wasn't — wrong. Saved me over $1,000 compared to the other
                shop's estimate.
              </p>
              <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
                — Angel Odd, Google Review ★★★★★
              </p>
            </div>
            {/* Right: 3 pillars */}
            <div className="flex-shrink-0 grid grid-cols-1 gap-4 w-full md:w-64">
              {[
                {
                  title: "Lift-and-Show",
                  desc: "You see what's actually broken, not a quote on paper.",
                },
                {
                  title: "No Padding",
                  desc: "Repairs include only what your car genuinely needs.",
                },
                {
                  title: "Real Prices",
                  desc: "What you're quoted is what you pay. Full stop.",
                },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className="ant-pillar-card"
                >
                  <div
                    className="text-xs font-bold tracking-widest uppercase mb-1"
                    style={{ color: "#156cc2" }}
                  >
                    {p.title}
                  </div>
                  <div className="text-sm text-gray-600 leading-snug">
                    {p.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PROCESS STRIP ───────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Call or Roll In",
      desc: "24/7, any day. No appointment needed — just show up or call ahead.",
    },
    {
      num: "02",
      title: "Lift & Diagnose",
      desc: "Your car goes up. Anthony or Luis shows you exactly what's going on.",
    },
    {
      num: "03",
      title: "Straight Answer",
      desc: "Get a real price. No fluff, no invented problems, no pressure.",
    },
    {
      num: "04",
      title: "Fixed Fast",
      desc: "Most repairs done same day. You leave with a car that works.",
    },
  ];

  return (
    <section
      className="py-20 bg-[#0d1117] relative overflow-hidden"
      id="how-it-works"
    >
      <div className="dot-pattern absolute inset-0 opacity-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#4a9fea] mb-3 block">
            The Process
          </span>
          <h2
            className="text-4xl md:text-5xl text-white font-bold"
            style={{ fontFamily: "Hedvig Letters Serif, serif" }}
          >
            Simple. Straight. Done.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/10 z-0" />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center px-6 py-8 group"
            >
              {/* Number bubble */}
              <div className="ant-step-num mb-5">
                <span className="text-white text-2xl font-bold">{s.num}</span>
              </div>
              <h3
                className="text-lg font-bold text-white mb-2"
                style={{ fontFamily: "Hedvig Letters Serif, serif" }}
              >
                {s.title}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PHOTO BAND ──────────────────────────────────────────────────────────────

function PhotoBand() {
  return (
    <div className="photo-band-wrapper overflow-hidden relative">
      <div className="photo-band-track flex">
        {[...galleryPhotos, ...galleryPhotos].map((p, i) => (
          <div key={i} className="photo-band-item shrink-0">
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {/* Gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

// ─── EMERGENCY CTA BANNER ────────────────────────────────────────────────────

function EmergencyBanner() {
  return (
    <section className="py-16 bg-[#0ea158] relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
      />
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-white text-xs font-bold tracking-widest uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
            Available Right Now
          </div>
          <h2
            className="text-4xl md:text-5xl text-white font-bold mb-4"
            style={{ fontFamily: "Hedvig Letters Serif, serif" }}
          >
            Stuck? We Answer 24/7.
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
            Towing, diagnosis, or repair — call right now. No voicemail
            runaround, no "we open Monday."
          </p>
          <a href="tel:+12677746361" className="ant-emergency-cta">
            <span className="text-xl">📞</span>
            <span>(267) 774-6361</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AntAutoRepairPage() {
  return (
    <>
      <Navbar
        businessName="Ant's Auto Repair"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+12677746361"
      />

      {/* HERO */}
      <HeroSection
        headline="Honest Wrenches. No Games."
        subheadline="Philadelphia's 24/7 mechanic — same-day repairs, real prices, zero upsells."
        ctaText="Call (267) 774-6361"
        ctaHref="tel:+12677746361"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.7}
        reviewCount={105}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* STATS — dark */}
      <StatsCounter stats={stats} variant="dark" />

      {/* HONEST CALLOUT */}
      <HonestCallout />

      {/* SERVICES */}
      <section id="services" className="py-4 bg-[#f7f8fa]">
        <ServiceCards
          heading="What We Fix"
          subheading="Every service done with the same standard: your car leaves better than it arrived."
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* PHOTO BAND */}
      <PhotoBand />

      {/* ABOUT */}
      <section id="about" className="py-4 bg-white">
        <AboutSection
          heading="North Philly's Shop"
          story="Anthony has been fixing cars at 2750 N Broad St with one rule: show the customer exactly what's wrong before touching anything. When Angel Odd brought in her Jeep after another shop quoted $1,800, Anthony put it on the lift, showed her the actual problem, and charged a fraction of that. Same-day turnaround, real communication, and no invented repairs — that's what 105 five-star reviews are built on."
          image={aboutPhoto}
        />
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="bg-[#f7f8fa] py-4">
        <TestimonialCarousel
          heading="Real Words"
          reviews={reviews}
          variant="grid"
        />
      </section>

      {/* EMERGENCY BANNER */}
      <EmergencyBanner />

      {/* FAQ */}
      <section id="faq" className="py-4 bg-white">
        <FAQAccordion heading="Common Questions" items={faqItems} />
      </section>

      {/* CONTACT */}
      <section id="contact">
        <ContactSection
          business={businessContact}
          heading="Find Us"
          showMap={true}
        />
      </section>

      {/* FOOTER */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      {/* CLICK TO CALL */}
      <ClickToCall phone="(267) 774-6361" />
    </>
  );
}
