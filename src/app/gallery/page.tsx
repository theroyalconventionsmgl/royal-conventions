"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Crown, 
  Filter, 
  Maximize2, 
  X, 
  Calendar,
  CheckCircle2
} from "lucide-react";
import { siteConfig } from "@/config/site";
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
    <div className="py-12 md:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#8C6D31] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Visual Portfolio
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A]">
            The Royal Visual Gallery
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 mt-4 leading-relaxed">
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
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? "bg-[#1A1A1A] text-[#DFCA95] shadow-md border border-[#C5A059]"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:border-[#C5A059]/40 hover:text-[#1A1A1A]"
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
              className="group cursor-pointer rounded-2xl bg-white border border-[#C5A059]/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <LuxuryImage
                  src={item.url}
                  alt={item.caption}
                  aspectRatio="aspect-[16/9]"
                  category={item.category}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1A1A1A]/85 backdrop-blur-md text-[#DFCA95] border border-[#C5A059]/30">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#8C6D31] uppercase tracking-wider block">
                    {item.venue}
                  </span>
                  <p className="text-xs text-[#1A1A1A] font-medium mt-1 line-clamp-2">
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-[#C5A059] hover:text-black transition-colors"
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

              <div className="p-6 bg-[#1A1A1A] border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                    {selectedImage.venue} • {selectedImage.category}
                  </span>
                  <p className="text-sm font-serif font-bold text-white mt-1">
                    {selectedImage.caption}
                  </p>
                </div>

                <Link
                  href="/check-availability"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg shrink-0"
                >
                  Inquire This Setup
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* CTA Footer Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#C5A059]/30 shadow-md text-center max-w-2xl mx-auto">
          <Crown className="w-8 h-8 text-[#C5A059] mx-auto mb-2" />
          <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
            Experience The Royal Campus in Person
          </h3>
          <p className="text-xs text-zinc-600 mt-2">
            Schedule a guided campus tour with Sri Bhaskar Rao or Sri Srikanth to view stage heights, guest seating, and deluxe rooms firsthand.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-xl bg-[#1A1A1A] text-[#DFCA95] font-bold text-xs uppercase tracking-wider hover:bg-black"
            >
              Get Directions & Map
            </Link>
            <Link
              href="/check-availability"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md"
            >
              Check Date Availability
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
