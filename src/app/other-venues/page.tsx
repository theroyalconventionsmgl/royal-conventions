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
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero */}
      <section className="relative py-20 lg:py-24 bg-[#121212] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#1A1A1A]/70 to-[#121212] z-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-[#C5A059]/40 text-[#DFCA95] text-xs font-semibold uppercase tracking-wider mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Official Halls • Mangalagiri</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
            Sister Venues &amp;
            <br />
            <span className="text-[#DFCA95]">Affiliated Halls</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl mx-auto mt-6">
            All four official halls managed under The Royal Conventions umbrella — from the 900-guest flagship Royal Convention to the newest intimate Royal Banquets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call for Inquiries</span>
            </a>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-[#C5A059]/40 text-[#DFCA95] font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A059]/10 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
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
              className="bg-white rounded-3xl border border-[#C5A059]/20 shadow-sm overflow-hidden"
            >
              {/* Venue Header Banner */}
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#DFCA95] bg-[#C5A059]/20 border border-[#C5A059]/30 px-2.5 py-0.5 rounded-full mb-3">
                      <MapPin className="w-3 h-3" />
                      Official Venue {idx + 1} — Mangalagiri
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                      {venue.name}
                    </h2>
                    <p className="text-sm text-[#DFCA95] font-serif italic mt-1.5">
                      &ldquo;{venue.tagline}&rdquo;
                    </p>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-3 max-w-2xl">
                      {venue.description}
                    </p>
                  </div>

                  {/* Key Capacity Badge */}
                  <div className="shrink-0 p-5 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/30 text-center min-w-[140px]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#DFCA95] mb-1">
                      Seating
                    </div>
                    <div className="font-serif text-4xl font-bold text-white">
                      {venue.seatingCapacityLabel ?? venue.seatingCapacity}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1">
                      {venue.hasJumboCoolers ? "Non-AC + Jumbo Coolers" : "Non-AC Hall"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 border-b border-zinc-100">
                {/* Seating */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/15 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                    <Users className="w-3.5 h-3.5" /> Main Hall
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
                    {venue.seatingCapacityLabel ?? venue.seatingCapacity}
                  </div>
                  <p className="text-[10px] text-zinc-500">
                    {venue.hasJumboCoolers ? "With Jumbo Air Coolers" : "Non-AC Seating"}
                  </p>
                </div>

                {/* Dining */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/15 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                    <Utensils className="w-3.5 h-3.5" /> Dining Hall
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
                    {venue.diningCapacity}
                  </div>
                  <p className="text-[10px] text-zinc-500">
                    {venue.diningCapacityLabel?.match(/\(([^)]+)\)/)?.[1] ?? "Guests"}
                  </p>
                </div>

                {/* AC Rooms or Parking */}
                {venue.acRooms ? (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/15 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                      <Hotel className="w-3.5 h-3.5" /> AC Rooms
                    </div>
                    <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
                      {venue.acRooms}
                    </div>
                    <p className="text-[10px] text-zinc-500">Deluxe + 1 AC Dormitory</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/15 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                      <Car className="w-3.5 h-3.5" /> Parking
                    </div>
                    <div className="font-serif text-lg font-bold text-[#1A1A1A]">Dedicated</div>
                    <p className="text-[10px] text-zinc-500">On-site parking space</p>
                  </div>
                )}

                {/* Cooling */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C5A059]/15 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                    <Wind className="w-3.5 h-3.5" /> Cooling
                  </div>
                  <div className="font-serif text-sm font-bold text-[#1A1A1A] mt-2">
                    {venue.hasJumboCoolers ? "Jumbo Coolers" : "Standard"}
                  </div>
                  <p className="text-[10px] text-zinc-500">
                    {venue.hasJumboCoolers
                      ? "AC Stage, AC Dining & AC Rooms"
                      : "Natural ventilation"}
                  </p>
                </div>
              </div>

              {/* Features & Amenities */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6D31] mb-4">
                    Key Highlights & Features
                  </h4>
                  <div className="space-y-3">
                    {venue.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/15">
                        <Check className="w-4 h-4 text-[#8C6D31] shrink-0 mt-0.5" />
                        <span className="text-xs text-zinc-700 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suited For + Amenities */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6D31] mb-4">
                      Ideal For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {venue.suitedFor.map((event, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#C5A059]/10 text-[#8C6D31] border border-[#C5A059]/20"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C6D31] mb-4">
                      Key Amenities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {venue.amenities.map((am, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-700">
                          <div className="w-7 h-7 rounded-lg bg-[#C5A059]/10 text-[#8C6D31] flex items-center justify-center shrink-0">
                            {iconMap[am.icon] ?? <Building2 className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="font-bold text-[#1A1A1A]">{am.name}</div>
                            <div className="text-[10px] text-zinc-500">{am.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry CTA */}
              <div className="px-8 pb-8">
                <div className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#C5A059]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#DFCA95]">Interested in this venue?</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Contact our team for custom tariff quotes, availability & site visit.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                      className="px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#A58039] text-[#1A1A1A] text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={siteConfig.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl border border-[#C5A059]/40 text-[#DFCA95] text-xs font-bold flex items-center gap-1.5 hover:bg-[#C5A059]/10 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
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
          <div className="p-8 rounded-3xl bg-white border border-[#C5A059]/20 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Also Explore Our Main Campus Halls
            </h3>
            <p className="text-xs text-zinc-500 mt-2">
              The Royal Conventions campus features three premium primary halls for larger-scale events.
            </p>
            <Link
              href="/halls"
              className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-xl bg-[#1A1A1A] hover:bg-black text-[#DFCA95] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <Building2 className="w-4 h-4 text-[#C5A059]" />
              <span>View All 5 Venues & Compare</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
