import type { BusinessData } from "../../components/types";
import type {
  DesignBrief,
  SectionSelection,
  GeneratedContent,
  PhotoManifest,
} from "../types";
import { escapeTsString, escapeJsxAttr } from "../utils";

/** Generate app/page.tsx — the main homepage */
export function generatePage(
  business: BusinessData,
  brief: DesignBrief,
  sections: SectionSelection[],
  content: GeneratedContent,
  photos: PhotoManifest,
  navLinks: { label: string; href: string }[],
): string {
  const lines: string[] = [];

  // --- Imports ---
  lines.push(generateImports(sections));
  lines.push("");

  // --- Data constants ---
  lines.push(generateNavLinks(navLinks));
  lines.push("");

  if (hasSection(sections, "stats") && business.stats?.length) {
    lines.push(generateStats(business));
    lines.push("");
  }

  if (hasSection(sections, "services") && business.services?.length) {
    lines.push(generateServices(business));
    lines.push("");
  }

  if (hasSection(sections, "reviews") && business.reviews?.length) {
    lines.push(generateReviews(business));
    lines.push("");
  }

  if (hasSection(sections, "team") && business.team?.length) {
    lines.push(generateTeam(business));
    lines.push("");
  }

  if (hasSection(sections, "faq") && business.faq?.length) {
    lines.push(generateFaq(business));
    lines.push("");
  }

  if (hasSection(sections, "process") && content.processSteps?.length) {
    lines.push(generateProcessSteps(content));
    lines.push("");
  }

  if (photos.heroImage) {
    lines.push(generatePhotoConst("heroImage", photos.heroImage));
    lines.push("");
  }

  if (photos.aboutImage) {
    lines.push(generatePhotoConst("aboutImage", photos.aboutImage));
    lines.push("");
  }

  if (hasSection(sections, "gallery") && photos.galleryImages.length) {
    lines.push(generateGalleryPhotos(photos));
    lines.push("");
  }

  if (business.socialLinks) {
    lines.push(generateSocialLinks(business));
    lines.push("");
  }

  lines.push(generateBusinessContact(business));
  lines.push("");

  // --- JSX ---
  lines.push(generateJsx(business, brief, sections, content, photos, navLinks));

  return lines.join("\n");
}

function hasSection(sections: SectionSelection[], anchorId: string): boolean {
  return sections.some((s) => s.anchorId === anchorId);
}

/** Escape for single-quoted TS string literals */
function esc(s: string): string {
  return escapeTsString(s);
}

/** Escape for double-quoted JSX attributes */
function jesc(s: string): string {
  return escapeJsxAttr(s);
}

// ---- Import generation ----

function generateImports(sections: SectionSelection[]): string {
  const componentImports = new Set<string>();
  const typeImports = new Set<string>();

  // Always needed
  componentImports.add("Navbar");
  componentImports.add("Footer");
  componentImports.add("ClickToCall");

  for (const s of sections) {
    componentImports.add(s.component);

    // Track type imports needed
    switch (s.component) {
      case "ServiceCards":
        typeImports.add("Service");
        break;
      case "TestimonialCarousel":
        typeImports.add("Review");
        break;
      case "TeamGrid":
        typeImports.add("TeamMember");
        break;
      case "FAQAccordion":
        typeImports.add("FAQItem");
        break;
      case "StatsCounter":
        typeImports.add("Stat");
        break;
      case "ProcessSteps":
        typeImports.add("ProcessStep");
        break;
    }
  }

  // Always need these types
  typeImports.add("NavLink");
  if (
    sections.some((s) =>
      ["HeroSection", "AboutSection", "ImageGallery"].includes(s.component),
    )
  ) {
    typeImports.add("Photo");
  }
  typeImports.add("SocialLinks");

  const compLines = [...componentImports].map(
    (c) => `import { ${c} } from '@/components/${c}'`,
  );

  const typeLine = `import type { ${[...typeImports].join(", ")} } from '@/components/types'`;

  return [...compLines, typeLine].join("\n");
}

// ---- Data constant generators ----

function generateNavLinks(links: { label: string; href: string }[]): string {
  const items = links
    .map((l) => `  { label: '${esc(l.label)}', href: '${l.href}' }`)
    .join(",\n");
  return `const navLinks: NavLink[] = [\n${items},\n]`;
}

function generateStats(business: BusinessData): string {
  const items = (business.stats || [])
    .map((s) => {
      const parts = [`    value: ${s.value}`];
      if (s.suffix) parts.push(`suffix: '${esc(s.suffix)}'`);
      if (s.prefix) parts.push(`prefix: '${esc(s.prefix)}'`);
      parts.push(`label: '${esc(s.label)}'`);
      return `  { ${parts.join(", ")} }`;
    })
    .join(",\n");
  return `const stats: Stat[] = [\n${items},\n]`;
}

