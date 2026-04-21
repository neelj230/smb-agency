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
  SocialLinks,
} from "@/components/types";
import { motion } from "framer-motion";

// ── Brand tokens ────────────────────────────────────────────────
const BRAND = "#1e64e6";
const ACCENT = "#f6e304";

// ── Contact ─────────────────────────────────────────────────────
const businessContact = {
  name: "Kim's Cleaners & Tailoring",
  address: "2008 Sansom St",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 557-1556",
  email: "",
  hours: {
    Monday: "8:00 AM – 5:30 PM",
    Tuesday: "8:00 AM – 5:30 PM",
    Wednesday: "8:00 AM – 5:30 PM",
    Thursday: "8:00 AM – 5:30 PM",
    Friday: "8:00 AM – 5:30 PM",
    Saturday: "9:00 AM – 4:30 PM",
    Sunday: "Closed",
  },
};

// ── Nav ─────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit Us", href: "#contact" },
];

// ── Hero photo ──────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Kim's Cleaners & Tailoring photo 1",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Kim's Cleaners & Tailoring photo 2",
  category: "interior",
};

// ── Services ────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: "Wedding Dress Alterations",
    description:
      "Multi-fitting bridal alteration service ensuring your wedding gown fits flawlessly for the big day, as trusted by brides across Philadelphia.",
    icon: "heart",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Formal & Evening Gown Tailoring",
    description:
      "Expert alterations for bridesmaid dresses, black-tie gowns, and rehearsal dinner attire, including hemming, taking in, and structural adjustments.",
    icon: "sparkles",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Suit Tailoring & Fitting",
    description:
      "Custom suit alterations from sleeve adjustments to full body contouring, with honest consultations on fit and sizing before work begins.",
    icon: "shirt",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Hem Reconstruction & Length Alteration",
    description:
      "Precise hemming and full hem reconstruction for dresses and gowns of any complexity, including challenging trailing styles.",
    icon: "scissors",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Garment Taking In & Resizing",
    description:
      "Structural resizing of dresses, gowns, and suits to achieve a tailored silhouette, including last-minute alterations for upcoming events.",
    icon: "ruler",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Dry Cleaning & Garment Care",
    description:
      "Professional dry cleaning services for everyday and special-occasion garments handled with care and attention to fabric integrity.",
    icon: "wind",
    image: "/photos/photo-8.webp",
  },
];

// ── Reviews ─────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "5/5 stars! Would recommend coming here for all your tailoring needs. I've been a customer for 2 years now and have never had any issues. Today, I tried on and took home my wedding dress after two fittings. My dress turned out perfect and I couldn't be happier!",
    author: "Elisa Sarmiento",
    rating: 5,
    source: "google",
  },
  {
    text: "I brought in two suits to Kim's cleaners to get altered. The owner gave me a thorough evaluation and recommended me to exchange the suit I brought in because it wasn't the right size. She told me if I brought in a slightly bigger size, she could tailor it to my liking.",
    author: "Stephen Kim",
    rating: 5,
    source: "google",
  },
  {
    text: "Mrs Kim is a lovely person, and she is also a professional and excellent tailor! I went with a dress that didn't fit my height and came up with the idea of cutting the trailing all off. Mrs Kim said it was a really big challenge, but she pulled it off!",
    author: "Fei Wang",
    rating: 5,
    source: "google",
  },
  {
    text: "I took 2 formal dresses here this year - one a bridesmaid dress and another a black tie gown. In the case of the black tie gown, I had to wait until 2 weeks before the event to get it taken in. They could have turned me away or charged a rush fee, but they were extremely kind.",
    author: "Christine Spaulding",
    rating: 5,
    source: "google",
  },
];

// ── Stats ───────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 131, suffix: "+", label: "Customer Reviews" },
  { value: 4.6, suffix: "★", label: "Average Star Rating" },
  { value: 6, suffix: " days", label: "Open Every Week" },
  { value: 100, suffix: "+", label: "Bridal & Formal Garments Tailored" },
];

// ── Gallery ─────────────────────────────────────────────────────
const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "Kim's Cleaners & Tailoring photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Kim's Cleaners & Tailoring photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Kim's Cleaners & Tailoring photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Kim's Cleaners & Tailoring photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Kim's Cleaners & Tailoring photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Kim's Cleaners & Tailoring photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Kim's Cleaners & Tailoring photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Kim's Cleaners & Tailoring photo 10",
    category: "work",
  },
];

// ── FAQ ─────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: "Can you handle wedding dress alterations?",
    answer:
      "Absolutely. Wedding dress alterations are one of Mrs. Kim's specialties. The process typically involves two fittings to ensure the gown fits perfectly before your big day.",
  },
  {
    question:
      "What if I have a last-minute alteration request close to my event?",
    answer:
      "We do our best to accommodate urgent timelines. Past customers have brought in formal gowns just two weeks before their event and we were able to complete the work without a rush fee.",
  },
  {
    question:
      "Will you give me an honest opinion on whether my garment can be altered well?",
    answer:
      "Yes — and that's something customers genuinely appreciate about Mrs. Kim. If a suit isn't the right size to tailor properly, she'll tell you and recommend a better starting point rather than do work that won't look right.",
  },
  {
    question: "How much do alterations typically cost?",
    answer:
      "Pricing varies depending on the complexity of the work. Simple hems are priced lower, while comprehensive alterations to bridal or formal gowns reflect the skill and time involved. We give clear estimates upfront.",
  },
];

