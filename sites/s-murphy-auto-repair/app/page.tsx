import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { ServiceCards } from '@/components/ServiceCards'
import { StatsCounter } from '@/components/StatsCounter'
import { AboutSection } from '@/components/AboutSection'
import { ProcessSteps } from '@/components/ProcessSteps'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ImageGallery } from '@/components/ImageGallery'
import { TeamGrid } from '@/components/TeamGrid'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Service, Stat, ProcessStep, Review, TeamMember, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 4.6, suffix: '★', label: 'Average Customer Rating' },
  {     value: 199, suffix: '+', label: 'Verified Customer Reviews' },
  {     value: 100, suffix: '%', label: 'Reviews Recommending the Shop' },
  {     value: 5, suffix: ' Days', label: 'Weekly Availability (Mon–Fri)' },
]

const services: Service[] = [
  {
    name: 'Collision & Body Repair',
    description: 'Full structural and cosmetic repair after accidents, including door panels, body panels, and frame work — restored to pre-accident condition or better.',
    icon: 'car',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Insurance Claim Assistance',
    description: 'Murphy\'s team works directly with your insurance adjuster to ensure every necessary repair is authorized and completed — no shortcuts, no lowballing.',
    icon: 'shield-check',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'Interior Detailing',
    description: 'Full interior cleaning and detailing completed alongside repairs, so your car comes back looking and feeling brand new inside and out.',
    icon: 'sparkles',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Paint & Finish Restoration',
    description: 'Professional paint matching and finish work that makes repaired panels blend seamlessly with the rest of your vehicle.',
    icon: 'paintbrush',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Window Tint Services',
    description: 'Window tinting installation and restoration to keep your ride looking sharp after body work or as a standalone service.',
    icon: 'sun',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'General Mechanical Repair',
    description: 'Comprehensive mechanical diagnostics and repair for everyday vehicle issues handled by an experienced, trusted crew.',
    icon: 'wrench',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'Was recommended here and will definitely pass on the recommendation! Mr Murphy & his crew took really good care of me & my car for the duration they had it. Everything was complete within a timely manner & am very satisfied with their service! They even went the extra mile for me when it was time for me to return the rental as well as making sure I was able to get my window tints back ! 10/10 ! I will be bringing my car here for service from now on!',
    author: 'Jazzmine Stewart',
    rating: 5,
    source: 'google',
    date: '2026-02-27',
  },
  {
    text: 'This company  did a amazing  job on my car. They crew is so amazing. Thank you so much  for the service.',
    author: 'Aunyea DAVIS',
    rating: 5,
    source: 'google',
    date: '2026-02-09',
  },
  {
    text: 'So my car got into an accident, they literally tore my back door panel off. I took my car here. I was so upset and confused I didn’t know what to do. Mr. Murphy was so patient with me and guided me through the steps, he taught me what coverage was good for my vehicle and didn’t hit hard with prices. This part I’m embarrassed to say but the inside of my car was filthy anyone with kids know my struggle. When I got my car back I felt as if it was a brand new car not only was my door fixed but my car was completely detailed…. I could have kissed him I was beyond satisfied with the services. Great place!!!!',
    author: 'Rashidah Elahi',
    rating: 5,
    source: 'google',
    date: '2022-02-25',
  },
  {
    text: 'Amazing!! My car came back looking brand new. Amazing customer service, repaired in a timely fashion, and car was cleaned before handed back to me! I highly recommend for any of your car repair needs!!',
    author: 'Levon Williams',
    rating: 5,
    source: 'google',
    date: '2023-01-13',
  },
  {
    text: 'I am very happy with and thankful for the services I received at Murphy\'s. They not only took care of the repairs but they went to the mat with the insurance company and made sure they  got everything done right. Without their diligence in holding the adjuster accountable, I don\'t know if I would\'ve been as satisfied. Thanks again for a job well done!',
    author: 'Rashaad Abdus Sabur',
    rating: 5,
    source: 'google',
    date: '2025-05-08',
  },
]

const team: TeamMember[] = [
  {
    name: 'Mr. Murphy',
    role: 'Owner & Lead Technician',
    bio: 'Mr. Murphy is the heart of this shop — customers describe him as patient, knowledgeable, and relentless when it comes to dealing with insurance companies on their behalf. He takes time to educate customers about their coverage and doesn\'t quit until the job is done right.',
    credentials: ['Named personally in multiple 5-star reviews', 'Known for insurance adjuster advocacy', 'Praised for customer patience and guidance'],
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Can you help me deal with my insurance company after an accident?',
    answer: 'Absolutely. Murphy\'s team has a strong track record of working directly with insurance adjusters to make sure every repair is properly authorized and completed. One customer noted that without Murphy\'s diligence in holding the adjuster accountable, the repairs wouldn\'t have been done right. You don\'t have to fight that battle alone.',
  },
  {
    question: 'How long will my repair take?',
    answer: 'Multiple customers have praised S. Murphy for completing repairs in a timely fashion. While every job is different depending on parts and damage, the team is transparent about timelines and works efficiently to get you back on the road without unnecessary delays.',
  },
  {
    question: 'Will my car be cleaned when I pick it up?',
    answer: 'Yes — and customers are often surprised by this. S. Murphy\'s crew regularly returns vehicles cleaned and detailed as part of their process. One customer arrived with a car she described as filthy inside, and picked it up feeling like it was brand new. It\'s part of how they do business.',
  },
  {
    question: 'Do you offer any help with rentals or transportation while my car is being repaired?',
    answer: 'The team goes the extra mile when they can. One customer noted that Mr. Murphy\'s crew helped her coordinate returning her rental car when her repair was complete. While availability may vary, the team genuinely tries to make the whole experience as smooth as possible.',
  },
  {
    question: 'Are your prices fair compared to other shops?',
    answer: 'Customers consistently note that Mr. Murphy doesn\'t hit hard with prices — one reviewer specifically mentioned being guided through coverage options without feeling pressured or overcharged. The focus here is honest work at honest prices, backed by a 4.6-star rating across nearly 200 reviews.',
  },
  {
    question: 'How did you earn such a loyal customer base?',
    answer: 'Almost every review at S. Murphy mentions the same things: genuine care, thorough work, and a crew that treats your car like it matters. Customers don\'t just come back — they send their friends and family. That word-of-mouth trust is built one honest repair at a time.',
  },
]

