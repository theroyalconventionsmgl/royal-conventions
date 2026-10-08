"use client";

import { useState } from "react";
import Image from "next/image";
import { OBSIDIAN_BLUR_DATA_URL } from "@/lib/image-placeholder";

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
  category?: string;
}

export default function LuxuryImage({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[16/10]",
  priority = false,
  category = "The Royal Conventions",
}: LuxuryImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Elegant fallback architectural visual when asset is loading or missing
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#1E1E1E] via-[#2A241C] to-[#121212] ${aspectRatio} ${className}`}
    >
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setHasError(true)}
          placeholder="blur"
          blurDataURL={OBSIDIAN_BLUR_DATA_URL}
        />
      ) : null}

      {/* Luxury architectural fallback graphic if image path doesn't exist yet */}
      {(!imageLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-[#1A1A1A] via-[#2A2318] to-[#181818]">
          <div className="w-14 h-14 rounded-full border border-[#C5A059]/40 flex items-center justify-center mb-3 bg-[#C5A059]/10">
            <svg
              className="w-7 h-7 text-[#DFCA95]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
            {category}
          </span>
          <p className="text-xs font-serif text-zinc-200 mt-1 max-w-[240px] font-semibold line-clamp-2">
            {alt}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[9px] text-[#DFCA95]/80 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
            Verified Campus Asset
          </div>
        </div>
      )}

      {/* Subtle luxury vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
