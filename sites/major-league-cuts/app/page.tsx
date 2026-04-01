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
import { motion } from 'framer-motion'

// ── Data ────────────────────────────────────────────────────────────────────

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
  alt: 'Major League Cuts photo 1',
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Major League Cuts photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'Major League Cuts photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Major League Cuts photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'Major League Cuts photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Major League Cuts photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'Major League Cuts photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'Major League Cuts photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Major League Cuts photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Major League Cuts photo 10', category: 'work' },
]

const services: Service[] = [
  {
    name: 'Precision Haircut & Shape-Up',
    description: 'A full barbershop haircut with razor-sharp line detailing and edge work, tailored to your style.',
    icon: 'scissors',
    image: '/photos/photo-3.webp',
  },
  {
    name: "Kids' Haircut",
    description: 'A welcoming, patient barbershop experience designed for children, with skilled cuts that parents and kids both love.',
    icon: 'smile',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Fade & Taper',
    description: 'Seamless low, mid, or high fades with precise tapering for a clean, polished finish.',
    icon: 'sliders',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Beard Trim & Line-Up',
    description: 'Expert beard shaping and trimming to keep your facial hair sharp and well-defined.',
    icon: 'align-center',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Hot Towel Shave',
    description: 'A classic straight-razor shave with hot towel treatment for a smooth, close finish.',
    icon: 'wind',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Hair Design & Custom Cuts',
    description: 'Creative custom hair designs and signature cuts for clients who want something beyond the basics.',
    icon: 'pen-tool',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: "Clean and comfortable. I've been going to them for years. They take pride in the their appearance. They take almost all payment methods and will have looking and feeling like a million bucks.",
    author: 'Tyrie Masten',
    rating: 5,
    source: 'google',
  },
  {
    text: "I've been going here for over 15yrs and it's always been an excellent and professional barbershop! I go to Bryant and he's great. The owner Chuck is a great guy and runs a clean shop 💯",
    author: 'K "K-Roc" P',
    rating: 5,
    source: 'google',
  },
  {
    text: "Took my 10 year old son there and was immediately greeted by GEE da barber. He was friendly but mannnn he has skills!! My son loved his service and even more, I loved the cut! Affordable, friendly, and skillful. Don't get any better. Thanks GEE, we will be back just for you!",
    author: 'Penny Roll Crafts',
    rating: 5,
    source: 'google',
  },
  {
    text: "Pretty chill shop with laid back barbers. I didn't give 5 stars only because I'm brand new there so I'm still feeling the vibe out.",
    author: 'Isaiah Jones',
    rating: 4,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.5, suffix: '★', label: 'Average Customer Rating' },
  { value: 326, suffix: '+', label: 'Customer Reviews' },
  { value: 15, suffix: '+ yrs', label: 'Serving West Philadelphia' },
  { value: 6, suffix: ' AM', label: 'Open Early, 6 Days a Week' },
]

const faqItems: FAQItem[] = [
  {
    question: 'What are your hours and do I need an appointment?',
    answer: "Major League Cuts is open Monday through Saturday from 6:00 AM to 9:00 PM, and Sunday from 7:00 AM to 6:00 PM. The early hours make it easy to fit a fresh cut into any schedule.",
  },
  {
    question: 'What payment methods do you accept?',
    answer: "The shop accepts almost all payment methods, so you won't need to worry about stopping at an ATM before your visit. Cash, card, and more are welcome.",
  },
  {
    question: 'Is this a good shop for kids?',
    answer: "Absolutely. GEE da barber is especially well-loved by parents bringing their children in for cuts. Customers describe him as friendly, patient, and seriously skilled with young clients.",
  },
  {
    question: 'Can I request a specific barber?',
    answer: "Yes — many regulars come specifically for Bryant or GEE. If you have a preferred barber, it's always a good idea to call ahead to confirm their schedule.",
  },
]

