import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
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
  name: "House of Paws",
  address: "2714 W Main St",
  city: "Medford",
  state: "OR",
  zip: "97501",
  phone: "(541) 973-2101",
  email: "",
  rating: 4.8,
  reviewCount: 26,
  hours: {
    Monday: "9:00 AM – 3:00 PM",
    Tuesday: "9:00 AM – 3:00 PM",
    Wednesday: "9:00 AM – 3:00 PM",
    Thursday: "9:00 AM – 3:00 PM",
    Friday: "9:00 AM – 3:00 PM",
    Saturday: "9:00 AM – 3:00 PM",
    Sunday: "9:00 AM – 3:00 PM",
  },
};

export const metadata: Metadata = {
  title: "House of Paws — pet groomer in Medford, OR",
  description:
    "House of Paws is a pet groomer located in Medford, OR. Where Every Dog Gets Their Spa Day",
  keywords: ["pet groomer", "Medford", "OR", "House of Paws"],
  openGraph: {
    title: "House of Paws",
    description:
      "House of Paws is a pet groomer located in Medford, OR. Where Every Dog Gets Their Spa Day",
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
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-fraunces)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
