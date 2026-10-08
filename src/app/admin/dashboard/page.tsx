"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  TrendingUp, 
  ArrowUpRight,
  Phone,
  PlusCircle,
  Eye,
  Filter
} from "lucide-react";
import { BookingRecord, BookingStatus } from "@/lib/types";
import { formatIndianCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/bookings");
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute metrics
  const newEnquiries = bookings.filter((b) => b.status === "NEW_ENQUIRY");
  const provisionalHolds = bookings.filter((b) => b.status === "PROVISIONAL_HOLD");
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const maintenanceBlocks = bookings.filter((b) => b.status === "MAINTENANCE_BLOCK");

  const totalQuoteValue = bookings.reduce(
    (acc, b) => acc + (b.internalQuoteAmount || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">
            Operations Executive Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            The Royal Conventions Dashboard
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Real-time multi-hall bookings, inquiries pipeline, and deterministic calendar locks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/bookings"
            className="px-4 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-black text-[#DFCA95] text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
            <span>Block Date / Add Booking</span>
          </Link>
          <Link
            href="/admin/calendar"
            className="px-4 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#A58039] text-[#1A1A1A] text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Unified Calendar Matrix</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: New Enquiries */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              New Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-serif text-3xl font-bold text-zinc-900">
              {newEnquiries.length}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Requires manager contact call</p>
          </div>
          <div className="pt-3 mt-3 border-t border-zinc-100">
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[#8C6D31] hover:underline flex items-center gap-1"
            >
              <span>View lead queue</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* KPI 2: Provisional Holds */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Provisional Holds
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-serif text-3xl font-bold text-zinc-900">
              {provisionalHolds.length}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Pending advance token confirmation</p>
          </div>
          <div className="pt-3 mt-3 border-t border-zinc-100">
            <Link
              href="/admin/calendar"
              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
            >
              <span>Inspect holds on matrix</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* KPI 3: Confirmed Bookings */}
        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Confirmed Booked
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-serif text-3xl font-bold text-zinc-900">
              {confirmedBookings.length}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">Concurrently locked & scheduled</p>
          </div>
          <div className="pt-3 mt-3 border-t border-zinc-100">
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Manage bookings</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* KPI 4: Private Internal Pipeline */}
        <div className="p-5 rounded-2xl bg-[#1A1A1A] text-white border border-[#C5A059]/30 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFCA95]">
              Private Quote Pipeline
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#C5A059]/20 text-[#DFCA95] flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-serif text-2xl font-bold text-white">
              {formatIndianCurrency(totalQuoteValue)}
            </div>
            <p className="text-[10px] text-zinc-400 mt-1">Confidential internal revenue pipeline</p>
          </div>
          <div className="pt-3 mt-3 border-t border-zinc-800 text-[11px] text-[#DFCA95] font-semibold">
            Strictly Private (Owner / GM Only)
          </div>
        </div>
      </div>

      {/* Recent Events & Inquiries Table */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              Live Lead Submissions & Bookings Log
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Chronological log of customer inquiries, provisional holds, and hard-locked bookings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/enquiries"
              className="px-3 py-1.5 rounded-lg border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              View Full Kanban Pipeline →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-zinc-200 text-zinc-600 uppercase tracking-wider text-[11px]">
                <th className="p-4">Customer / Event</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Date & Shift</th>
                <th className="p-4">Status</th>
                <th className="p-4">Internal Quote</th>
                <th className="p-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-zinc-500">
                    Loading records...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-zinc-500">
                    No bookings logged yet.
                  </td>
                </tr>
              ) : (
                bookings.slice(0, 8).map((b) => {
                  const statusColors: Record<BookingStatus, string> = {
                    NEW_ENQUIRY: "bg-blue-100 text-blue-800",
                    PROVISIONAL_HOLD: "bg-amber-100 text-amber-800",
                    CONFIRMED: "bg-rose-100 text-rose-800 font-bold",
                    REJECTED: "bg-zinc-100 text-zinc-600",
                    CANCELLED: "bg-zinc-100 text-zinc-600",
                    MAINTENANCE_BLOCK: "bg-zinc-200 text-zinc-800 font-bold",
                  };

                  return (
                    <tr key={b.id} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#1A1A1A]">{b.customerName}</div>
                        <div className="text-[11px] text-zinc-500">{b.eventType || "Occasion"}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-zinc-900">{b.venueName}</span>
                        {b.guestCount && (
                          <div className="text-[11px] text-zinc-500">{b.guestCount} Guests</div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-zinc-900">{formatDate(b.date)}</div>
                        <div className="text-[11px] text-[#8C6D31] font-semibold">
                          {b.shift.replace("_", " ")}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                            statusColors[b.status] || "bg-zinc-100 text-zinc-700"
                          }`}
                        >
                          {b.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-medium text-zinc-800">
                        {formatIndianCurrency(b.internalQuoteAmount)}
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={`tel:${b.customerPhone.replace(/\s+/g, "")}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-[#C5A059]/20 text-zinc-800 hover:text-[#8C6D31] font-bold text-xs transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{b.customerPhone}</span>
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
