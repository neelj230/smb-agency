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
  name: 'Ertell Electric LLC',
  address: '5293 NE Elam Young Pkwy Ste 110',
  city: 'Hillsboro',
  state: 'OR',
  zip: '97124',
  phone: '(503) 596-2199',
  email: '',
  rating: 3.4,
  reviewCount: 12,
  hours: {
    Monday: '8:00 AM – 4:00 PM',
    Tuesday: '8:00 AM – 4:00 PM',
    Wednesday: '8:00 AM – 4:00 PM',
    Thursday: '8:00 AM – 4:00 PM',
    Friday: '8:00 AM – 4:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Ertell Electric LLC — electrician in Hillsboro, OR',
  description: 'Ertell Electric LLC is a electrician located in Hillsboro, OR. Honest fixes, no unnecessary charges.',
  keywords: ['electrician', 'Hillsboro', 'OR', 'Ertell Electric LLC'],
  openGraph: {
    title: 'Ertell Electric LLC',
    description: 'Ertell Electric LLC is a electrician located in Hillsboro, OR. Honest fixes, no unnecessary charges.',
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
