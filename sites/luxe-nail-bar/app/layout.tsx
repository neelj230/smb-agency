import type { Metadata } from "next";
import { Crimson_Pro, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const crimson_pro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
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
  name: "Luxe Nail Bar",
  address: "212 S 40th St",
  city: "Philadelphia",
  state: "PA",
  zip: "19104",
  phone: "(215) 382-0727",
  email: "",
  rating: 3.7,
  reviewCount: 348,
  hours: {
    Monday: "10:00 AM – 7:00 PM",
    Tuesday: "10:00 AM – 7:00 PM",
    Wednesday: "10:00 AM – 7:00 PM",
    Thursday: "10:00 AM – 8:00 PM",
    Friday: "10:00 AM – 8:00 PM",
    Saturday: "10:00 AM – 6:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Luxe Nail Bar — nail salon in Philadelphia, PA",
  description:
    "Luxe Nail Bar is a nail salon located in Philadelphia, PA. Fresh Set, Fair Price, Walk In.",
  keywords: ["nail salon", "Philadelphia", "PA", "Luxe Nail Bar"],
  openGraph: {
    title: "Luxe Nail Bar",
    description:
      "Luxe Nail Bar is a nail salon located in Philadelphia, PA. Fresh Set, Fair Price, Walk In.",
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
      className={`${crimson_pro.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-crimson-pro)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
