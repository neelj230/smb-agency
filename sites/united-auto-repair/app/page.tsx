import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import { HeroSection } from '@/components/HeroSection'
import { StatsCounter } from '@/components/StatsCounter'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { ProcessSteps } from '@/components/ProcessSteps'
import { ImageGallery } from '@/components/ImageGallery'
import { FounderQuote } from '@/components/FounderQuote'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import type { Stat, Review, Service, ProcessStep, FAQItem, NavLink, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'Reviews', href: '#reviews' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  {     value: 4.3, suffix: '★', label: 'Average Customer Rating' },
  {     value: 178, suffix: '+', label: 'Verified Customer Reviews' },
  {     value: 2, suffix: ' Generations', label: 'Of Loyal Neighborhood Customers' },
  {     value: 6, suffix: ' Days', label: 'A Week, Including Saturdays' },
]

const services: Service[] = [
  {
    name: 'Brake Repair & Caliper Service',
    description: 'Full brake system diagnostics and repair including calipers, pads, and rotors — often sourced and fixed in-house to save you dealer prices.',
    icon: 'disc',
    image: '/photos/photo-3.webp',
  },
  {
    name: 'Oil Change',
    description: 'Fast, same-day oil changes using quality fluids — in and out without an appointment headache.',
    icon: 'droplets',
    image: '/photos/photo-4.webp',
  },
  {
    name: 'State Vehicle Inspection',
    description: 'Pennsylvania state inspections completed the same day you call, keeping you legal and road-ready.',
    icon: 'clipboard-check',
    image: '/photos/photo-5.webp',
  },
  {
    name: 'Tire Sales & Installation',
    description: 'New tire sourcing and installation with competitive pricing and same-day turnaround.',
    icon: 'circle',
    image: '/photos/photo-6.webp',
  },
  {
    name: 'Windshield Wiper & Fluid System Repair',
    description: 'Diagnosis and repair of wiper fluid dispensing systems and wiper assemblies to restore full visibility.',
    icon: 'wind',
    image: '/photos/photo-7.webp',
  },
  {
    name: 'General Diagnostic & Vehicle Assessment',
    description: 'Honest, thorough vehicle assessments where the team tells you exactly what\'s needed — and what isn\'t.',
    icon: 'search',
    image: '/photos/photo-8.webp',
  },
]

const reviews: Review[] = [
  {
    text: 'The best in town. I\'ve taken my car there twice, and each time everyone there has been super polite, helping, and patient with all questions regarding my vehicle. They\'re fast too!\nShout out to Bishop, who was able to fix my caliper and saved me ordering one from the dealer!\nYou can\'t go wrong with this shop!',
    author: 'Edgar Landaverde',
    rating: 5,
    source: 'google',
    date: '2025-11-29',
  },
  {
    text: 'No complaints about this place! I highly recommend getting your vehicle serviced here. As a woman I’ve always been treated with respect and did not feel taken advantage of. I’ve also seen how the staff catered to other customers as well. I moved from Philly to DE and will continue to get my vehicle serviced here.',
    author: 'Kia Bizzle',
    rating: 5,
    source: 'google',
    date: '2025-07-20',
  },
  {
    text: 'Did my oli change and inspection the same day that I reach out to them.\nHighly Recommended',
    author: 'Ra. G.',
    rating: 5,
    source: 'google',
    date: '2026-01-02',
  },
  {
    text: 'They have the best service I\'ve seen ever. I honestly feel like family every time i come here. They are very honest with what needs to be done n very fair prices.',
    author: 'Spliff Situations',
    rating: 5,
    source: 'google',
    date: '2023-11-01',
  },
  {
    text: 'I’m second generation of coming here. I gave four stars because the environment/ aesthetic is unwelcoming and stale. The bathroom had cob webs and one spare extra toilet paper. The waiting area chairs has been the same for years.  Why does that matter, because it’s giving after thought.\n\nThe prices have always been good.\n\nVery knowledgeable and helpful staff. Always had the receptionist.\n\nI went in because my windshield wiper fluid isn’t dispensing when commanded and I was referred to the Jeep Dealership for further evaluation.\n\nI did however get two tires and my front brakes replaced. So far so good.',
    author: 'Javada Hill',
    rating: 4,
    source: 'google',
    date: '2025-05-31',
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do I need an appointment, or can I walk in?',
    answer: 'United Auto Repair is known for same-day service — customers have called in the morning and had their oil change and inspection done that same day. Call ahead at (215) 871-8440 to confirm availability, but walk-ins are welcomed when the schedule allows.',
  },
  {
    question: 'Will I be treated fairly as a woman bringing in my car alone?',
    answer: 'Absolutely. Multiple female customers have specifically called out that they\'ve always been treated with respect and never felt taken advantage of. That\'s a standard the staff holds consistently — not just occasionally.',
  },
  {
    question: 'Are your prices competitive compared to dealerships?',
    answer: 'Yes — and that\'s one of the most consistent things customers mention. The team actively works to save you money, including repairing parts in-house rather than sending you to a dealer for an expensive replacement.',
  },
  {
    question: 'How fast is the turnaround on common repairs?',
    answer: 'Most standard services — oil changes, inspections, brake jobs, tire installations — are completed the same day. The shop is known for being fast without cutting corners.',
  },
  {
    question: 'What are your hours and do you work on Saturdays?',
    answer: 'Yes, United Auto Repair is open Saturday 8:00 AM to 3:00 PM, making it accessible for customers who work weekdays. Monday through Friday hours are 8:00 AM to 4:30 PM. The shop is closed Sundays.',
  },
  {
    question: 'Is this a shop that\'s been around long enough to trust?',
    answer: 'Long enough that some customers are second-generation — their parents brought cars here, and now they do too. That kind of multi-generational loyalty in a neighborhood like West Philadelphia says everything about the shop\'s consistency and character.',
  },
]

