import React from "react";
import { Heart, Sparkles } from "lucide-react";

export default function LegacyTribute() {
  return (
    <section className="py-16 sm:py-24 bg-zinc-950 text-zinc-100 relative overflow-hidden border-t border-amber-500/20">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Amber monogram emblem / heart icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.1)] mb-5">
          <Heart className="w-6 h-6 text-amber-400 fill-amber-400/20" />
        </div>

        {/* Tribute Header */}
        <div className="space-y-1.5 mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-amber-200 tracking-wide font-bold">
            Late Smt. Nannapaneni Lakshmi
          </h2>
          <p className="text-xs text-amber-400/80 uppercase font-mono tracking-widest">
            Founder&rsquo;s Beloved Wife &amp; Guiding Light
          </p>
        </div>

        {/* Centered Gold-Bordered Quote Block */}
        <div className="max-w-2xl mx-auto bg-zinc-950/80 border border-amber-500/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.05)]">
          <blockquote className="italic font-serif text-zinc-300 text-sm sm:text-base leading-relaxed">
            &ldquo;Her vision of warmth, selfless hospitality, and togetherness forms the soul of The Royal Conventions. Every dream realized across our campus is dedicated to her memory.&rdquo;
          </blockquote>

          <div className="mt-4 pt-4 border-t border-amber-500/10 flex items-center justify-center gap-2 text-[11px] font-mono tracking-wider uppercase text-amber-400/70">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Forever Cherished • In Eternal Reverence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
