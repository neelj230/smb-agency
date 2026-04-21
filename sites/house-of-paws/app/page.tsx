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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// ─── Brand tokens ──────────────────────────────────────────────
// primary: #1e64e6  accent: #f6e304

// ─── Data ──────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-6.webp",
  alt: "Woman and fluffy white dog posing together for a friendly portrait photo",
  category: "team",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-9.webp",
  alt: "Pet grooming shop storefront with blue doors and signage advertising self-serve dog wash",
  category: "exterior",
};

const services: Service[] = [
  {
    name: "Full-Service Grooming",
    description:
      "Complete professional grooming session including bath, blow-dry, haircut, and finishing touches like a bandana — leaving your pup looking and smelling amazing.",
    icon: "scissors",
    image: "/photos/photo-1.webp",
  },
  {
    name: "Self-Serve Dog Wash",
    description:
      "Use the shop's professional-grade tub stations and supplies to bathe your own dog — all the facilities, none of the mess at home.",
    icon: "droplets",
    image: "/photos/photo-2.webp",
  },
  {
    name: "Puppy's First Groom",
    description:
      "A gentle, patient introduction to grooming for young or first-time dogs, handled by staff who understand how nerve-wracking a pup's debut can be.",
    icon: "heart",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Bath & Brush Out",
    description:
      "A thorough bath and full brush-out to de-shed, detangle, and refresh your dog's coat between full grooming appointments.",
    icon: "wind",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Nail Trim",
    description:
      "Quick and stress-minimized nail clipping to keep your dog comfortable and your floors safe.",
    icon: "cog",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Finishing & Styling",
    description:
      "Breed-specific styling, coat shaping, and cute finishing touches like bandanas that make your dog look salon-fresh.",
    icon: "sparkles",
    image: "/photos/photo-7.webp",
  },
];

const reviews: Review[] = [
  {
    text: "Very pleased with their service! I took my puppy to get groomed for the first time. I was very nervous to leave my puppy because she's so small still. They were very kind to me and my puppy. She looked amazing! Defiantly recommend.",
    author: "J V",
    rating: 5,
    source: "google",
  },
  {
    text: "This shop is a little piece of dog Heaven. The owner and staff are kind, gentle, and professional! The atmosphere is fun and full of fur friends who are enjoying their spa day! I have taken all my dogs to the owner for well over 15 years, so I know her commitment of excellence.",
    author: "Elizabeth Olsen",
    rating: 5,
    source: "google",
  },
  {
    text: "I would recommend this shop to anyone looking for a new place to switch to or just starting to get their pup groomed. My corgi has been coming here little over a year now and they are the sweetest staff! & have good pricing for their services.",
    author: "Sarah L",
    rating: 5,
    source: "google",
  },
  {
    text: "Great place to DIY dog washing.",
    author: "Diana Lanier",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.8, suffix: "★", label: "Average Customer Rating" },
  { value: 26, suffix: "+", label: "Verified Customer Reviews" },
  { value: 15, suffix: "+ yrs", label: "Owner's Grooming Experience" },
  { value: 7, suffix: " days", label: "Days a Week We're Open" },
];

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-1.webp",
    alt: "Groomed small dog with cream and white coat standing indoors on mat",
    category: "product",
  },
  {
    src: "/photos/photo-2.webp",
    alt: "Fluffy cream-colored Chihuahua groomed professionally, standing in grooming salon.",
    category: "work",
  },
  {
    src: "/photos/photo-3.webp",
    alt: "Small tan dog with pink collar sitting on grooming table in pet salon",
    category: "interior",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Two small dogs relaxing on green bedding in an indoor play area",
    category: "interior",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Brown and white dog standing in metal trough enclosure with green corrugated walls",
    category: "interior",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Close-up of a long-haired dog with curly, fluffy coat in grooming setting",
    category: "product",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Young woman smiling while bathing a gray dog in a metal tub at a grooming facility.",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Dog wearing red gingham bandana on grooming table at pet salon",
    category: "work",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Is this a good place to bring my puppy for the first time?",
    answer:
      "Absolutely. Several customers have brought their puppies here for their very first groom and raved about how kind and patient the staff are. We take it slow so your pup's first experience is a positive one.",
  },
  {
    question: "Do you offer self-serve dog washing, or only full grooming?",
    answer:
      "Both! House of Paws has a self-serve dog wash station with professional tubs, so you can bathe your own dog using the shop's supplies — all the tools, none of the mess at home.",
  },
  {
    question:
      "What makes House of Paws different from other groomers in Medford?",
    answer:
      "The combination of trust, longevity, and genuine care sets this shop apart. One customer has been bringing her dogs to the owner for over 15 years. That kind of loyalty says everything.",
  },
  {
    question: "Do you allow dogs with fleas?",
    answer:
      "The shop does not accept dogs with active flea infestations during grooming sessions, as this helps protect other dogs in the salon. Please treat your pet before their appointment if needed.",
  },
];

const businessContact = {
  name: "House of Paws",
  address: "2714 W Main St",
  city: "Medford",
  state: "OR",
  zip: "97501",
  phone: "(541) 973-2101",
  email: "",
  hours: {
    Monday: "9:00 AM – 3:00 PM",
    Tuesday: "9:00 AM – 3:00 PM",
    Wednesday: "9:00 AM – 3:00 PM",
    Thursday: "9:00 AM – 3:00 PM",
    Friday: "9:00 AM – 3:00 PM",
    Saturday: "9:00 AM – 3:00 PM",
    Sunday: "9:00 AM – 3:00 PM",
  },
};

