"use client";

import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import type { BusinessData, NavLink, SocialLinks } from "./types";

interface FooterProps {
  business: Pick<
    BusinessData,
    "name" | "address" | "city" | "state" | "zip" | "phone" | "email"
  >;
  links?: NavLink[];
  socialLinks?: SocialLinks;
}

const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function Footer({ business, links, socialLinks }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-text)] text-white py-20 lg:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16">
          {/* Business Info */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-6">
              {business.name}
            </h3>
            <div className="space-y-2.5 text-white/50 text-sm">
              <p>{business.address}</p>
              <p>
                {business.city}, {business.state} {business.zip}
              </p>
              <a
                href={`tel:${business.phone}`}
                className="block hover:text-white transition-colors duration-200"
              >
                {business.phone}
              </a>
              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="block hover:text-white transition-colors duration-200"
                >
                  {business.email}
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          {links && links.length > 0 && (
            <div>
              <h3 className="font-display text-lg font-semibold mb-6">
                Quick Links
              </h3>
              <div className="space-y-3">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-white/50 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <div>
              <h3 className="font-display text-lg font-semibold mb-6">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {Object.entries(socialLinks).map(([platform, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--brand-primary)] hover:scale-110 transition-all duration-200"
                      aria-label={platform}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
          <p>
            &copy; {year} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
