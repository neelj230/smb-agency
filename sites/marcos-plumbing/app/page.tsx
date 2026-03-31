import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { StatsCounter } from '@/components/StatsCounter'
import { ServiceCards } from '@/components/ServiceCards'
import { AboutSection } from '@/components/AboutSection'
import { ProcessSteps } from '@/components/ProcessSteps'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { TeamGrid } from '@/components/TeamGrid'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ClickToCall } from '@/components/ClickToCall'
import type { NavLink, Review, Stat, FAQItem, ProcessStep, Service, TeamMember, Photo, SocialLinks } from '@/components/types'

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const stats: Stat[] = [
  { value: 26, suffix: '+', label: 'Years in Business' },
  { value: 5000, suffix: '+', label: 'Jobs Completed' },
  { value: 60, suffix: ' min', label: 'Minute Response Time' },
  { value: 4.8, prefix: '★ ', label: 'Google Rating' },
]

const services: Service[] = [
  {
    name: 'Emergency Plumbing',
    description:
      '24/7 emergency service for burst pipes, major leaks, sewer backups, and no-heat calls. We guarantee a 60-minute response time anywhere in Philadelphia.',
    icon: 'alert-triangle',
  },
  {
    name: 'Drain Cleaning',
    description:
      'Camera inspection and hydro-jetting for stubborn clogs. Kitchen drains, bathroom drains, main sewer lines. We find the problem before we fix it.',
    icon: 'droplets',
  },
  {
    name: 'Water Heater Installation',
    description:
      'Tank and tankless water heater installation and repair. We carry Bradford White and Rinnai — the best in the business. Free estimates on all installations.',
    icon: 'flame',
  },
  {
    name: 'Bathroom Remodeling',
    description:
      'Full bathroom renovations from demo to tile. We handle the plumbing, coordinate with electricians and tile setters, and manage the whole project so you don\'t have to.',
    icon: 'bath',
  },
  {
    name: 'Sewer Line Repair',
    description:
      'Trenchless sewer repair and replacement. We fix collapsed, cracked, and root-damaged sewer lines without destroying your yard. Camera inspection included.',
    icon: 'construction',
  },
  {
    name: 'Heating & Boiler Service',
    description:
      'Boiler installation, repair, and annual maintenance. Radiator bleeding, zone valve replacement, circulator pump service. Keep your Philly row home warm all winter.',
    icon: 'thermometer',
  },
]

const reviews: Review[] = [
  {
    text: "Marco's crew came out on a Sunday night when our basement was flooding. They had it fixed in two hours. Can't say enough good things about these guys. Professional, honest, and they didn't gouge us on the emergency rate.",
    author: 'Jennifer M.',
    rating: 5,
    source: 'google',
    date: '2025-12-15',
  },
  {
    text: "We've used Marco's for everything in our row home — new water heater, bathroom remodel, annual boiler tune-up. They treat every job like it's for their own family. Marco actually called me a week after the install to make sure everything was working right.",
    author: 'Anthony D.',
    rating: 5,
    source: 'google',
    date: '2025-11-28',
  },
  {
    text: "Finally a plumber who shows up when they say they will. Nick from Marco's was here at 8am sharp, diagnosed the issue in 10 minutes, explained everything clearly, and had it fixed before lunch. Fair price too. Our go-to from now on.",
    author: 'Sarah K.',
    rating: 5,
    source: 'google',
    date: '2025-10-03',
  },
  {
    text: "Had three different plumbers give us quotes for a bathroom remodel. Marco's was the middle price but the most detailed — they walked us through every step. The finished bathroom looks incredible. Worth every penny.",
    author: 'Mike & Lisa R.',
    rating: 5,
    source: 'google',
    date: '2025-09-17',
  },
  {
    text: "Our 90-year-old row home has some gnarly old pipes. Marco himself came out, did the camera inspection, and gave us an honest assessment — told us which pipes needed replacing now and which could wait. Didn't try to upsell us on work we didn't need.",
    author: 'David H.',
    rating: 5,
    source: 'yelp',
    date: '2025-08-22',
  },
  {
    text: "Used them for a kitchen drain that three other plumbers couldn't fix. Marco's team used hydro-jetting and cleared it in 30 minutes. Should have called them first. They even cleaned up the mess the previous guys left.",
    author: 'Rosa C.',
    rating: 5,
    source: 'yelp',
    date: '2025-07-10',
  },
]

const team: TeamMember[] = [
  {
    name: 'Marco Benedetti',
    role: 'Owner & Master Plumber',
    bio: "26 years of experience. Licensed Master Plumber PA #MP-032841. Born in Naples, raised in South Philly.",
    credentials: ['Master Plumber License', 'Backflow Certified', 'Green Plumber Certified'],
  },
  {
    name: 'Nick Benedetti',
    role: 'Lead Technician',
    bio: "Marco's son. 8 years in the trade. Specializes in water heater installations and boiler systems.",
    credentials: ['Journeyman Plumber License', 'Rinnai Certified Installer'],
  },
  {
    name: 'Carlos Rivera',
    role: 'Senior Plumber',
    bio: '12 years of experience. Sewer and drain specialist. Camera inspection and trenchless repair expert.',
    credentials: ['Journeyman Plumber License', 'Trenchless Technology Certified'],
  },
]

