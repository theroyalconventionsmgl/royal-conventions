"use client";

import Link from "next/link";
import { Users, Utensils, BedDouble, ArrowUpRight, Sparkles } from "lucide-react";
import { VenueSpec } from "@/config/site";
import LuxuryImage from "./LuxuryImage";
import { motion } from "framer-motion";

interface VenueCardProps {
  venue: VenueSpec;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-pure-white rounded-3xl border border-natural-sand/80 overflow-hidden flex flex-col hover:border-soft-sage hover:shadow-xl hover:shadow-deep-sage/5 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <LuxuryImage
          src={venue.heroImage}
          alt={venue.name}
          aspectRatio="aspect-[16/10] sm:aspect-[4/3]"
          category={venue.category}
          className="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warm-cream/95 backdrop-blur-md border border-natural-sand/70 text-deep-sage text-[11px] font-semibold tracking-wide uppercase shadow-xs">
          <Sparkles className="w-3 h-3 text-deep-sage" />
          <span>{venue.acType ?? "Air Conditioned"}</span>
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-deep-sage/90">
              {venue.category}
            </p>
            <span className="text-xs text-forest-charcoal/60 font-sans">
              Mangalagiri Campus
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-[26px] text-deep-sage mt-2 leading-snug font-normal">
            {venue.name}
          </h3>

          <p className="text-[14px] text-forest-charcoal/80 leading-relaxed mt-2.5 line-clamp-2 font-sans">
            {venue.shortDescription}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t border-natural-sand/50 text-[13px] text-forest-charcoal/85">
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-deep-sage" />
              <span>Up to <strong>{venue.floatingCapacity.toLocaleString()}</strong> guests</span>
            </span>
            {venue.diningCapacity > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-deep-sage" />
                <span><strong>{venue.diningCapacity.toLocaleString()}</strong> dining</span>
              </span>
            )}
            {venue.lodgingAttached && (
              <span className="inline-flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-deep-sage" />
                <span>Guest suites attached</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2.5 mt-6 pt-5 border-t border-natural-sand/60">
          <Link
            href={`/${venue.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-deep-sage text-pure-white text-sm font-semibold py-3 px-4 rounded-full hover:bg-forest-charcoal active:scale-[0.99] transition-all min-h-[48px] shadow-xs"
          >
            <span>View Venue</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href={`/check-availability?venue=${venue.id}`}
            className="flex-1 inline-flex items-center justify-center border border-deep-sage/40 text-deep-sage text-sm font-semibold py-3 px-4 rounded-full hover:bg-soft-sage/20 active:scale-[0.99] transition-all min-h-[48px]"
          >
            <span>Enquire</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
