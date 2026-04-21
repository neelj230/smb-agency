import type { Metadata } from 'next'
import { Libre_Baskerville, Source_Sans_3, JetBrains_Mono, Caveat } from 'next/font/google'
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

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
  weight: ['400', '600'],
})

const businessData = {
  name: 'Laugh & Learn Childcare',
  address: '23445 NE Glisan St',
  city: 'Wood Village',
  state: 'OR',
  zip: '97060',
  phone: '(503) 317-3811',
  email: '',
  rating: 5,
  reviewCount: 13,
  hours: {
    Monday: '6:30 AM – 6:00 PM',
    Tuesday: '6:30 AM – 6:00 PM',
    Wednesday: '6:30 AM – 6:00 PM',
    Thursday: '6:30 AM – 6:00 PM',
    Friday: '6:30 AM – 6:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Laugh & Learn Childcare — daycare in Wood Village, OR',
  description: 'Laugh & Learn Childcare is a daycare located in Wood Village, OR. Where little ones grow, laugh, and belong.',
  keywords: ['daycare', 'Wood Village', 'OR', 'Laugh & Learn Childcare'],
  openGraph: {
    title: 'Laugh & Learn Childcare',
    description: 'Laugh & Learn Childcare is a daycare located in Wood Village, OR. Where little ones grow, laugh, and belong.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${libre_baskerville.variable} ${source_sans_3.variable} ${mono.variable} ${caveat.variable}`}>
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
