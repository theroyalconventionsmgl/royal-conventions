import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Verified Campus Facilities & Amenities | Mangalagiri",
  description:
    "Explore the verified luxury amenities at The Royal Conventions Mangalagiri: 100% Central AC, Caterpillar DG backup, 350+ car parking, attached lodging, and mega kitchens.",
};

export default function FacilitiesPage() {
  return (
    <div className="py-12 md:py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D31] mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            Verified Infrastructure
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
            Campus Amenities & Engineering
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-4 leading-relaxed">
            We understand that a grand wedding or high-stakes corporate assembly depends on flawless behind-the-scenes infrastructure. Here is how The Royal Conventions guarantees seamless operations.
          </p>
        </div>

        {/* Bento Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Dark Hero Card: Power & Acoustics */}
          <div className="lg:col-span-2 bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-amber-500/30 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="text-amber-400 text-5xl font-serif font-bold mb-2">100%</div>
              <h2 className="text-2xl font-serif font-semibold text-white mb-3">
                Zero-Break Power & Acoustic Insulation
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Twin industrial Caterpillar / Cummins DG gensets guarantee zero power disruption during sacred muhurtham rituals, paired with acoustically engineered soundproofing in Royal Banquet.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium uppercase tracking-wider text-amber-300">
              <span className="bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">Automatic Transfer</span>
              <span className="bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">Soundproof Hall</span>
            </div>
          </div>

          {/* Stat Card: Kitchen */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-amber-600 text-4xl font-serif font-bold mb-1">150ft × 18ft</div>
              <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2">
                Heavy-Duty Kitchen & Outdoor Buffet
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Expansive cooking space backed by dedicated outdoor snack, live counter, and ice cream zones for large-scale catering.
              </p>
            </div>
            <span className="mt-6 text-xs font-semibold uppercase tracking-widest text-slate-400">Catering Infrastructure</span>
          </div>
        </div>

        {/* 3-Column Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Parking */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-amber-500/40 transition-all shadow-sm">
            <div className="text-amber-600 text-4xl font-serif font-bold mb-1">250 + 350</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">Cars & Motorcycles</div>
            <h3 className="text-lg font-serif font-semibold text-slate-900 mb-2">Private Campus Parking</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              One of the largest dedicated private venue parking facilities in Mangalagiri with security supervision.
            </p>
          </div>

          {/* Lodging */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-amber-500/40 transition-all shadow-sm">
            <div className="text-amber-600 text-4xl font-serif font-bold mb-1">8 Suites</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">Deluxe Lodging & Dorm</div>
            <h3 className="text-lg font-serif font-semibold text-slate-900 mb-2">On-Site Accommodation</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Air-conditioned suites directly connected to the hall for bridal preparation, family elders, and VIP guests.
            </p>
          </div>

          {/* Green Rooms & Access */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-amber-500/40 transition-all shadow-sm">
            <div className="text-amber-600 text-4xl font-serif font-bold mb-1">VIP Rooms</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">Bride & Groom Lounge</div>
            <h3 className="text-lg font-serif font-semibold text-slate-900 mb-2">Luxury Green Rooms</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Opulent changing rooms with full-length vanity mirrors, private bathrooms, and wheelchair-accessible ramps.
            </p>
          </div>
        </div>

        {/* Secondary Facilities Accent Chips */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-20 text-sm text-slate-600">
          {["Luxury Bridal Green Rooms", "Wheelchair Accessibility", "Soundproof Acoustic Setup", "Central AC + Jumbo Coolers"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span className="font-medium">{item}</span>
            </span>
          ))}
        </div>

        {/* Power & Climate Contingency Guarantee */}
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 sm:p-12 border border-[#C5A059]/30 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DFCA95]">
              Management Assurance
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
              Zero-Interruption Guarantee for Sacred Rituals
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              When auspicious muhurtham mantras are being chanted or celebrity musical performances are underway, power failures are unacceptable. Our twin automatic generator banks trigger within seconds of any main grid fluctuation, sustaining 100% of air conditioning chillers, stage spotlights, sound rigs, and kitchen elevators without interruption.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/check-availability"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#1A1A1A]" />
                <span>Check Event Availability</span>
              </Link>

              <a
                href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                className="px-6 py-3.5 rounded-xl border border-[#C5A059]/40 text-[#DFCA95] font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A059]/10 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Speak with Operations Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
