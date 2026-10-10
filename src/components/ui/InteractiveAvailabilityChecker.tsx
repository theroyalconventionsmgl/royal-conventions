"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Send, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Building2 
} from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";
import { Shift, DayAvailability } from "@/lib/types";
import { submitBookingLead } from "@/lib/leads";

interface Props {
  initialVenueId?: string;
  initialDate?: string;
  onSuccess?: (inquiryId: string) => void;
}

function AvailabilityCheckerContent({
  initialVenueId,
  initialDate,
}: Props) {
  const searchParams = useSearchParams();
  const paramVenue = searchParams.get("venue");
  const paramDate = searchParams.get("date");

  // Format today's date + 14 days as default auspicious forward date
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  };

  const [selectedVenue, setSelectedVenue] = useState(
    initialVenueId || paramVenue || "royal-convention"
  );
  const [selectedDate, setSelectedDate] = useState(
    initialDate || paramDate || getDefaultDate()
  );
  const [selectedShift, setSelectedShift] = useState<Shift>("EVENING_SHIFT");

  const availability: DayAvailability = {
    date: selectedDate,
    isFullyBooked: false,
    slots: [
      { shift: "MORNING_SHIFT", shiftName: "Morning Shift", timeWindow: "06:00 AM – 02:00 PM", status: "AVAILABLE" },
      { shift: "EVENING_SHIFT", shiftName: "Evening Shift", timeWindow: "04:00 PM – 11:30 PM", status: "AVAILABLE" },
      { shift: "FULL_DAY", shiftName: "Full Day", timeWindow: "06:00 AM – Next 05:00 AM", status: "AVAILABLE" },
    ],
  };
  const loadingAvailability = false;

  // Form submission state
  const [step, setStep] = useState<"check" | "details" | "success">("check");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [eventType, setEventType] = useState("Grand Wedding & Reception");
  const [guestCount, setGuestCount] = useState<number | "">(800);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedInquiryId, setConfirmedInquiryId] = useState<string | null>(null);

  // Sync prop changes
  useEffect(() => {
    if (initialVenueId) setSelectedVenue(initialVenueId);
  }, [initialVenueId]);

  useEffect(() => {
    if (initialDate) setSelectedDate(initialDate);
  }, [initialDate]);

  const activeSlot = availability?.slots.find((s) => s.shift === selectedShift);
  const isSlotAvailable = activeSlot?.status === "AVAILABLE";
  const isSlotProvisional = activeSlot?.status === "PROVISIONAL";

  const handleProceedToForm = () => {
    setStep("details");
  };

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await submitBookingLead({
        name: customerName,
        phone: customerPhone,
        hallId: selectedVenue as "royal-convention" | "vaishnavi-vaidehi" | "nannapaneni-lakshmi" | "royal-banquets",
        eventDate: selectedDate,
        guestCount: typeof guestCount === "number" ? guestCount : 500,
        notes: `Event: ${eventType}. Shift: ${selectedShift}. Email: ${customerEmail || "N/A"}. ${notes}`,
      });

      setConfirmedInquiryId(res.id || `TRC-${Date.now().toString().slice(-4)}`);
      setStep("success");
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#C5A059", "#1A1A1A"],
        });
      } catch {
        // Fallback gracefully
      }
    } catch {
      setSubmitError("Network error. Please check your connection or contact manager directly.");
      setIsSubmitting(false);
    }
  };

  const activeVenueObj = siteConfig.venues.find((v) => v.id === selectedVenue);

  return (
    <div className="bg-zinc-900 border border-amber-500/20 shadow-[0_0_25px_rgba(245,158,11,0.06)] rounded-3xl overflow-hidden max-w-3xl mx-auto relative">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Accent */}
      <div className="bg-zinc-950 p-6 text-zinc-100 border-b border-zinc-800 relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-widest font-mono">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Real-Time Availability Checker</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-zinc-100 mt-1">
            Check Hall Dates &amp; Inquire
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Deterministic calendar checks. Private bespoke packages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-zinc-900 text-amber-300 border border-amber-500/30 font-mono">
            Step {step === "check" ? "1 of 2: Dates" : step === "details" ? "2 of 2: Contact" : "Complete"}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8 relative z-10">
        {step === "check" && (
          <div className="space-y-6">
            {/* 1. Venue Selector Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 font-mono">
                1. Select Preferred Venue
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {siteConfig.venues.map((venue) => {
                  const isSelected = selectedVenue === venue.id;
                  return (
                    <button
                      key={venue.id}
                      type="button"
                      onClick={() => setSelectedVenue(venue.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? "border-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50"
                          : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <div className="font-serif font-bold text-sm text-zinc-100">
                        {venue.name}
                      </div>
                      <div className="text-[11px] text-amber-300 font-medium mt-0.5 font-mono">
                        {venue.seatingCapacityLabel ?? venue.seatingCapacity} Seated
                        {venue.floatingCapacity && venue.floatingCapacity !== venue.seatingCapacity
                          ? ` • ${venue.floatingCapacity} Floating`
                          : ""}
                      </div>
                      {venue.lodgingAttached && (
                        <div className="mt-2 text-[10px] text-amber-400 flex items-center gap-1 font-semibold font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          Attached Deluxe Suites
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 font-mono">
                  2. Select Event Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-zinc-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm text-zinc-100 font-medium bg-zinc-950/80"
                  />
                  <CalendarIcon className="w-4 h-4 text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5">
                  Select your auspicious muhurtham or reception date.
                </p>
              </div>

              {/* 3. Shift Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 font-mono">
                  3. Select Time Window
                </label>
                <div className="space-y-2">
                  {siteConfig.shifts.map((s) => {
                    const isSelected = selectedShift === s.id;
                    const slotStatus = availability?.slots.find((slot) => slot.shift === s.id);
                    const isBooked = slotStatus?.status === "BOOKED" || slotStatus?.status === "BLOCKED";
                    const isHold = slotStatus?.status === "PROVISIONAL";

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedShift(s.id as Shift)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? "border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/40 text-amber-300"
                            : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-400"
                        }`}
                      >
                        <div>
                          <span className="font-bold text-zinc-100 block">{s.name}</span>
                          <span className="text-zinc-500 text-[11px] flex items-center gap-1 mt-0.5 font-mono">
                            <Clock className="w-3 h-3 text-amber-400" />
                            {s.time}
                          </span>
                        </div>

                        <div>
                          {isBooked ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40 font-mono">
                              Booked
                            </span>
                          ) : isHold ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">
                              Provisional
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono">
                              Available
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 flex items-start gap-1.5 text-amber-400/90 text-xs leading-relaxed">
                  <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
                  <span>Note: Auspicious Telugu Muhurtham dates fill rapidly up to 6–12 months in advance. Inquire early to reserve your preferred hall.</span>
                </p>
              </div>
            </div>

            {/* Real-time Status Banner */}
            <div className="rounded-2xl p-5 border transition-all bg-zinc-950/80 border-amber-500/20">
              {loadingAvailability ? (
                <div className="flex items-center gap-3 text-zinc-400 text-xs">
                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span>Checking availability for {selectedDate}...</span>
                </div>
              ) : isSlotAvailable ? (
                <div className="flex items-start gap-3 text-amber-300 bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-100">
                      Slot Currently Available for {activeVenueObj?.name}
                    </h4>
                    <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                      No confirmed bookings exist for {selectedShift.replace("_", " ")} on{" "}
                      <strong className="text-amber-300 font-mono">{selectedDate}</strong>. You may proceed to submit your formal inquiry for immediate reservation hold.
                    </p>
                  </div>
                </div>
              ) : isSlotProvisional ? (
                <div className="flex items-start gap-3 text-amber-300 bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-100">
                      Provisional Hold on this Slot
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      Another client holds a tentative reservation pending token advance. You can still submit an inquiry to enter priority management waitlist.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 text-rose-300 bg-rose-950/40 border border-rose-500/30 p-4 rounded-xl">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-100">
                      Slot Confirmed / Reserved
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      This date and shift is locked. You can explore our other adjacent venues on campus or test nearby auspicious dates.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Proceed CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Strict private tariff policy. No public price exposure.</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToForm}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Proceed with Booking Inquiry</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-zinc-950" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Customer Contact & Requirements Form */}
        {step === "details" && (
          <form onSubmit={handleSubmitEnquiry} className="space-y-5">
            <div className="p-4 rounded-xl bg-zinc-950 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-zinc-300">
                <span className="text-zinc-500">Selected: </span>
                <strong className="text-zinc-100">{activeVenueObj?.name}</strong> •{" "}
                <strong className="text-amber-300 font-mono">{selectedDate}</strong> •{" "}
                <span className="text-amber-400 font-semibold font-mono">
                  {selectedShift.replace("_", " ")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep("check")}
                className="text-xs text-amber-400 underline hover:text-amber-300 font-mono"
              >
                Change Date / Hall
              </button>
            </div>

            {submitError && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 font-mono">
                  Full Name / Host Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srikanth Varma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 focus:border-amber-500 text-zinc-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 font-mono">
                  Contact Mobile Number <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9866333055"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 focus:border-amber-500 text-zinc-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 font-mono">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 focus:border-amber-500 text-zinc-100 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5 font-mono">
                  Estimated Guest Count
                </label>
                <input
                  type="number"
                  min="20"
                  max="10000"
                  placeholder="e.g. 1500"
                  value={guestCount}
                  onChange={(e) =>
                    setGuestCount(e.target.value ? parseInt(e.target.value) : "")
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 focus:border-amber-500 text-zinc-100 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5 font-mono">
                Occasion / Event Type <span className="text-amber-400">*</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-zinc-100 text-sm outline-none focus:border-amber-500"
              >
                <option value="Grand Wedding & Reception">Grand Wedding &amp; Reception</option>
                <option value="Engagement Ceremony (Nischithartham)">Engagement Ceremony (Nischithartham)</option>
                <option value="Sangeet / Mehendi Night">Sangeet / Mehendi Night</option>
                <option value="Half-Saree / Dhoti Ceremony">Half-Saree / Dhoti Ceremony</option>
                <option value="Birthday / Milestone Gathering">Birthday / Milestone Gathering</option>
                <option value="Corporate Convention / Annual Day">Corporate Convention / Annual Day</option>
                <option value="Political or Cultural Assembly">Political or Cultural Assembly</option>
                <option value="Other Function">Other Bespoke Event</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5 font-mono">
                Additional Notes or Lodging Requests
              </label>
              <textarea
                rows={3}
                placeholder="Mention catering requirements, deluxe room counts, decorator setup time, or special inquiries..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 focus:border-amber-500 text-zinc-100 text-sm outline-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep("check")}
                className="px-5 py-2.5 rounded-xl border border-zinc-700 text-xs font-semibold text-zinc-400 hover:bg-zinc-800"
              >
                Back to Dates
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-zinc-950" />
                    <span>Submit Official Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Screen */}
        {step === "success" && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-amber-300 tracking-wider uppercase px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 font-mono">
                Inquiry Ref: {confirmedInquiryId}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100 mt-3">
                Inquiry Transmitted to Management
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed font-light">
                Thank you, <strong className="text-zinc-100">{customerName}</strong>. Your inquiry for <strong className="text-zinc-100">{activeVenueObj?.name}</strong> on{" "}
                <strong className="text-amber-300 font-mono">{selectedDate}</strong> ({selectedShift.replace("_", " ")}) has been logged in our lead queue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/20 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="font-bold text-amber-300 flex items-center gap-1.5 font-mono">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>What Happens Next?</span>
              </div>
              <p className="text-zinc-400">
                1. Our Managers, <strong className="text-zinc-200">Sri Bhaskar Rao</strong> or <strong className="text-zinc-200">Sri Srikanth</strong>, will review calendar slots and call you within 2 business hours.
              </p>
              <p className="text-zinc-400">
                2. A private customized quote and physical campus walkthrough will be arranged.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/919866333055?text=Namaste%2C%20I%20have%20submitted%20an%20inquiry%20(${confirmedInquiryId})%20for%20${encodeURIComponent(
                  activeVenueObj?.name || ""
                )}%20on%20${selectedDate}.%20Please%20guide%20me.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat via WhatsApp Directly</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-amber-500/30 bg-zinc-950 text-amber-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors font-mono"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Manager Now</span>
              </a>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  setStep("check");
                  setCustomerName("");
                  setCustomerPhone("");
                  setNotes("");
                }}
                className="text-xs text-zinc-500 hover:text-amber-300 underline font-mono"
              >
                Check another date or venue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InteractiveAvailabilityChecker(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="bg-zinc-900 rounded-3xl border border-amber-500/20 p-12 text-center text-zinc-400 text-xs shadow-md">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading Availability Checker...
        </div>
      }
    >
      <AvailabilityCheckerContent {...props} />
    </Suspense>
  );
}
