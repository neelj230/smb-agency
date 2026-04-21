import type { Metadata } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const playfair_display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
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
  name: 'Dreamer\'s Daycare',
  address: '2979 Bailey Ave',
  city: 'Medford',
  state: 'OR',
  zip: '97504',
  phone: '(541) 772-0619',
  email: '',
  rating: 5,
  reviewCount: 4,
}

export const metadata: Metadata = {
  title: 'Dreamer\'s Daycare — daycare in Medford, OR',
  description: 'Dreamer\'s Daycare is a daycare located in Medford, OR. Where little dreamers grow into themselves.',
  keywords: ['daycare', 'Medford', 'OR', 'Dreamer\'s Daycare'],
  openGraph: {
    title: 'Dreamer\'s Daycare',
    description: 'Dreamer\'s Daycare is a daycare located in Medford, OR. Where little dreamers grow into themselves.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair_display.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-playfair-display)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
