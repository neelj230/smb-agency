import type { Metadata } from "next";
import { Figtree, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Figtree({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SunTrail — Adventure Awaits",
  description:
    "Kids summer camp in the heart of nature. Swimming, hiking, arts & crafts, and unforgettable memories.",
  openGraph: {
    title: "SunTrail Summer Camp",
    description: "Adventure awaits at SunTrail — the summer camp kids love.",
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-[family-name:var(--font-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