function generateServices(business: BusinessData): string {
  const items = (business.services || [])
    .map((s) => {
      const parts = [
        `    name: '${esc(s.name)}'`,
        `    description: '${esc(s.description)}'`,
      ];
      if (s.icon) parts.push(`    icon: '${esc(s.icon)}'`);
      if (s.image) parts.push(`    image: '${esc(s.image)}'`);
      return `  {\n${parts.join(",\n")},\n  }`;
    })
    .join(",\n");
  return `const services: Service[] = [\n${items},\n]`;
}

function generateReviews(business: BusinessData): string {
  // Use top reviews by rating, limit to 6
  const reviews = (business.reviews || [])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const items = reviews
    .map((r) => {
      const parts = [
        `    text: '${esc(r.text)}'`,
        `    author: '${esc(r.author)}'`,
        `    rating: ${r.rating}`,
        `    source: '${r.source}'`,
      ];
      if (r.date) parts.push(`    date: '${r.date}'`);
      return `  {\n${parts.join(",\n")},\n  }`;
    })
    .join(",\n");
  return `const reviews: Review[] = [\n${items},\n]`;
}

function generateTeam(business: BusinessData): string {
  const items = (business.team || [])
    .map((m) => {
      const parts = [
        `    name: '${esc(m.name)}'`,
        `    role: '${esc(m.role)}'`,
      ];
      if (m.bio) parts.push(`    bio: '${esc(m.bio)}'`);
      if (m.image) parts.push(`    image: '${esc(m.image)}'`);
      if (m.credentials?.length) {
        parts.push(
          `    credentials: [${m.credentials.map((c) => `'${esc(c)}'`).join(", ")}]`,
        );
      }
      return `  {\n${parts.join(",\n")},\n  }`;
    })
    .join(",\n");
  return `const team: TeamMember[] = [\n${items},\n]`;
}

function generateFaq(business: BusinessData): string {
  const items = (business.faq || [])
    .map((f) => {
      return `  {\n    question: '${esc(f.question)}',\n    answer: '${esc(f.answer)}',\n  }`;
    })
    .join(",\n");
  return `const faqItems: FAQItem[] = [\n${items},\n]`;
}

function generateProcessSteps(content: GeneratedContent): string {
  const steps = content.processSteps || [];
  const items = steps
    .map((s) => {
      return `  {\n    title: '${esc(s.title)}',\n    description: '${esc(s.description)}',\n  }`;
    })
    .join(",\n");
  return `const processSteps: ProcessStep[] = [\n${items},\n]`;
}

function generatePhotoConst(
  name: string,
  photo: { src: string; alt: string; category: string },
): string {
  return `const ${name}: Photo = {\n  src: '${photo.src}',\n  alt: '${esc(photo.alt)}',\n  category: '${photo.category}',\n}`;
}

function generateGalleryPhotos(photos: PhotoManifest): string {
  const items = photos.galleryImages
    .map((p) => {
      return `  { src: '${p.src}', alt: '${esc(p.alt)}', category: '${p.category}' }`;
    })
    .join(",\n");
  return `const galleryPhotos: Photo[] = [\n${items},\n]`;
}

