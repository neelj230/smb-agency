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
  name: 'Liebert & Liebert CPA',
  address: 'Parking lot',
  city: '4300 NE Broadway Suite 3',
  state: '',
  zip: '',
  phone: '(503) 287-4992',
  email: '',
  rating: 4.4,
  reviewCount: 10,
  hours: {
    Monday: '8:30 AM – 5:00 PM',
    Tuesday: '8:30 AM – 5:00 PM',
    Wednesday: '8:30 AM – 5:00 PM',
    Thursday: '8:30 AM – 5:00 PM',
    Friday: '8:30 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Liebert & Liebert CPA — accounting firm in 4300 NE Broadway Suite 3, ',
  description: 'Liebert & Liebert CPA is a accounting firm located in 4300 NE Broadway Suite 3, . Numbers Made Simple. Time Always Given.',
  keywords: ['accounting firm', '4300 NE Broadway Suite 3', 'Liebert & Liebert CPA'],
  openGraph: {
    title: 'Liebert & Liebert CPA',
    description: 'Liebert & Liebert CPA is a accounting firm located in 4300 NE Broadway Suite 3, . Numbers Made Simple. Time Always Given.',
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
