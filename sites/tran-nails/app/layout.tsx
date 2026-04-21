import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
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
  name: "Tran Nails",
  address: "5244 Market St",
  city: "Philadelphia",
  state: "PA",
  zip: "19139",
  phone: "(215) 474-1881",
  email: "",
  rating: 4.5,
  reviewCount: 196,
  hours: {
    Monday: "9:00 AM – 7:00 PM",
    Tuesday: "9:00 AM – 7:00 PM",
    Wednesday: "9:00 AM – 7:00 PM",
    Thursday: "9:00 AM – 7:00 PM",
    Friday: "9:00 AM – 7:00 PM",
    Saturday: "9:00 AM – 7:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Tran Nails | Kim's Magic Hands. Your Best Look Yet.",
  description:
    "Tran Nails on Market St in West Philadelphia — expert nails, brows & lashes by Kim. Lashes from $25. Real results, neighborhood prices. Call (215) 474-1881.",
  keywords: [
    "nail salon West Philadelphia",
    "Tran Nails Philadelphia",
    "eyebrow shaping West Philly",
    "lash services Philadelphia",
    "acrylic nails Market Street",
    "nail refills Philadelphia",
    "affordable nail salon Philadelphia",
  ],
  openGraph: {
    title: "Tran Nails",
    description:
      "Tran Nails on Market St in West Philadelphia — expert nails, brows & lashes by Kim. Lashes from $25. Real results, neighborhood prices. Call (215) 474-1881.",
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
      className={`${bricolage_grotesque.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-bricolage-grotesque)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
