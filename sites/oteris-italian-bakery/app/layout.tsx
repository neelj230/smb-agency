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
  name: 'Oteri\'s Italian Bakery',
  address: '6323 Woodland Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19142',
  phone: '(215) 724-0793',
  email: '',
  rating: 4.1,
  reviewCount: 359,
  hours: {
    Monday: '7:00 AM – 6:00 PM',
    Tuesday: '7:00 AM – 6:00 PM',
    Wednesday: '7:00 AM – 6:00 PM',
    Thursday: '7:00 AM – 6:00 PM',
    Friday: '7:00 AM – 6:00 PM',
    Saturday: '7:00 AM – 6:00 PM',
    Sunday: '8:00 AM – 3:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Oteri\'s Italian Bakery — bakery in Philadelphia, PA',
  description: 'Oteri\'s Italian Bakery is a bakery located in Philadelphia, PA. Cakes That Make Jaws Drop.',
  keywords: ['bakery', 'Philadelphia', 'PA', 'Oteri\'s Italian Bakery'],
  openGraph: {
    title: 'Oteri\'s Italian Bakery',
    description: 'Oteri\'s Italian Bakery is a bakery located in Philadelphia, PA. Cakes That Make Jaws Drop.',
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
