import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
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
  name: 'Linda Lamprecht, CPA PC',
  address: '6475 NW Cornelius Pass Rd',
  city: 'Hillsboro',
  state: 'OR',
  zip: '97124',
  phone: '(503) 747-2116',
  email: '',
  rating: 5,
  reviewCount: 2,
  hours: {
    Monday: '9:00 AM – 5:00 PM',
    Tuesday: '9:00 AM – 5:00 PM',
    Wednesday: '9:00 AM – 5:00 PM',
    Thursday: '9:00 AM – 5:00 PM',
    Friday: '9:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Linda Lamprecht, CPA PC — accounting firm in Hillsboro, OR',
  description: 'Linda Lamprecht, CPA PC is a accounting firm located in Hillsboro, OR. Taxes Made Painless. Results That Speak.',
  keywords: ['accounting firm', 'Hillsboro', 'OR', 'Linda Lamprecht, CPA PC'],
  openGraph: {
    title: 'Linda Lamprecht, CPA PC',
    description: 'Linda Lamprecht, CPA PC is a accounting firm located in Hillsboro, OR. Taxes Made Painless. Results That Speak.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair_display.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-playfair-display)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
