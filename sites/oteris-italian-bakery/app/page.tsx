'use client'

import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { ImageGallery } from '@/components/ImageGallery'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import type { NavLink, Photo, Service, Review, Stat, FAQItem, SocialLinks } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── Brand tokens ────────────────────────────────────────────────
const PRIMARY = '#7a3b3b'
const ACCENT = '#b57900'

// ─── Data ────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Cakes', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Visit Us', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: "Oteri's Italian Bakery photo 1",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "Oteri's Italian Bakery photo 2",
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: "Oteri's Italian Bakery photo 3", category: 'work' },
  { src: '/photos/photo-4.webp', alt: "Oteri's Italian Bakery photo 4", category: 'work' },
  { src: '/photos/photo-5.webp', alt: "Oteri's Italian Bakery photo 5", category: 'work' },
  { src: '/photos/photo-6.webp', alt: "Oteri's Italian Bakery photo 6", category: 'work' },
  { src: '/photos/photo-7.webp', alt: "Oteri's Italian Bakery photo 7", category: 'work' },
  { src: '/photos/photo-8.webp', alt: "Oteri's Italian Bakery photo 8", category: 'work' },
  { src: '/photos/photo-9.webp', alt: "Oteri's Italian Bakery photo 9", category: 'work' },
  { src: '/photos/photo-10.webp', alt: "Oteri's Italian Bakery photo 10", category: 'work' },
]

const services: Service[] = [
  {
    name: 'Custom Specialty Cakes',
    description:
      'Fully custom-designed celebration cakes built around your event, style, and vision — the kind that stop rooms and flood family group chats.',
    icon: 'cake',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Birthday Cakes',
    description:
      'Personalized birthday cakes for milestone moments, from sweet sixteens to 21st birthdays, crafted to be the centerpiece of the celebration.',
    icon: 'gift',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Italian Pastries & Baked Goods',
    description:
      "Daily-baked Italian pastries and traditional baked goods available in-store from opening, reflecting the bakery's old-world Italian heritage.",
    icon: 'croissant',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Strawberry Shortcake & Specialty Desserts',
    description:
      'Signature dessert options including strawberry shortcake and seasonal specialty items available for same-day pickup when in stock.',
    icon: 'cherry',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Layered & Tiered Cakes',
    description:
      'Multi-layer cake builds designed to impress at parties and gatherings, with custom flavor combinations and decorative icing work.',
    icon: 'layers',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Phone & Walk-In Orders',
    description:
      'Orders accepted by phone or in person, with name reservations placed on cakes to hold them for pickup — open Monday through Sunday.',
    icon: 'phone-call',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'Very nice staff and my purchase was made quickly. I will definitely be returning and we thank you so much for the cake! It was magnificent!',
    author: 'Ivan The terrible',
    rating: 5,
    source: 'google',
  },
  {
    text: "I ordered a specialty cake for my daughter's 21st bday. Her birthday is in January but she put everything off and waited until June so that all of her family members and friends could be there without having to worry about ice and snow. So the cake had to be a big deal. I told he...",
    author: 'Stephanie Thurman',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I love it so much the cake was so good 10/10 I will totally order from them again',
    author: 'Charlie "Pumpkin" Cochran',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.1, suffix: '★', label: 'Average Customer Rating' },
  { value: 359, suffix: '+', label: 'Customer Reviews' },
  { value: 6, suffix: ' days', label: 'Open Early at 7 AM' },
  { value: 1, suffix: ' neighborhood', label: 'Rooted in Southwest Philly' },
]

const faqItems: FAQItem[] = [
  {
    question: 'Can I order a custom cake for a birthday or special event?',
    answer:
      "Yes — custom specialty cakes are one of Oteri's signature offerings. Customers have ordered elaborate designs for milestone birthdays, graduations, and family gatherings. Call ahead or stop in to talk through your vision.",
  },
  {
    question: 'How far in advance should I place my cake order?',
    answer:
      'For custom or specialty cakes, the earlier the better. Elaborate celebration cakes require planning and design time. Call the bakery to discuss your timeline and get on the schedule.',
  },
  {
    question: 'What are your hours and when is the best time to visit?',
    answer:
      "Oteri's is open Monday through Saturday from 7:00 AM to 6:00 PM, and Sunday from 8:00 AM to 3:00 PM. Early mornings are great for fresh pastries straight from the oven.",
  },
  {
    question: "What should I do if my order isn't what I asked for?",
    answer:
      "Some customers have reported receiving incorrect orders and have been offered store credit. If your cake doesn't match what you requested, call the bakery directly — they want to make it right.",
  },
]

