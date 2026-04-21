import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Inter({
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

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "Neative Cleaning",
  address: "789 Sparkle Drive",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 555-0147",
  email: "info@neative.com",
  rating: 4.9,
  reviewCount: 200,
};

export const metadata: Metadata = {
  title: "Neative — Clean Space Starts Here",
  description:
    "Professional cleaning services for offices, homes, and commercial spaces — done right, every time.",
  openGraph: {
    title: "Neative Cleaning",
    description: "Professional cleaning services — done right, every time.",
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
