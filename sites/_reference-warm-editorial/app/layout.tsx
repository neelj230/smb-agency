import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const businessData = {
  name: "Bellish Nail Lounge",
  address: "841 S 52nd St",
  city: "Philadelphia",
  state: "PA",
  zip: "19143",
  phone: "(484) 649-1931",
  email: "",
  rating: 5.0,
  reviewCount: 40,
};

export const metadata: Metadata = {
  title: "Bellish Nail Lounge — West Philadelphia",
  description:
    "Black-owned nail lounge on 52nd Street. Bold nails, pure vibes.",
  openGraph: {
    title: "Bellish Nail Lounge",
    description:
      "Black-owned nail lounge on 52nd Street. Bold nails, pure vibes.",
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
