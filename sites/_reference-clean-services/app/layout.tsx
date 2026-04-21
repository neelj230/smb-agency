import type { Metadata } from "next";
import { Figtree, Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Figtree({
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
  name: "Plumbing Co.",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zip: "10001",
  phone: "(595) 555-0123",
  email: "info@plumbing.com",
  rating: 5.0,
  reviewCount: 2000,
};

export const metadata: Metadata = {
  title: "Plumbing — Your Trusted Plumbing Solutions in New York",
  description:
    "With over 20 years of experience, we deliver top-notch plumbing solutions tailored to your needs.",
  openGraph: {
    title: "Plumbing Co.",
    description: "Your trusted plumbing solutions in New York.",
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
      <body className="font-[family-name:var(--font-display)] antialiased">
        {children}
      </body>
    </html>
  );
}
