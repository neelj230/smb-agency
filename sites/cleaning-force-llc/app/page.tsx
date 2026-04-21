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

// ── Brand tokens ─────────────────────────────────────────────
const BRAND_BLUE = "#1e64e6";
const BRAND_YELLOW = "#f6e304";

// ── Nav ──────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ── Photos ───────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Cleaning Force LLC photo 1",
  category: "exterior",
};
const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Cleaning Force LLC photo 2",
  category: "interior",
};
const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "Cleaning Force LLC photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Cleaning Force LLC photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Cleaning Force LLC photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Cleaning Force LLC photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Cleaning Force LLC photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Cleaning Force LLC photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Cleaning Force LLC photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Cleaning Force LLC photo 10",
    category: "work",
  },
];

// ── Services ─────────────────────────────────────────────────
const services: Service[] = [
  {
    name: "Deep Cleaning",
    description:
      "A comprehensive top-to-bottom clean covering every room, appliance, corner, and surface — perfect for first-time clients or homes that need a serious reset.",
    icon: "sparkles",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Move-Out Cleaning",
    description:
      "Detailed move-out cleans designed to leave rental properties spotless, help tenants recover security deposits, and prepare homes for the next occupant.",
    icon: "door-open",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Recurring Home Cleaning",
    description:
      "Scheduled weekly, bi-weekly, or monthly cleans that keep your home consistently spotless so you never have to think about it.",
    icon: "calendar-check",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Appliance & Kitchen Cleaning",
    description:
      "Focused cleaning of stovetops, ovens, refrigerators, and kitchen surfaces — restored to better-than-new condition using professional-grade supplies.",
    icon: "utensils",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Move-In Cleaning",
    description:
      "Thorough pre-move-in cleans that ensure your new space is sanitized, fresh, and truly ready for you to call home from day one.",
    icon: "home",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Last-Minute & Emergency Cleaning",
    description:
      "Rapid-response cleaning bookable with less than 48 hours notice — available 24/7 for situations that can't wait.",
    icon: "zap",
    image: "/photos/photo-8.webp",
  },
];

// ── Reviews ──────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "BEST CLEANING COMPANY EVER! I can't rave enough about this company. From the professionalism, to the very detailed services. Being a type A person, I am very particular about my home and how it's cleaned, Cleaning Force never disappoints. My house is spotless and smells amazing.",
    author: "Shannon Artis",
    rating: 5,
    source: "google",
  },
  {
    text: "If you never have time to clean, Cleaning Force is the perfect solution. Very reliable and reasonably priced. I would definitely recommend the deep cleaning if you're like me.",
    author: "Najee Dow",
    rating: 5,
    source: "google",
  },
  {
    text: "I recently hired Cleaning Force LLC for a move-out clean at my rental property, and I couldn't be more satisfied with the results. From start to finish, their service was exceptional. The scheduling process was straightforward, and they were flexible in accommodating my timeline.",
    author: "Nateile Justice",
    rating: 5,
    source: "google",
  },
  {
    text: "I was so impressed with the cleaning service I received from Cleaning Force! My house looks and smells amazing. After having a different company clean my house for over a year I needed a better option to meet my needs and Cleaning Force did just that. I love the customer guarantee.",
    author: "Zenia Pearson-Mixson",
    rating: 5,
    source: "google",
  },
  {
    text: "During my last move I had to leave quickly and didn't have time to give the house a deep cleaning. I was able to book Cleaning Force on less than 48 hours notice, and their website made the booking process quick and simple. I was contacted quickly and maintained great communication.",
    author: "Joseph Bove",
    rating: 5,
    source: "google",
  },
];

// ── Stats ────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.6, suffix: "★", label: "Average Customer Rating" },
  { value: 45, suffix: "+", label: "Verified Customer Reviews" },
  { value: 24, suffix: "/7", label: "Hours Available, Every Day" },
  { value: 48, suffix: "hr", label: "Fast Booking Turnaround" },
];

// ── FAQ ──────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: "How quickly can you schedule a cleaning?",
    answer:
      "Cleaning Force can accommodate bookings with less than 48 hours notice. Their online booking system is fast and straightforward — reach out by phone or the web form to lock in a time.",
  },
  {
    question:
      "What makes Cleaning Force different from other cleaning companies?",
    answer:
      "Customers consistently highlight three things: attention to detail that goes beyond what's asked, reliable communication throughout the process, and results that make homes look and smell brand new every single time.",
  },
  {
    question: "Do you offer a satisfaction guarantee?",
    answer:
      "Yes. Cleaning Force offers a customer satisfaction guarantee, giving clients peace of mind that their space will be cleaned to a high standard — or they will make it right.",
  },
  {
    question: "What does your move-out cleaning include?",
    answer:
      "Move-out cleans cover all rooms including kitchens, bathrooms, living spaces, appliances (inside and out), floors, carpets, and baseboards. Everything a landlord or new tenant expects to find spotless.",
  },
];

