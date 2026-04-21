import type { Metadata } from 'next'
import { Figtree, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
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
  name: 'Studio 49 Photography',
  address: '20240 Reed Ln Apt 148',
  city: 'Bend',
  state: 'OR',
  zip: '97702',
  phone: '(541) 331-6494',
  email: '',
  rating: 4,
  reviewCount: 13,
}

export const metadata: Metadata = {
  title: 'Studio 49 Photography — photography studio in Bend, OR',
  description: 'Studio 49 Photography is a photography studio located in Bend, OR. Every Moment, Perfectly Framed in Bend',
  keywords: ['photography studio', 'Bend', 'OR', 'Studio 49 Photography'],
  openGraph: {
    title: 'Studio 49 Photography',
    description: 'Studio 49 Photography is a photography studio located in Bend, OR. Every Moment, Perfectly Framed in Bend',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-figtree)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
