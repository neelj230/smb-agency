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
  name: 'Patty\'s Little Minions Childcare LLC',
  address: '4807 Camelot Ct NE',
  city: 'Salem',
  state: 'OR',
  zip: '97301',
  phone: '(503) 881-3580',
  email: '',
  rating: 5,
  reviewCount: 7,
  hours: {
    Monday: '6:00 AM – 4:30 PM',
    Tuesday: '6:00 AM – 4:30 PM',
    Wednesday: '6:00 AM – 4:30 PM',
    Thursday: '6:00 AM – 4:30 PM',
    Friday: '6:00 AM – 4:30 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Patty\'s Little Minions Childcare LLC — daycare in Salem, OR',
  description: 'Patty\'s Little Minions Childcare LLC is a daycare located in Salem, OR. Where Little Ones Thrive and Feel Loved',
  keywords: ['daycare', 'Salem', 'OR', 'Patty\'s Little Minions Childcare LLC'],
  openGraph: {
    title: 'Patty\'s Little Minions Childcare LLC',
    description: 'Patty\'s Little Minions Childcare LLC is a daycare located in Salem, OR. Where Little Ones Thrive and Feel Loved',
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
