import type { Metadata } from "next";
import { Spectral, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
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
  name: "June The Barber",
  address: "179 W Berks St",
  city: "Philadelphia",
  state: "PA",
  zip: "19122",
  phone: "(215) 403-6860",
  email: "",
  rating: 4.9,
  reviewCount: 137,
  hours: {
    Monday: "Open 24 hours",
    Tuesday: "Open 24 hours",
    Wednesday: "Open 24 hours",
    Thursday: "Open 24 hours",
    Friday: "Open 24 hours",
    Saturday: "Open 24 hours",
    Sunday: "Open 24 hours",
  },
};

export const metadata: Metadata = {
  title: "June The Barber — barber in Philadelphia, PA",
  description:
    "June The Barber is a barber located in Philadelphia, PA. Fresh cuts, fearless kids, zero rush.",
  keywords: ["barber", "Philadelphia", "PA", "June The Barber"],
  openGraph: {
    title: "June The Barber",
    description:
      "June The Barber is a barber located in Philadelphia, PA. Fresh cuts, fearless kids, zero rush.",
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
      className={`${spectral.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-spectral)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
