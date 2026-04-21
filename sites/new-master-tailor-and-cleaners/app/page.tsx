"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServiceCards } from "@/components/ServiceCards";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { StatsCounter } from "@/components/StatsCounter";
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
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "New Master tailor and cleaners photo 1",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "New Master tailor and cleaners photo 2",
  category: "interior",
};

const services: Service[] = [
  {
    name: "Jacket & Blazer Alterations",
    description:
      "Expert restructuring of high-end blazers and suit jackets, including the technically demanding shoulder-sleeve shortening that preserves the natural shoulder cap.",
    icon: "shirt",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Premium Denim Hemming & Repair",
    description:
      "Skilled hemming and alteration of selvedge and designer denim, with preservation of original hems and hardware for brands like Rag & Bone.",
    icon: "scissors",
  },
  {
    name: "Wedding Dress Preservation & Alterations",
    description:
      "Careful alteration and long-term preservation of bridal gowns, handled with the precision and respect that heirloom garments demand.",
    icon: "heart",
  },
  {
    name: "Dry Cleaning & Garment Care",
    description:
      "Professional cleaning of formal wear including tuxedos, dress shirts, and structured garments, with standard and rush turnaround options available.",
    icon: "wind",
  },
  {
    name: "Pants & Trouser Alterations",
    description:
      "Precise hemming and resizing of trousers across all fabric types, from casual to formal, completed efficiently and correctly on the first attempt.",
    icon: "rulers",
  },
  {
    name: "Garment Repair & Restoration",
    description:
      "Targeted repair work on specific garment components such as button flies, seams, and closures, with particular expertise in specialty fabrics.",
    icon: "wrench",
  },
];

const reviews: Review[] = [
  {
    text: "I went to Master Tailor and Cleaners to have the sleeves shortened by the shoulder on my Zegna blazer. The tailor did a flawless job on the alteration. No pulling on the shoulder cap, the alteration looks like it was untouched! Definitely recommend!",
    author: "Anthony Manlapas",
    rating: 5,
    source: "google",
  },
  {
    text: "They are absolutely amazing people! I dropped off my wedding dress from Kleinfelds 6 years ago, moved to another state and forgot to pick it up! My husband came back yesterday and didn't think they would still have it but … miraculously, they kept it for us in pristine condition...",
    author: "Lannie Le",
    rating: 5,
    source: "google",
  },
  {
    text: "I recently had my Rag & Bone jeans hemmed and altered at Master Tailor & Cleaner, and they truly exceeded my expectations. For years, I lived above the highly regarded G&G Cleaners in Soho, NYC, and I am very particular about my jeans.",
    author: "Bunker Blake",
    rating: 5,
    source: "google",
  },
  {
    text: "I brought my Japanese selvedge denim to repair the button fly. They're allegedly denim experts. In late November. They told me it would take 3 weeks. I came to pick up from Montgomery County. They did absolutely nothing. Wasted my time and trip to the city.",
    author: "David Goldband",
    rating: 1,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.3, suffix: "★", label: "Average Customer Rating" },
  { value: 58, suffix: "+", label: "Verified Customer Reviews" },
  { value: 6, suffix: " Days", label: "Open Every Week for Walk-Ins" },
];

const faqItems: FAQItem[] = [
  {
    question: "Can you handle alterations on high-end or designer garments?",
    answer:
      "Yes — and that's where the shop excels. Customers have brought in Zegna blazers, Rag & Bone jeans, selvedge denim, and Kleinfeld wedding gowns. The work speaks for itself.",
  },
  {
    question: "Do you preserve original hems on denim and dress pants?",
    answer:
      "Yes. Preserving the original hem is a standard part of denim alterations here — a detail that even high-end tailors sometimes skip, but one that matters to serious denim owners.",
  },
  {
    question:
      "What is the typical turnaround time for alterations or cleaning?",
    answer:
      "Turnaround varies by service and workload. Standard cleaning can take longer than a typical 48-hour laundromat, so it's best to ask when you drop off and plan accordingly.",
  },
  {
    question: "How does pricing work, and are rush fees clearly communicated?",
    answer:
      "Pricing is generally considered fair for the quality of work. However, at least one customer was charged a rush fee without being clearly informed upfront — so always ask about pricing and timeline before leaving your garment.",
  },
];

