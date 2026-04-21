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

// ── Nav ──────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

// ── Photos ───────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Head Game photo 1",
  category: "exterior",
};
const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Head Game photo 2",
  category: "interior",
};
const galleryPhotos: Photo[] = [
  { src: "/photos/photo-3.webp", alt: "Head Game photo 3", category: "work" },
  { src: "/photos/photo-4.webp", alt: "Head Game photo 4", category: "work" },
  { src: "/photos/photo-5.webp", alt: "Head Game photo 5", category: "work" },
  { src: "/photos/photo-6.webp", alt: "Head Game photo 6", category: "work" },
  { src: "/photos/photo-7.webp", alt: "Head Game photo 7", category: "work" },
  { src: "/photos/photo-8.webp", alt: "Head Game photo 8", category: "work" },
  { src: "/photos/photo-9.webp", alt: "Head Game photo 9", category: "work" },
  { src: "/photos/photo-10.webp", alt: "Head Game photo 10", category: "work" },
];

// ── Services ─────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: "Signature Haircut",
    description:
      "Kevin's precision cut tailored to your hair type and style, executed efficiently so you're never left waiting long.",
    icon: "scissors",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Kids' First Haircut",
    description:
      "A patient, gentle first-cut experience for young children, with the calm and care that nervous parents and kids both need.",
    icon: "star",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Boys' Regular Cut",
    description:
      "Consistent, sharp cuts for boys of all ages, with a barber who knows how to keep kids comfortable and looking fresh.",
    icon: "user",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Shape-Up & Edge",
    description:
      "Clean line-up and edge work to keep your look defined and polished between full cuts.",
    icon: "zap",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Special Needs Accommodations",
    description:
      "Kevin is experienced and patient with clients who have intellectual or sensory sensitivities, offering a calm and respectful experience every visit.",
    icon: "heart",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Beard Trim & Lineup",
    description:
      "Beard shaping and trimming to complement your cut and keep your overall look tight and well-maintained.",
    icon: "sliders-horizontal",
    image: "/photos/photo-8.webp",
  },
];

// ── Reviews ──────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "I've been taking my son here to Mr Kevin for at least 3 years I'll never go anywhere else! When I bring my son here its always a in and out job, he never have us over waiting! He's A very sharp barber and takes good hair of my son hair!",
    author: "Krystal",
    rating: 5,
    source: "google",
  },
  {
    text: "I've been going to head game 4 over 15 years same Barber has been cutting my hair and does an amazing job. It's a nice shop he also has customers that been going there that I've noticed for 10 years you will like head game I can promise you that.",
    author: "Milton Gibbons Jr",
    rating: 5,
    source: "google",
  },
  {
    text: "My barber Kevin is the best he gave my sons their first haircuts and they are now in their twenties. Great service fast.",
    author: "Marc Taylor",
    rating: 5,
    source: "google",
  },
  {
    text: "Kevin is ALWAYS patient with my son who has an intellectual disability. He's very polite and courteous everytime I am at his shop!",
    author: "Rhemar Pouncey",
    rating: 5,
    source: "google",
  },
  {
    text: "Have been going here for years. Have been satisfied every time, shop is clean, barber is great. Can't go wrong getting a cut from here",
    author: "SPS",
    rating: 5,
    source: "google",
  },
];

// ── Stats ────────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years Serving the Same Loyal Clients" },
  { value: 4.6, suffix: "★", label: "Average Customer Rating" },
  { value: 61, suffix: "+", label: "Five-Star Reviews & Counting" },
  { value: 3, suffix: " Generations", label: "Of Families Who Trust Kevin" },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: "Do I need an appointment or do you take walk-ins?",
    answer:
      "Head Game is known for getting clients in and out quickly without long waits. Call ahead at (215) 883-1597 to check availability — walk-ins are welcome when Kevin has room.",
  },
  {
    question: "What makes Kevin different from other barbers?",
    answer:
      "Kevin has been cutting the same customers' hair for 10 to 15+ years. He's fast, precise, and genuinely cares — customers bring their kids, and those kids grow up and keep coming back.",
  },
  {
    question: "Is this a good shop for kids?",
    answer:
      "Absolutely. Kevin is known for giving first haircuts and has been cutting some clients' kids' hair since they were young children. He's calm, patient, and great with all ages.",
  },
  {
    question: "Does Kevin work with clients who have special needs?",
    answer:
      "Yes. Multiple customers specifically praise Kevin's patience and courtesy with clients who have intellectual or sensory sensitivities. Every visit is handled with care and respect.",
  },
];

