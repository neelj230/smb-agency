import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { StatsCounter } from '@/components/StatsCounter'
import { AboutSection } from '@/components/AboutSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Service, Stat, Review, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 5, suffix: '★', label: 'Perfect Rating on Google' },
  {     value: 36, suffix: '+', label: 'Verified 5-Star Reviews' },
  {     value: 100, suffix: '%', label: 'Five-Star Review Rate' },
  {     value: 8, suffix: 'AM', label: 'On-Time Arrival, Every Time' },
]

const services: Service[] = [
  {
    name: 'Weekly Recurring Cleaning',
    description: 'Consistent, scheduled weekly cleaning that keeps your home spotless without you lifting a finger — the same reliable team every visit.',
    icon: 'calendar-check',
  },
  {
    name: 'Deep Home Cleaning',
    description: 'A thorough, top-to-bottom clean covering every room with meticulous attention to detail, ideal for first-time clients or seasonal refreshes.',
    icon: 'sparkles',
  },
  {
    name: 'Home Organization & Tidying',
    description: 'Beyond cleaning, the team helps reorganize cluttered spaces to make your home feel truly ordered and functional — often offered at no extra charge.',
    icon: 'layout-grid',
  },
  {
    name: 'Move-In / Move-Out Cleaning',
    description: 'Complete cleaning of a property before you arrive or after you leave, ensuring every surface is fresh and ready for the next chapter.',
    icon: 'door-open',
  },
  {
    name: 'Custom Cleaning Consultation',
    description: 'A walkthrough of your home to understand its specific needs before any cleaning begins — because every house is different and deserves a tailored approach.',
    icon: 'clipboard-list',
  },
  {
    name: 'One-Time Cleaning',
    description: 'A flexible, no-commitment single clean for guests, special occasions, or whenever life gets ahead of you and you need a reliable reset.',
    icon: 'check-circle',
  },
]

