import { Metadata } from "next";
import Link from "next/link";
import { 
  Users, 
  Maximize, 
  Utensils, 
  CheckCircle2, 
  Calendar,
  Phone,
  Crown
} from "lucide-react";
import { siteConfig } from "@/config/site";
import InteractiveAvailabilityChecker from "@/components/ui/InteractiveAvailabilityChecker";
import LuxuryImage from "@/components/ui/LuxuryImage";

const venue = siteConfig.venues.find((v) => v.id === "vaishnavi-vaidehi")!;

export const metadata: Metadata = {
  title: `${venue.name} | Grand Celebrations in Mangalagiri`,
  description:
    `Explore ${venue.name} at The Royal Conventions Mangalagiri: 650 seating, fully air-conditioned, dedicated dining hall, ideal for grand weddings and traditional rituals.`,
};

export default function RoyalConventionHallPage() {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* 1. Dedicated Venue Hero */}
      <section className="relative py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950 z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider font-mono">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Grand Celebrations &amp; Large Gatherings</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-zinc-100 leading-tight">
                {venue.name}
              </h1>

              <p className="text-sm sm:text-lg text-amber-300 font-serif italic">
                &ldquo;{venue.tagline}&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl font-light">
                {venue.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#check-dates"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-xl transition-all flex items-center gap-2 font-mono"
                >
                  <Calendar className="w-4 h-4 text-zinc-950" />
                  <span>Check Availability</span>
                </a>

                <a
                  href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="px-6 py-3.5 rounded-xl border border-amber-500/30 text-amber-300 font-semibold text-xs uppercase tracking-wider hover:bg-zinc-900 transition-colors flex items-center gap-2 font-mono"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Venue Manager</span>
                </a>
              </div>
            </div>

            {/* Metric Card */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/20 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold font-mono">
                  <Users className="w-4 h-4" /> Seating Capacity
                </div>
                <div className="font-serif text-3xl font-bold text-zinc-100 mt-1">650</div>
                <p className="text-[11px] text-zinc-400 mt-1">Spacious AC ceremonial hall</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/20 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold font-mono">
                  <Utensils className="w-4 h-4" /> Dining Capacity
                </div>
                <div className="font-serif text-3xl font-bold text-zinc-100 mt-1">300</div>
                <p className="text-[11px] text-zinc-400 mt-1">Dedicated dining hall</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/20 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold font-mono">
                  <Maximize className="w-4 h-4" /> Climate Control
                </div>
                <div className="font-serif text-2xl font-bold text-zinc-100 mt-1">100% AC</div>
                <p className="text-[11px] text-zinc-400 mt-1">Commercial cooling units</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-amber-500/20 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold font-mono">
                  <Users className="w-4 h-4" /> Floating Capacity
                </div>
                <div className="font-serif text-2xl font-bold text-zinc-100 mt-1">1,000+</div>
                <p className="text-[11px] text-zinc-400 mt-1">Peak reception crowd support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 font-mono">
              Hall Highlights
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-100">
              Grace, Spaciousness &amp; Precision
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Ideal for weddings, large family celebrations, engagements, and corporate conventions with seamless access to kitchen and parking.
            </p>

            <div className="space-y-3 pt-2">
              {venue.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900 border border-amber-500/20 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300 font-medium font-light">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {venue.galleryImages.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-md bg-zinc-900">
                <LuxuryImage
                  src={img.url}
                  alt={img.caption}
                  aspectRatio="aspect-[16/9]"
                  category={img.category}
                />
                <div className="p-3 bg-zinc-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                    {img.category}
                  </span>
                  <p className="text-xs text-zinc-300 font-medium mt-0.5 line-clamp-1">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Availability Check Drawer Anchor */}
      <section id="check-dates" className="py-20 bg-zinc-900/60 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl font-bold text-zinc-100">
              Check Dates for {venue.name}
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-light">
              Inspect current calendar holds across Morning, Evening, and Full Day slots.
            </p>
          </div>

          <InteractiveAvailabilityChecker initialVenueId="vaishnavi-vaidehi" />
        </div>
      </section>
    </div>
  );
}
