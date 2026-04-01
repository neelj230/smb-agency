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
  name: 'Sheldon N Berger Tax Service',
  address: '832 SE 60th Ave',
  city: 'Hillsboro',
  state: 'OR',
  zip: '97123',
  phone: '(971) 227-1334',
  email: '',
  rating: 3.9,
  reviewCount: 32,
  hours: {
    Monday: '8:00 AM – 7:00 PM',
    Tuesday: '8:00 AM – 7:00 PM',
    Wednesday: '8:00 AM – 7:00 PM',
    Thursday: '8:00 AM – 7:00 PM',
    Friday: '8:00 AM – 7:00 PM',
    Saturday: '8:00 AM – 4:00 PM',
    Sunday: '11:00 AM – 4:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Sheldon N Berger Tax Service | Real Answers. Real Refunds.',
  description: 'Hillsboro\'s patient, thorough tax preparer who turns expected tax bills into real refunds. Individual, back taxes & self-employed returns. Call (971) 227-1334.',
  keywords: ['tax preparer Hillsboro OR', 'individual tax return Hillsboro', 'back tax filing Oregon', 'TurboTax review and correction', 'self-employed tax help Hillsboro', 'affordable tax preparation Hillsboro', 'small business taxes Oregon'],
  openGraph: {
    title: 'Sheldon N Berger Tax Service',
    description: 'Hillsboro\'s patient, thorough tax preparer who turns expected tax bills into real refunds. Individual, back taxes & self-employed returns. Call (971) 227-1334.',
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
