"use client";

import { useState, useEffect } from "react";
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
import { siteConfig } from "@/config/site";
import { Shift, DayAvailability } from "@/lib/types";
import { getRealAvailability, holdsForDate } from "@/lib/availability";
import { conflictingHoldKeys } from "@/lib/enquiryModel";
import { enquirySchema } from "@/lib/validations";
import { submitBookingLead } from "@/lib/leads";

interface Props {
  initialVenueId?: string;
  initialDate?: string;
  onSuccess?: (inquiryId: string) => void;
}

export default function InteractiveAvailabilityChecker({
  initialVenueId,
  initialDate,
  onSuccess,
}: Props) {
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  };

  const searchParams = useSearchParams();

  const [selectedVenue, setSelectedVenue] = useState(() => {
    const v = searchParams.get("venue");
    if (v && siteConfig.venues.some((venue) => venue.id === v)) return v;
    return initialVenueId || "royal-convention";
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = searchParams.get("date");
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    return initialDate || getDefaultDate();
  });
  const [selectedShift, setSelectedShift] = useState<Shift>("EVENING_SHIFT");

  // Live slot status from the booking ledger (confirmed / hold / maintenance).
  // Keyed result: the UI derives loading/availability from whether the latest
  // fetch matches the current selection — no synchronous effect updates needed.
  const [availabilityResult, setAvailabilityResult] = useState<{
    key: string;
    data: DayAvailability | null;
  } | null>(null);

  useEffect(() => {
    let live = true;
    const key = `${selectedVenue}|${selectedDate}`;
    getRealAvailability(selectedVenue, selectedDate)
      .then((data) => {
        if (live) setAvailabilityResult({ key, data });
      })
      .catch(() => {
        if (live) setAvailabilityResult({ key, data: null });
      });
    return () => {
      live = false;
    };
  }, [selectedVenue, selectedDate]);

  const availabilityKey = `${selectedVenue}|${selectedDate}`;
  const availability =
    availabilityResult && availabilityResult.key === availabilityKey
      ? availabilityResult.data
      : null;
  const loadingAvailability = !availabilityResult || availabilityResult.key !== availabilityKey;

  const [step, setStep] = useState<"check" | "details" | "success">("check");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [eventType, setEventType] = useState("Grand Wedding & Reception");
  const [guestCount, setGuestCount] = useState<number | "">(800);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [confirmedInquiryId, setConfirmedInquiryId] = useState<string | null>(null);

  const activeSlot = availability?.slots.find((s) => s.shift === selectedShift);
  const isSlotAvailable = activeSlot?.status === "AVAILABLE";
  const isSlotProvisional = activeSlot?.status === "PROVISIONAL";

  const handleProceedToForm = () => {
    setStep("details");
  };

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});

    const draft = {
      venueId: selectedVenue,
      date: selectedDate,
      shift: selectedShift,
      customerName: customerName.trim(),
      customerPhone: customerPhone.replace(/\D/g, ""),
      customerEmail: customerEmail.trim(),
      guestCount: typeof guestCount === "number" ? guestCount : undefined,
      eventType: eventType.trim(),
      notes: notes.trim() || undefined,
    };

    const parsed = enquirySchema.safeParse(draft);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      setSubmitError("Please review the highlighted fields below.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Re-verify the slot against live Firestore holds immediately before
      // writing the lead, so a just-confirmed slot is reported honestly.
      // (Hard double-booking prevention happens atomically at confirmation.)
      const liveHolds = await holdsForDate(selectedVenue, selectedDate);
      const heldShifts = new Set(liveHolds.map((h) => `${selectedVenue}__${selectedDate}__${h.shift}`));
      const conflict = conflictingHoldKeys(selectedVenue, selectedDate, selectedShift).some((k) =>
        heldShifts.has(k)
      );
      if (conflict) {
        setSubmitError(
          "This slot was just reserved. Please choose another shift or date — or call us and we will help."
        );
        return;
      }

      const activeVenueObj = siteConfig.venues.find((v) => v.id === selectedVenue);
      const chosenShiftObj = siteConfig.shifts.find((s) => s.id === selectedShift);

      const result = await submitBookingLead({
        ...parsed.data,
        venueName: activeVenueObj?.name,
        shiftName: chosenShiftObj?.name,
        source: "availability-checker",
      });

      if (result.success) {
        setConfirmedInquiryId(result.inquiryId);
        setStep("success");
        if (onSuccess) onSuccess(result.inquiryId);
      } else {
        setSubmitError(result.error);
      }
    } catch {
      setSubmitError("Connection timeout. Please contact our reservation desk directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeVenueObj = siteConfig.venues.find((v) => v.id === selectedVenue);

  return (
    <div className="bg-pure-white border border-natural-sand shadow-xl rounded-3xl overflow-hidden max-w-3xl mx-auto relative">
      {/* Header Accent */}
      <div className="bg-warm-cream p-6 sm:p-7 text-forest-charcoal border-b border-natural-sand flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-deep-sage font-semibold uppercase tracking-widest">
            <Building2 className="w-4 h-4 text-deep-sage" />
            <span>Venue Date Availability</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-deep-sage mt-1">
            Check Hall Dates &amp; Inquire
          </h3>
          <p className="text-xs text-forest-charcoal/70 mt-1 font-sans">
            Direct calendar verification across our 4 Mangalagiri campus venues.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase font-semibold tracking-wider px-3.5 py-1.5 rounded-full bg-soft-sage/25 text-deep-sage border border-soft-sage/40">
            {step === "check" ? "Step 1 of 2: Dates" : step === "details" ? "Step 2 of 2: Details" : "Received"}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8">
        {step === "check" && (
          <div className="space-y-6">
            {/* 1. Venue Selector Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-deep-sage mb-3">
                1. Select Preferred Venue
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
                {siteConfig.venues.map((venue) => {
                  const isSelected = selectedVenue === venue.id;
                  return (
                    <button
                      key={venue.id}
                      type="button"
                      onClick={() => setSelectedVenue(venue.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-deep-sage bg-soft-sage/25 shadow-xs ring-1 ring-deep-sage/40 text-deep-sage"
                          : "border-natural-sand/70 hover:border-soft-sage bg-warm-cream/40 text-forest-charcoal/75 hover:text-forest-charcoal"
                      }`}
                    >
                      <div className="font-serif font-semibold text-sm leading-snug">
                        {venue.name}
                      </div>
                      <div className="text-[11px] text-deep-sage/80 font-medium mt-1 font-sans">
                        {venue.seatingCapacityLabel ?? venue.seatingCapacity} Seated
                      </div>
                      {venue.lodgingAttached && (
                        <div className="mt-2 text-[10px] text-deep-sage flex items-center gap-1 font-medium font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-deep-sage" />
                          <span>Suites Attached</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Date Selection & Shift Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-deep-sage mb-3">
                  2. Select Event Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-natural-sand focus:border-deep-sage focus:ring-1 focus:ring-deep-sage outline-none text-sm text-forest-charcoal font-medium bg-pure-white"
                  />
                  <CalendarIcon className="w-4 h-4 text-deep-sage/60 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-forest-charcoal/60 mt-1.5">
                  Select your auspicious muhurtham or reception date.
                </p>
              </div>

              {/* 3. Shift Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-deep-sage mb-3">
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
                            ? "border-deep-sage bg-soft-sage/25 ring-1 ring-deep-sage/30 text-deep-sage"
                            : "border-natural-sand/70 hover:border-soft-sage bg-warm-cream/30 text-forest-charcoal/75"
                        }`}
                      >
                        <div>
                          <span className="font-semibold text-forest-charcoal block">{s.name}</span>
                          <span className="text-forest-charcoal/60 text-[11px] flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-deep-sage" />
                            {s.time}
                          </span>
                        </div>

                        <div>
                          {isBooked ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                              Booked
                            </span>
                          ) : isHold ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-natural-sand/50 text-forest-charcoal border border-natural-sand">
                              Provisional
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-soft-sage/30 text-deep-sage border border-soft-sage/50">
                              Available
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 flex items-start gap-1.5 text-forest-charcoal/70 text-xs leading-relaxed">
                  <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-deep-sage" />
                  <span>Auspicious Muhurtham dates fill early. Submit your inquiry to place a preliminary hold.</span>
                </p>
              </div>
            </div>

            {/* Real-time Status Banner */}
            <div className="rounded-2xl p-4 sm:p-5 border bg-warm-cream/50 border-natural-sand">
              {loadingAvailability ? (
                <div className="flex items-center gap-3 text-forest-charcoal/70 p-4" role="status">
                  <div className="w-5 h-5 border-2 border-deep-sage border-t-transparent rounded-full animate-spin shrink-0" />
                  <p className="text-xs">Checking our booking calendar for {selectedDate}…</p>
                </div>
              ) : !availability ? (
                <div className="flex items-start gap-3 text-forest-charcoal bg-pure-white border border-natural-sand p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-deep-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-deep-sage">
                      Calendar temporarily unavailable
                    </h4>
                    <p className="text-xs text-forest-charcoal/80 mt-0.5 leading-relaxed">
                      We could not load live slot status. You can still submit your inquiry and our desk will confirm availability personally.
                    </p>
                  </div>
                </div>
              ) : isSlotAvailable ? (
                <div className="flex items-start gap-3 text-deep-sage bg-soft-sage/20 border border-soft-sage/50 p-4 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-deep-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-deep-sage">
                      Slot Open for {activeVenueObj?.name}
                    </h4>
                    <p className="text-xs text-forest-charcoal/80 mt-0.5 leading-relaxed font-sans">
                      No conflicting holds in our booking calendar for {selectedShift.replace("_", " ")} on{" "}
                      <strong className="text-deep-sage font-medium">{selectedDate}</strong>. Proceed to request your reservation.
                    </p>
                  </div>
                </div>
              ) : isSlotProvisional ? (
                <div className="flex items-start gap-3 text-forest-charcoal bg-natural-sand/30 border border-natural-sand p-4 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-deep-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-deep-sage">
                      Provisional Hold on this Slot
                    </h4>
                    <p className="text-xs text-forest-charcoal/80 mt-0.5 leading-relaxed">
                      Another client holds a tentative reservation. You may submit an inquiry to join the waitlist.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 text-rose-800 bg-rose-50 border border-rose-200 p-4 rounded-xl">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-rose-900">
                      Slot Reserved
                    </h4>
                    <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
                      This shift is booked. You can check alternative campus halls or nearby auspicious dates.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Proceed CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-forest-charcoal/70 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-deep-sage" />
                <span>Strict private tariff policy · Inquiries are non-binding</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToForm}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-deep-sage hover:bg-forest-charcoal text-pure-white text-sm font-semibold transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-[0.99] min-h-[50px]"
              >
                <span>Proceed with Booking Inquiry</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Customer Contact & Requirements Form */}
        {step === "details" && (
          <form onSubmit={handleSubmitEnquiry} className="space-y-5">
            <div className="p-4 rounded-2xl bg-warm-cream border border-natural-sand flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-forest-charcoal">
                <span className="text-forest-charcoal/60">Selected: </span>
                <strong className="text-deep-sage">{activeVenueObj?.name}</strong> •{" "}
                <strong className="text-deep-sage">{selectedDate}</strong> •{" "}
                <span className="text-deep-sage font-medium">
                  {selectedShift.replace("_", " ")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep("check")}
                className="text-xs text-deep-sage underline hover:text-forest-charcoal font-semibold"
              >
                Change Date / Hall
              </button>
            </div>

            {submitError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-deep-sage mb-1.5">
                  Full Name / Host Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srikanth Varma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  aria-invalid={!!fieldErrors.customerName}
                  className="w-full px-4 py-3 rounded-xl border border-natural-sand bg-pure-white focus:border-deep-sage text-forest-charcoal text-sm outline-none"
                />
                {fieldErrors.customerName && (
                  <p className="text-rose-600 text-xs mt-1.5" role="alert">{fieldErrors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-sage mb-1.5">
                  Contact Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9866333055"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  aria-invalid={!!fieldErrors.customerPhone}
                  className="w-full px-4 py-3 rounded-xl border border-natural-sand bg-pure-white focus:border-deep-sage text-forest-charcoal text-sm outline-none"
                />
                {fieldErrors.customerPhone && (
                  <p className="text-rose-600 text-xs mt-1.5" role="alert">{fieldErrors.customerPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-sage mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  aria-invalid={!!fieldErrors.customerEmail}
                  className="w-full px-4 py-3 rounded-xl border border-natural-sand bg-pure-white focus:border-deep-sage text-forest-charcoal text-sm outline-none"
                />
                {fieldErrors.customerEmail && (
                  <p className="text-rose-600 text-xs mt-1.5" role="alert">{fieldErrors.customerEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep-sage mb-1.5">
                  Estimated Guest Count
                </label>
                <input
                  type="number"
                  min="20"
                  max="10000"
                  placeholder="e.g. 800"
                  value={guestCount}
                  onChange={(e) =>
                    setGuestCount(e.target.value ? parseInt(e.target.value) : "")
                  }
                  aria-invalid={!!fieldErrors.guestCount}
                  className="w-full px-4 py-3 rounded-xl border border-natural-sand bg-pure-white focus:border-deep-sage text-forest-charcoal text-sm outline-none"
                />
                {fieldErrors.guestCount && (
                  <p className="text-rose-600 text-xs mt-1.5" role="alert">{fieldErrors.guestCount}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-deep-sage mb-1.5">
                Occasion / Event Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-natural-sand bg-pure-white text-forest-charcoal text-sm outline-none focus:border-deep-sage"
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
              <label className="block text-xs font-semibold text-deep-sage mb-1.5">
                Additional Notes or Accommodation Requests
              </label>
              <textarea
                rows={3}
                placeholder="Mention catering preferences, room requirements, or special setup requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-natural-sand bg-pure-white focus:border-deep-sage text-forest-charcoal text-sm outline-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep("check")}
                className="px-5 py-2.5 rounded-xl border border-natural-sand text-xs font-semibold text-forest-charcoal/70 hover:bg-warm-cream"
              >
                Back to Dates
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-full bg-deep-sage hover:bg-forest-charcoal text-pure-white text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-pure-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
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
            <div className="w-16 h-16 rounded-full bg-soft-sage/30 border border-soft-sage text-deep-sage flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-deep-sage tracking-wider uppercase px-3 py-1 rounded-full bg-soft-sage/20 border border-soft-sage/40">
                Inquiry Ref: {confirmedInquiryId}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-deep-sage mt-3">
                Inquiry Logged Successfully
              </h3>
              <p className="text-sm text-forest-charcoal/80 max-w-md mx-auto mt-2 leading-relaxed font-sans">
                Thank you, <strong className="text-deep-sage">{customerName}</strong>. Your inquiry for <strong className="text-deep-sage">{activeVenueObj?.name}</strong> on{" "}
                <strong className="text-deep-sage">{selectedDate}</strong> ({selectedShift.replace("_", " ")}) has been received by our event management desk.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-warm-cream border border-natural-sand max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="font-bold text-deep-sage flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-deep-sage" />
                <span>What Happens Next:</span>
              </div>
              <p className="text-forest-charcoal/80">
                1. Our Event Directors will review your date hold and reach out within 2 business hours.
              </p>
              <p className="text-forest-charcoal/80">
                2. A customized quote and physical campus walkthrough will be arranged.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/919866333055?text=Namaste%2C%20I%20have%20submitted%20an%20inquiry%20(${confirmedInquiryId})%20for%20${encodeURIComponent(
                  activeVenueObj?.name || ""
                )}%20on%20${selectedDate}.%20Please%20guide%20me.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-deep-sage hover:bg-forest-charcoal text-pure-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors min-h-[46px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat via WhatsApp Directly</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.primaryPhone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-natural-sand bg-pure-white text-deep-sage text-xs font-semibold flex items-center justify-center gap-2 hover:bg-warm-cream transition-colors min-h-[46px]"
              >
                <Phone className="w-4 h-4 text-deep-sage" />
                <span>Call Management Desk</span>
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
                className="text-xs text-forest-charcoal/60 hover:text-deep-sage underline font-sans"
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
