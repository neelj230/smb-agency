import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
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

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "Form & Flow Pilates",
  address: "1428 Walnut Street",
  city: "Philadelphia",
  state: "PA",
  zip: "19102",
  phone: "(215) 555-0312",
  email: "hello@formandflow.com",
  rating: 4.9,
  reviewCount: 186,
};

export const metadata: Metadata = {
  title: "Body & Mind Pilates — Modern Pilates Studio",
  description:
    "Modern pilates studio for body and mind. Feel strong, move freely, and restore balance.",
  openGraph: {
    title: "Body & Mind Pilates",
    description: "Modern pilates studio for body and mind.",
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
