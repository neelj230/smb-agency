import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Cormorant_Garamond({
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
  name: "Luxerra",
  address: "8500 Sunset Blvd, Suite 210",
  city: "Los Angeles",
  state: "CA",
  zip: "90069",
  phone: "+1 (323) 555-7842",
  email: "info@luxerra.com",
  rating: 4.9,
  reviewCount: 250,
};

export const metadata: Metadata = {
  title: "Luxerra — Premium Car Rental in Los Angeles",
  description:
    "Experience unmatched comfort, style, and service. Premium luxury car rental in Los Angeles.",
  openGraph: {
    title: "Luxerra — Premium Car Rental",
    description: "Premium luxury car rental in Los Angeles.",
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
