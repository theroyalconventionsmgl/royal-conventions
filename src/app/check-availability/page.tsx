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
    <div className="py-12 md:py-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-700 mb-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-500/20">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Soft-Check Lead Funnel</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900">
            Check Venue Availability
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed font-light">
            Select your venue, auspicious event date, and preferred time shift to inspect real-time slot availability. Submit your inquiry to place an initial reservation hold.
          </p>
        </div>

        {/* Private Pricing Notice Banner */}
        <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-slate-600 text-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-slate-900">
              Hospitality Consultation Notice:
            </span>
            <span className="text-slate-500">
              In accordance with our luxury standards, tariff schedules and custom wedding packages are provided privately by management upon reviewing guest counts and date specifications. No public charges are displayed.
            </span>
          </div>
        </div>

        {/* Multi-step Interactive Flow wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div className="text-center py-20 text-slate-500 text-sm">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Loading real-time availability calendar...
            </div>
          }
        >
          <InteractiveAvailabilityChecker />
        </Suspense>

        {/* Direct Manager Help Bar */}
        <div className="mt-14 text-center max-w-xl mx-auto">
          <p className="text-xs text-slate-500">
            Have urgent muhurtham dates or multiple day wedding inquiries?
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <a
              href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-amber-700"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Call Management: {siteConfig.contact.primaryPhone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-700"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
