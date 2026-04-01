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

// ─── Brand tokens ───────────────────────────────────────────────────────────
const brand = {
  green: '#00A64C',
  teal: '#0091a6',
}

// ─── Nav ────────────────────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// ─── Hero ────────────────────────────────────────────────────────────────────
const heroPhoto: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Dogs playing in indoor facility with agility equipment and tunnels.',
  category: 'interior',
}

// ─── Services ────────────────────────────────────────────────────────────────
const services: Service[] = [
  {
    name: 'Full Groom & Style',
    description:
      'Complete breed-specific grooming including bath, blow-dry, cut, and finishing touches — delivered to show-quality standards.',
    icon: 'scissors',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Bath & Blowout',
    description:
      'Deep cleansing bath followed by professional blow-dry that leaves even heavy double coats soft, silky, and shed-reduced.',
    icon: 'wind',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Nail Trim & Paw Care',
    description:
      'Precise nail trimming for dogs and cats of all sizes and temperaments, keeping paws healthy and comfortable.',
    icon: 'paw-print',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Senior Pet Grooming',
    description:
      'Gentle, patient grooming sessions tailored to older dogs who need extra time, care, and comfort throughout the process.',
    icon: 'heart',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Anxiety-Friendly Grooming',
    description:
      'Slow-introduction grooming for nervous or reactive pets, including acclimation time with the space and other animals before any grooming begins.',
    icon: 'shield',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Indoor Doggie Play & Socialization',
    description:
      'A safe, supervised indoor play area with agility equipment and tunnels where dogs can socialize, play, and burn energy.',
    icon: 'play',
    image: '/photos/photo-7.webp',
  },
]

// ─── About ───────────────────────────────────────────────────────────────────
const aboutPhoto: Photo = {
  src: '/photos/photo-8.webp',
  alt: 'Fluffy white dog with tongue out relaxing on couch with blankets',
  category: 'interior',
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    text: "I have to say, I've been very pleased with Nails to Tails when they groom my show girl, Ruby. I know she's going to be pampered and groomed to perfection. Nails to Tails is always a winner!",
    author: 'Christine Parker',
    rating: 5,
    source: 'google',
  },
  {
    text: 'Ashley did a fantastic job with my senior dog! He looks amazing! I will definitely bring him back. Nails to Tails is the best!',
    author: 'Laina Morris',
    rating: 5,
    source: 'google',
  },
  {
    text: 'I absolutely love Crystal! She is so good with my dog Manny ❤️ She always makes him look so handsome and he is always happy with her. So glad we found her!',
    author: 'Karen Bergren',
    rating: 5,
    source: 'google',
  },
  {
    text: "I just moved to the area from NY and took my Shih Tzu for a full groom at a big box store. She got spooked, they couldn't give her full service and she ended up looking awful. I brought her to Nails and Tails and Cody did an awesome job cleaning up the mess. She took extra time t...",
    author: 'Carol Kamph',
    rating: 5,
    source: 'google',
  },
  {
    text: "Took my German Shepard husky mix dog here. She's 9 y/o. The amount of hair she sheds could supply a platoon a full set of winter coats. After her bath and blow out, her hair was soft like silk, nails were trimmed, and she smelt like a new dog.",
    author: 'MrJdub454',
    rating: 5,
    source: 'google',
  },
]

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: 5, suffix: '★', label: 'Perfect Rating on Google' },
  { value: 41, suffix: '+', label: 'Five-Star Reviews' },
  { value: 7, suffix: ' days', label: 'Open Every Day of the Week' },
  { value: 3, suffix: '+', label: 'Named Groomers Trusted by Clients' },
]

