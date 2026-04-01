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

// ── Brand tokens ─────────────────────────────────────────────────────────────
const BRAND_CREAM = '#f4e6da'
const BRAND_BLUE  = '#84b9ef'
const BRAND_DARK  = '#1a1410'

// ── Data ─────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services',     href: '#services'      },
  { label: 'Gallery',      href: '#gallery'       },
  { label: 'About',        href: '#about'         },
  { label: 'Reviews',      href: '#reviews'       },
  { label: 'FAQ',          href: '#faq'           },
  { label: 'Contact',      href: '#contact'       },
]

const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Bellish Nail Lounge photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Bellish Nail Lounge photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp',  alt: 'Bellish Nail Lounge photo 3',  category: 'work' },
  { src: '/photos/photo-4.webp',  alt: 'Bellish Nail Lounge photo 4',  category: 'work' },
  { src: '/photos/photo-5.webp',  alt: 'Bellish Nail Lounge photo 5',  category: 'work' },
  { src: '/photos/photo-6.webp',  alt: 'Bellish Nail Lounge photo 6',  category: 'work' },
  { src: '/photos/photo-7.webp',  alt: 'Bellish Nail Lounge photo 7',  category: 'work' },
  { src: '/photos/photo-8.webp',  alt: 'Bellish Nail Lounge photo 8',  category: 'work' },
  { src: '/photos/photo-9.webp',  alt: 'Bellish Nail Lounge photo 9',  category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Bellish Nail Lounge photo 10', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Acrylic Full Set',
    description: 'Custom acrylic nail sets built to your shape and style — from clean pink-and-nude classics to bold, branded statement looks.',
    icon: 'sparkles',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Acrylic Removal',
    description: 'Safe, thorough removal of existing acrylic sets, including same-day emergency appointments when available.',
    icon: 'scissors',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Nail Art & Custom Design',
    description: "Highly detailed, personalized nail art executed to match your vision, aesthetic, or brand — brought to life by Tavi's creative precision.",
    icon: 'palette',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Gel Manicure',
    description: 'Long-lasting gel polish applied over natural nails for a flawless, chip-resistant finish in any color.',
    icon: 'droplets',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Classic Manicure',
    description: 'A clean, polished manicure with shaping, cuticle care, and your choice of polish — perfect for those who appreciate understated elegance.',
    icon: 'hand',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Lounge Experience Add-On',
    description: 'Complimentary wine and curated music to elevate your appointment into a full self-care lounge experience.',
    icon: 'wine',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'Taviii did amazing! She executed my brand perfectly on my nails clean, creative, and professional from start to finish. You can tell she takes pride in her work and really listens to what you want. My nails came out exactly how I envisioned them red, bold, and branded.',
    author: 'Who Is She',
    rating: 5,
    source: 'google',
  },
  {
    text: "Let me tell you guys about this AMAZING BLACK OWNED nail salon. I had the pleasure of having the owner do my nails and the other amazing nail tech Tavi. Those ladies give out good vibes and great customer service is always top tier. I absolutely love this salon and their complime...",
    author: 'Felicia C',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Tavii was amazing. She pays attention to detail, takes her time, and really wants to give you exactly what you ask for. I highly recommend her. The owner of the shop is also very sweet and the vibes here are top notch. They offer you drinks, (wine included) and the music choices are everything.',
    author: 'Ebony Dozier',
    rating: 5,
    source: 'google',
  },
  {
    text: "Brazil was lovely! I had a nail emergency and needed my last acrylic set removed before evening plans and she fit me in and did a quality and thorough job. I'll definitely be back for nail services in the future. Thank you Brazil!",
    author: 'Claire Trindle',
    rating: 5,
    source: 'google',
  },
  {
    text: "Brazil was amazing! I'm one of the boring nail girls that just appreciates a clean pink or nude set... This is honestly the best set of acrylics I've had in a very long time. I'm obsessed with my nails and I will be back!!",
    author: 'Jo Givens',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 5,  suffix: '★',    label: 'Perfect Rating on Google'       },
  { value: 40, suffix: '+',    label: 'Verified 5-Star Reviews'        },
  { value: 2,                  label: 'Expert Nail Technicians on Staff' },
  { value: 7,  suffix: ' days', label: 'Open Every Day of the Week'    },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do I need to book an appointment in advance?',
    answer: 'Yes — Bellish Nail Lounge operates by appointment through Booksy at bellishnails.booksy.com. Booking ahead ensures you get the time slot and technician you want.',
  },
  {
    question: 'What makes Bellish different from other nail salons in Philadelphia?',
    answer: 'Bellish is a Black-owned nail lounge that prioritizes real listening, personalized results, and an elevated atmosphere. Expect complimentary wine, great music, and nails done exactly how you envisioned.',
  },
  {
    question: 'Can I bring a reference photo or specific design concept?',
    answer: 'Absolutely — and you should. Tavi in particular is known for executing client visions with precision, including branded and custom artistic sets. The more detail you bring, the better.',
  },
  {
    question: 'Is complimentary wine really included?',
    answer: "Yes! Multiple reviewers specifically mention the complimentary wine as a highlight of their visit. It's part of the lounge experience here — a small touch that makes the whole appointment feel special.",
  },
]

