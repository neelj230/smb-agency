import type { Metadata } from "next";
import { Lexend, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "Phở Keizer Vietnamese Kitchen",
  address: "4998 River Rd N",
  city: "Keizer",
  state: "OR",
  zip: "97303",
  phone: "(503) 390-1235",
  email: "",
  rating: 4.5,
  reviewCount: 53,
  hours: {
    Monday: "11:00 AM – 8:30 PM",
    Tuesday: "11:00 AM – 8:30 PM",
    Wednesday: "11:00 AM – 8:30 PM",
    Thursday: "11:00 AM – 8:30 PM",
    Friday: "11:00 AM – 8:30 PM",
    Saturday: "11:00 AM – 8:30 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Phở Keizer Vietnamese Kitchen | Pho So Good, You'll Bring Everyone.",
  description:
    "Authentic pho, charcoal-grilled vermicelli & banh mi in Keizer, OR. A beloved Vietnamese kitchen with bold flavors, immaculate ambiance & must-try drinks.",
  keywords: [
    "pho Keizer OR",
    "Vietnamese restaurant Keizer Oregon",
    "banh mi Keizer",
    "vermicelli bowl Salem Oregon",
    "Vietnamese coffee Keizer",
    "authentic pho Willamette Valley",
    "River Road Vietnamese kitchen",
  ],
  openGraph: {
    title: "Phở Keizer Vietnamese Kitchen",
    description:
      "Authentic pho, charcoal-grilled vermicelli & banh mi in Keizer, OR. A beloved Vietnamese kitchen with bold flavors, immaculate ambiance & must-try drinks.",
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
      className={`${lexend.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-lexend)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
