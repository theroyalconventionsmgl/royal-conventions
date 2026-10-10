"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OBSIDIAN_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { siteConfig } from "@/config/site";
import BookingBottomSheet from "@/components/ui/BookingBottomSheet";
import { MessageSquare, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <section className="relative w-full min-h-[92vh] flex items-end justify-center bg-zinc-950 text-white overflow-hidden pt-28 pb-12 px-5">
        {/* Background image & Vignette overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/royal-convention-hero.jpg"
            alt="The Royal Conventions Mangalagiri — flagship convention campus"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL={OBSIDIAN_BLUR_DATA_URL}
          />
          {/* Multi-stage dark gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/30 z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-3xl mx-auto text-center">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
            Mangalagiri • Andhra Pradesh
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-zinc-100 tracking-tight leading-[1.15] drop-shadow-lg">
            Where Grandeur Meets{" "}
            <span className="italic font-normal text-amber-300">
              Unforgettable
            </span>{" "}
            Celebrations
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-xs sm:text-base text-zinc-300 font-light max-w-lg mx-auto leading-relaxed drop-shadow">
            {siteConfig.name} — Mangalagiri&rsquo;s premier 900-capacity multi-venue campus featuring pillarless halls, attached deluxe lodging suites, and flawless royal hospitality.
          </p>

          {/* Two distinct primary action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-center">
            {/* 1. Solid Gold: Check Availability & Dates */}
            <Link
              href="/check-availability"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-[0.15em] px-7 py-4 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all active:scale-95"
            >
              <span>Check Availability &amp; Dates →</span>
            </Link>

            {/* 2. Dark Glass: Chat on WhatsApp */}
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-zinc-900/80 border border-amber-500/30 hover:border-amber-500/50 hover:bg-zinc-800/90 text-amber-200 font-semibold text-xs uppercase tracking-[0.15em] px-7 py-4 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-green-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Connected Availability Drawer */}
      <BookingBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
