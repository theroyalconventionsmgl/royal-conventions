"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  X,
  Phone,
  ShieldAlert,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { BookingRecord, BookingStatus, Shift } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminCalendarPage() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 1-12
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlotBooking, setSelectedSlotBooking] = useState<BookingRecord | null>(null);

  const monthString = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get total days in the current month
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });

  // Helper to determine status for a venue on a date
  const getVenueDayStatus = (venueId: string, dateStr: string) => {
    const dayBookings = bookings.filter(
      (b) =>
        b.venueId === venueId &&
        b.date === dateStr &&
        ["CONFIRMED", "MAINTENANCE_BLOCK", "PROVISIONAL_HOLD"].includes(b.status)
    );

    if (dayBookings.length === 0) {
      return { status: "AVAILABLE" as const, booking: null };
    }

    const confirmed = dayBookings.find((b) => b.status === "CONFIRMED");
    if (confirmed) {
      return { status: "CONFIRMED" as const, booking: confirmed };
    }

    const maintenance = dayBookings.find((b) => b.status === "MAINTENANCE_BLOCK");
    if (maintenance) {
      return { status: "MAINTENANCE" as const, booking: maintenance };
    }

    const provisional = dayBookings.find((b) => b.status === "PROVISIONAL_HOLD");
    if (provisional) {
      return { status: "PROVISIONAL" as const, booking: provisional };
    }

    return { status: "AVAILABLE" as const, booking: null };
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">
            Deterministic Availability Guard
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Multi-Hall Unified Calendar Matrix
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time status across all 3 venues. Click any slot to view reservation details or block maintenance.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-zinc-300 rounded-xl p-1 shadow-sm">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-700 transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif font-bold text-sm px-4 text-[#1A1A1A]">
              {monthName}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-700 transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/admin/bookings"
            className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-[#DFCA95] text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
            <span>Block Date</span>
          </Link>
        </div>
      </div>

      {/* Color Code Legend */}
      <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="font-bold text-zinc-700 uppercase tracking-wider text-[11px]">
            Matrix Legend:
          </span>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-600" />
            <span className="font-semibold text-emerald-950">Green = Available</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-500" />
            <span className="font-semibold text-amber-950">Yellow = Provisional Hold</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-rose-700" />
            <span className="font-semibold text-rose-950">Red = Confirmed Booked</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-zinc-400 border border-zinc-500" />
            <span className="font-semibold text-zinc-800">Grey = Maintenance Block</span>
          </div>
        </div>

        <div className="text-[11px] text-zinc-500">
          *Deterministic rule: 1 confirmed booking locks conflicting shifts.
        </div>
      </div>

      {/* Unified Multi-Hall Calendar Table Matrix */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-zinc-200 text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                <th className="p-3.5 font-bold w-48">Date & Muhurtham</th>
                <th className="p-3.5 font-serif font-bold text-sm">
                  Royal Convention
                  <span className="block text-[10px] font-sans font-normal text-zinc-500 normal-case">
                    Flagship (1,800 Seat / 3,000 Float)
                  </span>
                </th>
                <th className="p-3.5 font-serif font-bold text-sm">
                  Royal Banquet
                  <span className="block text-[10px] font-sans font-normal text-zinc-500 normal-case">
                    450 Seat + 8 Attached Deluxe Rooms
                  </span>
                </th>
                <th className="p-3.5 font-serif font-bold text-sm">
                  Vaishnavi Vaidehi
                  <span className="block text-[10px] font-sans font-normal text-zinc-500 normal-case">
                    Intimate Space (250 Seat / 500 Float)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {daysArray.map((dayNum) => {
                const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(
                  dayNum
                ).padStart(2, "0")}`;
                const dateObj = new Date(currentYear, currentMonth - 1, dayNum);
                const dayOfWeek = dateObj.toLocaleDateString("en-IN", { weekday: "short" });
                const isWeekend = dayOfWeek === "Sat" || dayOfWeek === "Sun";

                return (
                  <tr
                    key={dateStr}
                    className={`hover:bg-zinc-50/80 transition-colors ${
                      isWeekend ? "bg-amber-50/20" : ""
                    }`}
                  >
                    {/* Date Column */}
                    <td className="p-3.5 border-r border-zinc-100 font-medium">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-sm text-[#1A1A1A]">{dayNum}</span>
                        <span className="text-zinc-500 text-[11px] font-semibold">{dayOfWeek}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">{dateStr}</span>
                    </td>

                    {/* Venue 1: Royal Convention */}
                    <td className="p-2 border-r border-zinc-100">
                      {renderMatrixSlot(getVenueDayStatus("royal-convention", dateStr))}
                    </td>

                    {/* Venue 2: Royal Banquet */}
                    <td className="p-2 border-r border-zinc-100">
                      {renderMatrixSlot(getVenueDayStatus("royal-banquets", dateStr))}
                    </td>

                    {/* Venue 3: Vaishnavi Vaidehi */}
                    <td className="p-2">
                      {renderMatrixSlot(getVenueDayStatus("vaishnavi-vaidehi", dateStr))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slot Booking Inspection Modal */}
      {selectedSlotBooking && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedSlotBooking(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                  Reservation Audit Record
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                  {selectedSlotBooking.venueName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSlotBooking(null)}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50">
                <span className="text-zinc-400 text-[10px] block">Date</span>
                <strong className="text-zinc-900">{formatDate(selectedSlotBooking.date)}</strong>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50">
                <span className="text-zinc-400 text-[10px] block">Time Shift</span>
                <strong className="text-zinc-900">{selectedSlotBooking.shift.replace("_", " ")}</strong>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50">
                <span className="text-zinc-400 text-[10px] block">Customer / Host</span>
                <strong className="text-zinc-900">{selectedSlotBooking.customerName}</strong>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50">
                <span className="text-zinc-400 text-[10px] block">Status</span>
                <strong className="text-zinc-900">{selectedSlotBooking.status.replace("_", " ")}</strong>
              </div>
            </div>

            {selectedSlotBooking.notes && (
              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-amber-900">
                <span className="font-bold block text-[10px] uppercase tracking-wider">
                  Internal Notes:
                </span>
                <p className="mt-0.5">{selectedSlotBooking.notes}</p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href={`tel:${selectedSlotBooking.customerPhone.replace(/\s+/g, "")}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-800"
              >
                <Phone className="w-4 h-4" />
                <span>Call Host ({selectedSlotBooking.customerPhone})</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedSlotBooking(null)}
                className="px-5 py-2.5 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function renderMatrixSlot(slotData: { status: "AVAILABLE" | "CONFIRMED" | "MAINTENANCE" | "PROVISIONAL"; booking: BookingRecord | null }) {
    if (slotData.status === "AVAILABLE") {
      return (
        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 flex items-center justify-between text-[11px] font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Available
          </span>
          <span className="text-[10px] text-emerald-600 font-mono">Open</span>
        </div>
      );
    }

    if (slotData.status === "CONFIRMED") {
      return (
        <button
          type="button"
          onClick={() => slotData.booking && setSelectedSlotBooking(slotData.booking)}
          className="w-full p-2 rounded-lg bg-rose-100 border border-rose-300 text-rose-900 hover:bg-rose-200 transition-colors text-left text-[11px]"
        >
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-rose-950">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              Booked
            </span>
            <span className="text-[10px] uppercase font-mono px-1 rounded bg-rose-200 text-rose-900">
              {slotData.booking?.shift.replace("_SHIFT", "")}
            </span>
          </div>
          <div className="text-[10px] text-rose-800 truncate mt-0.5">
            {slotData.booking?.customerName}
          </div>
        </button>
      );
    }

    if (slotData.status === "PROVISIONAL") {
      return (
        <button
          type="button"
          onClick={() => slotData.booking && setSelectedSlotBooking(slotData.booking)}
          className="w-full p-2 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 hover:bg-amber-200 transition-colors text-left text-[11px]"
        >
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-amber-950">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Provisional
            </span>
            <span className="text-[10px] uppercase font-mono px-1 rounded bg-amber-200 text-amber-900">
              {slotData.booking?.shift.replace("_SHIFT", "")}
            </span>
          </div>
          <div className="text-[10px] text-amber-800 truncate mt-0.5">
            {slotData.booking?.customerName}
          </div>
        </button>
      );
    }

    if (slotData.status === "MAINTENANCE") {
      return (
        <button
          type="button"
          onClick={() => slotData.booking && setSelectedSlotBooking(slotData.booking)}
          className="w-full p-2 rounded-lg bg-zinc-200 border border-zinc-400 text-zinc-900 hover:bg-zinc-300 transition-colors text-left text-[11px]"
        >
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-zinc-950">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              Maintenance Block
            </span>
          </div>
          <div className="text-[10px] text-zinc-700 truncate mt-0.5">
            {slotData.booking?.eventType || "Facility Overhaul"}
          </div>
        </button>
      );
    }

    return null;
  }
}
