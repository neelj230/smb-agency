import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
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
  name: "Yappy Dog Pet Grooming - Portland OR",
  address: "6715 SW Beaverton Hillsdale Hwy",
  city: "Portland",
  state: "OR",
  zip: "97225",
  phone: "(503) 477-4347",
  email: "",
  rating: 4.6,
  reviewCount: 73,
  hours: {
    Monday: "Closed",
    Tuesday: "9:00 AM – 5:00 PM",
    Wednesday: "9:00 AM – 5:00 PM",
    Thursday: "9:00 AM – 5:00 PM",
    Friday: "9:00 AM – 5:00 PM",
    Saturday: "9:00 AM – 5:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Yappy Dog Pet Grooming Portland OR | Happy Dogs, Zero Shell Shock",
  description:
    "Portland's word-of-mouth grooming secret. Monica & Sharon deliver stress-free grooms, lion cuts & coat rescues on SW Beaverton Hillsdale Hwy. Call (503) 477-4347.",
  keywords: [
    "dog groomer Portland OR",
    "pet grooming SW Portland",
    "lion cut dog grooming Portland",
    "dog grooming Beaverton Hillsdale",
    "anxious dog groomer Portland",
    "matted coat dog grooming",
    "small breed grooming Portland",
    "Yappy Dog Pet Grooming",
  ],
  openGraph: {
    title: "Yappy Dog Pet Grooming - Portland OR",
    description:
      "Portland's word-of-mouth grooming secret. Monica & Sharon deliver stress-free grooms, lion cuts & coat rescues on SW Beaverton Hillsdale Hwy. Call (503) 477-4347.",
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
      className={`${poppins.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-poppins)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
