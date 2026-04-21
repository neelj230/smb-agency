import type { Metadata } from 'next'
import { Hedvig_Letters_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const hedvig_letters_serif = Hedvig_Letters_Serif({
  subsets: ['latin'],
  variable: '--font-hedvig-letters-serif',
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
  name: 'Albany Heating & Air Conditioning',
  address: '707 Broadalbin St SW',
  city: 'Albany',
  state: 'OR',
  zip: '97321',
  phone: '(541) 366-7090',
  email: '',
  rating: 5,
  reviewCount: 7,
  hours: {
    Monday: '7:00 AM – 9:00 PM',
    Tuesday: '7:00 AM – 9:00 PM',
    Wednesday: '7:00 AM – 9:00 PM',
    Thursday: '7:00 AM – 9:00 PM',
    Friday: '7:00 AM – 9:00 PM',
    Saturday: '7:00 AM – 9:00 PM',
    Sunday: '7:00 AM – 9:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Albany Heating & Air Conditioning — hvac contractor in Albany, OR',
  description: 'Albany Heating & Air Conditioning is a hvac contractor located in Albany, OR. Straight Talk, Fair Prices, Real Results.',
  keywords: ['hvac contractor', 'Albany', 'OR', 'Albany Heating & Air Conditioning'],
  openGraph: {
    title: 'Albany Heating & Air Conditioning',
    description: 'Albany Heating & Air Conditioning is a hvac contractor located in Albany, OR. Straight Talk, Fair Prices, Real Results.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${hedvig_letters_serif.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-hedvig-letters-serif)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
