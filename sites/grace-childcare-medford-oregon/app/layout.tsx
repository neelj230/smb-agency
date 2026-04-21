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
  name: 'Grace Childcare Medford Oregon',
  address: '602 Shadow Wood Dr',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 862-0783',
  email: '',
  rating: 5,
  reviewCount: 4,
  hours: {
    Monday: '7:30 AM – 4:30 PM',
    Tuesday: '7:30 AM – 4:30 PM',
    Wednesday: '7:30 AM – 4:30 PM',
    Thursday: '7:30 AM – 4:30 PM',
    Friday: '7:30 AM – 4:30 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Grace Childcare Medford Oregon — daycare in Medford, OR',
  description: 'Grace Childcare Medford Oregon is a daycare located in Medford, OR. Where faith, love, and learning grow.',
  keywords: ['daycare', 'Medford', 'OR', 'Grace Childcare Medford Oregon'],
  openGraph: {
    title: 'Grace Childcare Medford Oregon',
    description: 'Grace Childcare Medford Oregon is a daycare located in Medford, OR. Where faith, love, and learning grow.',
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
