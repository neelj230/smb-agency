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
  name: 'Jazzy’s Doggy Spaw',
  address: '628 N Riverside Ave # C',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 531-0947',
  email: '',
  rating: 5,
  reviewCount: 11,
  hours: {
    Monday: '10:00 AM – 5:00 AM',
    Tuesday: '10:00 AM – 5:00 PM',
    Wednesday: '10:00 AM – 5:00 PM',
    Thursday: '10:00 AM – 5:00 PM',
    Friday: '10:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Jazzy’s Doggy Spaw — pet groomer in Medford, OR',
  description: 'Jazzy’s Doggy Spaw is a pet groomer located in Medford, OR. Where dogs leave happier than they arrived.',
  keywords: ['pet groomer', 'Medford', 'OR', 'Jazzy’s Doggy Spaw'],
  openGraph: {
    title: 'Jazzy’s Doggy Spaw',
    description: 'Jazzy’s Doggy Spaw is a pet groomer located in Medford, OR. Where dogs leave happier than they arrived.',
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
