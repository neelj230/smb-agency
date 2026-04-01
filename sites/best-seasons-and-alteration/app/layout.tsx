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
  name: 'Best Seasons and alteration',
  address: '239 N 10th St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19107',
  phone: '(267) 597-4441',
  email: '',
  rating: 4.3,
  reviewCount: 68,
  hours: {
    Monday: '11:00 AM – 4:00 PM',
    Tuesday: '11:00 AM – 4:00 PM',
    Wednesday: '11:00 AM – 4:00 PM',
    Thursday: '11:00 AM – 4:00 PM',
    Friday: '11:00 AM – 4:00 PM',
    Saturday: '11:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Best Seasons and alteration — tailor in Philadelphia, PA',
  description: 'Best Seasons and alteration is a tailor located in Philadelphia, PA. Perfect Fit, Friendly Cats Included.',
  keywords: ['tailor', 'Philadelphia', 'PA', 'Best Seasons and alteration'],
  openGraph: {
    title: 'Best Seasons and alteration',
    description: 'Best Seasons and alteration is a tailor located in Philadelphia, PA. Perfect Fit, Friendly Cats Included.',
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
