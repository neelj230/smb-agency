import type { Metadata } from 'next'
import { Figtree, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
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
  name: 'Scioli Pat',
  address: '1744 Passyunk Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19148',
  phone: '(215) 334-0990',
  email: '',
  rating: 4.6,
  reviewCount: 78,
  hours: {
    Monday: 'Closed',
    Tuesday: '10:00 AM – 5:00 PM',
    Wednesday: '10:00 AM – 5:00 PM',
    Thursday: '10:00 AM – 5:00 PM',
    Friday: '10:00 AM – 5:00 PM',
    Saturday: '10:00 AM – 5:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Scioli Pat | Old School South Philly. Perfect Fit.',
  description: 'Expert tailoring and alterations on Passyunk Ave in South Philadelphia. Pat and Anna Scioli make every garment fit like it was made for you.',
  keywords: ['tailor Philadelphia', 'custom suit tailoring South Philly', 'garment alterations Passyunk Avenue', 'suit alterations Philadelphia', 'trouser hemming Philadelphia', 'dress alterations South Philadelphia', 'Philadelphia master tailor'],
  openGraph: {
    title: 'Scioli Pat',
    description: 'Expert tailoring and alterations on Passyunk Ave in South Philadelphia. Pat and Anna Scioli make every garment fit like it was made for you.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-figtree)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
