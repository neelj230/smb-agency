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
  name: 'Early Learning Center',
  address: '765 14th St NE',
  city: 'Salem',
  state: 'OR',
  zip: '97301',
  phone: '(503) 391-4964',
  email: '',
  rating: 5,
  reviewCount: 8,
}

export const metadata: Metadata = {
  title: 'Early Learning Center — daycare in Salem, OR',
  description: 'Early Learning Center is a daycare located in Salem, OR. Where kids run in, not out.',
  keywords: ['daycare', 'Salem', 'OR', 'Early Learning Center'],
  openGraph: {
    title: 'Early Learning Center',
    description: 'Early Learning Center is a daycare located in Salem, OR. Where kids run in, not out.',
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
