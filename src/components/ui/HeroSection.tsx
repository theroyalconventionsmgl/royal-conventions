"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OBSIDIAN_BLUR_DATA_URL } from "@/lib/image-placeholder";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import BookingBottomSheet from "@/components/ui/BookingBottomSheet";

export default function HeroSection() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] min-h-[600px] flex items-end justify-center bg-slate-950 text-white overflow-hidden">
      {/* Background High-Res Venue Image with Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/royal-convention-hero.jpg"
          alt="The Royal Conventions Mangalagiri — flagship convention hall"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL={OBSIDIAN_BLUR_DATA_URL}
        />
        {/* Editorial Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          {/* Gold Eyebrow Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Mangalagiri &bull; Andhra Pradesh
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] drop-shadow-md">
            Where Grandeur Meets <span className="text-amber-400 italic font-normal">Unforgettable</span> Celebrations
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-slate-200 font-sans text-base sm:text-xl font-normal leading-relaxed max-w-2xl drop-shadow">
            {siteConfig.name} &mdash; Mangalagiri&rsquo;s premier 900-capacity convention destination for royal weddings, grand receptions, and executive summits.
          </p>

          {/* High-Contrast Action Triggers */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-expanded={sheetOpen}
              aria-controls="mobile-availability-sheet"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans text-xs uppercase tracking-[0.15em] font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-amber-500/20 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Check Availability &amp; Dates
            </button>
            <Link
              href="/halls"
              className="border border-white/30 hover:bg-white/10 text-white font-sans text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 rounded-full backdrop-blur-md transition-all text-center"
            >
              Explore 3 Venue Halls &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick-Stats Bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/10 bg-slate-950/60 backdrop-blur-xl hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-3 divide-x divide-white/10 text-center">
          <div>
            <div className="text-amber-400 font-serif text-lg font-bold">900 Guest Capacity</div>
            <div className="text-slate-400 text-xs font-sans uppercase tracking-wider">Flagship Royal Convention</div>
          </div>
          <div>
            <div className="text-amber-400 font-serif text-lg font-bold">250 Cars &amp; 350 Bikes</div>
            <div className="text-slate-400 text-xs font-sans uppercase tracking-wider">Private Campus Parking</div>
          </div>
          <div>
            <div className="text-amber-400 font-serif text-lg font-bold">100% Zero-Break Power</div>
            <div className="text-slate-400 text-xs font-sans uppercase tracking-wider">Twin Heavy Genset Backup</div>
          </div>
        </div>
      </div>

      {/* Connected Availability Drawer */}
      <BookingBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </section>
  );
}
