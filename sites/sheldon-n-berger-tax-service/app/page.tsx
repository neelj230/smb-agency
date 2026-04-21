import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StatsCounter } from "@/components/StatsCounter";
import { ServiceCards } from "@/components/ServiceCards";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { TeamGrid } from "@/components/TeamGrid";
import { FounderQuote } from "@/components/FounderQuote";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import type {
  Stat,
  Service,
  Review,
  TeamMember,
  FAQItem,
  NavLink,
  Photo,
  SocialLinks,
} from "@/components/types";

const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const stats: Stat[] = [
  { value: 32, label: "Verified Customer Reviews" },
  { value: 3.9, suffix: "★", label: "Average Star Rating" },
  {
    value: 6,
    suffix: " Days",
    label: "Available Every Week Including Evenings",
  },
  { value: 1, suffix: " Night", label: "To File Multiple Years of Returns" },
];

const services: Service[] = [
  {
    name: "Individual Tax Return Preparation",
    description:
      "Personal federal and state tax return filing with thorough review of your financial situation to maximize your refund and minimize what you owe.",
    icon: "file-text",
  },
  {
    name: "Multi-Year Back Tax Filing",
    description:
      "Catch up on multiple years of unfiled returns efficiently — Sheldon has completed two years of returns in a single appointment.",
    icon: "calendar-check",
  },
  {
    name: "Tax Situation Assessment",
    description:
      "A detailed review of your income, deductions, and withholdings to identify errors, missed credits, and opportunities before filing.",
    icon: "search",
  },
  {
    name: "TurboTax & DIY Override Review",
    description:
      "Already tried filing yourself and got a number that doesn't look right? Sheldon reviews self-prepared returns and corrects costly mistakes.",
    icon: "refresh-cw",
  },
  {
    name: "Self-Employed & Small Business Taxes",
    description:
      "Tax preparation tailored to freelancers, contractors, and small business owners navigating deductions, quarterly estimates, and business income.",
    icon: "briefcase",
  },
  {
    name: "Tax Guidance & Planning Consultation",
    description:
      "One-on-one sessions to explain your tax situation in plain language and help you make smarter financial decisions throughout the year.",
    icon: "message-circle",
  },
];

const reviews: Review[] = [
  {
    text: "Sheldon was amazing to work with. He provided valuable guidance and was very pleasant during our meeting! His rate was very reasonable and we will definitely be using him for our taxes going forward!",
    author: "Anthony Mendoza",
    rating: 5,
    source: "google",
    date: "2025-04-14",
  },
  {
    text: "It was my first time filing with Sheldon N Berger and it was such a great experience. Such a really nice guy, explaining every single details and very accommodating with our questions. The fee is also very much reasonable compared to the other commercialized preparers. I definitely recommend this place, no doubt!",
    author: "Jhen Smith",
    rating: 5,
    source: "google",
    date: "2024-03-27",
  },
  {
    text: "So happy to have the pleasure of meeting Sheldon today.\nOur new go to tax professional from now on. Very nice man.\n\nThank you Sheldon! for your help with taxes.\n\nSee you next year! 😊",
    author: "Debbie",
    rating: 5,
    source: "google",
    date: "2025-04-05",
  },
  {
    text: "Sheldon exceeded my expectations! He filed two years of tax returns for me in one night. Not only was he super efficient- he was professional, easy to talk to, and very well priced! I will be returning next year and highly recommend his services.",
    author: "Kathrine Helms",
    rating: 5,
    source: "google",
    date: "2020-04-29",
  },
  {
    text: "Tried filing my taxes on TurboTax this year (as I’ve always done) and I was projected to owe thousands. After a visit to Sheldon, he was able to assess my tax situation and I’m now receiving a return of several hundred. I was amazed at how much value I got for such an affordable cost. I would definitely recommend Sheldon as the first place to stop if you’re looking for help on your taxes.",
    author: "Joshua Hascall",
    rating: 5,
    source: "google",
    date: "2018-01-27",
  },
];

