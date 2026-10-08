"use client";

import { useState, useEffect } from "react";
import { 
  BookMarked, 
  PlusCircle, 
  ShieldAlert, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Wrench,
  Clock,
  Phone
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { BookingRecord, BookingStatus, Shift } from "@/lib/types";
import { formatIndianCurrency, formatDate } from "@/lib/utils";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  // Form State
  const [entryType, setEntryType] = useState<"BOOKING" | "MAINTENANCE">("BOOKING");
  const [venueId, setVenueId] = useState("royal-convention");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [shift, setShift] = useState<Shift>("FULL_DAY");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [guestCount, setGuestCount] = useState<number | "">("");
  const [eventType, setEventType] = useState("Wedding & Reception");
  const [internalQuoteAmount, setInternalQuoteAmount] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [formStatus, setFormStatus] = useState<BookingStatus>("CONFIRMED");

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Fetch bookings error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);

    const venue = siteConfig.venues.find((v) => v.id === venueId);
    const venueName = venue ? venue.name : "The Royal Conventions";

    const payload = {
      venueId,
      venueName,
      date,
      shift,
      status: entryType === "MAINTENANCE" ? "MAINTENANCE_BLOCK" : formStatus,
      customerName:
        entryType === "MAINTENANCE"
          ? "Maintenance Block (Facility Engineering)"
          : customerName,
      customerPhone:
        entryType === "MAINTENANCE" ? siteConfig.contact.primaryPhone : customerPhone,
      customerEmail: customerEmail || undefined,
      guestCount: guestCount ? Number(guestCount) : 0,
      eventType:
        entryType === "MAINTENANCE"
          ? eventType || "HVAC Chiller & Lighting Maintenance"
          : eventType,
      notes: notes || undefined,
      internalQuoteAmount:
        internalQuoteAmount ? Number(internalQuoteAmount) : undefined,
    };

    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.error || "Failed to create entry. Concurrency lock error.");
        setIsSubmitting(false);
        return;
      }

      setFormSuccess(
        entryType === "MAINTENANCE"
          ? "Facility maintenance block successfully applied to calendar."
          : "Confirmed booking successfully created and calendar locked!"
      );
      setIsSubmitting(false);
      fetchBookings();
      setTimeout(() => {
        setFormOpen(false);
        setFormSuccess("");
      }, 1800);
    } catch {
      setFormError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">
            Management Logs
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Manual Booking Entry & Date Blocking
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Log walk-in reservations, phone agreements, or apply maintenance blocks with automatic concurrency checks.
          </p>
        </div>

        <button
          onClick={() => {
            setFormOpen(true);
            setFormError("");
            setFormSuccess("");
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-[#1A1A1A]" />
          <span>New Manual Reservation / Block</span>
        </button>
      </div>

      {/* Manual Booking / Date Block Form Drawer Modal */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setFormOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                  Direct Management Action
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                  {entryType === "MAINTENANCE"
                    ? "Apply Facility Maintenance Block"
                    : "Log Walk-In / Phone Booking"}
                </h3>
              </div>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400"
              >
                ✕
              </button>
            </div>

            {/* Entry Type Toggle Tabs */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-zinc-100 text-xs font-bold">
              <button
                type="button"
                onClick={() => setEntryType("BOOKING")}
                className={`py-2 rounded-lg transition-all ${
                  entryType === "BOOKING"
                    ? "bg-white text-[#1A1A1A] shadow-sm"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                Walk-In / Direct Reservation
              </button>
              <button
                type="button"
                onClick={() => setEntryType("MAINTENANCE")}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  entryType === "MAINTENANCE"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Maintenance Date Block</span>
              </button>
            </div>

            {formError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
                <div>
                  <span className="font-bold block">Concurrency Conflict Detected:</span>
                  <span>{formError}</span>
                </div>
              </div>
            )}

            {formSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                    Select Venue
                  </label>
                  <select
                    value={venueId}
                    onChange={(e) => setVenueId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs font-semibold bg-white"
                  >
                    {siteConfig.venues.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                    Target Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                    Time Shift
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value as Shift)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs font-semibold bg-white"
                  >
                    <option value="FULL_DAY">Full Day (24 Hours - Locks All Day)</option>
                    <option value="MORNING_SHIFT">Morning Shift (06:00 AM – 02:00 PM)</option>
                    <option value="EVENING_SHIFT">Evening Shift (04:00 PM – 11:30 PM)</option>
                  </select>
                </div>

                {entryType === "BOOKING" && (
                  <div>
                    <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                      Booking Status
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as BookingStatus)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs font-semibold bg-white"
                    >
                      <option value="CONFIRMED">CONFIRMED (Advance Token Received)</option>
                      <option value="PROVISIONAL_HOLD">PROVISIONAL HOLD (Tentative Hold)</option>
                    </select>
                  </div>
                )}
              </div>

              {entryType === "BOOKING" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                        Client / Host Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. N. Rama Krishna"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                        Client Contact Phone <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9866333055"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                        Occasion Type
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pelli / Muhurtham"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                        Guest Count
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 1200"
                        value={guestCount}
                        onChange={(e) =>
                          setGuestCount(e.target.value ? parseInt(e.target.value) : "")
                        }
                        className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                        Agreed Package / Quote (INR)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 420000"
                        value={internalQuoteAmount}
                        onChange={(e) =>
                          setInternalQuoteAmount(
                            e.target.value ? parseInt(e.target.value) : ""
                          )
                        }
                        className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                    Maintenance Purpose & Scope
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chiller Plant Deep Cleaning & Chandelier Restringing"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                  Internal Notes & Special Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Token advance reference, decorator permit, lodging room numbers..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Locking in Database..." : "Commit Reservation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bookings & Blocks Ledger */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Confirmed Bookings & Maintenance Ledger
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Current hard locks protecting against duplicate scheduling.
            </p>
          </div>
          <span className="text-xs font-bold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full">
            {bookings.length} Total Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-zinc-200 uppercase tracking-wider text-zinc-600 text-[11px]">
                <th className="p-4">Date & Shift</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Reservation / Block Title</th>
                <th className="p-4">Contact Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Internal Tariff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-zinc-50">
                  <td className="p-4 font-mono">
                    <div className="font-bold text-zinc-900">{formatDate(b.date)}</div>
                    <div className="text-[11px] text-[#8C6D31] font-semibold">
                      {b.shift.replace("_", " ")}
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-zinc-900">{b.venueName}</td>
                  <td className="p-4">
                    <div className="font-bold text-[#1A1A1A]">{b.customerName}</div>
                    <div className="text-[11px] text-zinc-500">{b.eventType}</div>
                  </td>
                  <td className="p-4 font-mono text-zinc-700">{b.customerPhone}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.status === "CONFIRMED"
                          ? "bg-rose-100 text-rose-800"
                          : b.status === "MAINTENANCE_BLOCK"
                          ? "bg-zinc-200 text-zinc-800"
                          : b.status === "PROVISIONAL_HOLD"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-zinc-900">
                    {formatIndianCurrency(b.internalQuoteAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
