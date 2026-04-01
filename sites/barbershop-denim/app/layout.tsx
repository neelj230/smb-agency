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
  name: 'Barbershop Denim',
  address: '1517 South St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19146',
  phone: '(267) 930-3980',
  email: '',
  rating: 4.9,
  reviewCount: 528,
  hours: {
    Monday: '10:00 AM – 5:00 PM',
    Tuesday: '9:00 AM – 6:30 PM',
    Wednesday: 'Closed',
    Thursday: '9:00 AM – 6:30 PM',
    Friday: '9:00 AM – 6:30 PM',
    Saturday: '9:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Barbershop Denim — barber in Philadelphia, PA',
  description: 'Barbershop Denim is a barber located in Philadelphia, PA. Sharp cuts, real talk, South Street vibes.',
  keywords: ['barber', 'Philadelphia', 'PA', 'Barbershop Denim'],
  openGraph: {
    title: 'Barbershop Denim',
    description: 'Barbershop Denim is a barber located in Philadelphia, PA. Sharp cuts, real talk, South Street vibes.',
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
