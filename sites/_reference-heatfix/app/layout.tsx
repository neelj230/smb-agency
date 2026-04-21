import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Figtree({
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
  name: "ComfortAir HVAC",
  address: "742 Thermostat Lane",
  city: "Austin",
  state: "TX",
  zip: "78701",
  phone: "(512) 555-0147",
  email: "hello@comfortairhvac.com",
  rating: 4.9,
  reviewCount: 210,
};

export const metadata: Metadata = {
  title: "ComfortAir -- Affordable HVAC Solutions",
  description:
    "Expert HVAC solutions for homes and businesses. Reliable heating, cooling, and air quality services.",
  openGraph: {
    title: "ComfortAir HVAC",
    description: "Affordable HVAC solutions you can trust.",
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
