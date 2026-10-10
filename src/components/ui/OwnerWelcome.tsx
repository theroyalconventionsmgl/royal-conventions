import Image from "next/image";
import { OBSIDIAN_BLUR_DATA_URL } from "@/lib/image-placeholder";
import Link from "next/link";
import { Award, Phone, CheckCircle, Shield, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function OwnerWelcome() {
  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden border-y border-amber-500/20">
      {/* Background Motifs */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Credibility Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Luxury Border Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 opacity-20 blur-sm transform -rotate-1" />

              <div className="relative rounded-2xl bg-zinc-900 p-2 overflow-hidden shadow-2xl border border-amber-500/30">
                {/* Visual Portrait */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 flex flex-col justify-end p-6 text-white">
                  <Image
                    src="/images/proprietor.jpg"
                    alt={`${siteConfig.proprietor.name}, ${siteConfig.proprietor.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top"
                    priority={false}
                    placeholder="blur"
                    blurDataURL={OBSIDIAN_BLUR_DATA_URL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />

                  <div className="relative z-20 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-md font-mono">
                      <Award className="w-3.5 h-3.5" />
                      Leadership &amp; Vision
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                      {siteConfig.proprietor.name}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium tracking-wider uppercase font-mono">
                      {siteConfig.proprietor.title}
                    </p>
                    <p className="text-xs text-zinc-300 pt-1 line-clamp-3 leading-relaxed">
                      Leading with integrity, generous hospitality, and uncompromising standards for celebrations in Andhra Pradesh.
                    </p>
                  </div>
                </div>

                {/* Badge Overlay */}
                <div className="mt-2 p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>20+ Years Community Trust</span>
                  </div>
                  <span className="text-amber-400 font-bold font-mono">Mangalagiri Landmark</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-[0.25em] font-mono">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Founder&apos;s Welcome Address
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 leading-[1.15]">
                Built on Trust, Crafted for Royal Celebrations
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              &ldquo;When we envisioned <strong>The Royal Conventions</strong> at Mangalagiri, our goal was simple yet profound: to create an uncompromised, sacred space where families can host life&apos;s most treasured moments with complete peace of mind, royal dignity, and seamless hospitality.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every detail—from our majestic 28-foot pillarless halls and 100% uninterrupted generator power back-up to our attached deluxe guest lodging rooms—has been engineered to make your family and guests feel cherished. We treat every celebration as our own family&apos;s milestone.
            </p>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 shadow-sm flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-100">Pillarless Visibility</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Uninterrupted sightlines from every corner of our flagship auditorium.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 shadow-sm flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-zinc-100">On-Site Deluxe Lodging</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    8 air-conditioned guest suites attached right next to the banquet hall.
                  </p>
                </div>
              </div>
            </div>

            {/* Management Direct Contacts */}
            <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono block">
                  Management Liaison On-Premises
                </span>
                <span className="text-xs text-zinc-200 font-medium">
                  Sri Bhaskar Rao &amp; Sri Srikanth
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Call {siteConfig.contact.primaryPhone}</span>
                </a>

                <Link
                  href="/about-us"
                  className="px-4 py-2 rounded-full border border-amber-500/40 hover:bg-zinc-800 text-xs font-semibold text-amber-300 transition-colors"
                >
                  Read Full Story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
