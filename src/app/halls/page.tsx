import { Metadata } from "next";
import Link from "next/link";
import { 
  Building2, 
  Users, 
  Maximize, 
  Utensils, 
  Hotel, 
  Check,
  Wind,
  Car,
  Volume2,
  MapPin
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
    <div className="py-16 md:py-24 bg-white text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D31] mb-3 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>All Venues Overview</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
            Our Venues in Mangalagiri
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-4 leading-relaxed font-light">
            Four official halls — purpose-built for every scale of celebration, from the 900-guest flagship Royal Convention to the intimate newest Royal Banquets.
          </p>
        </div>

        {/* ── PRIMARY CAMPUS VENUES ── */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C6D31] mb-6">
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
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden mb-24">
          <div className="bg-[#1A1A1A] p-6 text-white border-b border-zinc-800">
            <h2 className="font-serif text-2xl font-bold text-white">
              Primary Campus — Side-by-Side Comparison
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Verified specifications for each of the 3 primary campus halls.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-zinc-200 text-zinc-600">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider w-1/4">
                    Specification
                  </th>
                  <th className="p-4 text-sm font-serif font-bold text-[#1A1A1A] w-1/4">
                    Royal Convention
                  </th>
                  <th className="p-4 text-sm font-serif font-bold text-[#1A1A1A] w-1/4">
                    Royal Banquets
                  </th>
                  <th className="p-4 text-sm font-serif font-bold text-[#1A1A1A] w-1/4">
                    Vaishnavi Vaidehi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Primary Category</td>
                  <td className="p-4 font-medium text-[#8C6D31]">Flagship Mega Convention</td>
                  <td className="p-4 font-medium text-[#8C6D31]">Soundproof Banquet & Lodging</td>
                  <td className="p-4 font-medium text-[#8C6D31]">Intimate Celebrations</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Seating Capacity</td>
                  <td className="p-4 font-bold text-base text-[#1A1A1A]">800 – 900 Guests</td>
                  <td className="p-4">
                    <div className="font-bold text-base text-[#1A1A1A]">200 Seated</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">600 Floating (Weddings)</div>
                  </td>
                  <td className="p-4 font-bold text-base text-[#1A1A1A]">250 Guests</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Floating Capacity</td>
                  <td className="p-4 text-zinc-500 italic text-[11px]">Hall seating focus</td>
                  <td className="p-4 font-bold text-base text-[#1A1A1A]">600 Guests</td>
                  <td className="p-4 font-bold text-base text-[#1A1A1A]">500 Guests</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Air Conditioning</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px]">
                      <Check className="w-3.5 h-3.5" /> AC Main Hall
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px]">
                      <Volume2 className="w-3 h-3" /> Soundproof + AC
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px]">
                      <Check className="w-3.5 h-3.5" /> AC
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Dining Capacity</td>
                  <td className="p-4">
                    <div className="font-medium">350 Sit-down Dining</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">+ Outdoor Buffet Zone</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">180 AC Sit-down</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">+ 100 Ground Floor Buffet</div>
                  </td>
                  <td className="p-4 font-medium">200 Seats Simultaneous</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Kitchen Facility</td>
                  <td className="p-4">
                    <div className="font-bold text-[#1A1A1A]">150ft × 18ft</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Heavy-duty professional kitchen</div>
                  </td>
                  <td className="p-4 font-medium">Modern prep kitchen</td>
                  <td className="p-4 font-medium">Hygienic on-site kitchen</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Parking</td>
                  <td className="p-4">
                    <div className="font-bold text-[#1A1A1A]">250 Cars + 350 Motorcycles</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">Largest lot in Mangalagiri</div>
                  </td>
                  <td className="p-4 font-medium">On-site campus parking</td>
                  <td className="p-4 font-medium">Direct hall-adjacent parking</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Attached Deluxe Lodging</td>
                  <td className="p-4">
                    <span className="text-zinc-400 text-[11px]">Accessible across campus</span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-bold text-[#8C6D31] bg-[#C5A059]/10 border border-[#C5A059]/30 px-2.5 py-0.5 rounded-full text-[11px]">
                      <Check className="w-3.5 h-3.5" /> 8 Deluxe AC Rooms
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-zinc-400 text-[11px]">Available on booking</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Complimentary Inclusions</td>
                  <td className="p-4 text-zinc-400 text-[11px] italic">—</td>
                  <td className="p-4">
                    <div className="font-medium text-emerald-700">Event Chairs</div>
                    <div className="font-medium text-emerald-700">Dining Tables & Chairs</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">*Electricity, decor & labour billed separately</div>
                  </td>
                  <td className="p-4 text-zinc-400 text-[11px] italic">—</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">100% DG Power Backup</td>
                  <td className="p-4 text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Included</span>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold">
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Included</span>
                    </div>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold">
                    <div className="flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Included</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A1A1A] bg-zinc-50/60">Actions</td>
                  <td className="p-4">
                    <Link
                      href="/royal-convention"
                      className="block text-center py-2 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#8C6D31] text-[#DFCA95] font-bold text-[11px] transition-all"
                    >
                      View Royal Convention →
                    </Link>
                  </td>
                  <td className="p-4">
                    <Link
                      href="/royal-banquets"
                      className="block text-center py-2 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#8C6D31] text-[#DFCA95] font-bold text-[11px] transition-all"
                    >
                      View Royal Banquet →
                    </Link>
                  </td>
                  <td className="p-4">
                    <Link
                      href="/vaishnavi-vaidehi"
                      className="block text-center py-2 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#8C6D31] text-[#DFCA95] font-bold text-[11px] transition-all"
                    >
                      View Convention Hall →
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {siteConfig.affiliateVenues.length > 0 && (
        <>
        {/* ── REGIONAL AFFILIATE VENUES ── */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C6D31] mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Regional Affiliate Venues — Mangalagiri</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Sister Venues & Affiliated Halls
          </h2>
          <p className="text-xs text-zinc-500 mt-2 max-w-2xl">
            Our regional affiliate kalyanamandapams offer traditional Telugu event settings at a range of scales and budgets — all under trusted management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {siteConfig.affiliateVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-3xl border border-[#C5A059]/20 shadow-sm overflow-hidden hover:shadow-md hover:border-[#C5A059]/40 transition-all"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-100">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#8C6D31] bg-[#C5A059]/10 border border-[#C5A059]/20 px-2.5 py-0.5 rounded-full mb-3">
                  <MapPin className="w-3 h-3" />
                  Regional Affiliate
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A] leading-snug">
                  {venue.name}
                </h3>
                <p className="text-xs text-[#8C6D31] font-semibold mt-1 italic">
                  &ldquo;{venue.tagline}&rdquo;
                </p>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                  {venue.shortDescription}
                </p>
              </div>

              {/* Spec Grid */}
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/15">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31] mb-1">
                    <Users className="w-3.5 h-3.5" /> Seating
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
                    {venue.seatingCapacityLabel ?? venue.seatingCapacity}
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {venue.hasJumboCoolers ? "Non-AC with Jumbo Coolers" : "Non-AC"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/15">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31] mb-1">
                    <Utensils className="w-3.5 h-3.5" /> Dining
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
                    {venue.diningCapacity}
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {venue.diningCapacityLabel?.split("(")[1]?.replace(")", "") ?? "Guests"}
                  </p>
                </div>

                {venue.acRooms ? (
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/15">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31] mb-1">
                      <Hotel className="w-3.5 h-3.5" /> AC Rooms
                    </div>
                    <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
                      {venue.acRooms}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Deluxe + 1 Dormitory Suite</p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/15">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31] mb-1">
                      <Car className="w-3.5 h-3.5" /> Parking
                    </div>
                    <div className="font-serif text-lg font-bold text-[#1A1A1A]">
                      Dedicated
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5">On-site guest parking</p>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/15">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6D31] mb-1">
                    <Wind className="w-3.5 h-3.5" /> Cooling
                  </div>
                  <div className="font-serif text-sm font-bold text-[#1A1A1A]">
                    {venue.hasJumboCoolers ? "Jumbo Air Coolers" : "Standard"}
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {venue.hasJumboCoolers ? "AC Stage, Dining & Rooms" : "Natural ventilation"}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="px-6 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Key Highlights</p>
                <div className="space-y-1.5">
                  {venue.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                      <Check className="w-3.5 h-3.5 text-[#8C6D31] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 pt-3 border-t border-zinc-100">
                <Link
                  href="/other-venues"
                  className="block text-center py-2.5 px-4 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 hover:bg-[#C5A059]/10 text-[#8C6D31] font-bold text-xs transition-all"
                >
                  View Full Details & Inquire →
                </Link>
              </div>
            </div>
          ))}
        </div>

        </>
        )}

        {/* Floating Check Dates Banner */}
        <div className="text-center bg-[#1A1A1A] border border-[#C5A059]/30 p-8 rounded-3xl max-w-3xl mx-auto shadow-xl">
          <h3 className="font-serif text-2xl font-bold text-white">
            Need Guidance Choosing the Right Hall?
          </h3>
          <p className="text-xs text-zinc-400 mt-2 max-w-lg mx-auto font-light">
            Our General Managers, Sri Bhaskar Rao and Sri Srikanth, will evaluate your expected guest attendance and arrange a personal campus walkthrough.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/check-availability"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              Check Date Availability
            </Link>
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="px-6 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 font-semibold text-xs uppercase tracking-wider hover:bg-zinc-700 hover:text-white"
            >
              Call: {siteConfig.contact.primaryPhone}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
