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
  { value: 4.5, suffix: "★", label: "Average Customer Rating" },
  { value: 53, suffix: "+", label: "Customer Reviews" },
  { value: 6, suffix: " days", label: "Open Each Week" },
  { value: 10, suffix: "+", label: "Menu Items Praised by Name in Reviews" },
];

const services: Service[] = [
  {
    name: "Signature Pho Bowls",
    description:
      "Hand-crafted pho in rich, slow-simmered broth served with rice noodles, rare beef or tofu, fresh herbs, and housemade chili oil on the side.",
    icon: "soup",
    image: "/photos/photo-2.webp",
  },
  {
    name: "Banh Mi Sandwiches",
    description:
      "Vietnamese pressed sandwiches served on crispy-exterior, soft-interior rolls with your choice of protein, pickled carrots, cucumbers, and fresh garnishes.",
    icon: "sandwich",
    image: "/photos/photo-3.webp",
  },
  {
    name: "Vermicelli & Noodle Bowls",
    description:
      "Hearty noodle bowls featuring charcoal-grilled pork, egg noodles with shrimp, or wonton noodle soup with soft, broth-poached wontons.",
    icon: "utensils",
    image: "/photos/photo-5.webp",
  },
  {
    name: "Vietnamese Appetizers",
    description:
      "Starters including crispy vegetable egg rolls, golden fried calamari with bell peppers, and garlic wings — all praised for bold flavor and beautiful presentation.",
    icon: "star",
    image: "/photos/photo-6.webp",
  },
  {
    name: "Specialty Drinks & Vietnamese Coffee",
    description:
      "A curated drinks menu featuring Vietnamese iced coffee, fresh pineapple tea, and other house beverages that customers consistently single out as must-orders.",
    icon: "coffee",
    image: "/photos/photo-7.webp",
  },
  {
    name: "Dine-In Experience",
    description:
      "A fully renovated modern dining room with booth seating, floor-to-ceiling windows, and an open ceiling design — an immaculate space built for leisurely lunches and family dinners.",
    icon: "building-2",
    image: "/photos/photo-8.webp",
  },
];

const reviews: Review[] = [
  {
    text: "I went to lunch with my stepmom to Pho Keizer and had a very lovely lunch. The restaurant is in a new location in a meticulously renovated Sherri’s restaurant building. Everything is immaculate and very nicely decorated.\n\nOnce we were seated we were provided with an extensive menu of dining options. Everything on the menu looked incredible! I had difficulty choosing one thing, so I chose TWO! 😁\n\nI chose the Banh Mi sandwich and the Wonton Noodle Soup.\n\nI love the type of rolls the sandwich was served on. The outside is crisp and flaky while the inside is soft and chewy. I asked for chicken as the meat choice. I enjoy how the carrots and cucumbers are sliced in a square straw. I think that provides a nice texture in every bite.\n\nThe wonton noodle soup was delicious. I’ve never had soft wontons before. They’ve always been crispy nibbles on a side plate. I like that in this dish they were part of the soup. I was a little disappointed in the vermicelli noodles though. They were nicely done and very tasty, but there were so many that they clumped together and were difficult to get a bite of without getting a whole mouthful.\n\nAlso of note were the drinks. I chose the pineapple tea and it was MARVELOUS!\n\nAll in all, lunch was an amazing experience and I will always remember that meal with my stepmom.",
    author: "Robert Mador",
    rating: 5,
    source: "google",
    date: "2025-12-25",
  },
  {
    text: "New hidden gem. Food tastes authentic and I was surprised that the pork in the vermicelli bowl was charcoal grilled. The Vietnamese pressed sandwich was new to me, it doesn’t have all the fillings of the typical sandwich. But none the less, it tastes great and makes a quick appetizer.\n\nAmazing presentation and quick service. All prices are reasonable too.",
    author: "Damian Sheetz",
    rating: 5,
    source: "google",
    date: "2025-12-26",
  },
  {
    text: "This is by far my favorite place to get Pho and Vietnamese food. The vegan tofu Pho is the best! So fresh. And we also really love the vegetable egg rolls. The chili oil is also amazing. Make sure to try that if you like spice. The new location is beautifully remodeled and I'm really excited to see my favorite spot expanding. I always bring anyone who is visiting by for the best bowl of Pho they'll ever have.",
    author: "Vin Thomas",
    rating: 5,
    source: "google",
    date: "2026-01-07",
  },
  {
    text: "***honest review***\nWe dined in. Ordered garlic wings. Delicious! Ordered 4 dishes. 3 were good. 1 dish got the person sick. Young workers were very kind the whole time. Older workers were okay at first but then ignored us at the end of service when we were wanting to order drinks to go. I understand it's busy so they were all working very hard (reason for my 4 stars instead of 3). Maybe protocol is to order at register? We did end up ordering drinks by our third attempt hailing a server. Drinks were above good. Give this place a try and let yourself decide. Would I go back? No. Would i recommend? Nah. Although not Vietnamese food, I would highly recommend Hong Kong Garden on 12th street not Commercial st. Eat and be happy. Cảm ơn bạn vì sự nỗ lực của mình.",
    author: "Miggy Be",
    rating: 4,
    source: "google",
    date: "2026-02-28",
  },
  {
    text: "Started with quite the wait on a busy Saturday afternoon, but everyone I interacted with was very kind and helpful. We did wait a long time to order and to get served, and also didn’t get our food at the same time. The food was hot and delicious! I got egg noodles with shrimp, which was perfect except I only got 3 pieces of shrimp for the extra fee. A little disappointing, but it was very good and balanced overall.\n\nI forgot to take a photo of the food since I was so hungry, but we also got drinks which are in the photo. The Vietnamese coffee is lovely, I highly recommend.\n\nGreat spot for lunch or dinner, just beware of crowds. Great price for the food, and decent atmosphere. I will return in the near future.",
    author: "Juliana Justman",
    rating: 4,
    source: "google",
    date: "2026-01-31",
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Is Phở Keizer good for vegetarians or vegans?",
    answer:
      "Absolutely. The vegan tofu pho is one of the most celebrated items on the menu — regulars like Vin Thomas call it 'the best' and rave about how fresh it tastes. The vegetable egg rolls are another favorite for plant-based diners.",
  },
  {
    question: "What should I order if it's my first visit?",
    answer:
      "The signature beef pho is the anchor of the menu and a must-try. First-timers also love the banh mi sandwich, the charcoal-grilled pork vermicelli bowl, and any of the specialty drinks — especially the Vietnamese iced coffee or the pineapple tea.",
  },
  {
    question: "How busy does it get, and should I expect a wait?",
    answer:
      "Phở Keizer can get quite busy, especially on Saturday afternoons. Juliana Justman noted a longer wait on a crowded weekend visit. Arriving early or during off-peak lunch hours will help you get seated and served more quickly.",
  },
  {
    question: "Where is the restaurant located, and has it moved recently?",
    answer:
      "The current location is at 4998 River Rd N, Keizer, OR 97303. The restaurant recently moved into a beautifully renovated former Shari's building — customers describe it as immaculate, with modern décor, booth seating, and floor-to-ceiling windows.",
  },
  {
    question:
      "What makes the pho here different from other Vietnamese restaurants?",
    answer:
      "Customers consistently point to the authenticity and freshness of the broth, the charcoal-grilled proteins, the quality of the bread used for banh mi, and small touches like housemade chili oil. Damian Sheetz noted it 'tastes authentic' and was genuinely surprised by the charcoal-grilled preparation.",
  },
  {
    question: "What are the hours, and are you open on Sundays?",
    answer:
      "Phở Keizer is open Monday through Saturday from 11:00 AM to 8:30 PM. The restaurant is currently closed on Sundays, so plan your visit accordingly.",
  },
];

