import type { Metadata } from 'next'
import { Pinyon_Script, Inter, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const pinyon_script = Pinyon_Script({
  subsets: ['latin'],
  variable: '--font-pinyon-script',
  display: 'swap',
  weight: ['400'],
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
  name: 'Emerald K9',
  address: '1720 NW Lovejoy St ste 112',
  city: 'Portland',
  state: 'OR',
  zip: '97209',
  phone: '(971) 413-5772',
  email: '',
  rating: 4.9,
  reviewCount: 37,
}

export const metadata: Metadata = {
  title: 'Emerald K9 — pet groomer in Portland, OR',
  description: 'Emerald K9 is a pet groomer located in Portland, OR. Calm hands. Happy dogs. Real trust.',
  keywords: ['pet groomer', 'Portland', 'OR', 'Emerald K9'],
  openGraph: {
    title: 'Emerald K9',
    description: 'Emerald K9 is a pet groomer located in Portland, OR. Calm hands. Happy dogs. Real trust.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${pinyon_script.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-inter)] antialiased"
        style={
          {
            '--font-display': 'var(--font-pinyon-script)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
