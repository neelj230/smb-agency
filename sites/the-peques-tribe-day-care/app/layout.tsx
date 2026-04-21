import type { Metadata } from "next";
import { Ranchers, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const ranchers = Ranchers({
  subsets: ["latin"],
  variable: "--font-ranchers",
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
  name: "The Peques Tribe Day Care",
  address: "2014 E McAndrews Rd",
  city: "Medford",
  state: "OR",
  zip: "97504",
  phone: "(541) 690-7974",
  email: "",
  rating: 5,
  reviewCount: 16,
  hours: {
    Monday: "7:30 AM – 5:00 PM",
    Tuesday: "7:30 AM – 5:00 PM",
    Wednesday: "7:30 AM – 5:00 PM",
    Thursday: "7:30 AM – 5:00 PM",
    Friday: "7:30 AM – 5:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "The Peques Tribe Day Care | Where Little Ones Grow, Loved",
  description:
    "Top-rated infant & toddler daycare in Medford, OR. Spanish immersion, real-time parent updates & personalized care from day one. Call (541) 690-7974.",
  keywords: [
    "daycare Medford OR",
    "infant care Medford Oregon",
    "Spanish immersion daycare",
    "toddler preschool program Medford",
    "small group daycare Oregon",
    "bilingual daycare Medford",
    "parent communication app daycare",
  ],
  openGraph: {
    title: "The Peques Tribe Day Care",
    description:
      "Top-rated infant & toddler daycare in Medford, OR. Spanish immersion, real-time parent updates & personalized care from day one. Call (541) 690-7974.",
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
      className={`${ranchers.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-ranchers)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
