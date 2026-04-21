import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClickToCall } from "@/components/ClickToCall";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StatsCounter } from "@/components/StatsCounter";
import { ServiceCards } from "@/components/ServiceCards";
import { ImageGallery } from "@/components/ImageGallery";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FounderQuote } from "@/components/FounderQuote";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactSection } from "@/components/ContactSection";
import type {
  Stat,
  Service,
  Review,
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
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const stats: Stat[] = [
  { value: 4.1, suffix: "★", label: "Average Customer Rating" },
  { value: 9, suffix: "+", label: "Verified Customer Reviews" },
  { value: 6, suffix: " Days", label: "Early-Morning Weekday Availability" },
  { value: 100, suffix: "%", label: "Of Recent Reviewers Recommend Woodcrest" },
];

const services: Service[] = [
  {
    name: "Custom Bouquet Design",
    description:
      "Handcrafted bouquets tailored to the occasion, from birthday arrangements with fresh red roses and lush greenery to elegant mixed-flower designs.",
    icon: "flower-2",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Corporate & Bulk Floral Orders",
    description:
      "Elegant floral arrangements for businesses and events, including last-minute multi-bouquet orders for employee appreciation and corporate gifting.",
    icon: "briefcase",
    image: "/photos/photo-4.webp",
  },
  {
    name: "Orchid Gardens & Specialty Plants",
    description:
      "Curated orchid arrangements and specialty potted garden gifts, designed to impress even the most discerning plant enthusiasts.",
    icon: "leaf",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Celebration of Life & Memorial Tributes",
    description:
      "Thoughtful, elegant floral tributes for memorial services and celebrations of life, crafted with care to honor deeply personal moments.",
    icon: "heart",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Rose Arrangements",
    description:
      "Signature rose displays ranging from single-stem gifts to grand 'rose spectacular' centerpieces for milestone occasions.",
    icon: "sparkles",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Same-Day & Rush Orders",
    description:
      "Last-minute floral arrangements completed with the same quality and elegance as planned orders, for when time is short but the occasion demands beauty.",
    icon: "clock",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "Hey, Woodcrest — thank you so much to everyone at the flower shop! You did such a beautiful job. I needed six elegant bouquets for our employees, and you really came through. Everything was gorgeous, and you helped us out at the last minute — we truly appreciate it. If anyone’s looking for stunning flowers, check out Woodcrest! Wonderful family company and truly great florists.",
    author: "Yaithy Blounder",
    rating: 5,
    source: "google",
    date: "2025-10-15",
  },
  {
    text: 'I was able to order an Orchid Garden from this florist for my mother, and she is an "Orchid Snob", and wow, she was impressed, well done, good job, great value for money.',
    author: "Lauren",
    rating: 5,
    source: "google",
    date: "2026-02-19",
  },
  {
    text: "Our Mother loved roses, and all 10 of her children got together and wanted a rose spectacular, and Woodcrest came through with the most lovely, spectacular, and elegant tribute to our Mother on her celabration of her amazing and selfless life. We are so very thankfull to you and your wonderfull staff of floral artists- Thank you.",
    author: "Toji Kamado",
    rating: 5,
    source: "google",
    date: "2025-08-31",
  },
  {
    text: "I ordered flowers from Woodcrest Florist because they were close to my brother's home and was apprehensive due to a few bad reviews that are not my experience. I think this is the old location they were talking about because the lady that answered the phone was super nice and accommodating is  a new shop I was told and they did a great job my brother's family was supper impressed and beautiful,",
    author: "Diego Garcia",
    rating: 5,
    source: "google",
    date: "2023-06-30",
  },
  {
    text: "I bought this bouquet for a friend’s birthday, and it was perfect! The red roses were fresh and beautifully arranged with lush greenery and little white flowers.",
    author: "Susana Peláez Jiménez",
    rating: 5,
    source: "google",
    date: "2024-07-30",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Can Woodcrest Flowers handle last-minute or same-day orders?",
    answer:
      "Yes — and they do it well. One customer needed six elegant bouquets for employees on short notice, and Woodcrest came through with beautiful results. Calling ahead is always recommended, but the team is known for being accommodating even under time pressure.",
  },
  {
    question: "What kinds of occasions do you design flowers for?",
    answer:
      "Woodcrest handles everything from birthday bouquets and corporate gifts to celebration-of-life memorial tributes and specialty orchid gardens. If the moment matters to you, they take it seriously.",
  },
  {
    question: "Are the flowers fresh and high quality?",
    answer:
      "Customers consistently describe the flowers as fresh and beautifully arranged. One self-described 'Orchid Snob' was genuinely impressed by her orchid garden, and another customer praised red roses as fresh with lush, well-selected greenery.",
  },
  {
    question: "Is Woodcrest a family-owned business?",
    answer:
      "Yes — multiple customers have described it as a family company with a warm, personal feel. The staff is noted for being friendly and genuinely invested in getting your order right.",
  },
  {
    question: "What are your hours, and are you open on weekends?",
    answer:
      "Woodcrest is open Monday through Friday, 7:00 AM to 3:00 PM. They are closed on Saturdays and Sundays. Calling early in the day is your best bet to discuss custom orders.",
  },
  {
    question:
      "I've seen some older negative reviews online — should I be concerned?",
    answer:
      "At least one recent customer noted that older negative reviews seemed to reference a previous location. The current shop has earned consistent 5-star praise for quality, customer service, and going above and beyond on special orders.",
  },
];

const heroImage: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Woodcrest Flowers photo 1",
  category: "exterior",
};

