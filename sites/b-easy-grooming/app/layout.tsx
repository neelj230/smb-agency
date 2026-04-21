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
  name: 'B Easy Grooming',
  address: '22 S Central Ave',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(458) 274-9602',
  email: '',
  rating: 5,
  reviewCount: 3,
  hours: {
    Monday: '9:00 AM – 5:00 PM',
    Tuesday: '9:00 AM – 5:00 PM',
    Wednesday: '9:00 AM – 5:00 PM',
    Thursday: '9:00 AM – 5:00 PM',
    Friday: '9:00 AM – 5:00 PM',
    Saturday: '9:00 AM – 5:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'B Easy Grooming — pet groomer in Medford, OR',
  description: 'B Easy Grooming is a pet groomer located in Medford, OR. Where Dogs Are Loved, Not Just Groomed',
  keywords: ['pet groomer', 'Medford', 'OR', 'B Easy Grooming'],
  openGraph: {
    title: 'B Easy Grooming',
    description: 'B Easy Grooming is a pet groomer located in Medford, OR. Where Dogs Are Loved, Not Just Groomed',
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