// ── Contact ──────────────────────────────────────────────────────────────────
const businessContact = {
  name: "Head Game",
  address: "5316 W Girard Ave",
  city: "Philadelphia",
  state: "PA",
  zip: "19131",
  phone: "(215) 883-1597",
  email: "",
  hours: {
    Monday: "Closed",
    Tuesday: "9:00 AM – 6:00 PM",
    Wednesday: "Closed",
    Thursday: "9:00 AM – 6:00 PM",
    Friday: "9:00 AM – 6:00 PM",
    Saturday: "9:00 AM – 6:00 PM",
    Sunday: "9:00 AM – 6:00 PM",
  },
};

// ── Marquee reviews (for ticker) ─────────────────────────────────────────────
const marqueeItems = [
  '"Sharp barber. Always in and out."',
  '"15 years, same barber, same quality."',
  '"First haircuts to full grown — Kevin\'s been there."',
  '"Patient, polite, and precise every single time."',
  '"Clean shop. Great cuts. Can\'t go wrong."',
  '"Sharp barber. Always in and out."',
  '"15 years, same barber, same quality."',
  '"First haircuts to full grown — Kevin\'s been there."',
  '"Patient, polite, and precise every single time."',
  '"Clean shop. Great cuts. Can\'t go wrong."',
];

export default function HeadGamePage() {
  return (
    <>
      {/* ── CSS custom properties ── */}
      <div
        style={
          {
            "--brand-primary": "#1e64e6",
            "--brand-accent": "#f6e304",
            "--brand-text": "#111111",
          } as React.CSSProperties
        }
      >
        <Navbar
          businessName="Head Game"
          links={navLinks}
          ctaText="Call Now"
          ctaHref="tel:+12158831597"
        />

        {/* ── HERO ── */}
        <section id="home">
          <HeroSection
            headline="Sharp Cuts. No Wait."
            subheadline="Kevin's been cutting the same families' hair for 15+ years on W Girard Ave."
            ctaText="Call to Book"
            ctaHref="tel:+12158831597"
            secondaryCtaText="See the Work"
            secondaryCtaHref="#gallery"
            rating={4.6}
            reviewCount={61}
            variant="photo-bg"
            backgroundImage={heroPhoto}
          />
        </section>

        {/* ── MARQUEE TICKER ── */}
        <div className="hg-ticker-wrap" aria-hidden="true">
          <div className="hg-ticker-inner">
            {marqueeItems.map((item, i) => (
              <span key={i} className="hg-ticker-item">
                {item}
                <span className="hg-ticker-dot">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS (dark) ── */}
        <div className="bg-[#111111] text-white">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        {/* ── ABOUT ── */}
        <section id="about" className="hg-about-wrap">
          <AboutSection
            heading="Kevin's Been Here"
            story="Head Game has been a fixture on W Girard Ave for over 15 years. Kevin cuts fast, cuts sharp, and knows your head — customers bring their newborns, and those kids come back as adults. The shop is clean, the wait is short, and Kevin treats every client with the same care whether it's a first haircut or the hundredth."
            image={aboutPhoto}
          />
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="hg-services-wrap dot-pattern">
          <ServiceCards
            heading="What Kevin Does"
            subheading="Sharp work, every time — from first cuts to beard lineups."
            services={services}
            columns={3}
            variant="grid"
          />
        </section>

        {/* ── TRUST BADGE STRIP ── */}
        <motion.div
          className="hg-trust-strip"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { icon: "⏱", label: "In & Out Fast" },
            { icon: "✂️", label: "Precision Every Cut" },
            { icon: "👶", label: "Great With Kids" },
            { icon: "❤️", label: "Special Needs Friendly" },
            { icon: "🏆", label: "15+ Years of Loyalty" },
          ].map((badge) => (
            <div key={badge.label} className="hg-trust-badge">
              <span className="hg-trust-icon">{badge.icon}</span>
              <span className="hg-trust-label">{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── GALLERY ── */}
        <section id="gallery" className="bg-[#111111] text-white py-2">
          <ImageGallery
            heading="The Work"
            photos={galleryPhotos}
            variant="masonry"
          />
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" className="hg-reviews-wrap">
          <TestimonialCarousel
            heading="From the Clients"
            reviews={reviews}
            variant="featured"
          />
        </section>

        {/* ── FAQ ── */}
        <section className="hg-faq-wrap dot-pattern">
          <FAQAccordion heading="Good to Know" items={faqItems} />
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="bg-[#111111] text-white">
          <ContactSection
            business={businessContact}
            heading="Find Head Game"
            showMap={true}
          />
        </section>

        {/* ── FOOTER ── */}
        <Footer business={businessContact} links={navLinks} socialLinks={{}} />

        {/* ── CLICK TO CALL ── */}
        <ClickToCall phone="(215) 883-1597" />
      </div>
    </>
  );
}
