import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const be_vietnam_pro = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
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
  name: 'Rockwellfoto',
  address: '590 Weller Ln',
  city: 'Ashland',
  state: 'OR',
  zip: '97520',
  phone: '(541) 646-5290',
  email: '',
  rating: 5,
  reviewCount: 5,
  hours: {
    Monday: '9:00 AM – 5:00 PM',
    Tuesday: '9:00 AM – 5:00 PM',
    Wednesday: '9:00 AM – 5:00 PM',
    Thursday: '9:00 AM – 5:00 PM',
    Friday: '9:00 AM – 5:00 PM',
    Saturday: '9:00 AM – 1:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Rockwellfoto — photography studio in Ashland, OR',
  description: 'Rockwellfoto is a photography studio located in Ashland, OR. Where Vision Meets Light. Every Frame.',
  keywords: ['photography studio', 'Ashland', 'OR', 'Rockwellfoto'],
  openGraph: {
    title: 'Rockwellfoto',
    description: 'Rockwellfoto is a photography studio located in Ashland, OR. Where Vision Meets Light. Every Frame.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${be_vietnam_pro.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-be-vietnam-pro)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
