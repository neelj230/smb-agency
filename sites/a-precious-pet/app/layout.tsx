import type { Metadata } from 'next'
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
  name: 'A Precious Pet',
  address: '256 Vashti Way',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 779-7770',
  email: '',
  rating: 4.9,
  reviewCount: 13,
  hours: {
    Monday: '7:30 AM – 10:00 PM',
    Tuesday: '7:30 AM – 10:00 PM',
    Wednesday: 'Closed',
    Thursday: '7:30 AM – 10:00 PM',
    Friday: '7:30 AM – 10:00 PM',
    Saturday: '7:30 AM – 10:00 PM',
    Sunday: '7:30 AM – 10:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'A Precious Pet — pet groomer in Medford, OR',
  description: 'A Precious Pet is a pet groomer located in Medford, OR. Your pet is precious. She treats them that way.',
  keywords: ['pet groomer', 'Medford', 'OR', 'A Precious Pet'],
  openGraph: {
    title: 'A Precious Pet',
    description: 'A Precious Pet is a pet groomer located in Medford, OR. Your pet is precious. She treats them that way.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dm_sans.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-dm-sans)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
