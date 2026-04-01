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
  name: 'New Master tailor and cleaners',
  address: '1620 Spruce St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19103',
  phone: '(215) 735-1499',
  email: '',
  rating: 4.3,
  reviewCount: 58,
  hours: {
    Monday: '8:30 AM – 6:00 PM',
    Tuesday: '8:30 AM – 6:00 PM',
    Wednesday: '8:30 AM – 6:00 PM',
    Thursday: '8:30 AM – 6:00 PM',
    Friday: '8:30 AM – 6:00 PM',
    Saturday: '10:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'New Master tailor and cleaners — tailor in Philadelphia, PA',
  description: 'New Master tailor and cleaners is a tailor located in Philadelphia, PA. Flawless Fits. Kept With Care.',
  keywords: ['tailor', 'Philadelphia', 'PA', 'New Master tailor and cleaners'],
  openGraph: {
    title: 'New Master tailor and cleaners',
    description: 'New Master tailor and cleaners is a tailor located in Philadelphia, PA. Flawless Fits. Kept With Care.',
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
