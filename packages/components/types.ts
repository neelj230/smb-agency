/** Shared types for all components */

export interface BusinessData {
  name: string
  slug: string
  category: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email?: string
  website?: string
  hours?: Record<string, string>
  rating?: number
  reviewCount?: number
  services?: Service[]
  reviews?: Review[]
  team?: TeamMember[]
  photos?: Photo[]
  stats?: Stat[]
  faq?: FAQItem[]
  socialLinks?: SocialLinks
  brandNarrative?: string
  tagline?: string
  ownerStory?: string
}

export interface Service {
  name: string
  description: string
  icon?: string
  image?: string
}

export interface Review {
  text: string
  author: string
  rating: number
  source: 'google' | 'yelp'
  date?: string
}

export interface TeamMember {
  name: string
  role: string
  image?: string
  bio?: string
  credentials?: string[]
}

export interface Photo {
  src: string
  alt: string
  category: 'exterior' | 'interior' | 'team' | 'work' | 'food' | 'product'
  width?: number
  height?: number
  blurDataURL?: string
}

export interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  tiktok?: string
  yelp?: string
}

export interface ProcessStep {
  title: string
  description: string
  image?: string
}

export interface ComparisonItem {
  text: string
}

export interface NavLink {
  label: string
  href: string
}

export interface PricingTier {
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export interface MenuItem {
  name: string
  description?: string
  price?: string
  category: string
}

export interface FounderInfo {
  name: string
  role?: string
  image?: string
  quote: string
}

export interface ListingItem {
  title: string
  location: string
  price: string
  image: string
  specs?: Record<string, string>
  badge?: string
}

/** Color palette for a site */
export interface Palette {
  primary: string
  accent: string
  bg: string
  bgAlt: string
  text: string
  textMuted: string
}