const businessContact = {
  name: "New Master tailor and cleaners",
  address: "1620 Spruce St",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 735-1499",
  email: "",
  hours: {
    Monday: "8:30 AM – 6:00 PM",
    Tuesday: "8:30 AM – 6:00 PM",
    Wednesday: "8:30 AM – 6:00 PM",
    Thursday: "8:30 AM – 6:00 PM",
    Friday: "8:30 AM – 6:00 PM",
    Saturday: "10:00 AM – 4:00 PM",
    Sunday: "Closed",
  },
};

// ─── CUSTOM COMPONENTS ───────────────────────────────────────────────────────

function ThreadDivider() {
  return (
    <div className="thread-divider" aria-hidden="true">
      <div className="thread-line" />
      <div className="thread-diamond" />
      <div className="thread-line" />
    </div>
  );
}

function MarqueeBanner() {
  const items = [
    "Zegna Blazers",
    "Rag & Bone Denim",
    "Kleinfeld Gowns",
    "Selvedge Denim",
    "Formal Wear",
    "Tuxedo Cleaning",
    "Bridal Preservation",
    "Designer Alterations",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function PullQuote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="pull-quote-section">
      <div className="pull-quote-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pull-quote-content"
        >
          <div className="pull-quote-mark">"</div>
          <blockquote className="pull-quote-text">
            They kept it for us in pristine condition — six years later.
          </blockquote>
          <cite className="pull-quote-author">— Lannie Le, Philadelphia</cite>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="pull-quote-bar"
        />
      </div>
    </section>
  );
}

function ServiceIntroBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="service-intro-block" ref={ref}>
      <motion.span
        className="service-intro-label"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        What We Do
      </motion.span>
      <motion.h2
        className="service-intro-heading"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Six Services.
        <br />
        <em>One Standard.</em>
      </motion.h2>
      <motion.p
        className="service-intro-sub"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        From a Zegna shoulder seam to a Kleinfeld hem — every garment gets the
        same obsessive attention.
      </motion.p>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      {/* ── Global font import ── */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `@import url('https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Inter:wght@300;400;500;600&display=swap');`,
        }}
      />

      {/* CSS Variables */}
      <style
        dangerouslySetInnerHTML={{
          __html: `:root {
            --brand-primary: #ff0000;
            --brand-accent: #ffaa00;
            --brand-text: #0f0f0f;
            --brand-bg: #faf9f7;
          }`,
        }}
      />

      <Navbar
        businessName="New Master Tailor"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2157351499"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="Rittenhouse's Tailoring House"
        subheadline="Zegna blazers, selvedge denim, and Kleinfeld gowns — handled right."
        ctaText="Call to Schedule"
        ctaHref="tel:2157351499"
        secondaryCtaText="Our Services"
        secondaryCtaHref="#services"
        rating={4.3}
        reviewCount={58}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── MARQUEE BAND ── */}
      <MarqueeBanner />

      {/* ── STATS (dark) ── */}
      <div id="about">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── PULL QUOTE ── */}
      <PullQuote />

      {/* ── ABOUT ── */}
      <AboutSection
        heading="About the Shop"
        story="New Master Tailor & Cleaners has been fitting Philadelphia since the Rittenhouse Square neighborhood was still figuring itself out. The work here has a reputation — customers bring in Zegna blazers and walk out like the jacket was made for them. They once held a forgotten Kleinfeld wedding gown for six years, returning it in pristine condition. That's the standard."
        image={aboutPhoto}
      />

      <ThreadDivider />

      {/* ── SERVICES ── */}
      <section id="services" className="services-section-wrapper">
        <ServiceIntroBlock />
        <ServiceCards
          heading=""
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ── TESTIMONIALS (dark) ── */}
      <div
        id="reviews"
        className="bg-[#0f0f0f] text-white"
        style={{ padding: "0" }}
      >
        <TestimonialCarousel
          heading="Real Customers"
          reviews={reviews}
          variant="featured"
        />
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="faq-wrapper">
        <FAQAccordion heading="Good Questions" items={faqItems} />
      </section>

      {/* ── CONTACT ── */}
      <div id="contact">
        <ContactSection
          business={businessContact}
          heading="Find Us"
          showMap={true}
        />
      </div>

      {/* ── FOOTER ── */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      {/* ── CLICK TO CALL ── */}
      <ClickToCall phone="(215) 735-1499" />
    </>
  );
}
