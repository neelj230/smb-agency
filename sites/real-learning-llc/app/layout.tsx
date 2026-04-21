import type { Metadata } from 'next'
import { Outfit, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '600', '700'],
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
  name: 'Real Learning LLC',
  address: '5593 Edna Way',
  city: 'Eugene',
  state: 'OR',
  zip: '97402',
  phone: '(541) 636-4435',
  email: '',
  rating: 5,
  reviewCount: 7,
  hours: {
    Monday: '6:00 AM – 6:00 PM',
    Tuesday: '6:00 AM – 6:00 PM',
    Wednesday: '6:00 AM – 6:00 PM',
    Thursday: '6:00 AM – 6:00 PM',
    Friday: '6:00 AM – 6:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Real Learning LLC — tutoring service in Eugene, OR',
  description: 'Real Learning LLC is a tutoring service located in Eugene, OR. Where Every Child Learns to Shine',
  keywords: ['tutoring service', 'Eugene', 'OR', 'Real Learning LLC'],
  openGraph: {
    title: 'Real Learning LLC',
    description: 'Real Learning LLC is a tutoring service located in Eugene, OR. Where Every Child Learns to Shine',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-outfit)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
