import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const businessData = {
  name: "Our Spot",
  address: "1816 S River Dr",
  city: "Portland",
  state: "OR",
  zip: "97201",
  phone: "",
  email: "",
  rating: 4.8,
  reviewCount: 130,
};

export const metadata: Metadata = {
  title: "Our Spot — Waterfront Coffee, Portland",
  description:
    "A hidden gem on the waterfront path. House-made nut milks, zero-waste, dreamy vibes.",
  openGraph: {
    title: "Our Spot",
    description:
      "A hidden gem on the waterfront path. House-made nut milks, zero-waste, dreamy vibes.",
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
