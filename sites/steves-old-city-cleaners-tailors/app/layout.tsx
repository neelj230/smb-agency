import type { Metadata } from "next";
import { Libre_Caslon_Text, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const libre_caslon_text = Libre_Caslon_Text({
  subsets: ["latin"],
  variable: "--font-libre-caslon-text",
  display: "swap",
  weight: ["400", "700"],
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
  name: "Steve’s Old City Cleaners & Tailors",
  address: "102 Chestnut St",
  city: "Philadelphia",
  state: "PA",
  zip: "19106",
  phone: "(215) 427-2550",
  email: "",
  rating: 4.8,
  reviewCount: 107,
  hours: {
    Monday: "Closed",
    Tuesday: "9:00 AM – 7:00 PM",
    Wednesday: "9:00 AM – 7:00 PM",
    Thursday: "9:00 AM – 7:00 PM",
    Friday: "9:00 AM – 7:00 PM",
    Saturday: "9:00 AM – 3:30 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title:
    "Steve's Old City Cleaners & Tailors | Fifty Years. Every Stitch Intentional.",
  description:
    "Expert tailoring & dry cleaning in Old City, Philadelphia. Steve has 50 years of precision craftsmanship for suits, gowns & formal wear. Call (215) 427-2550.",
  keywords: [
    "tailor Philadelphia",
    "Old City tailor",
    "suit alterations Philadelphia",
    "bridal gown alterations Philadelphia",
    "tuxedo tailoring Philadelphia",
    "dry cleaning Old City",
    "menswear alterations Philadelphia",
  ],
  openGraph: {
    title: "Steve’s Old City Cleaners & Tailors",
    description:
      "Expert tailoring & dry cleaning in Old City, Philadelphia. Steve has 50 years of precision craftsmanship for suits, gowns & formal wear. Call (215) 427-2550.",
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
      className={`${libre_caslon_text.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-libre-caslon-text)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
