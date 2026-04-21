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
  name: 'Oregon Coast Childcare',
  address: '7659 NW Logan Rd',
  city: 'Lincoln City',
  state: 'OR',
  zip: '97367',
  phone: '(503) 313-8668',
  email: '',
  rating: 4.5,
  reviewCount: 15,
  hours: {
    Monday: '7:00 AM – 6:00 PM',
    Tuesday: '7:00 AM – 6:00 PM',
    Wednesday: '7:00 AM – 6:00 PM',
    Thursday: '7:00 AM – 6:00 PM',
    Friday: '7:00 AM – 6:00 PM',
    Saturday: '7:00 AM – 6:00 PM',
    Sunday: '7:00 AM – 6:00 AM',
  },
}

export const metadata: Metadata = {
  title: 'Oregon Coast Childcare — daycare in Lincoln City, OR',
  description: 'Oregon Coast Childcare is a daycare located in Lincoln City, OR. Where the coast becomes their classroom.',
  keywords: ['daycare', 'Lincoln City', 'OR', 'Oregon Coast Childcare'],
  openGraph: {
    title: 'Oregon Coast Childcare',
    description: 'Oregon Coast Childcare is a daycare located in Lincoln City, OR. Where the coast becomes their classroom.',
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
