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
  name: 'Rich John C',
  address: '455 SW Madison Ave',
  city: 'Corvallis',
  state: 'OR',
  zip: '97333',
  phone: '(541) 752-4322',
  email: '',
  rating: 4.8,
  reviewCount: 11,
}

export const metadata: Metadata = {
  title: 'Rich John C — law firm in Corvallis, OR',
  description: 'Rich John C is a law firm located in Corvallis, OR. Honest counsel. Real results. No guesswork.',
  keywords: ['law firm', 'Corvallis', 'OR', 'Rich John C'],
  openGraph: {
    title: 'Rich John C',
    description: 'Rich John C is a law firm located in Corvallis, OR. Honest counsel. Real results. No guesswork.',
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
