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
  name: 'Amanda\'s MVP Grooming LLC',
  address: '1930 Table Rock Rd',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 613-5714',
  email: '',
  rating: 5,
  reviewCount: 8,
  hours: {
    Monday: '9:00 AM – 5:00 PM',
    Tuesday: '9:00 AM – 5:00 PM',
    Wednesday: '9:00 AM – 5:00 PM',
    Thursday: '9:00 AM – 5:00 PM',
    Friday: '9:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Amanda\'s MVP Grooming LLC — pet groomer in Medford, OR',
  description: 'Amanda\'s MVP Grooming LLC is a pet groomer located in Medford, OR. Where dogs come happy, leave beautiful.',
  keywords: ['pet groomer', 'Medford', 'OR', 'Amanda\'s MVP Grooming LLC'],
  openGraph: {
    title: 'Amanda\'s MVP Grooming LLC',
    description: 'Amanda\'s MVP Grooming LLC is a pet groomer located in Medford, OR. Where dogs come happy, leave beautiful.',
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
