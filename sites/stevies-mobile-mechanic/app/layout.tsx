import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
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
  name: "Stevie's Mobile Mechanic",
  address: "18049 N 13th Ave",
  city: "Phoenix",
  state: "AZ",
  zip: "85023",
  phone: "(602) 654-6118",
  email: "",
  rating: 4.4,
  reviewCount: 27,
};

export const metadata: Metadata = {
  title: "Stevie's Mobile Mechanic — Phoenix, AZ",
  description:
    "Mobile mechanic serving the Phoenix metro. Driveway diagnostics, brakes, fuel pumps, batteries. Fair prices — often a third of shop quotes.",
  openGraph: {
    title: "Stevie's Mobile Mechanic",
    description: "Your driveway. My shop. Phoenix's honest mobile mechanic.",
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
