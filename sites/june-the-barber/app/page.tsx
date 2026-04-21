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

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "June The Barber photo 1",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "June The Barber photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "June The Barber photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "June The Barber photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "June The Barber photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "June The Barber photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "June The Barber photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "June The Barber photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "June The Barber photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "June The Barber photo 10",
    category: "work",
  },
];

const services: Service[] = [
  {
    name: "Kids Haircut",
    description:
      "A patient, child-friendly cut tailored for boys who may be nervous about clippers or new to the barbershop experience.",
    icon: "scissors",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Men's Haircut & Style",
    description:
      "A precision cut with clean lines and personal attention, taking the time to get it exactly right without rushing.",
    icon: "user",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Shape-Up & Edge Work",
    description:
      "Crisp, defined edges that keep your look sharp and fresh for weeks after the appointment.",
    icon: "pen-tool",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Fade",
    description:
      "Seamless taper and fade cuts customized to each client's head shape and style preference.",
    icon: "layers",
    image: "/photos/photo-6.webp",
  },
  {
    name: "First-Time Cut (New Clients)",
    description:
      "An introductory appointment designed to build comfort and trust, especially for kids trying a new barber for the first time.",
    icon: "star",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Same-Day & Flexible Booking",
    description:
      "Appointment scheduling through Booksy with fast response times and flexible availability, including evenings and weekends.",
    icon: "calendar",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "June did a great job with my cut, and the response time was great as well! I will be bringing my son next week.",
    author: "Nastassja",
    rating: 5,
    source: "google",
  },
  {
    text: "Time patience and great communication and very understanding and to top it off his work of art (hair cutting) amazing his my son new barber n I love it my son came in looking a mess but wen he left he looked like they young handsome man that he is (book your appointments today)",
    author: "Rasheedah Hobson",
    rating: 5,
    source: "google",
  },
  {
    text: "Very good clean place did a very good job I scheduled my next appointment for my sons hair before he finished would highly recommend my sons hair got cut like 2 weeks ago and still looks fresh",
    author: "Brooke DeShong",
    rating: 5,
    source: "google",
  },
  {
    text: "June is very patient with my boys and he do amazing job by engaging and making sure that they are comfortable with him. He's a very talented barber stylist and I love going back to him knowing my kids trusts in him.",
    author: "Latasha Miller",
    rating: 5,
    source: "google",
  },
  {
    text: "June is definitely the truth. Excellent service, I'm looking forward to my next appointment. Took his time, and didn't rush. Great cut!",
    author: "Warren",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.9, suffix: "★", label: "Average Rating on Booksy" },
  { value: 137, suffix: "+", label: "Verified Customer Reviews" },
  { value: 100, suffix: "%", label: "5-Star Reviews in Sample" },
  { value: 7, suffix: " days", label: "Available Every Day of the Week" },
];

const faqItems: FAQItem[] = [
  {
    question: "Is June good with kids who are scared of clippers?",
    answer:
      'Absolutely. Multiple parents specifically praise June for his patience and ability to calm anxious children. As one mom shared, her son came in nervous and left looking like "the young handsome man that he is." June takes the time to build trust before picking up a single tool.',
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book directly through Booksy at juniestakz.booksy.com. June is known for fast response times after booking, so you'll hear back quickly and can get on the schedule without the runaround.",
  },
  {
    question: "How long does a cut stay looking fresh?",
    answer:
      "Customers have noted their sons' cuts still looked clean and fresh up to two weeks after the appointment — a sign of precise technique and attention to detail.",
  },
  {
    question: "Does June rush through appointments?",
    answer:
      "Not at all. Both parents and adult clients consistently highlight that June takes his time with every cut and never rushes — which is especially important for kids getting used to the barbershop.",
  },
];

