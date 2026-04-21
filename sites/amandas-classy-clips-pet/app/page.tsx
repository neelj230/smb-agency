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
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Brand tokens ───────────────────────────────────────────────────────────
const PRIMARY = "#1B3A2D";
const ACCENT = "#004055";

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-7.webp",
  alt: "Black dog with red harness and leash standing on gravel near RV",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-9.webp",
  alt: "Pet grooming storefront with teal metal siding and signage on Main Street",
  category: "exterior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-1.webp",
    alt: "Dog standing on grooming table at pet salon with bright green background",
    category: "work",
  },
  {
    src: "/photos/photo-2.webp",
    alt: "White fluffy dog being groomed on professional grooming table at salon",
    category: "work",
  },
  {
    src: "/photos/photo-3.webp",
    alt: "Standard Poodle dog with groomed curly coat standing indoors against bright green background",
    category: "product",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Yellow Labrador posing in front of whimsical chalkboard backdrop with moon and flowers",
    category: "product",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Gray poodle standing on tiled floor in indoor workspace with equipment",
    category: "interior",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Happy brown dog sitting indoors on tile floor wearing red leash and collar",
    category: "interior",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Small dark curly-haired dog sitting on dark floor indoors looking up at camera",
    category: "interior",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Black dog with tan markings lying on gray and white bedding, looking up at camera",
    category: "interior",
  },
];

const services: Service[] = [
  {
    name: "Full Dog Groom",
    description:
      "Complete bath, breed-appropriate haircut, blow-dry, and finishing for dogs of all sizes and coat types.",
    icon: "scissors",
    image: "/photos/photo-1.webp",
  },
  {
    name: "Cat Grooming",
    description:
      "Gentle, patient grooming service for cats including bathing and coat care — even for cats who aren't fans of the process.",
    icon: "heart",
    image: "/photos/photo-2.webp",
  },
  {
    name: "Nail Trim (No Groom Required)",
    description:
      "Quick nail clipping available as a standalone service — no full groom appointment needed.",
    icon: "zap",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Anal Gland Expression",
    description:
      "Health-focused gland check and expression service, performed by attentive staff trained to spot warning signs.",
    icon: "shield",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Puppy's First Groom",
    description:
      "A calm, gentle introduction to grooming for puppies, helping them build positive associations from day one.",
    icon: "star",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Senior Dog Grooming",
    description:
      "Extra-gentle grooming care tailored to older dogs, with patient handling and attention to comfort and health.",
    icon: "clock",
    image: "/photos/photo-6.webp",
  },
];

const reviews: Review[] = [
  {
    text: "The girls here are so kind. They actually saved our shitzu life. We were told to go get her anal glands squeezed because she smelled awful & she had gangrene on the base of her tail as a puppy. She went to the vet and had it amputated the next day. We love them there.",
    author: "Trisha Horton",
    rating: 5,
    source: "google",
  },
  {
    text: "I was very impressed! Cat's are not one's to take kindly to grooming, but she was great with Rosie & Rosie actually behaved herself! Her prices are very good too!",
    author: "Ronda Bagwill",
    rating: 5,
    source: "google",
  },
  {
    text: "Been a customer off and on for years (when we've had a dog lol). I adore their service. They make sure the pets are taken care of, cleaned and treated like they matter. They are the friendliest groomers I've ever taken my dogs too. Amazing pricing for the grooms.",
    author: "Kryssi Aguiar",
    rating: 5,
    source: "google",
  },
  {
    text: "These gals really care about your dog ❤️. My guys always come home looking and smelling great! They like to go to get groomed...friendly and caring service. If they have a question, they call or text you. No guessing! 👍🏻",
    author: "Merry Tompkins",
    rating: 5,
    source: "google",
  },
  {
    text: "We've been going here for years. Absolutely Love, Love, Love them! Used to take our senior dog before her passing and now we take the new puppy here. Never have had a single poor experience. The prices are great and the care they show is even better!",
    author: "Christy Kendall",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.8, suffix: "★", label: "Average Customer Rating" },
  { value: 125, suffix: "+", label: "Five-Star Reviews" },
  { value: 10, suffix: "+", label: "Years Serving Medford Families" },
  { value: 1000, suffix: "+", label: "Happy Pets Groomed" },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you groom cats, or just dogs?",
    answer:
      "Yes — we groom cats too! One of our reviewers brought in her cat Rosie, who is notoriously difficult to groom, and she behaved beautifully. We're patient, gentle, and experienced with cats who aren't fans of the process.",
  },
  {
    question: "Can I get my dog's nails trimmed without booking a full groom?",
    answer:
      "Absolutely. We offer standalone nail trims — no full groom appointment required. It's a quick, easy service we're happy to provide.",
  },
  {
    question: "How are your prices compared to other groomers in Medford?",
    answer:
      "Our pricing is consistently called out as affordable and great value by customers across dozens of reviews. We believe quality grooming shouldn't cost a fortune.",
  },
  {
    question: "What if something looks off with my pet during the groom?",
    answer:
      "We call or text you right away. Our team pays close attention to each animal's health and has even caught serious conditions before they became emergencies — like we did for one pup with a tail infection.",
  },
];

