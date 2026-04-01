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
import type { NavLink, Photo, Service, Review, Stat, FAQItem } from '@/components/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ── Brand tokens ──────────────────────────────────────────────────────────────
// primary: #156cc2   accent: #0ea158

// ── Nav links ─────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ── Photos ────────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-4.webp',
  alt: 'Woman with long wavy hair and glasses smiling outdoors in casual athletic wear',
  category: 'team',
}

const aboutPhoto: Photo = {
  src: '/photos/photo-8.webp',
  alt: 'Child and dog playing on sandy beach under clear blue sky',
  category: 'exterior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-1.webp', alt: 'Happy golden doodle dog sitting in car back seat wearing blue collar and leash', category: 'interior' },
  { src: '/photos/photo-2.webp', alt: 'French Bulldog wearing sweater sitting in wicker basket on couch by window', category: 'interior' },
  { src: '/photos/photo-3.webp', alt: 'Small black dog wearing pink collar and colorful sunflower bandana on patterned rug', category: 'product' },
  { src: '/photos/photo-5.webp', alt: 'Small dog wearing colorful patterned bandana and green leash indoors', category: 'product' },
  { src: '/photos/photo-6.webp', alt: 'Black dog with tongue out lying on wooden floor indoors', category: 'interior' },
  { src: '/photos/photo-7.webp', alt: 'Black Scottish Terrier sitting in gray armchair with city skyline view through window', category: 'interior' },
  { src: '/photos/photo-9.webp', alt: 'Black fluffy small dog standing on colorful patterned rug indoors', category: 'interior' },
  { src: '/photos/photo-10.webp', alt: 'White poodle grooming competition entry showing before and after styling results', category: 'product' },
]

// ── Services ──────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Full Groom & Styling',
    description: 'A complete grooming session including bath, blow-dry, breed-specific or custom haircut, and finishing touches like bandanas or bows.',
    icon: 'scissors',
    image: '/photos/photo-1.webp',
  },
  {
    name: 'Anxiety-Sensitive Grooming',
    description: 'A slow, gentle, one-on-one grooming experience designed specifically for nervous, shy, or rescue dogs who need extra patience and trust-building.',
    icon: 'heart',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Puppy Introduction Grooming',
    description: 'Early grooming sessions that condition young puppies to the grooming process, building comfort and confidence from their very first visit.',
    icon: 'star',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Bath & Brush Out',
    description: 'A thorough bath, conditioning treatment, and professional blow-out to keep your dog clean, fresh, and tangle-free between full grooms.',
    icon: 'droplets',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Nail Trim & Finishing',
    description: 'Nail clipping, filing, and optional ear cleaning or paw pad care as a standalone service or add-on to any groom.',
    icon: 'sparkles',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Breed-Specific Styling',
    description: "Precision cuts tailored to your dog's breed standard or your personal preference, from Goldendoodle trims to Pomeranian shaping and Scottie profiles.",
    icon: 'award',
    image: '/photos/photo-7.webp',
  },
]

// ── Reviews ───────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "We first took our mini Goldendoodle, Vinny, to Emerald K9 Grooming when he was 4 months and Kaley was amazing. She trained Vinny for grooming and always made sure he had a gorgeous cut! We are so thankful to have found such a great groomer to keep our favorite guy looking well.",
    author: 'Nawal Karam',
    rating: 5,
    source: 'google',
  },
  {
    text: "I have been going to Kaley for about 9 months and my experience has been wonderful! I had recently adopted a mature chihuahua with shy and anxious behavior. After reading other reviews, I knew she was the groomer for us! A groomer who specialized in creating a calm, one-on-one...",
    author: 'sean dukes',
    rating: 5,
    source: 'google',
  },
  {
    text: "Kaley's passion and love for dogs helped our pup feel comfortable and safe during his grooms. He's normally anxious about the groomer, but Kaley was patient and gentle enough to create trust and take care of his grooming needs. He always looks dapper leaving her studio.",
    author: 'Lonnie Duffield',
    rating: 5,
    source: 'google',
  },
  {
    text: "My black Pomeranian named Magic always comes home looking impeccable and happy. He used to be very anxious and upset going to the groomer but Kaley is so wonderful with him that his fear has practically disappeared. All time best groomer!",
    author: 'octopusalien',
    rating: 5,
    source: 'google',
  },
  {
    text: "Babette Loves Kaley. She is the best groomer and handler in town. 💚 She is Patient, kind and highly skilled. Babette says she has the best treats too. We appreciate the extra care she takes with our little hippo.✨",
    author: 'Laura Iler',
    rating: 5,
    source: 'google',
  },
]