const socialLinks: SocialLinks = {};

// ─── Fade-up animation helper ───────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Marquee strip ──────────────────────────────────────────────
const marqueeWords = [
  "Dog Grooming",
  "✦",
  "Self-Serve Wash",
  "✦",
  "Puppy's First Groom",
  "✦",
  "Nail Trims",
  "✦",
  "Medford OR",
  "✦",
  "Open 7 Days",
  "✦",
  "Dog Grooming",
  "✦",
  "Self-Serve Wash",
  "✦",
  "Puppy's First Groom",
  "✦",
  "Nail Trims",
  "✦",
  "Medford OR",
  "✦",
  "Open 7 Days",
  "✦",
];

export default function HouseOfPawsPage() {
  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── CSS variables ── */}
      <div
        style={{
          ["--brand-primary" as string]: "#1e64e6",
          ["--brand-accent" as string]: "#f6e304",
          ["--brand-text" as string]: "#0f1a2e",
          ["--brand-surface" as string]: "#f5f7fc",
        }}
      />

      <Navbar
        businessName="House of Paws"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:5419732101"
      />

      {/* ══════════════════════════════════════════════════════════
          HERO — split variant with photo
      ══════════════════════════════════════════════════════════ */}
      <HeroSection
        headline="Medford's Dog Spa"
        subheadline="Where every dog gets their spa day — open 7 days a week on W Main St."
        ctaText="Book a Groom"
        ctaHref="tel:5419732101"
        secondaryCtaText="See Services"
        secondaryCtaHref="#services"
        rating={4.8}
        reviewCount={26}
        variant="split"
        foregroundImage={heroPhoto}
      />

      {/* ══════════════════════════════════════════════════════════
          MARQUEE STRIP — accent yellow band
      ══════════════════════════════════════════════════════════ */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {marqueeWords.map((word, i) => (
            <span key={i} className="marquee-word">
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          STATS — dark band
      ══════════════════════════════════════════════════════════ */}
      <div ref={statsRef}>
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          SERVICES — light section
      ══════════════════════════════════════════════════════════ */}
      <section id="services" className="section-generous dot-pattern">
        <motion.div
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="section-label-row">
            <span className="eyebrow-pill">What We Offer</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-heading-xl">
            Every Dog Deserves It
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            From full spa days to a quick nail trim — we've got your pup
            covered.
          </motion.p>
        </motion.div>
        <ServiceCards
          heading=""
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════
          ABOUT — dark section
      ══════════════════════════════════════════════════════════ */}
      <div className="dark-section-wrapper">
        <section id="about" className="section-generous">
          <div className="section-container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.span
                variants={fadeUp}
                className="eyebrow-pill eyebrow-light"
              >
                Who We Are
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="section-heading-xl text-white mt-4"
              >
                Dog People, Through &amp; Through
              </motion.h2>
            </motion.div>
          </div>
          <AboutSection
            heading=""
            story="House of Paws has been a Medford institution for over 15 years — one loyal customer has trusted the owner with every dog she's had. Whether it's a first-time puppy groom or a regular spa day for your corgi, the staff are known for being gentle, kind, and genuinely good at what they do. Stop in any day of the week at 2714 W Main St."
            image={aboutPhoto}
          />
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════════════════ */}
      <section
        id="gallery"
        className="section-generous"
        style={{ background: "var(--brand-surface)" }}
      >
        <motion.div
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="eyebrow-pill">
            Fresh From the Salon
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-heading-xl mt-4">
            Happy Pups, Happy Owners
          </motion.h2>
        </motion.div>
        <ImageGallery heading="" photos={galleryPhotos} variant="masonry" />
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS — dark section
      ══════════════════════════════════════════════════════════ */}
      <div className="dark-section-wrapper" id="reviews">
        <section className="section-generous">
          <motion.div
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="eyebrow-pill eyebrow-light"
            >
              Real Reviews
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-heading-xl text-white mt-4"
            >
              Straight From Owners
            </motion.h2>
          </motion.div>
          <TestimonialCarousel
            heading=""
            reviews={reviews}
            variant="featured"
          />
        </section>
      </div>

      {/* ══════════════════════════════════════════════════════════
          ACCENT CTA BAND
      ══════════════════════════════════════════════════════════ */}
      <div className="accent-cta-band">
        <div className="accent-cta-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="accent-cta-eyebrow">Open every day · 9 AM – 3 PM</p>
            <h2 className="accent-cta-headline">
              Your dog's spa day is one call away.
            </h2>
          </motion.div>
          <motion.a
            href="tel:5419732101"
            className="accent-cta-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            (541) 973-2101
          </motion.a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════ */}
      <section id="faq" className="section-generous">
        <motion.div
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="eyebrow-pill">
            Got Questions?
          </motion.span>
          <motion.h2 variants={fadeUp} className="section-heading-xl mt-4">
            Common Questions
          </motion.h2>
        </motion.div>
        <FAQAccordion heading="" items={faqItems} />
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════════ */}
      <div style={{ background: "var(--brand-surface)" }}>
        <ContactSection
          business={businessContact}
          heading="Find Us in Medford"
          showMap={true}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      {/* ── Sticky call button ── */}
      <ClickToCall phone="(541) 973-2101" />
    </>
  );
}
