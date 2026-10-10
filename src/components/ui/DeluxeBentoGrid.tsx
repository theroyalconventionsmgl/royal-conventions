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
  Wifi,
  ChevronRight
} from "lucide-react";

export function DeluxeBentoGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Tile 1: Asymmetric 2x2 Large Span - Attached Deluxe Lodging Rooms (col-span-8) */}
        <div className="lg:col-span-8 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)] p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest font-mono">
                <Hotel className="w-3.5 h-3.5 text-amber-400" />
                <span>On-Campus Hospitality • Royal Banquet</span>
              </div>

              <span className="text-[11px] font-bold text-amber-300 bg-zinc-950/80 px-3.5 py-1 rounded-xl border border-amber-500/20 font-mono">
                8 Deluxe Guest Suites Attached
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-100 leading-tight">
              Attached Deluxe Lodging Suites
            </h3>
            <p className="text-xs sm:text-base text-zinc-400 mt-2 max-w-xl font-normal leading-relaxed">
              Step directly from your private air-conditioned suite into the banquet hall. Designed for host families, out-of-town elders, and early morning muhurtham preparations without transport friction.
            </p>

            {/* Room Image Showcase Banner */}
            <div className="relative mt-6 rounded-2xl overflow-hidden aspect-[16/8] border border-amber-500/20 group/img">
              <Image
                src="/images/deluxe-room-floral.jpg"
                alt="Deluxe Suite Bedroom"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                placeholder="blur"
                blurDataURL={OBSIDIAN_BLUR_DATA_URL}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-white">King &amp; Twin Executive Suites</span>
                  <button
                    type="button"
                    onClick={() => setSelectedImage("/images/deluxe-room-floral.jpg")}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Expand Photo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Spec Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/10 flex flex-col gap-1">
                <Hotel className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-zinc-200">King / Twin Beds</span>
                <span className="text-[10px] text-zinc-500">300-thread linens</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/10 flex flex-col gap-1">
                <Wind className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-zinc-200">Daikin Split AC</span>
                <span className="text-[10px] text-zinc-500">Individual remotes</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/10 flex flex-col gap-1">
                <Wifi className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-zinc-200">High-Speed Wi-Fi</span>
                <span className="text-[10px] text-zinc-500">Campus-wide coverage</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/10 flex flex-col gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-zinc-200">Kohler En-Suite</span>
                <span className="text-[10px] text-zinc-500">24/7 hot water</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/10 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-zinc-400 font-medium">
              Direct internal elevator &amp; private corridor access
            </span>

            <Link
              href="/accommodation"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors underline underline-offset-4"
            >
              <span>Explore accommodation policies &amp; tariffs</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>

        {/* Tile 2: Climate Control & Daikin AC Guarantees (col-span-4) */}
        <div className="lg:col-span-4 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)] p-6 sm:p-7 flex flex-col justify-between group hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest font-mono mb-3">
              <Wind className="w-3.5 h-3.5 text-amber-400" />
              <span>Climate Control</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-100">
              100% Centralized &amp; Split AC
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-normal leading-relaxed">
              State-of-the-art heavy industrial chillers and VRV multi-zone climate control ensuring cool, refreshing comfort even in peak Indian summers.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-zinc-950/70 border border-amber-500/10 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Heavy-duty industrial VRV chillers in halls</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Whisper-quiet Daikin split units in all suites</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Multi-zone thermal sensors across dining halls</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/10 mt-6 flex items-center justify-between text-xs text-zinc-400">
            <span>Summer-proof certified</span>
            <span className="text-amber-400 font-bold font-mono">100% Coverage</span>
          </div>
        </div>

        {/* Tile 3: 24/7 Power Backup & Security Specifications (col-span-5) */}
        <div className="lg:col-span-5 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)] p-6 sm:p-7 flex flex-col justify-between group hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest font-mono mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Zero-Break Power Grid</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-100">
              Twin Industrial DG Backup
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-normal leading-relaxed">
              Twin Cummins sound-attenuated industrial generators with automated transfer switches. Lighting, air-conditioning, and digital line arrays will not flicker during rituals.
            </p>

            <div className="grid grid-cols-2 gap-2.5 mt-5 text-center">
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-amber-500/10">
                <div className="font-serif text-lg font-bold text-amber-300">&lt; 1 Sec</div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold font-mono">Switchover Speed</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-amber-500/10">
                <div className="font-serif text-lg font-bold text-amber-300">Dual Substation</div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold font-mono">Feeder Redundancy</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/10 mt-6 flex items-center justify-between text-xs text-zinc-400">
            <span>Muhurtham continuity guaranteed</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
        </div>

        {/* Tile 4: Dedicated Green Rooms & Parking Capacity Details (col-span-7) */}
        <div className="lg:col-span-7 rounded-3xl bg-zinc-900 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)] p-6 sm:p-7 flex flex-col justify-between group hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest font-mono mb-3">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Transit &amp; Dressing Suites</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-100">
              350+ Car Paved Valet &amp; 4 Bridal Suites
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-normal leading-relaxed">
              Expansive paved parking bays accommodating guest cars and tour buses off Gowtham Buddha Road. Plus 4 opulent VIP bridal dressing lounges with full-length vanity mirrors.
            </p>

            <div className="grid grid-cols-3 gap-2.5 mt-5 text-center">
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-amber-500/10">
                <div className="font-serif text-xl font-bold text-amber-300">350+</div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold font-mono">Paved Car Bays</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-amber-500/10">
                <div className="font-serif text-xl font-bold text-amber-300">4 Suites</div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold font-mono">Bridal Green Rooms</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-amber-500/10">
                <div className="font-serif text-xl font-bold text-amber-300">Valet</div>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold font-mono">Marshals On Duty</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/10 mt-6 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Step-free wheelchair ramps and Schindler elevators throughout</span>
            <Link
              href="/facilities"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
            >
              <span>View Full Specs</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* High-Res Image Preview Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-zinc-950 border border-amber-500/30 rounded-3xl overflow-hidden p-3 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 transition-colors border border-amber-500/20"
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
              <h4 className="font-serif font-bold text-zinc-100 text-xl">Royal Banquet Deluxe Lodging Suite</h4>
              <p className="text-xs text-zinc-400 mt-1">Air-conditioned bedroom with attached vanity bathroom exclusively for host families.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
