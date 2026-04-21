import type { Metadata } from "next";
import { Vollkorn, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const vollkorn = Vollkorn({
  subsets: ["latin"],
  variable: "--font-vollkorn",
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
  name: "DJ Tire and Auto Repair",
  address: "6008 Lancaster Ave",
  city: "Philadelphia",
  state: "PA",
  zip: "19151",
  phone: "(215) 760-8576",
  email: "",
  rating: 4,
  reviewCount: 74,
  hours: {
    Monday: "9:00 AM – 6:00 PM",
    Tuesday: "9:00 AM – 6:00 PM",
    Wednesday: "9:00 AM – 6:00 PM",
    Thursday: "9:00 AM – 6:00 PM",
    Friday: "9:00 AM – 6:00 PM",
    Saturday: "9:00 AM – 6:00 PM",
    Sunday: "9:00 AM – 6:00 PM",
  },
};

export const metadata: Metadata = {
  title: "DJ Tire and Auto Repair — auto repair in Philadelphia, PA",
  description:
    "DJ Tire and Auto Repair is a auto repair located in Philadelphia, PA. Straight talk, fair prices, fixed right.",
  keywords: ["auto repair", "Philadelphia", "PA", "DJ Tire and Auto Repair"],
  openGraph: {
    title: "DJ Tire and Auto Repair",
    description:
      "DJ Tire and Auto Repair is a auto repair located in Philadelphia, PA. Straight talk, fair prices, fixed right.",
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
      className={`${vollkorn.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-vollkorn)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
