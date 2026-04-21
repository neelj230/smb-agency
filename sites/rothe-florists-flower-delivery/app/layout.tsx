import type { Metadata } from 'next'
import { EB_Garamond, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const eb_garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
  weight: ['400', '700'],
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
  name: 'Rothe Florists & Flower Delivery',
  address: '7148 Germantown Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19119',
  phone: '(215) 247-0832',
  email: '',
  rating: 4.9,
  reviewCount: 460,
  hours: {
    Monday: '9:00 AM – 4:00 PM',
    Tuesday: '9:00 AM – 4:00 PM',
    Wednesday: '9:00 AM – 4:00 PM',
    Thursday: '9:00 AM – 4:00 PM',
    Friday: '9:00 AM – 4:00 PM',
    Saturday: '9:00 AM – 2:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Rothe Florists & Flower Delivery — florist in Philadelphia, PA',
  description: 'Rothe Florists & Flower Delivery is a florist located in Philadelphia, PA. Flowers That Actually Show Up Beautiful.',
  keywords: ['florist', 'Philadelphia', 'PA', 'Rothe Florists & Flower Delivery'],
  openGraph: {
    title: 'Rothe Florists & Flower Delivery',
    description: 'Rothe Florists & Flower Delivery is a florist located in Philadelphia, PA. Flowers That Actually Show Up Beautiful.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${eb_garamond.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-eb-garamond)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
