import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = DM_Sans({
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
  name: "Essentia Skincare",
  address: "180 Madison Avenue",
  city: "New York",
  state: "NY",
  zip: "10016",
  phone: "(212) 555-0342",
  email: "hello@essentia.com",
  rating: 4.9,
  reviewCount: 2500,
};

export const metadata: Metadata = {
  title: "Essentia\u2122 \u2014 Your healthiest skin revealed.",
  description:
    "Five proven ingredients that actually work. Less bottles. Better skin. Smarter routine.",
  openGraph: {
    title: "Essentia Skincare",
    description: "Five proven ingredients that actually work.",
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
