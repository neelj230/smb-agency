import type { Metadata } from 'next'
import { Hedvig_Letters_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const hedvig_letters_serif = Hedvig_Letters_Serif({
  subsets: ['latin'],
  variable: '--font-hedvig-letters-serif',
  display: 'swap',
  weight: ['400'],
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
  name: 'West Salem Dog Grooming, formerly Canine Concepts',
  address: '1452 Brush College Rd NW',
  city: 'Salem',
  state: 'OR',
  zip: '97304',
  phone: '(503) 581-1529',
  email: '',
  rating: 4.5,
  reviewCount: 38,
  hours: {
    Monday: '8:30 AM – 4:30 PM',
    Tuesday: '8:30 AM – 4:30 PM',
    Wednesday: 'Closed',
    Thursday: '8:30 AM – 4:30 PM',
    Friday: '8:30 AM – 4:30 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'West Salem Dog Grooming | Where Dogs Drag You to the Door',
  description: 'Expert dog grooming in Salem, OR. Specializing in show dogs, anxious rescues & first grooms. Linda and her team make dogs actually want to be there.',
  keywords: ['dog grooming Salem OR', 'West Salem dog groomer', 'show dog grooming Salem', 'anxiety sensitive dog grooming', 'large breed dog grooming Salem', 'puppy first groom Salem Oregon', 'Canine Concepts Salem Oregon', 'dog groomer Brush College Road'],
  openGraph: {
    title: 'West Salem Dog Grooming, formerly Canine Concepts',
    description: 'Expert dog grooming in Salem, OR. Specializing in show dogs, anxious rescues & first grooms. Linda and her team make dogs actually want to be there.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${hedvig_letters_serif.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-hedvig-letters-serif)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
