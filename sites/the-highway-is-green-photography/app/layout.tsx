import type { Metadata } from 'next'
import { Manrope, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
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
  name: 'The Highway is Green Photography',
  address: 'Ashland',
  city: 'OR 97520',
  state: 'US',
  zip: '',
  phone: '(541) 690-9293',
  email: '',
  rating: 5,
  reviewCount: 3,
  hours: {
    Monday: '8:00 AM – 8:00 PM',
    Tuesday: '8:00 AM – 8:00 PM',
    Wednesday: '8:00 AM – 8:00 PM',
    Thursday: '8:00 AM – 8:00 PM',
    Friday: '8:00 AM – 8:00 PM',
    Saturday: '8:00 AM – 8:00 PM',
    Sunday: '8:00 AM – 8:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'The Highway is Green Photography — photography studio in OR 97520, US',
  description: 'The Highway is Green Photography is a photography studio located in OR 97520, US. Every Frame Tells a Wilder Story',
  keywords: ['photography studio', 'OR 97520', 'US', 'The Highway is Green Photography'],
  openGraph: {
    title: 'The Highway is Green Photography',
    description: 'The Highway is Green Photography is a photography studio located in OR 97520, US. Every Frame Tells a Wilder Story',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-manrope)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