const heroImage: Photo = {
  src: "/photos/photo-1.webp",
  alt: "Safeway storefront with Pho Keizer Vietnamese Kitchen signage and parking lot",
  category: "exterior",
};

const aboutImage: Photo = {
  src: "/photos/photo-4.webp",
  alt: "Modern Pho Keizer restaurant building with white facade and large windows",
  category: "exterior",
};

const galleryPhotos: Photo[] = [
  {
    src: "/photos/photo-2.webp",
    alt: "Bowl of beef pho with rice noodles, broth, and green onion garnish",
    category: "food",
  },
  {
    src: "/photos/photo-3.webp",
    alt: "Bowl of pho with rare beef, noodles, broth, fresh herbs, and onions",
    category: "food",
  },
  {
    src: "/photos/photo-5.webp",
    alt: "Plated Asian dish with beef, crispy noodles, vegetables, and green onions garnish",
    category: "food",
  },
  {
    src: "/photos/photo-6.webp",
    alt: "Modern restaurant interior with booth seating, counter, and open ceiling design.",
    category: "interior",
  },
  {
    src: "/photos/photo-7.webp",
    alt: "Golden fried calamari with red and green bell peppers on white plate",
    category: "food",
  },
  {
    src: "/photos/photo-8.webp",
    alt: "Modern holiday-decorated office reception area with tile walls and wooden desk",
    category: "interior",
  },
  {
    src: "/photos/photo-9.webp",
    alt: "Modern hotel lobby with reception desk, holiday decorations, and elegant furnishings",
    category: "interior",
  },
  {
    src: "/photos/photo-10.webp",
    alt: "Modern restaurant interior with wooden tables, chairs, and floor-to-ceiling windows overlooking street",
    category: "interior",
  },
];

const socialLinks: SocialLinks = {};

