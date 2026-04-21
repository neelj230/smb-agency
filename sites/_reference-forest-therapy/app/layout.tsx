import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const businessData = {
  name: "Forest Therapy Philadelphia",
  address: "42 Wissahickon Trail",
  city: "Philadelphia",
  state: "PA",
  zip: "19118",
  phone: "(215) 555-0234",
  email: "hello@foresttherapyphl.com",
  rating: 5.0,
  reviewCount: 87,
};

export const metadata: Metadata = {
  title: "Forest Therapy Philadelphia — Guided Nature Wellness",
  description:
    "Certified forest therapy walks in the Wissahickon. Reconnect with nature, reduce stress, and restore balance through guided sensory immersion.",
  openGraph: {
    title: "Forest Therapy Philadelphia",
    description: "Guided nature wellness walks in the Wissahickon.",
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
