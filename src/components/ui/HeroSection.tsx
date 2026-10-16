"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import { SOFT_BLUR_DATA_URL } from "@/lib/image-placeholder";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92svh] lg:min-h-[96svh] flex items-end overflow-hidden bg-warm-cream"
    >
      {/* Background with Parallax image & botanical luxury gradient */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : imageY,
          scale: shouldReduceMotion ? 1 : imageScale,
        }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/royal-convention-hero.jpg"
          alt="The Royal Conventions — Grand wedding venue and celebration halls in Mangalagiri"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL={SOFT_BLUR_DATA_URL}
        />
        {/* Refined botanical dual gradient overlay: preserves photo clarity while maintaining high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-sage/95 via-deep-sage/55 to-deep-sage/20 sm:from-deep-sage/90 sm:via-deep-sage/40 sm:to-transparent" />
        <div className="absolute inset-0 bg-radial-[at_bottom_left] from-deep-sage/80 via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Decorative subtle botanical line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-soft-sage/40 to-transparent" />

      {/* Content Container */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : textY,
          opacity: shouldReduceMotion ? 1 : opacity,
        }}
        className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 pb-14 sm:pb-20 pt-36 sm:pt-44 text-warm-cream"
      >
        <div className="max-w-3xl">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-cream/15 backdrop-blur-md border border-warm-cream/25 text-warm-cream text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-soft-sage" />
            <span>The Royal Conventions · Mangalagiri</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] mt-4 font-normal tracking-tight text-pure-white text-balance"
          >
            A beautiful setting for life&rsquo;s most meaningful celebrations.
          </motion.h1>

          {/* Supporting Text */}
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg text-warm-cream/90 max-w-xl leading-relaxed font-sans">
            Discover thoughtfully designed venues for weddings, receptions, and special gatherings. Four distinctive halls, 8 luxury guest suites, and dedicated on-site hospitality on a single unified campus.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md sm:max-w-none">
            <Link
              href="#venues"
              className="inline-flex items-center justify-center gap-2.5 bg-pure-white text-deep-sage hover:bg-warm-cream font-semibold text-[15px] px-7 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99] min-h-[52px]"
            >
              <span>Explore Our Venues</span>
              <ArrowUpRight className="w-4 h-4 text-deep-sage" />
            </Link>

            <Link
              href="/check-availability"
              className="inline-flex items-center justify-center gap-2.5 bg-deep-sage/40 hover:bg-deep-sage/60 backdrop-blur-md text-warm-cream border border-warm-cream/40 hover:border-warm-cream font-medium text-[15px] px-7 py-4 rounded-full transition-all duration-300 active:scale-[0.99] min-h-[52px]"
            >
              <Calendar className="w-4 h-4 text-soft-sage" />
              <span>Enquire About Availability</span>
            </Link>
          </div>
        </div>

        {/* Quick Highlights Strip at bottom */}
        <div className="mt-12 pt-6 border-t border-warm-cream/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-warm-cream/90 text-xs sm:text-sm font-sans">
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-pure-white">4 Venues</div>
            <div className="text-warm-cream/75 text-[11px] sm:text-xs">150 to 900 Guest Capacity</div>
          </div>
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-pure-white">8 Suites</div>
            <div className="text-warm-cream/75 text-[11px] sm:text-xs">Air-Conditioned Stay</div>
          </div>
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-pure-white">Mangalagiri</div>
            <div className="text-warm-cream/75 text-[11px] sm:text-xs">Vijayawada–Guntur Highway</div>
          </div>
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-pure-white">Single Campus</div>
            <div className="text-warm-cream/75 text-[11px] sm:text-xs">Indoor & Outdoor Spaces</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
