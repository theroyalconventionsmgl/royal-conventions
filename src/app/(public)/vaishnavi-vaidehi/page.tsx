import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, Calendar, Phone, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import InteractiveAvailabilityChecker from "@/components/ui/InteractiveAvailabilityChecker";
import LuxuryImage from "@/components/ui/LuxuryImage";
import VenueGallery from "@/components/ui/VenueGallery";

const venue = siteConfig.venues.find((v) => v.id === "vaishnavi-vaidehi")!;

export const metadata: Metadata = {
  title: `Vaishnavi Vaidehi | Mangalagiri`,
  description:
    `Explore Vaishnavi Vaidehi at The Royal Conventions Mangalagiri: the grand AC hall for family weddings, receptions, and summits.`,
};

export default function VaishnaviVaidehiHallPage() {
  return (
    <div className="bg-warm-cream text-forest-charcoal min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden border-b border-natural-sand">
        <div className="absolute inset-0">
          <LuxuryImage
            src={venue.heroImage}
            alt={venue.name}
            aspectRatio="absolute inset-0"
            category={venue.category}
          />
          <div className="absolute inset-0 bg-warm-cream/90 backdrop-blur-xs" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-deep-sage" />
            <span>{venue.category}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-deep-sage leading-tight max-w-3xl font-normal">
            {venue.name}
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-deep-sage/90 mt-2">
            &ldquo;{venue.tagline}&rdquo;
          </p>
          <p className="text-[15px] sm:text-base text-forest-charcoal/85 leading-relaxed max-w-2xl mt-4 font-sans">
            {venue.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 mt-8 max-w-xl">
            <a
              href="#check-dates"
              className="inline-flex items-center justify-center gap-2 bg-deep-sage text-pure-white font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-forest-charcoal transition-all shadow-xs min-h-[50px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Availability</span>
            </a>
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 border border-natural-sand bg-pure-white text-deep-sage font-semibold text-[15px] px-7 py-3.5 rounded-full hover:bg-warm-cream transition-all min-h-[50px]"
            >
              <Phone className="w-4 h-4 text-deep-sage" />
              <span>Call Venue Manager</span>
            </a>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 sm:py-24 bg-pure-white border-b border-natural-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-2">
              <span>Venue Highlights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-deep-sage mt-2 font-normal">
              Large family weddings and receptions
            </h2>
            <p className="text-[15px] text-forest-charcoal/80 leading-relaxed mt-3.5 font-sans">
              A grand hall for traditional weddings, sangeets, and corporate summits — with attached rooms for host family convenience.
            </p>
            <ul className="space-y-3 mt-7">
              {venue.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-warm-cream/50 rounded-2xl border border-natural-sand/70 px-4 py-3 text-sm font-sans">
                  <CheckCircle2 className="w-5 h-5 text-deep-sage shrink-0 mt-0.5" strokeWidth={1.75} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-7">
              {venue.suitedFor.map((s) => (
                <span key={s} className="text-xs bg-soft-sage/20 text-deep-sage font-semibold px-3.5 py-1.5 rounded-full border border-soft-sage/40">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-xs sm:text-sm text-forest-charcoal/70 font-sans border-t border-natural-sand/60 pt-4">
              <span>Seating · 650 Guests</span>
              <span>Dining · 180, AC dining hall</span>
              <span>Climate · Central Air Conditioned</span>
            </div>
          </div>
          <VenueGallery images={venue.galleryImages} venueName={venue.name} />
        </div>
      </section>

      {/* Availability */}
      <section id="check-dates" className="py-16 sm:py-24 scroll-mt-20 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl text-deep-sage font-normal">Check dates for this hall</h2>
            <p className="text-sm text-forest-charcoal/75 mt-2 font-sans">Morning, evening, and full-day options.</p>
          </div>
          <div>
            <Suspense fallback={<p className="text-center py-12 text-sm text-forest-charcoal/60">Loading availability…</p>}>
              <InteractiveAvailabilityChecker initialVenueId="vaishnavi-vaidehi" />
            </Suspense>
          </div>
          {venue.mapUrl && (
            <div className="text-center mt-8">
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-deep-sage hover:text-forest-charcoal transition-colors min-h-[48px] px-4"
              >
                <MapPin className="w-4 h-4" />
                <span>Open this hall in Google Maps</span>
              </a>
            </div>
          )}
          <div className="text-center mt-2">
            <Link
              href="/halls"
              className="inline-flex items-center gap-2 text-sm font-semibold text-deep-sage hover:text-forest-charcoal transition-colors min-h-[48px] px-4"
            >
              <span>Compare with other halls</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
