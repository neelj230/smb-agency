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
  name: 'Hillsboro Electric LLC',
  address: '8285 NE Evergreen Pkwy Suite 110',
  city: 'Hillsboro',
  state: 'OR',
  zip: '97124',
  phone: '(503) 439-9666',
  email: '',
  rating: 5,
  reviewCount: 8,
  hours: {
    Monday: '9:00 AM – 3:00 PM',
    Tuesday: '9:00 AM – 3:00 PM',
    Wednesday: '9:00 AM – 3:00 PM',
    Thursday: '9:00 AM – 3:00 PM',
    Friday: '9:00 AM – 3:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Hillsboro Electric LLC — electrician in Hillsboro, OR',
  description: 'Hillsboro Electric LLC is a electrician located in Hillsboro, OR. Wired right. Done right. Ward\'s here.',
  keywords: ['electrician', 'Hillsboro', 'OR', 'Hillsboro Electric LLC'],
  openGraph: {
    title: 'Hillsboro Electric LLC',
    description: 'Hillsboro Electric LLC is a electrician located in Hillsboro, OR. Wired right. Done right. Ward\'s here.',
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
