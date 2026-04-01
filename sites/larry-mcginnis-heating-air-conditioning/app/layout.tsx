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
  name: 'Larry McGinnis Heating & Air Conditioning',
  address: '1156 Anderson Pl SE',
  city: 'Albany',
  state: 'OR',
  zip: '97322',
  phone: '(541) 928-0460',
  email: '',
  rating: 4.9,
  reviewCount: 34,
}

export const metadata: Metadata = {
  title: 'Larry McGinnis Heating & Air Conditioning — hvac contractor in Albany, OR',
  description: 'Larry McGinnis Heating & Air Conditioning is a hvac contractor located in Albany, OR. Real Help. Real Fast. No Arm, No Leg.',
  keywords: ['hvac contractor', 'Albany', 'OR', 'Larry McGinnis Heating & Air Conditioning'],
  openGraph: {
    title: 'Larry McGinnis Heating & Air Conditioning',
    description: 'Larry McGinnis Heating & Air Conditioning is a hvac contractor located in Albany, OR. Real Help. Real Fast. No Arm, No Leg.',
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
