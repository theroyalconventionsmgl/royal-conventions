"use client";

import { useState } from "react";
import Image from "next/image";
import { SOFT_BLUR_DATA_URL } from "@/lib/image-placeholder";

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

  return (
    <div
      className={`relative overflow-hidden bg-warm-cream ${aspectRatio} ${className}`}
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
          blurDataURL={SOFT_BLUR_DATA_URL}
        />
      ) : null}

      {/* Fallback graphic if image is loading or missing */}
      {(!imageLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-warm-cream">
          <div className="w-14 h-14 rounded-full border border-natural-sand flex items-center justify-center mb-3 bg-soft-sage/20">
            <svg
              className="w-7 h-7 text-deep-sage"
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
          <span className="text-[10px] tracking-[0.22em] text-deep-sage uppercase font-semibold">
            {category}
          </span>
          <p className="text-sm font-serif text-forest-charcoal mt-1 max-w-[240px] line-clamp-2">
            {alt}
          </p>
        </div>
      )}

      {/* Soft botanical gradient for overlaid labels */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-sage/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
