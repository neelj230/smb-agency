import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "Oteri's Italian Bakery",
  address: "6323 Woodland Ave",
  city: "Philadelphia",
  state: "PA",
  zip: "19142",
  phone: "(215) 724-0793",
  email: "",
  rating: 4.1,
  reviewCount: 359,
  hours: {
    Monday: "7:00 AM – 6:00 PM",
    Tuesday: "7:00 AM – 6:00 PM",
    Wednesday: "7:00 AM – 6:00 PM",
    Thursday: "7:00 AM – 6:00 PM",
    Friday: "7:00 AM – 6:00 PM",
    Saturday: "7:00 AM – 6:00 PM",
    Sunday: "8:00 AM – 3:00 PM",
  },
};

export const metadata: Metadata = {
  title: "Oteri's Italian Bakery — Philadelphia, PA",
  description:
    "Custom celebration cakes and Italian pastries on Woodland Avenue. Open 7 AM, six days a week.",
  keywords: ["bakery", "Philadelphia", "PA", "Italian bakery", "custom cakes", "Woodland Ave"],
  openGraph: {
    title: "Oteri's Italian Bakery",
    description:
      "Custom celebration cakes and Italian pastries on Woodland Avenue. Open 7 AM, six days a week.",
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
      className={`${cormorant.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-cormorant)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
