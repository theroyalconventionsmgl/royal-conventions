"use client";

import React from "react";
import Link from "next/link";
import { 
  Hotel, 
  Wind, 
  Zap, 
  Car, 
  Utensils, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-2xl transition duration-300 p-6 bg-[#F8F9FA] border border-slate-200 hover:border-amber-500/30 justify-between flex flex-col space-y-4 relative overflow-hidden",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200 relative z-20">
        <div className="flex items-center gap-2 text-amber-700 mb-2">{icon}</div>
        <div className="font-serif font-bold text-slate-900 text-lg sm:text-xl group-hover/bento:text-amber-700 transition-colors">
          {title}
        </div>
        <div className="font-normal text-slate-500 text-xs mt-1.5 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};

export function FacilitiesBentoSection() {
  return (
    <BentoGrid>
      {/* Box 1 (Large - col-span-2): Attached Deluxe Lodging Rooms */}
      <div className="md:col-span-2 row-span-1 rounded-3xl group/bento hover:shadow-2xl transition duration-300 p-6 sm:p-8 bg-[#F8F9FA] border border-slate-200 hover:border-amber-500/30 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-500/20">
              Exclusive Campus Lodging
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              8 Attached Deluxe Guest Suites
            </h3>
            <p className="text-xs text-slate-500 max-w-md">
              Connected directly to the Royal Banquet corridor. Zero travel stress for early morning muhurthams and wedding elders.
            </p>
          </div>

          <Link
            href="/accommodation"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-slate-900 text-amber-700 border border-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>View Suites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Room previews & features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <div className="p-4 rounded-2xl bg-white/60 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Deluxe King Suites</div>
              <div className="text-[11px] text-slate-500">King bed + Daikin AC + Kohler en-suite</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">24/7 Hot Water & Power</div>
              <div className="text-[11px] text-slate-500">Continuous solar + DG generator support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Box 2: 100% AC & Zero-Break Generator Power Backup */}
      <BentoGridItem
        title="Zero-Break Power & Centralized AC"
        description="Twin Caterpillar/Cummins heavy DG generators with instant auto-switchover. Industrial VRV climate chillers maintain refreshing comfort throughout."
        icon={<Zap className="w-5 h-5 text-amber-700" />}
        header={
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            100% Guaranteed Continuity
          </div>
        }
      />

      {/* Box 3: 350+ Car Valet Parking & Green Rooms */}
      <BentoGridItem
        title="350+ Car Paved Parking & Valet"
        description="Vast paved on-campus parking bays with dedicated traffic marshals and optional valet drivers. 4 opulent executive bridal vanity suites."
        icon={<Car className="w-5 h-5 text-amber-700" />}
        header={
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Campus Infrastructure
          </div>
        }
      />

      {/* Box 4 (col-span-2): Mega Dining & Live Catering Hall */}
      <div className="md:col-span-2 row-span-1 rounded-3xl group/bento hover:shadow-2xl transition duration-300 p-6 sm:p-8 bg-[#F8F9FA] border border-slate-200 hover:border-amber-500/30 flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-700 mb-2">
              <Utensils className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                Culinary Grandeur
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover/bento:text-amber-700 transition-colors">
              Dedicated 10,000 Sq.Ft. Dining & Live Kitchens
            </h3>
            <p className="text-xs text-slate-500 max-w-lg mt-2 leading-relaxed">
              Separate banquet dining hall seating up to 900 guests simultaneously. Outfitted with high-capacity gas banks, stainless prep stations, and pure RO mineral water plants.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 relative z-10 text-center">
          <div className="p-2.5 rounded-xl bg-white/60 border border-slate-200">
            <div className="font-serif text-xl font-bold text-slate-900">900</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Simultaneous Seats</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/60 border border-slate-200">
            <div className="font-serif text-xl font-bold text-slate-900">100%</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">RO Mineral Water</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/60 border border-slate-200">
            <div className="font-serif text-xl font-bold text-slate-900">Live</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Catering Ready</div>
          </div>
        </div>
      </div>
    </BentoGrid>
  );
}
