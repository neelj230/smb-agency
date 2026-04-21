import type { Metadata } from "next";
import { Inter, Figtree, JetBrains_Mono } from "next/font/google";
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

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "FixRight Handyman",
  address: "412 Walnut Street",
  city: "Philadelphia",
  state: "PA",
  zip: "19106",
  phone: "(215) 555-0198",
  email: "hello@fixright.com",
  rating: 4.9,
  reviewCount: 180,
};

export const metadata: Metadata = {
  title: "FixRight — Expert Repairs, Done Right",
  description:
    "Professional handyman services for homes and businesses. Plumbing, electrical, carpentry, painting, and more.",
  openGraph: {
    title: "FixRight Handyman",
    description: "Expert repairs and maintenance — done right, every time.",
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
