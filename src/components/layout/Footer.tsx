import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight, ChevronRight, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-sage text-warm-cream/85 border-t border-soft-sage/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-1 ring-soft-sage/50">
                <Image
                  src={siteConfig.logo}
                  alt="The Royal Conventions emblem"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="font-serif text-lg font-bold text-pure-white tracking-wide block leading-none">
                  THE ROYAL CONVENTIONS
                </span>
                <span className="text-[10px] tracking-[0.2em] text-soft-sage uppercase font-medium mt-1 block">
                  Mangalagiri · Andhra Pradesh
                </span>
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-warm-cream/75 font-sans">
              A premier botanical multi-venue convention campus in Mangalagiri for weddings, receptions, and special gatherings — with 8 guest suites and on-site hospitality.
            </p>
            <div className="text-[13px] pt-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-soft-sage font-medium">Founder</p>
              <p className="font-serif text-base text-pure-white mt-0.5">{siteConfig.proprietor.name}</p>
              <p className="text-xs text-warm-cream/60">{siteConfig.proprietor.title}</p>
            </div>
          </div>

          {/* Venues */}
          <nav aria-label="Venues">
            <h3 className="font-serif text-base font-semibold text-pure-white mb-4">Our Venues</h3>
            <ul className="space-y-1 text-[13px]">
              {siteConfig.venues.map((venue) => (
                <li key={venue.id}>
                  <Link href={`/${venue.slug}`} className="group flex items-center justify-between py-2 text-warm-cream/80 hover:text-pure-white transition-colors">
                    <span>{venue.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-soft-sage" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/accommodation" className="group flex items-center justify-between py-2 text-warm-cream/80 hover:text-pure-white transition-colors">
                  <span>Guest Suites · 8 Rooms</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-soft-sage" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore">
            <h3 className="font-serif text-base font-semibold text-pure-white mb-4">Explore</h3>
            <ul className="space-y-1 text-[13px]">
              {[
                { href: "/check-availability", label: "Check availability" },
                { href: "/halls", label: "Compare venues" },
                { href: "/gallery", label: "Photo gallery" },
                { href: "/facilities", label: "Facilities" },
                { href: "/about-us", label: "About us" },
                { href: "/contact", label: "Location & directions" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-warm-cream/80 hover:text-pure-white transition-colors flex items-center gap-1.5 py-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-soft-sage" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-base font-semibold text-pure-white mb-4">Visit Us</h3>
            <address className="space-y-3 text-[13px] not-italic text-warm-cream/75 font-sans">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-soft-sage shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.locality},{" "}
                  {siteConfig.contact.address.state} {siteConfig.contact.address.postalCode}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-soft-sage shrink-0" />
                <a href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`} className="hover:text-pure-white text-pure-white font-medium">
                  {siteConfig.contact.primaryPhone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-soft-sage shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-pure-white">
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
            <div className="flex flex-wrap gap-2 pt-4">
              <a
                href={siteConfig.contact.googleMapsDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-warm-cream/15 text-pure-white text-[13px] font-medium hover:bg-warm-cream/25 transition-colors min-h-[44px]"
              >
                <MapPin className="w-3.5 h-3.5 text-soft-sage" />
                <span>Directions</span>
              </a>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-warm-cream/15 text-pure-white text-[13px] font-medium hover:bg-warm-cream/25 transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-soft-sage" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-soft-sage/20 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-cream/60">
          <p>© {currentYear} The Royal Conventions. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/about-us" className="hover:text-pure-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-pure-white transition-colors">Contact</Link>
            <Link href="/check-availability" className="hover:text-pure-white transition-colors">Availability</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