// ── Contact ──────────────────────────────────────────────────
const businessContact = {
  name: "Cleaning Force LLC",
  address: "2101 N 63rd St",
  city: "Philadelphia",
  state: "PA",
  zip: "19151",
  phone: "(610) 809-5003",
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

// ── Marquee strip data ────────────────────────────────────────
const marqueeItems = [
  "Deep Cleaning",
  "Move-Out Ready",
  "Same-Day Booking",
  "Satisfaction Guaranteed",
  "Philadelphia & Surrounding Area",
  "4.6 Stars on Google",
  "Open 24 / 7",
  "Move-In Spotless",
];

// ── Inline animated marquee component ────────────────────────
function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="cf-marquee-wrapper" aria-hidden="true">
      <div className="cf-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="cf-marquee-item">
            <span className="cf-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Decorative divider ────────────────────────────────────────
function YellowAccentBar() {
  return (
    <div className="cf-accent-bar-wrap">
      <div className="cf-accent-bar" />
    </div>
  );
}

// ── Scroll-reveal wrapper ─────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Trust badge strip ─────────────────────────────────────────
function TrustBadges() {
  const badges = [
    { icon: "🛡️", label: "Satisfaction Guaranteed" },
    { icon: "⚡", label: "Book in Under 48 hrs" },
    { icon: "🕐", label: "Available 24 / 7" },
    { icon: "⭐", label: "4.6 Stars on Google" },
  ];
  return (
    <div className="cf-trust-strip">
      {badges.map((b, i) => (
        <motion.div
          key={i}
          className="cf-trust-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <span className="cf-trust-icon">{b.icon}</span>
          <span className="cf-trust-label">{b.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Big quote pull section ────────────────────────────────────
function PullQuote() {
  return (
    <div className="cf-pullquote-section">
      <div className="cf-pullquote-inner">
        <Reveal>
          <div className="cf-pullquote-mark">"</div>
          <p className="cf-pullquote-text">
            My house is spotless and smells amazing. Cleaning Force never
            disappoints.
          </p>
          <p className="cf-pullquote-attr">— Shannon Artis, Philadelphia</p>
        </Reveal>
      </div>
      <div className="cf-pullquote-photo-col">
        <img
          src="/photos/photo-9.webp"
          alt="Clean home by Cleaning Force"
          className="cf-pullquote-photo"
        />
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function CleaningForcePage() {
  return (
    <>
      {/* ── Navbar ── */}
      <Navbar
        businessName="Cleaning Force LLC"
        links={navLinks}
        ctaText="Book Now"
        ctaHref="tel:6108095003"
      />

      {/* ── Hero ── */}
      <HeroSection
        headline="Spotless Every Time."
        subheadline="Philadelphia's on-call cleaning crew — 24/7, no exceptions, satisfaction guaranteed."
        ctaText="Book a Clean"
        ctaHref="tel:6108095003"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.6}
        reviewCount={45}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── Marquee ── */}
      <MarqueeStrip />

      {/* ── Trust badges ── */}
      <section className="cf-trust-section">
        <TrustBadges />
      </section>

      {/* ── Stats (dark) ── */}
      <Reveal>
        <StatsCounter stats={stats} variant="dark" />
      </Reveal>

      {/* ── Services ── */}
      <section id="services" className="cf-section-padded dot-pattern">
        <Reveal>
          <div className="cf-section-header">
            <span className="cf-overline">What We Do</span>
            <h2 className="cf-section-title">Six Services.</h2>
            <p className="cf-section-sub">
              From last-minute emergencies to scheduled weekly visits — we
              handle it all.
            </p>
          </div>
        </Reveal>
        <ServiceCards
          heading=""
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ── Yellow accent ── */}
      <YellowAccentBar />

      {/* ── About (dark wrap) ── */}
      <div id="about" className="cf-dark-wrap">
        <AboutSection
          heading="Built on Results."
          story="Cleaning Force LLC operates out of Philadelphia, PA — and every job reflects that work ethic. Clients who switched from other services say the difference is immediate: deeper clean, better smell, zero complaints. With a satisfaction guarantee backing every visit, there's no guesswork."
          image={aboutPhoto}
        />
      </div>

      {/* ── Pull quote ── */}
      <PullQuote />

      {/* ── Testimonials ── */}
      <section id="reviews" className="cf-section-padded">
        <Reveal>
          <div className="cf-section-header">
            <span className="cf-overline">Real Customers</span>
            <h2 className="cf-section-title">45 Reviews.</h2>
            <p className="cf-section-sub">All five stars. All from Google.</p>
          </div>
        </Reveal>
        <TestimonialCarousel heading="" reviews={reviews} variant="scroll" />
      </section>

      {/* ── FAQ (dark) ── */}
      <div id="faq" className="cf-dark-wrap cf-faq-wrap">
        <Reveal>
          <div className="cf-section-header cf-section-header--light">
            <span className="cf-overline cf-overline--yellow">
              Common Questions
            </span>
            <h2 className="cf-section-title">FAQ</h2>
          </div>
        </Reveal>
        <FAQAccordion heading="" items={faqItems} />
      </div>

      {/* ── Contact ── */}
      <section id="contact" className="cf-section-padded">
        <Reveal>
          <div className="cf-section-header">
            <span className="cf-overline">Reach Out</span>
            <h2 className="cf-section-title">Book Today.</h2>
          </div>
        </Reveal>
        <ContactSection business={businessContact} heading="" showMap={true} />
      </section>

      {/* ── Footer ── */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      {/* ── Floating CTA ── */}
      <ClickToCall phone="(610) 809-5003" />
    </>
  );
}
