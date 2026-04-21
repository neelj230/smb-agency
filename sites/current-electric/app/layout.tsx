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
  name: 'Current Electric',
  address: '2508 Jackson Drive',
  city: 'Medford',
  state: 'OR',
  zip: '97504',
  phone: '(541) 210-0677',
  email: '',
  rating: 5,
  reviewCount: 5,
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
  title: 'Current Electric — electrician in Medford, OR',
  description: 'Current Electric is a electrician located in Medford, OR. Wired Right. Shows Up. Every Time.',
  keywords: ['electrician', 'Medford', 'OR', 'Current Electric'],
  openGraph: {
    title: 'Current Electric',
    description: 'Current Electric is a electrician located in Medford, OR. Wired Right. Shows Up. Every Time.',
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
