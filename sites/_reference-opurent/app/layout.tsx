import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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

const businessData = {
  name: "Opurent Luxury Motors",
  address: "1200 Market Street",
  city: "Philadelphia",
  state: "PA",
  zip: "19107",
  phone: "(215) 555-0777",
  email: "concierge@opurent.com",
  rating: 4.9,
  reviewCount: 120,
};

export const metadata: Metadata = {
  title: "Opurent — Drive Beyond Limits",
  description:
    "Premium luxury car rental. Handpicked fleet of exotic and luxury vehicles for those who demand the extraordinary.",
  openGraph: {
    title: "Opurent Luxury Motors",
    description: "Drive beyond limits. Live beyond time.",
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
