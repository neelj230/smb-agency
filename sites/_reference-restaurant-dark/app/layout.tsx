import type { Metadata } from "next";
import { Prata, Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Prata({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "Bamzi",
  address: "256 North Newcroft Avenue",
  city: "Newcroft",
  state: "PA",
  zip: "19302",
  phone: "+123 (456) 789 00",
  email: "info@bamzi.com",
  rating: 5.0,
  reviewCount: 1200,
};

export const metadata: Metadata = {
  title: "Bamzi — Delicious Food & Wonderful Eating Experience",
  description:
    "We serve food, harmony, & laughter since 1998. Authentic sushi, ramen, and Japanese cuisine.",
  openGraph: {
    title: "Bamzi Restaurant",
    description: "Delicious food & wonderful eating experience since 1998.",
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body className="font-[family-name:var(--font-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
