"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCards } from "@/components/ServiceCards";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { StatsCounter } from "@/components/StatsCounter";
import { ImageGallery } from "@/components/ImageGallery";
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
import { motion } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Judge Auto Repair Inc photo 1",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Judge Auto Repair Inc photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "Judge Auto Repair Inc photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Judge Auto Repair Inc photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Judge Auto Repair Inc photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Judge Auto Repair Inc photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Judge Auto Repair Inc photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Judge Auto Repair Inc photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Judge Auto Repair Inc photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Judge Auto Repair Inc photo 10",
    category: "work",
  },
];

const services: Service[] = [
  {
    name: "General Diagnostics & Multi-Point Inspection",
    description:
      "Comprehensive vehicle inspection to identify and explain issues before any work begins, with honest breakdowns of what needs immediate attention.",
    icon: "search",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Same-Day Repair Service",
    description:
      "Fast, efficient repairs completed the same day you bring your vehicle in, including Saturday availability when other shops are closed.",
    icon: "zap",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Brake Service & Repair",
    description:
      "Full brake inspection, pad replacement, rotor resurfacing or replacement, and brake fluid service to keep you stopping safely.",
    icon: "shield",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Engine & Drivetrain Repair",
    description:
      "Expert engine diagnostics and repair using your choice of new or quality used parts, tailored to your budget and vehicle needs.",
    icon: "settings",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Suspension & Steering",
    description:
      "Diagnosis and repair of shocks, struts, tie rods, and steering components to restore smooth handling and ride comfort.",
    icon: "git-branch",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Oil Change & Preventive Maintenance",
    description:
      "Routine oil changes, fluid top-offs, filter replacements, and maintenance checks at prices significantly below dealership rates.",
    icon: "droplet",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "This is the only mechanic I use for my car. I love how fair they are and the prices are super reasonable. They definitely dont try to overcharge you. And my service is fast. Definitely recommend.",
    author: "Jinnieliz",
    rating: 5,
    source: "google",
  },
  {
    text: "Great service.. Price is much better than dealership",
    author: "GM ALAM",
    rating: 5,
    source: "google",
  },
  {
    text: "Highly knowledgeable and friendly mechanics with great prices. It's the only shop in the area that would even accept my car on a Saturday, and they fixed all issues within an hour. Thank you so much for everything!",
    author: "Nicki",
    rating: 5,
    source: "google",
  },
  {
    text: "Gona is one of the best mechanics I've ever know. So if you want your car fixed right and you want an honest mechanic to do it, then this it. IT IS NOT PRETTY! IT'S A REPAIR GARAGE! SO if you care about nice clean waiting rooms, great customer service and fast service go somewher...",
    author: "DEW",
    rating: 5,
    source: "google",
  },
  {
    text: "great place 10/10 service, very friendly, big thanks to everyone who works there!!",
    author: "Anna Bailey",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.5, suffix: "★", label: "Average Customer Rating" },
  { value: 74, suffix: "+", label: "Verified Customer Reviews" },
  { value: 6, suffix: " Days", label: "Open Every Week Including Saturday" },
  { value: 100, suffix: "%", label: "Customers Who'd Recommend to a Friend" },
];

const faqItems: FAQItem[] = [
  {
    question: "Are your prices really lower than the dealership?",
    answer:
      "Yes — multiple customers have specifically noted that Judge Auto's prices beat dealership rates by a meaningful margin.",
  },
  {
    question: "Is the shop open on Saturdays?",
    answer:
      "Yes. Judge Auto is open Monday through Saturday, 9:00 AM to 5:30 PM. Saturday availability is a big deal — customers have come in when no other local shop would take them.",
  },
  {
    question: "Is this a fancy shop with a nice waiting room?",
    answer:
      "Honestly, no — and that's by design. Judge Auto is a working repair garage, not a customer lounge. The investment goes into the work, not the décor.",
  },
  {
    question: "Can I choose between new and used parts for my repair?",
    answer:
      "Absolutely. Gona will walk you through your options and let you decide whether you want new parts or more budget-friendly quality used parts.",
  },
];

