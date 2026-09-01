import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Space_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

const businessData = {
  name: "Good Cake Bakery",
  address: "12085 SW Hall Blvd #130",
  city: "Tigard",
  state: "OR",
  zip: "97223",
  phone: "(503) 810-9369",
  email: "",
  rating: 4.6,
  reviewCount: 216,
  hours: {
    Monday: "11:00 AM – 3:00 PM",
    Tuesday: "9:00 AM – 8:00 PM",
    Wednesday: "9:00 AM – 8:00 PM",
    Thursday: "9:00 AM – 8:00 PM",
    Friday: "9:00 AM – 8:00 PM",
    Saturday: "10:00 AM – 5:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Good Cake Bakery — Tigard, OR",
  description: "Traditional Mexican breads and pastries, custom cakes, and everyday treats in Tigard.",
  openGraph: {
    title: "Good Cake Bakery",
    description: "Custom cakes, Mexican breads, and pastries in Tigard, Oregon.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <head><SchemaJsonLd business={businessData} /></head>
      <body className="font-[family-name:var(--font-dm-sans)] antialiased">
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
