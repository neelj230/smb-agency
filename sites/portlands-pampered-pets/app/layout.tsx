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
  name: 'Portland\'s Pampered Pets',
  address: '4236 SE Hawthorne Blvd',
  city: 'Portland',
  state: 'OR',
  zip: '97215',
  phone: '(503) 233-2799',
  email: '',
  rating: 4.5,
  reviewCount: 215,
  hours: {
    Monday: '9:00 AM – 4:00 PM',
    Tuesday: '9:00 AM – 4:00 PM',
    Wednesday: '9:00 AM – 4:00 PM',
    Thursday: '9:00 AM – 4:00 PM',
    Friday: '9:00 AM – 4:00 PM',
    Saturday: '9:00 AM – 4:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Portland\'s Pampered Pets | Where Anxious Pets Leave Happy',
  description: 'Gentle, expert grooming on SE Hawthorne, Portland. Specializing in anxious & rescue dogs. Fast availability, fair prices, $5 nail trims. Call (503) 233-2799.',
  keywords: ['pet groomer Portland OR', 'anxiety-sensitive dog grooming Portland', 'rescue dog groomer SE Hawthorne', 'small dog grooming Portland', 'Chihuahua grooming Portland', 'golden retriever grooming Portland', 'affordable dog grooming Portland'],
  openGraph: {
    title: 'Portland\'s Pampered Pets',
    description: 'Gentle, expert grooming on SE Hawthorne, Portland. Specializing in anxious & rescue dogs. Fast availability, fair prices, $5 nail trims. Call (503) 233-2799.',
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