const team: TeamMember[] = [
  {
    name: "Sheldon Berger",
    role: "Tax Preparer & Owner",
    bio: "Described by clients as patient, thorough, and genuinely pleasant to work with, Sheldon takes the time to explain every detail of your return and has a proven track record of turning expected tax bills into refunds. His rates are consistently praised as fair and far below commercial chain preparers.",
    credentials: [
      "Tax Preparer",
      "Individual & Business Tax Filing",
      "Multi-Year Return Specialist",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question:
      "How does Sheldon's pricing compare to places like H&R Block or TurboTax?",
    answer:
      "Multiple clients specifically call out the pricing as 'very reasonable' and significantly lower than commercial tax preparation chains. You get one-on-one attention from an experienced preparer at a cost that surprises most first-time clients in the best way.",
  },
  {
    question:
      "I tried filing on TurboTax and it says I owe money — can Sheldon help?",
    answer:
      "Absolutely. One client came in projected to owe thousands through TurboTax and left with a refund of several hundred dollars after Sheldon assessed the full tax situation. A professional review often finds deductions and credits that software misses.",
  },
  {
    question: "What if I haven't filed taxes in more than one year?",
    answer:
      "Sheldon handles multi-year back filing and has completed two years of returns in a single appointment. Don't let fear of being behind stop you from getting current — he makes the process straightforward and judgment-free.",
  },
  {
    question: "What are the office hours and do I need an appointment?",
    answer:
      "Sheldon is available Monday through Friday 8 AM to 7 PM, Saturday 8 AM to 4 PM, and Sunday 11 AM to 4 PM. The extended evening and weekend hours make it easy to fit a visit around a busy work schedule. Call (971) 227-1334 to arrange your visit.",
  },
  {
    question:
      "Will Sheldon actually explain my taxes or just hand me papers to sign?",
    answer:
      "Explaining is one of the things clients praise most. Jhen Smith noted he explained 'every single detail' and was very accommodating with questions. First-timers and long-time filers alike leave saying they actually understand their return for the first time.",
  },
  {
    question: "Is this a good option for someone filing for the first time?",
    answer:
      "Several first-time filers have reviewed Sheldon and described the experience as welcoming, easy to navigate, and pressure-free. He's patient with questions and makes sure you understand exactly what's being filed on your behalf before anything is submitted.",
  },
];

const socialLinks: SocialLinks = {};

const businessContact = {
  name: "Sheldon N Berger Tax Service",
  address: "832 SE 60th Ave",
  city: "Hillsboro",
  state: "OR",
  zip: "97123",
  phone: "(971) 227-1334",
  email: "",
  hours: {
    Monday: "8:00 AM – 7:00 PM",
    Tuesday: "8:00 AM – 7:00 PM",
    Wednesday: "8:00 AM – 7:00 PM",
    Thursday: "8:00 AM – 7:00 PM",
    Friday: "8:00 AM – 7:00 PM",
    Saturday: "8:00 AM – 4:00 PM",
    Sunday: "11:00 AM – 4:00 PM",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Sheldon N Berger Tax Service"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(971) 227-1334"
      />

      <main>
        <HeroSection
          headline="You Expected a Bill. He Found You a Refund."
          subheadline="Sheldon Berger doesn't just file your taxes — he reads them the way no software ever will. One appointment in Hillsboro, and clients who braced for thousands owed walked out with hundreds back."
          ctaText="Get a Free Quote"
          ctaHref="#contact"
          secondaryCtaText="Call (971) 227-1334"
          secondaryCtaHref="tel:(971) 227-1334"
          rating={3.9}
          reviewCount={32}
          variant="dark-bold"
        />

        <div id="about">
          <AboutSection
            heading="The Well-Kept Secret Hillsboro Locals Keep Coming Back To"
            story="Sheldon N Berger Tax Service is the kind of place that feels like a well-kept secret among Hillsboro locals — where one visit turns first-timers into loyal regulars. Customers like Jhen Smith and Debbie describe walking in for the first time and immediately feeling at ease, thanks to Sheldon's patient, detailed explanations and genuinely warm demeanor. He doesn't rush you through the process — he walks you through every line, every question, every detail, until you actually understand what's happening with your money. That's a rare thing in tax prep, and clients notice it immediately."
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="light" />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="Every Tax Situation Has a Fix. Here's How Sheldon Handles Yours."
            subheading="From first-time filers to years of back taxes — nothing is too complicated to walk through together."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="reviews">
          <TestimonialCarousel
            heading="First Visit. Last Tax Preparer They Ever Needed."
            reviews={reviews}
            variant="grid"
          />
        </div>

        <div id="team" className="bg-[var(--brand-bg-alt)]">
          <TeamGrid
            heading="One Preparer. Your Full Attention."
            subheading="No handoffs. No junior staff. Just Sheldon, your return, and the details that actually matter."
            members={team}
          />
        </div>

        <div id="founder">
          <FounderQuote
            founder={{
              name: "Sheldon Berger",
              role: "Tax Preparer & Owner",
              quote:
                "Sheldon Berger built his tax practice on a simple conviction: that people deserve to understand their own financial situation, not just sign at the bottom of a form someone else filled out. Operating out of his Hillsboro office on SE 60th Ave, Sheldon has made himself available six days a week — evenings included — so that working families, self-employed folks, and anyone who's fallen behind on filing can access real professional help without rearranging their entire schedule. His clients don't describe him as a preparer; they describe him as a guide. Someone who explains every detail, fields every question without impatience, and makes a typically stressful annual ritual feel genuinely manageable. That's the business he set out to build, and by all accounts, it's exactly what he's delivered.",
            }}
          />
        </div>

        <div id="faq" className="bg-[var(--brand-bg-alt)]">
          <FAQAccordion
            heading="Questions Sheldon Gets Asked Before Every Appointment"
            items={faqItems}
          />
        </div>

        <div id="contact">
          <ContactSection
            business={businessContact}
            heading="Your Refund Is Closer Than You Think"
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(971) 227-1334" />
    </>
  );
}
