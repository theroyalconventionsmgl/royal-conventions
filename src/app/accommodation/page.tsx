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
    <div className="bg-white text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-28 bg-[#F8F9FA] text-slate-900 overflow-hidden border-b border-slate-200">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Hotel className="w-3.5 h-3.5 text-amber-700" />
            <span>On-Campus Guest Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 max-w-4xl mx-auto leading-tight">
            Attached Deluxe Guest Lodging
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Exclusively located at the <strong>Royal Banquet</strong> complex. 8 impeccably appointed, air-conditioned deluxe rooms designed to provide your family and special guests with serene comfort right where the celebrations happen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/check-availability?venue=royal-banquets"
              className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-slate-200 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-900" />
              <span>Inquire for Lodging Dates</span>
            </Link>

            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="px-6 py-3.5 rounded-xl border border-slate-300 bg-slate-100 text-slate-700 hover:text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Call Manager: {siteConfig.contact.primaryPhone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Room Suites Detailed Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 mb-2">
            Curated Room Categories
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Designed for Serene Rest & Preparation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
            Each room is furnished with high-thread-count linens, Daikin whisper-quiet climate control, and modern ensuite bathrooms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {siteConfig.accommodation.roomTypes.map((room) => (
            <div
              key={room.name}
              className="bg-[#F8F9FA] rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col group hover:border-amber-500/30 transition-all"
            >
              <LuxuryImage
                src={room.image}
                alt={room.name}
                aspectRatio="aspect-[16/10]"
                category="Deluxe Accommodation"
              />
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {room.name}
                    </h3>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-500/20 px-3 py-1 rounded-full">
                      {room.count} Rooms Available
                    </span>
                  </div>

                  <p className="text-xs text-amber-700 font-medium mt-1">
                    {room.bed} • Recommended for {room.occupancy}
                  </p>

                  <ul className="space-y-2.5 mt-6 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-amber-700" />
                      <span>Dedicated Daikin split air conditioning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                      <span>Modern ensuite bathroom with 24/7 hot water</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Tv className="w-4 h-4 text-amber-700" />
                      <span>Smart LED TV with digital satellite channels</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-amber-700" />
                      <span>Complimentary high-speed campus Wi-Fi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-amber-700" />
                      <span>Wardrobe, vanity mirror & electronic safe</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 italic">
                    Attached to Royal Banquet Corridor
                  </span>
                  <Link
                    href={`/check-availability?venue=royal-banquets`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    Reserve Room →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why On-Site Stay Matters */}
        <div className="rounded-3xl bg-[#F8F9FA] p-8 sm:p-12 border border-slate-200 shadow-2xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
              The Royal Advantage
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Zero Travel Stress for Auspicious Muhurthams
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-light">
              Early morning wedding muhurthams often require the bridal party and immediate family to wake up at 3:00 AM for make-up and traditional blessings. By staying right on campus, your loved ones wake up refreshed, dress comfortably, and step directly into the ceremonial mandapam via private corridors without facing dawn highway delays.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <Clock className="w-5 h-5 text-amber-700 mb-2" />
                <h4 className="font-bold text-xs text-slate-900">24-Hour Check-in Flexibility</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Synchronized with your event shift timings.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-amber-700 mb-2" />
                <h4 className="font-bold text-xs text-slate-900">100% Power Backed</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  AC and geysers never stop running during load interruptions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <Building2 className="w-5 h-5 text-amber-700 mb-2" />
                <h4 className="font-bold text-xs text-slate-900">Direct Corridor Access</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Elderly relatives can move effortlessly between rooms and halls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
