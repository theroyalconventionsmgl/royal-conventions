"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { siteConfig, VenueSpec } from "@/config/site";
import { FocusCards } from "@/components/ui/aceternity/FocusCards";
import BookingBottomSheet from "./BookingBottomSheet";

export default function VenueShowcase({ venues }: { venues: VenueSpec[] }) {
  const [selectedVenueId, setSelectedVenueId] = useState<string>("royal-convention");
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleCheckDates = (venueId: string) => {
    setSelectedVenueId(venueId);
    setSheetOpen(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFA] text-neutral-900 relative overflow-hidden border-b border-neutral-200">
      {/* Subtle Ambient Gold Glow in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-3 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>The 3 Signature Halls • 1 Physical Campus</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
              Curated Spaces for Every Milestone
            </h2>
            <p className="text-xs sm:text-base text-neutral-600 mt-3 font-normal leading-relaxed">
              Hover over each venue to focus on its architectural capacity, pillarless expanse, and attached lodging accommodations.
            </p>
            <p className="text-[11px] text-neutral-400 mt-1.5 lg:hidden">
              Swipe horizontally to explore each hall →
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 mt-6 sm:mt-0">
            <Link
              href="/halls"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-800 hover:text-amber-800 hover:border-amber-400 text-xs font-bold transition-all shadow-xs"
            >
              <span>Compare Hall Matrix</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </Link>
          </div>
        </div>

        {/* Aceternity Focus Cards Matrix */}
        <FocusCards 
          venues={venues} 
          onCheckDates={handleCheckDates} 
        />

        {/* Bottom Full Comparison Banner */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/halls"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-neutral-950 hover:bg-neutral-900 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-neutral-950/10"
          >
            <span>View Complete Side-by-Side Venue Comparison Matrix</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </div>

      {/* Connected Availability Drawer */}
      <BookingBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        defaultVenueId={selectedVenueId}
      />
    </section>
  );
}
