import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StatsCounter } from "@/components/StatsCounter";
import { ServiceCards } from "@/components/ServiceCards";
import { ImageGallery } from "@/components/ImageGallery";
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
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const stats: Stat[] = [
  { value: 4.6, suffix: "★", label: "Average Customer Rating" },
  { value: 78, suffix: "+", label: "Customer Reviews" },
  { value: 2, label: "Generations of Tailoring Craft" },
  { value: 1744, label: "Passyunk Ave — A South Philly Landmark" },
];

const services: Service[] = [
  {
    name: "Custom Suit Tailoring",
    description:
      "Full suit fitting and tailoring service, including custom adjustments to jacket, trousers, and silhouette for weddings, events, or everyday wear.",
    icon: "shirt",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Garment Alterations",
    description:
      "Expert alterations on coats, dresses, pants, and shirts to reshape any garment to your exact frame and preference.",
    icon: "scissors",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Suit Sales",
    description:
      "Selection of quality suits available for purchase in-shop, with immediate fitting and tailoring included in the experience.",
    icon: "shopping-bag",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Dress & Coat Reshaping",
    description:
      "Structural alterations to reshape oversized or ill-fitting outerwear and dresses so they hug the body and flatter your frame.",
    icon: "sparkles",
  },
  {
    name: "Trouser Fitting",
    description:
      "Precise trouser tapering, hemming, and waist adjustments to achieve a clean, tailored line from hip to break.",
    icon: "ruler",
  },
  {
    name: "Multi-Piece Wardrobe Alterations",
    description:
      "Bring in multiple garments for a single consultation — Pat and Anna handle full wardrobe refreshes with the same care as a one-piece job.",
    icon: "layers",
  },
];

const reviews: Review[] = [
  {
    text: "Amazing customer experience. Got a new suit for a wedding and Pat and Anna tailored it to fit perfectly. When I came to pick it up the first time, I decided that I wanted that pants a little tighter and they did that without any issues. Pat and Anna are wonderful genuine people and I highly recommend getting a suit from them as it will be top quality!",
    author: "Matthew Kerrigan",
    rating: 5,
    source: "google",
    date: "2022-01-28",
  },
  {
    text: "Mr Scioli was recommended to me as I was in need of a nice suit on short notice.  From the second I walked into the establishment, I felt welcome and important. He and his lovely wife Anna, blew me away with the whole process of “How a Man’s Suit should be purchased.”\nI will never step into a big name Department Store or a chain Men’s Clothing Store, as long as I live.  Pat and Anna stole my heart!!!! They are amazing.",
    author: "Justin Nappa",
    rating: 5,
    source: "google",
    date: "2023-06-21",
  },
  {
    text: "Pat and Anna tailored a long green army style coat, which initially looked like a balloon on me due to my small frame. The coat was already quite fashionable but it now hugs my body and looks sensational. It's my winter coat and I get compliments multiple times a day, from men and women. So fun experiencing them working on the rough markup together. Pat is pure old school south philly charm, and Anna politely directs the show. Their services are pricey because you're paying for high quality and attention to detail. In fact, I paid more for the tailoring than I did for the coat! (which I bought from Amazon and was pretty cheap) Fully worth the price. Just brought them two dresses to alter (also bought cheaply, this time from Buffalo Exchange) and I'm excited to see the results.",
    author: "Debbie Sonya",
    rating: 5,
    source: "google",
    date: "2022-02-05",
  },
  {
    text: "Pat and Anna are the best. Really care about the customer and how you look more than anything. A couple months ago I bought a beautiful italian suit from them and had it altered, as well as my own suit altered. Both came out fantastic and they were finished very quickly. I was treated very nicely both times and will absolutely be back. Thanks Pat and Anna!",
    author: "Marty Angelina",
    rating: 5,
    source: "google",
    date: "2020-01-14",
  },
  {
    text: "If I could give 0 star…\n1. One of the shirts was over ironed/heated so the edge broke. I really hope I had checked when I picked up!\n2. As you can see from the second pic, the stitching for my fix seems really bad. I’m not sure if this means they have really bad skill or they are just not that serious about customer’s stuff and their work.\n3. It took them 3 weeks to do some very easy fixes. They know they are slow so when you finally can pick up all your clothes, the older man will hold your hand and over compliment keeping saying you are really good person, which even makes you some how feel embarrassed if you show any disappointment with their work.\n\nEven the owner seems like a good person, but you have to stay away from this place because of their bad work or at least check your clothes when picking up if you insist on a try…",
    author: "Stephen",
    rating: 1,
    source: "google",
    date: "2021-10-17",
  },
];

