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

// ─── DATA ───────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Blossom LA Nail Bar Center City photo 1",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Blossom LA Nail Bar Center City photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "Blossom LA Nail Bar Center City photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Blossom LA Nail Bar Center City photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Blossom LA Nail Bar Center City photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Blossom LA Nail Bar Center City photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Blossom LA Nail Bar Center City photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Blossom LA Nail Bar Center City photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Blossom LA Nail Bar Center City photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Blossom LA Nail Bar Center City photo 10",
    category: "work",
  },
];

const services: Service[] = [
  {
    name: "Gel Manicure",
    description:
      "Long-lasting gel color applied with care — reviewers note clean results that don't cost an arm and a leg, with strong natural nails underneath.",
    icon: "sparkles",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Gel X Extensions",
    description:
      "Full nail extensions using Gel X technique, ideal for length and custom nail art — Arielle is a client favorite for first-timers and regulars alike.",
    icon: "wand-2",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Custom Nail Art",
    description:
      "Intricate, design-forward nail art — from Lunar New Year themes to reference-photo-matched sets — executed with precision and creative input.",
    icon: "palette",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Spa Pedicure",
    description:
      "A relaxing pedicure with focused attention on rough spots others skip, paired with a massage and a thorough, calming experience.",
    icon: "heart",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Classic Manicure",
    description:
      "A clean, polished manicure with a strong selection of nail polish colors and a soothing massage component to round out your visit.",
    icon: "scissors",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Nail Strengthening Treatment",
    description:
      "Targeted care for clients with weak or damaged natural nails — Natalie's clients specifically note improved nail strength over time.",
    icon: "shield",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "I've been in twice now and had great experiences with Natalie both times. She does a great job on my nails. They look beautiful and hold up extremely well, and my natural nails were still strong underneath — which is saying a lot because I have weak nails naturally.",
    author: "sasha ashton",
    rating: 5,
    source: "google",
  },
  {
    text: "I have been getting my nails done by Blossom LA Nail Bar for the last year and a half and every visit I leave satisfied. The staff are warm and welcoming, the salon itself is clean and tidy, and the price for the gel manicure I get every time doesn't cost me an arm and a leg.",
    author: "Sal Robinson",
    rating: 5,
    source: "google",
  },
  {
    text: "Got a spa pedicure. It was good — she paid extra attention to the rough spots that others ignore and that was appreciated. Still do a good job. Great massage.",
    author: "Jen Garone",
    rating: 5,
    source: "google",
  },
  {
    text: "Arielle did such a beautiful job I'm in love! It was my first time getting Gel X and I wanted something Lunar New Year themed, she did exactly what I asked for, was precise and efficient, and gave great color recommendations. The massage at the end was lovely. There are snacks an...",
    author: "Cherie Li",
    rating: 5,
    source: "google",
  },
  {
    text: "I got my first gel extension done by Arielle and she was honestly so sweet and patient. Her technique is amazing and my nails came out exactly like the reference picture I showed her, perfect. I have never really been satisfied with other nail salons before but she is the first one.",
    author: "Ashley H.",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.5, suffix: "★", label: "Average Rating" },
  { value: 299, suffix: "+", label: "Customer Reviews" },
  { value: 1.5, suffix: "+ yrs", label: "Avg. Client Loyalty (per reviewer)" },
  { value: 7, suffix: " days", label: "Open Every Day of the Week" },
];

const faqItems: FAQItem[] = [
  {
    question: "Do I need to make an appointment or can I walk in?",
    answer:
      "Appointments are strongly recommended. The salon is popular and walk-ins are welcome, but multiple reviewers noted that booking ahead ensures you get the time slot — and the technician — you want.",
  },
  {
    question: "Can I request a specific technician like Natalie or Arielle?",
    answer:
      "Yes — and regulars highly recommend it. Both Natalie and Arielle have devoted clients who book specifically for them. If you have a preference, mention it when you book.",
  },
  {
    question:
      "What makes Blossom LA different from other nail salons in Philly?",
    answer:
      "Clients consistently highlight that the staff actually asks what you want and listens — something that sounds basic but is surprisingly rare. The combination of quality work, fair pricing, and a warm atmosphere keeps people coming back for years.",
  },
  {
    question: "Do you do custom nail art and specialty designs?",
    answer:
      "Absolutely. Arielle in particular is celebrated for executing detailed, theme-based nail art — from Lunar New Year designs to exact reference-photo matches. Bring inspiration and expect it to come to life.",
  },
];

