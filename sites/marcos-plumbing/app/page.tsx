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

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BRAND_BLUE = "#156cc2";
const BRAND_GREEN = "#0ea158";

// ─── Data ────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/team-group.webp",
  alt: "Marco and his crew standing in front of the shop",
  category: "team",
};

const aboutPhoto: Photo = {
  src: "/photos/marco-portrait.webp",
  alt: "Marco Benedetti, owner and master plumber",
  category: "team",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/bathroom-remodel-1.webp",
    alt: "Completed bathroom remodel with subway tile and rainfall shower",
    category: "work",
  },
  {
    src: "/photos/bathroom-remodel-2.webp",
    alt: "Before and after of a full bathroom renovation",
    category: "work",
  },
  {
    src: "/photos/water-heater-install.webp",
    alt: "New Bradford White water heater installation in basement",
    category: "work",
  },
  {
    src: "/photos/drain-camera.webp",
    alt: "Sewer camera inspection in progress",
    category: "work",
  },
  {
    src: "/photos/boiler-service.webp",
    alt: "Boiler maintenance and repair service",
    category: "work",
  },
  {
    src: "/photos/interior-shop.webp",
    alt: "Inside the Marco's Plumbing shop and parts inventory",
    category: "interior",
  },
];

const services: Service[] = [
  {
    name: "Emergency Plumbing",
    description:
      "24/7 emergency service for burst pipes, major leaks, sewer backups, and no-heat calls. We guarantee a 60-minute response time anywhere in Philadelphia.",
    icon: "alert-triangle",
    image: "/photos/bathroom-remodel-1.webp",
  },
  {
    name: "Drain Cleaning",
    description:
      "Camera inspection and hydro-jetting for stubborn clogs. Kitchen drains, bathroom drains, main sewer lines. We find the problem before we fix it.",
    icon: "droplets",
    image: "/photos/bathroom-remodel-2.webp",
  },
  {
    name: "Water Heater Installation",
    description:
      "Tank and tankless water heater installation and repair. We carry Bradford White and Rinnai — the best in the business. Free estimates on all installations.",
    icon: "flame",
    image: "/photos/water-heater-install.webp",
  },
  {
    name: "Bathroom Remodeling",
    description:
      "Full bathroom renovations from demo to tile. We handle the plumbing, coordinate with electricians and tile setters, and manage the whole project so you don't have to.",
    icon: "bath",
    image: "/photos/drain-camera.webp",
  },
  {
    name: "Sewer Line Repair",
    description:
      "Trenchless sewer repair and replacement. We fix collapsed, cracked, and root-damaged sewer lines without destroying your yard. Camera inspection included.",
    icon: "construction",
    image: "/photos/boiler-service.webp",
  },
  {
    name: "Heating & Boiler Service",
    description:
      "Boiler installation, repair, and annual maintenance. Radiator bleeding, zone valve replacement, circulator pump service. Keep your Philly row home warm all winter.",
    icon: "thermometer",
    image: "/photos/interior-shop.webp",
  },
];

