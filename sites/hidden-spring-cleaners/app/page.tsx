"use client";

import { AboutSection } from "@/components/AboutSection";
import { ClickToCall } from "@/components/ClickToCall";
import { ContactSection } from "@/components/ContactSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { Navbar } from "@/components/Navbar";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ServiceCards } from "@/components/ServiceCards";
import { StatsCounter } from "@/components/StatsCounter";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { motion } from "framer-motion";
import type {
  FAQItem,
  NavLink,
  Photo,
  ProcessStep,
  Review,
  Service,
  Stat,
} from "@/components/types";

const BRAND = "#1d3d38";
const ACCENT = "#d7a952";

const businessContact = {
  name: "Hidden Spring Cleaners",
  address: "19383 Willamette Dr",
  city: "West Linn",
  state: "OR",
  zip: "97068",
  phone: "(503) 635-1112",
  email: "",
  hours: {
    Monday: "9:00 AM – 6:30 PM",
    Tuesday: "9:00 AM – 6:30 PM",
    Wednesday: "9:00 AM – 6:30 PM",
    Thursday: "9:00 AM – 6:30 PM",
    Friday: "9:00 AM – 6:30 PM",
    Saturday: "9:00 AM – 4:00 PM",
    Sunday: "Closed",
  },
};

const navLinks: NavLink[] = [
  { label: "Care", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Hidden Spring Cleaners in West Linn",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Hidden Spring Cleaners garment-care shop",
  category: "interior",
};

const services: Service[] = [
  {
    name: "Dry Cleaning",
    description:
      "Careful cleaning for everyday garments and pieces that need thoughtful fabric handling.",
    image: "/photos/photo-1.webp",
  },
  {
    name: "Stain Care",
    description:
      "Recent customers specifically mention difficult stains being removed without harming the fabric.",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Mending",
    description:
      "Bring in clothing that needs a repair or adjustment alongside its cleaning.",
    image: "/photos/photo-4.webp",
  },
];

const steps: ProcessStep[] = [
  {
    title: "Bring it in",
    description:
      "Stop by the West Linn Retail Center with the pieces you would like cared for.",
  },
  {
    title: "Tell us more",
    description:
      "Point out stains, fabric concerns, or a needed repair when you drop off your garments.",
  },
  {
    title: "Pick up fresh",
    description:
      "Collect your cleaned, pressed, or mended items when your order is ready.",
  },
];

const reviews: Review[] = [
  {
    text: "Excellent dry cleaning service with consistent quality and care. My clothes always come back fresh, clean, and perfectly ironed. Even tough stains are removed without harming the fabric.",
    author: "Joan Swanson",
    rating: 5,
    source: "google",
  },
  {
    text: "I brought in a valuable beaded silk blouse with decorative stitching and another blouse that needed mending. The charge was $31. I paid a small tip because the job was so well done on a difficult task.",
    author: "Jennifer Phillips",
    rating: 5,
    source: "google",
  },
  {
    text: "Family owned small business, I highly recommend them!",
    author: "Google reviewer",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.7, suffix: "★", label: "Google rating" },
  { value: 25, suffix: "", label: "Google reviews" },
  { value: 6, suffix: " days", label: "Open weekly" },
];

const faqItems: FAQItem[] = [
  {
    question: "Where are you located?",
    answer:
      "Hidden Spring Cleaners is at 19383 Willamette Dr in the West Linn Retail Center, West Linn, OR 97068.",
  },
  {
    question: "What can I bring in?",
    answer:
      "Bring in the garments you would like us to dry clean, press, spot-treat, or mend. Let us know about stains, fabric concerns, or repairs when you drop them off.",
  },
  {
    question: "When are you open?",
    answer:
      "Hours are Monday through Friday from 9:00 AM to 6:30 PM, Saturday from 9:00 AM to 4:00 PM, and closed Sunday.",
  },
  {
    question: "How do I reach the shop?",
    answer: "Call Hidden Spring Cleaners at (503) 635-1112.",
  },
];

const footerLinks: NavLink[] = [
  { label: "Care", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Page() {
  return (
    <div
      style={
        {
          "--brand-primary": BRAND,
          "--brand-accent": ACCENT,
        } as React.CSSProperties
      }
    >
      <Navbar
        businessName="Hidden Spring Cleaners"
        links={navLinks}
        ctaText="Call the shop"
        ctaHref="tel:+15036351112"
        variant="light"
      />

      <HeroSection
        headline="Garment care, done right"
        subheadline="A West Linn dry cleaner for clean, pressed, and carefully handled clothing."
        ctaText="Call (503) 635-1112"
        ctaHref="tel:+15036351112"
        secondaryCtaText="Plan your visit"
        secondaryCtaHref="#contact"
        rating={4.7}
        reviewCount={25}
        variant="blurred-reveal"
        backgroundImage={heroPhoto}
      />

      <div className="hs-ticker" aria-label="Services">
        <MarqueeTicker
          items={["Dry cleaning", "Stain care", "Mending", "Pressing", "West Linn"]}
          separator="✦"
          speed={28}
          variant="bold"
        />
      </div>

      <motion.div
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="hs-about"
      >
        <AboutSection
          heading="Care that shows"
          story="Hidden Spring Cleaners is a family-owned West Linn dry cleaner at the West Linn Retail Center. Recent customers call out consistent quality, careful fabric treatment, and professionally ironed garments. One customer brought in a beaded silk blouse and a mending job, and said the difficult work was done well."
          image={aboutPhoto}
        />
      </motion.div>

      <StatsCounter heading="Local, highly rated" stats={stats} variant="dark" />

      <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="hs-services"
      >
        <ServiceCards
          heading="What we handle"
          subheading="Bring in garments that need careful cleaning, stain attention, or a small repair."
          services={services}
          columns={3}
          variant="grid"
        />
      </motion.section>

      <motion.section
        id="process"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="hs-process"
      >
        <ProcessSteps
          heading="Simple by design"
          subheading="A straightforward neighborhood drop-off and pickup experience."
          steps={steps}
          variant="timeline"
        />
      </motion.section>

      <motion.section
        id="reviews"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="hs-reviews"
      >
        <TestimonialCarousel heading="From the neighborhood" reviews={reviews} variant="featured" />
      </motion.section>

      <motion.section
        id="questions"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <FAQAccordion heading="Before you visit" items={faqItems} />
      </motion.section>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ContactSection business={businessContact} heading="Find the shop" showMap />
      </motion.div>

      <Footer business={businessContact} links={footerLinks} socialLinks={{}} />
      <ClickToCall phone="(503) 635-1112" />
    </div>
  );
}
