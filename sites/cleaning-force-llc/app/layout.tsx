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
  name: 'Cleaning Force LLC',
  address: '2101 N 63rd St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(610) 809-5003',
  email: '',
  rating: 4.6,
  reviewCount: 45,
  hours: {
    Monday: 'Open 24 hours',
    Tuesday: 'Open 24 hours',
    Wednesday: 'Open 24 hours',
    Thursday: 'Open 24 hours',
    Friday: 'Open 24 hours',
    Saturday: 'Open 24 hours',
    Sunday: 'Open 24 hours',
  },
}

export const metadata: Metadata = {
  title: 'Cleaning Force LLC — cleaning service in Philadelphia, PA',
  description: 'Cleaning Force LLC is a cleaning service located in Philadelphia, PA. Spotless Every Time. No Exceptions.',
  keywords: ['cleaning service', 'Philadelphia', 'PA', 'Cleaning Force LLC'],
  openGraph: {
    title: 'Cleaning Force LLC',
    description: 'Cleaning Force LLC is a cleaning service located in Philadelphia, PA. Spotless Every Time. No Exceptions.',
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
