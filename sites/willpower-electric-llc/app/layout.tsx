import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '600', '800'],
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
  name: 'Willpower Electric, LLC',
  address: '24 Ehrman Way',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 535-3965',
  email: '',
  rating: 4.8,
  reviewCount: 16,
  hours: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Willpower Electric, LLC — electrician in Medford, OR',
  description: 'Willpower Electric, LLC is a electrician located in Medford, OR. Real Power. Real Savings. Real Simple.',
  keywords: ['electrician', 'Medford', 'OR', 'Willpower Electric, LLC'],
  openGraph: {
    title: 'Willpower Electric, LLC',
    description: 'Willpower Electric, LLC is a electrician located in Medford, OR. Real Power. Real Savings. Real Simple.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-plus-jakarta)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
