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
  name: 'Eugene Heating and Air Conditioning',
  address: '2130 W 7th Ave',
  city: 'Eugene',
  state: 'OR',
  zip: '97402',
  phone: '(541) 234-4801',
  email: '',
  rating: 4.9,
  reviewCount: 17,
  hours: {
    Monday: '8:00 AM – 8:00 PM',
    Tuesday: '8:00 AM – 8:00 PM',
    Wednesday: '8:00 AM – 8:00 PM',
    Thursday: '8:00 AM – 8:00 PM',
    Friday: '8:00 AM – 8:00 PM',
    Saturday: '9:00 AM – 5:00 PM',
    Sunday: '9:00 AM – 5:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Eugene Heating and Air Conditioning — hvac contractor in Eugene, OR',
  description: 'Eugene Heating and Air Conditioning is a hvac contractor located in Eugene, OR. Cool Homes, Fast Fixes, Zero Mess.',
  keywords: ['hvac contractor', 'Eugene', 'OR', 'Eugene Heating and Air Conditioning'],
  openGraph: {
    title: 'Eugene Heating and Air Conditioning',
    description: 'Eugene Heating and Air Conditioning is a hvac contractor located in Eugene, OR. Cool Homes, Fast Fixes, Zero Mess.',
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
