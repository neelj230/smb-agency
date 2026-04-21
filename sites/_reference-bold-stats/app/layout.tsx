import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Space_Grotesk({
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
  name: "Boss Plumbing & Heating",
  address: "259 W Johnson St",
  city: "Philadelphia",
  state: "PA",
  zip: "19144",
  phone: "(267) 748-4314",
  email: "",
  rating: 4.8,
  reviewCount: 227,
};

export const metadata: Metadata = {
  title: "Boss Plumbing & Heating — 24/7 Philadelphia Plumber",
  description: "Philadelphia's 24/7 plumber. We pick up. We show up. Done.",
  openGraph: {
    title: "Boss Plumbing & Heating",
    description: "Philadelphia's 24/7 plumber. We pick up. We show up. Done.",
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
