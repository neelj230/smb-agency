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
  name: 'Tom\'s Electrical',
  address: '24076 SE Stark St #224',
  city: 'Gresham',
  state: 'OR',
  zip: '97030',
  phone: '(503) 739-9848',
  email: '',
  rating: 5,
  reviewCount: 8,
  hours: {
    Monday: '7:00 AM – 10:00 PM',
    Tuesday: '7:00 AM – 10:00 PM',
    Wednesday: '7:00 AM – 10:00 PM',
    Thursday: '7:00 AM – 10:00 PM',
    Friday: '7:00 AM – 10:00 PM',
    Saturday: '7:00 AM – 10:00 PM',
    Sunday: '7:00 AM – 10:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Tom\'s Electrical — electrician in Gresham, OR',
  description: 'Tom\'s Electrical is a electrician located in Gresham, OR. Wired Right. Priced Fair. Every Time.',
  keywords: ['electrician', 'Gresham', 'OR', 'Tom\'s Electrical'],
  openGraph: {
    title: 'Tom\'s Electrical',
    description: 'Tom\'s Electrical is a electrician located in Gresham, OR. Wired Right. Priced Fair. Every Time.',
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
