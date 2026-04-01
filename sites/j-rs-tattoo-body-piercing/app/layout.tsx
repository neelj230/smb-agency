import type { Metadata } from 'next'
import { Ranchers, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const ranchers = Ranchers({
  subsets: ['latin'],
  variable: '--font-ranchers',
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
  name: 'J R\'s Tattoo & Body Piercing',
  address: '6110 Market St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 474-5020',
  email: '',
  rating: 4.3,
  reviewCount: 161,
  hours: {
    Monday: 'Closed',
    Tuesday: '4:00 – 10:00 PM',
    Wednesday: 'Closed',
    Thursday: '4:00 – 10:00 PM',
    Friday: '4:00 – 10:00 PM',
    Saturday: '12:00 – 10:00 PM',
    Sunday: '12:00 – 8:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'J R\'s Tattoo & Body Piercing — tattoo parlor in Philadelphia, PA',
  description: 'J R\'s Tattoo & Body Piercing is a tattoo parlor located in Philadelphia, PA. Where Ink Meets Soul, Walk Right In.',
  keywords: ['tattoo parlor', 'Philadelphia', 'PA', 'J R\'s Tattoo & Body Piercing'],
  openGraph: {
    title: 'J R\'s Tattoo & Body Piercing',
    description: 'J R\'s Tattoo & Body Piercing is a tattoo parlor located in Philadelphia, PA. Where Ink Meets Soul, Walk Right In.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ranchers.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-ranchers)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
