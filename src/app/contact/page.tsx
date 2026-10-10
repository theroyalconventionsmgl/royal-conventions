import { Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Location Directions | The Royal Conventions Mangalagiri",
  description:
    "Official contact address, phone numbers, and route directions for The Royal Conventions, near RTC Depot Road Corner, Gowtham Buddha Road, Mangalagiri.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2 font-mono">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Official Campus Location
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-100">
            Connect With Our Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed font-light">
            Plan your visit to The Royal Conventions campus or get in touch with our team for dates, inspections, and private package consultations.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Official Address */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-100">Campus Address</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">
                <strong className="text-zinc-200">The Royal Conventions</strong>
                <br />
                {siteConfig.contact.address.street}
                <br />
                {siteConfig.contact.address.locality}, {siteConfig.contact.address.district}
                <br />
                {siteConfig.contact.address.state} - {siteConfig.contact.address.postalCode}
              </p>
              <p className="text-[11px] text-zinc-500 mt-2 italic">
                Landmark: {siteConfig.contact.address.landmark}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-800">
              <a
                href={siteConfig.contact.googleMapsDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 font-mono"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Card 2: Direct Telephones */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-100">Direct Telephones</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">
                Reach our on-site event directors directly for auspicious date reservations:
              </p>

              <div className="mt-4 space-y-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-semibold">
                    Primary Line
                  </span>
                  <a
                    href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                    className="font-bold text-zinc-100 hover:text-amber-300"
                  >
                    {siteConfig.contact.primaryPhone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                    Secondary Line
                  </span>
                  <a
                    href={`tel:${siteConfig.contact.secondaryPhone.replace(/\s+/g, "")}`}
                    className="text-zinc-400 hover:text-amber-300"
                  >
                    {siteConfig.contact.secondaryPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-800">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 hover:text-green-300 font-mono"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Campus Office Hours */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-100">Site Tour Timings</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">
                Our managers are on premises daily to guide families through all halls and suites.
              </p>

              <div className="mt-4 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zinc-300">
                  <span>Monday – Sunday:</span>
                  <span className="font-bold text-amber-300">08:00 AM – 09:00 PM</span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  Walk-ins welcome, advance notice recommended for guided tours.
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-amber-300">
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Google Map Full-Width Embed */}
        <div className="rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl h-[420px] mb-12 bg-zinc-950">
          <iframe
            title="The Royal Conventions Campus Map"
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

        {/* Private Pricing Notice */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-amber-500/20 max-w-2xl mx-auto text-center">
          <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <h4 className="font-serif font-bold text-zinc-100 text-sm">
            Hospitality &amp; Tariff Policy
          </h4>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-light">
            In keeping with our standards as a 5-star digital hospitality platform, exact tariff schedules and custom catering packages are shared confidentially after dates and requirements are verified.
          </p>
          <div className="mt-4">
            <Link
              href="/check-availability"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all font-mono"
            >
              <span>Check Venue Availability</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
