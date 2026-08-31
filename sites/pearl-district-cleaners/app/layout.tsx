import type { Metadata } from "next";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const businessData = {
  name: "Pearl District Cleaners",
  address: "1427B NW Flanders St",
  city: "Portland",
  state: "OR",
  zip: "97209",
  phone: "(503) 224-7733",
  email: "",
  rating: 4.6,
  reviewCount: 57,
  hours: {
    Monday: "7:00 AM - 7:30 PM",
    Tuesday: "7:00 AM - 7:30 PM",
    Wednesday: "7:00 AM - 7:30 PM",
    Thursday: "7:00 AM - 7:30 PM",
    Friday: "7:00 AM - 7:30 PM",
    Saturday: "9:00 AM - 5:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Pearl District Cleaners — Dry Cleaner in Portland, OR",
  description:
    "Pearl District Cleaners offers dry cleaning, alterations, wash-and-fold, and garment care in Portland's Pearl District.",
  keywords: ["dry cleaner", "Portland", "OR", "Pearl District", "Pearl District Cleaners"],
  openGraph: {
    title: "Pearl District Cleaners",
    description:
      "Pearl District Cleaners offers dry cleaning, alterations, wash-and-fold, and garment care in Portland's Pearl District.",
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
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={{
          "--font-display": '"Georgia", "Times New Roman", serif',
          "--font-inter": '"Inter", "Helvetica Neue", Arial, sans-serif',
          "--font-mono": '"Menlo", "Monaco", "Courier New", monospace',
        } as React.CSSProperties}
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
