import { Metadata } from "next";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Crown, 
  Navigation, 
  Calendar,
  ShieldCheck
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact & Location Directions | The Royal Conventions Mangalagiri",
  description:
    "Official contact address, phone numbers, and route directions for The Royal Conventions, near RTC Depot Road Corner, Gowtham Buddha Road, Mangalagiri.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D31] mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            Official Campus Location
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
            Connect With Our Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-4 leading-relaxed">
            Plan your visit to The Royal Conventions campus or get in touch with our team for dates, inspections, and private package consultations.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Official Address */}
          <div className="p-8 rounded-3xl bg-white border border-[#C5A059]/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 text-[#8C6D31] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Campus Address</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                <strong>The Royal Conventions</strong>
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

            <div className="pt-4 mt-4 border-t border-zinc-100">
              <a
                href={siteConfig.contact.googleMapsDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6D31] hover:text-[#5C461E]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions →</span>
              </a>
            </div>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="p-8 rounded-3xl bg-white border border-[#C5A059]/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 text-[#8C6D31] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Direct Phone Lines</h3>
              <div className="space-y-2 mt-3 text-xs text-zinc-700">
                <div>
                  <span className="text-zinc-500 block">General Manager (Operations):</span>
                  <a
                    href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                    className="font-bold text-[#1A1A1A] hover:text-[#8C6D31] text-sm"
                  >
                    Sri Bhaskar Rao: {siteConfig.contact.primaryPhone}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500 block">Manager (Bookings & Guest Rooms):</span>
                  <a
                    href={`tel:${siteConfig.contact.secondaryPhone.replace(/\s+/g, "")}`}
                    className="font-bold text-[#1A1A1A] hover:text-[#8C6D31] text-sm"
                  >
                    Sri Srikanth: {siteConfig.contact.secondaryPhone}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500 block">Office Landline:</span>
                  <span className="font-semibold text-zinc-800">{siteConfig.contact.landline}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat via Official WhatsApp →</span>
              </a>
            </div>
          </div>

          {/* Card 3: Visiting Hours & Email */}
          <div className="p-8 rounded-3xl bg-white border border-[#C5A059]/20 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 text-[#8C6D31] flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Visiting Hours & Mail</h3>
              <div className="space-y-2.5 mt-3 text-xs text-zinc-700">
                <div>
                  <span className="text-zinc-500 block">Campus Walkthrough Visits:</span>
                  <span className="font-semibold text-zinc-900">09:00 AM – 08:30 PM (Daily)</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Official Inquiries Email:</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-semibold text-zinc-900 hover:text-[#8C6D31]"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500 block">Proprietorship:</span>
                  <span className="font-semibold text-zinc-900">{siteConfig.proprietor.name}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100">
              <Link
                href="/check-availability"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6D31] hover:text-[#5C461E]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Check Date Availability Online →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Google Maps Frame */}
        <div className="bg-white rounded-3xl border border-[#C5A059]/30 shadow-xl overflow-hidden p-4 sm:p-6 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                Interactive Campus Location Map
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Navigate directly to The Royal Conventions via NH-16 / Gowtham Buddha Road.
              </p>
            </div>
            <a
              href={siteConfig.contact.googleMapsDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#1A1A1A]" />
              <span>Open in Google Maps App</span>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-zinc-200 h-[400px] sm:h-[480px]">
            <iframe
              title="The Royal Conventions Location Map"
              src={siteConfig.contact.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
