"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  X,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { submitBookingLead } from "@/lib/leads";

interface BookingBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVenueId?: string;
}

type Shift = "MORNING_SHIFT" | "EVENING_SHIFT" | "FULL_DAY";

const SHIFT_LABEL: Record<Shift, string> = {
  MORNING_SHIFT: "Morning Shift (06:00 AM – 02:00 PM)",
  EVENING_SHIFT: "Evening Shift (04:00 PM – 11:30 PM)",
  FULL_DAY: "Full Day (24 Hours)"
};

export default function BookingBottomSheet({
  isOpen,
  onClose,
  defaultVenueId
}: BookingBottomSheetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedVenue, setSelectedVenue] = useState(defaultVenueId || siteConfig.venues[0]?.id || "royal-convention");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 14);
    return today.toISOString().split("T")[0];
  });
  const [selectedShift, setSelectedShift] = useState<Shift>("EVENING_SHIFT");
  const [guestCount, setGuestCount] = useState<number>(800);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [prevVenueId, setPrevVenueId] = useState(defaultVenueId);
  if (defaultVenueId && defaultVenueId !== prevVenueId) {
    setPrevVenueId(defaultVenueId);
    setSelectedVenue(defaultVenueId);
  }

  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
    }
  }

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
    }, 250);
  };

  const handleQuickWhatsApp = () => {
    const venueObj = siteConfig.venues.find((v) => v.id === selectedVenue);
    const venueName = venueObj?.name ?? selectedVenue;
    const shiftLabel = SHIFT_LABEL[selectedShift];

    const message = `Namaste Management (The Royal Conventions),

I would like to check availability and tariffs:
• Venue: ${venueName}
• Target Date: ${selectedDate}
• Shift: ${shiftLabel}
• Estimated Guests: ${guestCount} attendees
${name ? `• Contact Person: ${name}` : ""}
${phone ? `• Phone: ${phone}` : ""}

Please confirm slot status and schedule our campus walkthrough.`;

    const url = `https://wa.me/919866333055?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Persist the lead to Firestore (non-blocking for the WhatsApp handoff —
    // the message itself always carries the enquiry details).
    try {
      await submitBookingLead({
        venueId: selectedVenue,
        venueName: siteConfig.venues.find((v) => v.id === selectedVenue)?.name,
        date: selectedDate,
        shift: selectedShift,
        shiftName: SHIFT_LABEL[selectedShift],
        customerName: name.trim(),
        customerPhone: phone.replace(/\D/g, ""),
        guestCount,
        eventType: "General Availability Enquiry",
        source: "bottom-sheet",
      });
    } catch (error) {
      console.error("Lead persistence failed; continuing via WhatsApp:", error);
    }
    setSubmitted(true);
    handleQuickWhatsApp();
    setTimeout(resetAndClose, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-forest-charcoal/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="availability-sheet-title"
            id="mobile-availability-sheet"
            className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-warm-cream text-forest-charcoal shadow-2xl z-10 max-h-[92vh] overflow-hidden border border-natural-sand"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="w-full h-full p-6 sm:p-7 overflow-y-auto no-scrollbar max-h-[91vh]">
              <div className="w-12 h-1.5 bg-natural-sand rounded-full mx-auto mb-4 sm:hidden" aria-hidden="true" />

              <div className="flex items-center justify-between pb-4 border-b border-natural-sand">
                <div>
                  <h3 id="availability-sheet-title" className="font-serif text-2xl text-deep-sage font-normal">
                    Check availability
                  </h3>
                  <p className="text-[13px] text-forest-charcoal/70 mt-0.5 font-sans">
                    Step {step} of 3 — {step === 1 ? "Choose your hall" : step === 2 ? "Date & shift" : "Your contact"}
                  </p>
                </div>
                <button
                  onClick={resetAndClose}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-pure-white text-forest-charcoal/70 hover:text-forest-charcoal transition-colors border border-natural-sand"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-soft-sage/30 text-deep-sage rounded-full flex items-center justify-center mx-auto border border-soft-sage">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl text-deep-sage font-normal">Opening WhatsApp…</h4>
                  <p className="text-sm text-forest-charcoal/70 max-w-xs mx-auto font-sans">
                    Connecting you with our managers for date clearance and tariff discussion.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4 font-sans">
                  {step === 1 && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-deep-sage block mb-2">
                        1. Select venue
                      </span>
                      {siteConfig.venues.map((v) => {
                        const isSelected = selectedVenue === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVenue(v.id)}
                            aria-pressed={isSelected}
                            className={`w-full min-h-[52px] py-3 px-4 rounded-2xl text-left border transition-all text-[15px] font-medium flex items-center justify-between ${
                              isSelected
                                ? "bg-pure-white text-deep-sage border-deep-sage shadow-xs ring-1 ring-deep-sage/40"
                                : "bg-pure-white/70 text-forest-charcoal/80 border-natural-sand hover:border-soft-sage"
                            }`}
                          >
                            <span>{v.name}</span>
                            <span className="text-xs text-forest-charcoal/60">
                              {v.seatingCapacity.toLocaleString()} seats
                            </span>
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full min-h-[52px] mt-2 py-3.5 px-4 rounded-full bg-deep-sage text-pure-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-forest-charcoal transition-all shadow-xs"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="sheet-date" className="text-xs font-semibold uppercase tracking-wider text-deep-sage block mb-1.5">
                          2. Event date
                        </label>
                        <input
                          id="sheet-date"
                          type="date"
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full min-h-[52px] bg-pure-white border border-natural-sand rounded-2xl px-4 py-3 text-[15px] text-forest-charcoal focus:outline-none focus:border-deep-sage transition-colors"
                        />
                      </div>

                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-deep-sage block mb-1.5">
                          3. Shift
                        </span>
                        <div className="grid grid-cols-3 gap-1.5 bg-pure-white p-1.5 rounded-2xl border border-natural-sand">
                          {(
                            [
                              ["MORNING_SHIFT", "Morning"],
                              ["EVENING_SHIFT", "Evening"],
                              ["FULL_DAY", "Full Day"]
                            ] as const
                          ).map(([value, label]) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setSelectedShift(value)}
                              aria-pressed={selectedShift === value}
                              className={`min-h-[48px] py-2 text-sm font-semibold rounded-xl transition-all ${
                                selectedShift === value
                                  ? "bg-deep-sage text-pure-white shadow-xs"
                                  : "text-forest-charcoal/70 hover:text-forest-charcoal"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        <p className="mt-3 flex items-start gap-1.5 text-deep-sage text-[13px] leading-relaxed">
                          <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-deep-sage" />
                          <span>Auspicious muhurtham dates fill early. Enquire early to place a reservation hold.</span>
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="sheet-guests" className="text-xs font-semibold uppercase tracking-wider text-deep-sage">
                            4. Guests
                          </label>
                          <span className="text-[13px] font-semibold text-deep-sage bg-soft-sage/20 px-2.5 py-1 rounded-lg border border-soft-sage/30">
                            {guestCount.toLocaleString()}
                          </span>
                        </div>
                        <input
                          id="sheet-guests"
                          type="range"
                          min="100"
                          max="3500"
                          step="50"
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full accent-[#294C3B] h-2 cursor-pointer"
                        />
                      </div>

                      <div className="flex gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="min-h-[52px] px-5 py-3.5 rounded-full border border-natural-sand bg-pure-white text-forest-charcoal font-semibold text-sm flex items-center gap-1.5 hover:bg-warm-cream transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1 min-h-[52px] py-3.5 px-4 rounded-full bg-deep-sage text-pure-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-forest-charcoal transition-all shadow-xs"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <p className="text-sm text-forest-charcoal/85 bg-pure-white border border-natural-sand rounded-2xl p-4 leading-relaxed">
                        Share your contact details and our manager will follow up on WhatsApp for{" "}
                        <strong className="text-deep-sage">{siteConfig.venues.find(v => v.id === selectedVenue)?.name}</strong>{" "}
                        on <strong className="text-deep-sage">{selectedDate}</strong>.
                      </p>

                      <div>
                        <label htmlFor="sheet-name" className="text-xs font-semibold uppercase tracking-wider text-deep-sage block mb-1.5">
                          Your name *
                        </label>
                        <input
                          id="sheet-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Srikanth Varma"
                          autoComplete="name"
                          className="w-full min-h-[52px] bg-pure-white border border-natural-sand rounded-2xl px-4 py-3 text-[15px] placeholder:text-forest-charcoal/50 focus:outline-none focus:border-deep-sage transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="sheet-phone" className="text-xs font-semibold uppercase tracking-wider text-deep-sage block mb-1.5">
                          Mobile number *
                        </label>
                        <input
                          id="sheet-phone"
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="10-digit mobile number"
                          autoComplete="tel"
                          inputMode="numeric"
                          className="w-full min-h-[52px] bg-pure-white border border-natural-sand rounded-2xl px-4 py-3 text-[15px] placeholder:text-forest-charcoal/50 focus:outline-none focus:border-deep-sage transition-colors"
                        />
                      </div>

                      <div className="flex gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="min-h-[52px] px-5 py-3.5 rounded-full border border-natural-sand bg-pure-white text-forest-charcoal font-semibold text-sm flex items-center gap-1.5 hover:bg-warm-cream transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          className="flex-1 min-h-[52px] py-3.5 px-4 rounded-full bg-deep-sage text-pure-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-forest-charcoal transition-all shadow-xs"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Request on WhatsApp</span>
                        </button>
                      </div>

                      <div className="text-center pt-1">
                        <a
                          href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-charcoal/70 hover:text-deep-sage min-h-[44px] px-4"
                        >
                          <Phone className="w-3.5 h-3.5 text-deep-sage" />
                          <span>Prefer to call? {siteConfig.contact.primaryPhone}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
