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
  name: 'No Ka Oi Tiki Tattoo',
  address: '610 S 4th St',
  city: 'Philadelphia',
  state: 'PA',
  zip: '19147',
  phone: '(215) 925-1766',
  email: '',
  rating: 4.5,
  reviewCount: 458,
  hours: {
    Monday: '12:00 – 9:00 PM',
    Tuesday: '12:00 – 9:00 PM',
    Wednesday: '12:00 – 9:00 PM',
    Thursday: '12:00 – 9:00 PM',
    Friday: '12:00 – 9:00 PM',
    Saturday: '11:00 AM – 9:00 PM',
    Sunday: '11:00 AM – 9:00 PM',
  },
}

export const metadata: Metadata = {
  title: 'No Ka Oi Tiki Tattoo — tattoo parlor in Philadelphia, PA',
  description: 'No Ka Oi Tiki Tattoo is a tattoo parlor located in Philadelphia, PA. Art That Lives Under Your Skin',
  keywords: ['tattoo parlor', 'Philadelphia', 'PA', 'No Ka Oi Tiki Tattoo'],
  openGraph: {
    title: 'No Ka Oi Tiki Tattoo',
    description: 'No Ka Oi Tiki Tattoo is a tattoo parlor located in Philadelphia, PA. Art That Lives Under Your Skin',
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
