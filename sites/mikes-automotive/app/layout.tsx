import type { Metadata } from "next";
import { Work_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const work_sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
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
  name: "Mike's Automotive",
  address: "427 N Gross St",
  city: "Philadelphia",
  state: "PA",
  zip: "19151",
  phone: "(215) 471-5111",
  email: "",
  rating: 4.7,
  reviewCount: 41,
};

export const metadata: Metadata = {
  title: "Mike's Automotive — auto repair in Philadelphia, PA",
  description:
    "Mike's Automotive is a auto repair located in Philadelphia, PA. Fixed right. No surprises. Every time.",
  keywords: ["auto repair", "Philadelphia", "PA", "Mike's Automotive"],
  openGraph: {
    title: "Mike's Automotive",
    description:
      "Mike's Automotive is a auto repair located in Philadelphia, PA. Fixed right. No surprises. Every time.",
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
      className={`${work_sans.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-work-sans)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
