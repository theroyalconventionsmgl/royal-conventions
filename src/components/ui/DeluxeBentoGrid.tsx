"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OBSIDIAN_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { 
  Hotel, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  X, 
  Layers,
  Wind,
  Zap,
  Car,
  Sparkles,
  Wifi,
  ChevronRight
} from "lucide-react";

export function DeluxeBentoGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Tile 1: Asymmetric 2x2 Large Span - Attached Deluxe Lodging Rooms (col-span-8) */}
        <div className="lg:col-span-8 rounded-3xl bg-white border border-neutral-200 p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/60 hover:shadow-xl transition-all shadow-xs">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/30 rounded-full blur-[100px] pointer-events-none" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-[10px] font-bold uppercase tracking-widest">
                <Hotel className="w-3.5 h-3.5 text-amber-600" />
                <span>On-Campus Hospitality • Royal Banquet</span>
              </div>

              <span className="text-[11px] font-bold text-neutral-800 bg-[#F4F4F5] px-3.5 py-1 rounded-xl border border-neutral-200">
                8 Deluxe Guest Suites Attached
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-950 leading-tight">
              Attached Deluxe Lodging Suites
            </h3>
            <p className="text-xs sm:text-base text-neutral-600 mt-2 max-w-xl font-normal leading-relaxed">
              Step directly from your private air-conditioned suite into the banquet hall. Designed for host families, out-of-town elders, and early morning muhurtham preparations without transport friction.
            </p>

            {/* Room Image Showcase Banner */}
            <div className="relative mt-6 rounded-2xl overflow-hidden aspect-[16/8] border border-neutral-200 group/img">
              <Image
                src="/images/deluxe-room-floral.jpg"
                alt="Deluxe Suite Bedroom"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                placeholder="blur"
          blurDataURL={OBSIDIAN_BLUR_DATA_URL}
        />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-white">King & Twin Executive Suites</span>
                  <button
                    type="button"
                    onClick={() => setSelectedImage("/images/deluxe-room-floral.jpg")}
                    className="px-3 py-1 rounded-lg bg-white/90 text-neutral-950 text-[11px] font-bold flex items-center gap-1.5 shadow-sm hover:bg-white transition-all"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Expand Photo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Spec Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 flex flex-col gap-1">
                <Hotel className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-950">King / Twin Beds</span>
                <span className="text-[10px] text-neutral-500">300-thread linens</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 flex flex-col gap-1">
                <Wind className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-950">Daikin Split AC</span>
                <span className="text-[10px] text-neutral-500">Individual remotes</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 flex flex-col gap-1">
                <Wifi className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-950">High-Speed Wi-Fi</span>
                <span className="text-[10px] text-neutral-500">Campus-wide coverage</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 flex flex-col gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-neutral-950">Kohler En-Suite</span>
                <span className="text-[10px] text-neutral-500">24/7 solar + geyser water</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-neutral-500 font-medium">
              Direct internal elevator & private corridor access
            </span>

            <Link
              href="/accommodation"
              className="text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors underline underline-offset-4"
            >
              <span>Explore accommodation policies & tariffs</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </Link>
          </div>
        </div>

        {/* Tile 2: Climate Control & Daikin AC Guarantees (col-span-4) */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-neutral-200 p-6 sm:p-7 flex flex-col justify-between group hover:border-amber-400/60 hover:shadow-xl transition-all shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Wind className="w-3.5 h-3.5 text-amber-600" />
              <span>Climate Control</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
              100% Centralized & Split AC
            </h3>
            <p className="text-xs text-neutral-600 mt-2 font-normal leading-relaxed">
              State-of-the-art heavy industrial chillers and VRV multi-zone climate control ensuring cool, refreshing comfort even in peak Indian summers.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-[#FAFAFA] border border-neutral-200 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-neutral-800">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Heavy-duty industrial VRV chillers in halls</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-800">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Whisper-quiet Daikin split units in all suites</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-800">
                <Check className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Multi-zone thermal sensors across dining halls</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 mt-6 flex items-center justify-between text-xs text-neutral-500">
            <span>Summer-proof certified</span>
            <span className="text-amber-800 font-bold">100% Coverage</span>
          </div>
        </div>

        {/* Tile 3: 24/7 Power Backup & Security Specifications (col-span-5) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-neutral-200 p-6 sm:p-7 flex flex-col justify-between group hover:border-amber-400/60 hover:shadow-xl transition-all shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Zero-Break Power Grid</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
              Twin Industrial DG Backup
            </h3>
            <p className="text-xs text-neutral-600 mt-2 font-normal leading-relaxed">
              Twin Cummins sound-attenuated industrial generators with automated transfer switches. Lighting, air-conditioning, and digital line arrays will not flicker during rituals.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-5 text-center">
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-neutral-200">
                <div className="font-serif text-lg font-bold text-neutral-950">&lt; 1 Sec</div>
                <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Switchover Speed</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-neutral-200">
                <div className="font-serif text-lg font-bold text-neutral-950">Dual Substation</div>
                <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Feeder Redundancy</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 mt-6 flex items-center justify-between text-xs text-neutral-500">
            <span>Muhurtham continuity guaranteed</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
        </div>

        {/* Tile 4: Dedicated Green Rooms & Parking Capacity Details (col-span-7) */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-neutral-200 p-6 sm:p-7 flex flex-col justify-between group hover:border-amber-400/60 hover:shadow-xl transition-all shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Car className="w-3.5 h-3.5 text-amber-600" />
              <span>Campus Transit & Dressing Suites</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
              350+ Car Paved Valet & 4 Bridal Suites
            </h3>
            <p className="text-xs text-neutral-600 mt-2 font-normal leading-relaxed">
              Expansive paved parking bays accommodating guest cars and tour buses off Gowtham Buddha Road. Plus 4 opulent VIP bridal dressing lounges with full-length vanity mirrors.
            </p>

            <div className="grid grid-cols-3 gap-2.5 mt-5 text-center">
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-neutral-200">
                <div className="font-serif text-xl font-bold text-neutral-950">350+</div>
                <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Paved Car Bays</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-neutral-200">
                <div className="font-serif text-xl font-bold text-neutral-950">4 Suites</div>
                <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Bridal Green Rooms</div>
              </div>
              <div className="p-3 rounded-xl bg-[#FAFAFA] border border-neutral-200">
                <div className="font-serif text-xl font-bold text-neutral-950">Valet</div>
                <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Marshals On Duty</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-200 mt-6 flex items-center justify-between">
            <span className="text-xs text-neutral-500">Step-free wheelchair ramps and Schindler elevators throughout</span>
            <Link
              href="/facilities"
              className="text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 transition-colors"
            >
              <span>View Full Specs</span>
              <ChevronRight className="w-4 h-4 text-amber-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* High-Res Image Preview Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-white border border-neutral-200 rounded-3xl overflow-hidden p-3 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-neutral-950/80 text-white hover:bg-neutral-900 transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
              <Image
                src={selectedImage}
                alt="Deluxe Suite Preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 text-center">
              <h4 className="font-serif font-bold text-neutral-950 text-xl">Royal Banquet Deluxe Lodging Suite</h4>
              <p className="text-xs text-neutral-600 mt-1">Air-conditioned bedroom with attached vanity bathroom exclusively for host families.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
