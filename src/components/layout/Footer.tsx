import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight,
  ChevronRight,
  Building2,
  Lock
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-amber-500/20 relative overflow-hidden">
      {/* Decorative Top Accent Line in Metallic Gold */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand & Proprietor Entity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <span className="font-serif font-bold text-amber-400 text-sm leading-none">
                  TRC
                </span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-amber-100 tracking-wide block leading-none">
                  THE ROYAL CONVENTIONS
                </span>
                <span className="text-[10px] tracking-[0.2em] text-amber-400/80 uppercase font-mono font-bold mt-1 block">
                  Mangalagiri • Andhra Pradesh
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Mangalagiri&apos;s premier multi-venue convention campus. Dedicated to hosting memorable, regal weddings, grand receptions, and prestigious corporate assemblies.
            </p>

            {/* Proprietor Entity Card */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]">
              <div className="text-[10px] text-amber-400/80 font-bold uppercase tracking-widest font-mono">
                Proprietorship &amp; Founder
              </div>
              <div className="text-sm font-bold text-zinc-100 mt-1 font-serif">
                {siteConfig.proprietor.name}
              </div>
              <div className="text-xs text-zinc-400">
                {siteConfig.proprietor.title}
              </div>
            </div>
          </div>

          {/* Col 2: Venues */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-zinc-100 tracking-wide flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Our Distinct Venues</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {siteConfig.venues.map((venue) => (
                <li key={venue.id}>
                  <Link
                    href={`/${venue.slug}`}
                    className="group block p-2.5 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-amber-500/20 transition-all"
                  >
                    <div className="flex items-center justify-between font-semibold text-zinc-200 group-hover:text-amber-300">
                      <span>{venue.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                    </div>
                    <span className="text-zinc-500 block mt-0.5 text-[11px] font-mono">
                      {venue.seatingCapacity.toLocaleString()} Seating • {venue.floatingCapacity.toLocaleString()} Floating
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/accommodation"
                  className="group block p-2.5 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-amber-500/20 transition-all"
                >
                  <div className="flex items-center justify-between font-semibold text-zinc-200 group-hover:text-amber-300">
                    <span>Deluxe Guest Lodging</span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30 font-semibold font-mono">
                      8 Rooms
                    </span>
                  </div>
                  <span className="text-zinc-500 block mt-0.5 text-[11px]">
                    Attached to Royal Banquet Complex
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Links & Facilities */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-zinc-100 tracking-wide">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/check-availability" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> Real-Time Availability Check
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> Verified Campus Facilities &amp; Generator
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> Visual Gallery (Stages &amp; Interiors)
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> About Us &amp; Founder Narrative
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> Location &amp; Route Directions
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-zinc-500 hover:text-amber-400 transition-colors flex items-center gap-1.5 pt-2 font-mono">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Staff / Admin Management Login
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <div className="text-[10px] text-amber-400/80 font-bold uppercase tracking-widest font-mono">
                Event Managers On-Duty
              </div>
              <div className="text-xs text-zinc-300 mt-1 space-y-1">
                {siteConfig.management.map((m) => (
                  <div key={m.name} className="flex justify-between py-1 border-b border-zinc-800 text-[11px]">
                    <span className="text-zinc-200 font-semibold">{m.name}</span>
                    <a href={`tel:${m.phone.replace(/\s+/g, "")}`} className="text-zinc-400 hover:text-amber-300 font-mono">
                      {m.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4: Official Address & Direct Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-zinc-100 tracking-wide">
              Official Campus Address
            </h3>
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-zinc-200 font-bold">The Royal Conventions</strong>
                  <br />
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.locality}, {siteConfig.contact.address.district}
                  <br />
                  {siteConfig.contact.address.state} - {siteConfig.contact.address.postalCode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <a href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`} className="hover:text-amber-300 block font-bold text-zinc-200 font-mono">
                    {siteConfig.contact.primaryPhone}
                  </a>
                  <a href={`tel:${siteConfig.contact.secondaryPhone.replace(/\s+/g, "")}`} className="hover:text-amber-300 text-zinc-500 block text-[11px] font-mono">
                    {siteConfig.contact.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-amber-300 font-mono text-[11px]">
                  {siteConfig.contact.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={siteConfig.contact.googleMapsDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-amber-500/20 text-zinc-200 hover:text-amber-200 hover:border-amber-500/50 transition-colors text-xs font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Private Pricing Notice Policy */}
        <div className="mt-12 pt-6 border-t border-zinc-900 text-[11px] text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left max-w-3xl">
            <strong className="text-zinc-300">Private Hospitality Policy:</strong> Tariff schedules and customized event packages are furnished confidentially through official management channels following date availability inspection. Public pricing is strictly not posted.
          </p>
          <div className="text-xs text-zinc-500 font-mono">
            © {currentYear} The Royal Conventions. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
