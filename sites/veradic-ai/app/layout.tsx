import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Veradic AI — AI Math & Science Tutor",
  description:
    "Snap a photo of any math or science problem. Veradic AI breaks it into steps you actually understand. Free for students.",
  keywords: [
    "AI tutor",
    "math tutor",
    "science tutor",
    "step-by-step learning",
    "homework help",
    "edtech",
  ],
  openGraph: {
    title: "Veradic AI — Snap. Learn. Master.",
    description:
      "AI tutor that breaks any math or science problem into steps you actually understand.",
    type: "website",
    siteName: "Veradic AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veradic AI — Snap. Learn. Master.",
    description:
      "AI tutor that breaks any math or science problem into steps you actually understand.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${fragmentMono.variable}`}
    >
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            "--font-display": "var(--font-space-grotesk)",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
