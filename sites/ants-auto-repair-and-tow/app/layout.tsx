import type { Metadata } from "next";
import { Hedvig_Letters_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const hedvig_letters_serif = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-hedvig-letters-serif",
  display: "swap",
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "Ant’s Auto Repair and Tow",
  address: "2750 N Broad St",
  city: "Philadelphia",
  state: "PA",
  zip: "19132",
  phone: "(267) 774-6361",
  email: "",
  rating: 4.7,
  reviewCount: 105,
  hours: {
    Monday: "Open 24 hours",
    Tuesday: "Open 24 hours",
    Wednesday: "Open 24 hours",
    Thursday: "Open 24 hours",
    Friday: "Open 24 hours",
    Saturday: "Open 24 hours",
    Sunday: "Open 24 hours",
  },
};

export const metadata: Metadata = {
  title: "Ant’s Auto Repair and Tow — auto repair in Philadelphia, PA",
  description:
    "Ant’s Auto Repair and Tow is a auto repair located in Philadelphia, PA. Honest wrenches. No games. 24/7.",
  keywords: ["auto repair", "Philadelphia", "PA", "Ant’s Auto Repair and Tow"],
  openGraph: {
    title: "Ant’s Auto Repair and Tow",
    description:
      "Ant’s Auto Repair and Tow is a auto repair located in Philadelphia, PA. Honest wrenches. No games. 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${hedvig_letters_serif.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-hedvig-letters-serif)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
