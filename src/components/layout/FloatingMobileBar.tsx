"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";
import BookingBottomSheet from "@/components/ui/BookingBottomSheet";

export default function FloatingMobileBar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <aside
        aria-label="Quick mobile booking navigation"
        className="md:hidden fixed bottom-4 inset-x-4 z-50 pointer-events-auto"
      >
        <div className="bg-slate-950/90 backdrop-blur-xl border border-amber-500/30 text-white shadow-2xl rounded-2xl p-2 max-w-md mx-auto grid grid-cols-3 gap-2">
          {/* Action 1: Call Management */}
          <a
            href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
            className="flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 transition-colors border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Call Management Directly"
          >
            <Phone className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] font-semibold tracking-tight">Call Manager</span>
          </a>

          {/* Action 2: WhatsApp Management */}
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] font-semibold tracking-tight">WhatsApp</span>
          </a>

          {/* Action 3: Interactive Availability Drawer Trigger */}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-expanded={sheetOpen}
            aria-controls="mobile-availability-sheet"
            className="flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/20 transition-all border border-amber-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Open Availability Check Drawer"
          >
            <Calendar className="w-4 h-4 text-neutral-950 mb-1" />
            <span className="text-[10px] font-bold tracking-tight">Check Dates</span>
          </button>
        </div>
      </aside>

      {/* Connected Bottom Sheet */}
      <BookingBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
