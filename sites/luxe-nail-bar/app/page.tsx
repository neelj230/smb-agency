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
import { ProcessSteps } from '@/components/ProcessSteps'
import type { NavLink, Photo, Service, Review, Stat, FAQItem, ProcessStep } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── Brand tokens ────────────────────────────────────────────────
const BRAND = '#1B3A2D'
const ACCENT = '#004055'

// ─── Data ────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Luxe Nail Bar photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Luxe Nail Bar photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'Luxe Nail Bar photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Luxe Nail Bar photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'Luxe Nail Bar photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Luxe Nail Bar photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'Luxe Nail Bar photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'Luxe Nail Bar photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Luxe Nail Bar photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Luxe Nail Bar photo 10', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Gel Manicure',
    description: 'Long-lasting gel color applied over your natural nails for a clean, glossy finish starting at $35.',
    icon: 'sparkles',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Gel-X Full Set',
    description: 'Soft gel nail extensions applied over tips for added length and strength without acrylic.',
    icon: 'wand-2',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Classic Manicure',
    description: 'Traditional manicure with shaping, cuticle care, and your choice of polish color.',
    icon: 'hand',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Nail Art & Custom Designs',
    description: 'Custom nail art created to match your inspiration photo, from minimalist accents to detailed looks.',
    icon: 'paintbrush',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Pedicure',
    description: 'Relaxing foot soak, exfoliation, and polish in a full pedicure service.',
    icon: 'footprints',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Nail Repair',
    description: 'Single nail repair or fill service to fix breaks and maintain your existing set.',
    icon: 'wrench',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: "Literally the best experience ever. All of the artists are super nice and try to accommodate as close as possible to your inspo picture. This salon is my favorite spot in philly and perfect for students because of good prices.",
    author: 'keerthana tanniru',
    rating: 5,
    source: 'google',
  },
  {
    text: "I always like getting gel manicures once a month and this nail salon is always extremely quick with service. As soon as I walk in I'm usually served within 5-10 minutes and the nail techs are all really friendly and want to make sure you like your nails.",
    author: 'Alysha Khem',
    rating: 5,
    source: 'google',
  },
  {
    text: "Let me start off by saying I hate leaving negative reviews but I am very disappointed with the results. I have been getting gel x nails (not here) for 4 years and they always last 3-6 weeks. I decided to try this place since I recently moved and the prices looked fair.",
    author: 'Anna Walker',
    rating: 2,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 348, suffix: '+', label: 'Customer Reviews' },
  { value: 3.7, suffix: '★', label: 'Average Rating' },
  { value: 6, suffix: ' days', label: 'Open Per Week' },
  { value: 35, suffix: '+', label: 'Gel Manicure From $' },
]

const faqItems: FAQItem[] = [
  {
    question: 'How long will I wait before being seen?',
    answer: 'Most walk-in customers report being seated within 5–10 minutes of arriving, making Luxe Nail Bar one of the faster turnaround salons in West Philly.',
  },
  {
    question: 'What are the prices for a gel manicure?',
    answer: 'Gel manicures start at around $35 for a single color and run up to $50 or more for custom or detailed looks — pricing that customers consistently call fair for the area.',
  },
  {
    question: 'Can I bring an inspiration picture for nail art?',
    answer: 'Yes — the team actively works with inspiration photos and will try to match your look as closely as possible, including color and shape.',
  },
  {
    question: 'Are there specific nail techs I should request?',
    answer: 'Richard and Kevin are both named by satisfied customers for their quality work and friendly approach. If you have a preference, feel free to ask when you walk in.',
  },
]

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Walk In',
    description: 'No appointment needed. Most guests are seated within 5–10 minutes of arriving.',
  },
  {
    step: 2,
    title: 'Pick Your Look',
    description: 'Browse colors, shapes, and nail art. Bring an inspo photo — the team will match it.',
  },
  {
    step: 3,
    title: 'Leave Polished',
    description: 'Fresh set, fair price. The artists work until you love every nail.',
  },
]

const businessContact = {
  name: 'Luxe Nail Bar',
  address: '212 S 40th St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19104',
  phone: '(215) 382-0727',
  email: '',
  hours: {
    Monday: '10:00 AM – 7:00 PM',
    Tuesday: '10:00 AM – 7:00 PM',
    Wednesday: '10:00 AM – 7:00 PM',
    Thursday: '10:00 AM – 8:00 PM',
    Friday: '10:00 AM – 8:00 PM',
    Saturday: '10:00 AM – 6:00 PM',
    Sunday: 'Closed',
  },
}

