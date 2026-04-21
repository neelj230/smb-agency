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
  name: "Bright Landscaping",
  address: "5604 Gainor Rd",
  city: "Philadelphia",
  state: "PA",
  zip: "19131",
  phone: "(267) 351-5557",
  email: "",
  hours: {
    Monday: "7:00 AM – 3:00 PM",
    Tuesday: "7:00 AM – 3:00 PM",
    Wednesday: "7:00 AM – 3:00 PM",
    Thursday: "7:00 AM – 3:00 PM",
    Friday: "7:00 AM – 3:00 PM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Bright Landscaping — landscaper in Philadelphia, PA",
  description:
    "Bright Landscaping is a landscaper located in Philadelphia, PA. Your Yard, Transformed Before Noon.",
  keywords: ["landscaper", "Philadelphia", "PA", "Bright Landscaping"],
  openGraph: {
    title: "Bright Landscaping",
    description:
      "Bright Landscaping is a landscaper located in Philadelphia, PA. Your Yard, Transformed Before Noon.",
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
