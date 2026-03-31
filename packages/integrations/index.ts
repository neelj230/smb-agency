// Functional integration components for SMB Agency generated sites
// Phase 1: ships with every site — zero business owner setup needed

export { ContactForm } from './ContactForm'
export { GoogleMapsEmbed } from './GoogleMapsEmbed'
export { SocialLinksBar } from './SocialLinks'
export { ReviewsCarousel } from './ReviewsCarousel'
export { AnalyticsProvider } from './AnalyticsProvider'

// Server action
export { sendContactEmail } from './actions/contact'

// Registry
export { getIntegrations, getCategories } from './registry'

// Types
export type {
  ContactFormData,
  ContactFormProps,
  GoogleMapsEmbedProps,
  SocialLinksBarProps,
  ReviewsCarouselProps,
  AnalyticsProviderProps,
  IntegrationSuggestion,
} from './types'