const team: TeamMember[] = [
  {
    name: "Pat Scioli",
    role: "Master Tailor & Owner",
    bio: "Pat is the heart of the shop — described by customers as 'pure old school South Philly charm.' He guides every fitting with warmth, experience, and a genuine investment in how each customer looks and feels.",
    credentials: [
      "Decades of tailoring experience",
      "Expert in men's suit construction",
      "South Philadelphia institution",
    ],
  },
  {
    name: "Anna Scioli",
    role: "Co-Owner & Fitting Specialist",
    bio: "Anna brings a precise, commanding eye to every garment — customers describe her as the one who 'politely directs the show,' ensuring every alteration meets an exacting standard of fit and finish.",
    credentials: [
      "Expert in women's garment alterations",
      "Collaborative fitting specialist",
      "Trusted by repeat customers for detail-driven work",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question:
      "What makes Scioli Pat different from a chain tailor or dry cleaner alteration service?",
    answer:
      "Pat and Anna work with you directly on every garment — there's no middleman, no guesswork, and no assembly line. Customers describe watching them mark up garments together in real time, discussing fit openly. Multiple reviewers have said they'll never use a chain clothing store again after experiencing this level of personal attention.",
  },
  {
    question: "Are the services expensive?",
    answer:
      "Pat and Anna's services are priced to reflect high-quality, hands-on craftsmanship. One customer noted she paid more for the tailoring than for the coat itself — and called it fully worth every dollar. If you're looking for the cheapest option, this isn't the place. If you want work done right that makes your clothes look exceptional, the value is clear.",
  },
  {
    question: "Can I bring in clothes I bought elsewhere to be altered?",
    answer:
      "Absolutely. Customers regularly bring in garments purchased from department stores, Amazon, thrift shops, and boutiques. Pat and Anna have transformed everything from cheap online coats to off-the-rack suits into perfectly fitted pieces.",
  },
  {
    question:
      "What if I change my mind about the fit when I pick up my clothes?",
    answer:
      "Pat and Anna welcome that conversation. One customer requested his trousers be taken in further at pickup and the shop handled it without any issue. They care about the final result, not rushing you out the door.",
  },
  {
    question: "How long does it typically take to get alterations completed?",
    answer:
      "Turnaround times vary based on the complexity of the work and current volume. Simple alterations are generally completed in a reasonable timeframe, though during busy periods it may take longer. It's worth calling ahead at (215) 334-0990 to get a current estimate for your specific job.",
  },
  {
    question: "When is the shop open?",
    answer:
      "Scioli Pat is open Tuesday through Saturday from 10:00 AM to 5:00 PM. The shop is closed Sunday and Monday. Given the hands-on nature of the work, it's a good idea to call ahead before your first visit.",
  },
];

const heroImage: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Scioli Pat photo 1",
  category: "exterior",
};

const aboutImage: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Scioli Pat photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  { src: "/photos/photo-3.webp", alt: "Scioli Pat photo 3", category: "work" },
  { src: "/photos/photo-4.webp", alt: "Scioli Pat photo 4", category: "work" },
  { src: "/photos/photo-5.webp", alt: "Scioli Pat photo 5", category: "work" },
];

const socialLinks: SocialLinks = {};

