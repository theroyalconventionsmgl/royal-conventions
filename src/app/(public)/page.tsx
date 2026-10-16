import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowUpRight,
  MapPin,
  MessageSquare,
  Phone,
  Wind,
  Zap,
  Car,
  Sparkles,
  BedDouble,
  Utensils,
  Speaker,
  Accessibility,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import HeroSection from "@/components/ui/HeroSection";
import VenueShowcase from "@/components/ui/VenueShowcase";
import LuxuryImage from "@/components/ui/LuxuryImage";
import InteractiveAvailabilityChecker from "@/components/ui/InteractiveAvailabilityChecker";

const FACILITY_ICONS: Record<string, typeof Wind> = {
  Wind,
  Zap,
  Car,
  Sparkles,
  Hotel: BedDouble,
  Utensils,
  Tv: Speaker,
  ShieldCheck: Accessibility,
};

const TOUR_IMAGES = [
  { src: "/images/royal-convention-hero.jpg", caption: "Royal Convention — Flagship 900-seat auditorium", span: "sm:col-span-2" },
  { src: "/images/royal-banquet-hero.webp", caption: "Royal Banquets — Contemporary celebrations", span: "" },
  { src: "/images/deluxe-room-floral.jpg", caption: "8 Guest suites & executive accommodation", span: "" },
  { src: "/images/royal-convention-hall-hero.webp", caption: "Vaishnavi Vaidehi — Grand AC hall", span: "" },
  { src: "/images/nannapaneni-lakshmi-hero.jpg", caption: "Smt. Nannapaneni Lakshmi Hall — Ceremonial setting", span: "" },
];

export default function HomePage() {
  return (
    <div className="bg-warm-cream text-forest-charcoal">
      {/* 1. Botanical Parallax Hero */}
      <HeroSection />

      {/* 2. Venue Collection */}
      <VenueShowcase venues={siteConfig.venues} />

      {/* 3. Visual Tour — Aceternity Layout Grid Inspiration */}
      <section className="py-20 sm:py-28 bg-pure-white border-y border-natural-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em]">
                <Sparkles className="w-3 h-3 text-deep-sage" />
                <span>Editorial Photography</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-deep-sage mt-3 leading-tight font-normal">
                A visual tour of the property
              </h2>
              <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-3.5 leading-relaxed font-sans">
                Authentic photographs from across our Mangalagiri campus — grand halls, guest suites, and thoughtful architectural details.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-deep-sage hover:text-forest-charcoal bg-warm-cream border border-natural-sand hover:border-soft-sage px-6 py-3 rounded-full transition-all min-h-[48px] shrink-0"
            >
              <span>Explore full gallery</span>
              <ArrowUpRight className="w-4 h-4 text-deep-sage" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mt-12">
            {TOUR_IMAGES.map((img) => (
              <figure
                key={img.src}
                className={`group rounded-3xl overflow-hidden border border-natural-sand bg-pure-white shadow-xs hover:shadow-lg transition-all duration-300 ${img.span}`}
              >
                <div className="overflow-hidden">
                  <LuxuryImage
                    src={img.src}
                    alt={img.caption}
                    aspectRatio="aspect-[4/3]"
                    category="Campus Tour"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-5 py-4 text-[13px] text-forest-charcoal/85 border-t border-natural-sand/50 font-medium">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Facilities & Campus Services */}
      <section className="py-20 sm:py-28 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3 text-deep-sage" />
              <span>Comfort & convenience</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-deep-sage mt-3 leading-tight font-normal">
              The details that help your day flow
            </h2>
            <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-3.5 leading-relaxed font-sans">
              Explore venue amenities and guest services to plan your celebration with confidence. Please confirm specific facilities and arrangements with our team before booking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12">
            {siteConfig.facilities.slice(0, 6).map((fac) => {
              const Icon = FACILITY_ICONS[fac.icon] ?? Sparkles;
              return (
                <div
                  key={fac.title}
                  className="bg-pure-white rounded-3xl border border-natural-sand p-7 shadow-xs hover:border-soft-sage hover:shadow-md transition-all duration-300"
                >
                  <span className="w-12 h-12 rounded-2xl bg-soft-sage/20 flex items-center justify-center text-deep-sage mb-5">
                    <Icon className="w-6 h-6 text-deep-sage" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-deep-sage font-normal">{fac.title}</h3>
                  <p className="text-[14px] text-forest-charcoal/80 leading-relaxed mt-2.5 font-sans">{fac.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 sm:mt-12">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-deep-sage hover:text-forest-charcoal bg-pure-white border border-natural-sand hover:border-soft-sage px-6 py-3 rounded-full transition-all min-h-[48px]"
            >
              <span>View all campus amenities</span>
              <ArrowUpRight className="w-4 h-4 text-deep-sage" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Availability Enquiry */}
      <section className="py-20 sm:py-28 bg-pure-white border-y border-natural-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
              <Sparkles className="w-3 h-3 text-deep-sage" />
              <span>Real-Time Inquiries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-deep-sage leading-tight font-normal">
              Find your preferred date
            </h2>
            <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-3 leading-relaxed font-sans">
              Select your venue, date, and shift. We verify calendar availability and respond promptly with private tariffs. An enquiry is never a binding booking.
            </p>
          </div>
          <div className="mt-12">
            <Suspense fallback={<p className="text-center py-12 text-sm text-forest-charcoal/60">Loading availability calendar…</p>}>
              <InteractiveAvailabilityChecker />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 6. Location & Visit */}
      <section className="py-20 sm:py-28 bg-warm-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] w-fit mb-3">
                <MapPin className="w-3 h-3 text-deep-sage" />
                <span>Prime Location</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-deep-sage leading-tight font-normal">
                Conveniently located in Mangalagiri
              </h2>
              <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-3.5 leading-relaxed font-sans">
                Near RTC Depot Road Corner, Gowtham Buddha Road — seamlessly accessible within minutes from Vijayawada, Guntur, and Amaravati.
              </p>
              <address className="text-sm text-forest-charcoal/80 not-italic mt-5 leading-relaxed font-sans">
                <strong>The Royal Conventions</strong><br />
                {siteConfig.contact.address.street}, {siteConfig.contact.address.locality},{" "}
                {siteConfig.contact.address.state} {siteConfig.contact.address.postalCode}
              </address>
              <div className="flex flex-wrap gap-3 mt-7">
                <a
                  href={siteConfig.contact.googleMapsDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-deep-sage text-pure-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-forest-charcoal transition-all min-h-[50px] shadow-xs"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 border border-natural-sand bg-pure-white text-deep-sage text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-warm-cream transition-all min-h-[50px]"
                >
                  <Phone className="w-4 h-4 text-deep-sage" />
                  <span>{siteConfig.contact.primaryPhone}</span>
                </a>
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-natural-sand bg-pure-white text-deep-sage text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-warm-cream transition-all min-h-[50px]"
                >
                  <MessageSquare className="w-4 h-4 text-deep-sage" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden border border-natural-sand shadow-sm min-h-[340px] bg-pure-white">
              <iframe
                title="The Royal Conventions on the map"
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 340 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
