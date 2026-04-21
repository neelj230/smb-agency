import type { Metadata } from "next";
import { Carattere, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const carattere = Carattere({
  subsets: ["latin"],
  variable: "--font-carattere",
  display: "swap",
  weight: ["400"],
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
  name: "Marlyna's Pet Grooming",
  address: "15710 NE Glisan St",
  city: "Portland",
  state: "OR",
  zip: "97230",
  phone: "(503) 256-3402",
  email: "",
  rating: 4.8,
  reviewCount: 75,
  hours: {
    Monday: "Closed",
    Tuesday: "8:00 AM – 4:30 PM",
    Wednesday: "8:00 AM – 4:30 PM",
    Thursday: "8:00 AM – 4:30 PM",
    Friday: "8:00 AM – 4:30 PM",
    Saturday: "8:00 AM – 4:30 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Marlyna's Pet Grooming — pet groomer in Portland, OR",
  description:
    "Marlyna's Pet Grooming is a pet groomer located in Portland, OR. Calm paws, happy dogs, zero stress.",
  keywords: ["pet groomer", "Portland", "OR", "Marlyna's Pet Grooming"],
  openGraph: {
    title: "Marlyna's Pet Grooming",
    description:
      "Marlyna's Pet Grooming is a pet groomer located in Portland, OR. Calm paws, happy dogs, zero stress.",
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
      className={`${carattere.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-carattere)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
