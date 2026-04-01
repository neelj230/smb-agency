import type { Metadata } from 'next'
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
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
  name: 'Lucky Dog Pet Salon',
  address: '622 Crater Lake Ave',
  city: 'Medford',
  state: 'OR',
  zip: '97504',
  phone: '(541) 245-2949',
  email: '',
  rating: 4.5,
  reviewCount: 168,
  hours: {
    Monday: '9:00 AM – 5:00 PM',
    Tuesday: '9:00 AM – 5:00 PM',
    Wednesday: '9:00 AM – 5:00 PM',
    Thursday: '9:00 AM – 5:00 PM',
    Friday: '9:00 AM – 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Lucky Dog Pet Salon — pet groomer in Medford, OR',
  description: 'Lucky Dog Pet Salon is a pet groomer located in Medford, OR. Where Stinky Beasts Leave Looking Royal',
  keywords: ['pet groomer', 'Medford', 'OR', 'Lucky Dog Pet Salon'],
  openGraph: {
    title: 'Lucky Dog Pet Salon',
    description: 'Lucky Dog Pet Salon is a pet groomer located in Medford, OR. Where Stinky Beasts Leave Looking Royal',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bricolage_grotesque.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-bricolage-grotesque)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
