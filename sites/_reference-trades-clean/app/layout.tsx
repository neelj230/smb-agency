import type { Metadata } from "next";
import { Figtree, Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Figtree({
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
  name: "Heatfix",
  address: "456 Commerce Ave",
  city: "New Texas",
  state: "TX",
  zip: "75001",
  phone: "(555) 123-4567",
  email: "info@heatfix.com",
  rating: 4.9,
  reviewCount: 1000,
};

export const metadata: Metadata = {
  title: "Heatfix — Affordable HVAC Solution in New Texas",
  description:
    "Expert HVAC solutions for homes & businesses — reliable heating, cooling and air quality services you can trust.",
  openGraph: {
    title: "Heatfix",
    description: "Affordable HVAC solutions in New Texas.",
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
      <body className="font-[family-name:var(--font-display)] antialiased">
        {children}
      </body>
    </html>
  );
}
