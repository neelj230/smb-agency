import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "600", "800"],
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
  name: "Fitzroy's Auto Repair",
  address: "5100 W Thompson St",
  city: "Philadelphia",
  state: "PA",
  zip: "19131",
  phone: "(215) 473-6565",
  email: "",
  rating: 4.9,
  reviewCount: 17,
};

export const metadata: Metadata = {
  title: "Fitzroy's Auto Repair — auto repair in Philadelphia, PA",
  description:
    "Fitzroy's Auto Repair is a auto repair located in Philadelphia, PA. Fixed Right. Explained Clear. Back on Road.",
  keywords: ["auto repair", "Philadelphia", "PA", "Fitzroy's Auto Repair"],
  openGraph: {
    title: "Fitzroy's Auto Repair",
    description:
      "Fitzroy's Auto Repair is a auto repair located in Philadelphia, PA. Fixed Right. Explained Clear. Back on Road.",
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
      className={`${manrope.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-manrope)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
