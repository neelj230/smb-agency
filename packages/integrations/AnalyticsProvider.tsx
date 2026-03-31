import { Analytics } from '@vercel/analytics/react'

/**
 * Wraps Vercel Analytics. Drop into the root layout of any generated site.
 * Zero config — Vercel automatically collects page views and web vitals.
 */
export function AnalyticsProvider() {
  return <Analytics />
}
