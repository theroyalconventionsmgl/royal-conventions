import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  ChevronRight,
  Building2,
  Lock
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAFAFA] text-neutral-700 border-t border-neutral-200 relative overflow-hidden">
      {/* Decorative Top Accent Line in Refined Metallic Gold */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand & Proprietor Entity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1.5px] shadow-sm shadow-amber-500/20">
                <div className="w-full h-full rounded-[10px] bg-neutral-950 flex items-center justify-center text-amber-400">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 20h18" />
                    <path d="M5 20V8l4 3 3-5 3 5 4-3v12" />
                    <circle cx="12" cy="5" r="1" fill="currentColor" />
                    <circle cx="5" cy="7" r="1" fill="currentColor" />
                    <circle cx="19" cy="7" r="1" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-neutral-950 tracking-wide block leading-none">
                  THE ROYAL CONVENTIONS
                </span>
                <span className="text-[10px] tracking-[0.2em] text-amber-700 uppercase font-bold mt-1 block">
                  Mangalagiri • Andhra Pradesh
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              Mangalagiri&apos;s premier multi-venue convention campus. Dedicated to hosting memorable, regal weddings, grand receptions, and prestigious corporate assemblies.
            </p>

            {/* Proprietor Entity Card */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <div className="text-[10px] text-amber-700 font-bold uppercase tracking-widest">
                Proprietorship & Founder
              </div>
              <div className="text-sm font-bold text-neutral-950 mt-1">
                {siteConfig.proprietor.name}
              </div>
              <div className="text-xs text-neutral-500">
                {siteConfig.proprietor.title}
              </div>
            </div>
          </div>

          {/* Col 2: The Three Venues */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-950 tracking-wide flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>Our Distinct Venues</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {siteConfig.venues.map((venue) => (
                <li key={venue.id}>
                  <Link
                    href={`/${venue.slug}`}
                    className="group block p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-neutral-200 transition-all"
                  >
                    <div className="flex items-center justify-between font-semibold text-neutral-900 group-hover:text-amber-800">
                      <span>{venue.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-600" />
                    </div>
                    <span className="text-neutral-500 block mt-0.5 text-[11px]">
                      {venue.seatingCapacity.toLocaleString()} Seating • {venue.floatingCapacity.toLocaleString()} Floating
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/accommodation"
                  className="group block p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-neutral-200 transition-all"
                >
                  <div className="flex items-center justify-between font-semibold text-neutral-900 group-hover:text-amber-800">
                    <span>Deluxe Guest Lodging</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 font-semibold">
                      8 Rooms
                    </span>
                  </div>
                  <span className="text-neutral-500 block mt-0.5 text-[11px]">
                    Attached to Royal Banquet Complex
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Links & Facilities */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-950 tracking-wide">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <Link href="/check-availability" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-600" /> Real-Time Availability Check
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-600" /> Verified Campus Facilities & Generator
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-600" /> Visual Gallery (Stages & Interiors)
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-600" /> About Us & Founder Narrative
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-600" /> Location & Route Directions
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-neutral-500 hover:text-amber-700 transition-colors flex items-center gap-1.5 pt-2">
                  <Lock className="w-3.5 h-3.5 text-amber-600" /> Staff / Admin Management Login
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <div className="text-[10px] text-amber-700 font-bold uppercase tracking-widest">
                Event Managers On-Duty
              </div>
              <div className="text-xs text-neutral-700 mt-1 space-y-1">
                {siteConfig.management.map((m) => (
                  <div key={m.name} className="flex justify-between py-1 border-b border-neutral-200 text-[11px]">
                    <span className="text-neutral-900 font-semibold">{m.name}</span>
                    <a href={`tel:${m.phone.replace(/\s+/g, "")}`} className="text-neutral-600 hover:text-amber-800 font-medium">
                      {m.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4: Official Address & Direct Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-950 tracking-wide">
              Official Campus Address
            </h3>
            <div className="space-y-3 text-xs text-neutral-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-neutral-950 font-bold">The Royal Conventions</strong>
                  <br />
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.locality}, {siteConfig.contact.address.district}
                  <br />
                  {siteConfig.contact.address.state} - {siteConfig.contact.address.postalCode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <a href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`} className="hover:text-amber-800 block font-bold text-neutral-950">
                    {siteConfig.contact.primaryPhone}
                  </a>
                  <a href={`tel:${siteConfig.contact.secondaryPhone.replace(/\s+/g, "")}`} className="hover:text-amber-800 text-neutral-500 block text-[11px]">
                    {siteConfig.contact.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-amber-800">
                  {siteConfig.contact.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={siteConfig.contact.googleMapsDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-neutral-800 hover:text-amber-800 hover:border-amber-400 transition-colors text-xs font-semibold shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Private Pricing Notice Policy */}
        <div className="mt-12 pt-6 border-t border-neutral-200 text-[11px] text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left max-w-3xl">
            <strong className="text-neutral-800">Private Hospitality Policy:</strong> Tariff schedules and customized event packages are furnished confidentially through official management channels following date availability inspection. Public pricing is strictly not posted.
          </p>
          <div className="text-xs text-neutral-500">
            © {currentYear} The Royal Conventions. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
