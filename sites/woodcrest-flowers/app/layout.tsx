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
  name: 'Woodcrest Flowers',
  address: 'N 58th St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(267) 323-4549',
  email: '',
  rating: 4.1,
  reviewCount: 9,
  hours: {
    Monday: '7:00 AM – 3:00 PM',
    Tuesday: '7:00 AM – 3:00 PM',
    Wednesday: '7:00 AM – 3:00 PM',
    Thursday: '7:00 AM – 3:00 PM',
    Friday: '7:00 AM – 3:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Woodcrest Flowers | Flowers That Actually Feel Like Love',
  description: 'Philadelphia\'s family florist for custom bouquets, memorial tributes, same-day orders & orchid gardens. Call Woodcrest Flowers on N 58th St: (267) 323-4549.',
  keywords: ['florist Philadelphia', 'same-day flower delivery Philadelphia', 'custom bouquets Philadelphia', 'memorial floral tributes Philadelphia', 'orchid arrangements Philadelphia', 'corporate floral orders Philadelphia', 'Philadelphia flower shop'],
  openGraph: {
    title: 'Woodcrest Flowers',
    description: 'Philadelphia\'s family florist for custom bouquets, memorial tributes, same-day orders & orchid gardens. Call Woodcrest Flowers on N 58th St: (267) 323-4549.',
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
