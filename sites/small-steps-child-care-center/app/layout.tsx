import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const be_vietnam_pro = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
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
  name: 'Small Steps Child Care Center',
  address: '1900 Crater Lake Ave',
  city: 'Medford',
  state: 'OR',
  zip: '97504',
  phone: '(541) 774-9326',
  email: '',
  rating: 5,
  reviewCount: 2,
}

export const metadata: Metadata = {
  title: 'Small Steps Child Care Center — daycare in Medford, OR',
  description: 'Small Steps Child Care Center is a daycare located in Medford, OR. Little feet, big futures, every day.',
  keywords: ['daycare', 'Medford', 'OR', 'Small Steps Child Care Center'],
  openGraph: {
    title: 'Small Steps Child Care Center',
    description: 'Small Steps Child Care Center is a daycare located in Medford, OR. Little feet, big futures, every day.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${be_vietnam_pro.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-be-vietnam-pro)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
