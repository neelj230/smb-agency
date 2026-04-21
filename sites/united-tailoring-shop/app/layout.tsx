import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
  name: "United Tailoring Shop",
  address: "2303 N Broad St",
  city: "Philadelphia",
  state: "PA",
  zip: "19132",
  phone: "(215) 229-7760",
  email: "",
  rating: 4.9,
  reviewCount: 237,
  hours: {
    Monday: "Closed",
    Tuesday: "2:00 – 7:00 PM",
    Wednesday: "2:00 – 7:00 PM",
    Thursday: "2:00 – 7:00 PM",
    Friday: "2:00 – 7:00 PM",
    Saturday: "2:00 – 7:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "United Tailoring Shop | Sharp Fit. Real Craft. Every Time.",
  description:
    "Expert tailoring in Philadelphia, PA. Suits, dresses, corsets & more — fitted perfectly on the first try. Visit us at 2303 N Broad St. (215) 229-7760.",
  keywords: [
    "tailor Philadelphia",
    "suit alterations North Philly",
    "dress alterations Philadelphia",
    "custom fit tailoring PA",
    "formal wear alterations",
    "wedding dress alterations Philadelphia",
    "United Tailoring Shop",
  ],
  openGraph: {
    title: "United Tailoring Shop",
    description:
      "Expert tailoring in Philadelphia, PA. Suits, dresses, corsets & more — fitted perfectly on the first try. Visit us at 2303 N Broad St. (215) 229-7760.",
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
      className={`${bricolage_grotesque.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-bricolage-grotesque)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
