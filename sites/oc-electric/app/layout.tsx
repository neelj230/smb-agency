import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const businessData = {
  name: "OC Electric",
  address: "14960 S Victory Rd",
  city: "Oregon City",
  state: "OR",
  zip: "97045",
  phone: "(503) 801-9038",
  email: "",
  rating: 5,
  reviewCount: 21,
  hours: {
    Monday: "7:00 AM – 6:00 PM",
    Tuesday: "7:00 AM – 6:00 PM",
    Wednesday: "7:00 AM – 6:00 PM",
    Thursday: "7:00 AM – 6:00 PM",
    Friday: "7:00 AM – 6:00 PM",
    Saturday: "7:00 AM – 6:00 PM",
    Sunday: "7:00 AM – 6:00 PM",
  },
};

export const metadata: Metadata = {
  title: "OC Electric — Oregon City Electrician",
  description:
    "Wired right, every time. OC Electric is Oregon City's five-star electrician for residential, commercial, and industrial work. Ask for Joe.",
  keywords: ["electrician", "Oregon City", "Oregon", "EV charger", "panel upgrade", "OC Electric"],
  icons: { icon: "/logo.jpg" },
  openGraph: {
    title: "OC Electric — Oregon City Electrician",
    description: "Wired right, every time. Oregon City's five-star electrician.",
    type: "website",
    images: ["/logo.jpg"],
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
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Electrician",
              name: businessData.name,
              address: {
                "@type": "PostalAddress",
                streetAddress: businessData.address,
                addressLocality: businessData.city,
                addressRegion: businessData.state,
                postalCode: businessData.zip,
              },
              telephone: businessData.phone,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: businessData.rating,
                reviewCount: businessData.reviewCount,
              },
            }),
          }}
        />
      </head>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
