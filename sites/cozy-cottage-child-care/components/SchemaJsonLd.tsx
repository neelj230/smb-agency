import type { BusinessData } from "./types";

interface SchemaJsonLdProps {
  business: Pick<
    BusinessData,
    | "name"
    | "address"
    | "city"
    | "state"
    | "zip"
    | "phone"
    | "email"
    | "rating"
    | "reviewCount"
    | "hours"
  >;
  url?: string;
}

/** Schema.org LocalBusiness structured data for SEO */
export function SchemaJsonLd({ business, url }: SchemaJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.zip,
    },
    telephone: business.phone,
  };

  if (business.email) schema.email = business.email;
  if (url) schema.url = url;

  if (business.rating && business.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
    };
  }

  if (business.hours) {
    // Convert hours object to schema.org format
    schema.openingHours = Object.entries(business.hours).map(
      ([day, hours]) => `${day} ${hours}`,
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
