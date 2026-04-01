import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const businessData = {
  name: 'Lee\'s Automotive Service',
  address: '5947 Lancaster Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(215) 879-2883',
  email: '',
  rating: 4.5,
  reviewCount: 115,
  hours: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 5:00 PM',
    Saturday: '8:00 AM – 3:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Lee\'s Automotive Service — auto repair in Philadelphia, PA',
  description: 'Lee\'s Automotive Service is a auto repair located in Philadelphia, PA. Honest hands. Fast fixes. No games.',
  keywords: ['auto repair', 'Philadelphia', 'PA', 'Lee\'s Automotive Service'],
  openGraph: {
    title: 'Lee\'s Automotive Service',
    description: 'Lee\'s Automotive Service is a auto repair located in Philadelphia, PA. Honest hands. Fast fixes. No games.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dm_sans.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-dm-sans)] antialiased"
        style={
          {
            '--font-display': 'var(--font-syne)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
