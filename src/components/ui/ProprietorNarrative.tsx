"use client";

import React from "react";
import { Award, Building2, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TracingBeam } from "@/components/ui/aceternity/TracingBeam";

export default function ProprietorNarrative() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFA] text-neutral-900 relative overflow-hidden border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-800 mb-3 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Proprietor & Heritage Narrative</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-tight">
            Built on Trust, Crafted for Grandeur
          </h2>
          <p className="text-xs sm:text-base text-neutral-600 mt-3 font-normal max-w-xl mx-auto leading-relaxed">
            Founded with a vision to provide Amaravati and Guntur with world-class ceremonial infrastructure rooted in royal hospitality.
          </p>
        </div>

        {/* Aceternity Tracing Beam Vertical Scrolling Container */}
        <TracingBeam className="px-4">
          <div className="space-y-10 max-w-3xl mx-auto">
            {/* Story Card 1: The Vision of Sri N. Nageswara Rao */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-neutral-200 shadow-sm relative overflow-hidden group hover:border-amber-400/50 hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
                    The Vision of Sri N. Nageswara Rao
                  </h3>
                  <span className="text-[11px] text-amber-800 font-bold tracking-wider uppercase">
                    Proprietor & Founder • The Royal Conventions
                  </span>
                </div>
              </div>

              <blockquote className="text-xs sm:text-base text-neutral-700 leading-relaxed font-normal italic border-l-2 border-amber-400/70 pl-4 my-4">
                &ldquo;When we conceptualized <strong>The Royal Conventions</strong> at Mangalagiri, our mission was to construct a world-class ceremonial destination where families can conduct sacred muhurthams and grand receptions with total peace of mind. We engineered 28-foot soaring pillarless halls, attached 8 deluxe suites for host families, and zero-delay backup power to ensure every ritual proceeds with divine dignity.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
                <span>Two decades of hospitality leadership in the Amaravati-Guntur corridor</span>
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  Pillarless Mandap Guarantee
                </span>
              </div>
            </div>

            {/* Story Card 2: On-Campus Executive Leadership */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-neutral-200 shadow-sm relative overflow-hidden group hover:border-amber-400/50 hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
                    Executive Operational Leadership on Campus
                  </h3>
                  <span className="text-[11px] text-amber-800 font-bold tracking-wider uppercase">
                    Sri Bhaskar Rao & Sri Srikanth • Senior Management
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-base text-neutral-600 leading-relaxed font-normal">
                Our event operations are personally overseen by experienced managers on premises. Whether coordinating multi-course vegetarian live kitchens for 3,000 guests or arranging smooth check-in for host family elders staying in our 8 attached deluxe suites, our management team is physically present from setup to final bidai.
              </p>

              <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Direct Management Desk</div>
                  <div className="text-sm font-bold text-neutral-950 mt-0.5">{siteConfig.contact.primaryPhone}</div>
                </div>

                <a
                  href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Management</span>
                </a>
              </div>
            </div>
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
