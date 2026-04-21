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
  name: "Creative Vases",
  address: "543 S 52nd St",
  city: "Philadelphia",
  state: "PA",
  zip: "19143",
  phone: "(267) 897-1050",
  email: "",
  rating: 4.8,
  reviewCount: 17,
  hours: {
    Monday: "10:00 AM – 5:00 PM",
    Tuesday: "10:00 AM – 5:00 PM",
    Wednesday: "10:00 AM – 5:00 PM",
    Thursday: "10:00 AM – 5:00 PM",
    Friday: "10:00 AM – 5:00 PM",
    Saturday: "10:00 AM – 5:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Creative Vases — florist in Philadelphia, PA",
  description:
    "Creative Vases is a florist located in Philadelphia, PA. Fresh blooms, rooted in the neighborhood.",
  keywords: ["florist", "Philadelphia", "PA", "Creative Vases"],
  openGraph: {
    title: "Creative Vases",
    description:
      "Creative Vases is a florist located in Philadelphia, PA. Fresh blooms, rooted in the neighborhood.",
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