const reviews: Review[] = [
  {
    text: "Marco's crew came out on a Sunday night when our basement was flooding. They had it fixed in two hours. Can't say enough good things about these guys. Professional, honest, and they didn't gouge us on the emergency rate.",
    author: "Jennifer M.",
    rating: 5,
    source: "google",
  },
  {
    text: "We've used Marco's for everything in our row home — new water heater, bathroom remodel, annual boiler tune-up. They treat every job like it's for their own family. Marco actually called me a week after the install to make sure everything was working right.",
    author: "Anthony D.",
    rating: 5,
    source: "google",
  },
  {
    text: "Finally a plumber who shows up when they say they will. Nick from Marco's was here at 8am sharp, diagnosed the issue in 10 minutes, explained everything clearly, and had it fixed before lunch. Fair price too. Our go-to from now on.",
    author: "Sarah K.",
    rating: 5,
    source: "google",
  },
  {
    text: "Had three different plumbers give us quotes for a bathroom remodel. Marco's was the middle price but the most detailed — they walked us through every step. The finished bathroom looks incredible. Worth every penny.",
    author: "Mike & Lisa R.",
    rating: 5,
    source: "google",
  },
  {
    text: "Our 90-year-old row home has some gnarly old pipes. Marco himself came out, did the camera inspection, and gave us an honest assessment — told us which pipes needed replacing now and which could wait. Didn't try to upsell us on work we didn't need.",
    author: "David H.",
    rating: 5,
    source: "yelp",
  },
  {
    text: "Used them for a kitchen drain that three other plumbers couldn't fix. Marco's team used hydro-jetting and cleared it in 30 minutes. Should have called them first. They even cleaned up the mess the previous guys left.",
    author: "Rosa C.",
    rating: 5,
    source: "yelp",
  },
  {
    text: "Marco's installed our new tankless water heater. The difference is night and day — endless hot water and our gas bill dropped 30%. They handled the permit and inspection too. These guys know what they're doing.",
    author: "Christine L.",
    rating: 5,
    source: "google",
  },
  {
    text: "Great service overall. Replaced our water heater quickly. Only reason for 4 stars is the initial scheduling took a few days, but once they were here the work was perfect.",
    author: "Tom B.",
    rating: 4,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 26, suffix: "+", label: "Years in Business" },
  { value: 5000, suffix: "+", label: "Jobs Completed" },
  { value: 60, suffix: " min", label: "Minute Response Time" },
  { value: 4.8, prefix: "★ ", label: "Google Rating" },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you offer 24/7 emergency service?",
    answer:
      "Yes. Call our main number any time — nights, weekends, holidays. We guarantee a plumber at your door within 60 minutes anywhere in Philadelphia.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. Marco holds a PA Master Plumber License (#MP-032841) and we carry $2M in liability insurance. All of our plumbers are fully licensed and background-checked.",
  },
  {
    question: "Do you give free estimates?",
    answer:
      "Yes, for all non-emergency work. We'll come out, assess the job, and give you a detailed written estimate before any work begins. No surprises.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "All of Philadelphia plus the close-in suburbs — Bala Cynwyd, Cheltenham, Darby, Yeadon, Upper Darby, and Drexel Hill. If you're not sure, just call us.",
  },
];

const socialLinks: SocialLinks = {
  facebook: "https://facebook.com/marcosplumbingphilly",
  instagram: "https://instagram.com/marcosplumbing",
  yelp: "https://yelp.com/biz/marcos-plumbing-and-heating-philadelphia",
};

const businessContact = {
  name: "Marco's Plumbing & Heating",
  address: "2847 S Broad St",
  city: "Philadelphia",
  state: "PA",
  zip: "19148",
  phone: "(215) 555-0142",
  email: "info@marcosplumbing.com",
  hours: {
    Monday: "7:00 AM – 6:00 PM",
    Tuesday: "7:00 AM – 6:00 PM",
    Wednesday: "7:00 AM – 6:00 PM",
    Thursday: "7:00 AM – 6:00 PM",
    Friday: "7:00 AM – 6:00 PM",
    Saturday: "8:00 AM – 2:00 PM",
    Sunday: "Emergency Only",
  },
};

const footerLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ─── Trust Bar data ───────────────────────────────────────────────────────────
const trustItems = [
  "PA Master Plumber #MP-032841",
  "$2M Liability Insurance",
  "60-Minute Emergency Response",
  "Free Written Estimates",
  "South Philly Since 1998",
  "Bradford White & Rinnai Certified",
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MarcoPlumbingPage() {
  const trustRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Global font imports via next/head alternative: inline in layout, but here we use a style tag workaround via className */}
      <div
        className="marcos-page"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        {/* ── Navbar ── */}
        <Navbar
          businessName="Marco's Plumbing & Heating"
          links={navLinks}
          ctaText="Call Now"
          ctaHref="tel:+12155550142"
        />

        {/* ── Hero ── */}
        <section id="home">
          <HeroSection
            headline="South Philly's Plumber"
            subheadline="Since 1998. Master licensed, fully insured, and at your door in 60 minutes."
            ctaText="Call (215) 555-0142"
            ctaHref="tel:+12155550142"
            secondaryCtaText="Free Estimate"
            secondaryCtaHref="#contact"
            rating={4.8}
            reviewCount={127}
            variant="photo-bg"
            backgroundImage={heroPhoto}
          />
        </section>

        {/* ── Scrolling Trust Bar ── */}
        <div
          className="trust-bar-wrapper"
          style={{
            background: BRAND_BLUE,
            overflow: "hidden",
            padding: "0.85rem 0",
          }}
        >
          <div className="trust-bar-track">
            {[...trustItems, ...trustItems].map((item, i) => (
              <span
                key={i}
                className="trust-bar-item"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <span className="trust-bar-dot" style={{ color: BRAND_GREEN }}>
                  ◆
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{ background: "#0f1923" }}>
          <StatsCounter stats={stats} variant="dark" />
        </div>

        {/* ── Services ── */}
        <section
          id="services"
          style={{
            background: "#f7f8fa",
            padding: "5rem 0",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ServiceCards
              heading="What We Fix"
              subheading="From a dripping faucet to a full bathroom renovation — we handle it all."
              services={services}
              columns={3}
              variant="grid"
            />
          </motion.div>
        </section>

        {/* ── About ── */}
        <section
          id="about"
          style={{
            background: "#fff",
            padding: "5rem 0",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AboutSection
              heading="Marco Benedetti, Owner"
              story="Marco started this company out of a van in South Philly in 1998. Today the team handles everything from leaky faucets to full sewer replacements — same philosophy as day one: show up on time, do it right, and don't charge for work that isn't needed. Over 5,000 jobs later, most of the business still comes from neighbors referring neighbors."
              image={aboutPhoto}
            />
          </motion.div>
        </section>

        {/* ── Divider accent ── */}
        <div
          style={{
            height: 4,
            background: `linear-gradient(90deg, ${BRAND_BLUE} 0%, ${BRAND_GREEN} 100%)`,
          }}
        />

        {/* ── Gallery ── */}
        <section
          id="gallery"
          style={{
            background: "#0f1923",
            padding: "5rem 0",
            ["--brand-text" as never]: "#ffffff",
            ["--brand-muted" as never]: "rgba(255,255,255,0.7)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              <span
                className="gallery-eyebrow"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: BRAND_GREEN,
                }}
              >
                The Work
              </span>
            </div>
            <ImageGallery
              heading="Recent Jobs"
              photos={galleryPhotos}
              variant="masonry"
            />
          </motion.div>
        </section>

        {/* ── Testimonials ── */}
        <section
          id="reviews"
          style={{ background: "#f7f8fa", padding: "5rem 0" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TestimonialCarousel
              heading="127 Five-Star Reviews"
              reviews={reviews}
              variant="grid"
            />
          </motion.div>
        </section>

        {/* ── Emergency CTA Banner ── */}
        <div
          className="emergency-banner dot-pattern"
          style={{
            background: BRAND_BLUE,
            padding: "4.5rem 1.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative pipe graphic */}
          <div className="pipe-deco pipe-deco--left" aria-hidden="true" />
          <div className="pipe-deco pipe-deco--right" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                marginBottom: "0.75rem",
              }}
            >
              24 / 7 Emergency Service
            </p>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
                maxWidth: 640,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Pipe burst? Basement flooding?
              <br />
              <span style={{ color: BRAND_GREEN }}>Call us right now.</span>
            </h2>
            <p
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.1rem",
                marginBottom: "2rem",
                maxWidth: 480,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              We're in South Philly. We'll be there in 60 minutes — nights,
              weekends, and holidays.
            </p>
            <a
              href="tel:+12155550142"
              className="emergency-btn"
              style={{
                display: "inline-block",
                background: "#fff",
                color: BRAND_BLUE,
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                padding: "1rem 2.5rem",
                borderRadius: 6,
                textDecoration: "none",
                letterSpacing: "0.02em",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              (215) 555-0142
            </a>
          </motion.div>
        </div>

        {/* ── FAQ ── */}
        <section id="faq" style={{ background: "#fff", padding: "5rem 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FAQAccordion heading="Common Questions" items={faqItems} />
          </motion.div>
        </section>

        {/* ── Contact ── */}
        <section
          id="contact"
          style={{ background: "#f7f8fa", padding: "5rem 0" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactSection
              business={businessContact}
              heading="Get In Touch"
              showMap={true}
            />
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <Footer
          business={businessContact}
          links={footerLinks}
          socialLinks={socialLinks}
        />

        {/* ── Sticky Click-to-Call ── */}
        <ClickToCall phone="(215) 555-0142" />
      </div>
    </>
  );
}