const businessContact = {
  name: "Scioli Pat",
  address: "1744 Passyunk Ave",
  city: "Philadelphia",
  state: "PA",
  zip: "19148",
  phone: "(215) 334-0990",
  email: "",
  hours: {
    Monday: "Closed",
    Tuesday: "10:00 AM – 5:00 PM",
    Wednesday: "10:00 AM – 5:00 PM",
    Thursday: "10:00 AM – 5:00 PM",
    Friday: "10:00 AM – 5:00 PM",
    Saturday: "10:00 AM – 5:00 PM",
    Sunday: "Closed",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Scioli Pat"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(215) 334-0990"
      />

      <main>
        <HeroSection
          headline="The Fit That Makes You Forget Everything Else"
          subheadline="Pat and Anna Scioli have turned first-time customers into lifelong converts — one perfectly tailored suit at a time. This is South Philly craftsmanship that doesn't apologize for being the best."
          ctaText="Get a Free Quote"
          ctaHref="#contact"
          secondaryCtaText="Call (215) 334-0990"
          secondaryCtaHref="tel:(215) 334-0990"
          rating={4.6}
          reviewCount={78}
          variant="dark-bold"
        />

        <div id="about">
          <AboutSection
            heading="Where Passyunk Avenue Does the Fitting"
            story="Tucked on Passyunk Avenue in the heart of South Philadelphia, Scioli Pat is the kind of tailor shop that makes you forget department stores ever existed. Pat and his wife Anna operate as a true team — customers describe watching them work together on a garment in real time, with Pat bringing decades of old-school South Philly craftsmanship and Anna, as one reviewer put it, 'politely directing the show.' The result is clothing that doesn't just fit — it transforms. A ballooning army coat became a body-hugging showstopper. A wedding suit came back for a second round of adjustments without a single complaint from the shop. That's the Scioli standard.  Pat and Anna have built a loyal following not just on skill, but on how they make people feel. First-time customers describe walking in and immediately feeling 'welcome and important.' Justin Nappa came in needing a suit on short notice and left swearing off chain stores for life. Debbie paid more for the tailoring than she did for the coat itself — and called it fully worth it. That's the reputation Pat and Anna have earned stitch by stitch: premium attention, genuine warmth, and zero shortcuts.  The shop keeps focused hours — Tuesday through Saturday, 10 to 5 — which reflects the unhurried, craft-first philosophy of the place. This isn't a volume operation. It's a neighborhood institution where the work gets done right, the people remember your name, and a well-fitted suit feels like a personal accomplishment shared between customer and tailor."
            image={aboutImage}
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="What Happens When Clothes Actually Fit"
            subheading="From a ballooning army coat to a sharp Italian suit — Pat and Anna reshape the way you wear everything."
            services={services}
            columns={3}
            variant="alternating"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="Before Pat. After Pat."
            photos={galleryPhotos}
            variant="scroll"
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="They Said It Better Than We Could"
            reviews={reviews}
            variant="grid"
          />
        </div>

        <div id="team">
          <TeamGrid
            heading="Pat Directs the Needle. Anna Directs the Show."
            subheading="Two people, one standard — and it's higher than anything you'll find at a department store."
            members={team}
          />
        </div>

        <div id="founder" className="bg-[var(--brand-bg-alt)]">
          <FounderQuote
            founder={{
              name: "Pat Scioli",
              role: "Master Tailor & Owner",
              quote:
                "Pat Scioli learned the tailor's trade the way it was meant to be learned — through hands, not manuals. On Passyunk Avenue, where South Philly's old-world sensibility still breathes through the brick and row homes, Pat built his shop into something rare: a place where the craft is taken seriously and the customer is treated like family. His wife Anna joined the operation and became the other half of what customers call an unmistakable duo — Pat with his warmth and old-school charm, Anna with her precise eye and calm authority. Together they walk customers through fittings, adjustments, and the kind of honest conversation about how a garment should actually sit on a body that you simply won't get at a mall.\n\nFor Pat, tailoring isn't a transaction — it's a demonstration of respect. Respect for the fabric, respect for the customer's body and occasion, and respect for a craft that big-box retail has spent decades trying to make obsolete. Customers don't just leave with altered clothes; they leave converted. More than one has said they'll never step into a chain clothing store again. That's not marketing — that's Pat and Anna doing their job.",
            }}
          />
        </div>

        <div id="faq">
          <FAQAccordion
            heading="Things People Ask Before They Become Regulars"
            items={faqItems}
          />
        </div>

        <div id="contact" className="bg-[var(--brand-bg-alt)]">
          <ContactSection
            business={businessContact}
            heading="Come In. You'll Never Look Back."
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(215) 334-0990" />
    </>
  );
}
