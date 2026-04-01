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
  name: 'B Auto Repair Inc',
  address: '1701 N 54th St #7',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(215) 477-8575',
  email: '',
  rating: 4.8,
  reviewCount: 149,
  hours: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 5:00 PM',
    Saturday: '8:00 AM – 5:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'B Auto Repair Inc — auto repair in Philadelphia, PA',
  description: 'B Auto Repair Inc is a auto repair located in Philadelphia, PA. Honest hands. Fair prices. Back on the road.',
  keywords: ['auto repair', 'Philadelphia', 'PA', 'B Auto Repair Inc'],
  openGraph: {
    title: 'B Auto Repair Inc',
    description: 'B Auto Repair Inc is a auto repair located in Philadelphia, PA. Honest hands. Fair prices. Back on the road.',
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