const reviews: Review[] = [
  {
    text: 'We had a great experience with this cleaning service! They come weekly and consistently do an excellent job—everything is spotless every time and exceeds our expectations. Their pricing is very reasonable for the quality of work, and the team is incredibly friendly, professional, and attentive to detail. It’s such a relief to find a service we can trust. We’re so glad we found them!',
    author: 'Sedef Paquette',
    rating: 5,
    source: 'google',
    date: '2026-02-27',
  },
  {
    text: 'Top Tier Philly Cleaning is professional, punctual, and meticulous—my home has never looked better. The team was courteous, worked quietly, and paid great attention to detail. Outstanding results and excellent value. Highly recommend!',
    author: 'ingrid2phila',
    rating: 5,
    source: 'google',
    date: '2025-09-14',
  },
  {
    text: 'I would like to say a big Thank you to Sam & Junior Top Tier Philly Cleaning Company!! We met on Wednesday 3/19th for a tour of my home & estimate for cleaning. They scheduled promptly for Friday 3/21st at 8:30 am. They arrived on time and went directly to work! As a military veteran I really appreciate timeliness and professionalism. They both took exceptional care and attention to detail in every space of my home 🏡! They are very friendly, trustworthy, respectful and honest and hardworking individuals. I went for breakfast and came back home as they were finishing up. My home is spotless and very organized and tidy!! Thank you once again guys!! Next time I promise to have your cannolis waiting for you !! Cheers 🧼🧹🫧🧽Andrew Bogert',
    author: 'Andrew Bogert',
    rating: 5,
    source: 'google',
    date: '2025-03-21',
  },
  {
    text: 'I can’t say enough great things about this cleaning service! They are friendly, reliable, and incredibly thorough. The attention to detail is outstanding, and they always go above and beyond to ensure everything is spotless. Scheduling was easy, and they were very flexible with my busy schedule. If you’re looking for a top-notch cleaning service in the Philly area, I highly recommend them!',
    author: 'David Cordova',
    rating: 5,
    source: 'google',
    date: '2025-01-15',
  },
  {
    text: 'A wonderful and trustworthy cleaning team. Sam and Junior were prompt and pleasant on arrival and they made a point to understand my home’s specific needs. Besides doing a thorough job with the clean, they went above and beyond by offering to help with a bit of much-needed reorganization … I would definitely recommend them to anyone!',
    author: 'Tess Schneider',
    rating: 5,
    source: 'google',
    date: '2025-01-16',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Who actually shows up to clean my home?',
    answer: 'Sam and Junior, the founders of Top Tier Philly Cleaning, personally handle the majority of cleans. You\'re not getting a rotating roster of strangers — you\'re getting the same trusted team who knows your home and your preferences.',
  },
  {
    question: 'How do I know I can trust someone in my home?',
    answer: 'Multiple clients, including a military veteran, have specifically praised Sam and Junior as trustworthy, honest, and respectful. One client left for breakfast mid-clean and came home to a spotless house. That level of trust is something they\'ve earned — review by review.',
  },
  {
    question: 'What does a typical cleaning include?',
    answer: 'Top Tier handles thorough cleaning of every room in your home with attention to detail in each space. They also offer light reorganization as needed, going above and beyond what most cleaning services include in a standard visit.',
  },
  {
    question: 'How quickly can you schedule a cleaning?',
    answer: 'Very quickly. Andrew Bogert had a home tour and estimate on Wednesday and was scheduled for a cleaning by Friday morning at 8:30 AM. Same-week scheduling is often available.',
  },
  {
    question: 'Is the pricing reasonable for the quality?',
    answer: 'Multiple reviewers specifically called out the pricing as \'very reasonable\' and an \'excellent value\' for the quality of work delivered. You get a meticulous, professional clean without premium agency pricing.',
  },
  {
    question: 'Do you offer recurring cleaning services?',
    answer: 'Yes — weekly recurring cleaning is one of their most popular services. Clients like Sedef Paquette have used them on a weekly basis and report that the quality is consistently excellent every single visit.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'Top Tier Philly Cleaning Company photo 1',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'Top Tier Philly Cleaning Company photo 2',
  category: 'interior',
}

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'Top Tier Philly Cleaning Company',
  address: '370 W Johnson St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19144',
  phone: '(215) 399-6743',
  email: '',
  hours: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Top Tier Philly Cleaning Company"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 399-6743"
      />

      <main>
        <HeroSection
            headline="The Cleaners Philadelphia Trusts With Their Keys"
            subheadline="Sam and Junior don't just clean your home — they show up on time, go straight to work, and leave it better than you imagined. That's not a pitch. That's what 36 five-star reviews look like."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (215) 399-6743"
            secondaryCtaHref="tel:(215) 399-6743"
            rating={5}
            reviewCount={36}
            foregroundImage={heroImage}
            variant="split"
          />

        <div id="services">
          <ServiceCards
            heading="Everything Your Home Deserves"
            subheading="One-time resets. Weekly rhythms. Move-in fresh starts. Built around your life, not the other way around."
            services={services}
            columns={3}
            variant="alternating"
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="about" className="bg-[var(--brand-bg-alt)]">
          <AboutSection
            heading="Two Founders. One Standard."
            story="Top Tier Philly Cleaning Company isn't just another cleaning service — it's the team Philadelphia homeowners actually trust to hand their keys to. Sam and Junior, the duo behind every clean, have built a reputation on the kind of professionalism that surprises people. Andrew Bogert, a military veteran, put it plainly: they showed up at 8:30 AM sharp, went straight to work, and left his home 'spotless and very organized.' That's not a coincidence — that's character. Tess Schneider noted they made a point to understand her home's specific needs before ever picking up a sponge, and then went further by helping with reorganization no one asked them to do. That's the Top Tier difference: they treat every room like it matters, because to them, it does.  What keeps clients coming back week after week — and writing five-star reviews without being asked — is the combination of meticulous attention to detail and a genuinely warm, low-pressure experience. Sedef Paquette has them in weekly and says the results 'exceed expectations every time.' Ingrid noted her home had 'never looked better,' and praised the team for working quietly and courteously throughout. In a city full of transactional service experiences, Top Tier delivers something rarer: reliability you can feel, from people who clearly take pride in the work.  Priced fairly for the quality they deliver, and flexible enough to work around busy Philadelphia schedules, Top Tier Philly Cleaning operates Monday through Friday out of the Germantown neighborhood — bringing the same level of care to rowhouses, family homes, and everything in between. With a perfect 5-star rating across 36 reviews and not a single complaint on record, this is a business that has quietly earned its name."
            image={aboutImage}
          />
        </div>

        <div id="reviews">
          <TestimonialCarousel
            heading="Don't Take Our Word for It"
            reviews={reviews}
            variant="featured"
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: 'Sam',
              role: 'Co-Founder & Lead Cleaner',
              quote: 'Sam and Junior are the heartbeat of Top Tier Philly Cleaning — and if you read through the reviews, their names come up again and again, always paired with words like trustworthy, honest, respectful, and hardworking. They\'re not a faceless company sending rotating strangers into your home. They\'re the guys who show up on time, introduce themselves, ask the right questions, and then get to work. Andrew Bogert — a veteran who knows what real professionalism looks like — said meeting Sam and Junior felt like finding people he could genuinely trust, and he left for breakfast mid-clean without a second thought. That kind of confidence isn\'t built through marketing. It\'s built through showing up, doing the job right, and treating every client\'s home like it\'s their own.\n\nBased in Philadelphia\'s Germantown neighborhood, Sam and Junior built Top Tier on a simple belief: that cleaning done right is a genuine service to someone\'s life, not just a chore for hire. Tess Schneider captured it well when she called them \'a wonderful and trustworthy cleaning team\' — and that word, trustworthy, is the throughline in nearly every review they\'ve ever received. They\'re not just cleaning homes. They\'re giving people back their time, their peace of mind, and a front door they\'re proud to walk through.',
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion heading="Questions Worth Asking Before You Book" items={faqItems} />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Your Home Is One Call Away From Spotless"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 399-6743" />
    </>
  )
}