const businessContact = {
  name: "Amanda's Classy Clips Pet",
  address: "612 E Main St",
  city: "Medford",
  state: "OR",
  zip: "97504",
  phone: "(541) 608-7017",
  email: "",
  hours: {
    Monday: "Closed",
    Tuesday: "7:00 AM – 6:00 PM",
    Wednesday: "7:00 AM – 6:00 PM",
    Thursday: "7:00 AM – 6:00 PM",
    Friday: "7:00 AM – 6:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

// ─── Decorative paw-print SVG ─────────────────────────────────────────────────
function PawAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      className={`paw-accent ${className}`}
      aria-hidden="true"
    >
      <ellipse cx="10" cy="14" rx="5" ry="7" />
      <ellipse cx="24" cy="9" rx="5" ry="7" />
      <ellipse cx="38" cy="14" rx="5" ry="7" />
      <ellipse cx="17" cy="24" rx="5" ry="7" transform="rotate(-20 17 24)" />
      <ellipse cx="31" cy="24" rx="5" ry="7" transform="rotate(20 31 24)" />
      <path d="M24 22c-8 0-14 6-11 14 2 5 7 8 11 8s9-3 11-8c3-8-3-14-11-14z" />
    </svg>
  );
}

// ─── Tagline banner between hero and services ─────────────────────────────────
function TaglineBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const words = ["Where", "every", "pup", "leaves", "loved."];

  return (
    <div ref={ref} className="tagline-banner" style={{ background: PRIMARY }}>
      {/* Decorative paws */}
      <PawAccent className="tagline-paw tagline-paw--left" />
      <PawAccent className="tagline-paw tagline-paw--right" />

      <div className="tagline-inner">
        <div className="tagline-rule" />
        <motion.p
          className="tagline-text"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              className={
                i === 4 ? "tagline-word tagline-word--script" : "tagline-word"
              }
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.12,
                ease: "easeOut",
              }}
            >
              {w}{" "}
            </motion.span>
          ))}
        </motion.p>
        <div className="tagline-rule" />
      </div>
    </div>
  );
}

// ─── Floating label strip (scrolling) ────────────────────────────────────────
function ScrollingLabel() {
  const items = [
    "Medford, OR",
    "✦ Dog Grooming",
    "✦ Cat Grooming",
    "✦ Nail Trims",
    "✦ Senior Pets",
    "✦ First Grooms",
    "✦ 4.8 Stars",
    "✦ 10+ Years",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="scroll-strip" style={{ background: ACCENT }}>
      <motion.div
        className="scroll-strip-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="scroll-strip-item">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Global brand tokens */}

      <Navbar
        businessName="Amanda's Classy Clips Pet"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+15416087017"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="Classy Clips, Medford"
        subheadline="10+ years of gentle, caring grooming for dogs and cats in Medford, OR."
        ctaText="Call to Book"
        ctaHref="tel:+15416087017"
        secondaryCtaText="See Our Work"
        secondaryCtaHref="#gallery"
        rating={4.8}
        reviewCount={125}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── SCROLLING LABEL STRIP ── */}
      <ScrollingLabel />

      {/* ── TAGLINE BANNER ── */}
      <TaglineBanner />

      {/* ── SERVICES ── */}
      <section id="services" className="section-pad dot-pattern-section">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ServiceCards
            heading="What We Offer"
            subheading="From first grooms to senior care — every pet gets the attention they deserve."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>
      </section>

      {/* ── STATS (dark) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <StatsCounter stats={stats} variant="dark" />
      </motion.div>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <AboutSection
            heading="On Main Street Since Day One"
            story="Amanda's Classy Clips has been a fixture at 612 E Main St in Medford for over a decade. Customers drive across town because they know their pets are actually seen here — the team has caught serious health issues other groomers missed, including a tail infection that saved one pup's life. This isn't a chain. It's a place that calls you when something's off."
            image={aboutPhoto}
          />
        </motion.div>
      </section>

      {/* ── GALLERY ── */}
      <section
        id="gallery"
        className="section-pad-tight"
        style={{ background: "#f7f4f0" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ImageGallery
            heading="Fresh Cuts Gallery"
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.div>
      </section>

      {/* ── REVIEWS ── */}
      <section
        id="reviews"
        className="section-pad"
        style={{ background: PRIMARY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <TestimonialCarousel
            heading="From Their Owners"
            reviews={reviews}
            variant="scroll"
          />
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section-pad dot-pattern-section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <FAQAccordion heading="Quick Answers" items={faqItems} />
        </motion.div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="section-pad"
        style={{ background: "#f7f4f0" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ContactSection
            business={businessContact}
            heading="Find Us"
            showMap={true}
          />
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <Footer business={businessContact} links={navLinks} socialLinks={{}} />

      {/* ── CLICK TO CALL FAB ── */}
      <ClickToCall phone="(541) 608-7017" />
    </>
  );
}
