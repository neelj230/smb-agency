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
  name: 'Maid in Cleaning',
  address: '2449 Golf Rd #22',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(800) 782-5802',
  email: '',
  rating: 4.9,
  reviewCount: 39,
  hours: {
    Monday: '7:00 AM – 9:00 PM',
    Tuesday: '7:00 AM – 9:00 PM',
    Wednesday: '7:00 AM – 9:00 PM',
    Thursday: '7:00 AM – 9:00 PM',
    Friday: '7:00 AM – 9:00 PM',
    Saturday: '7:00 AM – 9:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Maid in Cleaning — cleaning service in Philadelphia, PA',
  description: 'Maid in Cleaning is a cleaning service located in Philadelphia, PA. Your home, transformed. Every detail counts.',
  keywords: ['cleaning service', 'Philadelphia', 'PA', 'Maid in Cleaning'],
  openGraph: {
    title: 'Maid in Cleaning',
    description: 'Maid in Cleaning is a cleaning service located in Philadelphia, PA. Your home, transformed. Every detail counts.',
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
