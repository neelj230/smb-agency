"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCards } from "@/components/ServiceCards";
import { AboutSection } from "@/components/AboutSection";
import { StatsCounter } from "@/components/StatsCounter";
import { ImageGallery } from "@/components/ImageGallery";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import type {
  NavLink,
  Photo,
  Service,
  Stat,
  ProcessStep,
  FAQItem,
  SocialLinks,
} from "@/components/types";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Bright Landscaping photo 1",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Bright Landscaping photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "Bright Landscaping photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Bright Landscaping photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Bright Landscaping photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Bright Landscaping photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Bright Landscaping photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Bright Landscaping photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Bright Landscaping photo 9",
    category: "work",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Bright Landscaping photo 10",
    category: "work",
  },
];

const services: Service[] = [
  {
    name: "Lawn Mowing & Maintenance",
    description:
      "Regular mowing, edging, and trimming to keep your lawn looking clean and well-maintained week after week.",
    icon: "scissors",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Landscape Bed Design & Cleanup",
    description:
      "Planting, mulching, weeding, and shaping ornamental beds to create polished curb appeal.",
    icon: "flower-2",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Seasonal Cleanups",
    description:
      "Spring and fall debris removal, leaf cleanup, and property reset to prepare your yard for each season.",
    icon: "leaf",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Hardscaping & Edging",
    description:
      "Installation of clean borders, stone edging, and structured landscape features that define your outdoor space.",
    icon: "square",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Mulching & Ground Cover",
    description:
      "Fresh mulch installation across beds and tree rings to retain moisture, suppress weeds, and sharpen the look of your property.",
    icon: "layers",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Property Grading & Sodding",
    description:
      "Soil grading and sod installation to establish or restore a healthy, level lawn from the ground up.",
    icon: "mountain",
    image: "/photos/photo-8.webp",
  },
];

const stats: Stat[] = [
  { value: 7, suffix: " AM", label: "Early Start, Every Weekday" },
  { value: 5, suffix: " days", label: "Consistent Weekly Availability" },
  { value: 10, suffix: "+", label: "Portfolio Projects Documented" },
  { value: 1, label: "Focused Local Philadelphia Crew" },
];

const processSteps: ProcessStep[] = [
  {
    title: "Call for a Quote",
    description:
      "Reach us at (267) 351-5557 during business hours. We talk through your property, your goals, and give you a straight estimate — no runaround.",
  },
  {
    title: "We Show Up Early",
    description:
      "Crew arrives at your property between 7 AM and 3 PM, Monday through Friday. We work clean and thorough.",
  },
  {
    title: "Yard Transformed",
    description:
      "Before we leave, your space looks sharp. Whether it's a one-time cleanup or ongoing maintenance — we treat every job the same way.",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What areas does Bright Landscaping serve?",
    answer:
      "Bright Landscaping is based at 5604 Gainor Rd in West Philadelphia (19131) and primarily serves residential and commercial properties throughout the surrounding Philadelphia neighborhoods.",
  },
  {
    question: "What are your operating hours?",
    answer:
      "We work Monday through Friday, 7:00 AM to 3:00 PM. We are closed on weekends, so we recommend scheduling early in the week to lock in your preferred time.",
  },
  {
    question: "Do you offer one-time services or only recurring contracts?",
    answer:
      "Bright Landscaping can accommodate both one-time project work — like seasonal cleanups or mulching — and ongoing maintenance schedules. We're flexible based on what your property needs.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "The best way to get an estimate is to call us directly at (267) 351-5557 during business hours. We'll discuss your property, the scope of work, and get you a fair number fast.",
  },
];