const businessContact = {
  name: "June The Barber",
  address: "179 W Berks St",
  city: "Philadelphia",
  state: "PA",
  zip: "19122",
  phone: "(215) 403-6860",
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

const footerLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ─── Animated Marquee ─────────────────────────────────────────────────────────

const marqueeWords = [
  "Fresh Cuts",
  "★ 4.9 Rated",
  "Kid-Friendly",
  "No Rush",
  "Philly's Best",
  "Clean Fades",
  "Sharp Edges",
  "Open Daily",
  "Fresh Cuts",
  "★ 4.9 Rated",
  "Kid-Friendly",
  "No Rush",
  "Philly's Best",
  "Clean Fades",
  "Sharp Edges",
  "Open Daily",
];

function Marquee() {
  return (
    <div className="june-marquee-wrapper">
      <div className="june-marquee-track">
        {marqueeWords.map((word, i) => (
          <span key={i} className="june-marquee-item">
            {word}
            <span className="june-marquee-dot" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Floating Badge ───────────────────────────────────────────────────────────

function FloatingBadge() {
  return (
    <motion.div
      className="june-badge"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
    >
      <span className="june-badge-stars">★★★★★</span>
      <span className="june-badge-text">137 Reviews · Booksy</span>
    </motion.div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="june-section-label">
      <span className="june-section-label-line" />
      <span className="june-section-label-text">{children}</span>
      <span className="june-section-label-line" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* CSS Custom Properties */}
      <div style={{ display: "none" }} aria-hidden>
        <svg>
          <defs>
            <filter id="june-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="june-root">
        {/* Grain overlay */}
        <div className="june-grain-overlay" aria-hidden />

        {/* ── Navbar ── */}
        <Navbar
          businessName="June The Barber"
          links={navLinks}
          ctaText="Book Now"
          ctaHref="https://juniestakz.booksy.com"
        />

        {/* ── Hero ── */}
        <section className="june-hero-wrapper">
          <HeroSection
            headline="Fresh Cuts, Philadelphia"
            subheadline="Patient, precise, never rushed — loved by kids and adults alike."
            ctaText="Book on Booksy"
            ctaHref="https://juniestakz.booksy.com"
            secondaryCtaText="See the Work"
            secondaryCtaHref="#gallery"
            rating={4.9}
            reviewCount={137}
            variant="photo-bg"
            backgroundImage={heroPhoto}
          />
          <FloatingBadge />
        </section>

        {/* ── Marquee ── */}
        <div className="june-marquee-section">
          <Marquee />
        </div>

        {/* ── Stats — dark ── */}
        <div className="june-dark-section" ref={statsRef}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>By The Numbers</SectionLabel>
            <StatsCounter stats={stats} variant="dark" />
          </motion.div>
        </div>

        {/* ── About ── */}
        <section id="about" className="june-about-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>The Barber</SectionLabel>
            <AboutSection
              heading="Behind the Chair"
              story="June works out of 179 W Berks St in Philly — no franchise, no assembly line. Parents drive across the city because he's one of the few barbers kids actually trust. Every cut gets full attention, whether it's a first-timer scared of clippers or a regular coming back for a clean fade."
              image={aboutPhoto}
            />
          </motion.div>
        </section>

        {/* ── Services — light with brand accent ── */}
        <section id="services" className="june-services-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>What We Do</SectionLabel>
            <ServiceCards
              heading="Services"
              subheading="Every service is built around patience and precision — no rushing, no shortcuts."
              services={services}
              columns={3}
              variant="grid"
            />
          </motion.div>
        </section>

        {/* ── Testimonials — dark ── */}
        <div className="june-dark-section june-testimonials-dark">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>Real Talk</SectionLabel>
            <TestimonialCarousel
              heading="What Parents Say"
              reviews={reviews}
              variant="featured"
            />
          </motion.div>
        </div>

        {/* ── Gallery ── */}
        <section id="gallery" className="june-gallery-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>The Work</SectionLabel>
            <ImageGallery
              heading="Fresh Every Time"
              photos={galleryPhotos}
              variant="masonry"
            />
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="june-faq-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>Common Questions</SectionLabel>
            <FAQAccordion heading="Before You Book" items={faqItems} />
          </motion.div>
        </section>

        {/* ── Contact — dark ── */}
        <div id="contact" className="june-dark-section june-contact-dark">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>Find Us</SectionLabel>
            <ContactSection
              business={businessContact}
              heading="Come See June"
              showMap={true}
            />
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <Footer
          business={businessContact}
          links={footerLinks}
          socialLinks={{}}
        />

        {/* ── Click-to-Call ── */}
        <ClickToCall phone="(215) 403-6860" />
      </div>
    </>
  );
}
