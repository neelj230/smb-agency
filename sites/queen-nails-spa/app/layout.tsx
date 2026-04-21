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
  name: 'Queen Nails & Spa',
  address: '16 N 3rd St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19106',
  phone: '(215) 592-1629',
  email: '',
  rating: 4.7,
  reviewCount: 576,
  hours: {
    Monday: '10:00 AM – 8:00 PM',
    Tuesday: '10:00 AM – 8:00 PM',
    Wednesday: '10:00 AM – 8:00 PM',
    Thursday: '10:00 AM – 8:00 PM',
    Friday: '9:30 AM – 8:00 PM',
    Saturday: '9:30 AM – 6:30 PM',
    Sunday: '10:00 AM – 5:30 PM',
  },
}

export const metadata: Metadata = {
  title: 'Queen Nails & Spa — nail salon in Philadelphia, PA',
  description: 'Queen Nails & Spa is a nail salon located in Philadelphia, PA. Your nails, exactly how you imagined.',
  keywords: ['nail salon', 'Philadelphia', 'PA', 'Queen Nails & Spa'],
  openGraph: {
    title: 'Queen Nails & Spa',
    description: 'Queen Nails & Spa is a nail salon located in Philadelphia, PA. Your nails, exactly how you imagined.',
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
