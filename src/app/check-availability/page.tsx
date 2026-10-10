import { Metadata } from "next";
import { Suspense } from "react";
import { Building2, ShieldCheck, Phone, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import InteractiveAvailabilityChecker from "@/components/ui/InteractiveAvailabilityChecker";

export const metadata: Metadata = {
  title: "Check Date Availability & Inquire | The Royal Conventions",
  description:
    "Real-time availability checker for Royal Convention, Royal Banquet, and Vaishnavi Vaidehi in Mangalagiri. Select date and shift for soft booking inquiry.",
};

export default function CheckAvailabilityPage() {
  return (
    <div className="py-12 md:py-20 bg-zinc-950 text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Soft-Check Lead Funnel</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-100">
            Check Venue Availability
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed font-light">
            Select your venue, auspicious event date, and preferred time shift to inspect real-time slot availability. Submit your inquiry to place an initial reservation hold.
          </p>
        </div>

        {/* Private Pricing Notice Banner */}
        <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl bg-zinc-900 border border-amber-500/20 text-zinc-300 text-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-zinc-100">
              Hospitality Consultation Notice:
            </span>
            <span className="text-zinc-400 font-light">
              In accordance with our luxury standards, tariff schedules and custom wedding packages are provided privately by management upon reviewing guest counts and date specifications. No public charges are displayed.
            </span>
          </div>
        </div>

        {/* Multi-step Interactive Flow wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div className="text-center py-20 text-zinc-400 text-sm">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading real-time availability calendar...
            </div>
          }
        >
          <InteractiveAvailabilityChecker />
        </Suspense>

        {/* Direct Manager Help Bar */}
        <div className="mt-14 text-center max-w-xl mx-auto">
          <p className="text-xs text-zinc-400 font-light">
            Have urgent muhurtham dates or multiple day wedding inquiries?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-zinc-800 transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Sri Bhaskar Rao / Sri Srikanth</span>
            </a>

            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-amber-500/20 text-green-400 text-xs font-semibold hover:bg-zinc-900 transition-colors font-mono"
            >
              <MessageSquare className="w-3.5 h-3.5 text-green-400" />
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
