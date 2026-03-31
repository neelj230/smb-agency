import type { Metadata } from 'next'
import { Figtree, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const businessData = {
  name: "Marco's Plumbing & Heating",
  address: '2847 S Broad St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19148',
  phone: '(215) 555-0142',
  email: 'info@marcosplumbing.com',
  rating: 4.8,
  reviewCount: 127,
  hours: {
    Monday: '7:00 AM – 6:00 PM',
    Tuesday: '7:00 AM – 6:00 PM',
    Wednesday: '7:00 AM – 6:00 PM',
    Thursday: '7:00 AM – 6:00 PM',
    Friday: '7:00 AM – 6:00 PM',
    Saturday: '8:00 AM – 2:00 PM',
    Sunday: 'Emergency Only',
  },
}

export const metadata: Metadata = {
  title: "Marco's Plumbing & Heating | South Philly's Most Trusted Plumber Since 1998",
  description:
    "Marco's Plumbing & Heating — 26+ years serving Philadelphia. Emergency plumbing, drain cleaning, water heater installation, bathroom remodeling, sewer repair, and heating service. Call (215) 555-0142.",
  keywords: [
    'plumber philadelphia',
    'south philly plumber',
    'emergency plumber',
    'drain cleaning philadelphia',
    'water heater installation',
    'bathroom remodel philadelphia',
    'sewer repair',
    'boiler service philadelphia',
  ],
  openGraph: {
    title: "Marco's Plumbing & Heating",
    description: "South Philly's Most Trusted Plumber Since 1998",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-figtree)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
