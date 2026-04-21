import type { Metadata } from 'next'
import { Figtree, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
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
  name: 'Bernt Jacobsen Attorney',
  address: '7609 SW Beveland St',
  city: 'Portland',
  state: 'OR',
  zip: '97223',
  phone: '(503) 892-9301',
  email: '',
  rating: 5,
  reviewCount: 2,
  hours: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 3:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Bernt Jacobsen Attorney — law firm in Portland, OR',
  description: 'Bernt Jacobsen Attorney is a law firm located in Portland, OR. Gets It Done. Every Time.',
  keywords: ['law firm', 'Portland', 'OR', 'Bernt Jacobsen Attorney'],
  openGraph: {
    title: 'Bernt Jacobsen Attorney',
    description: 'Bernt Jacobsen Attorney is a law firm located in Portland, OR. Gets It Done. Every Time.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-figtree)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
