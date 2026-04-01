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
  name: 'Laura\'s Laundramutt Grooming LLC',
  address: '1705 25th St SE',
  city: 'Salem',
  state: 'OR',
  zip: '97302',
  phone: '(503) 967-6116',
  email: '',
  rating: 4.7,
  reviewCount: 125,
  hours: {
    Monday: 'Closed',
    Tuesday: '9:00 AM – 4:00 PM',
    Wednesday: '9:00 AM – 4:00 PM',
    Thursday: '9:00 AM – 4:00 PM',
    Friday: '9:00 AM – 4:00 PM',
    Saturday: '9:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Laura\'s Laundramutt Grooming LLC — pet groomer in Salem, OR',
  description: 'Laura\'s Laundramutt Grooming LLC is a pet groomer located in Salem, OR. Fresh Pups, Happy Tails, Real People.',
  keywords: ['pet groomer', 'Salem', 'OR', 'Laura\'s Laundramutt Grooming LLC'],
  openGraph: {
    title: 'Laura\'s Laundramutt Grooming LLC',
    description: 'Laura\'s Laundramutt Grooming LLC is a pet groomer located in Salem, OR. Fresh Pups, Happy Tails, Real People.',
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
