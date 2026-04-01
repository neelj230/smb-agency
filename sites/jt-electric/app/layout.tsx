import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
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
  name: 'JT Electric',
  address: '4849 Airway Dr STE 105',
  city: 'Central Point',
  state: 'OR',
  zip: '97502',
  phone: '(541) 734-5714',
  email: '',
  rating: 4.9,
  reviewCount: 29,
  hours: {
    Monday: '8:00 AM – 4:00 PM',
    Tuesday: '8:00 AM – 4:00 PM',
    Wednesday: '8:00 AM – 4:00 PM',
    Thursday: '8:00 AM – 4:00 PM',
    Friday: '8:00 AM – 4:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'JT Electric — electrician in Central Point, OR',
  description: 'JT Electric is a electrician located in Central Point, OR. Wired right. Done fast. No drama.',
  keywords: ['electrician', 'Central Point', 'OR', 'JT Electric'],
  openGraph: {
    title: 'JT Electric',
    description: 'JT Electric is a electrician located in Central Point, OR. Wired right. Done fast. No drama.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair_display.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-playfair-display)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