const businessContact = {
  name: "Judge Auto Repair Inc",
  address: "5804 Chestnut St",
  city: "Philadelphia",
  state: "PA",
  zip: "19139",
  phone: "(215) 528-6004",
  email: "",
  hours: {
    Monday: "9:00 AM – 5:30 PM",
    Tuesday: "9:00 AM – 5:30 PM",
    Wednesday: "9:00 AM – 5:30 PM",
    Thursday: "9:00 AM – 5:30 PM",
    Friday: "9:00 AM – 5:30 PM",
    Saturday: "9:00 AM – 5:30 PM",
    Sunday: "Closed",
  },
};

// ─── Animations ─────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      {/* ── Brand tokens ── */}

      <div className="judge-page">
        {/* Grain overlay */}
        <div className="film-grain-overlay" aria-hidden="true" />

        {/* ── Nav ── */}
        <Navbar
          businessName="Judge Auto Repair Inc"
          links={navLinks}
          ctaText="Call Now"
          ctaHref="tel:2155286004"
        />

        {/* ── Hero ── */}
        <HeroSection
          headline="Honest Wrenches. Real Prices."
          subheadline="Philadelphia's no-nonsense garage on Chestnut St — open 6 days a week."
          ctaText="Call (215) 528-6004"
          ctaHref="tel:2155286004"
          secondaryCtaText="See Services"
          secondaryCtaHref="#services"
          rating={4.5}
          reviewCount={74}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />

        {/* ── Trust bar ── */}
        <motion.section
          className="trust-bar"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            { emoji: "🔧", text: "No-BS Estimates" },
            { emoji: "📅", text: "Open Saturdays" },
            { emoji: "💰", text: "Below Dealer Prices" },
            { emoji: "⚡", text: "Same-Day Service" },
            { emoji: "⭐", text: "4.5 Stars · 74 Reviews" },
          ].map((item) => (
            <motion.div
              key={item.text}
              className="trust-pill"
              variants={fadeUp}
            >
              <span className="trust-emoji">{item.emoji}</span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.section>

        {/* ── Stats (dark) ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <StatsCounter stats={stats} variant="dark" />
        </motion.div>

        {/* ── Services ── */}
        <motion.section
          id="services"
          className="section-light"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ServiceCards
            heading="What We Fix"
            subheading="From a quick oil change to a full engine job — Gona and the crew handle it."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.section>

        {/* ── About ── */}
        <motion.section
          id="about"
          className="section-warm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <AboutSection
            heading="The Shop"
            story="Judge Auto Repair has been keeping Philadelphia cars on the road from 5804 Chestnut St for years. It's not a showroom — it's a real garage where Gona fixes cars right the first time, tells you exactly what's wrong, and charges you a fair price. Customers drive from all over because they can't find honesty like this anywhere else."
            image={aboutPhoto}
          />
        </motion.section>

        {/* ── Tagline break (dark) ── */}
        <section className="tagline-break">
          <div className="tagline-break__dot-pattern" aria-hidden="true" />
          <motion.div
            className="tagline-break__inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="tagline-break__eyebrow">The Judge Auto Way</span>
            <h2 className="tagline-break__headline">
              "IT IS NOT PRETTY.
              <br />
              IT'S A REPAIR GARAGE."
            </h2>
            <p className="tagline-break__sub">
              The money goes into the work — not the waiting room.
            </p>
          </motion.div>
        </section>

        {/* ── Reviews ── */}
        <motion.section
          id="reviews"
          className="section-light"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <TestimonialCarousel
            heading="Real Customers"
            reviews={reviews}
            variant="grid"
          />
        </motion.section>

        {/* ── Gallery ── */}
        <motion.section
          id="gallery"
          className="section-warm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ImageGallery
            heading="The Work"
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.section>

        {/* ── FAQ ── */}
        <motion.section
          id="faq"
          className="section-faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <FAQAccordion heading="Good Questions" items={faqItems} />
        </motion.section>

        {/* ── Contact ── */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ContactSection
            business={businessContact}
            heading="Find Us"
            showMap={true}
          />
        </motion.section>

        {/* ── Footer ── */}
        <Footer business={businessContact} links={navLinks} socialLinks={{}} />

        {/* ── Click to Call ── */}
        <ClickToCall phone="(215) 528-6004" />
      </div>
    </>
  );
}
