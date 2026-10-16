import { Metadata } from "next";
import Link from "next/link";
import { 
  Hotel, 
  Wifi, 
  Wind, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  Check, 
  Building2, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/config/site";
import LuxuryImage from "@/components/ui/LuxuryImage";

export const metadata: Metadata = {
  title: "Deluxe Guest Lodging Rooms | Royal Banquets Mangalagiri",
  description:
    "Explore the 8 luxury air-conditioned deluxe guest lodging rooms attached directly to Royal Banquets at The Royal Conventions campus in Mangalagiri.",
};

export default function AccommodationPage() {
  return (
    <div className="bg-warm-cream text-forest-charcoal min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-24 lg:py-32 bg-warm-cream text-forest-charcoal overflow-hidden border-b border-natural-sand">
        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-sans">
            <Hotel className="w-4 h-4 text-deep-sage" />
            <span>On-Campus Guest Hospitality</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-deep-sage max-w-4xl mx-auto leading-tight font-normal">
            Attached Deluxe Guest Suites
          </h1>

          <p className="text-[15px] sm:text-lg text-forest-charcoal/80 max-w-2xl mx-auto mt-4 leading-relaxed font-sans">
            Exclusively located at the <strong>Royal Banquets</strong> complex. 8 thoughtfully appointed, air-conditioned guest suites designed to provide your family and guests with serene comfort right on campus.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
            <Link
              href="/check-availability?venue=royal-banquets"
              className="px-8 py-3.5 rounded-full bg-deep-sage hover:bg-forest-charcoal text-pure-white font-semibold text-xs uppercase tracking-wider shadow-xs transition-all flex items-center gap-2 min-h-[50px]"
            >
              <Calendar className="w-4 h-4 text-pure-white" />
              <span>Inquire for Suite Dates</span>
            </Link>

            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="px-6 py-3.5 rounded-full border border-natural-sand bg-pure-white text-deep-sage hover:border-soft-sage font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[50px]"
            >
              <Phone className="w-4 h-4 text-deep-sage" />
              <span>Call Reservation Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Lodging Highlights */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { title: "8 Deluxe Suites", subtitle: "Attached to Royal Banquets", icon: Hotel },
            { title: "Split Air Conditioning", subtitle: "Individual Daikin Climate Controls", icon: Wind },
            { title: "High-Speed WiFi", subtitle: "Campus-Wide Connectivity", icon: Wifi },
            { title: "24/7 Power Backup", subtitle: "Twin Caterpillar DG Generator Sets", icon: ShieldCheck },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-pure-white border border-natural-sand shadow-xs flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-deep-sage" />
              </div>
              <div>
                <h4 className="font-serif font-normal text-deep-sage text-base">{item.title}</h4>
                <p className="text-xs text-forest-charcoal/70 mt-1 font-sans">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Visual Gallery Showcase of Rooms */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-deep-sage font-normal">
              Inside Our Deluxe Rooms
            </h2>
            <p className="text-sm text-forest-charcoal/75 mt-2.5 font-sans">
              Elegantly appointed interiors ensuring restful stays for elders, family hosts, and outstation guests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl overflow-hidden bg-pure-white border border-natural-sand shadow-xs flex flex-col">
              <LuxuryImage
                src="/images/deluxe-room-floral.jpg"
                alt="Deluxe Room with King Bedding"
                aspectRatio="aspect-[16/10]"
                category="Attached Lodging"
              />
              <div className="p-7">
                <h3 className="font-serif text-xl sm:text-2xl text-deep-sage font-normal">
                  Deluxe King Suite (Royal Banquets Attached)
                </h3>
                <p className="text-sm text-forest-charcoal/80 mt-2.5 leading-relaxed font-sans">
                  Spacious king bedroom with premium spring mattress, ambient lighting, wardrobe, and attached western bathroom with hot water geyser.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-sans text-deep-sage">
                  <span className="bg-soft-sage/20 px-3 py-1 rounded-full border border-soft-sage/40">King Bed</span>
                  <span className="bg-soft-sage/20 px-3 py-1 rounded-full border border-soft-sage/40">Attached Bath</span>
                  <span className="bg-soft-sage/20 px-3 py-1 rounded-full border border-soft-sage/40">Daikin AC</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden bg-pure-white border border-natural-sand shadow-xs flex flex-col">
              <LuxuryImage
                src="/images/deluxe-room-ac.jpg"
                alt="Executive Twin Suite"
                aspectRatio="aspect-[16/10]"
                category="Attached Lodging"
              />
              <div className="p-7">
                <h3 className="font-serif text-xl sm:text-2xl text-deep-sage font-normal">
                  Executive Suite for Family Elders
                </h3>
                <p className="text-sm text-forest-charcoal/80 mt-2.5 leading-relaxed font-sans">
                  Designed for immediate accessibility to the stage and dining area, minimizing walking for family elders and toddlers.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-sans text-deep-sage">
                  <span className="bg-soft-sage/20 px-3 py-1 rounded-full border border-soft-sage/40">Zero-Step Access</span>
                  <span className="bg-soft-sage/20 px-3 py-1 rounded-full border border-soft-sage/40">Geyser</span>
                  <span className="bg-soft-sage/20 px-3 py-1 rounded-full border border-soft-sage/40">Intercom Desk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Amenities Checklist */}
        <div className="bg-pure-white rounded-3xl p-8 sm:p-12 border border-natural-sand mb-16 shadow-xs">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl text-deep-sage mb-8 text-center font-normal">
              Suite Amenities &amp; Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Attached western toilets with branded sanitaryware",
                "Instant hot water geysers in all 8 bathrooms",
                "Dedicated room housekeeping & fresh linen service",
                "Intercom connection to campus management desk",
                "Physical secure locking with electronic provisions",
                "Power backup ensuring uninterrupted AC operation",
                "Located directly adjoining the Royal Banquets corridor",
                "Private dressing vanity mirrors suitable for bridal touch-ups",
              ].map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-deep-sage shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-forest-charcoal/85 leading-relaxed font-sans">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Policy & Reservation Note */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-pure-white border border-natural-sand text-center shadow-xs">
          <Building2 className="w-8 h-8 text-deep-sage mx-auto mb-3" />
          <h4 className="font-serif text-lg sm:text-xl text-deep-sage font-normal">
            Important Lodging Allocation Policy
          </h4>
          <p className="text-sm text-forest-charcoal/80 mt-2 leading-relaxed font-sans">
            These 8 deluxe guest suites are reserved strictly in conjunction with celebration events hosted at <strong>Royal Banquets</strong> and <strong>The Royal Conventions</strong> campus. Public transient hotel bookings are not accepted.
          </p>
          <div className="mt-6">
            <Link
              href="/check-availability?venue=royal-banquets"
              className="inline-flex items-center gap-2 text-xs font-semibold text-deep-sage hover:text-forest-charcoal uppercase tracking-wider"
            >
              <span>Inquire Along with Banquet Hall</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
