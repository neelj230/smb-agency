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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Overhill Flowers photo 1",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Overhill Flowers photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "Overhill Flowers photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Overhill Flowers photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Overhill Flowers photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Overhill Flowers photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Overhill Flowers photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Overhill Flowers photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Overhill Flowers photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Overhill Flowers photo 10",
    category: "work",
  },
];

const services: Service[] = [
  {
    name: "Sympathy & Funeral Arrangements",
    description:
      "Compassionate, guided floral design for memorial services, created with care to honor your loved one and ease the burden on grieving families.",
    icon: "heart-handshake",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Custom Arrangement Design",
    description:
      "Describe your vision, event, or occasion and the team will design a one-of-a-kind arrangement tailored specifically to your needs.",
    icon: "palette",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Same-Day & Scheduled Delivery",
    description:
      "Reliable local flower delivery with orders fulfilled as quickly as two hours after placement, always arriving on time for birthdays, anniversaries, and special occasions.",
    icon: "truck",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Birthday & Celebration Flowers",
    description:
      "Bright, joyful arrangements designed to surprise and delight for birthdays and personal milestones, delivered fresh to the recipient's door.",
    icon: "cake",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Church & Event Floral Design",
    description:
      "Custom floral arrangements for congregations, ceremonies, and organizational events, with consistent quality and on-time delivery for recurring clients.",
    icon: "building-2",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Online Order & Delivery",
    description:
      "Convenient website ordering with clear delivery instructions, making it easy to send flowers to loved ones near or far with confidence.",
    icon: "shopping-cart",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "We just had our mother's service and Hugh was absolutely wonderful! He helped us tremendously from start to finish. We live far away and were not familiar with the location, but Hugh guided us so that we felt secure in knowing everything would look really nice. The arrangement de...",
    author: "Hannah Tighe",
    rating: 5,
    source: "google",
  },
  {
    text: "Overhill flowers did a great job with my order. From the website to delivery instructions, everything was handled. I surprised my Aunt with these for her birthday and she was all smiles on the phone! Flowers were delivered on time and on her birthday. She absolutely loved them.",
    author: "Authentically April",
    rating: 5,
    source: "google",
  },
  {
    text: "Chosen Generation COGIC enjoy ordering flowers from Overhill. They are always on time with delivery. There staff is kind and professional. And the flowers and designs excellent. You describe the event or occasion and they never fail at making custom arrangements.",
    author: "Barbara Goodson",
    rating: 5,
    source: "google",
  },
  {
    text: "I ordered an arrangement this morning (12/11) and it was delivered two hours later. Thank you for the exceptional service and delivering a beautiful arrangement.",
    author: "Greg Sanders",
    rating: 5,
    source: "google",
  },
  {
    text: "Always have beautiful flower arrangements and a variety of flowers included. I usually ask for the store to create an arrangement rather than pick one off their website and have always been very happy with the outcome. They also listen if you request to exclude or include specifi...",
    author: "Rachel Goeken",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.7, suffix: "★", label: "Average Customer Rating" },
  { value: 18, suffix: "+", label: "Verified Customer Reviews" },
  { value: 2, suffix: "-Hour", label: "Same-Day Delivery Available" },
  { value: 100, suffix: "%", label: "Custom Orders Delivered On Time" },
];

const faqItems: FAQItem[] = [
  {
    question:
      "Can you create a custom arrangement for a specific occasion or event?",
    answer:
      "Absolutely. Many of our customers prefer to describe the occasion rather than choose from the website catalog, and our team creates something entirely unique based on that conversation.",
  },
  {
    question: "How quickly can you deliver flowers?",
    answer:
      "We offer same-day delivery for local orders — one customer received their arrangement within two hours of placing a morning order. We also offer scheduled delivery so flowers arrive exactly when they should.",
  },
  {
    question: "Can you help with flowers for a funeral or memorial service?",
    answer:
      "Yes, and we take this responsibility seriously. Our team, led by Hugh, guides families through the entire process with patience and care — especially when they are coordinating from out of town.",
  },
  {
    question:
      "What if I have specific flower preferences or want to exclude certain flowers?",
    answer:
      "We listen carefully. Whether you want to include a loved one's favorite bloom or need to avoid a specific flower, just let us know and we'll build the arrangement around your requests.",
  },
];

