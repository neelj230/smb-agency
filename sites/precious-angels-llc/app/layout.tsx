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
  name: 'Precious Angels LLC',
  address: '3070 Merriman Rd',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 890-8696',
  email: '',
  rating: 4.3,
  reviewCount: 11,
  hours: {
    Monday: '5:30 AM – 4:30 PM',
    Tuesday: '5:30 AM – 4:30 PM',
    Wednesday: '5:30 AM – 4:30 PM',
    Thursday: '5:30 AM – 4:30 PM',
    Friday: '5:30 AM – 4:30 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Precious Angels LLC — daycare in Medford, OR',
  description: 'Precious Angels LLC is a daycare located in Medford, OR. Where Kids Say \'Yay, Daycare!\'',
  keywords: ['daycare', 'Medford', 'OR', 'Precious Angels LLC'],
  openGraph: {
    title: 'Precious Angels LLC',
    description: 'Precious Angels LLC is a daycare located in Medford, OR. Where Kids Say \'Yay, Daycare!\'',
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
