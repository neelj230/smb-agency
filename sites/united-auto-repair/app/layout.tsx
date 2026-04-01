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
  name: 'United Auto Repair',
  address: '6163 Lancaster Ave',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19151',
  phone: '(215) 871-8440',
  email: '',
  rating: 4.3,
  reviewCount: 178,
  hours: {
    Monday: '8:00 AM – 4:30 PM',
    Tuesday: '8:00 AM – 4:30 PM',
    Wednesday: '8:00 AM – 4:30 PM',
    Thursday: '8:00 AM – 4:30 PM',
    Friday: '8:00 AM – 4:30 PM',
    Saturday: '8:00 AM – 3:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'United Auto Repair | Fixed Right. Treated Like Family.',
  description: 'Honest, same-day auto repair on Lancaster Ave in Philadelphia. Brakes, inspections, oil changes & more. Trusted by generations. Call (215) 871-8440.',
  keywords: ['auto repair Philadelphia', 'brake repair Lancaster Ave', 'PA state inspection same day', 'oil change Philadelphia', 'honest auto mechanic Philly', 'tire installation West Philadelphia', 'United Auto Repair 19151'],
  openGraph: {
    title: 'United Auto Repair',
    description: 'Honest, same-day auto repair on Lancaster Ave in Philadelphia. Brakes, inspections, oil changes & more. Trusted by generations. Call (215) 871-8440.',
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
