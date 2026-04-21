import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const businessData = {
  name: "Realisting",
  address: "1200 Market Street",
  city: "Philadelphia",
  state: "PA",
  zip: "19107",
  phone: "(215) 555-0200",
  email: "hello@realisting.com",
  rating: 4.9,
  reviewCount: 340,
};

export const metadata: Metadata = {
  title: "Realisting — Buy. Sell. Rent.",
  description:
    "Premium real estate agency helping you find your dream property. Buy, sell, or rent with confidence.",
  openGraph: {
    title: "Realisting — Premium Real Estate",
    description: "Find your dream property with Realisting.",
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
