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
  name: 'Little Village Learning Center',
  address: '445 High St SE #140',
  city: 'Salem',
  state: 'OR',
  zip: '97301',
  phone: '(503) 363-3866',
  email: '',
  rating: 5,
  reviewCount: 5,
  hours: {
    Monday: '6:30 AM – 5:00 PM',
    Tuesday: '6:30 AM – 5:00 PM',
    Wednesday: '6:30 AM – 5:00 PM',
    Thursday: '6:30 AM – 5:00 PM',
    Friday: '6:30 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Little Village Learning Center — daycare in Salem, OR',
  description: 'Little Village Learning Center is a daycare located in Salem, OR. Where Little Ones Become Our Family',
  keywords: ['daycare', 'Salem', 'OR', 'Little Village Learning Center'],
  openGraph: {
    title: 'Little Village Learning Center',
    description: 'Little Village Learning Center is a daycare located in Salem, OR. Where Little Ones Become Our Family',
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
