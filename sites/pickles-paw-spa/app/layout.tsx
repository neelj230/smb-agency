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
  name: 'Pickles Paw Spa',
  address: '828 S Central Ave suite #7',
  city: 'Medford',
  state: 'OR',
  zip: '97501',
  phone: '(541) 500-1037',
  email: '',
  rating: 4.8,
  reviewCount: 39,
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
  title: 'Pickles Paw Spa | Where Every Pup Leaves Prettier',
  description: 'Expert dog grooming in Medford, OR. From puppy\'s first groom to full breed cuts — Pickles Paw Spa makes every dog look and feel their best. Call (541) 500-1037.',
  keywords: ['dog groomer Medford OR', 'pet grooming Medford Oregon', 'puppy grooming Medford', 'breed cut dog grooming', 'Pickles Paw Spa', 'dog spa Medford', 'full groom dog Medford OR'],
  openGraph: {
    title: 'Pickles Paw Spa',
    description: 'Expert dog grooming in Medford, OR. From puppy\'s first groom to full breed cuts — Pickles Paw Spa makes every dog look and feel their best. Call (541) 500-1037.',
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
