"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Utensils,
  Hotel,
  Calendar,
  Sparkles,
  MapPin,
  Layers,
  ExternalLink
} from "lucide-react";
import { VenueSpec } from "@/config/site";
import LuxuryImage from "./LuxuryImage";
import { VenueBlueprintModal } from "@/components/ui/vectors/VenueBlueprints";

interface VenueCardProps {
  venue: VenueSpec;
  featured?: boolean;
  onCheckDates?: (venueId: string) => void;
}

export default function VenueCard({ venue, featured = false, onCheckDates }: VenueCardProps) {
  const [blueprintOpen, setBlueprintOpen] = useState(false);

  return (
    <>
      <div
        className={`group relative rounded-3xl bg-slate-900 border transition-all duration-300 flex flex-col justify-between overflow-hidden h-full ${
          featured
            ? "border-amber-500/40 shadow-xl shadow-slate-300/60"
            : "border-slate-800 hover:border-amber-500/40 shadow-lg"
        }`}
      >
        {/* Featured Tag Badge */}
        {featured && (
          <div className="absolute top-3.5 right-3.5 z-20 bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Flagship Venue</span>
          </div>
        )}

        {/* TOP: Widescreen Media Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
          <LuxuryImage
            src={venue.heroImage}
            alt={venue.name}
            aspectRatio="aspect-[16/9]"
            category={venue.category}
            className="transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Badges in image corners */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
              {venue.category}
            </span>
          </div>
          <div className="absolute top-14 left-3.5 z-10">
            <span className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md border ${
              venue.acType === "Non-AC"
                ? "bg-slate-800/80 text-slate-300 border-slate-600"
                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
            }`}>
              {venue.acType ?? "Air Conditioned"}
            </span>
          </div>

          {/* Blueprint Trigger Button */}
          <button
            type="button"
            onClick={() => setBlueprintOpen(true)}
            className="absolute top-3.5 right-3.5 z-20 px-2.5 py-1 rounded-xl bg-slate-950/70 hover:bg-slate-950 text-slate-200 border border-white/10 backdrop-blur-md text-[10px] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Layers className="w-3 h-3 text-amber-400" />
            <span>View Blueprint</span>
          </button>
        </div>

        {/* BOTTOM: Card Content Body */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-1 group-hover:text-amber-400 transition-colors leading-snug">
              {venue.name}
            </h3>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              {venue.tagline}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {venue.shortDescription}
            </p>

            {/* Verified spec chips — only real, non-zero data */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 border border-slate-700 rounded-full px-2.5 py-1">
                <Users className="w-3 h-3 text-amber-400" />
                {venue.seatingCapacity.toLocaleString()} / {venue.floatingCapacity.toLocaleString()} guests
              </span>
              {venue.diningCapacity > 0 && (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 border border-slate-700 rounded-full px-2.5 py-1">
                  <Utensils className="w-3 h-3 text-amber-400" />
                  {venue.diningCapacity} dining
                </span>
              )}
              {venue.lodgingAttached && (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 border border-slate-700 rounded-full px-2.5 py-1">
                  <Hotel className="w-3 h-3 text-amber-400" />
                  Attached Suites
                </span>
              )}
            </div>

            <ul className="space-y-1.5 mb-6">
              {venue.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Dock */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => (onCheckDates ? onCheckDates(venue.id) : null)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Check Dates</span>
            </button>

            {venue.mapUrl && (
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in Google Maps"
                className="flex items-center justify-center gap-1.5 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold py-3.5 px-4 rounded-xl transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Location</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <Link
              href={`/${venue.slug}`}
              className="flex items-center justify-center gap-1.5 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold py-3.5 px-4 rounded-xl transition-all"
            >
              <span>Explore</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Architectural Blueprint Modal */}
      <VenueBlueprintModal
        venueSlug={venue.slug}
        isOpen={blueprintOpen}
        onClose={() => setBlueprintOpen(false)}
      />
    </>
  );
}
