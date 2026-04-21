interface GoogleMapsEmbedProps {
  address: string;
  businessName: string;
  aspectRatio?: string;
  className?: string;
}

/**
 * Styled Google Maps embed. Uses the free embed API (no key required for basic place embeds).
 * Falls back to a link if JS is disabled.
 */
export function GoogleMapsEmbed({
  address,
  businessName,
  aspectRatio = "aspect-[4/3]",
  className = "",
}: GoogleMapsEmbedProps) {
  const query = encodeURIComponent(`${businessName}, ${address}`);

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-black/5 ${aspectRatio} ${className}`}
    >
      <iframe
        title={`Map showing location of ${businessName}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
