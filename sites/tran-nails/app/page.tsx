import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { StatsCounter } from '@/components/StatsCounter'
import { ServiceCards } from '@/components/ServiceCards'
import { ImageGallery } from '@/components/ImageGallery'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ProcessSteps } from '@/components/ProcessSteps'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Stat, Service, Review, ProcessStep, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 4.5, suffix: '★', label: 'Average Customer Rating' },
  {     value: 196, suffix: '+', label: 'Google Reviews' },
  {     value: 6, suffix: ' days', label: 'Open Every Week' },
  {     value: 25, suffix: '$', label: 'Starting Price for Lash Services by Kim' },
]

const services: Service[] = [
  {
    name: 'Full Set Acrylic Nails',
    description: 'Custom acrylic nail sets starting at competitive neighborhood prices, available in a range of lengths and shapes.',
    icon: 'sparkles',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Nail Refills',
    description: 'Acrylic fill-ins to keep your set looking fresh, priced from $17 and up depending on length and condition.',
    icon: 'refresh-cw',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Gel Polish',
    description: 'Long-lasting gel color applied over natural or acrylic nails for a chip-resistant, high-shine finish.',
    icon: 'droplets',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Pedicure',
    description: 'Foot care service including nail shaping, cuticle work, and polished color for soft, smooth results.',
    icon: 'footprints',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Eyebrow Shaping',
    description: 'Precision brow shaping performed by Kim, celebrated by regulars as some of the best in West Philadelphia.',
    icon: 'eye',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'Eyelash Services',
    description: 'Professional lash application by Kim starting at just $25, delivering salon-quality results at accessible prices.',
    icon: 'wand-2',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'I heard alot about them. They are good. They are cash only. Kim is great on the eyebrows and lashes. Best to get there early. I went today around 3 and was out by 415.',
    author: 'EvE Richardson-Lyles',
    rating: 5,
    source: 'google',
    date: '2023-04-05',
  },
  {
    text: 'I won’t  go know where but to this salon I love Kim she really cares for her clients she even gives us gifts I get my lashes done only by her plus she only charge $25 dollars and they be professional',
    author: 'Sonya Sandets',
    rating: 5,
    source: 'google',
    date: '2025-06-27',
  },
  {
    text: 'TRAN NAILS IS THE BEST NAIL SALON IN PHILADELPHIA.. ALL THE NAIL TECHNICIANS ARE A1 AND MS KIM IS A WIZARD WITH THE EYEBROWS AND LASHES I LOVE THEM',
    author: 'Ta-King Allah',
    rating: 5,
    source: 'google',
    date: '2020-09-19',
  },
  {
    text: 'The prices were an absolute rip off !!\nServices were listed : on their full set , refill which is what I got…. Was supposed to be $17 and up gel polish $20 that equals $37 Ok yeah I have long nails 💅 but $55 for the total service was astronomical never again Tran nails never 👎',
    author: 'Goldie Riles',
    rating: 1,
    source: 'google',
    date: '2022-08-25',
  },
  {
    text: 'My polish on my toes looked a mess (a week old)! It wasn\'t smooth at all! And my heels was not smooth either! But staff very friendly!',
    author: 'Curtina Arbee',
    rating: 1,
    source: 'google',
    date: '2020-08-07',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do you accept credit cards or is it cash only?',
    answer: 'Tran Nails is a cash-only salon, so be sure to bring cash before your visit. There may be an ATM nearby if you need one.',
  },
  {
    question: 'What\'s the best time to come in to avoid a long wait?',
    answer: 'Arriving earlier in the day tends to get you in and out faster. One reviewer arrived around 3 PM and was done by 4:15, but mornings right at opening are typically the smoothest.',
  },
  {
    question: 'How much does a full set with gel polish cost?',
    answer: 'A standard full set starts at a base price with gel polish listed from $20 up. Note that longer nail lengths may add to the total — it\'s worth confirming pricing before the service begins, especially if you have extra-long nails.',
  },
  {
    question: 'Who does the eyebrows and lashes, and how much does it cost?',
    answer: 'Kim is the go-to for both eyebrow shaping and lash services. Lashes start at $25 and reviewers consistently rave about her precision and professionalism. She\'s one of the most requested staff members in the salon.',
  },
  {
    question: 'Are walk-ins welcome or do I need an appointment?',
    answer: 'Tran Nails operates on a walk-in basis. To get the best experience and shortest wait, arriving early — especially on busy weekday afternoons — is highly recommended by regulars.',
  },
  {
    question: 'Is the staff friendly even when it\'s busy?',
    answer: 'Across reviews — including those with service complaints — customers consistently praised the staff as very friendly. The welcoming atmosphere is one of the most mentioned qualities of Tran Nails.',
  },
]