const businessContact = {
  name: 'Major League Cuts',
  address: '5124 Market St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 747-1119',
  email: '',
  hours: {
    Monday: '6:00 AM – 9:00 PM',
    Tuesday: '6:00 AM – 9:00 PM',
    Wednesday: '6:00 AM – 9:00 PM',
    Thursday: '6:00 AM – 9:00 PM',
    Friday: '6:00 AM – 9:00 PM',
    Saturday: '6:00 AM – 9:00 PM',
    Sunday: '7:00 AM – 6:00 PM',
  },
}

const socialLinks: SocialLinks = {}

// ── Marquee Text Component ──────────────────────────────────────────────────

function MarqueeBanner() {
  const items = [
    'PRECISION CUTS',
    'WEST PHILLY',
    'FRESH FADES',
    'SINCE 2009',
    'CLEAN SHOP',
    'OPEN 6AM',
    'LOOK SHARP',
    'FEEL SHARP',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="mlc-marquee-wrap" aria-hidden="true">
      <div className="mlc-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="mlc-marquee-item">
            {item}
            <span className="mlc-marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Accent Divider ──────────────────────────────────────────────────────────

function AccentDivider() {
  return (
    <div className="mlc-accent-divider">
      <span className="mlc-divider-line" />
      <span className="mlc-divider-icon">✂</span>
      <span className="mlc-divider-line" />
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      {/* ── Navbar ── */}
      <Navbar
        businessName="Major League Cuts"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:2157471119"
      />

      {/* ── Hero ── */}
      <section id="home">
        <HeroSection
          headline="Cuts on Market Street"
          subheadline="West Philly's go-to barbershop — open 6 AM, six days a week."
          ctaText="Call to Book"
          ctaHref="tel:2157471119"
          secondaryCtaText="See Our Work"
          secondaryCtaHref="#gallery"
          rating={4.5}
          reviewCount={326}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* ── Marquee ── */}
      <MarqueeBanner />

      {/* ── Stats (dark) ── */}
      <div className="bg-[#0f1923] text-white">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── Services ── */}
      <section id="services" className="mlc-services-section">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mlc-section-label"
        >
          <span>— What We Do</span>
        </motion.div>
        <ServiceCards
          heading="The Menu"
          subheading="Six services, one address. Sharp work at every station."
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ── About ── */}
      <div id="about" className="mlc-about-dark">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mlc-section-label mlc-section-label--light"
        >
          <span>— The Shop</span>
        </motion.div>
        <AboutSection
          heading="15 Years Running"
          story="Major League Cuts has been a West Philadelphia institution at 5124 Market St for over 15 years. Owner Chuck runs a spotless shop where barbers like Bryant and GEE bring real skill to every chair. Whether you're a first-timer or a longtime regular, you'll leave looking and feeling like a million bucks."
          image={aboutPhoto}
        />
      </div>

      {/* ── Gallery ── */}
      <section id="gallery" className="mlc-gallery-section">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mlc-section-label"
        >
          <span>— Fresh Work</span>
        </motion.div>
        <ImageGallery
          heading="The Portfolio"
          photos={galleryPhotos}
          variant="masonry"
        />
      </section>

      {/* ── Accent Divider ── */}
      <AccentDivider />

      {/* ── Reviews ── */}
      <div id="reviews" className="bg-[#0f1923] text-white mlc-reviews-dark">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mlc-section-label mlc-section-label--light"
        >
          <span>— Real Clients</span>
        </motion.div>
        <TestimonialCarousel
          heading="Word on the Street"
          reviews={reviews}
          variant="featured"
        />
      </div>

      {/* ── FAQ ── */}
      <section id="faq" className="mlc-faq-section dot-pattern">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mlc-section-label"
        >
          <span>— Good to Know</span>
        </motion.div>
        <FAQAccordion
          heading="Common Questions"
          items={faqItems}
        />
      </section>

      {/* ── Contact ── */}
      <div id="contact" className="bg-[#0f1923] text-white">
        <ContactSection
          business={businessContact}
          heading="Find Us"
          showMap={true}
        />
      </div>

      {/* ── Footer ── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      {/* ── Click to Call ── */}
      <ClickToCall phone="(215) 747-1119" />
    </>
  )
}