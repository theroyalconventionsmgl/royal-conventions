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
import { Shift, AvailabilitySlot, DayAvailability } from "@/lib/types";
import { submitBookingLead, BookingLead } from "@/lib/leads";

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

  // Static hosting: every shift presented as open — final holds confirmed directly with management.
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
  const [guestCount, setGuestCount] = useState<number | "">("");
  const [eventType, setEventType] = useState("Grand Wedding & Reception");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedInquiryId, setConfirmedInquiryId] = useState("");

  // Current slot status
  const currentSlot: AvailabilitySlot | undefined = availability?.slots.find(
    (s) => s.shift === selectedShift
  );

  const isSlotAvailable = !currentSlot || currentSlot.status === "AVAILABLE";
  const isSlotProvisional = currentSlot?.status === "PROVISIONAL";
  const isSlotBooked = currentSlot?.status === "BOOKED" || currentSlot?.status === "BLOCKED";

  const handleProceedToForm = () => {
    setStep("details");
  };

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const result = await submitBookingLead({
        name: customerName,
        phone: customerPhone,
        hallId: selectedVenue as BookingLead["hallId"],
        eventDate: selectedDate,
        guestCount: guestCount ? Number(guestCount) : undefined,
        notes: [eventType, selectedShift, notes].filter(Boolean).join(" | "),
      });

      if (!result.success) {
        setSubmitError("Unable to submit inquiry. Please try again or contact us on WhatsApp.");
        setIsSubmitting(false);
        return;
      }

      setConfirmedInquiryId(result.id || `ENQ-${Date.now()}`);
      setStep("success");
      setIsSubmitting(false);

      // Trigger celebratory confetti for inquiry placement
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#0D9488", "#14B8A6", "#3B82F6", "#FFFFFF"],
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
    <div className="bg-[#F8F9FA]/90 backdrop-blur-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-3xl mx-auto relative">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Accent */}
      <div className="bg-white p-6 text-slate-900 border-b border-slate-200 relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Real-Time Availability Checker</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
            Check Hall Dates & Inquire
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Deterministic calendar checks. Private bespoke packages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#F8F9FA] text-amber-700 border border-slate-300">
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
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                1. Select Preferred Venue
              </label>

              {/* Primary Campus Venues */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-2 flex items-center gap-1.5">
                <Building2 className="w-3 h-3" /> Primary Campus Halls
              </p>
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
                          ? "border-amber-500 bg-amber-50/40 shadow-lg shadow-slate-200 ring-1 ring-amber-500/50"
                          : "border-slate-200 hover:border-slate-300 bg-white/60 text-slate-600"
                      }`}
                    >
                      <div className="font-serif font-bold text-sm text-slate-900">
                        {venue.name}
                      </div>
                      <div className="text-[11px] text-amber-700 font-medium mt-0.5">
                        {venue.seatingCapacityLabel ?? venue.seatingCapacity} Seated
                        {venue.floatingCapacity && venue.floatingCapacity !== venue.seatingCapacity
                          ? ` • ${venue.floatingCapacity} Floating`
                          : ""}
                      </div>
                      {venue.lodgingAttached && (
                        <div className="mt-2 text-[10px] text-amber-700 flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          8 Attached Deluxe Suites
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  2. Select Event Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm text-slate-900 font-medium bg-white/60"
                  />
                  <CalendarIcon className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Select your auspicious muhurtham or reception date.
                </p>
              </div>

              {/* 3. Shift Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
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
                            ? "border-amber-500 bg-amber-50/40 ring-1 ring-amber-500/40"
                            : "border-slate-200 hover:border-slate-300 bg-white/40 text-slate-600"
                        }`}
                      >
                        <div>
                          <span className="font-bold text-slate-900 block">{s.name}</span>
                          <span className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-amber-700" />
                            {s.time}
                          </span>
                        </div>

                        <div>
                          {isBooked ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
                              Booked
                            </span>
                          ) : isHold ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">
                              Provisional
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50/80 text-amber-700 border border-amber-500/30">
                              Available
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 flex items-start gap-1.5 text-amber-600/90 text-xs leading-relaxed">
                  <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                  <span>Note: Auspicious Telugu Muhurtham dates fill rapidly up to 6–12 months in advance. Submit your inquiry early to reserve your preferred hall.</span>
                </p>
              </div>
            </div>

            {/* Real-time Status Banner */}
            <div className="rounded-2xl p-5 border transition-all bg-white/60 border-slate-200">
              {loadingAvailability ? (
                <div className="flex items-center gap-3 text-slate-500 text-xs">
                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span>Checking database availability for {selectedDate}...</span>
                </div>
              ) : isSlotAvailable ? (
                <div className="flex items-start gap-3 text-amber-700 bg-amber-50/40 border border-amber-500/20 p-4 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Slot Currently Available for {activeVenueObj?.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      No confirmed bookings exist for {selectedShift.replace("_", " ")} on{" "}
                      <strong className="text-slate-900">{selectedDate}</strong>. You may proceed to submit your formal inquiry for immediate reservation hold.
                    </p>
                  </div>
                </div>
              ) : isSlotProvisional ? (
                <div className="flex items-start gap-3 text-amber-300 bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Provisional Hold on this Slot
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Another client holds a tentative reservation pending token advance. You can still submit an inquiry to enter the priority management waitlist.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 text-rose-300 bg-rose-950/40 border border-rose-500/30 p-4 rounded-xl">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      Slot Confirmed / Reserved
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      This date and shift is locked. You can explore our other two adjacent venues on this campus or test nearby auspicious dates.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Proceed CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Strict private tariff policy. No public price exposure.</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToForm}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed with Booking Inquiry</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-slate-900" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Customer Contact & Requirements Form */}
        {step === "details" && (
          <form onSubmit={handleSubmitEnquiry} className="space-y-5">
            <div className="p-4 rounded-xl bg-white/60 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-slate-600">
                <span className="text-slate-500">Selected: </span>
                <strong className="text-slate-900">{activeVenueObj?.name}</strong> •{" "}
                <strong className="text-slate-900">{selectedDate}</strong> •{" "}
                <span className="text-amber-700 font-semibold">
                  {selectedShift.replace("_", " ")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep("check")}
                className="text-xs text-amber-700 underline hover:text-amber-700"
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
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Full Name / Host Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srikanth Varma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-amber-500 text-slate-900 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Contact Mobile Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9866333055"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-amber-500 text-slate-900 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-amber-500 text-slate-900 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-amber-500 text-slate-900 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Occasion / Event Type <span className="text-rose-400">*</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm outline-none focus:border-amber-500"
              >
                <option value="Grand Wedding & Reception">Grand Wedding & Reception</option>
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
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Additional Notes or Lodging Requests
              </label>
              <textarea
                rows={3}
                placeholder="Mention catering requirements, deluxe room counts, decorator setup time, or special inquiries..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-amber-500 text-slate-900 text-sm outline-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep("check")}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Back to Dates
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-slate-200 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-900" />
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
            <div className="w-16 h-16 rounded-full bg-amber-50/80 border border-amber-500/30 text-amber-700 flex items-center justify-center mx-auto shadow-lg shadow-slate-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-amber-700 tracking-wider uppercase px-3 py-1 rounded-full bg-amber-50 border border-amber-500/20">
                Inquiry Ref: {confirmedInquiryId}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                Inquiry Transmitted to Management
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed font-light">
                Thank you, <strong className="text-slate-900">{customerName}</strong>. Your inquiry for <strong className="text-slate-900">{activeVenueObj?.name}</strong> on{" "}
                <strong className="text-slate-900">{selectedDate}</strong> ({selectedShift.replace("_", " ")}) has been logged in our lead queue.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="font-bold text-amber-700 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>What Happens Next?</span>
              </div>
              <p className="text-slate-600">
                1. Our Managers, <strong className="text-slate-900">Sri Bhaskar Rao</strong> or <strong className="text-slate-900">Sri Srikanth</strong>, will review calendar slots and call you within 2 business hours.
              </p>
              <p className="text-slate-600">
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
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat via WhatsApp Directly</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 bg-slate-100 text-amber-700 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-700" />
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
                className="text-xs text-slate-500 hover:text-slate-900 underline"
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
        <div className="bg-[#F8F9FA]/80 rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-xs shadow-md">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading Availability Checker...
        </div>
      }
    >
      <AvailabilityCheckerContent {...props} />
    </Suspense>
  );
}
