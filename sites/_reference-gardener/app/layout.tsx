import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Playfair_Display({
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
  name: "Greenleaf Gardens",
  address: "142 Chestnut Lane",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 555-0234",
  email: "hello@greenleafgardens.com",
  rating: 4.9,
  reviewCount: 180,
};

export const metadata: Metadata = {
  title: "Greenleaf Gardens — Your Garden, Our Passion",
  description:
    "Professional landscaping and garden services in Philadelphia. Design, maintenance, and care for outdoor spaces that thrive.",
  openGraph: {
    title: "Greenleaf Gardens",
    description:
      "Professional landscaping and garden services in Philadelphia.",
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
