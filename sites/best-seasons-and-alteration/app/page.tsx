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
import { motion, useInView } from "framer-motion";
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
  alt: "Best Seasons and alteration photo 1",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Best Seasons and alteration photo 2",
  category: "interior",
};

const services: Service[] = [
  {
    name: "Dress Alterations",
    description:
      "Professional reshaping and fitting of formal and casual dresses, including rush turnarounds for events and formals.",
    icon: "sparkles",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Suit & Jacket Tailoring",
    description:
      "Precise tapering, hemming, and fitting of suit jackets and blazers, with full guidance for first-time tailoring customers.",
    icon: "briefcase",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Pants & Jean Hemming",
    description:
      "Expert hem adjustments for trousers and denim that finish cleanly enough to look factory-original.",
    icon: "scissors",
  },
  {
    name: "Shirt Alterations",
    description:
      "Length and fit adjustments for dress shirts and casual tops to achieve a clean, custom silhouette.",
    icon: "shirt",
  },
  {
    name: "Rush Alterations",
    description:
      "Expedited turnaround service for time-sensitive events, completed ahead of deadline when at all possible.",
    icon: "clock",
  },
  {
    name: "General Clothing Alterations",
    description:
      "Comprehensive take-in, let-out, and repair services for a wide range of garments across seasons and styles.",
    icon: "needle",
  },
];

const reviews: Review[] = [
  {
    text: "Extremely friendly and excellent work. I've been here multiple times and every time is always quality. Last summer I went in looking to have a dress altered on an extremely tight deadline and she managed to pull it off in 10 days in time for my boyfriend's work formal.",
    author: "Noelle Zimmerman",
    rating: 5,
    source: "google",
  },
  {
    text: "Highly recommend! I dropped off a suit jacket, shirt and pants and everything came out perfect and ahead of schedule. A great price for the quality of work, and for my first time getting a jacket tailored, I was walked through the whole process.",
    author: "Matthew Lachance",
    rating: 5,
    source: "google",
  },
  {
    text: "They did a great job bringing out the hem on my pants. It looks absolutely pristine, it looks like it came like this from the factory. They were pleasant to interact with, inexpensive, and did a great job. I'm very happy. Thanks again!",
    author: "Mandarbmax",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.3, suffix: "★", label: "Average Customer Rating" },
  { value: 68, suffix: "+", label: "Customer Reviews" },
  { value: 6, suffix: " days", label: "Days a Week We're Open" },
  { value: 10, suffix: " days", label: "Fastest Documented Rush Turnaround" },
];

const faqItems: FAQItem[] = [
  {
    question: "What kinds of alterations do you do?",
    answer:
      "Best Seasons handles a wide range of alterations including dress reshaping, suit and jacket tailoring, pants and jean hemming, shirt adjustments, and general garment repairs.",
  },
  {
    question: "How fast can you turn around an alteration?",
    answer:
      "Turnaround times vary by job complexity, but customers have reported work completed ahead of schedule. In one case, a formal dress alteration was completed in just 10 days for a tight deadline.",
  },
  {
    question: "How much does an alteration cost?",
    answer:
      "Pricing is consistently described by customers as affordable and great value for the quality of work. Exact pricing depends on the garment and alteration type — call or visit for a quote.",
  },
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "The shop operates Monday through Saturday, 11 AM to 4 PM, and is closed Sundays. Walk-ins are welcome during those hours.",
  },
];

const businessContact = {
  name: "Best Seasons and alteration",
  address: "239 N 10th St",
  city: "Philadelphia",
  state: "PA",
  zip: "19107",
  phone: "(267) 597-4441",
  email: "",
  hours: {
    Monday: "11:00 AM – 4:00 PM",
    Tuesday: "11:00 AM – 4:00 PM",
    Wednesday: "11:00 AM – 4:00 PM",
    Thursday: "11:00 AM – 4:00 PM",
    Friday: "11:00 AM – 4:00 PM",
    Saturday: "11:00 AM – 4:00 PM",
    Sunday: "Closed",
  },
};

