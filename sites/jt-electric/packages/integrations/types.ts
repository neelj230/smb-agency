/** Types for functional integration components */

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Business slug — used to route the submission */
  businessSlug: string;
}

export interface ContactFormProps {
  /** Business slug for form routing */
  businessSlug: string;
  /** Business email to send submissions to */
  recipientEmail: string;
  /** Custom heading */
  heading?: string;
  /** Show phone field */
  showPhone?: boolean;
  /** Custom submit button text */
  submitText?: string;
  /** Custom success message */
  successMessage?: string;
  /** Additional CSS class */
  className?: string;
}

export interface GoogleMapsEmbedProps {
  /** Full address string */
  address: string;
  /** Business name for aria-label */
  businessName: string;
  /** Custom aspect ratio class (default: aspect-[4/3]) */
  aspectRatio?: string;
  /** Additional CSS class */
  className?: string;
}

export interface SocialLinksBarProps {
  links: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    yelp?: string;
  };
  /** Icon size in pixels */
  iconSize?: number;
  /** Additional CSS class */
  className?: string;
}

export interface ReviewsCarouselProps {
  reviews: {
    text: string;
    author: string;
    rating: number;
    source: "google" | "yelp";
    date?: string;
  }[];
  /** Auto-scroll speed in seconds per cycle */
  speed?: number;
  /** Additional CSS class */
  className?: string;
}

export interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export interface IntegrationSuggestion {
  id: string;
  name: string;
  description: string;
  priority: "essential" | "recommended" | "optional";
}
