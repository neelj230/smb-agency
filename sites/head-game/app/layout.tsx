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
  name: 'Head Game',
  address: '5316 W Girard Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(215) 883-1597',
  email: '',
  rating: 4.6,
  reviewCount: 61,
  hours: {
    Monday: 'Closed',
    Tuesday: '9:00 AM – 6:00 PM',
    Wednesday: 'Closed',
    Thursday: '9:00 AM – 6:00 PM',
    Friday: '9:00 AM – 6:00 PM',
    Saturday: '9:00 AM – 6:00 PM',
    Sunday: '9:00 AM – 6:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Head Game — barber in Philadelphia, PA',
  description: 'Head Game is a barber located in Philadelphia, PA. Sharp Cuts. No Wait. Kevin\'s Got You.',
  keywords: ['barber', 'Philadelphia', 'PA', 'Head Game'],
  openGraph: {
    title: 'Head Game',
    description: 'Head Game is a barber located in Philadelphia, PA. Sharp Cuts. No Wait. Kevin\'s Got You.',
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
