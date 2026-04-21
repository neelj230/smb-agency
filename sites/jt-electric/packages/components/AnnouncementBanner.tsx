"use client";

interface AnnouncementBannerProps {
  messages: string[];
  /** Speed in seconds for one full cycle */
  speed?: number;
}

export function AnnouncementBanner({
  messages,
  speed = 30,
}: AnnouncementBannerProps) {
  const repeated = [...messages, ...messages];

  return (
    <div className="bg-[var(--brand-text)] text-white text-sm py-2 overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex gap-12"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {repeated.map((msg, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