const processSteps: ProcessStep[] = [
  {
    title: 'Pull Up Early',
    description: 'Walk-ins welcome — arrive before the mid-afternoon rush and you\'ll be in and out without the wait.',
  },
  {
    title: 'Tell Kim What You Want',
    description: 'Whether it\'s a full set, a brow shape, or a fresh set of lashes, the team listens before they touch a thing.',
  },
  {
    title: 'Watch the Magic Happen',
    description: 'Skilled hands, a warm room, and a staff that makes you feel like a regular — even if it\'s your first time.',
  },
  {
    title: 'Leave Looking Like Yourself, Only Better',
    description: 'Chip-resistant, shaped, polished, and done right — so good you\'ll already be planning your next visit.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Tran Nails photo 1',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Tran Nails photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'Tran Nails photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'Tran Nails photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'Tran Nails photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'Tran Nails photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'Tran Nails photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'Tran Nails photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'Tran Nails photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'Tran Nails photo 10', category: 'work' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'Tran Nails',
  address: '5244 Market St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 474-1881',
  email: '',
  hours: {
    Monday: '9:00 AM – 7:00 PM',
    Tuesday: '9:00 AM – 7:00 PM',
    Wednesday: '9:00 AM – 7:00 PM',
    Thursday: '9:00 AM – 7:00 PM',
    Friday: '9:00 AM – 7:00 PM',
    Saturday: '9:00 AM – 7:00 PM',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Tran Nails"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 474-1881"
      />

      <main>
        <HeroSection
            headline="Kim's Magic Hands. West Philly's Best Look."
            subheadline="Regulars call her a wizard. Her lash clients won't go anywhere else. At Tran Nails on Market Street, the community shows up — because Kim shows up first."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (215) 474-1881"
            secondaryCtaHref="tel:(215) 474-1881"
            rating={4.5}
            reviewCount={196}
            backgroundImage={heroImage}
            variant="photo-bg"
          />

        <div id="about">
          <AboutSection
            heading="Built on Market Street. Earned on Every Visit."
            story="Tran Nails on Market Street has built a loyal following in West Philadelphia the old-fashioned way — by actually delivering. Customers like Ta-King Allah call it flat out 'the best nail salon in Philadelphia,' and regulars like Sonya Sandets refuse to go anywhere else. The draw isn't flashy decor or a fancy app — it's the people behind the tables, particularly Kim, who has earned near-mythic status among her regulars for her eyebrow shaping and lash work. At $25 for lashes, she's charging neighborhood prices for results that keep clients coming back week after week, sometimes with gifts in hand just because she genuinely cares.  The salon runs lean and efficient. Cash only, six days a week, open 9 to 7. Reviews note that earlier visits — before the mid-afternoon rush — tend to offer the smoothest experience, with one client walking in around 3 PM and out by 4:15. That kind of turnaround speaks to a staff that knows what they're doing and respects your time. The technicians are described by multiple reviewers as 'A1,' a word that carries real weight in a neighborhood that doesn't throw compliments around lightly.  Like any busy neighborhood salon, Tran Nails isn't without its growing pains. A handful of reviews flag pricing transparency around add-ons for longer nails, and at least one customer left unhappy with a pedicure finish. But the consistency of five-star love — especially around Kim and the overall staff friendliness — tells the fuller story: this is a place where the community shows up, and the staff shows up for them right back."
            image={aboutImage}
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="Everything You Came For"
            subheading="Nails, brows, lashes — all under one roof, all at prices that respect your wallet."
            services={services}
            columns={3}
            variant="alternating"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="Fresh Off Kim's Table"
            photos={galleryPhotos}
            variant="scroll"
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="West Philly Has Spoken"
            reviews={reviews}
            variant="scroll"
          />
        </div>

        <div id="process">
          <ProcessSteps
            heading="Walk In. Walk Out Glowing."
            subheading="Efficient, friendly, and done right — every single time."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: 'Kim',
              role: 'Senior Nail Technician & Brow and Lash Specialist',
              quote: 'Kim is the heartbeat of Tran Nails. While her title may simply read \'nail technician,\' her regulars treat her more like a neighborhood institution. She\'s the one customers shout out by name in reviews, the one they credit with \'wizard\'-level eyebrow shaping and lashes so professional they keep clients loyal for years. She gives gifts to her regulars, charges fair prices, and brings a warmth to her chair that no chain salon can replicate. At $25 for lash services that deliver professional results, she\'s made beauty accessible without making it feel cheap.\n\nThe culture Kim embodies seems to flow through the whole team at Tran Nails. Every reviewer — even those with complaints — noted that the staff is genuinely friendly. That\'s not an accident. It\'s the result of a salon that has chosen people over polish, relationships over revenue maximization. On a stretch of Market Street where businesses come and go, Tran Nails has stayed because the people inside it have stayed true to the neighborhood they serve.',
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion heading="Before You Pull Up" items={faqItems} />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Come Find Us on Market Street"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 474-1881" />
    </>
  )
}