const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── Marquee strip data ──────────────────────────────────────────
const marqueeItems = [
  'Gel Manicure',
  'Walk-Ins Welcome',
  'Nail Art',
  'Fair Prices',
  'West Philadelphia',
  'Gel-X Full Set',
  'Pedicure',
  'Custom Designs',
]

// ─── Fade-up animation helper ────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function LuxeNailBarPage() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* ── Global CSS vars ───────────────────────────────────── */}
      

      {/* ── Navbar ────────────────────────────────────────────── */}
      <Navbar
        businessName="Luxe Nail Bar"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+12153820727"
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <HeroSection
        headline="Fresh Set, Fair Price."
        subheadline="Walk-in nail bar on 40th Street — gel, art, and extensions for Philly students and locals."
        ctaText="Call to Book"
        ctaHref="tel:+12153820727"
        secondaryCtaText="See Our Work"
        secondaryCtaHref="#gallery"
        rating={3.7}
        reviewCount={348}
        variant="photo-bg"
        backgroundImage={heroPhoto}
      />

      {/* ── Marquee strip ─────────────────────────────────────── */}
      <div className="luxe-marquee-track" aria-hidden="true">
        <div className="luxe-marquee-inner">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="luxe-marquee-item">
              <span className="luxe-marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── How it works ──────────────────────────────────────── */}
      <section id="process" className="luxe-section-light py-20 lg:py-28">
        <motion.div
          className="luxe-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="luxe-eyebrow">
            How It Works
          </motion.p>
          <motion.h2 variants={fadeUp} className="luxe-heading mb-12">
            In Three Steps
          </motion.h2>
          <ProcessSteps
            heading=""
            subheading="Walk in, pick your look, walk out polished."
            steps={processSteps}
            variant="grid"
          />
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <div className="luxe-stats-wrapper">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── Services ──────────────────────────────────────────── */}
      <section id="services" className="luxe-section-cream py-20 lg:py-28">
        <motion.div
          className="luxe-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="luxe-eyebrow">
            Menu
          </motion.p>
          <motion.h2 variants={fadeUp} className="luxe-heading mb-4">
            Every Service
          </motion.h2>
          <motion.p variants={fadeUp} className="luxe-subtext mb-12">
            From a classic polish to a full Gel-X set — all under one roof.
          </motion.p>
          <ServiceCards
            heading=""
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────── */}
      <section id="gallery" className="py-20 lg:py-28 bg-white">
        <motion.div
          className="luxe-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="luxe-eyebrow">
            Portfolio
          </motion.p>
          <motion.h2 variants={fadeUp} className="luxe-heading mb-12">
            Recent Work
          </motion.h2>
          <ImageGallery
            heading=""
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section id="about" className="luxe-section-dark py-20 lg:py-28">
        <motion.div
          className="luxe-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="luxe-eyebrow luxe-eyebrow--light">
            The Bar
          </motion.p>
          <motion.h2 variants={fadeUp} className="luxe-heading luxe-heading--light mb-12">
            On 40th Street
          </motion.h2>
          <AboutSection
            heading=""
            story="Luxe Nail Bar has been a go-to in West Philadelphia for years — known for quick walk-in service, friendly techs, and prices that work for students and neighbors alike. Customers routinely walk in and are seated in under 10 minutes. Bring your inspo photo; the team will work with it."
            image={aboutPhoto}
          />
        </motion.div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="luxe-section-cream py-20 lg:py-28">
        <motion.div
          className="luxe-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="luxe-eyebrow">
            Reviews
          </motion.p>
          <motion.h2 variants={fadeUp} className="luxe-heading mb-12">
            Real Customers
          </motion.h2>
          <TestimonialCarousel
            heading=""
            reviews={reviews}
            variant="scroll"
          />
        </motion.div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="py-20 lg:py-28 bg-white">
        <motion.div
          className="luxe-container luxe-container--narrow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="luxe-eyebrow">
            FAQ
          </motion.p>
          <motion.h2 variants={fadeUp} className="luxe-heading mb-12">
            Quick Answers
          </motion.h2>
          <FAQAccordion heading="" items={faqItems} />
        </motion.div>
      </section>

      {/* ── Contact ───────────────────────────────────────────── */}
      <section id="contact" className="luxe-section-dark py-20 lg:py-28">
        <motion.div
          className="luxe-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ContactSection
            business={businessContact}
            heading="Find Us"
            showMap={true}
          />
        </motion.div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={{}}
      />

      {/* ── Click-to-call FAB ─────────────────────────────────── */}
      <ClickToCall phone="(215) 382-0727" />
    </>
  )
}