const businessContact = {
  name: "Blossom LA Nail Bar Center City",
  address: "315 S 13th St unit a",
  city: "Philadelphia",
  state: "PA",
  zip: "19107",
  phone: "(215) 869-8718",
  email: "",
  hours: {
    Monday: "10:00 AM – 8:00 PM",
    Tuesday: "10:00 AM – 8:00 PM",
    Wednesday: "10:00 AM – 8:00 PM",
    Thursday: "10:00 AM – 8:00 PM",
    Friday: "10:00 AM – 8:00 PM",
    Saturday: "9:30 AM – 7:00 PM",
    Sunday: "10:00 AM – 6:00 PM",
  },
};

// ─── MARQUEE TICKER ──────────────────────────────────────────────────────────

const tickerItems = [
  "Gel Manicure",
  "Custom Nail Art",
  "Gel X Extensions",
  "Spa Pedicure",
  "Classic Manicure",
  "Nail Strengthening",
  "Center City Philly",
  "Open 7 Days",
];

function MarqueeTicker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="blossom-ticker-wrap">
      <div className="blossom-ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="blossom-ticker-item">
            {item}
            <span className="blossom-ticker-dot" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── FLOATING BADGE ──────────────────────────────────────────────────────────

function FloatingBadge() {
  return (
    <motion.div
      className="blossom-floating-badge"
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
    >
      <span className="blossom-badge-stars">★★★★★</span>
      <span className="blossom-badge-text">299+ Reviews</span>
      <span className="blossom-badge-sub">Google</span>
    </motion.div>
  );
}

// ─── SECTION LABEL ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="blossom-section-label">{children}</span>;
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      {/* Navbar */}
      <Navbar
        businessName="Blossom LA"
        links={navLinks}
        ctaText="Book Now"
        ctaHref="tel:+12158698718"
      />

      {/* Hero */}
      <div className="blossom-hero-wrapper">
        <HeroSection
          headline="Nails Done Right"
          subheadline="Center City's nail bar where your technician actually listens."
          ctaText="Book an Appointment"
          ctaHref="tel:+12158698718"
          secondaryCtaText="See Our Work"
          secondaryCtaHref="#gallery"
          rating={4.5}
          reviewCount={299}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
        <FloatingBadge />
      </div>

      {/* Ticker */}
      <MarqueeTicker />

      {/* Stats — dark band */}
      <div className="blossom-dark-band">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* About */}
      <motion.div
        id="about"
        className="blossom-about-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="blossom-section-label-row">
          <SectionLabel>Our Story</SectionLabel>
        </div>
        <AboutSection
          heading="A Salon That Listens"
          story="Blossom LA Nail Bar sits on S 13th Street in Center City Philadelphia, open every single day of the week. Clients like Sal have been coming back for over a year and a half — not just for the gel manicures, but because the staff is genuinely warm, the salon is spotless, and the prices are fair. Natalie and Arielle bring the kind of skill and patience that turns first-timers into regulars."
          image={aboutPhoto}
        />
      </motion.div>

      {/* Services */}
      <div id="services" className="blossom-services-wrapper">
        <motion.div
          className="blossom-section-label-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>What We Do</SectionLabel>
        </motion.div>
        <ServiceCards
          heading="Services"
          subheading="From everyday gel manicures to intricate custom nail art — we've got you covered."
          services={services}
          columns={3}
          variant="grid"
        />
      </div>

      {/* Gallery */}
      <div
        id="gallery"
        className="blossom-gallery-wrapper blossom-dark-section"
      >
        <motion.div
          className="blossom-section-label-row blossom-label-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>The Work</SectionLabel>
        </motion.div>
        <ImageGallery
          heading="Fresh Out the Chair"
          photos={galleryPhotos}
          variant="masonry"
        />
      </div>

      {/* Testimonials */}
      <div id="reviews" className="blossom-reviews-wrapper">
        <motion.div
          className="blossom-section-label-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Real Talk</SectionLabel>
        </motion.div>
        <TestimonialCarousel
          heading="Clients Agree"
          reviews={reviews}
          variant="featured"
        />
      </div>

      {/* Pull quote strip */}
      <div className="blossom-pull-quote-strip">
        <div className="blossom-pull-quote-inner">
          <span className="blossom-pull-quote-mark">"</span>
          <p className="blossom-pull-quote-text">
            Where your nails finally get it right.
          </p>
          <span className="blossom-pull-quote-mark">"</span>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="blossom-faq-wrapper">
        <motion.div
          className="blossom-section-label-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Good to Know</SectionLabel>
        </motion.div>
        <FAQAccordion heading="Questions Answered" items={faqItems} />
      </div>

      {/* Contact */}
      <div
        id="contact"
        className="blossom-contact-wrapper blossom-dark-section"
      >
        <motion.div
          className="blossom-section-label-row blossom-label-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Find Us</SectionLabel>
        </motion.div>
        <ContactSection
          business={businessContact}
          heading="Come In"
          showMap={true}
        />
      </div>

      {/* Footer */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      {/* Floating CTA */}
      <ClickToCall phone="(215) 869-8718" />
    </>
  );
}