// ─── FADE-UP WRAPPER ──────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────
const marqueeItems = [
  "Dress Alterations",
  "Suit Tailoring",
  "Pants Hemming",
  "Rush Orders",
  "Shirt Alterations",
  "Perfect Fit",
  "Philadelphia, PA",
];

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee-strip overflow-hidden bg-[#f6e304] py-3 select-none">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 text-[13px] font-semibold tracking-widest uppercase text-[#0a0a0a]"
          >
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-[#1e64e6]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── SERVICE BADGE STRIP ──────────────────────────────────────────────────────
function ServiceBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
      {label}
    </span>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* ── NAV ── */}
      <Navbar
        businessName="Best Seasons"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+12675974441"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="Philadelphia's Neighborhood Tailor"
        subheadline="Quality alterations at fair prices — six days a week, no appointment needed."
        ctaText="Call (267) 597-4441"
        ctaHref="tel:+12675974441"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.3}
        reviewCount={68}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── STATS (dark) ── */}
      <FadeUp>
        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>
      </FadeUp>

      {/* ── SERVICES ── */}
      <section id="services" className="dot-pattern py-24">
        <FadeUp className="mx-auto max-w-2xl px-6 text-center mb-14">
          <span className="inline-block mb-3 rounded-full bg-[#1e64e6]/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#1e64e6]">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight">
            Alterations &amp; Tailoring
          </h2>
          <p className="mt-4 text-base text-[#444] leading-relaxed">
            From same-week rush jobs to precise hem work, every garment gets the
            same care.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ServiceCards
            heading=""
            services={services}
            columns={3}
            variant="grid"
          />
        </FadeUp>
      </section>

      {/* ── ABOUT (dark) ── */}
      <div
        id="about"
        className="bg-[#0a0a0a] text-white relative overflow-hidden"
      >
        {/* accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e64e6] via-[#f6e304] to-[#1e64e6]" />
        <FadeUp className="py-2">
          <AboutSection
            heading="A Stitch Above"
            story="Best Seasons has been serving Philadelphia's Chinatown neighborhood at 239 N 10th St for years. Customers walk in with tight deadlines — one dress alteration was done in just 10 days for a formal event. The work is honest, prices are fair, and the quality speaks for itself."
            image={aboutPhoto}
          />
        </FadeUp>
        {/* badge row */}
        <div className="pb-14 px-6 flex flex-wrap gap-3 justify-center">
          {[
            "Walk-ins Welcome",
            "Rush Turnarounds",
            "Factory-Quality Finishes",
            "Fair Pricing",
            "Mon–Sat 11–4",
          ].map((b) => (
            <ServiceBadge key={b} label={b} />
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="py-24 bg-white">
        <FadeUp className="mx-auto max-w-2xl px-6 text-center mb-14">
          <span className="inline-block mb-3 rounded-full bg-[#f6e304]/40 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#0a0a0a]">
            Real Customers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] leading-tight">
            What They Said
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <TestimonialCarousel
            heading=""
            reviews={reviews}
            variant="featured"
          />
        </FadeUp>
      </section>

      {/* ── ACCENT DIVIDER ── */}
      <div className="h-2 bg-gradient-to-r from-[#1e64e6] via-[#f6e304] to-[#1e64e6]" />

      {/* ── FAQ (dark) ── */}
      <div id="faq" className="bg-[#0f1623] text-white">
        <FadeUp className="py-24">
          <div className="mx-auto max-w-2xl px-6 text-center mb-14">
            <span className="inline-block mb-3 rounded-full bg-[#1e64e6]/20 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#f6e304]">
              Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Before You Visit
            </h2>
          </div>
          <FAQAccordion heading="" items={faqItems} />
        </FadeUp>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-white py-4">
        <FadeUp>
          <ContactSection
            business={businessContact}
            heading="Find Us"
            showMap={true}
          />
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      {/* ── CLICK TO CALL ── */}
      <ClickToCall phone="(267) 597-4441" />
    </>
  );
}
