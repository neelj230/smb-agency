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

// ─── NAV ───────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ─── PHOTOS ────────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: "/photos/photo-4.webp",
  alt: "Groomed Standard Poodle standing on table at professional dog grooming salon",
  category: "work",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-5.webp",
  alt: "Black and white cat with yellow eyes sitting on beige rug indoors",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-1.webp",
    alt: "Apricot poodle wearing skeleton-patterned bandana in indoor setting",
    category: "product",
  },
  {
    src: "/photos/photo-2.webp",
    alt: "White fluffy dog wearing colorful toy collar held by man indoors",
    category: "product",
  },
  {
    src: "/photos/photo-3.webp",
    alt: "Small white Shih Tzu dog wearing purple and green collar bow, looking upward",
    category: "product",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Cream-colored Goldendoodle lying on dark speckled floor against beige wall",
    category: "interior",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Persian cat with white and gray fur sitting in car seat",
    category: "product",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Adorable Shih Tzu puppy wearing gray and white scarf, smiling at camera",
    category: "product",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Black and white cat lying on teal patterned bedding, looking at camera",
    category: "product",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "White fluffy dog with red heart tag sitting by window indoors",
    category: "interior",
  },
];

// ─── SERVICES ──────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: "Full Groom & Style",
    description:
      "Complete bath, blow-dry, breed-appropriate trim, and finishing touches that leave your dog looking their absolute best.",
    icon: "scissors",
    image: "/photos/photo-1.webp",
  },
  {
    name: "Nail Trim & Dew Claw Care",
    description:
      "Precise nail trimming including dew claws, handled with calm technique that even the most resistant dogs tolerate.",
    icon: "pointer",
    image: "/photos/photo-2.webp",
  },
  {
    name: "Anal Gland Expression",
    description:
      "Professional anal gland relief performed safely and efficiently as a standalone or add-on service.",
    icon: "heart-pulse",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Cat Grooming & Bathing",
    description:
      "Full grooming services for cats including baths, blow-dry, and coat care — including multi-bath sessions for long or heavily-coated breeds.",
    icon: "cat",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Bath & Brush-Out",
    description:
      "Deep cleansing bath, ear cleaning, and thorough brush-out to detangle and refresh your dog's coat between full grooms.",
    icon: "sparkles",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Walk-In Nail & Quick Services",
    description:
      "Fast, no-fuss walk-in nail trims and minor grooming needs completed while you wait — no appointment required.",
    icon: "zap",
    image: "/photos/photo-8.webp",
  },
];

// ─── REVIEWS ───────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: 'List is like your little hole in the wall "café" but for your dog grooming need! The owner is so welcoming and inviting on top of being an expert at what she does. I was a walk-in customer and she stopped what she was doing to do my teacup chihuahua nails in a matter of mins.',
    author: "Dawn Robinson",
    rating: 5,
    source: "google",
  },
  {
    text: "We have been to ☘️ lucky dog ☘️ a few times and they are efficient, welcoming and have great communication. Our dog RJ (Rick James) is a stinky beast sometimes and after his grooming appointment he always looks like a doggie prince. 👑 Thank you Courtney and team for dealing with...",
    author: "Selisha brunner",
    rating: 5,
    source: "google",
  },
  {
    text: "Courtney bathed my big fluffy kitty, she even had to give her two separate baths. She did such a great job, I'll definitely be recommending them to peers & coming back in the future.",
    author: "Erica C",
    rating: 5,
    source: "google",
  },
  {
    text: "Courtney took such good care of our little girl. She usually hates being groomed, but everytime she has gone she has had no problems! And looks fabulous!!",
    author: "Jessica Morton",
    rating: 5,
    source: "google",
  },
  {
    text: "I have 3 babies (small, medium and Ex-large). I take them in regularly to see Kendra for nails, wash, and a trim. My babies love coming in to see her. We've gone elsewhere in the past and my babies made it clear they didn't like going there (they would act up when I dropped them ...",
    author: "Mia Tilton",
    rating: 5,
    source: "google",
  },
];

