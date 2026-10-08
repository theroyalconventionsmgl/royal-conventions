import { Metadata } from "next";
import Link from "next/link";
import { 
  Crown, 
  Award, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  Phone, 
  Calendar,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/config/site";
import OwnerWelcome from "@/components/ui/OwnerWelcome";

export const metadata: Metadata = {
  title: "About Us | Sri N. Nageswara Rao & The Royal Conventions",
  description:
    "Learn about The Royal Conventions Mangalagiri, founded by Proprietor Sri N. Nageswara Rao, and managed by Sri Bhaskar Rao and Sri Srikanth. Dedicated to luxury hospitality.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Page Header */}
      <section className="relative py-20 lg:py-24 bg-[#121212] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#1A1A1A]/70 to-[#121212] z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C5A059]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] border border-[#C5A059]/40 text-[#DFCA95] text-xs font-semibold uppercase tracking-wider mb-6">
            <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Legacy & Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
            Crafting Celebrations with Royal Dignity
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Founded under the visionary leadership of <strong>Sri N. Nageswara Rao</strong>, The Royal Conventions is Mangalagiri&apos;s definitive landmark for majestic weddings, family milestones, and state conventions.
          </p>
        </div>
      </section>

      {/* 2. Proprietor Spotlight Component */}
      <OwnerWelcome />

      {/* 3. Management Leadership Profiles */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D31] mb-2">
            Operations & Client Care
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            The Leadership Team on Campus
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-3">
            Our experienced managers oversee every ceremony personally—from initial hall inspection and vendor coordination to the final guest farewell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {siteConfig.management.map((mgr) => (
            <div
              key={mgr.name}
              className="p-8 rounded-3xl bg-white border border-[#C5A059]/25 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 text-[#8C6D31] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  {mgr.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#8C6D31] mt-1">
                  {mgr.role}
                </p>
                <p className="text-xs text-zinc-600 mt-4 leading-relaxed">
                  Available daily on-site near RTC Depot Road Corner to guide families on auspicious date holds, stage configurations, and catering logistics.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between">
                <a
                  href={`tel:${mgr.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1A1A1A] hover:text-[#8C6D31] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span>Direct Line: {mgr.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Core Values Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#C5A059]/20 shadow-sm">
            <HeartHandshake className="w-8 h-8 text-[#8C6D31] mb-3" />
            <h4 className="font-serif font-bold text-lg text-[#1A1A1A]">Sacred Hospitality</h4>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              We honor the Indian ethos of <em>&ldquo;Athithi Devo Bhava&rdquo;</em>, ensuring every guest experiences warmth, respect, and seamless assistance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#C5A059]/20 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#8C6D31] mb-3" />
            <h4 className="font-serif font-bold text-lg text-[#1A1A1A]">Absolute Reliability</h4>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Zero compromises on generator power backup, air conditioning chillers, and security surveillance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#C5A059]/20 shadow-sm">
            <Award className="w-8 h-8 text-[#8C6D31] mb-3" />
            <h4 className="font-serif font-bold text-lg text-[#1A1A1A]">Private Ethical Pricing</h4>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Transparent, tailored packages provided privately with no hidden utility surcharges or surprise billing.
            </p>
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-16 text-center">
          <Link
            href="/check-availability"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
          >
            <Calendar className="w-4 h-4 text-[#1A1A1A]" />
            <span>Check Event Availability</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
