import type { Metadata } from 'next'
import { Libre_Baskerville, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const libre_baskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  display: 'swap',
  weight: ['400', '700'],
})

const source_sans_3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const businessData = {
  name: 'Wayne\'s Tax Services Inc',
  address: '970 SW Baseline St',
  city: 'Hillsboro',
  state: 'OR',
  zip: '97123',
  phone: '(503) 681-0801',
  email: '',
  rating: 3.9,
  reviewCount: 11,
  hours: {
    Monday: '10:00 AM – 6:00 PM',
    Tuesday: '10:00 AM – 6:00 PM',
    Wednesday: '10:00 AM – 6:00 PM',
    Thursday: '10:00 AM – 6:00 PM',
    Friday: 'Closed',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Wayne\'s Tax Services Inc — accounting firm in Hillsboro, OR',
  description: 'Wayne\'s Tax Services Inc is a accounting firm located in Hillsboro, OR. Twenty Years. Your Return. Done Right.',
  keywords: ['accounting firm', 'Hillsboro', 'OR', 'Wayne\'s Tax Services Inc'],
  openGraph: {
    title: 'Wayne\'s Tax Services Inc',
    description: 'Wayne\'s Tax Services Inc is a accounting firm located in Hillsboro, OR. Twenty Years. Your Return. Done Right.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${libre_baskerville.variable} ${source_sans_3.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-source-sans-3)] antialiased"
        style={
          {
            '--font-display': 'var(--font-libre-baskerville)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
