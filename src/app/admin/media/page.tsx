"use client";

import { useState } from "react";
import { 
  Image as ImageIcon, 
  PlusCircle, 
  Filter, 
  Trash2, 
  Sparkles, 
  Check, 
  Eye,
  Crown
} from "lucide-react";
import { siteConfig } from "@/config/site";
import LuxuryImage from "@/components/ui/LuxuryImage";

interface MediaItem {
  id: string;
  url: string;
  category: string;
  venueId: string;
  venueName: string;
  caption: string;
  isFeatured: boolean;
}

const initialMedia: MediaItem[] = [
  {
    id: "m-1",
    url: "/images/gallery/stage-royal-convention.jpg",
    category: "Stage Decor",
    venueId: "royal-convention",
    venueName: "Royal Convention",
    caption: "Grand 60-foot Royal Convention stage with traditional golden mandapam",
    isFeatured: true,
  },
  {
    id: "m-2",
    url: "/images/gallery/interior-chandelier.jpg",
    category: "Interiors",
    venueId: "royal-convention",
    venueName: "Royal Convention",
    caption: "Soaring 28-foot ceiling with imported crystal chandeliers & marble",
    isFeatured: true,
  },
  {
    id: "m-3",
    url: "/images/gallery/banquet-stage-sangeet.jpg",
    category: "Stage Decor",
    venueId: "royal-banquets",
    venueName: "Royal Banquet",
    caption: "Vibrant Sangeet stage design with dynamic LED wall washes",
    isFeatured: false,
  },
  {
    id: "m-4",
    url: "/images/deluxe-room-floral.jpg",
    category: "Deluxe Rooms",
    venueId: "royal-banquets",
    venueName: "Royal Banquet",
    caption: "Attached Deluxe King Suite with modern ensuite bathroom & AC",
    isFeatured: true,
  },
  {
    id: "m-5",
    url: "/images/gallery/dining-hall-convention.jpg",
    category: "Dining",
    venueId: "royal-convention",
    venueName: "Royal Convention",
    caption: "Dedicated mega dining hall accommodating 900 simultaneous diners",
    isFeatured: false,
  },
  {
    id: "m-6",
    url: "/images/gallery/hall-engagement.jpg",
    category: "Stage Decor",
    venueId: "vaishnavi-vaidehi",
    venueName: "Vaishnavi Vaidehi",
    caption: "Intimate floral engagement backdrop with brass lamp accents",
    isFeatured: false,
  },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [activeVenueFilter, setActiveVenueFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  // New Media State
  const [url, setUrl] = useState("");
  const [venueId, setVenueId] = useState("royal-convention");
  const [category, setCategory] = useState("Stage Decor");
  const [caption, setCaption] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    const venue = siteConfig.venues.find((v) => v.id === venueId);
    const newMedia: MediaItem = {
      id: `m-${Date.now()}`,
      url: url || "/images/gallery/sample-upload.jpg",
      category,
      venueId,
      venueName: venue ? venue.name : "The Royal Conventions",
      caption,
      isFeatured,
    };

    setMediaList([newMedia, ...mediaList]);
    setModalOpen(false);
    setUrl("");
    setCaption("");
    setIsFeatured(false);
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter((m) => m.id !== id));
  };

  const filteredMedia =
    activeVenueFilter === "all"
      ? mediaList
      : mediaList.filter((m) => m.venueId === activeVenueFilter);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">
            Visual Content Management
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Gallery Image & Venue Tagging Manager
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Map high-resolution client photography to specific venues and public showcase categories.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-[#1A1A1A]" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-zinc-200 shadow-sm text-xs font-bold">
        <span className="text-zinc-400 px-3 text-[11px] uppercase tracking-wider">
          Filter by Venue:
        </span>
        <button
          onClick={() => setActiveVenueFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeVenueFilter === "all"
              ? "bg-[#1A1A1A] text-[#DFCA95]"
              : "text-zinc-600 hover:text-black"
          }`}
        >
          All Campus Venues ({mediaList.length})
        </button>
        {siteConfig.venues.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVenueFilter(v.id)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              activeVenueFilter === v.id
                ? "bg-[#1A1A1A] text-[#DFCA95]"
                : "text-zinc-600 hover:text-black"
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#C5A059] transition-all"
          >
            <div>
              <div className="relative">
                <LuxuryImage
                  src={item.url}
                  alt={item.caption}
                  aspectRatio="aspect-[16/10]"
                  category={item.category}
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#1A1A1A]/80 text-[#DFCA95] border border-[#C5A059]/30">
                    {item.category}
                  </span>
                  {item.isFeatured && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#C5A059] text-[#1A1A1A]">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                  {item.venueName}
                </span>
                <p className="text-xs font-semibold text-zinc-900 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-zinc-400 font-mono">
                Asset ID: {item.id}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50 flex items-center gap-1 text-[11px] font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                Add Gallery Asset with Venue Mapping
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Image URL or Local Asset Path
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/gallery/mandap-decor-1.jpg"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">
                    Map to Venue
                  </label>
                  <select
                    value={venueId}
                    onChange={(e) => setVenueId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none bg-white font-semibold"
                  >
                    {siteConfig.venues.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1A1A1A] mb-1">
                    Category Tag
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none bg-white font-semibold"
                  >
                    <option value="Stage Decor">Stage Decor</option>
                    <option value="Interiors">Interiors</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Dining">Dining</option>
                    <option value="Deluxe Rooms">Deluxe Rooms</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1A1A1A] mb-1">
                  Caption / Alt Text
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand 60ft stage set with real jasmine floral mandap"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#C5A059] focus:ring-[#C5A059]"
                />
                <label htmlFor="featured-check" className="font-semibold text-zinc-700">
                  Feature prominently on public homepage and venue showcase
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-600 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold uppercase tracking-wider"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