const businessContact = {
  name: "Oteri's Italian Bakery",
  address: '6323 Woodland Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19142',
  phone: '(215) 724-0793',
  email: '',
  hours: {
    Monday: '7:00 AM – 6:00 PM',
    Tuesday: '7:00 AM – 6:00 PM',
    Wednesday: '7:00 AM – 6:00 PM',
    Thursday: '7:00 AM – 6:00 PM',
    Friday: '7:00 AM – 6:00 PM',
    Saturday: '7:00 AM – 6:00 PM',
    Sunday: '8:00 AM – 3:00 PM',
  },
}

const socialLinks: SocialLinks = {}

// ─── Decorative geometric accent component ───────────────────────
function GeometricAccents() {
  return (
    <div className="oteri-geo-accents" aria-hidden="true">
      <span className="geo geo-circle" style={{ top: '12%', left: '4%' }} />
      <span className="geo geo-triangle" style={{ top: '30%', right: '6%' }} />
      <span className="geo geo-square" style={{ bottom: '20%', left: '8%' }} />
      <span className="geo geo-circle geo-small" style={{ bottom: '10%', right: '10%' }} />
      <span className="geo geo-diamond" style={{ top: '55%', left: '2%' }} />
    </div>
  )
}

// ─── Marquee banner ───────────────────────────────────────────────
function MarqueeBanner() {
  const items = [
    'Custom Cakes',
    'Birthday Cakes',
    'Italian Pastries',
    'Strawberry Shortcake',
    'Tiered Cakes',
    'Southwest Philly',
    'Since Day One',
    'Cakes That Make Jaws Drop',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="oteri-marquee-wrap" aria-hidden="true">
      <div className="oteri-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="oteri-marquee-item">
            <span className="oteri-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Tagline strip ────────────────────────────────────────────────
function TaglineStrip() {
  return (
    <motion.div
      className="oteri-tagline-strip"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="oteri-tagline-eyebrow">The Signature</span>
      <h2 className="oteri-tagline-headline">
        Cakes That Make <em>Jaws Drop.</em>
      </h2>
      <p className="oteri-tagline-sub">
        Southwest Philly's go-to bakery for cakes that become the centerpiece of the room.
      </p>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────
export default function OterisBakeryPage() {
  const statsRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* ── CSS Variables ─────────────────────────────────────── */}
      

      <Navbar
        businessName="Oteri's Italian Bakery"
        links={navLinks}
        ctaText="Order a Cake"
        ctaHref="tel:2157240793"
      />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section id="home">
        <HeroSection
          headline="Oteri's Italian Bakery"
          subheadline="Custom cakes hand-crafted in Southwest Philly since the beginning."
          ctaText="Order by Phone"
          ctaHref="tel:2157240793"
          secondaryCtaText="See Our Work"
          secondaryCtaHref="#gallery"
          rating={4.1}
          reviewCount={359}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* ── Marquee ────────────────────────────────────────────── */}
      <MarqueeBanner />

      {/* ── Tagline strip (warm cream) ──────────────────────────── */}
      <section className="oteri-tagline-section dot-pattern">
        <GeometricAccents />
        <TaglineStrip />
      </section>

      {/* ── Stats (dark) ───────────────────────────────────────── */}
      <div ref={statsRef} id="stats" className="oteri-stats-dark">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── Services ───────────────────────────────────────────── */}
      <section id="services" className="oteri-services-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <ServiceCards
            heading="What We Bake"
            subheading="From walk-in pastries to fully custom celebration cakes — made for your moment."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>
      </section>

      {/* ── Gallery (dark) ─────────────────────────────────────── */}
      <div
        id="gallery"
        className="oteri-dark-section"
        style={{ background: 'var(--brand-text)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ImageGallery
            heading="The Work"
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.div>
      </div>

      {/* ── About ──────────────────────────────────────────────── */}
      <section id="about" className="oteri-about-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AboutSection
            heading="Woodland Ave Roots"
            story="Oteri's has been baking cakes on Woodland Avenue long enough to know what Southwest Philly actually wants. Customers drive across the city for a custom cake — one woman even planned her daughter's January birthday party in June just so the cake could come from here. Walk in, call ahead, or save them one."
            image={aboutPhoto}
          />
        </motion.div>
      </section>

      {/* ── Testimonials (warm accent strip) ───────────────────── */}
      <div
        id="reviews"
        className="oteri-reviews-wrap"
        style={{ background: 'var(--brand-primary)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TestimonialCarousel
            heading="Real Customers"
            reviews={reviews}
            variant="featured"
          />
        </motion.div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="faq" className="oteri-faq-section dot-pattern">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="oteri-faq-inner"
        >
          <FAQAccordion heading="Good Questions" items={faqItems} />
        </motion.div>
      </section>

      {/* ── Contact ────────────────────────────────────────────── */}
      <div id="contact" className="oteri-contact-wrap">
        <ContactSection
          business={businessContact}
          heading="Come Find Us"
          showMap={true}
        />
      </div>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 724-0793" />
    </>
  )
}