const processSteps: ProcessStep[] = [
  {
    title: 'Call or Pull In',
    description: 'No appointment anxiety — reach out same-day and we\'ll tell you exactly what we can do, right then.',
  },
  {
    title: 'Honest Assessment First',
    description: 'Bishop and the team give you a straight read on your vehicle — what\'s needed, what isn\'t, and why.',
  },
  {
    title: 'In-House Fixes That Save You Money',
    description: 'Where most shops send you to the dealer, we source and solve in-house — saving you real dollars on labor and parts.',
  },
  {
    title: 'Out the Door the Same Day',
    description: 'From oil changes to brake calipers to state inspections, we turn it around fast so you get back to your life.',
  },
]

const heroImage: Photo = {
  src: '/photos/photo-1.webp',
  alt: 'United Auto Repair photo 1',
  category: 'exterior',
}

const aboutImage: Photo = {
  src: '/photos/photo-2.webp',
  alt: 'United Auto Repair photo 2',
  category: 'interior',
}

const galleryPhotos: Photo[] = [
  { src: '/photos/photo-3.webp', alt: 'United Auto Repair photo 3', category: 'work' },
  { src: '/photos/photo-4.webp', alt: 'United Auto Repair photo 4', category: 'work' },
  { src: '/photos/photo-5.webp', alt: 'United Auto Repair photo 5', category: 'work' },
  { src: '/photos/photo-6.webp', alt: 'United Auto Repair photo 6', category: 'work' },
  { src: '/photos/photo-7.webp', alt: 'United Auto Repair photo 7', category: 'work' },
  { src: '/photos/photo-8.webp', alt: 'United Auto Repair photo 8', category: 'work' },
]

const socialLinks: SocialLinks = {}

const businessContact = {
  name: 'United Auto Repair',
  address: '6163 Lancaster Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(215) 871-8440',
  email: '',
  hours: {
    Monday: '8:00 AM – 4:30 PM',
    Tuesday: '8:00 AM – 4:30 PM',
    Wednesday: '8:00 AM – 4:30 PM',
    Thursday: '8:00 AM – 4:30 PM',
    Friday: '8:00 AM – 4:30 PM',
    Saturday: '8:00 AM – 3:00 PM',
    Sunday: 'Closed',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="United Auto Repair"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 871-8440"
      />

      <main>
        <HeroSection
            headline="Fixed Right. Treated Like Family. Every Time."
            subheadline="People drive from Delaware just to come here. Not because it's close — because it's earned. United Auto Repair on Lancaster Ave is where Philadelphia brings its cars and its trust."
            ctaText="Get a Free Quote"
            ctaHref="#contact"
            secondaryCtaText="Call (215) 871-8440"
            secondaryCtaHref="tel:(215) 871-8440"
            rating={4.3}
            reviewCount={178}
            backgroundImage={heroImage}
            variant="photo-bg"
          />

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="reviews">
          <TestimonialCarousel
            heading="Straight From the People Who Keep Coming Back"
            reviews={reviews}
            variant="featured"
          />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="What We Fix, And How We Do It Right"
            subheading="No unnecessary upsells. No dealer runaround. Just honest work at fair prices."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="about">
          <AboutSection
            heading="A Corner of Lancaster Ave That Never Let Anyone Down"
            story="United Auto Repair on Lancaster Ave isn't just a shop — it's a neighborhood institution. Customers like Javada Hill have been coming here across generations, and regulars like Kia Bizzle drive all the way from Delaware rather than find someone closer. That kind of loyalty doesn't come from convenience — it comes from a staff that treats every customer with patience, honesty, and genuine care. Whether you're a woman worried about being taken advantage of, or someone with a hundred questions about your vehicle, the team here meets you where you are and gives it to you straight."
            image={aboutImage}
          />
        </div>

        <div id="process" className="bg-[var(--brand-bg-alt)]">
          <ProcessSteps
            heading="From Pull-In to Peace of Mind"
            subheading="No mystery. No waiting games. Here's exactly what happens when you bring your car to us."
            steps={processSteps}
            variant="timeline"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="The Shop Behind the Reputation"
            photos={galleryPhotos}
            variant="masonry"
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: 'Bishop',
              role: 'Lead Technician',
              quote: 'United Auto Repair has been part of the West Philadelphia community long enough that second-generation customers walk through the door. The shop runs on a simple philosophy: do the work right, charge a fair price, and treat everyone like a person — not a job ticket. The front desk has always had a receptionist ready to greet you, and technicians like Bishop bring a level of craftsmanship and resourcefulness that\'s increasingly rare. The hours are focused — Monday through Saturday, no late nights — because this team values doing things with care over doing things fast for volume. What you get is a shop with a soul, where the staff remembers your face and your car.',
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion heading="Questions We Actually Hear Every Day" items={faqItems} />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Ready When You Are"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 871-8440" />
    </>
  )
}
