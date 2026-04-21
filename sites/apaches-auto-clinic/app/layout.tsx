import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "700"],
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
  name: "Apache's Auto Clinic",
  address: "5727 Haverford Ave #35",
  city: "Philadelphia",
  state: "PA",
  zip: "19131",
  phone: "(215) 476-6500",
  email: "",
  rating: 4.5,
  reviewCount: 28,
  hours: {
    Monday: "9:00 AM – 5:00 AM",
    Tuesday: "9:01 AM – 5:01 AM",
    Wednesday: "9:01 AM – 5:01 AM",
    Thursday: "9:01 AM – 5:01 AM",
    Friday: "9:00 AM – 5:00 AM",
    Saturday: "Closed",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Apache's Auto Clinic — auto repair in Philadelphia, PA",
  description:
    "Apache's Auto Clinic is a auto repair located in Philadelphia, PA. Real mechanics. Real integrity. No shortcuts.",
  keywords: ["auto repair", "Philadelphia", "PA", "Apache's Auto Clinic"],
  openGraph: {
    title: "Apache's Auto Clinic",
    description:
      "Apache's Auto Clinic is a auto repair located in Philadelphia, PA. Real mechanics. Real integrity. No shortcuts.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-space-grotesk)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
