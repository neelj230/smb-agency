import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Fragment_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  variable: '--font-fragment-mono',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'NJ Digital | Stunning Websites for Small Businesses',
  description:
    'We build beautiful, bespoke websites for small businesses. Every site designed from 185+ award-winning elements. Ready in days, not months.',
  keywords: [
    'web design agency',
    'small business websites',
    'bespoke web design',
    'next.js websites',
    'philadelphia web design',
  ],
  openGraph: {
    title: 'NJ Digital | Stunning Websites for Small Businesses',
    description: 'Beautiful, bespoke sites for small businesses — built in days, not months.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${fragmentMono.variable}`}
    >
      <body className="font-[family-name:var(--font-inter)] antialiased grain">
        {children}
      </body>
    </html>
  )
}