function generateSocialLinks(business: BusinessData): string {
  const links = business.socialLinks || {};
  const entries = Object.entries(links)
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k}: '${esc(v!)}'`)
    .join(",\n");
  if (!entries) return `const socialLinks: SocialLinks = {}`;
  return `const socialLinks: SocialLinks = {\n${entries},\n}`;
}

function generateBusinessContact(business: BusinessData): string {
  const hoursEntries = business.hours
    ? Object.entries(business.hours)
        .map(([day, time]) => `    ${day}: '${esc(time)}'`)
        .join(",\n")
    : "";

  return `const businessContact = {
  name: '${esc(business.name)}',
  address: '${esc(business.address)}',
  city: '${esc(business.city)}',
  state: '${esc(business.state)}',
  zip: '${esc(business.zip || "")}',
  phone: '${esc(business.phone)}',
  email: '${esc(business.email || "")}',${hoursEntries ? `\n  hours: {\n${hoursEntries},\n  },` : ""}
}`;
}

// ---- JSX generation ----

function generateJsx(
  business: BusinessData,
  brief: DesignBrief,
  sections: SectionSelection[],
  content: GeneratedContent,
  photos: PhotoManifest,
  navLinks: { label: string; href: string }[],
): string {
  const jsxSections: string[] = [];

  for (const s of sections) {
    const heading = content.sectionHeadings[s.anchorId];
    const jsx = generateSectionJsx(
      s,
      business,
      brief,
      content,
      photos,
      heading,
    );
    if (jsx) {
      if (s.altBackground && s.anchorId !== "hero") {
        jsxSections.push(
          `        <div id="${s.anchorId}" className="bg-[var(--brand-bg-alt)]">\n          ${jsx}\n        </div>`,
        );
      } else if (s.anchorId !== "hero") {
        jsxSections.push(
          `        <div id="${s.anchorId}">\n          ${jsx}\n        </div>`,
        );
      } else {
        jsxSections.push(`        ${jsx}`);
      }
    }
  }

  return `export default function HomePage() {
  return (
    <>
      <Navbar
        businessName="${jesc(business.name)}"
        links={navLinks}
        ctaText="Call Now"
        ctaHref="tel:${jesc(business.phone)}"
      />

      <main>
${jsxSections.join("\n\n")}
      </main>

      <Footer
        business={businessContact}
        links={navLinks}
        socialLinks={${business.socialLinks ? "socialLinks" : "{}"}}
      />

      <ClickToCall phone="${jesc(business.phone)}" />
    </>
  )
}
`;
}

function generateSectionJsx(
  section: SectionSelection,
  business: BusinessData,
  brief: DesignBrief,
  content: GeneratedContent,
  photos: PhotoManifest,
  heading?: { heading: string; subheading?: string },
): string | null {
  switch (section.component) {
    case "HeroSection":
      return generateHeroJsx(business, brief, content, photos);
    case "StatsCounter":
      return `<StatsCounter stats={stats} variant="${section.variant || "dark"}" />`;
    case "ServiceCards": {
      const h = heading || { heading: "What We Do" };
      const cols = section.props.columns || 3;
      return `<ServiceCards
            heading="${jesc(h.heading)}"
            ${h.subheading ? `subheading="${jesc(h.subheading)}"` : ""}
            services={services}
            columns={${cols}}
            ${section.variant ? `variant="${section.variant}"` : ""}
          />`;
    }
    case "AboutSection": {
      const h = heading || { heading: "Our Story" };
      const story =
        business.brandNarrative ||
        business.ownerStory ||
        content.aboutStory ||
        "";
      const hasAboutImage = photos.aboutImage;
      return `<AboutSection
            heading="${jesc(h.heading)}"
            story="${jesc(story)}"
            ${hasAboutImage ? "image={aboutImage}" : ""}
          />`;
    }
    case "ProcessSteps": {
      const h = heading || { heading: "How It Works" };
      return `<ProcessSteps
            heading="${jesc(h.heading)}"
            ${h.subheading ? `subheading="${jesc(h.subheading)}"` : ""}
            steps={processSteps}
            ${section.variant ? `variant="${section.variant}"` : ""}
          />`;
    }
    case "TestimonialCarousel": {
      const h = heading || { heading: "What Our Customers Say" };
      return `<TestimonialCarousel
            heading="${jesc(h.heading)}"
            reviews={reviews}
            variant="${section.variant || "scroll"}"
          />`;
    }
    case "ImageGallery": {
      const h = heading || { heading: "Our Work" };
      return `<ImageGallery
            heading="${jesc(h.heading)}"
            photos={galleryPhotos}
            ${section.variant ? `variant="${section.variant}"` : ""}
          />`;
    }
    case "TeamGrid": {
      const h = heading || { heading: "Meet the Team" };
      return `<TeamGrid
            heading="${jesc(h.heading)}"
            ${h.subheading ? `subheading="${jesc(h.subheading)}"` : ""}
            members={team}
          />`;
    }
    case "FounderQuote": {
      return `<FounderQuote
            founder={{
              name: '${esc(business.team?.[0]?.name || business.name)}',
              role: '${esc(business.team?.[0]?.role || "Owner")}',
              quote: '${esc(business.ownerStory || "")}',
            }}
          />`;
    }
    case "FAQAccordion": {
      const h = heading || { heading: "Common Questions" };
      return `<FAQAccordion heading="${jesc(h.heading)}" items={faqItems} />`;
    }
    case "ContactSection": {
      const h = heading || { heading: "Get In Touch" };
      return `<ContactSection
            business={businessContact}
            heading="${jesc(h.heading)}"
            showMap={false}
          />`;
    }
    default:
      return null;
  }
}

function generateHeroJsx(
  business: BusinessData,
  brief: DesignBrief,
  content: GeneratedContent,
  photos: PhotoManifest,
): string {
  // Upgrade centered → photo-bg when photos exist (centered-on-empty is last resort)
  let variant = brief.hero.variant;
  if (variant === "centered" && photos.heroImage) {
    variant = "photo-bg";
  }

  const props: string[] = [
    `headline="${jesc(content.headline)}"`,
    `subheadline="${jesc(content.subheadline)}"`,
    `ctaText="Get a Free Quote"`,
    `ctaHref="#contact"`,
    `secondaryCtaText="Call ${jesc(business.phone)}"`,
    `secondaryCtaHref="tel:${jesc(business.phone)}"`,
  ];

  if (business.rating) props.push(`rating={${business.rating}}`);
  if (business.reviewCount) props.push(`reviewCount={${business.reviewCount}}`);

  if (variant === "split" && photos.heroImage) {
    props.push(`foregroundImage={heroImage}`);
  } else if (
    (variant === "photo-bg" || variant === "blurred-reveal") &&
    photos.heroImage
  ) {
    props.push(`backgroundImage={heroImage}`);
  }

  props.push(`variant="${variant}"`);

  return `<HeroSection\n            ${props.join("\n            ")}\n          />`;
}
