import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { AnalyticsProvider } from '@/integrations/AnalyticsProvider'
import { SchemaJsonLd } from '@/components/SchemaJsonLd'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '700'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const businessData = {
  name: 'Paco\'s Auto Repair shop',
  address: '5302 Warren St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19131',
  phone: '(267) 748-7397',
  email: '',
  rating: 4.8,
  reviewCount: 17,
  hours: {
    Monday: '7:00 AM – 5:00 PM',
    Tuesday: '7:00 AM – 5:00 PM',
    Wednesday: '7:00 AM – 5:00 PM',
    Thursday: '7:00 AM – 5:00 PM',
    Friday: '7:00 AM – 5:00 PM',
    Saturday: '7:00 AM – 5:00 PM',
    Sunday: 'Closed',
  },
}

export const metadata: Metadata = {
  title: 'Paco\'s Auto Repair shop — auto repair in Philadelphia, PA',
  description: 'Paco\'s Auto Repair shop is a auto repair located in Philadelphia, PA. Fixed Right. No Runaround. Just Paco.',
  keywords: ['auto repair', 'Philadelphia', 'PA', 'Paco\'s Auto Repair shop'],
  openGraph: {
    title: 'Paco\'s Auto Repair shop',
    description: 'Paco\'s Auto Repair shop is a auto repair located in Philadelphia, PA. Fixed Right. No Runaround. Just Paco.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dm_sans.variable} ${mono.variable}`}>
      <head>
        <SchemaJsonLd business={businessData} />
      </head>
      <body
        className="font-[family-name:var(--font-dm-sans)] antialiased"
        style={
          {
            '--font-display': 'var(--font-syne)',
          } as React.CSSProperties
        }
      >
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  )
}
