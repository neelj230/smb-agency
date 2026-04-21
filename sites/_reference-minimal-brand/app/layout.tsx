import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
  name: "Essentia",
  address: "123 Beauty Lane",
  city: "New York",
  state: "NY",
  zip: "10001",
  phone: "(212) 555-0147",
  email: "hello@essentia.com",
  rating: 4.9,
  reviewCount: 2500,
};

export const metadata: Metadata = {
  title: "Essentia™ — Your healthiest skin revealed.",
  description:
    "Five proven ingredients. Less bottles. Better skin. Smarter routine.",
  openGraph: {
    title: "Essentia™",
    description:
      "Five proven ingredients. Less bottles. Better skin. Smarter routine.",
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
