import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
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
  name: 'Henderson Electric',
  address: '2949 SW Cascade Vista Dr',
  city: 'Redmond',
  state: 'OR',
  zip: '97756',
  phone: '(503) 580-1310',
  email: '',
  rating: 5,
  reviewCount: 2,
  hours: {
    Monday: '7:00 AM – 5:00 PM',
    Tuesday: '7:00 AM – 5:00 PM',
    Wednesday: '7:00 AM – 5:00 AM',
    Thursday: '7:00 AM – 5:00 PM',
    Friday: '7:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Henderson Electric — electrician in Redmond, OR',
  description: 'Henderson Electric is a electrician located in Redmond, OR. Done Right, Done Early, Every Time.',
  keywords: ['electrician', 'Redmond', 'OR', 'Henderson Electric'],
  openGraph: {
    title: 'Henderson Electric',
    description: 'Henderson Electric is a electrician located in Redmond, OR. Done Right, Done Early, Every Time.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-plus-jakarta-sans)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
