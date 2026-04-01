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
  name: 'Judge Auto Repair Inc',
  address: '5804 Chestnut St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 528-6004',
  email: '',
  rating: 4.5,
  reviewCount: 74,
  hours: {
    Monday: '9:00 AM – 5:30 PM',
    Tuesday: '9:00 AM – 5:30 PM',
    Wednesday: '9:00 AM – 5:30 PM',
    Thursday: '9:00 AM – 5:30 PM',
    Friday: '9:00 AM – 5:30 PM',
    Saturday: '9:00 AM – 5:30 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Judge Auto Repair Inc — auto repair in Philadelphia, PA',
  description: 'Judge Auto Repair Inc is a auto repair located in Philadelphia, PA. Honest Wrenches. Real Prices. No BS.',
  keywords: ['auto repair', 'Philadelphia', 'PA', 'Judge Auto Repair Inc'],
  openGraph: {
    title: 'Judge Auto Repair Inc',
    description: 'Judge Auto Repair Inc is a auto repair located in Philadelphia, PA. Honest Wrenches. Real Prices. No BS.',
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
