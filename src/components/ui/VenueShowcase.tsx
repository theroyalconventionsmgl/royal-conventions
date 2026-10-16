import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { VenueSpec } from "@/config/site";
import VenueCard from "@/components/ui/VenueCard";

export default function VenueShowcase({ venues }: { venues: VenueSpec[] }) {
  return (
    <section id="venues" className="py-20 sm:py-28 bg-warm-cream scroll-mt-20 border-t border-natural-sand/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3 text-deep-sage" />
            <span>Authorized Venue Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-deep-sage mt-3 leading-tight font-normal">
            Four distinctive halls, one botanical campus
          </h2>
          <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-3.5 leading-relaxed font-sans">
            From grand 900-guest celebrations to intimate family ceremonies — each hall features independent acoustics, dedicated dining spaces, and refined hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-12">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/halls"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-deep-sage hover:text-forest-charcoal bg-pure-white border border-natural-sand hover:border-soft-sage shadow-xs hover:shadow-md transition-all rounded-full min-h-[50px] px-7 py-3"
          >
            <span>Compare all 4 venues side-by-side</span>
            <ArrowUpRight className="w-4 h-4 text-deep-sage" />
          </Link>
        </div>
      </div>
    </section>
  );
}
