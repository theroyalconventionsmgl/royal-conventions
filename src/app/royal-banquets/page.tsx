import { Metadata } from "next";
import Link from "next/link";
import { 
  Hotel, 
  Users, 
  Maximize, 
  Sparkles, 
  Utensils, 
  CheckCircle2, 
  Calendar,
  Phone,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { siteConfig } from "@/config/site";
import InteractiveAvailabilityChecker from "@/components/ui/InteractiveAvailabilityChecker";
import LuxuryImage from "@/components/ui/LuxuryImage";

const venue = siteConfig.venues.find((v) => v.id === "royal-banquets")!;

export const metadata: Metadata = {
  title: `${venue.name} & Deluxe Lodging | Soundproof Banquet Hall Mangalagiri`,
  description:
    "Explore Royal Banquet at The Royal Conventions Mangalagiri. Soundproof hall seating 200 / 600 floating guests, 180-seat AC dining + 100-seat buffet, complimentary chairs & tables, and 8 attached Deluxe AC Guest Lodging Rooms.",
};

export default function RoyalBanquetPage() {
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
                <Hotel className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Banquet Hall with 8 Attached Deluxe Guest Suites</span>
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

                <Link
                  href="/accommodation"
                  className="px-6 py-3.5 rounded-xl border border-[#C5A059]/40 text-[#DFCA95] font-semibold text-xs uppercase tracking-wider hover:bg-[#C5A059]/10 transition-colors flex items-center gap-2"
                >
                  <Hotel className="w-4 h-4" />
                  <span>View Deluxe Rooms</span>
                </Link>
              </div>
            </div>

            {/* Metric Card */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#DFCA95] text-xs font-semibold">
                  <Users className="w-4 h-4" /> Seated Capacity
                </div>
                <div className="font-serif text-3xl font-bold text-white mt-1">200</div>
                <p className="text-[11px] text-zinc-400 mt-1">Soundproofed AC banquet hall</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#DFCA95] text-xs font-semibold">
                  <Users className="w-4 h-4" /> Floating Capacity
                </div>
                <div className="font-serif text-3xl font-bold text-white mt-1">600</div>
                <p className="text-[11px] text-zinc-400 mt-1">Weddings & grand receptions</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#DFCA95] text-xs font-semibold">
                  <Hotel className="w-4 h-4" /> Attached Lodging
                </div>
                <div className="font-serif text-3xl font-bold text-[#DFCA95] mt-1">8 Rooms</div>
                <p className="text-[11px] text-zinc-400 mt-1">Deluxe AC guest accommodation</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#DFCA95] text-xs font-semibold">
                  <Utensils className="w-4 h-4" /> Dining Capacity
                </div>
                <div className="font-serif text-2xl font-bold text-white mt-1">180+100</div>
                <p className="text-[11px] text-zinc-400 mt-1">AC sit-down + ground floor buffet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Lodging Spotlight Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F5] border border-[#C5A059]/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D31]">
                  Seamless Event Stays
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                  Why Attached Deluxe Lodging Changes Everything
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Indian celebrations involve dawn-to-dusk rituals. Having 8 fully-serviced, air-conditioned deluxe suites directly accessible from the banquet hall allows the bride, groom, and family elders to rest, dress, and freshen up without travelling through city traffic.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-[#8C6D31]" />
                    <span>Attached Modern Ensuite Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-[#8C6D31]" />
                    <span>24/7 Hot Water & Generator Backup</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-[#8C6D31]" />
                    <span>Complimentary High-Speed Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-[#8C6D31]" />
                    <span>Direct Elevator Corridor Access</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/accommodation"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#8C6D31] hover:text-[#5C461E]"
                  >
                    <span>View photo gallery and room specifications →</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                {siteConfig.accommodation.roomTypes.map((room) => (
                  <div
                    key={room.name}
                    className="p-4 rounded-xl bg-white border border-[#C5A059]/20 shadow-sm flex items-center gap-4"
                  >
                    <LuxuryImage
                      src={room.image}
                      alt={room.name}
                      aspectRatio="aspect-square"
                      className="w-20 h-20 rounded-lg shrink-0"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">
                        {room.name}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-0.5">{room.bed}</p>
                      <span className="text-[10px] text-[#8C6D31] font-semibold bg-[#C5A059]/10 px-2 py-0.5 rounded mt-1 inline-block">
                        {room.occupancy}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Availability Check Drawer Anchor */}
      <section id="check-dates" className="py-20 bg-[#FAF8F5] border-t border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
              Check Dates for Royal Banquet
            </h2>
            <p className="text-xs text-zinc-500 mt-2">
              Reserve the banquet hall and coordinate attached lodging room allocation.
            </p>
          </div>

          <InteractiveAvailabilityChecker initialVenueId="royal-banquets" />
        </div>
      </section>
    </div>
  );
}
