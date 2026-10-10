"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "Stages" | "Dining" | "Suites" | "Campus";
  image: string;
  span: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Royal Convention Grand 60ft Elevated Stage",
    category: "Stages",
    image: "/images/royal-convention-hero.jpg",
    span: "col-span-1 md:col-span-2 md:row-span-2",
    description: "Soaring 28-foot ceiling with pillarless mandap view and crystal chandelier array.",
  },
  {
    id: "g2",
    title: "Attached Deluxe Guest Lodging Suite",
    category: "Suites",
    image: "/images/deluxe-room-floral.jpg",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    description: "Daikin air-conditioned suite with king bedding and Kohler en-suite bathroom.",
  },
  {
    id: "g3",
    title: "Royal Banquet Contemporary Reception Hall",
    category: "Stages",
    image: "/images/royal-banquet-hero.webp",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    description: "Architectural mood lighting and direct adjoining live catering hall.",
  },
  {
    id: "g4",
    title: "Intimate Ceremonial Dais at Convention Hall",
    category: "Stages",
    image: "/images/royal-convention-hall-hero.webp",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    description: "Customized seating cluster layout ideal for engagements and milestone ceremonies.",
  },
  {
    id: "g5",
    title: "Mega Feast Dining Banquet & Live Kitchens",
    category: "Dining",
    image: "/images/royal-banquet-hero.webp",
    span: "col-span-1 md:col-span-2 md:row-span-1",
    description: "900 simultaneous seating capacity with pure RO mineral water plants.",
  },
];

export default function PhotoEventGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = ["All", "Stages", "Dining", "Suites"];

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 bg-zinc-950 text-zinc-100 relative overflow-hidden border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-400 mb-3 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Visual Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight leading-tight">
              A Glimpse into Splendor
            </h2>
            <p className="text-xs sm:text-base text-zinc-400 mt-2.5 max-w-xl font-light leading-relaxed">
              Explore stage sets, banquet seating arrangements, and luxury attached guest lodging rooms across our Mangalagiri campus.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 sm:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all font-mono uppercase tracking-wider ${
                  activeCategory === cat
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                    : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Aceternity Dynamic Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[260px] sm:auto-rows-[280px]">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.015 }}
              onClick={() => setSelectedPhoto(item)}
              className={`relative rounded-3xl overflow-hidden border border-amber-500/20 shadow-xs group cursor-pointer ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Obsidian-to-Gold Luxury Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-900/90 text-amber-300 backdrop-blur-md border border-amber-500/30 shadow-xs font-mono">
                  {item.category}
                </span>
              </div>

              {/* Expand Icon Button */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-9 h-9 rounded-full bg-zinc-900/90 backdrop-blur-md flex items-center justify-center text-amber-400 border border-amber-500/30 shadow-md">
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              {/* Bottom Caption & Description */}
              <div className="absolute bottom-5 inset-x-5 z-10">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-100 leading-tight group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-1 font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Smooth Framer Motion Lightbox Expansion Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-zinc-900 border border-amber-500/30 rounded-3xl overflow-hidden p-3 sm:p-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-zinc-950/80 text-zinc-200 hover:text-amber-400 hover:bg-zinc-950 transition-colors border border-amber-500/20"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-950">
                <Image
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-mono">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-100 mt-1.5">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    {selectedPhoto.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 border border-amber-500/40 text-xs font-bold uppercase tracking-wider shrink-0 shadow-sm font-mono"
                >
                  Close Photo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
