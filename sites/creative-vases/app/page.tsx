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

/* ─── Brand tokens ─────────────────────────────────────── */
const PRIMARY = '#c4a355'
const ACCENT = '#9bc455'

/* ─── Data ──────────────────────────────────────────────── */
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Creative Vases photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Creative Vases photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'Creative Vases photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Creative Vases photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'Creative Vases photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Creative Vases photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'Creative Vases photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'Creative Vases photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Creative Vases photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Creative Vases photo 10', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Custom Bouquets',
    description:
      'Handcrafted bouquets made to order using daily-fresh flowers, tailored for any occasion from birthday gifts to self-care treats.',
    icon: 'flower-2',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Fresh Flower & Plant Shop',
    description:
      'Walk-in access to a rotating daily selection of fresh-cut flowers and live plants, all reasonably priced for the neighborhood.',
    icon: 'leaf',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Floral Arrangements',
    description:
      'Gorgeous, professionally designed floral arrangements for home décor, gifts, and special celebrations.',
    icon: 'sparkles',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Floral Workshops & Events',
    description:
      "Hands-on floral design workshops held in the shop's inviting studio space, perfect for date nights, birthdays, or group outings.",
    icon: 'calendar',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Occasion & Gift Flowers',
    description:
      'Curated flowers and arrangements for milestones like Mother\'s Day, anniversaries, memorials, and awareness events including breast cancer fundraisers.',
    icon: 'heart',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Same-Day In-Store Pickup',
    description:
      'Walk in or call ahead and pick up a fresh, beautiful arrangement the same day — no waiting, no shipping delays.',
    icon: 'shopping-bag',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'Such a great neighborhood place. I went in to get a bouquet for my mom and she absolutely loved it. The flowers are beautiful even a week later!! Thank you creative vases ❤️',
    author: 'Jonah Aamodt',
    rating: 5,
    source: 'google',
  },
  {
    text: "Phenomenal experience! Finally, a floral shop in the community! Fresh flowers and plants are available daily and are reasonably priced. I love everything about this place.",
    author: 'Satia Johnnson',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Decided to pop in treat myself to some roses one day. The young lady who helped me was very friendly and helpful and I absolutely loved my bouquet. They were fresh and smelled wonderful. I\'ll be back in two weeks for more.',
    author: 'Kelly T',
    rating: 5,
    source: 'google',
  },
  {
    text: 'The floral arrangements are gorgeous! A fun and inviting vibe, with a great space for workshops and events. And I love how they support causes like breast cancer awareness - it makes you feel even better about spending here!',
    author: 'Joanna Winchester',
    rating: 5,
    source: 'google',
  },
  {
    text: "The most beautiful fresh flowers! It really brightens up my home. It's nice to know I can get fresh flowers in the neighborhood. I will definitely be back❤️",
    author: 'Edoukou AkaEzoua',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.8, suffix: '★', label: 'Average Customer Rating' },
  { value: 17, suffix: '+', label: 'Verified 5-Star Reviews' },
  { value: 6, suffix: ' days', label: 'Open Every Week for the Community' },
  { value: 7, suffix: '+ days', label: 'How Long Our Flowers Stay Fresh' },
]

const faqItems: FAQItem[] = [
  {
    question: 'How long do your flowers typically last?',
    answer:
      "Our customers consistently report their flowers staying fresh and beautiful for a week or more after purchase — we bring in daily stock so you're always getting the freshest blooms possible.",
  },
  {
    question: 'Are your prices affordable for everyday purchases?',
    answer:
      "Absolutely. Multiple customers have highlighted that our flowers are 'reasonably priced' — we believe fresh blooms should be accessible for everyone in the neighborhood, not just for special occasions.",
  },
  {
    question: 'Do you offer workshops or events at the shop?',
    answer:
      "Yes! Our shop has a dedicated space for floral workshops and events. It's a fun, inviting environment — great for groups, date nights, birthdays, or anyone who wants to learn the craft.",
  },
  {
    question: 'What makes Creative Vases different from other florists?',
    answer:
      "We're a true neighborhood shop — rooted in the West Philadelphia community, stocked daily with fresh flowers and plants, and committed to giving back through causes like breast cancer awareness. It's personal here.",
  },
]

const businessContact = {
  name: 'Creative Vases',
  address: '543 S 52nd St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19143',
  phone: '(267) 897-1050',
  email: '',
  hours: {
    Monday: '10:00 AM – 5:00 PM',
    Tuesday: '10:00 AM – 5:00 PM',
    Wednesday: '10:00 AM – 5:00 PM',
    Thursday: '10:00 AM – 5:00 PM',
    Friday: '10:00 AM – 5:00 PM',
    Saturday: '10:00 AM – 5:00 PM',
    Sunday: 'Closed',
  },
}

const socialLinks: SocialLinks = {}

