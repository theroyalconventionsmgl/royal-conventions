"use client";

import { Phone, MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function FloatingMobileBar() {
  return (
    <aside
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-4 inset-x-4 z-30"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="bg-warm-cream/95 backdrop-blur-xl border border-natural-sand text-forest-charcoal shadow-xl rounded-2xl p-2 max-w-md mx-auto grid grid-cols-3 gap-2">
        <a
          href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
          className="flex flex-col items-center justify-center min-h-[52px] py-2 px-1 rounded-xl hover:bg-soft-sage/20 transition-colors"
          aria-label="Call us directly"
        >
          <Phone className="w-4 h-4 text-deep-sage mb-1" />
          <span className="text-[11px] font-semibold text-deep-sage">Call</span>
        </a>
        <a
          href={siteConfig.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[52px] py-2 px-1 rounded-xl hover:bg-soft-sage/20 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-deep-sage mb-1" />
          <span className="text-[11px] font-semibold text-deep-sage">WhatsApp</span>
        </a>
        <Link
          href="/check-availability"
          className="flex flex-col items-center justify-center min-h-[52px] py-2 px-1 rounded-xl bg-deep-sage text-pure-white font-semibold shadow-xs hover:bg-forest-charcoal transition-colors"
          aria-label="Check venue availability"
        >
          <Calendar className="w-4 h-4 mb-1" />
          <span className="text-[11px] font-semibold">Check Dates</span>
        </Link>
      </div>
    </aside>
  );
}
