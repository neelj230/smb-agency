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
  name: 'Boss Plumbing & Heating',
  address: '259 W Johnson St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19144',
  phone: '(267) 748-4314',
  email: '',
  rating: 4.8,
  reviewCount: 227,
  hours: {
    Monday: 'Open 24 hours',
    Tuesday: 'Open 24 hours',
    Wednesday: 'Open 24 hours',
    Thursday: 'Open 24 hours',
    Friday: 'Open 24 hours',
    Saturday: 'Open 24 hours',
    Sunday: 'Open 24 hours',
  },
}

export const metadata: Metadata = {
  title: 'Boss Plumbing & Heating — plumber in Philadelphia, PA',
  description: 'Boss Plumbing & Heating is a plumber located in Philadelphia, PA. We Pick Up. We Show Up. Done.',
  keywords: ['plumber', 'Philadelphia', 'PA', 'Boss Plumbing & Heating'],
  openGraph: {
    title: 'Boss Plumbing & Heating',
    description: 'Boss Plumbing & Heating is a plumber located in Philadelphia, PA. We Pick Up. We Show Up. Done.',
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
