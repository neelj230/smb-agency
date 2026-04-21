import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Fraunces({
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
  name: "JT Electric",
  address: "4849 Airway Dr STE 105",
  city: "Central Point",
  state: "OR",
  zip: "97502",
  phone: "(541) 734-5714",
  email: "",
  rating: 4.9,
  reviewCount: 29,
};

export const metadata: Metadata = {
  title: "JT Electric — Rogue Valley Electricians",
  description:
    "Central Point electricians. Panels, EV chargers, pool and spa wiring. Show up. Fix it. Own it.",
  openGraph: {
    title: "JT Electric",
    description: "Central Point, Oregon electricians. 4.9 stars, 29 reviews.",
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
