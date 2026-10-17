"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Calendar,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hallsDropdownOpen, setHallsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setHallsDropdownOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Our Venues",
      href: "/halls",
      hasDropdown: true,
      children: [
        { name: "Royal Convention", slug: "/royal-convention", desc: "Flagship 900-seat pillarless auditorium" },
        { name: "Vaishnavi Vaidehi", slug: "/vaishnavi-vaidehi", desc: "Grand 650-seat AC hall" },
        { name: "Smt. Nannapaneni Lakshmi Function Hall", slug: "/nannapaneni-lakshmi", desc: "Traditional ceremonial hall · 150 seats" },
        { name: "Royal Banquets", slug: "/royal-banquets", desc: "Contemporary AC banquet + 8 suites" },
        { name: "Compare All Venues", slug: "/halls", desc: "Side-by-side venue overview" },
      ],
    },
    { label: "Guest Suites", href: "/accommodation" },
    { label: "Facilities", href: "/facilities" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ];

  const hallsActive =
    pathname.startsWith("/royal-") ||
    pathname === "/halls" ||
    pathname === "/vaishnavi-vaidehi" ||
    pathname === "/nannapaneni-lakshmi";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2.5 bg-warm-cream/95 backdrop-blur-md shadow-sm border-b border-natural-sand"
            : "py-4 sm:py-5 bg-warm-cream/80 backdrop-blur-sm border-b border-natural-sand/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Official brand logo + wordmark */}
            <Link
              href="/"
              onClick={closeMenus}
              className="flex min-w-0 items-center gap-2 sm:gap-3 group"
              aria-label="The Royal Conventions Home"
            >
              <span className="relative block h-9 w-9 sm:h-[52px] sm:w-[52px] rounded-xl sm:rounded-2xl overflow-hidden ring-1 ring-natural-sand shadow-xs shrink-0 bg-black">
                <Image
                  src={siteConfig.logo}
                  alt="The Royal Conventions emblem"
                  fill
                  sizes="(max-width: 640px) 36px, 52px"
                  className="object-contain"
                  priority
                />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-serif text-[11px] min-[380px]:text-[12px] sm:text-xl font-bold tracking-tight text-deep-sage leading-tight">
                  THE ROYAL CONVENTIONS
                </span>
                <span className="hidden text-[10px] uppercase tracking-[0.22em] text-forest-charcoal/70 font-sans mt-1 sm:block">
                  Mangalagiri · AP
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (xl+: below that the drawer keeps every
                destination reachable instead of clipping the links) */}
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = link.hasDropdown ? hallsActive : pathname === link.href;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setHallsDropdownOpen(true)}
                      onMouseLeave={() => setHallsDropdownOpen(false)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                          setHallsDropdownOpen(false);
                        }
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setHallsDropdownOpen((open) => !open)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setHallsDropdownOpen(false);
                        }}
                        aria-expanded={hallsDropdownOpen}
                        aria-haspopup="true"
                        className={`px-2.5 py-2 text-[13px] font-medium rounded-full transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                          isActive
                            ? "text-deep-sage font-semibold bg-soft-sage/20"
                            : "text-forest-charcoal hover:text-deep-sage hover:bg-soft-sage/15"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </button>

                      <AnimatePresence>
                        {hallsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-0 w-80 pt-2 z-50"
                          >
                            <div className="bg-white rounded-2xl shadow-xl border border-natural-sand p-2 space-y-1">
                              {link.children?.map((child) => (
                                <Link
                                  key={child.slug}
                                  href={child.slug}
                                  onClick={closeMenus}
                                  className="block p-3 rounded-xl hover:bg-warm-cream transition-colors group/item"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-deep-sage group-hover/item:translate-x-0.5 transition-transform">
                                      {child.name}
                                    </span>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-soft-sage group-hover/item:text-deep-sage" />
                                  </div>
                                  <p className="text-[12px] text-forest-charcoal/70 mt-0.5">
                                    {child.desc}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 py-2 text-[13px] font-medium rounded-full transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-deep-sage font-semibold bg-soft-sage/20"
                        : "text-forest-charcoal hover:text-deep-sage hover:bg-soft-sage/15"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden xl:flex items-center gap-3">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-natural-sand text-[13px] font-medium text-deep-sage hover:bg-white transition-colors"
                aria-label="WhatsApp enquiry"
              >
                <MessageSquare className="w-3.5 h-3.5 text-deep-sage" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/check-availability"
                className="inline-flex items-center gap-2 bg-deep-sage text-pure-white hover:bg-[#1E372B] px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all shadow-sm shadow-deep-sage/20 hover:shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Check Dates</span>
              </Link>
            </div>

            {/* Mobile Actions: compact Dates CTA + Menu Toggle */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 xl:hidden">
              <Link
                href="/check-availability"
                onClick={closeMenus}
                aria-label="Check date availability"
                className="inline-flex items-center gap-1.5 bg-deep-sage text-pure-white px-2.5 sm:px-3.5 py-2 rounded-full text-[11px] sm:text-[12px] font-semibold min-h-[44px] whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Check Dates</span>
                <span className="sm:hidden">Dates</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-deep-sage border border-natural-sand bg-white/70 hover:bg-white transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-[45] bg-warm-cream/98 backdrop-blur-xl xl:hidden flex flex-col pt-20 px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto"
          >
            <div className="py-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-deep-sage/75 font-semibold mb-2">
                The Royal Conventions
              </p>
            </div>

            <div className="space-y-1 divide-y divide-natural-sand/60">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.label} className="pt-2 pb-3">
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-forest-charcoal/60 px-2 mb-2">
                        Venues on Campus
                      </p>
                      <div className="space-y-1 pl-2">
                        {link.children?.map((child) => (
                          <Link
                            key={child.slug}
                            href={child.slug}
                            onClick={closeMenus}
                            className="flex min-h-[44px] items-center py-2 text-[15px] font-semibold text-deep-sage hover:translate-x-1 transition-transform"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={link.href} className="py-2">
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className="flex min-h-[44px] items-center py-2 text-[17px] font-medium text-forest-charcoal hover:text-deep-sage transition-colors"
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Mobile Contact Quick Actions */}
            <div className="mt-auto pt-6 border-t border-natural-sand space-y-3">
              <Link
                href="/check-availability"
                onClick={closeMenus}
                className="w-full inline-flex items-center justify-center gap-2 bg-deep-sage text-pure-white font-semibold text-sm py-3.5 rounded-full shadow-md min-h-[48px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Enquire Date Availability</span>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center gap-1.5 border border-natural-sand bg-white text-forest-charcoal font-medium text-[13px] py-3 rounded-full min-h-[48px]"
                >
                  <Phone className="w-4 h-4 text-deep-sage" />
                  <span>Call Us</span>
                </a>
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 border border-natural-sand bg-white text-forest-charcoal font-medium text-[13px] py-3 rounded-full min-h-[48px]"
                >
                  <MessageSquare className="w-4 h-4 text-deep-sage" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