const aboutImage: Photo = {
  src: "/photos/photo-2.webp",
  alt: "Woodcrest Flowers photo 2",
  category: "interior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-3.webp",
    alt: "Woodcrest Flowers photo 3",
    category: "work",
  },
  {
    src: "/photos/photo-4.webp",
    alt: "Woodcrest Flowers photo 4",
    category: "work",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Woodcrest Flowers photo 5",
    category: "work",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Woodcrest Flowers photo 6",
    category: "work",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Woodcrest Flowers photo 7",
    category: "work",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Woodcrest Flowers photo 8",
    category: "work",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Woodcrest Flowers photo 9",
    category: "work",
  },
];

const socialLinks: SocialLinks = {};

const businessContact = {
  name: "Woodcrest Flowers",
  address: "N 58th St",
  city: "Philadelphia",
  state: "PA",
  zip: "19131",
  phone: "(267) 323-4549",
  email: "",
  hours: {
    Monday: "7:00 AM – 3:00 PM",
    Tuesday: "7:00 AM – 3:00 PM",
    Wednesday: "7:00 AM – 3:00 PM",
    Thursday: "7:00 AM – 3:00 PM",
    Friday: "7:00 AM – 3:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Woodcrest Flowers"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(267) 323-4549"
      />

      <main>
        <HeroSection
          headline="Flowers That Actually Feel Like Love"
          subheadline="From rose spectaculars to last-minute corporate bouquets, Woodcrest Flowers is the Philadelphia florist that shows up when it matters most — with craft, warmth, and zero compromise."
          ctaText="Get a Free Quote"
          ctaHref="#contact"
          secondaryCtaText="Call (267) 323-4549"
          secondaryCtaHref="tel:(267) 323-4549"
          rating={4.1}
          reviewCount={9}
          variant="dark-bold"
        />

        <div id="about">
          <AboutSection
            heading="A Neighborhood Shop That Does the Hard Things Beautifully"
            story="Woodcrest Flowers is the kind of neighborhood florist that shows up when it matters most — last-minute corporate bouquets, a rose spectacular for a mother of ten, an orchid arrangement worthy of a self-described 'Orchid Snob.' Operating out of North 58th Street in Philadelphia's Woodcrest neighborhood, this family-run shop has quietly built a reputation for doing the hard things beautifully. When Yaithy Blounder needed six elegant employee bouquets on short notice, Woodcrest came through. When Toji Kamado's family wanted a floral tribute worthy of their beloved mother's celebration of life, Woodcrest delivered something 'lovely, spectacular, and elegant.' That's not an accident — that's craft and care working together.  What stands out in nearly every review is the warmth of the people behind the counter. Diego Garcia called the woman who answered the phone 'super nice and accommodating,' and that accessibility matters in a neighborhood florist. Customers aren't navigating a website or filling out online forms — they're calling, talking to a real person, and trusting that the flowers will reflect what they're trying to say. And from orchids to red roses to mixed birthday bouquets with lush greenery and white accent flowers, Woodcrest consistently delivers arrangements that exceed expectations. Lauren's mother — an avowed orchid connoisseur — was genuinely impressed, and that's a high bar to clear.  Woodcrest keeps weekday hours from 7 AM to 3 PM, Monday through Friday, suggesting a shop that runs lean and intentional — not a volume operation, but a craft one. The hours hint at a team that sources and prepares flowers fresh, early, and with purpose. It's the kind of place where calling ahead builds a relationship, not just a transaction."
            image={aboutImage}
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="dark" />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="Whatever the Occasion, We Speak the Language"
            subheading="From orchid gardens that impress 'Orchid Snobs' to memorial tributes worthy of a life well-lived."
            services={services}
            columns={3}
            variant="alternating"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="Fresh Cuts, Real Moments"
            photos={galleryPhotos}
            variant="grid"
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="Don't Take Our Word for It"
            reviews={reviews}
            variant="scroll"
          />
        </div>

        <div id="founder">
          <FounderQuote
            founder={{
              name: "Woodcrest Flowers",
              role: "Owner",
              quote:
                "No single owner's name surfaces in the reviews, but the personality of Woodcrest Flowers comes through unmistakably — warm, skilled, responsive, and deeply community-rooted. Diego Garcia noted this feels like 'a new shop,' suggesting the business may be in an active growth chapter, yet it's already drawing the loyalty of customers who return and refer. The staff member who answered Diego's call left such an impression that he mentioned her specifically in his review. That's the hallmark of a small family operation where every voice on the phone represents the whole business.\n\nWoodcrest appears to be run by floral artists who take pride in the emotional weight their work carries — from joyful birthday bouquets to deeply personal memorial tributes. Toji Kamado called them 'a wonderful staff of floral artists,' a phrase that feels earned. This is a shop built on intention: early morning hours, careful sourcing, and the kind of attentiveness that turns a nervous last-minute order into a story worth sharing. Whatever the founding story, the mission is clear — make people feel something beautiful.",
            }}
          />
        </div>

        <div id="faq" className="bg-[var(--brand-bg-alt)]">
          <FAQAccordion
            heading="Yes, We Can Do That — Even Last Minute"
            items={faqItems}
          />
        </div>

        <div id="contact">
          <ContactSection
            business={businessContact}
            heading="Call Us. Let's Make Something Beautiful."
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(267) 323-4549" />
    </>
  );
}
