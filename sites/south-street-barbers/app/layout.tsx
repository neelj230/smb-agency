import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "South Street Barbers",
  address: "1316 South St",
  city: "Philadelphia",
  state: "PA",
  zip: "19147",
  phone: "(267) 273-1445",
  email: "",
  rating: 4.6,
  reviewCount: 419,
  hours: {
    Monday: "Closed",
    Tuesday: "9:00 AM – 4:00 PM",
    Wednesday: "9:00 AM – 4:30 PM",
    Thursday: "9:00 AM – 6:30 PM",
    Friday: "9:00 AM – 6:30 PM",
    Saturday: "9:00 AM – 6:30 PM",
    Sunday: "9:00 AM – 5:30 PM",
  },
};

export const metadata: Metadata = {
  title: "South Street Barbers — Barbershop in Philadelphia, PA",
  description:
    "South Street Barbers is a neighborhood barbershop at 1316 South St, Philadelphia. Diverse atmosphere, skilled barbers, 419+ reviews.",
  keywords: ["barber", "barbershop", "Philadelphia", "South Street", "haircut"],
  openGraph: {
    title: "South Street Barbers",
    description:
      "Neighborhood barbershop on South Street, Philadelphia. 4.6 stars, 419+ reviews.",
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
      className={`${instrumentSerif.variable} ${dmSans.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-dm-sans)] antialiased"
        style={
          {
            "--font-display": "var(--font-instrument-serif)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
