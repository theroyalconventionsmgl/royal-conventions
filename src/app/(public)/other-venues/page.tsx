import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Users,
  Utensils,
  Hotel,
  Wind,
  Car,
  Check,
  Phone,
  MessageSquare,
  Crown,
  Building2,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "All Venues | The Royal Conventions",
  description:
    "Explore all official venues managed under The Royal Conventions in Mangalagiri: Royal Convention, Vaishnavi Vaidehi, Smt. Nannapaneni Lakshmi Function Hall, and Royal Banquets.",
};

const iconMap: Record<string, React.ReactNode> = {
  Wind: <Wind className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
  Hotel: <Hotel className="w-4 h-4" />,
  Car: <Car className="w-4 h-4" />,
  Crown: <Crown className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
};

export default function OtherVenuesPage() {
  return (
    <div className="bg-warm-cream text-forest-charcoal min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-28 bg-warm-cream text-forest-charcoal overflow-hidden border-b border-natural-sand pt-32">
        <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-sans">
            <MapPin className="w-3.5 h-3.5 text-deep-sage" />
            <span>Official Halls · Mangalagiri Campus</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-deep-sage leading-tight font-normal">
            The Venue Collection
          </h1>

          <p className="text-[15px] sm:text-base text-forest-charcoal/80 leading-relaxed max-w-2xl mx-auto mt-4 font-sans">
            All four authorized venues managed under The Royal Conventions umbrella — from the 900-guest flagship Royal Convention to the contemporary Royal Banquets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8 font-sans">
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="px-7 py-3.5 rounded-full bg-deep-sage text-pure-white font-semibold text-xs uppercase tracking-wider shadow-xs hover:bg-forest-charcoal transition-all flex items-center gap-2 min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-pure-white" />
              <span>Call Reservation Desk</span>
            </a>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full border border-natural-sand bg-pure-white text-deep-sage font-semibold text-xs uppercase tracking-wider hover:bg-warm-cream transition-colors flex items-center gap-2 min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4 text-deep-sage" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16">
          {siteConfig.venues.map((venue, idx) => (
            <div
              key={venue.id}
              className="bg-pure-white rounded-3xl border border-natural-sand shadow-xs overflow-hidden"
            >
              {/* Venue Header Banner */}
              <div className="bg-warm-cream/50 p-7 sm:p-8 text-forest-charcoal border-b border-natural-sand/70">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-deep-sage bg-soft-sage/20 border border-soft-sage/40 px-3 py-1 rounded-full mb-3 font-sans">
                      <Sparkles className="w-3 h-3 text-deep-sage" />
                      <span>Official Venue {idx + 1} — Mangalagiri</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-deep-sage leading-snug font-normal">
                      {venue.name}
                    </h2>
                    <p className="text-sm sm:text-base text-deep-sage/90 font-serif italic mt-1.5">
                      &ldquo;{venue.tagline}&rdquo;
                    </p>
                    <p className="text-sm text-forest-charcoal/80 leading-relaxed mt-3 max-w-2xl font-sans">
                      {venue.description}
                    </p>
                  </div>

                  {/* Key Capacity Badge */}
                  <div className="shrink-0 p-5 rounded-2xl bg-pure-white border border-natural-sand text-center min-w-[140px] shadow-xs">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-deep-sage mb-1 font-sans">
                      Seating
                    </div>
                    <div className="font-serif text-3xl sm:text-4xl text-deep-sage font-normal">
                      {venue.seatingCapacityLabel ?? venue.seatingCapacity}
                    </div>
                    <div className="text-[11px] text-forest-charcoal/70 mt-1 font-sans">
                      {venue.hasJumboCoolers ? "Non-AC + Jumbo Coolers" : venue.acType ?? "Air Conditioned"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="p-7 sm:p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 border-b border-natural-sand/60">
                {/* Seating */}
                <div className="p-4 rounded-2xl bg-warm-cream/40 border border-natural-sand/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-deep-sage font-sans">
                    <Users className="w-3.5 h-3.5 text-deep-sage" /> Main Hall
                  </div>
                  <div className="font-serif text-2xl text-deep-sage font-normal">
                    {venue.seatingCapacityLabel ?? venue.seatingCapacity}
                  </div>
                  <p className="text-xs text-forest-charcoal/70 font-sans">
                    {venue.hasJumboCoolers ? "With Jumbo Air Coolers" : "Seating Capacity"}
                  </p>
                </div>

                {/* Dining */}
                <div className="p-4 rounded-2xl bg-warm-cream/40 border border-natural-sand/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-deep-sage font-sans">
                    <Utensils className="w-3.5 h-3.5 text-deep-sage" /> Dining Hall
                  </div>
                  <div className="font-serif text-2xl text-deep-sage font-normal">
                    {venue.diningCapacity}
                  </div>
                  <p className="text-xs text-forest-charcoal/70 font-sans">
                    {venue.diningCapacityLabel?.match(/\(([^)]+)\)/)?.[1] ?? "Guests Simultaneous"}
                  </p>
                </div>

                {/* AC Rooms or Parking */}
                {venue.acRooms ? (
                  <div className="p-4 rounded-2xl bg-warm-cream/40 border border-natural-sand/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-deep-sage font-sans">
                      <Hotel className="w-3.5 h-3.5 text-deep-sage" /> AC Suites
                    </div>
                    <div className="font-serif text-2xl text-deep-sage font-normal">
                      {venue.acRooms}
                    </div>
                    <p className="text-xs text-forest-charcoal/70 font-sans">Attached Deluxe Rooms</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-warm-cream/40 border border-natural-sand/60 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-deep-sage font-sans">
                      <Car className="w-3.5 h-3.5 text-deep-sage" /> Parking
                    </div>
                    <div className="font-serif text-lg text-deep-sage font-normal mt-1">Dedicated</div>
                    <p className="text-xs text-forest-charcoal/70 font-sans">On-site parking bays</p>
                  </div>
                )}

                {/* Cooling */}
                <div className="p-4 rounded-2xl bg-warm-cream/40 border border-natural-sand/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-deep-sage font-sans">
                    <Wind className="w-3.5 h-3.5 text-deep-sage" /> Climate
                  </div>
                  <div className="font-serif text-sm font-normal text-deep-sage mt-2">
                    {venue.hasJumboCoolers ? "Jumbo Coolers" : venue.acType ?? "100% Central AC"}
                  </div>
                  <p className="text-xs text-forest-charcoal/70 font-sans">
                    {venue.hasJumboCoolers
                      ? "Stage & Dining Coolers"
                      : "Central climate control"}
                  </p>
                </div>
              </div>

              {/* Features & Amenities */}
              <div className="p-7 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-deep-sage mb-4 font-sans">
                    Key Highlights &amp; Features
                  </h4>
                  <div className="space-y-2.5">
                    {venue.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-warm-cream/30 border border-natural-sand/60">
                        <Check className="w-4 h-4 text-deep-sage shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-forest-charcoal/85 font-sans">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suited For + Amenities */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-deep-sage mb-3 font-sans">
                      Ideal For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {venue.suitedFor.map((event, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1 rounded-full text-xs font-semibold bg-soft-sage/20 text-deep-sage border border-soft-sage/40 font-sans"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-deep-sage mb-3 font-sans">
                      Campus Amenities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {venue.amenities.map((am, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-forest-charcoal">
                          <div className="w-8 h-8 rounded-xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center shrink-0">
                            {iconMap[am.icon] ?? <Building2 className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-medium text-deep-sage">{am.name}</div>
                            <div className="text-[11px] text-forest-charcoal/70">{am.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry CTA */}
              <div className="px-7 sm:px-8 pb-8">
                <div className="p-5 rounded-2xl bg-warm-cream/60 border border-natural-sand flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-deep-sage uppercase tracking-wider font-sans">Interested in this venue?</p>
                    <p className="text-xs text-forest-charcoal/70 mt-0.5 font-sans">
                      Contact our team for custom quotes, calendar availability, and site visits.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-sans">
                    <a
                      href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                      className="px-5 py-2.5 rounded-full bg-deep-sage text-pure-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Desk</span>
                    </a>
                    <a
                      href={siteConfig.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full border border-natural-sand bg-pure-white text-deep-sage text-xs font-semibold flex items-center gap-1.5 hover:bg-warm-cream transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-deep-sage" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison link */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <div className="p-8 rounded-3xl bg-pure-white border border-natural-sand shadow-xs">
            <h3 className="font-serif text-xl sm:text-2xl text-deep-sage font-normal">
              Compare Campus Halls Side by Side
            </h3>
            <p className="text-sm text-forest-charcoal/75 mt-2 font-sans">
              View seating capacities, dining spaces, and climate specifications in one comparative view.
            </p>
            <Link
              href="/halls"
              className="inline-flex items-center gap-2 mt-6 px-7 py-3 rounded-full bg-deep-sage hover:bg-forest-charcoal text-pure-white font-semibold text-xs uppercase tracking-wider transition-all shadow-xs"
            >
              <Building2 className="w-4 h-4" />
              <span>Compare All Venues</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