// ── Social ──────────────────────────────────────────────────────
const socialLinks: SocialLinks = {};

// ── Footer nav ──────────────────────────────────────────────────
const footerLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit Us", href: "#contact" },
];

// ── Fade-up animation helper ─────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Page() {
  return (
    <>
      {/* ── CSS Variables ─────────────────────────────────────── */}
      <div
        style={
          {
            "--brand-primary": BRAND,
            "--brand-accent": ACCENT,
          } as React.CSSProperties
        }
      >
        {/* ── Navbar ─────────────────────────────────────────── */}
        <Navbar
          businessName="Kim's Cleaners & Tailoring"
          links={navLinks}
          ctaText="Call Now"
          ctaHref="tel:+12155571556"
        />

        {/* ── Hero ───────────────────────────────────────────── */}
        <HeroSection
          headline="Kim's Cleaners & Tailoring"
          subheadline="Every stitch tells your story — on Sansom St since the beginning."
          ctaText="Call (215) 557-1556"
          ctaHref="tel:+12155571556"
          secondaryCtaText="See Our Work"
          secondaryCtaHref="#gallery"
          rating={4.6}
          reviewCount={131}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />

        {/* ── Marquee tag strip ──────────────────────────────── */}
        <div className="kc-marquee-strip">
          <div className="kc-marquee-track">
            {[
              "Wedding Gowns",
              "Suit Tailoring",
              "Bridesmaid Dresses",
              "Hem Reconstruction",
              "Dry Cleaning",
              "Evening Gowns",
              "Rush Alterations",
              "Custom Fitting",
              "Wedding Gowns",
              "Suit Tailoring",
              "Bridesmaid Dresses",
              "Hem Reconstruction",
              "Dry Cleaning",
              "Evening Gowns",
              "Rush Alterations",
              "Custom Fitting",
            ].map((tag, i) => (
              <span key={i} className="kc-marquee-tag">
                {i % 2 === 0 ? (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill={ACCENT}
                    aria-hidden
                  >
                    <polygon points="5,0 6.5,3.5 10,3.5 7.3,5.7 8.1,9 5,7 1.9,9 2.7,5.7 0,3.5 3.5,3.5" />
                  </svg>
                ) : (
                  <span className="kc-marquee-dot" />
                )}
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── About ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="kc-about-wrapper"
        >
          <AboutSection
            heading="About the Shop"
            story="Mrs. Kim has been fitting Philadelphia for years from her Sansom Street shop, earning a reputation for honest consultations — she'll tell you if a suit isn't the right size before she touches it. Brides trust her with their wedding gowns through two fittings, and customers bring her the jobs other shops turn away. Real skill, real care, real results."
            image={aboutPhoto}
          />
        </motion.div>

        {/* ── Stats (dark band) ──────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <StatsCounter stats={stats} variant="dark" />
        </motion.div>

        {/* ── Services ───────────────────────────────────────── */}
        <motion.div
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="kc-section-pad"
        >
          <ServiceCards
            heading="Services"
            subheading="From bridal gowns to everyday suits — every garment handled with precision."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>

        {/* ── Diagonal accent divider ───────────────────────── */}
        <div className="kc-diagonal-divider" aria-hidden />

        {/* ── Gallery (dark bg) ──────────────────────────────── */}
        <div id="gallery" className="kc-dark-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <ImageGallery
              heading="Our Work"
              photos={galleryPhotos}
              variant="masonry"
            />
          </motion.div>
        </div>

        {/* ── Testimonials ───────────────────────────────────── */}
        <motion.div
          id="reviews"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="kc-section-pad kc-reviews-bg"
        >
          <TestimonialCarousel
            heading="What Customers Say"
            reviews={reviews}
            variant="featured"
          />
        </motion.div>

        {/* ── Accent quote band ─────────────────────────────── */}
        <div className="kc-quote-band">
          <div className="kc-quote-band-inner">
            <span className="kc-quote-mark">"</span>
            <p className="kc-quote-text">
              Where every stitch tells your story.
            </p>
            <span className="kc-quote-mark kc-quote-mark--right">"</span>
          </div>
        </div>

        {/* ── FAQ ────────────────────────────────────────────── */}
        <motion.div
          id="faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="kc-section-pad"
        >
          <FAQAccordion heading="Questions" items={faqItems} />
        </motion.div>

        {/* ── Contact ────────────────────────────────────────── */}
        <motion.div
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ContactSection
            business={businessContact}
            heading="Visit Us"
            showMap={true}
          />
        </motion.div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <Footer
          business={businessContact}
          links={footerLinks}
          socialLinks={socialLinks}
        />

        {/* ── Click-to-Call ───────────────────────────────────── */}
        <ClickToCall phone="(215) 557-1556" />
      </div>
    </>
  );
}
