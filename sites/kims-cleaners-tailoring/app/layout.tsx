import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
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
  name: "Kim's Cleaners & Tailoring",
  address: "2008 Sansom St",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 557-1556",
  email: "",
  rating: 4.6,
  reviewCount: 131,
  hours: {
    Monday: "8:00 AM – 5:30 PM",
    Tuesday: "8:00 AM – 5:30 PM",
    Wednesday: "8:00 AM – 5:30 PM",
    Thursday: "8:00 AM – 5:30 PM",
    Friday: "8:00 AM – 5:30 PM",
    Saturday: "9:00 AM – 4:30 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Kim's Cleaners & Tailoring — tailor in Philadelphia, PA",
  description:
    "Kim's Cleaners & Tailoring is a tailor located in Philadelphia, PA. Where every stitch tells your story.",
  keywords: ["tailor", "Philadelphia", "PA", "Kim's Cleaners & Tailoring"],
  openGraph: {
    title: "Kim's Cleaners & Tailoring",
    description:
      "Kim's Cleaners & Tailoring is a tailor located in Philadelphia, PA. Where every stitch tells your story.",
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
