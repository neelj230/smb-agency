import type { Metadata } from "next";
import { Lora, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
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
  name: "Regan's Flower Shop",
  address: "1219 N 52nd St #23",
  city: "Philadelphia",
  state: "PA",
  zip: "19131",
  phone: "(215) 879-3810",
  email: "",
  rating: 5,
  reviewCount: 7,
  hours: {
    Monday: "11:00 AM – 6:00 PM",
    Tuesday: "11:00 AM – 6:00 PM",
    Wednesday: "11:00 AM – 6:00 PM",
    Thursday: "11:00 AM – 6:00 PM",
    Friday: "11:00 AM – 6:00 PM",
    Saturday: "11:00 AM – 6:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Regan's Flower Shop | Flowers Arranged With Heart",
  description:
    "Custom floral arrangements in West Philadelphia. Mrs. Regan designs from scratch — no catalogues, no templates. Walk-ins welcome. Call (215) 879-3810.",
  keywords: [
    "custom floral arrangements Philadelphia",
    "florist West Philadelphia",
    "same-day flower arrangements",
    "sympathy bouquets Philadelphia",
    "holiday floral arrangements",
    "walk-in florist Philly",
    "plant gifts Philadelphia",
  ],
  openGraph: {
    title: "Regan's Flower Shop",
    description:
      "Custom floral arrangements in West Philadelphia. Mrs. Regan designs from scratch — no catalogues, no templates. Walk-ins welcome. Call (215) 879-3810.",
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
      className={`${lora.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-lora)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
