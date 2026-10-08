"use client";

import { useState, useEffect } from "react";
import { 
  Inbox, 
  Phone, 
  Mail, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  Eye,
  Filter,
  DollarSign
} from "lucide-react";
import { BookingRecord, BookingStatus } from "@/lib/types";
import { formatIndianCurrency, formatDate } from "@/lib/utils";

const PIPELINE_COLUMNS: { id: BookingStatus; label: string; color: string; desc: string }[] = [
  {
    id: "NEW_ENQUIRY",
    label: "New Inquiries",
    color: "border-blue-300 bg-blue-50/50 text-blue-900",
    desc: "Awaiting manager follow-up",
  },
  {
    id: "PROVISIONAL_HOLD",
    label: "Quote Shared / Hold",
    color: "border-amber-300 bg-amber-50/50 text-amber-900",
    desc: "Tentative hold pending token",
  },
  {
    id: "CONFIRMED",
    label: "Confirmed & Locked",
    color: "border-emerald-300 bg-emerald-50/50 text-emerald-900",
    desc: "Hard locked in calendar",
  },
  {
    id: "REJECTED",
    label: "Declined / Cancelled",
    color: "border-zinc-300 bg-zinc-50/50 text-zinc-700",
    desc: "Dates released",
  },
];

export default function AdminEnquiriesPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"kanban" | "table">("kanban");
  const [editingBooking, setEditingBooking] = useState<BookingRecord | null>(null);
  const [quoteInput, setQuoteInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [statusInput, setStatusInput] = useState<BookingStatus>("NEW_ENQUIRY");
  const [statusMessage, setStatusMessage] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenEdit = (b: BookingRecord) => {
    setEditingBooking(b);
    setStatusInput(b.status);
    setQuoteInput(b.internalQuoteAmount ? String(b.internalQuoteAmount) : "");
    setNotesInput(b.notes || "");
    setStatusMessage("");
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    setStatusMessage("Updating record...");

    try {
      const res = await fetch(`/api/admin/bookings/${editingBooking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: statusInput,
          internalQuoteAmount: quoteInput ? Number(quoteInput) : undefined,
          notes: notesInput,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatusMessage(`Error: ${data.error || "Update failed"}`);
        return;
      }

      setStatusMessage("Record updated successfully!");
      setEditingBooking(null);
      loadData();
    } catch {
      setStatusMessage("Network error during update.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">
            Sales & Hospitality Funnel
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Lead Inquiries Pipeline
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Progress leads through: New Inquiry → Quote Shared → Provisional Hold → Confirmed.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-zinc-300 shadow-sm text-xs font-bold">
          <button
            onClick={() => setActiveView("kanban")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === "kanban" ? "bg-[#1A1A1A] text-white" : "text-zinc-600 hover:text-black"
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveView("table")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === "table" ? "bg-[#1A1A1A] text-white" : "text-zinc-600 hover:text-black"
            }`}
          >
            Table Pipeline
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {activeView === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {PIPELINE_COLUMNS.map((col) => {
            const colBookings = bookings.filter((b) => b.status === col.id);

            return (
              <div
                key={col.id}
                className="bg-zinc-100/70 rounded-3xl p-4 border border-zinc-200 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                  <div>
                    <h3 className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2">
                      <span>{col.label}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-white text-zinc-700 font-bold border border-zinc-300">
                        {colBookings.length}
                      </span>
                    </h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{col.desc}</p>
                  </div>
                </div>

                {/* Cards List */}
                <div className="space-y-3 pt-3 flex-1 overflow-y-auto max-h-[70vh]">
                  {colBookings.length === 0 ? (
                    <div className="text-center py-10 text-zinc-400 text-xs italic">
                      No leads in this stage
                    </div>
                  ) : (
                    colBookings.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => handleOpenEdit(b)}
                        className="p-4 rounded-2xl bg-white border border-zinc-200 hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                            {b.venueName}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {formatDate(b.date).split(",")[0]}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-sm text-[#1A1A1A] group-hover:text-[#8C6D31] transition-colors">
                          {b.customerName}
                        </h4>

                        <div className="text-xs text-zinc-600 line-clamp-1">
                          {b.eventType || "Event"}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
                          <span className="font-semibold text-zinc-800">
                            {b.shift.replace("_SHIFT", "")}
                          </span>
                          {b.internalQuoteAmount ? (
                            <span className="font-bold text-emerald-700 font-mono">
                              {formatIndianCurrency(b.internalQuoteAmount)}
                            </span>
                          ) : (
                            <span className="text-zinc-400 italic">No quote yet</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-zinc-200 uppercase tracking-wider text-zinc-600 text-[11px]">
                  <th className="p-4">Customer Name & Phone</th>
                  <th className="p-4">Target Venue</th>
                  <th className="p-4">Event Date & Shift</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4">Private Quote</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-50">
                    <td className="p-4">
                      <div className="font-bold text-[#1A1A1A]">{b.customerName}</div>
                      <a
                        href={`tel:${b.customerPhone.replace(/\s+/g, "")}`}
                        className="text-[11px] text-[#8C6D31] font-semibold hover:underline block"
                      >
                        {b.customerPhone}
                      </a>
                    </td>
                    <td className="p-4 font-semibold text-zinc-900">{b.venueName}</td>
                    <td className="p-4">
                      <div className="font-bold text-zinc-900">{formatDate(b.date)}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {b.shift.replace("_", " ")}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100 text-zinc-800">
                        {b.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-zinc-900">
                      {formatIndianCurrency(b.internalQuoteAmount)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="px-3 py-1.5 rounded-lg bg-[#1A1A1A] text-[#DFCA95] text-xs font-bold hover:bg-black"
                      >
                        Manage Lead
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Status & Quote Modal */}
      {editingBooking && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingBooking(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">
                  Pipeline Action
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                  {editingBooking.customerName}
                </h3>
                <p className="text-xs text-zinc-500">
                  {editingBooking.venueName} • {formatDate(editingBooking.date)} (
                  {editingBooking.shift.replace("_", " ")})
                </p>
              </div>
              <button
                onClick={() => setEditingBooking(null)}
                className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400"
              >
                ✕
              </button>
            </div>

            {statusMessage && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Update Lead Stage Status
                </label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value as BookingStatus)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs font-semibold bg-white"
                >
                  <option value="NEW_ENQUIRY">NEW INQUIRY (Awaiting Follow-up)</option>
                  <option value="PROVISIONAL_HOLD">PROVISIONAL HOLD (Quote Shared)</option>
                  <option value="CONFIRMED">CONFIRMED (Advance Token Paid - Locks Calendar)</option>
                  <option value="REJECTED">REJECTED (Declined by Client or Management)</option>
                  <option value="CANCELLED">CANCELLED (Client Cancelled)</option>
                </select>
                <p className="text-[10px] text-zinc-500 mt-1">
                  *Selecting CONFIRMED enforces concurrency guard and locks conflicting shifts on this date.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Private Internal Tariff Quote (INR)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 350000"
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs font-mono font-bold"
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  Confidential rate shared with client. Strictly never shown on public pages.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Management Notes & Lodging Allotment
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention advance receipt number, lodging room allocation, decor vendor..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={`tel:${editingBooking.customerPhone.replace(/\s+/g, "")}`}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Call {editingBooking.customerPhone}</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingBooking(null)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
