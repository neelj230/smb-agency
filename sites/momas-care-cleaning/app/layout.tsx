import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
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
  name: "Moma's Care Cleaning",
  address: "6140 Lansdowne Ave",
  city: "Philadelphia",
  state: "PA",
  zip: "19151",
  phone: "(267) 990-2478",
  email: "",
  rating: 4.5,
  reviewCount: 55,
  hours: {
    Monday: "Open 24 hours",
    Tuesday: "Open 24 hours",
    Wednesday: "Open 24 hours",
    Thursday: "Open 24 hours",
    Friday: "Open 24 hours",
    Saturday: "Open 24 hours",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Moma's Care Cleaning — cleaning service in Philadelphia, PA",
  description:
    "Moma's Care Cleaning is a cleaning service located in Philadelphia, PA. Clean Like Moma Actually Did It",
  keywords: ["cleaning service", "Philadelphia", "PA", "Moma's Care Cleaning"],
  openGraph: {
    title: "Moma's Care Cleaning",
    description:
      "Moma's Care Cleaning is a cleaning service located in Philadelphia, PA. Clean Like Moma Actually Did It",
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
      className={`${sora.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-sora)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