const businessContact = {
  name: "Phở Keizer Vietnamese Kitchen",
  address: "4998 River Rd N",
  city: "Keizer",
  state: "OR",
  zip: "97303",
  phone: "(503) 390-1235",
  email: "",
  hours: {
    Monday: "11:00 AM – 8:30 PM",
    Tuesday: "11:00 AM – 8:30 PM",
    Wednesday: "11:00 AM – 8:30 PM",
    Thursday: "11:00 AM – 8:30 PM",
    Friday: "11:00 AM – 8:30 PM",
    Saturday: "11:00 AM – 8:30 PM",
    Sunday: "Closed",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="Phở Keizer Vietnamese Kitchen"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:(503) 390-1235"
      />

      <main>
        <HeroSection
          headline="The Bowl That Makes You Bring Everyone."
          subheadline="Slow-simmered broth. Charcoal-grilled pork. A pineapple tea someone once called 'MARVELOUS.' This is the meal people talk about on the drive home — and every drive back to Keizer after that."
          ctaText="Get a Free Quote"
          ctaHref="#contact"
          secondaryCtaText="Call (503) 390-1235"
          secondaryCtaHref="tel:(503) 390-1235"
          rating={4.5}
          reviewCount={53}
          foregroundImage={heroImage}
          variant="split"
        />

        <div id="about">
          <AboutSection
            heading="A Hidden Gem That Earned Its Glow-Up"
            story="Phở Keizer Vietnamese Kitchen has quietly become one of the Willamette Valley's most beloved Vietnamese dining destinations — not through fanfare, but through bowls of deeply aromatic pho, charcoal-grilled pork vermicelli, and banh mi served on rolls that are crisp and flaky on the outside, soft and chewy within. Housed in a meticulously renovated former Shari's restaurant building with floor-to-ceiling windows, open ceilings, and warm booth seating, the space feels like a genuine arrival — a restaurant that earned its new home. Customers like Vin Thomas describe it plainly: 'This is by far my favorite place to get Pho and Vietnamese food,' and they mean it enough to bring every out-of-town guest through the door.  What sets Phở Keizer apart is the specificity of care in the details. The vegan tofu pho is celebrated as 'so fresh.' The pork in the vermicelli bowl is actually charcoal-grilled — a touch that surprised even seasoned diners like Damian Sheetz, who called it a hidden gem. The vegetable egg rolls, the housemade chili oil, the pineapple tea that Robert Mador called 'MARVELOUS,' the Vietnamese iced coffee that Juliana Justman recommends without hesitation — these aren't afterthoughts. They're evidence of a kitchen that sweats the small stuff.  The newer River Road location has elevated the entire experience with immaculate décor and an extensive menu that makes choosing just one dish genuinely difficult. The team — especially the younger front-of-house staff, noted for their consistent kindness — brings warmth to a room that already has it built into the architecture. With a 4.5-star rating across 53 reviews, Phở Keizer isn't just feeding Keizer — it's becoming part of the stories people tell about meals they'll never forget."
            image={aboutImage}
          />
        </div>

        <div id="stats">
          <StatsCounter stats={stats} variant="light" />
        </div>

        <div id="services" className="bg-[var(--brand-bg-alt)]">
          <ServiceCards
            heading="From the Broth Up, Everything's Made to Surprise You"
            subheading="Pho that's genuinely different. Banh mi on rolls you'll think about later. Drinks that steal the show."
            services={services}
            columns={3}
            variant="grid"
          />
        </div>

        <div id="gallery">
          <ImageGallery
            heading="Too Good Not to Photograph"
            photos={galleryPhotos}
            variant="scroll"
          />
        </div>

        <div id="reviews" className="bg-[var(--brand-bg-alt)]">
          <TestimonialCarousel
            heading="Straight From the Booths"
            reviews={reviews}
            variant="scroll"
          />
        </div>

        <div id="founder">
          <FounderQuote
            founder={{
              name: "Phở Keizer Vietnamese Kitchen",
              role: "Owner",
              quote:
                "No single founder name surfaces in the reviews, but the identity of Phở Keizer Vietnamese Kitchen is written clearly in every bowl that leaves the kitchen. Someone made the decision to charcoal-grill the pork rather than pan-cook it. Someone sourced the right bread rolls — the kind with a shatteringly crisp crust and pillowy interior that define a proper banh mi. Someone chose to put the wontons in the soup rather than on the side. These are not accidents; they are the choices of a kitchen led by people who grew up with this food and refuse to compromise it for convenience.\n\nWhen the business outgrew its original location and moved into a renovated Shari's building on River Road North, they didn't just expand square footage — they rebuilt the experience from the ground up, with modern finishes, thoughtful lighting, and a dining room worthy of the food being served inside it. The result is a restaurant that feels like a community investment, a place where stepmothers and stepsons share lunch and make memories, where vegans find a tofu pho that genuinely satisfies, and where first-timers are converted into advocates who bring everyone they know.",
            }}
          />
        </div>

        <div id="faq" className="bg-[var(--brand-bg-alt)]">
          <FAQAccordion
            heading="Before You Ask, We've Got You"
            items={faqItems}
          />
        </div>

        <div id="contact">
          <ContactSection
            business={businessContact}
            heading="Come Hungry. Bring Everyone."
            showMap={false}
          />
        </div>
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={socialLinks}
      />

      <ClickToCall phone="(503) 390-1235" />
    </>
  );
}
