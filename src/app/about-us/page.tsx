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
} from "lucide-react";
import { siteConfig } from "@/config/site";
import OwnerWelcome from "@/components/ui/OwnerWelcome";
import LegacyTribute from "@/components/ui/LegacyTribute";

export const metadata: Metadata = {
  title: "About Us | Sri N. Nageswara Rao & The Royal Conventions",
  description:
    "Learn about The Royal Conventions Mangalagiri, founded by Proprietor Sri N. Nageswara Rao, and managed by Sri Bhaskar Rao and Sri Srikanth. Dedicated to luxury hospitality.",
};

export default function AboutUsPage() {
  return (
    <div className="bg-zinc-950 text-zinc-100">
      {/* 1. Page Header */}
      <section className="relative py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-zinc-950 z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 font-mono">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Legacy &amp; Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-zinc-100 max-w-4xl mx-auto leading-tight">
            Crafting Celebrations with Royal Dignity
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Founded under the visionary leadership of <strong>Sri N. Nageswara Rao</strong>, The Royal Conventions is Mangalagiri&apos;s definitive landmark for majestic weddings, family milestones, and state conventions.
          </p>
        </div>
      </section>

      {/* 2. Proprietor Spotlight Component */}
      <OwnerWelcome />

      {/* 3. Founder Tribute Memorial Section */}
      <LegacyTribute />

      {/* 4. Management Leadership Profiles */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-amber-500/20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2 font-mono">
            Operations &amp; Client Care
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-100">
            The Leadership Team on Campus
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light">
            Our experienced managers oversee every ceremony personally—from initial hall inspection and vendor coordination to the final guest farewell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {siteConfig.management.map((mgr) => (
            <div
              key={mgr.name}
              className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-100">
                  {mgr.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1 font-mono">
                  {mgr.role}
                </p>
                <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                  Available daily on-site near RTC Depot Road Corner to guide families on auspicious date holds, stage configurations, and catering logistics.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                <a
                  href={`tel:${mgr.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors font-mono"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Direct Line: {mgr.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 5. Core Values Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-sm">
            <HeartHandshake className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="font-serif font-bold text-lg text-zinc-100">Sacred Hospitality</h4>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              We honor the Indian ethos of <em>&ldquo;Athithi Devo Bhava&rdquo;</em>, ensuring every guest experiences warmth, respect, and seamless assistance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="font-serif font-bold text-lg text-zinc-100">Absolute Reliability</h4>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Zero compromises on generator power backup, air conditioning chillers, and security surveillance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-sm">
            <Award className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="font-serif font-bold text-lg text-zinc-100">Private Ethical Pricing</h4>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Transparent, tailored packages provided privately with no hidden utility surcharges or surprise billing.
            </p>
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-16 text-center">
          <Link
            href="/check-availability"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4 text-zinc-950" />
            <span>Check Event Availability</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
