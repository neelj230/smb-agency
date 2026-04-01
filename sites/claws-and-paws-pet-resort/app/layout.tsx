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
  name: 'Claws and Paws Pet Resort',
  address: '862 NW Oak Ave',
  city: 'Corvallis',
  state: 'OR',
  zip: '97330',
  phone: '(541) 223-3608',
  email: '',
  rating: 5,
  reviewCount: 18,
  hours: {
    Monday: '6:30 AM – 7:00 PM',
    Tuesday: '6:30 AM – 7:00 PM',
    Wednesday: '6:30 AM – 7:00 PM',
    Thursday: '6:30 AM – 7:00 PM',
    Friday: '6:30 AM – 7:00 PM',
    Saturday: '8:00 AM – 5:00 PM',
    Sunday: '8:00 AM – 5:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'Claws and Paws Pet Resort — daycare in Corvallis, OR',
  description: 'Claws and Paws Pet Resort is a daycare located in Corvallis, OR. Where every dog comes home worn out happy.',
  keywords: ['daycare', 'Corvallis', 'OR', 'Claws and Paws Pet Resort'],
  openGraph: {
    title: 'Claws and Paws Pet Resort',
    description: 'Claws and Paws Pet Resort is a daycare located in Corvallis, OR. Where every dog comes home worn out happy.',
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
