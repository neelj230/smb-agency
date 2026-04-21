import type { BusinessData } from "../../components/types";
import type { DesignBrief, GeneratedContent } from "../types";
import { escapeTsString } from "../utils";

/** Maps font family names to next/font/google import names */
const FONT_IMPORT_NAMES: Record<string, string> = {
  Figtree: "Figtree",
  Inter: "Inter",
  "Playfair Display": "Playfair_Display",
  "Be Vietnam Pro": "Be_Vietnam_Pro",
  "Instrument Serif": "Instrument_Serif",
  "Space Grotesk": "Space_Grotesk",
  Syne: "Syne",
  "DM Sans": "DM_Sans",
  "Libre Baskerville": "Libre_Baskerville",
  "Source Sans 3": "Source_Sans_3",
  Ranchers: "Ranchers",
  Caveat: "Caveat",
  Outfit: "Outfit",
  Poppins: "Poppins",
  Manrope: "Manrope",
  "Roboto Condensed": "Roboto_Condensed",
  "Hedvig Letters Serif": "Hedvig_Letters_Serif",
  "Bricolage Grotesque": "Bricolage_Grotesque",
  "Cormorant Garamond": "Cormorant_Garamond",
  "Pinyon Script": "Pinyon_Script",
  "Red Hat Mono": "Red_Hat_Mono",
  "Fragment Mono": "Fragment_Mono",
  "JetBrains Mono": "JetBrains_Mono",
};

/** Variable names for fonts (lowercase, no spaces) */
function fontVarName(family: string): string {
  return family
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function fontConstName(family: string): string {
  return family
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export function generateLayout(
  business: BusinessData,
  brief: DesignBrief,
  content: GeneratedContent,
): string {
  const displayFont = brief.font.display;
  const bodyFont = brief.font.body;
  const displayImport =
    FONT_IMPORT_NAMES[displayFont] || displayFont.replace(/\s+/g, "_");
  const bodyImport =
    FONT_IMPORT_NAMES[bodyFont] || bodyFont.replace(/\s+/g, "_");
  const displayConst = fontConstName(displayFont);
  const bodyConst = fontConstName(bodyFont);
  const displayVar = `--font-${fontVarName(displayFont)}`;
  const bodyVar = `--font-${fontVarName(bodyFont)}`;

  // Determine unique imports (avoid importing same font twice)
  const imports = new Set([displayImport, bodyImport]);
  const importLine = `import { ${[...imports].join(", ")}, JetBrains_Mono } from 'next/font/google'`;

  // Build display weights string
  const displayWeights = brief.font.displayWeights
    .map((w) => `'${w}'`)
    .join(", ");
  const bodyWeights = brief.font.bodyWeights.map((w) => `'${w}'`).join(", ");

  // Business data for schema
  const name = escapeTsString(business.name);
  const address = escapeTsString(business.address);
  const city = escapeTsString(business.city);
  const state = escapeTsString(business.state);
  const zip = escapeTsString(business.zip || "");
  const phone = escapeTsString(business.phone);
  const email = escapeTsString(business.email || "");
  const metaTitle = escapeTsString(content.metaTitle);
  const metaDesc = escapeTsString(content.metaDescription);

  // Hours
  const hoursEntries = business.hours
    ? Object.entries(business.hours)
        .map(([day, time]) => `    ${day}: '${escapeTsString(time)}'`)
        .join(",\n")
    : "";

  // Keywords
  const keywords = content.keywords
    .map((k) => `'${escapeTsString(k)}'`)
    .join(", ");

  return `import type { Metadata } from 'next'
${importLine}
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const ${displayConst} = ${displayImport}({
  subsets: ['latin'],
  variable: '${displayVar}',
  display: 'swap',${displayWeights ? `\n  weight: [${displayWeights}],` : ""}
})

${
  displayFont === bodyFont
    ? ""
    : `const ${bodyConst} = ${bodyImport}({
  subsets: ['latin'],
  variable: '${bodyVar}',
  display: 'swap',${bodyWeights ? `\n  weight: [${bodyWeights}],` : ""}
})

`
}const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const businessData = {
  name: '${name}',
  address: '${address}',
  city: '${city}',
  state: '${state}',
  zip: '${zip}',
  phone: '${phone}',
  email: '${email}',${business.rating ? `\n  rating: ${business.rating},` : ""}${business.reviewCount ? `\n  reviewCount: ${business.reviewCount},` : ""}${hoursEntries ? `\n  hours: {\n${hoursEntries},\n  },` : ""}
}

export const metadata: Metadata = {
  title: '${metaTitle}',
  description: '${metaDesc}',
  keywords: [${keywords}],
  openGraph: {
    title: '${name}',
    description: '${metaDesc}',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={\`\${${displayConst}.variable}${displayFont === bodyFont ? "" : ` \${${bodyConst}.variable}`} \${mono.variable}\`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(${bodyVar})] antialiased"
        style={
          {
            '--font-display': 'var(${displayVar})',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
`;
}
