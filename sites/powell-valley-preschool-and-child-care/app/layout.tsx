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
  name: 'Powell Valley Preschool and Child Care',
  address: '4460 SE 10th Dr',
  city: 'Gresham',
  state: 'OR',
  zip: '97080',
  phone: '(503) 669-5487',
  email: '',
  rating: 5,
  reviewCount: 3,
  hours: {
    Monday: '7:30 AM – 4:30 PM',
    Tuesday: '7:30 AM – 4:30 PM',
    Wednesday: '7:30 AM – 4:30 PM',
    Thursday: '7:30 AM – 4:30 PM',
    Friday: '7:30 AM – 4:30 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Powell Valley Preschool and Child Care — daycare in Gresham, OR',
  description: 'Powell Valley Preschool and Child Care is a daycare located in Gresham, OR. Stay small. Watch them grow.',
  keywords: ['daycare', 'Gresham', 'OR', 'Powell Valley Preschool and Child Care'],
  openGraph: {
    title: 'Powell Valley Preschool and Child Care',
    description: 'Powell Valley Preschool and Child Care is a daycare located in Gresham, OR. Stay small. Watch them grow.',
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
