import type { Metadata } from "next";
import { Onest, Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Onest({
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
  name: "Yogus",
  address: "456 Serenity Lane",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  phone: "(215) 555-0198",
  email: "hello@yogus.com",
  rating: 4.9,
  reviewCount: 320,
};

export const metadata: Metadata = {
  title: "Yogus — Flow like water. Stand like a tree.",
  description:
    "A warm, inclusive yoga studio in Philadelphia. Vinyasa, Hatha, Yin, and more — find your flow with us.",
  openGraph: {
    title: "Yogus",
    description: "A warm, inclusive yoga studio in Philadelphia.",
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
