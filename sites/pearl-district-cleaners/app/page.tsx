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
import { motion } from "framer-motion";
import type {
  NavLink,
  Photo,
  Service,
  Review,
  Stat,
  FAQItem,
  SocialLinks,
} from "@/components/types";

// ── Brand tokens ─────────────────────────────────────────────
const BRAND = "#172A3A";
const ACCENT = "#73D2DE";

// ── Contact ─────────────────────────────────────────────────
const businessContact = {
  name: "Pearl District Cleaners",
  address: "1427B NW Flanders St",
  city: "Portland",
  state: "OR",
  zip: "97209",
  phone: "(503) 224-7733",
  email: "",
  hours: {
    Monday: "7:00 AM – 6:30 PM",
    Tuesday: "7:00 AM – 6:30 PM",
    Wednesday: "7:00 AM – 6:30 PM",
    Thursday: "7:00 AM – 6:30 PM",
    Friday: "7:00 AM – 6:30 PM",
    Saturday: "9:00 AM – 5:00 PM",
    Sunday: "Closed",
  },
};

// ── Nav ─────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit Us", href: "#contact" },
];

// ── Hero photo ───────────────────────────────────────────────
const heroPhoto: Photo = {
  src: "/photos/photo-3.webp",
  alt: "Pearl District Cleaners storefront and racks",
  category: "exterior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Pearl District Cleaners garment care detail",
  category: "interior",
};

// ── Services ────────────────────────────────────────────────
const services: Service[] = [
  {
    name: "Dry Cleaning",
    description:
      "Professional dry cleaning for suits, shirts, dresses, and delicate pieces with careful fabric handling and crisp press results.",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Stain Removal",
    description:
      "Detailed spot treatment for difficult stains, including older marks on expensive fabrics and businesswear.",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Alterations",
    description:
      "Neighborhood sewing and fitting adjustments, from hemming and repairs to precise garment resizing.",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Wash and Fold",
    description:
      "Laundry wash-and-fold handling for everyday items, cleaned, folded, and returned ready to use.",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Pressing",
    description:
      "Fresh, pressed garments that are crisp for work, travel, and events.",
    image: "/photos/photo-8.webp",
  },
  {
    name: "Garment Repairs",
    description:
      "Repair and restore pieces so favorite garments stay in rotation longer.",
    image: "/photos/photo-9.webp",
  },
];

// ── Reviews ────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "Very impressed by these cleaners. I had a velvet light grey YSL suit with stains from years ago on it after partying a little too hard. I took it to another dry cleaner and they could not get it out. I then took it here and they got it all the way out.",
    author: "BestProsInTown reviewer",
    rating: 5,
    source: "google",
  },
  {
    text: "I had a great experience with this dry cleaning service. The staff was friendly and professional, and they handled my clothes with care. Everything came back looking fresh, spotless, and perfectly pressed. The service was quick and dependable.",
    author: "BestProsInTown reviewer",
    rating: 5,
    source: "google",
  },
  {
    text: "I had stained my Canali suit pants with a vinyl protectant while stepping out of a car. PDC was able to remove the two quarter-sized stains completely two days later. Friendly customer service and very reasonable prices.",
    author: "BestProsInTown reviewer",
    rating: 5,
    source: "google",
  },
];

// ── Stats ───────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 57, suffix: "+", label: "Listed Reviews" },
  { value: 4.6, suffix: "★", label: "Average Rating" },
  { value: 17, suffix: " Photos", label: "Online Listings" },
  { value: 6, suffix: " days", label: "Open Every Week" },
];

// ── Gallery ────────────────────────────────────────────────
const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "Pressed garments at Pearl District Cleaners",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Cleaning workspace at Pearl District Cleaners",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Garment care process",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Dry cleaned clothing in preparation",
    category: "product",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Store interior",
    category: "interior",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Customer service area",
    category: "interior",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Cleaned garments ready to fold",
    category: "product",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Laundry service in progress",
    category: "work",
  },
];

// ── FAQ ────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: "Where is Pearl District Cleaners located?",
    answer: "Pearl District Cleaners is located at 1427B NW Flanders St, Portland, OR 97209.",
  },
  {
    question: "What services are available?",
    answer:
      "The listing highlights dry cleaning and tailoring/alteration, with available services including wash-and-fold, stain removal, pressing, and garment repair.",
  },
  {
    question: "How can I contact the shop?",
    answer:
      "Call directly at (503) 224-7733. They’re also available for in-person drop-off and pickup at their Pearl District location.",
  },
  {
    question: "What are the business hours?",
    answer:
      "Pearl District Cleaners is open Monday through Friday 7:00 AM–6:30 PM, Saturday 9:00 AM–5:00 PM, and closed on Sundays.",
  },
];

// ── Social ────────────────────────────────────────────────
const socialLinks: SocialLinks = {
  instagram: "https://www.instagram.com/pearldistrictdrycleaners/",
};

const footerLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit Us", href: "#contact" },
];

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
      <div
        style={{
          "--brand-primary": BRAND,
          "--brand-accent": ACCENT,
        } as React.CSSProperties}
      >
        <Navbar
          businessName="Pearl District Cleaners"
          links={navLinks}
          ctaText="Call Now"
          ctaHref="tel:+15032247333"
          variant="light"
        />

        <HeroSection
          headline="Pearl District Cleaners"
          subheadline="Friendly, fast garment care in Portland's Pearl District."
          ctaText="Call (503) 224-7733"
          ctaHref="tel:+15032247333"
          secondaryCtaText="See Our Work"
          secondaryCtaHref="#gallery"
          rating={4.6}
          reviewCount={57}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />

        <motion.div
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="pb-16"
        >
          <AboutSection
            heading="About Pearl District Cleaners"
            story="Pearl District Cleaners serves the neighborhood with dependable dry cleaning, alterations, and garment care. Customers regularly mention fresh, spotless results and friendly, professional handling. The team balances careful craftsmanship with practical service windows, making it easy for Pearl District professionals and residents to drop items off during the week."
            image={aboutPhoto}
          />
        </motion.div>

        <StatsCounter heading="Pearl District by the Numbers" stats={stats} variant="dark" />

        <motion.section
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ServiceCards
            heading="Services"
            subheading="Careful treatment for everything from daily wear to your finest garments."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.section>

        <motion.section id="gallery" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <ImageGallery
            heading="Our Work"
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.section>

        <motion.section id="reviews" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <TestimonialCarousel
            heading="What Customers Say"
            reviews={reviews}
            variant="featured"
          />
        </motion.section>

        <motion.section id="faq" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <FAQAccordion heading="Questions" items={faqItems} />
        </motion.section>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <ContactSection
            business={businessContact}
            heading="Visit Us"
            showMap={true}
          />
        </motion.div>

        <Footer business={businessContact} links={footerLinks} socialLinks={socialLinks} />

        <ClickToCall phone="(503) 224-7733" />
      </div>
    </>
  );
}
