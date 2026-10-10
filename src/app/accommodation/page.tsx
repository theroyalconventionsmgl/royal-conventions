import { Metadata } from "next";
import Link from "next/link";
import { 
  Hotel, 
  Wifi, 
  Wind, 
  Tv, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  Clock, 
  Coffee,
  Check,
  Building2,
  ArrowRight
} from "lucide-react";
import { siteConfig } from "@/config/site";
import LuxuryImage from "@/components/ui/LuxuryImage";

export const metadata: Metadata = {
  title: "Deluxe Guest Lodging Rooms | Royal Banquet Mangalagiri",
  description:
    "Explore the 8 luxury air-conditioned deluxe guest lodging rooms attached directly to Royal Banquet at The Royal Conventions campus in Mangalagiri.",
};

export default function AccommodationPage() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-28 bg-zinc-950 text-zinc-100 overflow-hidden border-b border-amber-500/20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 font-mono">
            <Hotel className="w-3.5 h-3.5 text-amber-400" />
            <span>On-Campus Guest Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-zinc-100 max-w-4xl mx-auto leading-tight">
            Attached Deluxe Guest Lodging
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Exclusively located at the <strong>Royal Banquet</strong> complex. 8 impeccably appointed, air-conditioned deluxe rooms designed to provide your family and special guests with serene comfort right where the celebrations happen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/check-availability?venue=royal-banquets"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all flex items-center gap-2 font-mono"
            >
              <Calendar className="w-4 h-4 text-zinc-950" />
              <span>Inquire for Lodging Dates</span>
            </Link>

            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="px-6 py-3.5 rounded-xl border border-amber-500/30 bg-zinc-900 text-amber-300 hover:text-amber-200 font-semibold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors flex items-center gap-2 font-mono"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Management</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Lodging Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { title: "8 Deluxe Suites", subtitle: "Attached to Royal Banquet", icon: Hotel },
            { title: "Split Air Conditioning", subtitle: "Individual Daikin Climate Controls", icon: Wind },
            { title: "High-Speed WiFi", subtitle: "Campus-Wide Connectivity", icon: Wifi },
            { title: "24/7 Power Backup", subtitle: "Twin Caterpillar DG Generator Sets", icon: ShieldCheck },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-zinc-100 text-base">{item.title}</h4>
                <p className="text-xs text-zinc-400 mt-1 font-light">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Visual Gallery Showcase of Rooms */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl font-bold text-zinc-100">
              Inside Our Deluxe Rooms
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light">
              Elegantly appointed interiors ensuring restful stays for elders and outstation guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl overflow-hidden bg-zinc-900 border border-amber-500/20 shadow-md flex flex-col">
              <LuxuryImage
                src="/images/deluxe-room-floral.jpg"
                alt="Deluxe Room with King Bedding"
                aspectRatio="aspect-[16/10]"
                category="Attached Lodging"
              />
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-zinc-100">
                  Deluxe King Suite (Royal Banquet Attached)
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed font-light">
                  Spacious king bedroom with premium spring mattress, mood lighting, wardrobe, and attached western bathroom with hot water geyser.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-amber-400">
                  <span className="bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">King Bed</span>
                  <span className="bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">Attached Bath</span>
                  <span className="bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">Daikin AC</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden bg-zinc-900 border border-amber-500/20 shadow-md flex flex-col">
              <LuxuryImage
                src="/images/deluxe-room-ac.jpg"
                alt="Executive Twin Suite"
                aspectRatio="aspect-[16/10]"
                category="Attached Lodging"
              />
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-zinc-100">
                  Executive Suite for Family Elders
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed font-light">
                  Designed for immediate accessibility to the stage and dining area, minimizing walking for family elders and toddlers.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-amber-400">
                  <span className="bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">Zero-Step Access</span>
                  <span className="bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">Geyser</span>
                  <span className="bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">Room Service Intercom</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Amenities Checklist */}
        <div className="bg-zinc-900 rounded-3xl p-8 sm:p-12 border border-amber-500/20 mb-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-zinc-100 mb-6 text-center">
              Lodging Amenities &amp; Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Attached western toilets with branded sanitaryware",
                "Instant hot water geysers in all 8 bathrooms",
                "Dedicated room cleaning & fresh linen service",
                "Intercom connection to campus management desk",
                "Electronic card key or physical secure lock",
                "Power backup ensuring uninterrupted AC operation",
                "Located directly adjoining the Royal Banquet dining corridor",
                "Private dressing mirrors suitable for bridal touch-ups",
              ].map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300 leading-relaxed font-light">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Policy & Reservation Note */}
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 text-center">
          <Building2 className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <h4 className="font-serif font-bold text-zinc-100 text-sm">
            Important Lodging Allocation Note
          </h4>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-light">
            These 8 deluxe guest rooms are exclusively available for bookings associated with events at <strong>Royal Banquet</strong> and <strong>The Royal Conventions</strong> campus. Individual transient hotel bookings are not accepted.
          </p>
          <div className="mt-4">
            <Link
              href="/check-availability?venue=royal-banquets"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 font-mono uppercase tracking-wider"
            >
              <span>Inquire Along with Banquet Hall</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