const faqItems: FAQItem[] = [
  {
    question: 'Do you offer 24/7 emergency service?',
    answer:
      'Yes. Call our main number any time — nights, weekends, holidays. We guarantee a plumber at your door within 60 minutes anywhere in Philadelphia.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Absolutely. Marco holds a PA Master Plumber License (#MP-032841) and we carry $2M in liability insurance. All of our plumbers are licensed journeymen.',
  },
  {
    question: 'Do you give free estimates?',
    answer:
      "Yes, for all non-emergency work. We'll come out, assess the job, and give you a detailed written estimate before any work begins. No surprises.",
  },
  {
    question: 'What areas do you serve?',
    answer:
      "All of Philadelphia plus the close-in suburbs — Bala Cynwyd, Cheltenham, Darby, Yeadon, Upper Darby, and Drexel Hill. If you're not sure, just call and ask.",
  },
  {
    question: 'How long does a water heater installation take?',
    answer:
      'A standard tank water heater replacement is usually done in 3-4 hours. Tankless installations take a full day because of the gas line and venting upgrades needed.',
  },
]

const processSteps: ProcessStep[] = [
  {
    title: 'Call Us',
    description: 'Call (215) 555-0142 or fill out our form. We answer the phone — no call centers, no bots.',
  },
  {
    title: 'We Inspect',
    description: "A licensed plumber arrives on time, diagnoses the issue, and gives you a clear written estimate.",
  },
  {
    title: 'We Fix It',
    description: "Once you approve the estimate, we get to work. We fix it right the first time — that's our promise.",
  },
  {
    title: "You're Done",
    description: 'We clean up, walk you through the work, and follow up a week later to make sure everything is perfect.',
  },
]

const heroImage: Photo = {
  src: '/photos/marco-portrait.jpg',
  alt: 'Marco Benedetti, owner and master plumber',
  category: 'team',
}

const aboutImage: Photo = {
  src: '/photos/team-group.jpg',
  alt: 'Marco and his crew standing in front of the shop',
  category: 'team',
}

const socialLinks: SocialLinks = {
  facebook: 'https://facebook.com/marcosplumbingphilly',
  instagram: 'https://instagram.com/marcosplumbing',
  yelp: 'https://yelp.com/biz/marcos-plumbing-and-heating-philadelphia',
}

const businessContact = {
  name: "Marco's Plumbing & Heating",
  address: '2847 S Broad St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19148',
  phone: '(215) 555-0142',
  email: 'info@marcosplumbing.com',
  hours: {
    Monday: '7:00 AM – 6:00 PM',
    Tuesday: '7:00 AM – 6:00 PM',
    Wednesday: '7:00 AM – 6:00 PM',
    Thursday: '7:00 AM – 6:00 PM',
    Friday: '7:00 AM – 6:00 PM',
    Saturday: '8:00 AM – 2:00 PM',
    Sunday: 'Emergency Only',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Marco's Plumbing"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 555-0142"
      />

      <main>
        {/* Hero */}
        <HeroSection
          headline="South Philly's Most Trusted Plumber Since 1998"
          subheadline="Marco Benedetti started with a van and a toolbox. 26 years later, we're Philadelphia's go-to for everything from leaky faucets to full bathroom remodels."
          ctaText="Get a Free Quote"
          ctaHref="#contact"
          secondaryCtaText="Call (215) 555-0142"
          secondaryCtaHref="tel:(215) 555-0142"
          foregroundImage={heroImage}
          rating={4.8}
          reviewCount={127}
          variant="split"
        />

        {/* Stats */}
        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        {/* Services */}
        <div id="services">
          <ServiceCards
            heading="What We Do"
            subheading="From emergency repairs to full renovations — we handle it all."
            services={services}
            columns={3}
          />
        </div>

        {/* About / Story */}
        <div id="about" className="bg-[var(--brand-bg-alt)]">
          <AboutSection
            heading="Meet Marco"
            story="Marco Benedetti emigrated from Naples at 19 with his father's plumbing tools and a pocket Italian-English dictionary. He apprenticed under three master plumbers in South Philly before getting his own license in 1998. His philosophy: 'Fix it right the first time, or don't fix it at all.' He coaches his son's baseball team at FDR Park on Saturdays and is a regular at Pats for cheesesteaks. Every new customer gets a handwritten thank-you note."
            image={aboutImage}
          />
        </div>

        {/* Process */}
        <ProcessSteps
          heading="How It Works"
          subheading="Four simple steps to getting your plumbing fixed right."
          steps={processSteps}
        />

        {/* Testimonials */}
        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="What Our Customers Say"
            reviews={reviews}
            variant="featured"
          />
        </div>

        {/* Team */}
        <div id="team">
          <TeamGrid
            heading="Our Crew"
            subheading="Licensed, insured, and ready to help."
            members={team}
          />
        </div>

        {/* FAQ */}
        <div id="faq" className="bg-[var(--brand-bg-alt)]">
          <FAQAccordion heading="Common Questions" items={faqItems} />
        </div>

        {/* Contact */}
        <ContactSection
          business={businessContact}
          heading="Get In Touch"
          showMap={false}
        />
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 555-0142" />
    </>
  )
}
