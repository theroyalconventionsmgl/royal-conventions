import { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck, Phone, MessageSquare, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import InteractiveAvailabilityChecker from "@/components/ui/InteractiveAvailabilityChecker";

export const metadata: Metadata = {
  title: "Check Availability | The Royal Conventions",
  description:
    "Check availability for Royal Convention, Royal Banquets, Vaishnavi Vaidehi and Smt. Nannapaneni Lakshmi Function Hall in Mangalagiri.",
};

export default function CheckAvailabilityPage() {
  return (
    <div className="bg-warm-cream text-forest-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-deep-sage" />
            <span>Calendar Verification</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-deep-sage font-normal">Check Venue Availability</h1>
          <p className="text-[15px] sm:text-base text-forest-charcoal/80 mt-3 leading-relaxed font-sans">
            Choose your venue, date, and shift. We verify and respond promptly with private tariffs. An enquiry is non-binding.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 p-5 rounded-3xl bg-pure-white border border-natural-sand flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-5 h-5 text-deep-sage shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-xs sm:text-sm text-forest-charcoal/80 leading-relaxed font-sans">
            Tariffs and catering packages are shared confidentially by our management desk after reviewing your date, hall selection, and guest count.
          </p>
        </div>

        <div className="mt-8">
          <Suspense fallback={<p className="text-center py-16 text-forest-charcoal/60 text-sm">Loading availability calendar…</p>}>
            <InteractiveAvailabilityChecker />
          </Suspense>
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-forest-charcoal/70">Urgent muhurtham dates or multi-day convention?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-4">
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center justify-center gap-2 bg-deep-sage text-pure-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-forest-charcoal transition-all min-h-[50px] w-full sm:w-auto shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call {siteConfig.contact.primaryPhone}</span>
            </a>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-natural-sand bg-pure-white text-deep-sage text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-warm-cream transition-all min-h-[50px] w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 text-deep-sage" />
              <span>WhatsApp Reservation Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