// ─── Gallery ─────────────────────────────────────────────────────────────────
const galleryPhotos: Photo[] = [
  { src: '/photos/photo-2.webp', alt: 'Dark curly-haired dog sitting indoors wearing a collar with ID tag', category: 'product' },
  { src: '/photos/photo-3.webp', alt: 'Small tan and white Chihuahua wearing red plaid pajamas on tile floor', category: 'product' },
  { src: '/photos/photo-4.webp', alt: 'Light-colored dog being shown at competition with handler holding number six', category: 'product' },
  { src: '/photos/photo-5.webp', alt: 'Black cat wearing blue collar with bell pendant indoors', category: 'product' },
  { src: '/photos/photo-6.webp', alt: "Close-up of a boxer dog's face with mouth open, looking directly at camera.", category: 'product' },
  { src: '/photos/photo-7.webp', alt: 'White fluffy dog wearing purple tie sitting on floral wingback chair', category: 'product' },
  { src: '/photos/photo-9.webp', alt: 'Two dogs playing inside a business entrance near glass doors and windows', category: 'interior' },
  { src: '/photos/photo-10.webp', alt: 'Black poodle with pink collar and bell tag sitting on rocky forest ground', category: 'product' },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqItems: FAQItem[] = [
  {
    question: 'My dog had a bad experience at another groomer. Can you help?',
    answer:
      "Absolutely — this is one of the things Nails To Tails does best. Groomer Cody is known for taking extra time to let anxious pets adjust to the space before any grooming begins. Many clients come to us after difficult experiences elsewhere and leave thrilled.",
  },
  {
    question: 'Do you groom show dogs?',
    answer:
      "Yes! Several of our groomers have experience delivering competition-quality results. Christine Parker brings her show dog Ruby here and trusts us to groom her to perfection every time.",
  },
  {
    question: 'Can you handle heavy shedders and double-coated breeds?',
    answer:
      "We sure can. One happy customer brought in a 9-year-old German Shepherd-Husky mix — a legendary shedder — and left with a dog whose coat was soft as silk. Our bath and blowout service is built for exactly this.",
  },
  {
    question: 'Do you groom senior dogs?',
    answer:
      "Yes, and we take it seriously. Groomer Ashley specializes in gentle handling for older dogs who may need a slower pace or extra patience. Your senior pet is in good hands.",
  },
]

// ─── Contact ─────────────────────────────────────────────────────────────────
const businessContact = {
  name: 'Nails To Tails & Doggie Solutions LLC pet care center',
  address: '2191 Kings Hwy',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 500-1775',
  email: '',
  hours: {
    Monday: '9:00 AM – 6:00 PM',
    Tuesday: '9:00 AM – 6:00 PM',
    Wednesday: '9:00 AM – 6:00 PM',
    Thursday: '9:00 AM – 6:00 PM',
    Friday: '9:00 AM – 6:00 PM',
    Saturday: '9:00 AM – 6:00 PM',
    Sunday: '9:00 AM – 6:00 PM',
  },
}

const socialLinks: SocialLinks = {}

// ─── Animation helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function Page() {
  return (
    <>
      {/* Google Fonts */}
      

      {/* Decorative paw-print SVG pattern layer — absolutely positioned, no layout impact */}
      <div className="paw-pattern-bg" aria-hidden="true" />

      <Navbar
        businessName="Nails To Tails"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:+15415001775"
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home">
        <HeroSection
          headline="Nails To Tails"
          subheadline="Medford's pet care center — open 7 days a week."
          ctaText="Book a Groom"
          ctaHref="tel:+15415001775"
          secondaryCtaText="See Services"
          secondaryCtaHref="#services"
          rating={5}
          reviewCount={41}
          variant="photo-bg"
          backgroundImage={heroPhoto}
        />
      </section>

      {/* ── MARQUEE TRUST BAR ─────────────────────────────────────────────── */}
      <div className="trust-bar-wrapper bg-[#00A64C] overflow-hidden py-3 relative">
        <div className="trust-bar-track flex gap-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="trust-bar-inner flex items-center gap-10 shrink-0 px-10">
              {[
                '★ 5.0 on Google',
                '✂ Show-Quality Grooming',
                '🐾 Open 7 Days',
                '❤ Senior-Friendly',
                '🛡 Anxiety-Safe',
                '🎾 Indoor Play Area',
              ].map((item, j) => (
                <span
                  key={j}
                  className="whitespace-nowrap text-white font-semibold tracking-wide text-sm uppercase"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS — dark ────────────────────────────────────────────────────── */}
      <section id="stats" className="bg-[#111827]">
        <StatsCounter stats={stats} variant="dark" />
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="py-24 bg-[#f8faf9] dot-pattern relative"
      >
        <motion.div
          className="container mx-auto px-4 text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-[#00A64C] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What We Offer
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Every Service, <span className="text-[#00A64C]">Every Pet.</span>
          </h2>
          <p className="mt-4 text-[#4b5563] max-w-xl mx-auto text-base leading-relaxed">
            From show-dog styling to senior-gentle baths — we handle it all, seven days a week.
          </p>
        </motion.div>
        <ServiceCards
          heading=""
          services={services}
          columns={3}
          variant="grid"
        />
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-0">
        <AboutSection
          heading="Groomed With Heart"
          story="Nails To Tails started with a simple belief: every pet deserves a groomer who actually cares. Whether it's Ruby the show dog, a nervous rescue, or a 9-year-old husky shedding enough fur to stuff a winter coat — our groomers take the time your pet needs. We're at 2191 Kings Hwy in Medford, and we're here every single day."
          image={aboutPhoto}
        />
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────────────────── */}
      <section
        id="reviews"
        className="bg-[#111827] py-20"
      >
        <motion.div
          className="container mx-auto px-4 text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-[#00A64C] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Happy Clients
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Real Words. Real Pets.
          </h2>
        </motion.div>
        <TestimonialCarousel
          heading=""
          reviews={reviews}
          variant="scroll"
        />
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-24 bg-white">
        <motion.div
          className="container mx-auto px-4 text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-[#0091a6] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Paw Prints & Pretty Coats
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Finished Look
          </h2>
        </motion.div>
        <ImageGallery
          heading=""
          photos={galleryPhotos}
          variant="masonry"
        />
      </section>

      {/* ── PLAYFUL CTA BAND ─────────────────────────────────────────────── */}
      <div className="cta-band relative overflow-hidden bg-[#0091a6] py-16 px-6 text-center">
        {/* decorative circles */}
        <span className="cta-blob cta-blob-1" aria-hidden="true" />
        <span className="cta-blob cta-blob-2" aria-hidden="true" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pampered Pets.{' '}
            <span className="text-[#d4f5e4]">Every Nail. Every Tail.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/80 text-base max-w-md">
            Call us or stop by — we're open Monday through Sunday, 9 AM to 6 PM.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="tel:+15415001775"
            className="cta-btn-pill"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            📞 (541) 500-1775
          </motion.a>
        </motion.div>
      </div>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-[#f8faf9]">
        <motion.div
          className="container mx-auto px-4 text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-[#00A64C] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Common Questions
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Good To Know
          </h2>
        </motion.div>
        <FAQAccordion heading="" items={faqItems} />
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact">
        <ContactSection
          business={businessContact}
          heading="Find Us in Medford"
          showMap={true}
        />
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      {/* ── CLICK-TO-CALL ─────────────────────────────────────────────── */}
      <ClickToCall phone="(541) 500-1775" />
    </>
  )
}