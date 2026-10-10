"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Crown, 
  Maximize2, 
  X, 
} from "lucide-react";
import LuxuryImage from "@/components/ui/LuxuryImage";

// Curated campus gallery items mapped by category
const galleryItems = [
  {
    id: 1,
    url: "/images/gallery/stage-royal-convention.jpg",
    caption: "Grand 60-foot Royal Convention stage with traditional golden mandapam",
    category: "Stage Decor",
    venue: "Royal Convention",
  },
  {
    id: 2,
    url: "/images/gallery/interior-chandelier.jpg",
    caption: "Soaring 28-foot ceiling with imported crystal chandeliers & marble",
    category: "Interiors",
    venue: "Royal Convention",
  },
  {
    id: 3,
    url: "/images/gallery/banquet-stage-sangeet.jpg",
    caption: "Vibrant Sangeet stage design with dynamic LED wall washes",
    category: "Stage Decor",
    venue: "Royal Banquet",
  },
  {
    id: 4,
    url: "/images/deluxe-room-floral.jpg",
    caption: "Attached Deluxe King Suite with modern ensuite bathroom & AC",
    category: "Deluxe Rooms",
    venue: "Royal Banquet",
  },
  {
    id: 5,
    url: "/images/gallery/dining-hall-convention.jpg",
    caption: "Dedicated mega dining hall accommodating 900 simultaneous diners",
    category: "Dining",
    venue: "Royal Convention",
  },
  {
    id: 6,
    url: "/images/gallery/exterior-night-facade.jpg",
    caption: "Illuminated evening campus facade and grand porte-cochère arrival",
    category: "Exterior",
    venue: "Campus Architecture",
  },
  {
    id: 7,
    url: "/images/gallery/hall-engagement.jpg",
    caption: "Intimate floral engagement backdrop with brass lamp accents",
    category: "Stage Decor",
    venue: "Vaishnavi Vaidehi",
  },
  {
    id: 8,
    url: "/images/gallery/banquet-dining-buffet.jpg",
    caption: "Aesthetic buffet circulation gallery at Royal Banquet",
    category: "Dining",
    venue: "Royal Banquet",
  },
  {
    id: 9,
    url: "/images/deluxe-room-ac.jpg",
    caption: "Deluxe Twin Executive Suite for wedding host family",
    category: "Deluxe Rooms",
    venue: "Royal Banquet",
  },
  {
    id: 10,
    url: "/images/gallery/bridal-suite.jpg",
    caption: "Opulent executive bridal green room with full-length vanity mirror",
    category: "Interiors",
    venue: "Royal Convention",
  },
  {
    id: 11,
    url: "/images/gallery/exterior-parking.jpg",
    caption: "Spacious paved parking lot accommodating 350+ four-wheelers",
    category: "Exterior",
    venue: "Campus Infrastructure",
  },
  {
    id: 12,
    url: "/images/gallery/hall-corporate.jpg",
    caption: "Executive boardroom and corporate seminar seating arrangement",
    category: "Interiors",
    venue: "Vaishnavi Vaidehi",
  },
];

const categories = [
  "All",
  "Stage Decor",
  "Interiors",
  "Exterior",
  "Dining",
  "Deluxe Rooms",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="py-12 md:py-20 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Visual Portfolio
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-100">
            The Royal Visual Gallery
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed font-light">
            Immerse yourself in our world-class architecture, grand stages, attached deluxe lodging rooms, and exquisite dining settings.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all font-mono ${
                  isActive
                    ? "bg-amber-500/20 text-amber-300 shadow-md border border-amber-500/40"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-amber-500/40 hover:text-zinc-200"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer rounded-2xl bg-zinc-900 border border-amber-500/20 overflow-hidden shadow-sm hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] hover:border-amber-500/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <LuxuryImage
                  src={item.url}
                  alt={item.caption}
                  aspectRatio="aspect-[16/9]"
                  category={item.category}
                />
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-3 rounded-full bg-zinc-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-950/85 backdrop-blur-md text-amber-300 border border-amber-500/30 font-mono">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block font-mono">
                    {item.venue}
                  </span>
                  <p className="text-xs text-zinc-200 font-medium mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-zinc-900 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-950/80 text-zinc-300 hover:text-amber-400 border border-amber-500/20 transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full">
                <LuxuryImage
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  aspectRatio="aspect-[16/10]"
                  category={selectedImage.category}
                />
              </div>

              <div className="p-6 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                    {selectedImage.venue} • {selectedImage.category}
                  </span>
                  <p className="text-sm font-serif font-bold text-zinc-100 mt-1">
                    {selectedImage.caption}
                  </p>
                </div>

                <Link
                  href="/check-availability"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg shrink-0 font-mono"
                >
                  Inquire This Setup
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* CTA Footer Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-zinc-900 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.05)] text-center max-w-2xl mx-auto">
          <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <h3 className="font-serif text-2xl font-bold text-zinc-100">
            Experience The Royal Campus in Person
          </h3>
          <p className="text-xs text-zinc-400 mt-2 font-light">
            Schedule a guided campus tour with Sri Bhaskar Rao or Sri Srikanth to view stage heights, guest seating, and deluxe rooms firsthand.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl bg-zinc-950 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors font-mono"
            >
              Get Directions &amp; Map
            </Link>
            <Link
              href="/check-availability"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all font-mono"
            >
              Check Date Availability
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