// ─── STATS ─────────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.5, suffix: "★", label: "Average Customer Rating" },
  { value: 168, suffix: "+", label: "Verified Reviews" },
  { value: 2, suffix: " species", label: "Dogs & Cats Both Welcome" },
  { value: 5, suffix: " days", label: "Open Monday Through Friday" },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question:
      "My dog hates being groomed and gets really anxious. Can you help?",
    answer:
      "Yes — this is actually one of Lucky Dog's strongest suits. Multiple customers report that dogs who shook, barked, or fought at other salons come here calm and leave happy. The team works at a pace that keeps your pet comfortable.",
  },
  {
    question: "Do you groom cats as well as dogs?",
    answer:
      "Absolutely. Lucky Dog is one of the few salons in the area that grooms cats, including long-haired and heavily-coated breeds that need multiple baths. If your cat needs grooming, they can handle it.",
  },
  {
    question: "Do you accept walk-ins?",
    answer:
      "Yes, walk-ins are welcome when the schedule allows. One customer walked in with a teacup chihuahua needing a nail trim and was taken care of right away. Call ahead if you want to confirm availability.",
  },
  {
    question: "How are your prices compared to other groomers?",
    answer:
      "Lucky Dog is consistently described as affordable by customers, especially given the quality of work. Customers with multiple pets or larger breeds find the pricing fair and worth every penny.",
  },
];

// ─── CONTACT ───────────────────────────────────────────────────────────────────
const businessContact = {
  name: "Lucky Dog Pet Salon",
  address: "622 Crater Lake Ave",
  city: "Medford",
  state: "OR",
  zip: "97504",
  phone: "(541) 245-2949",
  email: "",
  hours: {
    Monday: "9:00 AM – 5:00 PM",
    Tuesday: "9:00 AM – 5:00 PM",
    Wednesday: "9:00 AM – 5:00 PM",
    Thursday: "9:00 AM – 5:00 PM",
    Friday: "9:00 AM – 5:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

const socialLinks: SocialLinks = {};

const footerLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function LuckyDogPage() {
  return (
    <>
      {/* ── Global CSS Variables ── */}
      <div
        style={{
          ["--brand-primary" as string]: "#1B3A2D",
          ["--brand-accent" as string]: "#004055",
          ["--brand-text" as string]: "#1B3A2D",
        }}
      />

      <Navbar
        businessName="Lucky Dog Pet Salon"
        links={navLinks}
        ctaText="Call to Book"
        ctaHref="tel:+15412452949"
      />

      {/* ── HERO ── */}
      <HeroSection
        headline="Stinky Beasts Leave Royal"
        subheadline="Medford's friendly neighborhood groomer for dogs and cats."
        ctaText="Call to Book"
        ctaHref="tel:+15412452949"
        secondaryCtaText="See Our Work"
        secondaryCtaHref="#gallery"
        rating={4.5}
        reviewCount={168}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── STATS — dark band ── */}
      <div className="lucky-dark-band">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── SERVICES ── */}
      <div id="services" className="lucky-services-wrapper">
        <ServiceCards
          heading="What We Do"
          subheading="From a quick nail trim while you wait to a full pamper session — we've got your pet covered."
          services={services}
          columns={3}
          variant="grid"
        />
      </div>

      {/* ── ABOUT ── */}
      <div className="lucky-about-wrapper">
        <AboutSection
          heading="Real Care, Real Results"
          story="Lucky Dog Pet Salon in Medford is the kind of place customers describe as a hidden gem — small, personal, and run by people who genuinely love animals. Courtney and her team have turned anxious dogs into calm, happy regulars and handled big fluffy cats that needed two full baths without missing a beat. Walk-ins are welcome, prices are fair, and your pet will come out looking like royalty."
          image={aboutPhoto}
        />
      </div>

      {/* ── GALLERY ── */}
      <div id="gallery" className="lucky-gallery-wrapper">
        <ImageGallery
          heading="Fresh Cuts"
          photos={galleryPhotos}
          variant="masonry"
        />
      </div>

      {/* ── TESTIMONIALS — dark band ── */}
      <div id="reviews" className="lucky-reviews-band">
        <TestimonialCarousel
          heading="Happy Pets, Happy Owners"
          reviews={reviews}
          variant="featured"
        />
      </div>

      {/* ── FAQ ── */}
      <div id="faq" className="lucky-faq-wrapper">
        <FAQAccordion heading="Good Questions" items={faqItems} />
      </div>

      {/* ── CONTACT ── */}
      <div id="contact" className="lucky-contact-wrapper">
        <ContactSection
          business={businessContact}
          heading="Find Us"
          showMap={true}
        />
      </div>

      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(541) 245-2949" />
    </>
  );
}