const businessContact = {
  name: "Bright Landscaping",
  address: "5604 Gainor Rd",
  city: "Philadelphia",
  state: "PA",
  zip: "19131",
  phone: "(267) 351-5557",
  email: "",
  hours: {
    Monday: "7:00 AM – 3:00 PM",
    Tuesday: "7:00 AM – 3:00 PM",
    Wednesday: "7:00 AM – 3:00 PM",
    Thursday: "7:00 AM – 3:00 PM",
    Friday: "7:00 AM – 3:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

const socialLinks: SocialLinks = {};

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Marquee Strip ────────────────────────────────────────────────────────────

const marqueeItems = [
  "Lawn Mowing",
  "Bed Design",
  "Seasonal Cleanup",
  "Hardscaping",
  "Mulching",
  "Sodding",
  "West Philadelphia",
  "Mon–Fri 7 AM",
];

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="bright-marquee-wrapper">
      <div className="bright-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="bright-marquee-item">
            <span className="bright-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Service Highlight Band ───────────────────────────────────────────────────

function ServiceHighlight() {
  return (
    <section className="bright-highlight-band" id="services">
      <div className="bright-highlight-inner">
        <FadeUp>
          <p className="bright-highlight-eyebrow">What We Do</p>
          <h2 className="bright-highlight-heading">
            Six Services.
            <br />
            One Crew.
          </h2>
          <p className="bright-highlight-sub">
            From weekly mow to full property grading — all booked with a single
            call.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Divider Leaf ────────────────────────────────────────────────────────────

function LeafDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`bright-leaf-divider ${flip ? "bright-leaf-divider--flip" : ""}`}
    >
      <svg
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 12 Q30 0 60 12 Q90 24 120 12"
          stroke="#ace38f"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BrightLandscapingPage() {
  return (
    <>
      {/* ── CSS Variables ── */}

      <div className="bright-root">
        {/* ── Navbar ── */}
        <Navbar
          businessName="Bright Landscaping"
          links={navLinks}
          ctaText="Get a Quote"
          ctaHref="tel:+12673515557"
        />

        {/* ── Hero ── */}
        <HeroSection
          headline="West Philly's Ground Crew"
          subheadline="Your Yard, Transformed Before Noon."
          ctaText="Call for a Quote"
          ctaHref="tel:+12673515557"
          secondaryCtaText="See Our Work"
          secondaryCtaHref="#gallery"
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />

        {/* ── Marquee ── */}
        <MarqueeStrip />

        {/* ── Stats — dark band ── */}
        <div className="bright-stats-wrap">
          <FadeUp>
            <StatsCounter stats={stats} variant="dark" />
          </FadeUp>
        </div>

        {/* ── Services label + cards ── */}
        <ServiceHighlight />

        <div className="bright-services-cards">
          <FadeUp delay={0.1}>
            <ServiceCards
              heading=""
              services={services}
              columns={3}
              variant="grid"
            />
          </FadeUp>
        </div>

        <LeafDivider />

        {/* ── About ── */}
        <div className="bright-about-wrap" id="about">
          <FadeUp>
            <AboutSection
              heading="Gainor Rd Roots"
              story="Bright Landscaping operates out of 5604 Gainor Rd in West Philadelphia — a local crew focused on one city, one standard. We start every weekday at 7 AM and wrap by 3 PM, keeping schedules tight and results consistent. Call us, get a straight quote, and we'll take it from there."
              image={aboutPhoto}
            />
          </FadeUp>
        </div>

        <LeafDivider flip />

        {/* ── Gallery ── */}
        <div className="bright-gallery-wrap" id="gallery">
          <FadeUp>
            <ImageGallery
              heading="Recent Work"
              photos={galleryPhotos}
              variant="masonry"
            />
          </FadeUp>
        </div>

        {/* ── Process — dark ── */}
        <div className="bright-process-dark" id="process">
          <FadeUp>
            <ProcessSteps
              heading="How It Works"
              subheading="Three steps from call to clean yard."
              steps={processSteps}
              variant="grid"
            />
          </FadeUp>
        </div>

        {/* ── FAQ ── */}
        <div className="bright-faq-wrap" id="faq">
          <FadeUp>
            <FAQAccordion heading="Questions" items={faqItems} />
          </FadeUp>
        </div>

        {/* ── Contact ── */}
        <div className="bright-contact-wrap" id="contact">
          <FadeUp>
            <ContactSection
              business={businessContact}
              heading="Book Your Yard"
              showMap={true}
            />
          </FadeUp>
        </div>

        {/* ── Footer ── */}
        <Footer
          business={businessContact}
          links={navLinks}
          socialLinks={socialLinks}
        />

        {/* ── Click-to-Call ── */}
        <ClickToCall phone="(267) 351-5557" />
      </div>
    </>
  );
}
