import type { Metadata } from "next";
import { DM_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
  name: "T&C Nail salon",
  address: "5227 Chestnut St",
  city: "Philadelphia",
  state: "PA",
  zip: "19139",
  phone: "(215) 472-4377",
  email: "",
  rating: 4.2,
  reviewCount: 133,
  hours: {
    Monday: "9:00 AM – 5:30 PM",
    Tuesday: "9:00 AM – 5:30 PM",
    Wednesday: "Closed",
    Thursday: "9:00 AM – 5:30 PM",
    Friday: "9:00 AM – 5:30 PM",
    Saturday: "9:00 AM – 5:30 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "T&C Nail Salon | West Philly's Most Loyal Chair",
  description:
    "T&C Nail Salon on Chestnut St, Philadelphia — expert acrylics, gel manis & pedicures from a family team clients trust for 9+ years. Call (215) 472-4377.",
  keywords: [
    "nail salon West Philadelphia",
    "acrylic nails Philadelphia",
    "gel manicure Philadelphia",
    "pedicure ingrown toenail care Philly",
    "nail art Philadelphia",
    "T&C Nail Salon Chestnut Street",
    "family nail salon Philadelphia",
    "best nail salon West Philly",
  ],
  openGraph: {
    title: "T&C Nail salon",
    description:
      "T&C Nail Salon on Chestnut St, Philadelphia — expert acrylics, gel manis & pedicures from a family team clients trust for 9+ years. Call (215) 472-4377.",
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
      className={`${dm_sans.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-dm-sans)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
