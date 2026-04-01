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
  name: 'Bellish Nail Lounge',
  address: '841 S 52nd St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19143',
  phone: '(484) 649-1931',
  email: '',
  rating: 5,
  reviewCount: 40,
  hours: {
    Monday: '9:00 AM – 2:00 PM',
    Tuesday: '9:00 AM – 5:00 PM',
    Wednesday: '9:00 AM – 5:00 PM',
    Thursday: '9:00 AM – 5:00 PM',
    Friday: '9:00 AM – 5:00 PM',
    Saturday: '10:00 AM – 8:00 PM',
    Sunday: '10:00 AM – 7:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Bellish Nail Lounge — nail salon in Philadelphia, PA',
  description: 'Bellish Nail Lounge is a nail salon located in Philadelphia, PA. Bold nails. Black-owned. Pure vibes.',
  keywords: ['nail salon', 'Philadelphia', 'PA', 'Bellish Nail Lounge'],
  openGraph: {
    title: 'Bellish Nail Lounge',
    description: 'Bellish Nail Lounge is a nail salon located in Philadelphia, PA. Bold nails. Black-owned. Pure vibes.',
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
