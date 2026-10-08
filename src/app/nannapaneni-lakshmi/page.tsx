import { Metadata } from "next";
import Link from "next/link";
import { 
  Users, 
  Maximize, 
  Sparkles, 
  Utensils, 
  CheckCircle2, 
  Calendar,
  Phone,
  Crown
} from "lucide-react";
import { siteConfig } from "@/config/site";
import InteractiveAvailabilityChecker from "@/components/ui/InteractiveAvailabilityChecker";
import LuxuryImage from "@/components/ui/LuxuryImage";

const venue = siteConfig.venues.find((v) => v.id === "nannapaneni-lakshmi")!;

export const metadata: Metadata = {
  title: `${venue.name} | Mangalagiri`,
  description:
    `Explore ${venue.name} at The Royal Conventions Mangalagiri: spacious traditional Non-AC hall for large gatherings and classic rituals.`,
};

export default function RoyalConventionHallPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Dedicated Venue Hero */}
      <section className="relative py-20 lg:py-28 bg-[#121212] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#1A1A1A]/70 to-[#121212] z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C5A059]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] border border-[#C5A059]/40 text-[#DFCA95] text-xs font-semibold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Spacious Traditional Non-AC</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
                {venue.name}
              </h1>

              <p className="text-sm sm:text-lg text-[#DFCA95] font-serif italic">
                &ldquo;{venue.tagline}&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                {venue.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#check-dates"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#1A1A1A]" />
                  <span>Check Availability</span>
                </a>

                <a
                  href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="px-6 py-3.5 rounded-xl border border-[#C5A059]/40 text-[#DFCA95] font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A059]/10 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Venue Manager</span>
                </a>
              </div>
            </div>

            {/* Metric Card */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#DFCA95] text-xs font-semibold">
                  <Users className="w-4 h-4" /> Seating Capacity
                </div>
                <div className="font-serif text-3xl font-bold text-white mt-1">150</div>
                <p className="text-[11px] text-zinc-400 mt-1">Seated guests</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#DFCA95] text-xs font-semibold">
                  <Users className="w-4 h-4" /> Floating Capacity
                </div>
                <div className="font-serif text-3xl font-bold text-white mt-1">150</div>
                <p className="text-[11px] text-zinc-400 mt-1">Ceremonies & Receptions</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#DFCA95] text-xs font-semibold">
                  <Maximize className="w-4 h-4" /> Hall Type
                </div>
                <div className="font-serif text-3xl font-bold text-white mt-1">Large Non-AC</div>
                <p className="text-[11px] text-zinc-400 mt-1">Non-AC Architecture</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#DFCA95] text-xs font-semibold">
                  <Utensils className="w-4 h-4" /> Dining Seats
                </div>
                <div className="font-serif text-3xl font-bold text-white mt-1">150</div>
                <p className="text-[11px] text-zinc-400 mt-1">Dedicated dining hall</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ideal Celebrations & Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D31]">
              Versatility & Warmth
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Personalized Touch for Life&apos;s Cherished Occasions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Designed for close-knit ceremonies where warmth, closeness, and acoustic intimacy are paramount. Perfect for traditional Nischithartham rituals, cradle ceremonies, and executive corporate symposiums.
            </p>

            <div className="space-y-3 pt-2">
              {venue.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#C5A059]/15 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#8C6D31] shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-800 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {venue.galleryImages.map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-md">
                <LuxuryImage
                  src={img.url}
                  alt={img.caption}
                  aspectRatio="aspect-[16/9]"
                  category={img.category}
                />
                <div className="p-3 bg-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                    {img.category}
                  </span>
                  <p className="text-xs text-zinc-700 font-medium mt-0.5 line-clamp-1">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Availability Check Drawer Anchor */}
      <section id="check-dates" className="py-20 bg-white border-t border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
              Check Dates for Nannapaneni Lakshmi Function Hall
            </h2>
            <p className="text-xs text-zinc-500 mt-2">
              Inspect current calendar holds across Morning, Evening, and Full Day shifts.
            </p>
          </div>

          <InteractiveAvailabilityChecker initialVenueId="nannapaneni-lakshmi" />
        </div>
      </section>
    </div>
  );
}