const processSteps: ProcessStep[] = [
  {
    title: 'Bring It In, Stressed or Not',
    description: 'Drop your car off at 5539 Chestnut St — Mr. Murphy will walk you through exactly what happened, what needs to happen, and what to expect, no jargon, no pressure.',
  },
  {
    title: 'We Go to the Mat With Your Insurance',
    description: 'Murphy\'s team works directly with your adjuster to make sure every necessary repair gets authorized — no lowballing, no missing line items.',
  },
  {
    title: 'Structural, Cosmetic, Mechanical — All of It',
    description: 'From frame work and body panels to paint matching and interior detailing, your car gets a full restoration, not a patch job.',
  },
  {
    title: 'You Pick Up a Car That Feels Brand New',
    description: 'Detailed inside and out, finished to match the original, and returned with the kind of care that makes customers send their family here next.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'S. Murphy Auto Repair photo 1',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'S. Murphy Auto Repair photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'S. Murphy Auto Repair photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'S. Murphy Auto Repair photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'S. Murphy Auto Repair photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'S. Murphy Auto Repair photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'S. Murphy Auto Repair photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'S. Murphy Auto Repair photo 8', category: 'work' },
  { src: '/photos/photo-9.webp', alt: 'S. Murphy Auto Repair photo 9', category: 'work' },
  { src: '/photos/photo-10.webp', alt: 'S. Murphy Auto Repair photo 10', category: 'work' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'S. Murphy Auto Repair',
  address: '5539 Chestnut St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 472-2759',
  email: '',
  hours: {
    Monday: '9:00 AM – 6:00 PM',
    Tuesday: '9:00 AM – 6:00 PM',
    Wednesday: '9:00 AM – 6:00 PM',
    Thursday: '9:00 AM – 6:00 PM',
    Friday: '9:00 AM – 6:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="S. Murphy Auto Repair"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 472-2759"
      />

      <main>
        <HeroSection
            headline="Your Car Comes Back Brand New."
            subheadline="At S. Murphy Auto Repair, the repair is just the beginning. Mr. Murphy and his crew return your car looking — and feeling — like the day you drove it off the lot. Sometimes better."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (215) 472-2759"
            secondaryCtaHref="tel:(215) 472-2759"
            rating={4.6}
            reviewCount={199}
            backgroundImage={heroImage}
            variant="blurred-reveal"
          />

        <div id="services">
          <ServiceCards
            heading="Everything Your Car Needs. Nothing It Doesn't."
            subheading="From frame-deep collision work to a spotless interior — handled under one roof, by people who actually care."
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
            heading="This Is What a Neighborhood Shop Should Feel Like."
            story="S. Murphy Auto Repair on Chestnut Street isn't just a body shop — it's the kind of place West Philadelphia residents send their friends and family when something goes wrong. Mr. Murphy and his crew have built a reputation not by running slick ads, but by doing the kind of work that earns word-of-mouth loyalty: fixing Rashidah's door after a traumatic accident and handing her car back fully detailed, cleaner than the day she brought it in. That's not a standard upsell — that's someone who cares. Jazzmine didn't just leave satisfied; she left knowing she could trust them with her next repair, and the one after that. When Levon picked up his car, he said it looked brand new. That phrase shows up more than once in these reviews, and it's no accident."
            image={aboutImage}
          />
        </div>

        <div id="process">
          <ProcessSteps
            heading="From Accident to Brand New: Here's How It Works"
            subheading="We handle the hard parts so you don't have to."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="Don't Take Our Word for It."
            reviews={reviews}
            variant="scroll"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="Before They Said 'Brand New.' After You'll See Why."
            photos={galleryPhotos}
            variant="grid"
          />
        </div>

        <div id="team" className="bg-[var(--brand-bg-alt)]">
          <TeamGrid
            heading="The Crew Behind Every Comeback"
            subheading="Skilled hands. Honest people. Led by someone who shows up for every job."
            members={team}
          />
        </div>

        <div id="founder">
          <FounderQuote
            founder={{
              name: 'Mr. Murphy',
              role: 'Owner & Lead Technician',
              quote: 'Mr. Murphy is the kind of mechanic who teaches you something every time you come in. When Rashidah arrived shaken and overwhelmed after her accident, he didn\'t rush her through paperwork — he sat with her, explained her coverage options, and made sure she understood what was happening to her car and why. That patience, that willingness to slow down and bring a confused customer into the process, is what defines how S. Murphy Auto Repair operates. It\'s not a transactional place. Mr. Murphy runs his shop on Chestnut Street the way a neighborhood institution should be run: with accountability, with craft, and with the kind of follow-through that makes people not just return, but recruit their friends.',
            }}
          />
        </div>

        <div id="faq" className="bg-[var(--brand-bg-alt)]">
          <FAQAccordion heading="You Have Questions. Mr. Murphy Has Answers." items={faqItems} />
        </div>

        <div id="contact">
          <ContactSection
            business={businessContact}
            heading="Your Car Deserves Better. Let's Get Started."
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 472-2759" />
    </>
  )
}
