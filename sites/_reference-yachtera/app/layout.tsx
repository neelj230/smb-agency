import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const businessData = {
  name: "Yachtera",
  address: "800 Marina Boulevard",
  city: "Fort Lauderdale",
  state: "FL",
  zip: "33316",
  phone: "(954) 555-0280",
  email: "hello@yachtera.com",
  rating: 4.9,
  reviewCount: 240,
};

export const metadata: Metadata = {
  title: "Yachtera — Premium Boat Rentals",
  description:
    "Unlock the pure joy of boating adventures. Premium yacht and boat rentals for unforgettable experiences on the water.",
  openGraph: {
    title: "Yachtera — Premium Boat Rentals",
    description:
      "Seamless boat rental experience designed for freedom, comfort, and discovery.",
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
