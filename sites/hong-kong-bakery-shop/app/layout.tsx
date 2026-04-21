import type { Metadata } from "next";
import { Noto_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
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
  name: "Hong Kong Bakery Shop",
  address: "917 Race St",
  city: "Philadelphia",
  state: "PA",
  zip: "19107",
  phone: "(215) 925-1288",
  email: "",
  rating: 3.1,
  reviewCount: 93,
  hours: {
    Monday: "7:00 AM – 2:00 AM",
    Tuesday: "7:00 AM – 2:00 AM",
    Wednesday: "7:00 AM – 2:00 AM",
    Thursday: "7:00 AM – 2:00 AM",
    Friday: "7:00 AM – 3:00 AM",
    Saturday: "7:00 AM – 3:00 AM",
    Sunday: "7:30 AM – 2:00 AM",
  },
};

export const metadata: Metadata = {
  title: "Hong Kong Bakery Shop — bakery in Philadelphia, PA",
  description:
    "Hong Kong Bakery Shop is a bakery located in Philadelphia, PA. Late-night buns, warm hearts, Chinatown soul.",
  keywords: ["bakery", "Philadelphia", "PA", "Hong Kong Bakery Shop"],
  openGraph: {
    title: "Hong Kong Bakery Shop",
    description:
      "Hong Kong Bakery Shop is a bakery located in Philadelphia, PA. Late-night buns, warm hearts, Chinatown soul.",
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
      className={`${notoSans.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-noto-sans)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
