import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { StatsCounter } from '@/components/StatsCounter'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { ImageGallery } from '@/components/ImageGallery'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Stat, Review, Service, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'Reviews', href: '#reviews' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 5, suffix: '★', label: 'Average Rating Across All Reviews' },
  {     value: 16, suffix: '+', label: 'Happy Families Reviewed' },
  {     value: 8, suffix: ' weeks', label: 'Youngest Age We Welcome' },
  {     value: 2, suffix: ' languages', label: 'English & Spanish Daily Immersion' },
]

const services: Service[] = [
  {
    name: 'Infant Care',
    description: 'Specialized one-on-one care for babies as young as eight weeks, including tummy time, sensory play, safe sleep practices, and feeding tracking via parent app.',
    icon: 'baby',
    image: '/photos/photo-2.webp',
  },
  {
    name: 'Toddler & Preschool Program',
    description: 'A structured yet playful daily program focused on motor skill development, educational play, and age-appropriate activities in a bright, stimulating classroom environment.',
    icon: 'blocks',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Spanish Immersion',
    description: 'Daily Spanish language exposure woven naturally into routines, songs, and conversation — giving children an early bilingual foundation regardless of their home language.',
    icon: 'languages',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Healthy Meals Program',
    description: 'Nutritious, child-friendly meals served daily in a colorful dining space, supporting children\'s energy, focus, and overall well-being throughout the day.',
    icon: 'apple',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Outdoor Play & Movement',
    description: 'Daily outdoor time in a secure backyard featuring playground equipment, a shaded pergola, and open space for active, joyful play in the fresh air.',
    icon: 'trees',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Parent Communication App',
    description: 'Real-time updates on feedings, diaper changes, naps, and daily activities — plus photo uploads — so parents stay connected and confident throughout the day.',
    icon: 'smartphone',
    image: '/photos/photo-7.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'I truly couldn\'t be happier with The Peques Tribe Day Care. As a dad, finding a place where you can leave your children with complete peace of mind is priceless—and that is precisely what I found here.\n\nFrom day one, you can feel the love, dedication, and professionalism they put into everything they do. The environment is warm, clean, and safe; plus, it features a fantastic outdoor space where the children can play and grow up happy.\n\nWhat I value most is the personalized attention: they genuinely care about every child—about their well-being and their development. My children arrive happy and leave even happier, which says it all.\n\nI highly recommend this place to any family looking for a reliable, caring, and high-quality daycare. A true joy in the community! 💛',
    author: 'Angelo Verdejo',
    rating: 5,
    source: 'google',
    date: '2026-03-20',
  },
  {
    text: 'We love Sabrina! I was very nervous when I found out that I would have to find daycare for my eight week old baby girl, but Sabrina eased all of my nerves! She is welcoming and loving. I never worry when my baby is with her! She notifies me through an app anytime she feeds the baby or changes her diaper so I can know how the day went. She also uploads pictures that she takes of activities that she does with the kids which is my favorite part. They play outside a lot when it is sunny, and she has been amazing at giving my baby tummy time and sensory play. She is very careful about safe sleeping for nap time as well. An added bonus is the Spanish immersion that the baby gets since we are an English speaking household. I would recommend her to anyone looking for a small daycare with lots of one-on-one care! ❤️',
    author: 'Miranda Elliott',
    rating: 5,
    source: 'google',
    date: '2026-03-20',
  },
  {
    text: 'We love The Peques Tribe Day Care! It’s a small, caring environment and I really appreciate the healthy meals and activities that support motor skill development. My daughter is happy and well cared for here!',
    author: 'Yaquelin Quintero',
    rating: 5,
    source: 'google',
    date: '2026-03-19',
  },
  {
    text: 'I love the way they treat the children—their kindness and the heart they put into the care they provide.',
    author: 'Maria Acevedo',
    rating: 5,
    source: 'google',
    date: '2026-03-19',
  },
  {
    text: 'A welcoming, highly recommended and reliable place.',
    author: 'Seba Nassar',
    rating: 5,
    source: 'google',
    date: '2026-03-24',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'How young of a baby can you accept?',
    answer: 'We accept infants as young as eight weeks old. Sabrina has extensive experience with newborn and infant care, including tummy time routines, sensory play, and strict safe sleeping protocols during nap time.',
  },
  {
    question: 'How will I know what my child did during the day?',
    answer: 'We use a parent communication app that logs every feeding, diaper change, and nap in real time. Sabrina also uploads photos of activities throughout the day so you feel connected even when you\'re at work.',
  },
  {
    question: 'Is this a large daycare center or a small home setting?',
    answer: 'The Peques Tribe is intentionally small — a warm, home-based daycare designed for personalized, one-on-one attention. Parents consistently praise the intimate environment as one of our biggest strengths.',
  },
  {
    question: 'Do you offer Spanish immersion?',
    answer: 'Yes! Spanish is woven naturally into our daily routines, conversations, and activities. This is a wonderful benefit even for English-speaking families — children absorb a second language effortlessly at this age.',
  },
  {
    question: 'Are meals provided, and are they healthy?',
    answer: 'Yes, we provide healthy meals and snacks each day. Families appreciate knowing their children are eating well without any extra preparation on busy mornings.',
  },
  {
    question: 'What does a typical day look like for the children?',
    answer: 'Days at The Peques Tribe include structured learning activities, sensory and motor skill play, outdoor time in our backyard playground, meals, and plenty of creative play — all in a safe, clean, and loving environment.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Backyard with playground equipment, wooden deck, and shaded pergola area',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-9.webp',
  alt: 'Daycare window display with colorful decorations and children\'s artwork visible through glass',
  category: 'exterior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-2.webp', alt: 'Nursery room with wooden rocking chair, portable crib, and moon wall decal', category: 'interior' },
  { src: '/photos/photo-3.webp', alt: 'Bright, spacious daycare or preschool classroom with toys, storage, and child-sized furniture.', category: 'interior' },
  { src: '/photos/photo-4.webp', alt: 'Colorful children\'s dining room with blue table, red chairs, and fruit wall decals', category: 'interior' },
  { src: '/photos/photo-5.webp', alt: 'Yellow and white residential basketball hoop in sunny backyard with fence and trees', category: 'product' },
  { src: '/photos/photo-6.webp', alt: 'Bright indoor playroom with circus tent, climbing structure, and educational toys', category: 'interior' },
  { src: '/photos/photo-7.webp', alt: 'Baby in pink outfit lying in white and pink portable play yard with toys', category: 'product' },
  { src: '/photos/photo-8.webp', alt: 'Colorful wooden puppet theater toy with clock, red curtains, and puppet characters.', category: 'product' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'The Peques Tribe Day Care',
  address: '2014 E McAndrews Rd',
  city: 'Medford',
  state: 'OR',
  zip: '97504',
  phone: '(541) 690-7974',
  email: '',
  hours: {
    Monday: '7:30 AM – 5:00 PM',
    Tuesday: '7:30 AM – 5:00 PM',
    Wednesday: '7:30 AM – 5:00 PM',
    Thursday: '7:30 AM – 5:00 PM',
    Friday: '7:30 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="The Peques Tribe Day Care"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(541) 690-7974"
      />

      <main>
        <HeroSection
            headline="Where Little Ones Arrive Happy, Leave Happier"
            subheadline="The Peques Tribe is a second home — not a waiting room. Sabrina and her team know every child by name, by need, and by heart. Complete peace of mind isn't a promise here. It's the standard."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (541) 690-7974"
            secondaryCtaHref="tel:(541) 690-7974"
            rating={5}
            reviewCount={16}
            backgroundImage={heroImage}
            variant="photo-bg"
          />

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="reviews">
          <TestimonialCarousel
            heading="Straight From the Parents' Hearts"
            reviews={reviews}
            variant="featured"
          />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="Everything Your Child Needs to Thrive"
            subheading="From first feedings to first words in Spanish — we've thought of it all."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="about">
          <AboutSection
            heading="A Place Built on Genuine Care"
            story="The Peques Tribe Day Care isn't just a place to drop off your kids — it's a second home where every child is genuinely known. Parents like Angelo Verdejo describe the feeling the moment they walk in: warmth, cleanliness, and a level of professionalism that gives dads and moms complete peace of mind. The outdoor space — a sunny backyard with playground equipment, a shaded pergola, and even a basketball hoop — tells you immediately that this is a place designed for children to actually live, move, and thrive, not just wait out the day.  At the heart of it all is Sabrina, whose care for even the youngest babies is nothing short of extraordinary. When Miranda Elliott discovered she needed childcare for her eight-week-old daughter, Sabrina didn't just accept the challenge — she eliminated every worry. She tracks feedings and diaper changes through a real-time app, uploads photos of sensory play and tummy time sessions, and practices safe sleeping protocols without being asked. For families in the Medford area, this level of transparency and attentiveness is rare. Parents don't just trust Sabrina — they brag about her.  What makes The Peques Tribe genuinely different is its commitment to small-group, personalized care paired with a Spanish immersion environment that gives children a cultural and linguistic edge from infancy. Healthy meals, motor skill development activities, and a colorful, circus-tent-filled indoor playroom round out an experience that parents describe as 'a true joy in the community.' Children arrive happy here. And according to every parent who's walked through that door — they leave even happier."
            image={aboutImage}
          />
        </div>

        <div id="gallery" className="bg-[var(--brand-bg-alt)]">
          <ImageGallery
            heading="Real Moments, Real Joy"
            photos={galleryPhotos}
            variant="scroll"
          />
        </div>

        <div id="founder">
          <FounderQuote
            founder={{
              name: 'Sabrina',
              role: 'Lead Caregiver & Founder',
              quote: 'Sabrina built The Peques Tribe Day Care on a simple but powerful belief: that every child deserves to be seen, not just supervised. She created a small, intentional daycare environment — intimate enough for real relationships, structured enough for real development. From the nursery with its rocking chair and moon-lit walls to the bright classroom stocked with educational toys, every detail reflects her philosophy that childhood is sacred and caregiving is a calling, not just a job.\n\nSabrina\'s approach blends professional rigor with genuine warmth. She uses a parent communication app so families never feel out of the loop, incorporates Spanish into daily life to give children early bilingual exposure, and designs sensory play and motor skill activities tailored to each child\'s stage. Parents who were nervous wrecks on day one become her biggest advocates. That transformation — from anxiety to trust — is exactly what she set out to create when she opened The Peques Tribe.',
            }}
          />
        </div>

        <div id="faq" className="bg-[var(--brand-bg-alt)]">
          <FAQAccordion heading="Questions Every Good Parent Should Ask" items={faqItems} />
        </div>

        <div id="contact">
          <ContactSection
            business={businessContact}
            heading="Your Child's Second Home Is Ready"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(541) 690-7974" />
    </>
  )
}
