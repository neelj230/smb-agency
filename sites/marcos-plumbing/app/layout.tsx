import type { Metadata } from "next";
import {
  Libre_Baskerville,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
  weight: ["400", "700"],
});

const source_sans_3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "Marco's Plumbing & Heating",
  address: "2847 S Broad St",
  city: "Philadelphia",
  state: "PA",
  zip: "19148",
  phone: "(215) 555-0142",
  email: "info@marcosplumbing.com",
  rating: 4.8,
  reviewCount: 127,
  hours: {
    Monday: "7:00 AM – 6:00 PM",
    Tuesday: "7:00 AM – 6:00 PM",
    Wednesday: "7:00 AM – 6:00 PM",
    Thursday: "7:00 AM – 6:00 PM",
    Friday: "7:00 AM – 6:00 PM",
    Saturday: "8:00 AM – 2:00 PM",
    Sunday: "Emergency Only",
  },
};

export const metadata: Metadata = {
  title: "Marco's Plumbing & Heating — plumber in Philadelphia, PA",
  description:
    "Marco's Plumbing & Heating is a plumber located in Philadelphia, PA. South Philly's Most Trusted Plumber Since 1998",
  keywords: ["plumber", "Philadelphia", "PA", "Marco's Plumbing & Heating"],
  openGraph: {
    title: "Marco's Plumbing & Heating",
    description:
      "Marco's Plumbing & Heating is a plumber located in Philadelphia, PA. South Philly's Most Trusted Plumber Since 1998",
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
      className={`${libre_baskerville.variable} ${source_sans_3.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-source-sans-3)] antialiased"
        style={
          {
            "--font-display": "var(--font-libre-baskerville)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
