import type { Metadata } from "next";
import { Figtree, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
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
  name: "Affordable Pet Grooming",
  address: "5058 Commercial St SE",
  city: "Salem",
  state: "OR",
  zip: "97306",
  phone: "(503) 391-5643",
  email: "",
  rating: 4.4,
  reviewCount: 53,
  hours: {
    Monday: "Closed",
    Tuesday: "8:00 AM – 2:00 PM",
    Wednesday: "8:00 AM – 2:00 PM",
    Thursday: "8:00 AM – 2:00 PM",
    Friday: "8:00 AM – 2:00 PM",
    Saturday: "8:00 AM – 2:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Affordable Pet Grooming — pet groomer in Salem, OR",
  description:
    "Affordable Pet Grooming is a pet groomer located in Salem, OR. Big Hearts. Tiny Prices. Happy Pups.",
  keywords: ["pet groomer", "Salem", "OR", "Affordable Pet Grooming"],
  openGraph: {
    title: "Affordable Pet Grooming",
    description:
      "Affordable Pet Grooming is a pet groomer located in Salem, OR. Big Hearts. Tiny Prices. Happy Pups.",
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
      className={`${figtree.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-figtree)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
