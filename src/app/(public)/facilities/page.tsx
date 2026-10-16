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
  Droplet,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Verified Campus Facilities & Amenities | Mangalagiri",
  description:
    "Explore the verified luxury amenities at The Royal Conventions Mangalagiri: 100% Central AC, Caterpillar DG backup, 350+ car parking, attached lodging, and mega kitchens.",
};

export default function FacilitiesPage() {
  return (
    <div className="py-16 sm:py-24 bg-warm-cream text-forest-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-deep-sage" />
            <span>Campus Engineering</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-deep-sage font-normal">
            Campus Amenities &amp; Infrastructure
          </h1>
          <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            A grand wedding or high-stakes convention depends on flawless infrastructure. Here is how The Royal Conventions guarantees seamless event operations.
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Card: Power & Acoustics */}
          <div className="lg:col-span-2 bg-pure-white rounded-3xl p-8 sm:p-10 border border-natural-sand flex flex-col justify-between relative overflow-hidden shadow-xs hover:border-soft-sage transition-all">
            <div>
              <div className="text-deep-sage text-5xl font-serif font-normal mb-2">100%</div>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-deep-sage mb-3">
                Zero-Break Power &amp; Acoustic Insulation
              </h2>
              <p className="text-forest-charcoal/85 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
                Twin industrial Caterpillar / Cummins DG gensets guarantee zero disruption during sacred muhurtham rituals, paired with acoustically engineered insulation in Royal Banquets.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-semibold uppercase tracking-wider text-deep-sage font-sans">
              <span className="bg-soft-sage/20 px-3.5 py-1.5 rounded-full border border-soft-sage/40">Automatic Transfer Switch</span>
              <span className="bg-soft-sage/20 px-3.5 py-1.5 rounded-full border border-soft-sage/40">Soundproof Enclosure</span>
            </div>
          </div>

          {/* Card: Kitchen Infrastructure */}
          <div className="bg-pure-white rounded-3xl p-8 border border-natural-sand hover:border-soft-sage transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-deep-sage text-4xl font-serif font-normal mb-2">150ft × 18ft</div>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-deep-sage mb-2.5">
                Heavy-Duty Prep Kitchen
              </h3>
              <p className="text-forest-charcoal/80 text-sm leading-relaxed font-sans">
                Expansive dedicated preparation kitchens backed by outdoor live counters, snack stalls, and dessert stations for large-scale catering.
              </p>
            </div>
            <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-deep-sage/90">
              Commercial Catering Setup
            </span>
          </div>
        </div>

        {/* 3-Column Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card: Attached Lodging */}
          <div className="p-8 rounded-3xl bg-pure-white border border-natural-sand hover:border-soft-sage transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center mb-5">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-deep-sage mb-2.5">
                8 Attached Deluxe Suites
              </h3>
              <p className="text-sm text-forest-charcoal/80 leading-relaxed font-sans">
                Air-conditioned family guest suites located directly at the Royal Banquets complex with ensuite western bathrooms for bride, groom, and immediate relatives.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-natural-sand/60">
              <Link href="/accommodation" className="inline-flex items-center gap-1.5 text-xs font-semibold text-deep-sage hover:text-forest-charcoal uppercase tracking-wider">
                <span>Explore Suite Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card: Dedicated Parking */}
          <div className="p-8 rounded-3xl bg-pure-white border border-natural-sand hover:border-soft-sage transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center mb-5">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-deep-sage mb-2.5">
                350+ Vehicle Paved Parking
              </h3>
              <p className="text-sm text-forest-charcoal/80 leading-relaxed font-sans">
                Secured on-campus parking bays with dedicated traffic marshals ensuring smooth entry, organized parking, and easy highway egress.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-natural-sand/60 text-xs text-forest-charcoal/70">
              Dedicated Bus &amp; Convoy Space
            </div>
          </div>

          {/* Card: RO Water Plant */}
          <div className="p-8 rounded-3xl bg-pure-white border border-natural-sand hover:border-soft-sage transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center mb-5">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-deep-sage mb-2.5">
                Commercial RO Water Plant
              </h3>
              <p className="text-sm text-forest-charcoal/80 leading-relaxed font-sans">
                Continuous purified drinking water distribution throughout cooking, dining, and suite areas, maintaining the highest food safety benchmarks.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-natural-sand/60 text-xs text-forest-charcoal/70">
              100% Certified Potable Standard
            </div>
          </div>
        </div>

        {/* Technical Checklist */}
        <div className="bg-pure-white rounded-3xl p-8 sm:p-12 border border-natural-sand mb-16 shadow-xs">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-deep-sage mb-8 text-center">
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
                <CheckCircle2 className="w-4 h-4 text-deep-sage shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-forest-charcoal/85 leading-relaxed font-sans">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center max-w-xl mx-auto">
          <h4 className="font-serif text-2xl sm:text-3xl font-normal text-deep-sage mb-2">
            Schedule an On-Campus Inspection
          </h4>
          <p className="text-sm text-forest-charcoal/80 mb-6 font-sans">
            Inspect stage dimensions, tour kitchens, and view guest suites before reserving your date.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pure-white border border-natural-sand text-deep-sage font-semibold text-xs uppercase tracking-wider hover:border-soft-sage transition-all min-h-[48px]"
            >
              <span>Get Directions &amp; Contact</span>
            </Link>
            <Link
              href="/check-availability"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-deep-sage text-pure-white font-semibold text-xs uppercase tracking-wider hover:bg-forest-charcoal transition-all shadow-xs min-h-[48px]"
            >
              <span>Check Date Availability</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
