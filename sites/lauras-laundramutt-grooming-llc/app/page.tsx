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
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// ── Brand tokens ──────────────────────────────────────────────
const brand = {
  green: '#00A64C',
  teal: '#0091a6',
  dark: '#0f1a13',
}

// ── Data ──────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const heroPhoto: Photo = {
  src: '/photos/photo-2.webp',
  alt: "Storefront of Laura's Laundramutt dog grooming and self-serve bathing business",
  category: 'exterior',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-5.webp',
  alt: 'Pet grooming and self-serve dog wash business storefront with phone number displayed',
  category: 'exterior',
}

const services: Service[] = [
  {
    name: 'Full Grooming Service',
    description:
      "Complete bath, dry, haircut, and styling tailored to your dog's breed and coat type — from poodle cuts to double-coat management.",
    icon: 'scissors',
    image: '/photos/photo-1.webp',
  },
  {
    name: 'Deshedding Treatment',
    description:
      "A targeted deshedding add-on that removes loose undercoat without the inflated pricing you'll find elsewhere — available for all coat types including pomsky and long-haired breeds.",
    icon: 'wind',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Nail Trimming',
    description:
      'Precise nail trimming performed by experienced groomers to keep your dog comfortable and moving well.',
    icon: 'cut',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Self-Serve Dog Wash',
    description:
      'Professional-grade bathing stations with tubs, hoses, and soap machines at one flat rate — perfect for hands-on owners who want pro tools without the pro price tag.',
    icon: 'droplets',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Large Breed Grooming',
    description:
      'Specialized grooming for dogs 70 pounds and up, with groomers experienced in handling big dogs gently and efficiently.',
    icon: 'dog',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Breed-Specific Styling',
    description:
      'Expert styling for breeds with precise grooming standards — including poodles, pomskies, and other coated breeds — done by groomers who know the difference.',
    icon: 'sparkles',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: "Best price I found in the area. They got me in quickly and don't charge crazy amounts to add a deshed for my pomsky. The groom was great and my dog is fresh and clean. I would definitely recommend and will for sure use them again!",
    author: 'Dezi Roberts',
    rating: 5,
    source: 'google',
  },
  {
    text: "They just changed locations, but we've taken our 2 larger dogs (both over 70lb) for years. Carol is our groomer. She does a great job. The dogs like her. She communicates with updates via text. Both dogs, one long hair and one short, come back in great condition.",
    author: 'Jamiere Abney',
    rating: 5,
    source: 'google',
  },
  {
    text: "The best doggie grooming place in Salem as far as I'm concerned. Ariel is the best. She's always accommodating and my dogs love her.",
    author: 'Lori Guidicatti-Evans',
    rating: 5,
    source: 'google',
  },
  {
    text: 'My dog doesn\'t require grooming. I am giving a GREAT review for the washtubs, hoses and soaps machines. Everything works perfectly. Easy to wash your dog. One price for all sizes which is great for any dog over 15 pounds and up.',
    author: 'Susan Egan',
    rating: 5,
    source: 'google',
  },
  {
    text: 'We absolutely love Ariel for our standard poodle! We have been going here for a little over a year and have always left happy!',
    author: 'Chelsie Gutierrez-Garcia',
    rating: 5,
    source: 'google',
  },
]

