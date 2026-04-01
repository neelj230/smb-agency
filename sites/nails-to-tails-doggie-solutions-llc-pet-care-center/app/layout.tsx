import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const businessData = {
  name: 'Nails To Tails & Doggie Solutions LLC pet care center',
  address: '2191 Kings Hwy',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 500-1775',
  email: '',
  rating: 5,
  reviewCount: 41,
  hours: {
    Monday: '9:00 AM – 6:00 PM',
    Tuesday: '9:00 AM – 6:00 PM',
    Wednesday: '9:00 AM – 6:00 PM',
    Thursday: '9:00 AM – 6:00 PM',
    Friday: '9:00 AM – 6:00 PM',
    Saturday: '9:00 AM – 6:00 PM',
    Sunday: '9:00 AM – 6:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Nails To Tails & Doggie Solutions LLC pet care center — pet groomer in Medford, OR',
  description: 'Nails To Tails & Doggie Solutions LLC pet care center is a pet groomer located in Medford, OR. Pampered Pets. Every Nail. Every Tail.',
  keywords: ['pet groomer', 'Medford', 'OR', 'Nails To Tails & Doggie Solutions LLC pet care center'],
  openGraph: {
    title: 'Nails To Tails & Doggie Solutions LLC pet care center',
    description: 'Nails To Tails & Doggie Solutions LLC pet care center is a pet groomer located in Medford, OR. Pampered Pets. Every Nail. Every Tail.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dm_sans.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-dm-sans)] antialiased"
        style={
          {
            '--font-display': 'var(--font-syne)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
