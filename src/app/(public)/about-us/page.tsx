import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Calendar, HeartHandshake, ShieldCheck, Award, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us | The Royal Conventions, Mangalagiri",
  description:
    "The Royal Conventions in Mangalagiri — founded by Sri N. Nageswara Rao and run by an on-site management team. Four venues, guest suites, and personal hospitality.",
};

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Hospitality first",
    desc: "Every guest and host family is received with warmth — from the initial campus walkthrough to the final farewell.",
  },
  {
    icon: ShieldCheck,
    title: "Unbroken reliability",
    desc: "100% DG power backup, central climate control, and on-site directors so rituals proceed without interruption.",
  },
  {
    icon: Award,
    title: "Honest dealing",
    desc: "Customized packages shared privately after verification. Clear communication with zero unexpected charges.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="bg-warm-cream text-forest-charcoal min-h-screen">
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-deep-sage" />
            <span>Our Heritage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-deep-sage mt-2 leading-tight max-w-3xl mx-auto font-normal">
            A campus built for family celebrations
          </h1>
          <p className="text-[15px] sm:text-lg text-forest-charcoal/80 max-w-2xl mx-auto mt-4 leading-relaxed font-sans">
            Founded by <strong>Sri N. Nageswara Rao</strong>, The Royal Conventions brings four distinct venues, 8 guest suites, and dedicated hands-on management together on one unified Mangalagiri campus.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="bg-pure-white rounded-3xl border border-natural-sand p-7 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-8 items-center">
              <div className="mx-auto sm:mx-0 w-full max-w-[280px]">
                <div className="relative aspect-[5/6] rounded-2xl overflow-hidden border border-natural-sand bg-warm-cream">
                  <Image
                    src={siteConfig.proprietor.image}
                    alt="Sri N. Nageswara Rao, Proprietor and Founder of The Royal Conventions"
                    fill
                    sizes="(max-width: 640px) 280px, 240px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-deep-sage">
                  Founder
                </span>
                <p className="font-serif text-3xl text-deep-sage mt-2 font-normal">{siteConfig.proprietor.name}</p>
                <p className="text-xs text-forest-charcoal/70 mt-1 font-sans">{siteConfig.proprietor.title}</p>
                <p className="text-[15px] text-forest-charcoal/85 leading-relaxed font-sans mt-4">
                  {siteConfig.proprietor.bio} Sri Nageswara Rao and his operational team maintain an active presence on campus for every celebration — ensuring complete peace of mind from morning muhurtham rituals to late-night receptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="pb-16 sm:pb-24 bg-pure-white border-y border-natural-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40 text-deep-sage text-[11px] font-semibold uppercase tracking-[0.2em] mb-2">
              <Sparkles className="w-3 h-3 text-deep-sage" />
              <span>Leadership</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-deep-sage mt-2 font-normal">
              Direct, accessible management
            </h2>
            <p className="text-sm sm:text-base text-forest-charcoal/80 mt-2 font-sans">
              Speak directly with our on-site event directors rather than automated call centers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 max-w-4xl">
            {siteConfig.management.map((mgr) => (
              <div key={mgr.name} className="bg-warm-cream/60 rounded-3xl border border-natural-sand p-7 shadow-xs">
                <h3 className="font-serif text-2xl text-deep-sage font-normal">{mgr.name}</h3>
                <p className="text-[13px] text-deep-sage/90 font-medium mt-1 font-sans">{mgr.role}</p>
                <a
                  href={`tel:${mgr.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-deep-sage hover:text-forest-charcoal transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-deep-sage" />
                  <span>{mgr.phone}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 pt-10 border-t border-natural-sand/60">
            {VALUES.map((v) => (
              <div key={v.title} className="p-2">
                <div className="w-12 h-12 rounded-2xl bg-soft-sage/20 text-deep-sage border border-soft-sage/30 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-deep-sage" strokeWidth={1.75} />
                </div>
                <h3 className="font-serif text-xl text-deep-sage font-normal">{v.title}</h3>
                <p className="text-sm text-forest-charcoal/80 mt-2 leading-relaxed font-sans">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3.5">
            <Link
              href="/check-availability"
              className="inline-flex items-center justify-center gap-2 bg-deep-sage text-pure-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-forest-charcoal transition-all min-h-[50px] shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Venue Availability</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-natural-sand bg-pure-white text-deep-sage text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-warm-cream transition-all min-h-[50px]"
            >
              <span>Get Directions &amp; Contact</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
