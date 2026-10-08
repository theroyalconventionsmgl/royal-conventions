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
  MessageSquare
} from "lucide-react";
import { siteConfig } from "@/config/site";
import BookingBottomSheet from "@/components/ui/BookingBottomSheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hallsDropdownOpen, setHallsDropdownOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHallsDropdownOpen(false);
  }, [pathname]);

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
      {/* Top Notification / Landmark Ribbon in Soft Alabaster */}
      <div className="bg-[#FAFAFA] text-neutral-600 text-xs py-2 px-4 border-b border-neutral-200/80 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 font-medium text-amber-700">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Near RTC Depot Road Corner, Gowtham Buddha Road, Mangalagiri
            </span>
            <span className="flex items-center gap-1.5 text-neutral-500">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Daily Walkthroughs: 09:00 AM – 08:30 PM
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="text-neutral-700 hover:text-neutral-950 font-medium transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              Manager: {siteConfig.contact.primaryPhone}
            </a>
            <span className="text-neutral-300">|</span>
            <Link
              href="/admin/dashboard"
              className="text-neutral-500 hover:text-amber-700 flex items-center gap-1 transition-colors text-xs font-medium"
            >
              <Lock className="w-3 h-3 text-amber-600" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-neutral-200 py-3"
            : "bg-white/85 backdrop-blur-lg border-b border-neutral-200/60 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Clean Vector Logo & Brand Typography */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1.5px] shadow-sm shadow-amber-500/20 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-[10px] bg-neutral-950 flex items-center justify-center text-amber-400">
                  {/* Clean SVG Architectural Crown / Arch Line Mark */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 20h18" />
                    <path d="M5 20V8l4 3 3-5 3 5 4-3v12" />
                    <circle cx="12" cy="5" r="1" fill="currentColor" />
                    <circle cx="5" cy="7" r="1" fill="currentColor" />
                    <circle cx="19" cy="7" r="1" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-neutral-950 group-hover:text-amber-700 transition-colors leading-none">
                  THE ROYAL CONVENTIONS
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-amber-700 font-bold mt-1">
                  Mangalagiri • Andhra Pradesh
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
                            ? "text-amber-800 bg-amber-50 border border-amber-300/60"
                            : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                      </button>

                      {/* Dropdown Menu */}
                      {hallsDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in duration-200">
                          <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-xl border border-neutral-200 p-2 space-y-1">
                            {link.children?.map((child) => (
                              <Link
                                key={child.slug}
                                href={child.slug}
                                className="block p-3 rounded-xl hover:bg-amber-50/60 transition-colors group/item"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-neutral-900 group-hover/item:text-amber-700">
                                    {child.name}
                                  </span>
                                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                                    {child.tag}
                                  </span>
                                </div>
                                <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
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
                        ? "text-amber-800 bg-amber-50 border border-amber-300/60"
                        : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100"
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
                className="px-3.5 py-2 rounded-xl border border-amber-300/70 bg-amber-50/60 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Check Dates</span>
              </button>
            </div>

            {/* Mobile Header Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-neutral-950 text-amber-300 text-xs font-bold flex items-center gap-1 border border-amber-500/40 shadow-xs"
              >
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>Dates</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 transition-colors border border-neutral-200"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Full-Screen Blur-Backed Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-white/98 backdrop-blur-2xl border-b border-neutral-200 p-5 overflow-y-auto space-y-4 animate-in fade-in duration-200 z-50">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 px-3 py-1">
                Campus Venues & Overview
              </div>
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="py-2 border-b border-neutral-100">
                      <div className="pl-2 space-y-1.5">
                        {link.children?.map((child) => (
                          <Link
                            key={child.slug}
                            href={child.slug}
                            className="block p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-amber-400 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-neutral-950 font-bold text-xs">{child.name}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-semibold">
                                {child.tag}
                              </span>
                            </div>
                            <span className="block text-[11px] text-neutral-500 mt-1">
                              {child.desc}
                            </span>
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
                    className="block px-3 py-3 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2.5 pb-20">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSheetOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-amber-300 font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 border border-amber-500/40"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Check Real-Time Availability</span>
              </button>

              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 font-semibold text-xs"
              >
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <span>Chat on WhatsApp Management</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-200 text-neutral-800 font-semibold text-xs bg-[#FAFAFA]"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Call Manager: {siteConfig.contact.primaryPhone}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Connected Availability Drawer */}
      <BookingBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
