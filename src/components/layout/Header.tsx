"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  Lock,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import BookingBottomSheet from "@/components/ui/BookingBottomSheet";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hallsDropdownOpen, setHallsDropdownOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHallsDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Overview", href: "/" },
    {
      label: "Our Halls",
      href: "/halls",
      hasDropdown: true,
      children: [
        {
          name: "Royal Convention",
          slug: "/royal-convention",
          desc: "Largest Flagship AC Hall",
          tag: "Grand Weddings",
        },
        {
          name: "Vaishnavi Vaidehi",
          slug: "/vaishnavi-vaidehi",
          desc: "2nd Largest AC Hall Complex",
          tag: "Grand Celebrations",
        },
        {
          name: "Nannapaneni Lakshmi",
          slug: "/nannapaneni-lakshmi",
          desc: "Spacious Traditional Non-AC Hall",
          tag: "Kalyanamandapam",
        },
        {
          name: "Royal Banquets",
          slug: "/royal-banquets",
          desc: "Newest AC Banquet + Deluxe Lodging",
          tag: "Banquet & Stay",
        },
        {
          name: "Compare All 4 Venues",
          slug: "/halls",
          desc: "Side-by-side capacity and facility matrix",
          tag: "Hall Matrix",
        },
      ],
    },
    { label: "Accommodation", href: "/accommodation" },
    { label: "Facilities", href: "/facilities" },
    { label: "Gallery", href: "/gallery" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Sleek fixed frosted glass header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-amber-500/20">
        {/* Desktop top ticker */}
        <div className="bg-zinc-950/95 text-zinc-400 text-[11px] py-1.5 px-4 border-b border-amber-500/10 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="flex items-center gap-1.5 text-amber-400/80 font-mono">
                <MapPin className="w-3 h-3 text-amber-400" />
                Gowtham Buddha Road, Mangalagiri • AP
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-amber-500/70" />
                Daily Walkthroughs: 09:00 AM – 08:30 PM
              </span>
            </div>
            <div className="flex items-center space-x-5">
              <a
                href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                Manager: {siteConfig.contact.primaryPhone}
              </a>
              <span className="text-zinc-800">|</span>
              <Link
                href="/admin/dashboard"
                className="hover:text-amber-400 flex items-center gap-1 transition-colors text-[11px]"
              >
                <Lock className="w-3 h-3 text-amber-500/70" />
                Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* BRANDING: Left-aligned logo with gold monogram emblem (TRC) */}
            <Link href="/" className="group flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 transition-all group-hover:bg-amber-500/20 group-hover:border-amber-500/50">
                <span className="font-serif font-bold text-amber-400 text-sm sm:text-base leading-none tracking-tight">
                  TRC
                </span>
              </div>

              <div className="flex flex-col leading-none">
                <span className="font-serif text-amber-100 tracking-wider uppercase text-sm sm:text-base font-semibold leading-none">
                  THE ROYAL CONVENTIONS
                </span>
                <span className="text-[9px] text-amber-400/80 font-mono tracking-widest uppercase leading-none mt-1">
                  MANGALAGIRI • AP
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setHallsDropdownOpen(true)}
                      onMouseLeave={() => setHallsDropdownOpen(false)}
                    >
                      <button
                        className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1 ${
                          pathname.startsWith("/royal-") || pathname === "/halls"
                            ? "text-amber-400 bg-amber-500/10 border border-amber-500/30"
                            : "text-zinc-300 hover:text-amber-300 hover:bg-zinc-900/80"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </button>

                      {hallsDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in duration-200">
                          <div className="bg-zinc-950/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-amber-500/20 p-2 space-y-1">
                            {link.children?.map((child) => (
                              <Link
                                key={child.slug}
                                href={child.slug}
                                className="block p-3 rounded-xl hover:bg-amber-500/10 transition-colors group/item"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-zinc-100 group-hover/item:text-amber-300">
                                    {child.name}
                                  </span>
                                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
                                    {child.tag}
                                  </span>
                                </div>
                                <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                                  {child.desc}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? "text-amber-400 bg-amber-500/10 border border-amber-500/30"
                        : "text-zinc-300 hover:text-amber-300 hover:bg-zinc-900/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl border border-amber-500/30 bg-zinc-900/80 text-xs font-semibold text-amber-200 hover:bg-amber-500/10 transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                <span>WhatsApp</span>
              </a>
              <Link
                href="/check-availability"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Dates</span>
              </Link>
            </div>

            {/* CONTROLS: Mobile Right-aligned compact gold pill ("Dates") + clean hamburger toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/check-availability"
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 text-xs font-semibold flex items-center gap-1 shadow-sm shadow-amber-500/20 active:scale-95 transition-transform"
              >
                <Calendar className="w-3 h-3 text-zinc-950" />
                <span>Dates</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-zinc-300 hover:bg-zinc-900 transition-colors border border-amber-500/20"
                aria-label="Toggle Mobile Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-zinc-200" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY: Full-screen dark glass drawer (bg-zinc-950/98 backdrop-blur-xl) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 bg-zinc-950/98 backdrop-blur-xl z-50 overflow-y-auto">
          <div className="px-5 pt-6 pb-28 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400/80 font-mono px-3 pb-3">
              Campus Venues &amp; Navigation
            </div>

            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="py-2 border-b border-zinc-900">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-amber-500/60 font-mono px-3 pb-2">
                      Our Halls
                    </div>
                    <div className="space-y-1.5">
                      {link.children?.map((child) => (
                        <Link
                          key={child.slug}
                          href={child.slug}
                          className="block p-3 rounded-xl bg-zinc-900/80 border border-amber-500/10 hover:border-amber-500/40 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-100 font-bold text-xs">{child.name}</span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold font-mono">
                              {child.tag}
                            </span>
                          </div>
                          <span className="block text-[11px] text-zinc-400 mt-1">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-3.5 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-amber-400 bg-amber-500/10 border border-amber-500/30"
                      : "text-zinc-200 hover:bg-zinc-900/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile drawer bottom actions: Prominent Call Manager button */}
            <div className="pt-6 border-t border-zinc-900 space-y-3">
              <a
                href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all"
              >
                <Phone className="w-4 h-4 text-zinc-950" />
                <span>Call Manager (+91 9866333055)</span>
              </a>

              <Link
                href="/check-availability"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-200 font-semibold text-sm hover:bg-zinc-800 transition-colors"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Check Real-Time Availability</span>
              </Link>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-green-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Availability Sheet */}
      <BookingBottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
}
