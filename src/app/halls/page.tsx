import { Metadata } from "next";
import Link from "next/link";
import { 
  Building2, 
  Users, 
  Maximize, 
  Utensils, 
  Hotel, 
  Check, 
  Car, 
  Volume2, 
} from "lucide-react";
import { siteConfig } from "@/config/site";
import VenueCard from "@/components/ui/VenueCard";

export const metadata: Metadata = {
  title: "All Venues — Primary & Regional Halls | The Royal Conventions",
  description:
    "Explore and compare all venues at The Royal Conventions campus in Mangalagiri: Royal Convention (900 seats), Vaishnavi Vaidehi (650 AC), Royal Banquets (200/600, soundproof) and Smt. Nannapaneni Lakshmi Function Hall (150 Non-AC).",
};

export default function HallsPage() {
  return (
    <div className="py-16 md:py-24 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-3 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>All Venues Overview</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-100">
            Our Venues in Mangalagiri
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed font-light">
            Four official halls — purpose-built for every scale of celebration, from the 900-guest flagship Royal Convention to the intimate newest Royal Banquets.
          </p>
        </div>

        {/* ── PRIMARY CAMPUS VENUES ── */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-6 font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>Primary Campus Halls</span>
          </div>
        </div>

        {/* Venue Cards: Mobile snap carousel / Desktop 2x2 symmetric grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 no-scrollbar lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible lg:pb-0 mb-20">
          {siteConfig.venues.map((venue, idx) => (
            <div key={venue.id} className="min-w-[85vw] sm:min-w-[420px] lg:min-w-0 snap-center shrink-0 lg:shrink h-full">
              <VenueCard venue={venue} featured={idx === 0} />
            </div>
          ))}
        </div>

        {/* Side-by-Side Unified Specification Comparison Matrix — Primary Venues */}
        <div className="bg-zinc-900 rounded-3xl border border-amber-500/20 shadow-sm overflow-hidden mb-24">
          <div className="bg-zinc-950 p-6 text-zinc-100 border-b border-amber-500/20">
            <h2 className="font-serif text-2xl font-bold text-zinc-100">
              Primary Campus — Side-by-Side Comparison
            </h2>
            <p className="text-xs text-zinc-400 mt-1 font-light">
              Verified specifications for each of the primary campus halls.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 font-mono">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider w-1/4">
                    Specification
                  </th>
                  <th className="p-4 text-sm font-serif font-bold text-zinc-100 w-1/4">
                    Royal Convention
                  </th>
                  <th className="p-4 text-sm font-serif font-bold text-zinc-100 w-1/4">
                    Royal Banquets
                  </th>
                  <th className="p-4 text-sm font-serif font-bold text-zinc-100 w-1/4">
                    Vaishnavi Vaidehi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">Primary Category</td>
                  <td className="p-4 font-medium text-amber-300">Flagship Mega Convention</td>
                  <td className="p-4 font-medium text-amber-300">Soundproof Banquet &amp; Lodging</td>
                  <td className="p-4 font-medium text-amber-300">Grand Celebrations</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">Seating Capacity</td>
                  <td className="p-4 font-bold text-base text-zinc-100">800 – 900 Guests</td>
                  <td className="p-4">
                    <div className="font-bold text-base text-zinc-100">200 Seated</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">600 Floating (Weddings)</div>
                  </td>
                  <td className="p-4 font-bold text-base text-zinc-100">650 Guests</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">Floating Capacity</td>
                  <td className="p-4 text-zinc-400 italic text-[11px]">Hall seating focus</td>
                  <td className="p-4 font-bold text-base text-zinc-100">600 Guests</td>
                  <td className="p-4 font-bold text-base text-zinc-100">1,000+ Guests</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">Air Conditioning</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
                      <Check className="w-3.5 h-3.5" /> AC Main Hall
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
                      <Volume2 className="w-3 h-3" /> Soundproof + AC
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px]">
                      <Check className="w-3.5 h-3.5" /> AC
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">Dining Capacity</td>
                  <td className="p-4">
                    <div className="font-medium text-zinc-200">350 Sit-down Dining</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">+ Outdoor Buffet Zone</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-zinc-200">180 AC Sit-down</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">+ 100 Ground Floor Buffet</div>
                  </td>
                  <td className="p-4 font-medium text-zinc-200">300 Seats Simultaneous</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">Kitchen Facility</td>
                  <td className="p-4">
                    <div className="font-bold text-zinc-100">150ft × 18ft</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Heavy-duty professional kitchen</div>
                  </td>
                  <td className="p-4 font-medium text-zinc-200">Modern prep kitchen</td>
                  <td className="p-4 font-medium text-zinc-200">Hygienic on-site kitchen</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">Parking</td>
                  <td className="p-4">
                    <div className="font-bold text-zinc-100">250 Cars + 350 Motorcycles</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Largest lot in Mangalagiri</div>
                  </td>
                  <td className="p-4 font-medium text-zinc-200">On-site campus parking</td>
                  <td className="p-4 font-medium text-zinc-200">Direct hall-adjacent parking</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">Attached Deluxe Lodging</td>
                  <td className="p-4">
                    <span className="text-zinc-500 text-[11px]">Accessible across campus</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-mono">
                      <Check className="w-3.5 h-3.5" /> 8 Deluxe AC Rooms
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-zinc-500 text-[11px]">Available on booking</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-zinc-200 bg-zinc-950/50">100% DG Power Backup</td>
                  <td className="p-4 text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Included</span>
                  </td>
                  <td className="p-4 text-emerald-400 font-bold">
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Included</span>
                    </div>
                  </td>
                  <td className="p-4 text-emerald-400 font-bold">
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Included</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.05)] text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100 mb-3">
            Not Sure Which Venue Fits Your Gathering?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-8 font-light">
            Contact our management team for a private consultation and walk-through of all venues to match your guest count and auspicious dates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-zinc-950 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors font-mono"
            >
              Contact Campus Office
            </Link>
            <Link
              href="/check-availability"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all font-mono"
            >
              Check Availability Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
