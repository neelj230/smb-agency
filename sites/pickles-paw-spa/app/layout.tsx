import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/integrations/AnalyticsProvider";
import { SchemaJsonLd } from "@/components/SchemaJsonLd";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const businessData = {
  name: "Pickles Paw Spa",
  address: "828 S Central Ave suite #7",
  city: "Medford",
  state: "OR",
  zip: "97501",
  phone: "(541) 500-1037",
  email: "",
  rating: 4.8,
  reviewCount: 39,
  hours: {
    Monday: "9:00 AM – 4:00 PM",
    Tuesday: "9:00 AM – 4:00 PM",
    Wednesday: "9:00 AM – 4:00 PM",
    Thursday: "9:00 AM – 4:00 PM",
    Friday: "9:00 AM – 4:00 PM",
    Saturday: "9:00 AM – 4:00 PM",
    Sunday: "Closed",
  },
};

export const metadata: Metadata = {
  title: "Pickles Paw Spa — Dog Grooming in Medford, OR",
  description:
    "A local dog grooming spa in Medford, Oregon. Full grooms, breed cuts, mohawks, puppy's first grooms — finished with a complimentary bandanna. Call (541) 500-1037.",
  keywords: [
    "dog groomer Medford OR",
    "pet grooming Medford Oregon",
    "puppy grooming Medford",
    "breed cut dog grooming",
    "Pickles Paw Spa",
    "dog spa Medford",
  ],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Pickles Paw Spa",
    description:
      "Dog grooming in Medford, Oregon. Every pup leaves fresh — finished with a bandanna.",
    type: "website",
    images: ["/logo.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7B1FA2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-fraunces)",
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
