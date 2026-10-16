import { Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  ShieldCheck,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Location Directions | The Royal Conventions Mangalagiri",
  description:
    "Official contact address, phone numbers, and route directions for The Royal Conventions, near RTC Depot Road Corner, Gowtham Buddha Road, Mangalagiri.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24 bg-warm-cream text-forest-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <MapPin className="w-3.5 h-3.5 text-deep-sage" />
            <span>Campus Location</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-deep-sage font-normal">
            Connect With Our Management
          </h1>
          <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            Plan your physical visit to The Royal Conventions campus or get in touch with our team for dates, inspections, and private package consultations.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Official Address */}
          <div className="p-8 rounded-3xl bg-pure-white border border-natural-sand shadow-xs flex flex-col justify-between hover:border-soft-sage transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-deep-sage font-normal">Campus Address</h3>
              <p className="text-sm text-forest-charcoal/80 mt-3 leading-relaxed font-sans">
                <strong className="text-deep-sage">The Royal Conventions</strong>
                <br />
                {siteConfig.contact.address.street}
                <br />
                {siteConfig.contact.address.locality}, {siteConfig.contact.address.district}
                <br />
                {siteConfig.contact.address.state} - {siteConfig.contact.address.postalCode}
              </p>
              <p className="text-xs text-forest-charcoal/70 mt-3 italic">
                Landmark: {siteConfig.contact.address.landmark}
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-natural-sand/60">
              <a
                href={siteConfig.contact.googleMapsDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-deep-sage hover:text-forest-charcoal uppercase tracking-wider"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Card 2: Direct Telephones */}
          <div className="p-8 rounded-3xl bg-pure-white border border-natural-sand shadow-xs flex flex-col justify-between hover:border-soft-sage transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-deep-sage font-normal">Direct Telephones</h3>
              <p className="text-sm text-forest-charcoal/80 mt-3 leading-relaxed font-sans">
                Reach our on-site event directors directly for auspicious date reservations:
              </p>

              <div className="mt-5 space-y-3 text-xs font-sans">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-deep-sage block font-semibold">
                    Primary Line
                  </span>
                  <a
                    href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                    className="font-semibold text-base text-deep-sage hover:text-forest-charcoal"
                  >
                    {siteConfig.contact.primaryPhone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-forest-charcoal/60 block font-semibold">
                    Secondary Line
                  </span>
                  <a
                    href={`tel:${siteConfig.contact.secondaryPhone.replace(/\s+/g, "")}`}
                    className="text-forest-charcoal/80 hover:text-deep-sage font-medium"
                  >
                    {siteConfig.contact.secondaryPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-natural-sand/60">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-deep-sage hover:text-forest-charcoal uppercase tracking-wider"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Campus Office Hours */}
          <div className="p-8 rounded-3xl bg-pure-white border border-natural-sand shadow-xs flex flex-col justify-between hover:border-soft-sage transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-deep-sage font-normal">Site Tour Timings</h3>
              <p className="text-sm text-forest-charcoal/80 mt-3 leading-relaxed font-sans">
                Our managers are on premises daily to guide families through all halls and suites.
              </p>

              <div className="mt-5 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-forest-charcoal">
                  <span>Monday – Sunday:</span>
                  <span className="font-semibold text-deep-sage">08:00 AM – 09:00 PM</span>
                </div>
                <div className="text-[12px] text-forest-charcoal/70">
                  Walk-ins welcome, advance notice recommended for guided tours.
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-natural-sand/60 flex items-center gap-1.5 text-xs text-forest-charcoal/80 font-sans">
              <Mail className="w-3.5 h-3.5 text-deep-sage" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-deep-sage">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Google Map Full-Width Embed */}
        <div className="rounded-3xl overflow-hidden border border-natural-sand shadow-sm h-[420px] mb-12 bg-pure-white">
          <iframe
            title="The Royal Conventions Campus Map"
            src={siteConfig.contact.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Tariff Policy Notice */}
        <div className="p-8 rounded-3xl bg-pure-white border border-natural-sand max-w-2xl mx-auto text-center shadow-xs">
          <ShieldCheck className="w-7 h-7 text-deep-sage mx-auto mb-3" />
          <h4 className="font-serif text-xl text-deep-sage font-normal">
            Hospitality &amp; Tariff Policy
          </h4>
          <p className="text-sm text-forest-charcoal/80 mt-2 leading-relaxed font-sans">
            In keeping with our standards as a botanical luxury venue, exact tariff schedules and custom catering packages are shared confidentially after dates and guest counts are verified.
          </p>
          <div className="mt-6">
            <Link
              href="/check-availability"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-deep-sage text-pure-white font-semibold text-xs uppercase tracking-wider hover:bg-forest-charcoal transition-all shadow-xs min-h-[48px]"
            >
              <span>Check Venue Availability</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
