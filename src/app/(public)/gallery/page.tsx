"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Crown, 
  Maximize2, 
  X, 
  ArrowRight,
  MapPin,
  Calendar
} from "lucide-react";
import LuxuryImage from "@/components/ui/LuxuryImage";

const galleryItems = [
  {
    id: 1,
    url: "/images/gallery/stage-royal-convention.jpg",
    caption: "Royal Convention stage and celebration setting",
    category: "Stage Decor",
    venue: "Royal Convention",
  },
  {
    id: 2,
    url: "/images/gallery/interior-chandelier.jpg",
    caption: "Interior details at Royal Convention",
    category: "Interiors",
    venue: "Royal Convention",
  },
  {
    id: 3,
    url: "/images/gallery/banquet-stage-sangeet.jpg",
    caption: "Vibrant Sangeet stage design with dynamic LED wall washes",
    category: "Stage Decor",
    venue: "Royal Banquets",
  },
  {
    id: 4,
    url: "/images/deluxe-room-floral.jpg",
    caption: "Attached Deluxe King Suite with modern ensuite bathroom & AC",
    category: "Deluxe Rooms",
    venue: "Royal Banquets",
  },
  {
    id: 5,
    url: "/images/gallery/dining-hall-convention.jpg",
    caption: "Dining area at Royal Convention",
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
    caption: "Aesthetic buffet circulation gallery at Royal Banquets",
    category: "Dining",
    venue: "Royal Banquets",
  },
  {
    id: 9,
    url: "/images/deluxe-room-ac.jpg",
    caption: "Deluxe Twin Executive Suite for wedding host family",
    category: "Deluxe Rooms",
    venue: "Royal Banquets",
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
    caption: "Exterior parking area",
    category: "Exterior",
    venue: "Campus Infrastructure",
  },
  {
    id: 12,
    url: "/images/gallery/hall-corporate.jpg",
    caption: "Executive seminar and formal ceremony seating arrangement",
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
    <div className="py-16 sm:py-24 bg-warm-cream text-forest-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-deep-sage" />
            <span>Campus Portfolio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-deep-sage font-normal">
            The Botanical Visual Gallery
          </h1>
          <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            Explore venue interiors, event settings, guest accommodation and exterior spaces. Contact our team to confirm facilities for your preferred venue.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 min-h-[44px] ${
                  isActive
                    ? "bg-deep-sage text-pure-white shadow-sm ring-1 ring-deep-sage"
                    : "bg-pure-white text-forest-charcoal/75 border border-natural-sand hover:border-soft-sage hover:text-deep-sage"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Layout Grid with Framer Motion */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedImage(item)}
                className="group cursor-pointer rounded-3xl bg-pure-white border border-natural-sand/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-soft-sage transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <LuxuryImage
                    src={item.url}
                    alt={item.caption}
                    aspectRatio="aspect-[16/10]"
                    category={item.category}
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-deep-sage/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="p-3 rounded-full bg-pure-white/90 backdrop-blur-md text-deep-sage shadow-md">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute top-3.5 left-3.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-warm-cream/95 backdrop-blur-md text-deep-sage border border-natural-sand shadow-xs font-sans">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-deep-sage uppercase tracking-wider block">
                      {item.venue}
                    </span>
                    <p className="text-[14px] text-forest-charcoal/85 font-medium mt-1.5 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-natural-sand/40 flex items-center justify-between text-xs text-deep-sage font-semibold">
                    <span>Click to expand view</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-forest-charcoal/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-4xl w-full bg-pure-white rounded-3xl overflow-hidden border border-natural-sand shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-warm-cream text-forest-charcoal hover:bg-pure-white border border-natural-sand transition-all shadow-md"
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

                <div className="p-6 sm:p-8 bg-warm-cream border-t border-natural-sand flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-deep-sage">
                      {selectedImage.venue} • {selectedImage.category}
                    </span>
                    <p className="text-base sm:text-lg font-serif text-deep-sage mt-1 font-normal">
                      {selectedImage.caption}
                    </p>
                  </div>

                  <Link
                    href={`/check-availability?venue=${selectedImage.venue.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-6 py-3 rounded-full bg-deep-sage text-pure-white text-xs font-semibold uppercase tracking-wider hover:bg-forest-charcoal transition-all shadow-xs shrink-0"
                  >
                    Enquire This Setup
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Campus Tour Visit Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-pure-white border border-natural-sand shadow-sm text-center max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-soft-sage/20 border border-soft-sage flex items-center justify-center text-deep-sage mx-auto mb-4">
            <Crown className="w-6 h-6 text-deep-sage" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-deep-sage">
            Experience The Royal Campus in Person
          </h3>
          <p className="text-[14px] text-forest-charcoal/80 mt-3 max-w-xl mx-auto leading-relaxed font-sans">
            Schedule a personalized walkthrough with Sri Bhaskar Rao or Sri Srikanth to view stage heights, guest seating capacity, dining halls, and attached guest suites.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-warm-cream border border-natural-sand text-deep-sage font-semibold text-xs uppercase tracking-wider hover:border-soft-sage transition-all min-h-[48px]"
            >
              <MapPin className="w-4 h-4 text-deep-sage" />
              <span>Get Directions &amp; Map</span>
            </Link>
            <Link
              href="/check-availability"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-deep-sage text-pure-white font-semibold text-xs uppercase tracking-wider hover:bg-forest-charcoal transition-all shadow-xs min-h-[48px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Date Availability</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
