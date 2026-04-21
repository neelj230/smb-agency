import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const businessData = {
  name: "Mindify Therapy",
  address: "220 Walnut Street, Suite 300",
  city: "Philadelphia",
  state: "PA",
  zip: "19106",
  phone: "(215) 555-0193",
  email: "hello@mindifytherapy.com",
  rating: 4.9,
  reviewCount: 86,
};

export const metadata: Metadata = {
  title: "Mindify Therapy — Find Your Path to Wellness",
  description:
    "Compassionate therapy and counseling services in Philadelphia. Individual, couples, and family sessions in a safe, supportive space.",
  openGraph: {
    title: "Mindify Therapy",
    description: "Compassionate therapy and counseling in Philadelphia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body className="font-[family-name:var(--font-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