// ── Stats ─────────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 4.9, suffix: '★', label: 'Average Star Rating' },
  { value: 37, suffix: '+', label: 'Verified Customer Reviews' },
  { value: 100, suffix: '%', label: 'One-on-One Grooming Sessions' },
  { value: 5, suffix: '+', label: 'Years Serving Portland Dogs' },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'My dog is really anxious about grooming. Can Kaley still help?',
    answer: "Absolutely — anxious and fearful dogs are actually something Kaley specializes in. Multiple clients have brought in rescue dogs and seniors with real grooming anxiety, and Kaley's slow, patient, one-on-one approach has transformed those experiences completely.",
  },
  {
    question: 'Do you work with puppies who have never been groomed before?',
    answer: "Yes, and starting early is actually ideal. Kaley worked with Vinny the mini Goldendoodle from just 4 months old, training him gently so that grooming felt normal and safe from the very beginning.",
  },
  {
    question: 'What makes Emerald K9 different from a typical grooming salon?',
    answer: "Emerald K9 is a private, one-on-one studio — not a high-volume shop. Kaley sees one dog at a time, which keeps the environment quiet, calm, and stress-free. Your dog isn't crated next to strangers for hours.",
  },
  {
    question: 'How often should I bring my dog in for grooming?',
    answer: "It depends on your dog's breed, coat type, and lifestyle, but most clients with doodles, poodles, and similar breeds visit every 6–8 weeks. Kaley will give you a personalized recommendation at your first visit.",
  },
]

// ── Contact object ─────────────────────────────────────────────────────────────
const businessContact = {
  name: 'Emerald K9',
  address: '1720 NW Lovejoy St ste 112',
  city: 'Portland',
  state: 'OR',
  zip: '97209',
  phone: '(971) 413-5772',
  email: '',
}

// ── Marquee reviews data (for the scrolling strip) ────────────────────────────
const marqueeItems = [
  '"Calm, one-on-one grooming"',
  '★★★★★ 4.9 Rating',
  '"His fear has practically disappeared"',
  'Portland\'s Anxiety-Specialist Groomer',
  '"Always looks dapper leaving her studio"',
  'Private Studio · One Dog at a Time',
  '"Best groomer and handler in town 💚"',
]

export default function EmeraldK9Page() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  return (
    <>
      {/* ── CSS custom properties ── */}
      <div
        style={{
          '--brand-primary': '#156cc2',
          '--brand-accent': '#0ea158',
          '--brand-text': '#0f1c2e',
        } as React.CSSProperties}
      />

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <Navbar
        businessName="Emerald K9"
        links={navLinks}
        ctaText="Book a Groom"
        ctaHref="#contact"
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section id="home">
        <HeroSection
          headline="Calm Hands. Happy Dogs."
          subheadline="Private, one-on-one grooming for anxious, sensitive, and beloved dogs in Portland."
          ctaText="Book a Groom"
          ctaHref="#contact"
          secondaryCtaText="See Services"
          secondaryCtaHref="#services"
          rating={4.9}
          reviewCount={37}
          variant="split"
          foregroundImage={heroPhoto}
        />
      </section>

      {/* ── Scrolling Marquee Strip ───────────────────────────────────────── */}
      <div className="ek9-marquee-strip" aria-hidden="true">
        <div className="ek9-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="ek9-marquee-item">
              {item}
              <span className="ek9-marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div className="bg-[#0f1c2e]">
        <StatsCounter stats={stats} variant="dark" />
      </div>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section id="services" className="ek9-section-light">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          <ServiceCards
            heading="Grooming Services"
            subheading="Every session is private. Every dog gets Kaley's full attention."
            services={services}
            columns={3}
            variant="grid"
          />
        </motion.div>
      </section>

      {/* ── Calm Promise Band ─────────────────────────────────────────────── */}
      <div className="ek9-promise-band">
        <div className="ek9-promise-inner">
          <motion.div
            className="ek9-promise-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="ek9-promise-display">
              One dog. One groomer.
            </motion.p>
            <motion.p variants={fadeUp} className="ek9-promise-sub">
              No cages. No chaos. No strangers nearby.
              <br />
              Just calm hands and a dog who leaves happy.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a href="#contact" className="ek9-promise-btn">
                Reserve Your Session →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section id="about" className="ek9-section-light">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <AboutSection
            heading="About Kaley"
            story="Kaley built Emerald K9 around a simple belief: a scared dog doesn't need a faster groomer — they need a patient one. She works out of a private studio in NW Portland, seeing one dog at a time, which keeps things quiet and stress-free. From 4-month-old puppies to senior rescues with real anxiety, she's built the kind of trust that brings clients back year after year."
            image={aboutPhoto}
          />
        </motion.div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <section id="reviews" className="bg-[#0f1c2e] ek9-dark-reviews">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          <TestimonialCarousel
            heading="Real Dogs. Real Results."
            reviews={reviews}
            variant="scroll"
          />
        </motion.div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      <section id="gallery" className="ek9-section-light">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <ImageGallery
            heading="Happy Pups"
            photos={galleryPhotos}
            variant="masonry"
          />
        </motion.div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section id="faq" className="ek9-faq-wrap">
        <div className="ek9-faq-inner">
          {/* Decorative label */}
          <motion.div
            className="ek9-faq-label"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Common Questions
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
          >
            <FAQAccordion heading="Questions Answered" items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact">
        <ContactSection
          business={businessContact}
          heading="Book a Session"
          showMap={true}
        />
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={{}}
      />

      {/* ── Click-to-call FAB ─────────────────────────────────────────────── */}
      <ClickToCall phone={businessContact.phone} />
    </>
  )
}