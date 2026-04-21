import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const be_vietnam_pro = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
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
  name: "Duran's LANDSCAPING LLC",
  address: "4832 N Hope St",
  city: "Philadelphia",
  state: "PA",
  zip: "19120",
  phone: "(267) 970-1289",
  email: "",
  rating: 4.9,
  reviewCount: 40,
  hours: {
    Monday: "9:00 AM – 5:00 PM",
    Tuesday: "9:00 AM – 5:00 PM",
    Wednesday: "9:00 AM – 5:00 PM",
    Thursday: "9:00 AM – 5:00 PM",
    Friday: "9:00 AM – 5:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Duran's LANDSCAPING LLC — landscaper in Philadelphia, PA",
  description:
    "Duran's LANDSCAPING LLC is a landscaper located in Philadelphia, PA. Your yard, transformed. On time, on budget.",
  keywords: ["landscaper", "Philadelphia", "PA", "Duran's LANDSCAPING LLC"],
  openGraph: {
    title: "Duran's LANDSCAPING LLC",
    description:
      "Duran's LANDSCAPING LLC is a landscaper located in Philadelphia, PA. Your yard, transformed. On time, on budget.",
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
      className={`${be_vietnam_pro.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-be-vietnam-pro)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
