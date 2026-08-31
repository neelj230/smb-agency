"use client";

import { AboutSection } from "@/components/AboutSection";
import { ClickToCall } from "@/components/ClickToCall";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { Navbar } from "@/components/Navbar";
import { ServiceCards } from "@/components/ServiceCards";
import { StatsCounter } from "@/components/StatsCounter";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { motion } from "framer-motion";
import type { NavLink, Photo, Review, Service, Stat } from "@/components/types";

const BRAND = "#340f19";
const ACCENT = "#e9c564";

const businessContact = {
  name: "Really Good Stuff",
  address: "3629 SE Division St",
  city: "Portland",
  state: "OR",
  zip: "97202",
  phone: "(503) 238-1838",
  email: "",
  hours: {
    Monday: "11:00 AM – 6:00 PM",
    Tuesday: "11:00 AM – 6:00 PM",
    Wednesday: "11:00 AM – 6:00 PM",
    Thursday: "11:00 AM – 6:00 PM",
    Friday: "11:00 AM – 6:00 PM",
    Saturday: "11:00 AM – 6:00 PM",
    Sunday: "11:00 AM – 6:00 PM",
  },
};

const navLinks: NavLink[] = [
  { label: "Story", href: "#story" },
  { label: "The mix", href: "#mix" },
  { label: "Visit", href: "#contact" },
];

const heroPhoto: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Vintage items inside Really Good Stuff in Portland",
  category: "interior",
};

const aboutPhoto: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Eclectic vintage display at Really Good Stuff",
  category: "interior",
};

const collections: Service[] = [
  {
    name: "Vintage Clothing",
    description: "Clothing with history, character, and no chance of seeing it everywhere else.",
    image: "/photos/photo-2.webp",
  },
  {
    name: "Records & Music",
    description: "Vinyl, musical instruments, and finds for people who still stop for the good stuff.",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Furniture & Home",
    description: "Furniture, décor, and useful oddities pulled from a perpetually changing assortment.",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Tchotchkes",
    description: "The small, strange, memorable objects that make a room—or a gift—more interesting.",
    image: "/photos/photo-6.webp",
  },
];

const reviews: Review[] = [
  {
    text: "10/10 would recommend this spot if you’re in Portland. My husband and I both found some great gems here, and the owner helped me for several days after I returned to Seattle.",
    author: "Colleen Constant",
    rating: 5,
    source: "google",
  },
  {
    text: "This is one of the most eclectic shops I’ve ever seen. It is absolutely wonderful and the staff are A+. I found things here I hadn’t seen since I was young, and it’s so cool!",
    author: "brent freedman",
    rating: 5,
    source: "google",
  },
  {
    text: "New location is pretty nice with a good selection of a bit of everything.",
    author: "Google reviewer",
    rating: 5,
    source: "google",
  },
];

const stats: Stat[] = [
  { value: 4.5, suffix: "★", label: "Google rating" },
  { value: 215, suffix: "", label: "Google reviews" },
  { value: 7, suffix: " days", label: "Open weekly" },
];

const footerLinks: NavLink[] = [
  { label: "Story", href: "#story" },
  { label: "The mix", href: "#mix" },
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
        businessName="Really Good Stuff"
        links={navLinks}
        ctaText="Find us"
        ctaHref="#contact"
        variant="dark"
      />

      <HeroSection
        headline="The good kind of strange"
        subheadline="Vintage treasures, records, furniture, and more."
        ctaText="Plan your visit"
        ctaHref="#contact"
        secondaryCtaText="See the mix"
        secondaryCtaHref="#mix"
        rating={4.5}
        reviewCount={215}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      <div className="rgs-ticker" aria-label="Shop specialties">
        <MarqueeTicker
          items={["Vintage", "Vinyl", "Furniture", "Collectibles", "Pinball", "Portland"]}
          separator="✦"
          speed={27}
          variant="outline"
        />
      </div>

      <motion.div
        id="story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="rgs-story"
      >
        <AboutSection
          heading="Since 1993"
          story="Really Good Stuff opened in Portland in 1993 and now lives at 3629 SE Division St. After a 2021 fire destroyed the Hawthorne shop, owner Evan Shlaes reopened nearby in 2022. The shelves are still packed with vintage clothing, musical instruments, furniture, records, and the sort of thing you will not see twice."
          image={aboutPhoto}
        />
      </motion.div>

      <StatsCounter heading="A Portland classic" stats={stats} variant="dark" />

      <motion.section
        id="mix"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="rgs-mix"
      >
        <ServiceCards
          heading="What turns up"
          subheading="There is no formula here—just a lot of genuinely interesting things to sift through."
          services={collections}
          columns={4}
          variant="grid"
        />
      </motion.section>

      <motion.section
        id="reviews"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="rgs-reviews"
      >
        <TestimonialCarousel heading="Treasure hunters say" reviews={reviews} variant="featured" />
      </motion.section>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <ContactSection business={businessContact} heading="Come browse" showMap />
      </motion.div>

      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={{ facebook: "https://www.facebook.com/ReallyGoodStuffPDX/" }}
      />
      <ClickToCall phone="(503) 238-1838" />
    </div>
  );
}
