import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '700'],
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-space-grotesk)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
