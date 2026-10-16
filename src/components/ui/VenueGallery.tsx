"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import LuxuryImage from "./LuxuryImage";

interface GalleryImage {
  url: string;
  caption: string;
  category: string;
}

export default function VenueGallery({
  images,
  venueName,
}: {
  images: GalleryImage[];
  venueName: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => (a === null ? a : (a + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active !== null ? images[active] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, idx) => (
          <figure
            key={img.url}
            className="rounded-3xl overflow-hidden border border-natural-sand bg-pure-white shadow-xs"
          >
            <button
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`View larger photo: ${img.caption}`}
              className="block w-full text-left group cursor-zoom-in"
            >
              <span className="block relative">
                <LuxuryImage
                  src={img.url}
                  alt={img.caption}
                  aspectRatio="aspect-[4/3]"
                  category={img.category}
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-forest-charcoal/70 text-pure-white text-[11px] font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                  <Expand className="w-3 h-3" />
                  View
                </span>
              </span>
            </button>
            <figcaption className="px-4 py-3 text-xs text-forest-charcoal/75 font-sans">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${venueName} photo viewer: ${current.caption}`}
            onClick={close}
            className="fixed inset-0 z-[60] bg-forest-charcoal/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <div
              className="relative w-full max-w-5xl bg-pure-white rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-warm-cream">
                <Image
                  src={current.url}
                  alt={current.caption}
                  fill
                  sizes="(max-width: 1024px) 95vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-natural-sand">
                <p className="text-sm text-forest-charcoal/85 font-sans">
                  {current.caption}
                  {images.length > 1 && (
                    <span className="text-forest-charcoal/55"> · {(active ?? 0) + 1} of {images.length}</span>
                  )}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => step(-1)}
                        aria-label="Previous photo"
                        className="w-11 h-11 rounded-full border border-natural-sand flex items-center justify-center text-deep-sage hover:bg-warm-cream transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => step(1)}
                        aria-label="Next photo"
                        className="w-11 h-11 rounded-full border border-natural-sand flex items-center justify-center text-deep-sage hover:bg-warm-cream transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={close}
                    autoFocus
                    aria-label="Close photo viewer"
                    className="h-11 px-5 rounded-full bg-deep-sage text-pure-white text-sm font-semibold hover:bg-forest-charcoal transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close photo viewer"
                className="absolute top-3 right-3 w-11 h-11 rounded-full bg-forest-charcoal/70 text-pure-white backdrop-blur-sm flex items-center justify-center hover:bg-forest-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