const businessContact = {
  name: 'Bellish Nail Lounge',
  address: '841 S 52nd St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19143',
  phone: '(484) 649-1931',
  email: '',
  hours: {
    Monday:    '9:00 AM – 2:00 PM',
    Tuesday:   '9:00 AM – 5:00 PM',
    Wednesday: '9:00 AM – 5:00 PM',
    Thursday:  '9:00 AM – 5:00 PM',
    Friday:    '9:00 AM – 5:00 PM',
    Saturday:  '10:00 AM – 8:00 PM',
    Sunday:    '10:00 AM – 7:00 PM',
  },
}

const socialLinks: SocialLinks = {}

const footerLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery',  href: '#gallery'  },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
]

// ── Fade-up animation wrapper ─────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ── Marquee ticker ────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'Bold Nails',
  '✦',
  'Black-Owned',
  '✦',
  'Philadelphia, PA',
  '✦',
  'Complimentary Wine',
  '✦',
  'Book on Booksy',
  '✦',
  '5-Star Rated',
  '✦',
  'Custom Nail Art',
  '✦',
]

function MarqueeTicker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="bellish-ticker" aria-hidden="true">
      <motion.div
        className="bellish-ticker__track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="bellish-ticker__item">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Floating badge ────────────────────────────────────────────────────────────
function FloatingBadge() {
  return (
    <motion.div
      className="bellish-badge"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="bellish-badge__star">★</span>
      <span className="bellish-badge__text">5.0 · Google</span>
    </motion.div>
  )
}

// ── Decorative divider ────────────────────────────────────────────────────────
function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="bellish-wave"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0 30 C240 60 480 0 720 30 C960 60 1200 0 1440 30 L1440 60 L0 60 Z"
          fill={BRAND_CREAM}
        />
      </svg>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function BellishNailLoungePage() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <>
      {/* ── Nav ── */}
      <Navbar
        businessName="Bellish Nail Lounge"
        links={navLinks}
        ctaText="Book Now"
        ctaHref="https://bellishnails.booksy.com"
      />

      <main>
        {/* ── Hero ── */}
        <div className="bellish-hero-wrapper">
          <HeroSection
            headline="Bold Nails. Pure Vibes."
            subheadline="Black-owned nail lounge on 52nd Street — where your vision becomes the design."
            ctaText="Book Your Appointment"
            ctaHref="https://bellishnails.booksy.com"
            secondaryCtaText="See Our Work"
            secondaryCtaHref="#gallery"
            rating={5}
            reviewCount={40}
            variant="photo-bg"
            backgroundImage={heroPhoto}
          />
          <FloatingBadge />
        </div>

        {/* ── Ticker ── */}
        <MarqueeTicker />

        {/* ── Stats — dark band ── */}
        <div id="about" className="bellish-dark-band">
          <FadeUp>
            <StatsCounter stats={stats} variant="dark" />
          </FadeUp>
        </div>

        {/* ── About ── */}
        <div className="bellish-about-wrapper">
          <FadeUp>
            <AboutSection
              heading="About Bellish"
              story="Bellish Nail Lounge is a Black-owned lounge at 841 S 52nd St in Philadelphia where Tavi and Brazil treat every set like a creative collaboration. Reviewers keep coming back for the personalized service, great music, and yes — the complimentary wine. Walk in for nails. Stay for the vibe."
              image={aboutPhoto}
            />
          </FadeUp>
        </div>

        {/* ── Services — cream bg ── */}
        <div id="services" className="bellish-services-wrapper">
          <FadeUp>
            <ServiceCards
              heading="What We Do"
              subheading="Every service is customized to you — no cookie-cutter sets here."
              services={services}
              columns={3}
              variant="grid"
            />
          </FadeUp>
        </div>

        {/* ── Gallery — dark bg with parallax accent ── */}
        <div id="gallery" className="bellish-gallery-dark" ref={parallaxRef}>
          <motion.div className="bellish-gallery-blob" style={{ y: bgY }} aria-hidden="true" />
          <FadeUp>
            <ImageGallery
              heading="The Work"
              photos={galleryPhotos}
              variant="masonry"
            />
          </FadeUp>
        </div>

        {/* ── Testimonials — cream ── */}
        <div id="reviews" className="bellish-reviews-wrapper">
          <FadeUp>
            <TestimonialCarousel
              heading="Client Love"
              reviews={reviews}
              variant="featured"
            />
          </FadeUp>
        </div>

        {/* ── FAQ — dark ── */}
        <div id="faq" className="bellish-faq-dark">
          <FadeUp>
            <FAQAccordion heading="Good Questions" items={faqItems} />
          </FadeUp>
        </div>

        {/* ── Contact ── */}
        <div id="contact" className="bellish-contact-wrapper">
          <FadeUp>
            <ContactSection
              business={businessContact}
              heading="Find Us"
              showMap={true}
            />
          </FadeUp>
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer
        business={businessContact}
        links={footerLinks}
        socialLinks={socialLinks}
      />

      {/* ── Floating CTA ── */}
      <ClickToCall phone="(484) 649-1931" />
    </>
  )
}