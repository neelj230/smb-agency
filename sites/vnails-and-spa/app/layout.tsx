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
  name: 'VNails and Spa',
  address: '5101 Walnut St Unit 3',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19139',
  phone: '(215) 852-9475',
  email: '',
  rating: 4.5,
  reviewCount: 166,
  hours: {
    Monday: '9:30 AM – 6:30 PM',
    Tuesday: '9:30 AM – 6:30 PM',
    Wednesday: '9:30 AM – 6:30 PM',
    Thursday: '9:30 AM – 6:30 PM',
    Friday: '9:30 AM – 6:30 PM',
    Saturday: '9:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'VNails and Spa | Nails That Start Conversations',
  description: 'Nail art, luxury pedicures & more in West Philadelphia. VNails and Spa on Walnut St — where great work and warm service meet. (215) 852-9475',
  keywords: ['nail salon Philadelphia', 'luxury pedicure West Philadelphia', 'acrylic nails Walnut Street', 'nail art Philadelphia', 'dip powder manicure Philadelphia', 'eyebrow waxing Philadelphia', 'VNails and Spa'],
  openGraph: {
    title: 'VNails and Spa',
    description: 'Nail art, luxury pedicures & more in West Philadelphia. VNails and Spa on Walnut St — where great work and warm service meet. (215) 852-9475',
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
