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
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 bg-zinc-950 text-white overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950 z-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 font-mono">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Halls • Mangalagiri</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-zinc-100 leading-tight">
            Sister Venues &amp;
            <br />
            <span className="text-amber-300">Affiliated Halls</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto mt-6 font-light">
            All four official halls managed under The Royal Conventions umbrella — from the 900-guest flagship Royal Convention to the newest intimate Royal Banquets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 font-mono">
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-zinc-950" />
              <span>Call for Inquiries</span>
            </a>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-amber-500/30 text-green-400 font-semibold text-xs uppercase tracking-wider hover:bg-zinc-900 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-green-400" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {siteConfig.venues.map((venue, idx) => (
            <div
              key={venue.id}
              className="bg-zinc-900 rounded-3xl border border-amber-500/20 shadow-sm overflow-hidden"
            >
              {/* Venue Header Banner */}
              <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 p-8 text-white border-b border-amber-500/20">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full mb-3 font-mono">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      Official Venue {idx + 1} — Mangalagiri
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100 leading-snug">
                      {venue.name}
                    </h2>
                    <p className="text-sm text-amber-300 font-serif italic mt-1.5">
                      &ldquo;{venue.tagline}&rdquo;
                    </p>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-3 max-w-2xl font-light">
                      {venue.description}
                    </p>
                  </div>

                  {/* Key Capacity Badge */}
                  <div className="shrink-0 p-5 rounded-2xl bg-zinc-950 border border-amber-500/30 text-center min-w-[140px]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1 font-mono">
                      Seating
                    </div>
                    <div className="font-serif text-4xl font-bold text-zinc-100">
                      {venue.seatingCapacityLabel ?? venue.seatingCapacity}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                      {venue.hasJumboCoolers ? "Non-AC + Jumbo Coolers" : venue.acType ?? "Air Conditioned"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 border-b border-zinc-800">
                {/* Seating */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                    <Users className="w-3.5 h-3.5" /> Main Hall
                  </div>
                  <div className="font-serif text-2xl font-bold text-zinc-100">
                    {venue.seatingCapacityLabel ?? venue.seatingCapacity}
                  </div>
                  <p className="text-[10px] text-zinc-400 font-light">
                    {venue.hasJumboCoolers ? "With Jumbo Air Coolers" : "Seating Capacity"}
                  </p>
                </div>

                {/* Dining */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                    <Utensils className="w-3.5 h-3.5" /> Dining Hall
                  </div>
                  <div className="font-serif text-2xl font-bold text-zinc-100">
                    {venue.diningCapacity}
                  </div>
                  <p className="text-[10px] text-zinc-400 font-light">
                    {venue.diningCapacityLabel?.match(/\(([^)]+)\)/)?.[1] ?? "Guests Simultaneous"}
                  </p>
                </div>

                {/* AC Rooms or Parking */}
                {venue.acRooms ? (
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                      <Hotel className="w-3.5 h-3.5" /> AC Rooms
                    </div>
                    <div className="font-serif text-2xl font-bold text-zinc-100">
                      {venue.acRooms}
                    </div>
                    <p className="text-[10px] text-zinc-400 font-light">Deluxe + 1 AC Dormitory</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                      <Car className="w-3.5 h-3.5" /> Parking
                    </div>
                    <div className="font-serif text-lg font-bold text-zinc-100">Dedicated</div>
                    <p className="text-[10px] text-zinc-400 font-light">On-site parking space</p>
                  </div>
                )}

                {/* Cooling */}
                <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                    <Wind className="w-3.5 h-3.5" /> Cooling
                  </div>
                  <div className="font-serif text-sm font-bold text-zinc-100 mt-2">
                    {venue.hasJumboCoolers ? "Jumbo Coolers" : venue.acType ?? "100% Central AC"}
                  </div>
                  <p className="text-[10px] text-zinc-400 font-light">
                    {venue.hasJumboCoolers
                      ? "AC Stage, AC Dining & AC Rooms"
                      : "Engineered climate flow"}
                  </p>
                </div>
              </div>

              {/* Features & Amenities */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-mono">
                    Key Highlights &amp; Features
                  </h4>
                  <div className="space-y-3">
                    {venue.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950 border border-amber-500/20">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-zinc-300 font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suited For + Amenities */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-mono">
                      Ideal For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {venue.suitedFor.map((event, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-mono">
                      Key Amenities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {venue.amenities.map((am, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                            {iconMap[am.icon] ?? <Building2 className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-bold text-zinc-100">{am.name}</div>
                            <div className="text-[10px] text-zinc-400 font-light">{am.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry CTA */}
              <div className="px-8 pb-8">
                <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-amber-300 font-mono">Interested in this venue?</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5 font-light">
                      Contact our team for custom tariff quotes, availability &amp; site visit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 font-mono">
                    <a
                      href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-zinc-950" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={siteConfig.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl border border-amber-500/30 text-green-400 text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-900 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Link back to all venues */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-zinc-100">
              Also Explore Our Main Campus Halls
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-light">
              The Royal Conventions campus features premium primary halls for larger-scale events.
            </p>
            <Link
              href="/halls"
              className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-xl bg-zinc-950 border border-amber-500/30 hover:bg-zinc-800 text-amber-300 font-bold text-xs uppercase tracking-wider transition-colors font-mono"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>View All Venues &amp; Compare</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
