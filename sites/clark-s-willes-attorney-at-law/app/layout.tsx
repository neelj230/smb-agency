import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
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
  name: 'Clark S. Willes, Attorney at Law',
  address: '129 NW 4th St Ste 205',
  city: 'Corvallis',
  state: 'OR',
  zip: '97330',
  phone: '(541) 758-0071',
  email: '',
  rating: 4.2,
  reviewCount: 10,
  hours: {
    Monday: '9:00 AM – 4:00 PM',
    Tuesday: '9:00 AM – 4:00 PM',
    Wednesday: '9:00 AM – 4:00 PM',
    Thursday: '9:00 AM – 4:00 PM',
    Friday: '9:00 AM – 12:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Clark S. Willes, Attorney at Law — law firm in Corvallis, OR',
  description: 'Clark S. Willes, Attorney at Law is a law firm located in Corvallis, OR. Second Chances Won in the Courtroom',
  keywords: ['law firm', 'Corvallis', 'OR', 'Clark S. Willes, Attorney at Law'],
  openGraph: {
    title: 'Clark S. Willes, Attorney at Law',
    description: 'Clark S. Willes, Attorney at Law is a law firm located in Corvallis, OR. Second Chances Won in the Courtroom',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-playfair)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
