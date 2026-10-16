import { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import VenueCard from "@/components/ui/VenueCard";

export const metadata: Metadata = {
  title: "All Venues | The Royal Conventions, Mangalagiri",
  description:
    "Compare all venues at The Royal Conventions campus in Mangalagiri: Royal Convention, Vaishnavi Vaidehi, Royal Banquets and Smt. Nannapaneni Lakshmi Function Hall.",
};

const ROWS: { label: string; get: (v: (typeof siteConfig.venues)[number]) => string }[] = [
  { label: "Setting", get: (v) => v.category },
  { label: "Guests (up to)", get: (v) => v.floatingCapacity.toLocaleString() },
  { label: "Dining", get: (v) => v.diningCapacityLabel ?? `${v.diningCapacity}` },
  { label: "Climate", get: (v) => v.acType ?? "Air Conditioned" },
  { label: "Guest suites", get: (v) => (v.lodgingAttached ? "Attached" : "Campus suites available") },
];

export default function HallsPage() {
  const venues = siteConfig.venues;
  return (
    <div className="bg-warm-cream text-forest-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3 h-3 text-deep-sage" />
            <span>Campus Venues</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-deep-sage font-normal">
            Our Venues in Mangalagiri
          </h1>
          <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-3.5 leading-relaxed font-sans">
            Four distinctive halls on one unified botanical campus — from grand 900-seat celebrations to intimate family ceremonies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-12">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>

        {/* Side-by-side comparison table */}
        <div className="bg-pure-white rounded-3xl border border-natural-sand overflow-hidden mt-16 shadow-xs">
          <div className="px-6 py-5 border-b border-natural-sand bg-warm-cream/50">
            <h2 className="font-serif text-2xl text-deep-sage font-normal">Side-by-side comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-natural-sand text-forest-charcoal/70">
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Detail</th>
                  {venues.map((v) => (
                    <th key={v.id} className="px-5 py-3.5 font-serif text-base text-deep-sage">{v.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-natural-sand/60">
                {ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className="px-5 py-3.5 font-medium text-deep-sage bg-warm-cream/30">{row.label}</td>
                    {venues.map((v) => (
                      <td key={v.id} className="px-5 py-3.5 text-forest-charcoal/85">{row.get(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Consultation CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-deep-sage text-pure-white text-center max-w-3xl mx-auto mt-16 shadow-md">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal">Need assistance selecting the right venue?</h2>
          <p className="text-sm text-warm-cream/80 max-w-xl mx-auto mt-3 font-sans leading-relaxed">
            Walk through the campus with our event directors to evaluate stage dimensions, guest seating, dining arrangements, and suite reservations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
            <Link
              href="/check-availability"
              className="inline-flex items-center justify-center gap-2 bg-pure-white text-deep-sage text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-warm-cream transition-all min-h-[50px] w-full sm:w-auto shadow-xs"
            >
              <Check className="w-4 h-4 text-deep-sage" />
              <span>Check Availability</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-warm-cream/40 text-warm-cream text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-warm-cream/10 transition-all min-h-[50px] w-full sm:w-auto"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
