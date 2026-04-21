import type { Metadata } from "next";
import { Josefin_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  display: "swap",
  weight: ["400", "600", "700"],
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
  name: "S. Murphy Auto Repair",
  address: "5539 Chestnut St",
  city: "Philadelphia",
  state: "PA",
  zip: "19139",
  phone: "(215) 472-2759",
  email: "",
  rating: 4.6,
  reviewCount: 199,
  hours: {
    Monday: "9:00 AM – 6:00 PM",
    Tuesday: "9:00 AM – 6:00 PM",
    Wednesday: "9:00 AM – 6:00 PM",
    Thursday: "9:00 AM – 6:00 PM",
    Friday: "9:00 AM – 6:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "S. Murphy Auto Repair | Your Car Back. Better Than Before.",
  description:
    "West Philly's trusted collision and auto repair shop. Mr. Murphy's crew restores your car — and fights your insurance so you don't have to. Call (215) 472-2759.",
  keywords: [
    "auto body repair Philadelphia",
    "collision repair West Philadelphia",
    "insurance claim auto repair Philly",
    "car body shop Chestnut Street",
    "S. Murphy Auto Repair",
    "paint and body repair Philadelphia PA",
    "auto detailing Philadelphia",
    "frame repair Philadelphia",
  ],
  openGraph: {
    title: "S. Murphy Auto Repair",
    description:
      "West Philly's trusted collision and auto repair shop. Mr. Murphy's crew restores your car — and fights your insurance so you don't have to. Call (215) 472-2759.",
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
      className={`${josefin_sans.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-josefin-sans)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
