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
  name: 'Village Childcare LLC',
  address: '2480 SW 37th St',
  city: 'Redmond',
  state: 'OR',
  zip: '97756',
  phone: '(503) 347-5743',
  email: '',
  rating: 5,
  reviewCount: 4,
  hours: {
    Monday: '7:30 AM – 5:00 PM',
    Tuesday: '7:30 AM – 5:00 PM',
    Wednesday: '7:30 AM – 5:00 PM',
    Thursday: '7:30 AM – 5:00 PM',
    Friday: 'Closed',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Village Childcare LLC — daycare in Redmond, OR',
  description: 'Village Childcare LLC is a daycare located in Redmond, OR. Where kids stay past pickup time.',
  keywords: ['daycare', 'Redmond', 'OR', 'Village Childcare LLC'],
  openGraph: {
    title: 'Village Childcare LLC',
    description: 'Village Childcare LLC is a daycare located in Redmond, OR. Where kids stay past pickup time.',
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
