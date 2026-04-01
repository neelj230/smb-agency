import type { Metadata } from 'next'
import { Pinyon_Script, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const pinyon_script = Pinyon_Script({
  subsets: ['latin'],
  variable: '--font-pinyon-script',
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
  name: 'Amanda\'s Classy Clips Pet',
  address: '612 E Main St',
  city: 'Medford',
  state: 'OR',
  zip: '97504',
  phone: '(541) 608-7017',
  email: '',
  rating: 4.8,
  reviewCount: 125,
  hours: {
    Monday: 'Closed',
    Tuesday: '7:00 AM – 6:00 PM',
    Wednesday: '7:00 AM – 6:00 PM',
    Thursday: '7:00 AM – 6:00 PM',
    Friday: '7:00 AM – 6:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Amanda\'s Classy Clips Pet — pet groomer in Medford, OR',
  description: 'Amanda\'s Classy Clips Pet is a pet groomer located in Medford, OR. Where every pup leaves loved.',
  keywords: ['pet groomer', 'Medford', 'OR', 'Amanda\'s Classy Clips Pet'],
  openGraph: {
    title: 'Amanda\'s Classy Clips Pet',
    description: 'Amanda\'s Classy Clips Pet is a pet groomer located in Medford, OR. Where every pup leaves loved.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${pinyon_script.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-pinyon-script)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