const stats: Stat[] = [
  { value: 4.7, suffix: '★', label: 'Average Customer Rating' },
  { value: 125, suffix: '+', label: 'Happy Customer Reviews' },
  { value: 5, suffix: ' days', label: 'Open Tue–Sat for Your Convenience' },
  { value: 2, suffix: ' ways', label: 'To Groom — Full Service or Self-Serve' },
]

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-1.webp', alt: "Professional groomer trimming white dog's nails with scissors in salon", category: 'work' },
  { src: '/photos/photo-3.webp', alt: 'Colorful framed watercolor painting of a smiling corgi dog with vibrant rainbow hues', category: 'product' },
  { src: '/photos/photo-4.webp', alt: 'Professional grooming facility interior with bathing tubs, blue mats, and grooming stations', category: 'interior' },
  { src: '/photos/photo-6.webp', alt: 'White poodle dog indoors with grooming supplies visible in background', category: 'interior' },
  { src: '/photos/photo-7.webp', alt: 'Happy golden-brown and white dog smiling at camera on concrete floor indoors', category: 'interior' },
  { src: '/photos/photo-8.webp', alt: 'Interior of a fitness studio with exercise equipment and blue mats on floor', category: 'interior' },
  { src: '/photos/photo-9.webp', alt: 'Professional groomer styling a black and white poodle at grooming salon', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Dog grooming salon window display with three stylized dog portraits and teal lettering', category: 'interior' },
]

const faqItems: FAQItem[] = [
  {
    question: 'How are your prices compared to other groomers in Salem?',
    answer: "Customers consistently call us one of the best-priced options in the area. We don't charge inflated fees for add-ons like deshedding — you get honest, fair pricing every visit.",
  },
  {
    question: 'Can you groom large dogs over 70 pounds?',
    answer: 'Absolutely. Our groomer Carol specializes in large breeds and has years of experience handling dogs well over 70 pounds — gently and efficiently.',
  },
  {
    question: "How do I know what's happening with my dog during their appointment?",
    answer: "Our groomers like Carol keep owners updated via text throughout the grooming session, so you're never left wondering. We believe in real communication.",
  },
  {
    question: 'Do you offer self-serve dog washing, or is it full-service only?',
    answer: 'Both! We have professional self-serve bathing stations with tubs, hoses, and soap machines that are easy to use and well-maintained — one flat rate for all sizes.',
  },
]

