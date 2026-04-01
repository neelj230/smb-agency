import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const instrument_serif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  weight: ['400'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const businessData = {
  name: 'Overhill Flowers',
  address: '6231 Lancaster Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(215) 473-1842',
  email: '',
  rating: 4.7,
  reviewCount: 18,
  hours: {
    Monday: '9:00 AM – 12:00 PM',
    Tuesday: '9:00 AM – 12:00 PM',
    Wednesday: '9:00 AM – 12:00 PM',
    Thursday: '9:00 AM – 12:00 PM',
    Friday: '9:00 AM – 12:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Overhill Flowers — florist in Philadelphia, PA',
  description: 'Overhill Flowers is a florist located in Philadelphia, PA. Beautiful blooms, delivered when it matters.',
  keywords: ['florist', 'Philadelphia', 'PA', 'Overhill Flowers'],
  openGraph: {
    title: 'Overhill Flowers',
    description: 'Overhill Flowers is a florist located in Philadelphia, PA. Beautiful blooms, delivered when it matters.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${instrument_serif.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-instrument-serif)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
