"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { HeroGlobe, useIsMobile } from "./hero-globe";
import { ShootingStars } from "./shooting-stars";
import { StarsBackground } from "./stars-background";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section className="relative isolate min-h-[90svh] overflow-hidden bg-black pt-28 sm:pt-32">
      {/* 1. Pure black space base (no tinted radial glow) */}
      <div aria-hidden="true" className="absolute inset-0 bg-black" />

      {/* 2. Full-section star field: twinkling by default, static under
          reduced motion, lighter density on mobile GPUs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <StarsBackground
          starDensity={isMobile ? 0.00008 : 0.00013}
          allStarsTwinkle={!reduceMotion}
          twinkleProbability={reduceMotion ? 0 : 0.7}
          className="pointer-events-none"
        />
      </div>

      {/* 3. Large transparent 3D globe, oversized and cropped for cinematic scale.
          Desktop: biased right so the disc sits behind the enquiry card,
          leaving the headline over open space. Mobile/tablet: centered. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[135%] min-h-[620px] w-auto -translate-x-1/2 -translate-y-1/2 sm:h-[150%] lg:left-[64%] lg:top-[54%]"
      >
        <HeroGlobe
          className="h-full w-full"
          config={{
            radius: 2,
            bumpScale: 1.2,
            autoRotateSpeed: reduceMotion ? 0 : 0.18,
            enableZoom: false,
            enablePan: false,
            backgroundColor: null,
            ambientIntensity: 0.7,
            pointLightIntensity: 1.0,
          }}
        />
      </div>

      {/* 4. Shooting stars across the whole hero (occasional, elegant;
          gentler cadence on mobile) */}
      {!reduceMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <ShootingStars
            starColor="#F5F0E5"
            trailColor="#7BC9A5"
            minSpeed={8}
            maxSpeed={26}
            minDelay={isMobile ? 3000 : 1800}
            maxDelay={isMobile ? 8000 : 6000}
            starWidth={12}
            className="pointer-events-none"
          />
        </div>
      )}

      {/* 5. Contrast scrims for text legibility (directional only, no rings) */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/45" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(90svh-7rem)] max-w-7xl items-end gap-12 px-5 pb-10 pt-16 sm:px-8 sm:pb-14 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:gap-16 lg:pb-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl text-white"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5f0e5] backdrop-blur-md sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#c6d5bd]" />
            Celebrations, thoughtfully hosted
          </div>
          <h1 className="max-w-3xl font-serif text-[clamp(2.8rem,7vw,6.2rem)] font-normal leading-[.98] tracking-[-.045em] text-balance">
            Make room for
            <span className="mt-1 block italic text-[#d9e4d1]">your most meaningful</span>
            celebrations.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:mt-7 sm:text-lg sm:leading-8">
            Discover distinctive venues for weddings, receptions and family gatherings at The Royal Conventions in Mangalagiri. Find the space that feels right for your occasion.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="#venues"
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#f6f2e8] px-7 py-4 text-sm font-semibold text-[#294c3b] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore the venues <ArrowDownRight className="h-4 w-4" />
            </Link>
            <Link
              href="/check-availability"
              className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/50 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <CalendarDays className="h-4 w-4" /> Enquire about a date
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-2 text-sm text-white/75">
            <MapPin className="h-4 w-4 text-[#d9e4d1]" />
            Mangalagiri, Andhra Pradesh
          </div>
        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.18 }}
          className="hidden lg:block"
        >
          <div className="ml-auto max-w-sm rounded-[2rem] border border-white/25 bg-[#f6f2e8]/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl xl:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#667d67]">A place for every gathering</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#294c3b]">Find the right setting.</h2>
            <p className="mt-3 text-sm leading-6 text-[#53594f]">Explore the venue details, view genuine photographs and contact our team to discuss your preferred date.</p>
            <div className="my-6 h-px bg-[#d9cdb8]" />
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#294c3b]">Venue collection</p>
                  <p className="mt-1 text-xs leading-5 text-[#667064]">Compare available hall options</p>
                </div>
                <span className="rounded-full bg-[#e4eadf] px-3 py-1 text-xs font-semibold text-[#294c3b]">Explore</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#294c3b]">Personal enquiry</p>
                  <p className="mt-1 text-xs leading-5 text-[#667064]">Discuss dates and requirements</p>
                </div>
                <span className="rounded-full bg-[#e4eadf] px-3 py-1 text-xs font-semibold text-[#294c3b]">Connect</span>
              </div>
            </div>
            <Link href="/halls" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#294c3b] transition hover:gap-3">
              Compare our venues <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.aside>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </section>
  );
}
