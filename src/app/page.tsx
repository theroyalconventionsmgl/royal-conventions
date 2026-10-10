import Link from "next/link";
import { 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Award
} from "lucide-react";
import { siteConfig } from "@/config/site";
import HeroSection from "@/components/ui/HeroSection";
import VenueShowcase from "@/components/ui/VenueShowcase";
import { DeluxeBentoGrid } from "@/components/ui/DeluxeBentoGrid";
import LegacyTribute from "@/components/ui/LegacyTribute";
import InteractiveAvailabilityChecker from "@/components/ui/InteractiveAvailabilityChecker";

export default function HomePage() {
  return (
    <div className="space-y-0 bg-zinc-950 text-zinc-100">
      {/* 1. Mobile-First Hero Section with Architectural Vector Accents */}
      <HeroSection />

      {/* 2. Venue Showcase: Touch-Friendly Snapping Horizontal Carousel on Mobile */}
      <VenueShowcase venues={siteConfig.venues} />

      {/* 3. Deluxe Lodging & Campus Facilities: Vector Bento Grid */}
      <section className="py-16 sm:py-24 bg-zinc-950 relative overflow-hidden border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 mb-2.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Campus Infrastructure</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 leading-tight">
              Engineered for Flawless Hospitality
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 max-w-xl mx-auto font-light leading-relaxed">
              From attached deluxe suites at Royal Banquet to 100% zero-break power and mega commercial kitchens.
            </p>
          </div>

          {/* Deluxe Bento Grid */}
          <DeluxeBentoGrid />

          <div className="text-center mt-10">
            <Link
              href="/facilities"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors font-mono uppercase tracking-wider"
            >
              <span>Explore full technical specifications and generator details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Founder Tribute Component */}
      <LegacyTribute />

      {/* 5. Proprietor Narrative & On-Campus Leadership */}
      <section className="py-16 sm:py-24 bg-zinc-900/60 relative overflow-hidden border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 mb-2.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Founder&apos;s Welcome &amp; Ethos</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 leading-tight">
              Built on Trust, Crafted for Grandeur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Narrative Block 1: The Vision */}
            <div className="p-7 sm:p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)] flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-zinc-100">
                      The Vision of Sri N. Nageswara Rao
                    </h3>
                    <span className="text-[10px] text-amber-400/90 font-semibold tracking-wider uppercase font-mono">
                      Proprietor &amp; Founder
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  &ldquo;When we conceptualized <strong>The Royal Conventions</strong> at Mangalagiri, our mission was to construct a world-class ceremonial destination where families can conduct sacred muhurthams and grand receptions with total peace of mind. We engineered 28-foot soaring pillarless halls, attached deluxe suites for host families, and zero-delay backup power to ensure every ritual proceeds with divine dignity.&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 text-[11px] text-zinc-400 font-mono">
                Founding Philosophy: Uncompromising Quality &amp; Traditional Dignity
              </div>
            </div>

            {/* Narrative Block 2: Operational Rigor */}
            <div className="p-7 sm:p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)] flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-zinc-100">
                      Management Leadership on Campus
                    </h3>
                    <span className="text-[10px] text-amber-400/90 font-semibold tracking-wider uppercase font-mono">
                      Sri Bhaskar Rao &amp; Sri Srikanth
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  Our operations are personally overseen by experienced event directors on premises. Whether coordinating multi-course vegetarian live kitchens for 3,000 guests, or arranging seamless check-in for family elders staying in our attached deluxe suites, our leadership is present to guarantee flawless execution.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-zinc-400 font-mono">
                  Direct Line: <strong className="text-amber-300">{siteConfig.contact.primaryPhone}</strong>
                </div>
                <a
                  href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Management</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Availability Check Lead Intake Funnel */}
      <section className="py-16 sm:py-24 bg-zinc-950 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 mb-2.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-Time Inquiries</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 leading-tight">
              Inspect Availability &amp; Reserve Your Dates
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 max-w-lg mx-auto font-light">
              Deterministic real-time checks across Morning, Evening, and Full Day slots. Confidential packages shared following management review.
            </p>
          </div>

          {/* Interactive Availability Component */}
          <InteractiveAvailabilityChecker />
        </div>
      </section>

      {/* 7. Landmark Campus Location & Route Connectivity */}
      <section className="py-16 sm:py-20 bg-zinc-900/40 text-zinc-100 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold tracking-wider uppercase font-mono">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Highway &amp; City Transit Access</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
                Located at the Heart of Mangalagiri
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                Strategically positioned near <strong>RTC Depot Road Corner, Gowtham Buddha Road</strong>, offering seamless transit from Vijayawada (12 km), Guntur (20 km), and Amaravati government core (15 km).
              </p>

              <div className="space-y-2 pt-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>2 minutes from Mangalagiri RTC Bus Station</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>5 minutes from National Highway 16 (Chennai-Kolkata)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Direct wide road for wedding convoys &amp; private buses</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={siteConfig.contact.googleMapsDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all flex items-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-zinc-950" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-amber-500/30 bg-zinc-900 text-amber-200 text-xs font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-green-400" />
                  <span>Get Location on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl h-[320px] sm:h-[380px] relative bg-zinc-950">
              <iframe
                title="The Royal Conventions Location Map"
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full invert-[90%] hue-rotate-180 contrast-[105%]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
