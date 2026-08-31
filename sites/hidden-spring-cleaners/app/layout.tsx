import type { Metadata } from "next";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const businessData = {
  name: "Hidden Spring Cleaners",
  address: "19383 Willamette Dr",
  city: "West Linn",
  state: "OR",
  zip: "97068",
  phone: "(503) 635-1112",
  email: "",
  rating: 4.7,
  reviewCount: 25,
  hours: {
    Monday: "9:00 AM - 6:30 PM",
    Tuesday: "9:00 AM - 6:30 PM",
    Wednesday: "9:00 AM - 6:30 PM",
    Thursday: "9:00 AM - 6:30 PM",
    Friday: "9:00 AM - 6:30 PM",
    Saturday: "9:00 AM - 4:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Hidden Spring Cleaners — West Linn, OR",
  description:
    "Hidden Spring Cleaners provides dry cleaning, stain care, pressing, and mending support in West Linn, Oregon.",
  keywords: ["dry cleaner", "West Linn", "Oregon", "stain care", "mending"],
  openGraph: {
    title: "Hidden Spring Cleaners",
    description: "Careful garment care in West Linn, Oregon.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": 'Georgia, "Times New Roman", serif',
            "--font-inter": 'Inter, "Helvetica Neue", Arial, sans-serif',
            "--font-mono": 'Menlo, Monaco, "Courier New", monospace',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
