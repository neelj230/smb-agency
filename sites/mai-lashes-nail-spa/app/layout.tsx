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
  name: "Mai Lashes & Nail Spa",
  address: "2910 S 70th St Unit 3",
  city: "Philadelphia",
  state: "PA",
  zip: "19142",
  phone: "(267) 969-5262",
  email: "",
  rating: 4.8,
  reviewCount: 319,
  hours: {
    Monday: "Closed",
    Tuesday: "9:00 AM – 6:30 PM",
    Wednesday: "9:00 AM – 6:30 PM",
    Thursday: "9:00 AM – 6:30 PM",
    Friday: "9:00 AM – 6:30 PM",
    Saturday: "9:00 AM – 6:30 PM",
    Sunday: "10:30 AM – 4:00 PM",
  },
};

export const metadata: Metadata = {
  title: "Mai Lashes & Nail Spa — nail salon in Philadelphia, PA",
  description:
    "Mai Lashes & Nail Spa is a nail salon located in Philadelphia, PA. Flawless Shape. Every Single Time.",
  keywords: ["nail salon", "Philadelphia", "PA", "Mai Lashes & Nail Spa"],
  openGraph: {
    title: "Mai Lashes & Nail Spa",
    description:
      "Mai Lashes & Nail Spa is a nail salon located in Philadelphia, PA. Flawless Shape. Every Single Time.",
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
