"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { OBSIDIAN_BLUR_DATA_URL } from "@/lib/image-placeholder";
import { Users, Calendar, Hotel, MapPin, ExternalLink } from "lucide-react";
import { VenueSpec } from "@/config/site";

export const FocusCards = ({
  venues,
  onCheckDates
}: {
  venues: VenueSpec[];
  onCheckDates?: (venueId: string) => void;
}) => {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 no-scrollbar lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-7xl lg:mx-auto lg:px-0 lg:pb-0 lg:overflow-visible w-full">
      {venues.map((venue) => (
        <div
          key={venue.id}
          className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-auto lg:shrink rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all shadow-lg flex flex-col overflow-hidden group"
        >
          {/* TOP: Widescreen 16:9 media with badge overlays */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
            <Image
              src={venue.heroImage}
              alt={venue.name}
              fill
              sizes="(max-width: 1024px) 85vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              placeholder="blur"
          blurDataURL={OBSIDIAN_BLUR_DATA_URL}
        />
            <span className="absolute top-3.5 left-3.5 z-10 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
              {venue.category}
            </span>
            <span className={`absolute top-3.5 right-3.5 z-10 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md border ${
              venue.acType === "Non-AC"
                ? "bg-slate-800/80 text-slate-300 border-slate-600"
                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
            }`}>
              {venue.acType ?? "Air Conditioned"}
            </span>
            {venue.lodgingAttached && (
              <span className="absolute bottom-3.5 left-3.5 z-10 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500 text-slate-950">
                <Hotel className="w-3 h-3" />
                Attached Suites
              </span>
            )}
          </div>

          {/* BOTTOM: Content body */}
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

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 border border-slate-700 rounded-full px-2.5 py-1">
                  <Users className="w-3 h-3 text-amber-400" />
                  {venue.seatingCapacity.toLocaleString()} / {venue.floatingCapacity.toLocaleString()} guests
                </span>
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

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onCheckDates && onCheckDates(venue.id)}
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
      ))}
    </div>
  );
};