const businessContact = {
  name: "Overhill Flowers",
  address: "6231 Lancaster Ave",
  city: "Philadelphia",
  state: "PA",
  zip: "19151",
  phone: "(215) 473-1842",
  email: "",
  hours: {
    Monday: "9:00 AM – 12:00 PM",
    Tuesday: "9:00 AM – 12:00 PM",
    Wednesday: "9:00 AM – 12:00 PM",
    Thursday: "9:00 AM – 12:00 PM",
    Friday: "9:00 AM – 12:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

// ── Marquee strip ────────────────────────────────────────────────────────────

const marqueeItems = [
  "Custom Arrangements",
  "Same-Day Delivery",
  "Sympathy Flowers",
  "Birthday Blooms",
  "Church & Events",
  "Philadelphia, PA",
];

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overhill-marquee-root">
      <div className="overhill-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="overhill-marquee-item">
            <span className="overhill-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Floating tagline banner ──────────────────────────────────────────────────

function TaglineBanner() {
  return (
    <motion.div
      className="overhill-tagline-banner"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="overhill-tagline-inner">
        <span className="overhill-tagline-leaf">✦</span>
        <p className="overhill-tagline-text">
          Beautiful blooms, delivered when it matters.
        </p>
        <span className="overhill-tagline-leaf">✦</span>
      </div>
    </motion.div>
  );
}

// ── Section wrapper helpers ──────────────────────────────────────────────────

function SectionFadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      {/* ── Grain overlay ── */}
      <div className="overhill-grain" aria-hidden="true" />

      {/* ── Nav ── */}
      <Navbar
        businessName="Overhill Flowers"
        links={navLinks}
        ctaText="Order Now"
        ctaHref="tel:+12154731842"
      />

      {/* ── Hero ── */}
      <HeroSection
        headline="Overhill Flowers"
        subheadline="Philadelphia's florist for life's biggest moments — since Lancaster Ave."
        ctaText="Order Now"
        ctaHref="tel:+12154731842"
        secondaryCtaText="See Our Work"
        secondaryCtaHref="#gallery"
        rating={4.7}
        reviewCount={18}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── Marquee ── */}
      <MarqueeStrip />

      {/* ── Stats — dark ── */}
      <SectionFadeUp>
        <StatsCounter stats={stats} variant="dark" />
      </SectionFadeUp>

      {/* ── Tagline banner ── */}
      <div className="overhill-tagline-wrap">
        <TaglineBanner />
      </div>

      {/* ── Services ── */}
      <SectionFadeUp className="overhill-section-light" delay={0.05}>
        <div id="services" className="overhill-section-pad">
          <ServiceCards
            heading="What We Do"
            subheading="From sympathy arrangements to birthday surprises — we handle every occasion with care."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>
      </SectionFadeUp>

      {/* ── Gallery — dark band ── */}
      <div id="gallery" className="overhill-dark-band">
        <SectionFadeUp delay={0.05}>
          <ImageGallery
            heading="Our Work"
            photos={galleryPhotos}
            variant="masonry"
          />
        </SectionFadeUp>
      </div>

      {/* ── About ── */}
      <SectionFadeUp className="overhill-section-cream" delay={0.05}>
        <div id="about" className="overhill-section-pad">
          <AboutSection
            heading="Lancaster Ave. Florist"
            story="Overhill Flowers has served the Philadelphia community from 6231 Lancaster Ave for years, building a reputation for custom arrangements and on-time delivery. When Hugh guided a grieving out-of-town family through their mother's memorial flowers, that's the kind of work we're proud of. Tell us your occasion — we'll handle the rest."
            image={aboutPhoto}
          />
        </div>
      </SectionFadeUp>

      {/* ── Reviews ── */}
      <SectionFadeUp delay={0.05}>
        <div id="reviews" className="overhill-section-pad">
          <TestimonialCarousel
            heading="Customer Stories"
            reviews={reviews}
            variant="featured"
          />
        </div>
      </SectionFadeUp>

      {/* ── FAQ — dark ── */}
      <div id="faq" className="overhill-faq-dark">
        <SectionFadeUp delay={0.05}>
          <div className="overhill-section-pad">
            <FAQAccordion heading="Common Questions" items={faqItems} />
          </div>
        </SectionFadeUp>
      </div>

      {/* ── Contact ── */}
      <SectionFadeUp delay={0.05}>
        <div id="contact">
          <ContactSection
            business={businessContact}
            heading="Find Us"
            showMap={true}
          />
        </div>
      </SectionFadeUp>

      {/* ── Footer ── */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      {/* ── Click to call ── */}
      <ClickToCall phone="(215) 473-1842" />
    </>
  );
}
