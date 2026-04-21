import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
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
  name: 'Douglas M Bomarito LAW Firm',
  address: '7157 SW Beveland St',
  city: 'Tigard',
  state: 'OR',
  zip: '97223',
  phone: '(503) 223-8285',
  email: '',
  rating: 5,
  reviewCount: 6,
}

export const metadata: Metadata = {
  title: 'Douglas M Bomarito LAW Firm — law firm in Tigard, OR',
  description: 'Douglas M Bomarito LAW Firm is a law firm located in Tigard, OR. Hard to Fluster. Steadfast in Your Corner.',
  keywords: ['law firm', 'Tigard', 'OR', 'Douglas M Bomarito LAW Firm'],
  openGraph: {
    title: 'Douglas M Bomarito LAW Firm',
    description: 'Douglas M Bomarito LAW Firm is a law firm located in Tigard, OR. Hard to Fluster. Steadfast in Your Corner.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair_display.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-playfair-display)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