/* ─── Animated marquee strip ───────────────────────────── */
const marqueeItems = [
  'Fresh Daily Blooms',
  'Custom Bouquets',
  'West Philly\'s Own',
  'Workshops & Events',
  'Same-Day Pickup',
  'Gift Flowers',
  'Community Rooted',
  'Reasonably Priced',
]

function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="cv-marquee-wrapper" aria-hidden="true">
      <div className="cv-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="cv-marquee-item">
            <span className="cv-marquee-dot" style={{ color: ACCENT }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Decorative section divider ───────────────────────── */
function WaveDivider({ flip = false, color = '#faf7f2' }: { flip?: boolean; color?: string }) {
  return (
    <div
      style={{
        lineHeight: 0,
        transform: flip ? 'scaleY(-1)' : undefined,
        marginBottom: flip ? '-2px' : '-2px',
      }}
    >
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  )
}

/* ─── Floating tag pill ─────────────────────────────────── */
function FloatingTag({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div
      className="cv-floating-tag"
      style={style}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Page() {
  const statsRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Film grain overlay */}
      <div className="cv-grain-overlay" aria-hidden="true" />

      <Navbar
        businessName="Creative Vases"
        links={navLinks}
        ctaText="Call Us Today"
        ctaHref="tel:+12678971050"
      />

      {/* ── HERO ── */}
      <section id="home" className="cv-hero-wrapper">
        <HeroSection
          headline="Fresh Blooms, West Philly"
          subheadline="Daily-fresh flowers and custom bouquets rooted in the neighborhood."
          ctaText="Call to Order"
          ctaHref="tel:+12678971050"
          secondaryCtaText="See Our Work"
          secondaryCtaHref="#gallery"
          rating={4.8}
          reviewCount={17}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />

        {/* Floating tags layered over hero bottom */}
        <div className="cv-hero-tags" aria-hidden="true">
          <FloatingTag style={{ '--delay': '0s' } as React.CSSProperties}>
            🌸 Open 6 Days a Week
          </FloatingTag>
          <FloatingTag style={{ '--delay': '1.2s' } as React.CSSProperties}>
            🌿 Daily Fresh Stock
          </FloatingTag>
          <FloatingTag style={{ '--delay': '0.6s' } as React.CSSProperties}>
            ✦ 4.8★ Rated
          </FloatingTag>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="cv-marquee-section" style={{ background: PRIMARY }}>
        <MarqueeStrip />
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="cv-section-warm">
        <WaveDivider color="#fdf9f2" flip />
        <div className="cv-about-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <AboutSection
              heading="Rooted in the Block"
              story="Creative Vases is West Philadelphia's own neighborhood floral shop at 543 S 52nd St — stocked daily with fresh-cut flowers and live plants at prices that work for everyone. Customers love that their blooms stay beautiful for a week or more. Beyond selling flowers, the shop gives back through awareness events and hands-on community workshops."
              image={aboutPhoto}
            />
          </motion.div>
        </div>
        <WaveDivider color="#1a1a14" />
      </section>

      {/* ── STATS ── */}
      <div ref={statsRef} className="cv-stats-wrapper">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="cv-section-cream">
        <WaveDivider color="#fdf9f2" flip />
        <div className="cv-section-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cv-section-label"
          >
            <span style={{ color: PRIMARY }}>✦</span> What We Offer
          </motion.div>
          <ServiceCards
            heading="Six Ways to Bloom"
            subheading="Walk in any day Monday–Saturday and find something beautiful waiting for you."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>
        <WaveDivider color="#1a1a14" />
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="cv-section-dark">
        <div className="cv-section-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cv-section-label-light"
          >
            <span style={{ color: ACCENT }}>✦</span> Fresh From the Shop
          </motion.div>
          <ImageGallery
            heading="The Work Speaks"
            photos={galleryPhotos}
            variant="masonry"
          />
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="cv-section-cream">
        <WaveDivider color="#fdf9f2" flip />
        <div className="cv-section-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cv-section-label"
          >
            <span style={{ color: PRIMARY }}>✦</span> Happy Customers
          </motion.div>
          <TestimonialCarousel
            heading="Real Neighbors, Real Love"
            reviews={reviews}
            variant="featured"
          />
        </div>
        <WaveDivider color="#1a1a14" />
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="cv-section-dark">
        <div className="cv-section-inner cv-faq-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cv-section-label-light"
          >
            <span style={{ color: ACCENT }}>✦</span> Good to Know
          </motion.div>
          <FAQAccordion
            heading="Questions, Answered"
            items={faqItems}
          />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="cv-section-cream">
        <WaveDivider color="#fdf9f2" flip />
        <div className="cv-section-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cv-section-label"
          >
            <span style={{ color: PRIMARY }}>✦</span> Find Us
          </motion.div>
          <ContactSection
            business={businessContact}
            heading="Stop By Anytime"
            showMap={true}
          />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      {/* ── CLICK TO CALL ── */}
      <ClickToCall phone="(267) 897-1050" />
    </>
  )
}