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
  name: 'Top Tier Philly Cleaning Company',
  address: '370 W Johnson St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19144',
  phone: '(215) 399-6743',
  email: '',
  rating: 5,
  reviewCount: 36,
  hours: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Top Tier Philly Cleaning Company | Spotless Homes. Zero Stress.',
  description: 'Philadelphia\'s most trusted home cleaning team. Sam & Junior deliver meticulous, on-time cleans with a perfect 5-star record. Book your clean today.',
  keywords: ['Philadelphia house cleaning service', 'Germantown PA cleaning company', 'weekly home cleaning Philadelphia', 'deep cleaning service Philly', 'move in move out cleaning Philadelphia', 'trusted home cleaners Philadelphia', 'Top Tier Philly Cleaning Company'],
  openGraph: {
    title: 'Top Tier Philly Cleaning Company',
    description: 'Philadelphia\'s most trusted home cleaning team. Sam & Junior deliver meticulous, on-time cleans with a perfect 5-star record. Book your clean today.',
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
