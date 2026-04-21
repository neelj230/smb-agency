import type { Metadata } from 'next'
import { Carattere, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const carattere = Carattere({
  subsets: ['latin'],
  variable: '--font-carattere',
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
  name: 'David A. Corden',
  address: '230 SW 6th St',
  city: 'Corvallis',
  state: 'OR',
  zip: '97333',
  phone: '(541) 752-1422',
  email: '',
  rating: 4.9,
  reviewCount: 7,
}

export const metadata: Metadata = {
  title: 'David A. Corden — law firm in Corvallis, OR',
  description: 'David A. Corden is a law firm located in Corvallis, OR. Mountains Moved. Records Clean. Case Closed.',
  keywords: ['law firm', 'Corvallis', 'OR', 'David A. Corden'],
  openGraph: {
    title: 'David A. Corden',
    description: 'David A. Corden is a law firm located in Corvallis, OR. Mountains Moved. Records Clean. Case Closed.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${carattere.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-carattere)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
