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
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { submitBookingLead, BookingLead } from "@/lib/leads";

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

  // Sync venue selection when the parent changes it (venue card "Check Dates")
  const [prevVenueId, setPrevVenueId] = useState(defaultVenueId);
  if (defaultVenueId && defaultVenueId !== prevVenueId) {
    setPrevVenueId(defaultVenueId);
    setSelectedVenue(defaultVenueId);
  }

  // Reset the wizard each time the drawer is opened
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

I would like to check availability and confidential tariffs:
• Venue: ${venueName}
• Target Date: ${selectedDate}
• Shift: ${shiftLabel}
• Estimated Guests: ${guestCount} attendees
${name ? `• Contact Person: ${name}` : ""}
${phone ? `• Phone: ${phone}` : ""}

Please confirm slot status and schedule our personal campus walkthrough.`;

    const url = `https://wa.me/919866333055?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitBookingLead({
      name,
      phone,
      hallId: selectedVenue as BookingLead["hallId"],
      eventDate: selectedDate,
      guestCount,
    }).catch(() => { /* non-blocking; WhatsApp flow continues */ });
    setSubmitted(true);
    setTimeout(() => {
      handleQuickWhatsApp();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          {/* Ambient Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={resetAndClose}
          />

          {/* Gold Gradient Border Shell + Spring Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="availability-sheet-title"
            id="mobile-availability-sheet"
            className="relative w-full max-w-lg p-[1.5px] rounded-t-[2.5rem] sm:rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 shadow-2xl z-10 max-h-[92vh] overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="w-full h-full bg-zinc-950 text-zinc-100 rounded-t-[calc(2.5rem-1.5px)] sm:rounded-[calc(1.5rem-1.5px)] p-6 sm:p-7 overflow-y-auto no-scrollbar max-h-[91vh]">
              {/* Native Drag Handle */}
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-4 sm:hidden" aria-hidden="true" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-mono">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>Priority Management Inspection</span>
                  </div>
                  <h3 id="availability-sheet-title" className="font-serif text-xl sm:text-2xl font-bold text-zinc-100 mt-1.5">
                    Check Venue Availability
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                    Step {step} of 3 — {step === 1 ? "Choose your hall" : step === 2 ? "Date & shift" : "Your contact"}
                  </p>
                </div>

                <button
                  onClick={resetAndClose}
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-amber-500/20"
                  aria-label="Close Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-zinc-100">Opening Management WhatsApp</h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Connecting you directly with Sri Bhaskar Rao / Sri Srikanth for immediate date clearance and confidential tariff discussion.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {/* STEP 1: Venue Picker */}
                  {step === 1 && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-2 font-mono">
                        1. Select Venue Hall
                      </span>
                      {siteConfig.venues.map((v) => {
                        const isSelected = selectedVenue === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVenue(v.id)}
                            aria-pressed={isSelected}
                            className={`w-full min-h-[48px] py-3 px-4 rounded-xl text-left border transition-all text-sm font-semibold flex items-center justify-between ${
                              isSelected
                                ? "bg-zinc-900 text-amber-300 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50"
                                : "bg-zinc-900/60 text-zinc-300 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
                            }`}
                          >
                            <span className="font-bold">{v.name}</span>
                            <span className={`text-[10px] font-mono ${isSelected ? "text-amber-400" : "text-zinc-500"}`}>
                              {v.seatingCapacity.toLocaleString()} seats
                            </span>
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full min-h-[48px] mt-2 py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4 text-zinc-950" />
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Date & Shift */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="sheet-date" className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-1.5 font-mono">
                          2. Target Event Date
                        </label>
                        <input
                          id="sheet-date"
                          type="date"
                          required
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full min-h-[48px] bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-1.5 font-mono">
                          3. Ceremony Shift
                        </span>
                        <div className="grid grid-cols-3 gap-1.5 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
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
                              className={`min-h-[44px] py-2 text-xs font-bold rounded-lg transition-all ${
                                selectedShift === value
                                  ? "bg-amber-500 text-zinc-950 shadow-sm"
                                  : "text-zinc-400 hover:text-white"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        <p className="mt-3 flex items-start gap-1.5 text-amber-400/90 text-xs leading-relaxed">
                          <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
                          <span>Note: Auspicious Telugu Muhurtham dates fill rapidly up to 6–12 months in advance. Inquire early to reserve your preferred hall.</span>
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="sheet-guests" className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 font-mono">
                            4. Estimated Gathering
                          </label>
                          <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30 font-mono">
                            {guestCount.toLocaleString()} Attendees
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
                          className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="min-h-[48px] px-4 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1 min-h-[48px] py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4 text-zinc-950" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Quick Contact */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <p className="text-xs text-zinc-400 bg-zinc-900 border border-amber-500/20 rounded-xl p-3 leading-relaxed">
                        Almost done — share your details and we will confirm clearance on WhatsApp for{" "}
                        <strong className="text-amber-300">{siteConfig.venues.find(v => v.id === selectedVenue)?.name}</strong>{" "}
                        on <strong className="text-amber-300">{selectedDate}</strong>.
                      </p>

                      <div>
                        <label htmlFor="sheet-name" className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-1 font-mono">
                          Host / Family Contact Name *
                        </label>
                        <input
                          id="sheet-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Srikanth Varma"
                          className="w-full min-h-[48px] bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="sheet-phone" className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-1 font-mono">
                          Mobile Phone Number *
                        </label>
                        <input
                          id="sheet-phone"
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="10-digit mobile number"
                          className="w-full min-h-[48px] bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="min-h-[48px] px-4 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          className="flex-1 min-h-[48px] py-3.5 px-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4 text-zinc-950" />
                          <span>Request Availability on WhatsApp</span>
                        </button>
                      </div>

                      <div className="text-center pt-2">
                        <a
                          href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-amber-300 transition-colors font-mono"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>Prefer direct call? {siteConfig.contact.primaryPhone}</span>
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
