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
  name: 'The Bakeshop on Twentieth',
  address: '269 S 20th St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19103',
  phone: '(215) 644-9714',
  email: '',
  rating: 4.6,
  reviewCount: 433,
  hours: {
    Monday: '8:00 AM – 3:00 PM',
    Tuesday: '8:00 AM – 3:00 PM',
    Wednesday: '8:00 AM – 3:00 PM',
    Thursday: '8:00 AM – 4:00 PM',
    Friday: '8:00 AM – 4:00 PM',
    Saturday: '8:00 AM – 4:00 PM',
    Sunday: '8:00 AM – 3:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'The Bakeshop on Twentieth — bakery in Philadelphia, PA',
  description: 'The Bakeshop on Twentieth is a bakery located in Philadelphia, PA. Small shop. Big feels. Real good pastries.',
  keywords: ['bakery', 'Philadelphia', 'PA', 'The Bakeshop on Twentieth'],
  openGraph: {
    title: 'The Bakeshop on Twentieth',
    description: 'The Bakeshop on Twentieth is a bakery located in Philadelphia, PA. Small shop. Big feels. Real good pastries.',
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