const businessContact = {
  name: "Laura's Laundramutt Grooming LLC",
  address: '1705 25th St SE',
  city: 'Salem',
  state: 'OR',
  zip: '97302',
  phone: '(503) 967-6116',
  email: '',
  hours: {
    Monday: 'Closed',
    Tuesday: '9:00 AM – 4:00 PM',
    Wednesday: '9:00 AM – 4:00 PM',
    Thursday: '9:00 AM – 4:00 PM',
    Friday: '9:00 AM – 4:00 PM',
    Saturday: '9:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

const socialLinks: SocialLinks = {}

// ── Floating Paw Decoration ───────────────────────────────────
function FloatingPaws() {
  const paws = [
    { x: '8%', y: '18%', size: 28, rotate: -15, delay: 0 },
    { x: '91%', y: '12%', size: 18, rotate: 20, delay: 0.3 },
    { x: '4%', y: '72%', size: 22, rotate: 5, delay: 0.6 },
    { x: '94%', y: '65%', size: 32, rotate: -25, delay: 0.2 },
    { x: '50%', y: '5%', size: 16, rotate: 10, delay: 0.8 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {paws.map((p, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          style={{ left: p.x, top: p.y, rotate: p.rotate }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 64 64" fill={brand.green}>
            <ellipse cx="20" cy="14" rx="7" ry="9" />
            <ellipse cx="44" cy="14" rx="7" ry="9" />
            <ellipse cx="10" cy="30" rx="5" ry="7" />
            <ellipse cx="54" cy="30" rx="5" ry="7" />
            <ellipse cx="32" cy="46" rx="16" ry="14" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// ── Marquee Strip ─────────────────────────────────────────────
function TaglineStrip() {
  const items = [
    'Fresh Pups',
    '✦',
    'Happy Tails',
    '✦',
    'Real People',
    '✦',
    'Salem, OR',
    '✦',
    'Est. Laundramutt',
    '✦',
    'Full Service & Self-Serve',
    '✦',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="laundramutt-strip overflow-hidden bg-[#00A64C] py-3 select-none">
      <div className="laundramutt-marquee flex gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-white font-semibold text-sm tracking-widest uppercase">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Accent Pill ───────────────────────────────────────────────
function Pill({ children, teal }: { children: React.ReactNode; teal?: boolean }) {
  return (
    <span
      className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest uppercase"
      style={{
        background: teal ? `${brand.teal}22` : `${brand.green}18`,
        color: teal ? brand.teal : brand.green,
        border: `1px solid ${teal ? brand.teal : brand.green}44`,
      }}
    >
      {children}
    </span>
  )
}

// ── Section wrapper with fade-up ──────────────────────────────
function FadeUp({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Brand CSS variables */}
      

      <Navbar
        businessName="Laundramutt"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:5039676116"
      />

      {/* ── Hero ── */}
      <section id="home" className="relative">
        <HeroSection
          headline="Salem's Dog Grooming"
          subheadline="Fresh pups, fair prices, and groomers your dog actually likes."
          ctaText="Book a Groom"
          ctaHref="tel:5039676116"
          secondaryCtaText="See Services"
          secondaryCtaHref="#services"
          rating={4.7}
          reviewCount={125}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
        <FloatingPaws />
      </section>

      {/* ── Marquee ── */}
      <TaglineStrip />

      {/* ── Stats — dark ── */}
      <section id="stats">
        <FadeUp>
          <StatsCounter stats={stats} variant="dark" />
        </FadeUp>
      </section>

      {/* ── Services ── */}
      <section
        id="services"
        className="dot-pattern py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-12">
            <Pill>What We Do</Pill>
            <h2
              className="mt-4 text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "'Hedvig Letters Serif', serif", color: brand.dark }}
            >
              Six Ways to Shine
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base">
              Full-service grooming, self-serve stations, and everything in between — at prices that don't make you wince.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <ServiceCards
              heading=""
              services={services}
              columns={3}
              variant="grid"
            />
          </FadeUp>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="py-20 px-4"
        style={{ background: `linear-gradient(135deg, ${brand.dark} 0%, #1a3320 100%)` }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-4">
            <Pill teal>About Us</Pill>
          </FadeUp>
          <FadeUp delay={0.1}>
            <AboutSection
              heading="Real Groomers. Real Results."
              story="Laura's Laundramutt has been a Salem staple for owners of dogs big and small — including 70+ lb breeds that other shops turn away. Groomers like Carol and Ariel build real relationships with your dogs, send text updates during appointments, and keep prices honest. We also run professional self-serve wash stations so hands-on owners get pro tools at a fair flat rate."
              image={aboutPhoto}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <Pill teal>The Shop</Pill>
            <h2
              className="mt-4 text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Hedvig Letters Serif', serif", color: brand.dark }}
            >
              Inside Laundramutt
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <ImageGallery
              heading=""
              photos={galleryPhotos}
              variant="masonry"
            />
          </FadeUp>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        id="reviews"
        className="py-20 px-4"
        style={{ background: `linear-gradient(160deg, #f0fdf4 0%, #e6f7f9 100%)` }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <Pill>Customer Reviews</Pill>
            <h2
              className="mt-4 text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Hedvig Letters Serif', serif", color: brand.dark }}
            >
              Happy Tails
            </h2>
            <p className="mt-3 text-gray-500 text-base max-w-md mx-auto">
              4.7 stars across 125+ Google reviews. Real words from real Salem dog owners.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <TestimonialCarousel
              heading=""
              reviews={reviews}
              variant="scroll"
            />
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        className="py-20 px-4"
        style={{ background: brand.dark }}
      >
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-10">
            <Pill>Questions</Pill>
            <h2
              className="mt-4 text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Hedvig Letters Serif', serif" }}
            >
              Good To Know
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <FAQAccordion heading="" items={faqItems} />
          </FadeUp>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-10">
            <Pill teal>Find Us</Pill>
            <h2
              className="mt-4 text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Hedvig Letters Serif', serif", color: brand.dark }}
            >
              Come See Us
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ContactSection
              business={businessContact}
              heading=""
              showMap={true}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      {/* ── Click to Call ── */}
      <ClickToCall phone="(503) 967-6116" />
    </>
  )
}