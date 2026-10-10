import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Zap,
  VolumeX,
  ChefHat,
  Car,
  Home,
  Droplet
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Verified Campus Facilities & Amenities | Mangalagiri",
  description:
    "Explore the verified luxury amenities at The Royal Conventions Mangalagiri: 100% Central AC, Caterpillar DG backup, 350+ car parking, attached lodging, and mega kitchens.",
};

export default function FacilitiesPage() {
  return (
    <div className="py-12 md:py-20 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Verified Infrastructure
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-100">
            Campus Amenities &amp; Engineering
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed font-light">
            We understand that a grand wedding or high-stakes corporate assembly depends on flawless behind-the-scenes infrastructure. Here is how The Royal Conventions guarantees seamless operations.
          </p>
        </div>

        {/* Bento Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Dark Hero Card: Power & Acoustics */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-3xl p-8 sm:p-10 border border-amber-500/30 flex flex-col justify-between relative overflow-hidden group shadow-[0_0_30px_rgba(245,158,11,0.05)]">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="text-amber-400 text-5xl font-serif font-bold mb-2">100%</div>
              <h2 className="text-2xl font-serif font-semibold text-zinc-100 mb-3">
                Zero-Break Power &amp; Acoustic Insulation
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                Twin industrial Caterpillar / Cummins DG gensets guarantee zero power disruption during sacred muhurtham rituals, paired with acoustically engineered soundproofing in Royal Banquet.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-xs font-medium uppercase tracking-wider text-amber-300 font-mono">
              <span className="bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">Automatic Transfer</span>
              <span className="bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">Soundproof Hall</span>
            </div>
          </div>

          {/* Stat Card: Kitchen */}
          <div className="bg-zinc-900 rounded-3xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-amber-400 text-4xl font-serif font-bold mb-1">150ft × 18ft</div>
              <h3 className="text-xl font-serif font-semibold text-zinc-100 mb-2">
                Heavy-Duty Kitchen &amp; Outdoor Buffet
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                Expansive cooking space backed by dedicated outdoor snack, live counter, and ice cream zones for large-scale catering.
              </p>
            </div>
            <span className="mt-6 text-xs font-semibold uppercase tracking-widest text-amber-400 font-mono">Catering Infrastructure</span>
          </div>
        </div>

        {/* 3-Column Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card: Attached Lodging */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-100 mb-2">
                8 Attached Deluxe Suites
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Air-conditioned family suites located at the Royal Banquet complex with attached western bathrooms for bride, groom, and immediate relatives.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-800">
              <Link href="/accommodation" className="text-xs font-bold text-amber-400 hover:text-amber-300 font-mono uppercase tracking-wider">
                Explore Lodging Details →
              </Link>
            </div>
          </div>

          {/* Card: Dedicated Parking */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-100 mb-2">
                350+ Vehicle Paved Parking
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Expansive on-campus secured parking grounds with designated traffic marshals ensuring smooth entry and egress for wedding convoys.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-800 text-xs text-zinc-400 font-mono">
              Dedicated Bus &amp; Convoy Space
            </div>
          </div>

          {/* Card: RO Water Plant */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-100 mb-2">
                Pure Commercial RO Plant
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Continuous purified drinking water distribution throughout cooking, dining, and green room areas, maintaining high hygiene benchmarks.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-zinc-800 text-xs text-zinc-400 font-mono">
              100% Certified Potable Standard
            </div>
          </div>
        </div>

        {/* Technical Checklist */}
        <div className="bg-zinc-900 rounded-3xl p-8 sm:p-12 border border-amber-500/20 mb-16">
          <h3 className="font-serif text-2xl font-bold text-zinc-100 mb-6 text-center">
            Complete Engineering &amp; Operational Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Heavy-duty Daikin / Blue Star central climate control across halls",
              "Acoustic paneling dampening echo in banquet halls",
              "150ft kitchen frontage with commercial LPG gas manifold",
              "Attached green rooms with private vanity mirrors & lockers",
              "Dedicated freight elevator & ramp access for event decorators",
              "CCTV perimeter monitoring & 24/7 security personnel",
              "Unrestricted sound permit compliance within enclosed spaces",
              "Direct highway connectivity on Gowtham Buddha Road",
              "Complimentary campus sanitization before every event",
            ].map((spec, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-300 leading-relaxed font-light">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center max-w-xl mx-auto">
          <h4 className="font-serif text-2xl font-bold text-zinc-100 mb-2">
            Schedule an On-Campus Inspection
          </h4>
          <p className="text-xs text-zinc-400 mb-6 font-light">
            Walk the stage dimensions, tour the kitchens, and view guest lodging rooms before reserving your date.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors font-mono"
            >
              Get Directions &amp; Contact
            </Link>
            <Link
              href="/check-availability"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all font-mono"
            >
              Check Date Availability
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
