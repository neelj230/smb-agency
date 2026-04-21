import type { Metadata } from 'next'
import { Ranchers, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const ranchers = Ranchers({
  subsets: ['latin'],
  variable: '--font-ranchers',
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
  name: 'Happy Trails Childcare',
  address: '8181 SW 184th Ave',
  city: 'Beaverton',
  state: 'OR',
  zip: '97007',
  phone: '(971) 330-9084',
  email: '',
  rating: 5,
  reviewCount: 2,
  hours: {
    Monday: '5:30 AM – 5:30 PM',
    Tuesday: '5:30 AM – 5:30 PM',
    Wednesday: '5:30 AM – 5:30 PM',
    Thursday: '5:30 AM – 5:30 PM',
    Friday: '5:30 AM – 5:30 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Happy Trails Childcare — daycare in Beaverton, OR',
  description: 'Happy Trails Childcare is a daycare located in Beaverton, OR. Where little ones grow, every single day.',
  keywords: ['daycare', 'Beaverton', 'OR', 'Happy Trails Childcare'],
  openGraph: {
    title: 'Happy Trails Childcare',
    description: 'Happy Trails Childcare is a daycare located in Beaverton, OR. Where little ones grow, every single day.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ranchers.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-ranchers)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
