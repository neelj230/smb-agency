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
  name: 'Dave\'s Artistic Tattoo',
  address: '5 N 63rd St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 471-3113',
  email: '',
  rating: 4.7,
  reviewCount: 388,
  hours: {
    Monday: '1:00 – 7:00 PM',
    Tuesday: '12:00 – 8:00 PM',
    Wednesday: '12:00 – 8:00 PM',
    Thursday: '12:00 – 8:00 PM',
    Friday: '12:00 – 8:00 PM',
    Saturday: '12:00 – 8:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Dave\'s Artistic Tattoo — tattoo parlor in Philadelphia, PA',
  description: 'Dave\'s Artistic Tattoo is a tattoo parlor located in Philadelphia, PA. Art on skin, calm in the chair.',
  keywords: ['tattoo parlor', 'Philadelphia', 'PA', 'Dave\'s Artistic Tattoo'],
  openGraph: {
    title: 'Dave\'s Artistic Tattoo',
    description: 'Dave\'s Artistic Tattoo is a tattoo parlor located in Philadelphia, PA. Art on skin, calm in the chair.',
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
