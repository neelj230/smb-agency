import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import type { SocialLinksBarProps } from "./types";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
};

/**
 * Row of social media icon links. Auto-hides platforms with no URL.
 * Yelp and TikTok use inline SVGs since lucide-react doesn't include them.
 */
export function SocialLinksBar({
  links,
  iconSize = 20,
  className = "",
}: SocialLinksBarProps) {
  const entries = Object.entries(links).filter(([, url]) => url);

  if (entries.length === 0) return null;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {entries.map(([platform, url]) => {
        const Icon = ICONS[platform];

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit us on ${platform}`}
            className="text-[var(--brand-muted)] hover:text-[var(--brand-primary)] transition-colors"
          >
            {Icon ? (
              <Icon className={`w-[${iconSize}px] h-[${iconSize}px]`} />
            ) : platform === "yelp" ? (
              <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.1 2C6.6 2 2.2 6.4 2.2 11.9c0 2.7 1.1 5.2 2.9 7l1.4-1.4C5 15.9 4.2 14 4.2 11.9 4.2 7.5 7.7 4 12.1 4s7.9 3.5 7.9 7.9c0 2.1-.8 4-2.3 5.6l1.4 1.4c1.8-1.8 2.9-4.3 2.9-7C22 6.4 17.6 2 12.1 2z" />
              </svg>
            ) : platform === "tiktok" ? (
              <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.93 2.93 0 0 1 .88.13V9.03a6.19 6.19 0 0 0-.88-.07 6.28 6.28 0 0 0 0 12.56 6.29 6.29 0 0 0 6.28-6.28V8.69a8.18 8.18 0 0 0 3.82.96V6.69z" />
              </svg>
            ) : null}
          </a>
        );
      })}
    </div>
  );
}
