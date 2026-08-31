import type { Metadata } from "next";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import "./globals.css";

const businessData = {
  name: "Really Good Stuff",
  address: "3629 SE Division St",
  city: "Portland",
  state: "OR",
  zip: "97202",
  phone: "(503) 238-1838",
  email: "",
  rating: 4.5,
  reviewCount: 215,
  hours: {
    Monday: "11:00 AM - 6:00 PM",
    Tuesday: "11:00 AM - 6:00 PM",
    Wednesday: "11:00 AM - 6:00 PM",
    Thursday: "11:00 AM - 6:00 PM",
    Friday: "11:00 AM - 6:00 PM",
    Saturday: "11:00 AM - 6:00 PM",
    Sunday: "11:00 AM - 6:00 PM",
  },
};

export const metadata: Metadata = {
  title: "Really Good Stuff — Vintage Finds in Portland, OR",
  description:
    "Really Good Stuff is a Portland vintage store with clothing, records, furniture, collectibles, and oddities on SE Division.",
  keywords: ["vintage", "antiques", "Portland", "records", "collectibles", "Really Good Stuff"],
  openGraph: {
    title: "Really Good Stuff",
    description: "Vintage finds, records, furniture, and more in Portland.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head><SchemaJsonLd business={businessData} /></head>
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
