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
  name: 'Major League Cuts',
  address: '5124 Market St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 747-1119',
  email: '',
  rating: 4.5,
  reviewCount: 326,
  hours: {
    Monday: '6:00 AM – 9:00 PM',
    Tuesday: '6:00 AM – 9:00 PM',
    Wednesday: '6:00 AM – 9:00 PM',
    Thursday: '6:00 AM – 9:00 PM',
    Friday: '6:00 AM – 9:00 PM',
    Saturday: '6:00 AM – 9:00 PM',
    Sunday: '7:00 AM – 6:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Major League Cuts — barber in Philadelphia, PA',
  description: 'Major League Cuts is a barber located in Philadelphia, PA. Look Like a Million. Feel Like It Too.',
  keywords: ['barber', 'Philadelphia', 'PA', 'Major League Cuts'],
  openGraph: {
    title: 'Major League Cuts',
    description: 'Major League Cuts is a barber located in Philadelphia, PA. Look Like a Million. Feel Like It Too.',
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
