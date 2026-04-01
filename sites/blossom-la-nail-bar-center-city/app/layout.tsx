import type { Metadata } from 'next'
import { Figtree, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
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
  name: 'Blossom LA Nail Bar Center City',
  address: '315 S 13th St unit a',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19107',
  phone: '(215) 869-8718',
  email: '',
  rating: 4.5,
  reviewCount: 299,
  hours: {
    Monday: '10:00 AM – 8:00 PM',
    Tuesday: '10:00 AM – 8:00 PM',
    Wednesday: '10:00 AM – 8:00 PM',
    Thursday: '10:00 AM – 8:00 PM',
    Friday: '10:00 AM – 8:00 PM',
    Saturday: '9:30 AM – 7:00 PM',
    Sunday: '10:00 AM – 6:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Blossom LA Nail Bar Center City — nail salon in Philadelphia, PA',
  description: 'Blossom LA Nail Bar Center City is a nail salon located in Philadelphia, PA. Where your nails finally get it right.',
  keywords: ['nail salon', 'Philadelphia', 'PA', 'Blossom LA Nail Bar Center City'],
  openGraph: {
    title: 'Blossom LA Nail Bar Center City',
    description: 'Blossom LA Nail Bar Center City is a nail salon located in Philadelphia, PA. Where your nails finally get it right.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-figtree)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
