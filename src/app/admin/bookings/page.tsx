"use client";

import { useEffect, useState } from "react";
import {
  PlusCircle,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Shift } from "@/lib/types";
import { useAuth } from "@/lib/admin/auth";
import { listLeads, createManualLead } from "@/lib/admin/leadRepo";
import { normalizeStatus, type LeadDoc } from "@/lib/enquiryModel";
import { formatIndianCurrency, formatDate } from "@/lib/utils";

export default function AdminBookingsPage() {
  const { staff, isStaff } = useAuth();
  const [leads, setLeads] = useState<LeadDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const [entryType, setEntryType] = useState<"BOOKING" | "MAINTENANCE">("BOOKING");
  const [venueId, setVenueId] = useState("royal-convention");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [shift, setShift] = useState<Shift>("FULL_DAY");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventType, setEventType] = useState("Wedding & Reception");
  const [notes, setNotes] = useState("");

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reload = () => {
    if (!staff) return;
    listLeads(staff)
      .then((all) => {
        setLeads(all.filter((l) => ["CONFIRMED", "MAINTENANCE_BLOCK", "CANCELLED"].includes(normalizeStatus(l.status))));
      })
      .catch((err) => {
        setFormError(err instanceof Error ? err.message : "Failed to load ledger.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff]);

  if (!isStaff) return null;
  const venues = staff!.role === "owner" ? siteConfig.venues : siteConfig.venues.filter((v) => staff!.venues.includes(v.id));

  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);
    try {
      await createManualLead(staff!, {
        venueId,
        date,
        shift,
        customerName,
        customerPhone,
        customerEmail,
        guestCount: guestCount ? Number(guestCount) : undefined,
        eventType,
        notes,
        kind: entryType === "MAINTENANCE" ? "MAINTENANCE" : "WALKIN",
      });
      setFormSuccess(
        entryType === "MAINTENANCE"
          ? "Maintenance block applied and calendar hold placed."
          : "Walk-in enquiry created. Confirm it from the pipeline after agreeing terms — nothing confirms automatically."
      );
      reload();
      setTimeout(() => {
        setFormOpen(false);
        setFormSuccess("");
      }, 2200);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create entry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">Management Logs</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Manual Entry & Date Blocking</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Walk-ins enter the pipeline for explicit confirmation. Maintenance blocks lock the calendar immediately.
          </p>
        </div>
        <button
          onClick={() => { setFormOpen(true); setFormError(""); setFormSuccess(""); }}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 min-h-[48px]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Manual Reservation / Block</span>
        </button>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setFormOpen(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-5 my-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                {entryType === "MAINTENANCE" ? "Apply Maintenance Block" : "Log Walk-In / Phone Booking"}
              </h3>
              <button onClick={() => setFormOpen(false)} aria-label="Close" className="p-2.5 rounded-full hover:bg-zinc-100 min-w-[44px] min-h-[44px]">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-1 rounded-xl bg-zinc-100 text-xs font-bold">
              {(["BOOKING", "MAINTENANCE"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setEntryType(t)}
                  className={`py-3 rounded-lg min-h-[48px] ${entryType === t ? "bg-white shadow-sm" : "text-zinc-600"}`}
                >
                  {t === "BOOKING" ? "Walk-In / Direct" : "Maintenance Block"}
                </button>
              ))}
            </div>

            {formError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex gap-2.5" role="alert">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}
            {formSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="block text-xs font-bold">Venue
                  <select value={venueId} onChange={(e) => setVenueId(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs font-semibold bg-white min-h-[48px]">
                    {venues.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                </label>
                <label className="block text-xs font-bold">Date
                  <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs font-semibold min-h-[48px]" />
                </label>
                <label className="block text-xs font-bold">Shift
                  <select value={shift} onChange={(e) => setShift(e.target.value as Shift)} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs font-semibold bg-white min-h-[48px]">
                    <option value="FULL_DAY">Full Day (locks all)</option>
                    <option value="MORNING_SHIFT">Morning (06:00–14:00)</option>
                    <option value="EVENING_SHIFT">Evening (16:00–23:30)</option>
                  </select>
                </label>
              </div>

              {entryType === "BOOKING" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block text-xs font-bold">Client full name *
                      <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. N. Rama Krishna"
                        className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                    </label>
                    <label className="block text-xs font-bold">Client phone *
                      <input required type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="10-digit mobile"
                        className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label className="block text-xs font-bold">Occasion
                      <input value={eventType} onChange={(e) => setEventType(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                    </label>
                    <label className="block text-xs font-bold">Guests
                      <input type="number" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} placeholder="e.g. 1200"
                        className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                    </label>
                    <label className="block text-xs font-bold">Email (optional)
                      <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)}
                        className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                    </label>
                  </div>
                </>
              ) : (
                <label className="block text-xs font-bold">Maintenance purpose *
                  <input required value={eventType} onChange={(e) => setEventType(e.target.value)} placeholder="e.g. Chiller deep cleaning"
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                </label>
              )}

              <label className="block text-xs font-bold">Internal notes
                <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
              </label>

              <div className="pt-2 flex justify-end gap-3 border-t border-zinc-100">
                <button type="button" onClick={() => setFormOpen(false)} className="px-5 py-3 rounded-xl border border-zinc-300 text-xs font-semibold min-h-[48px]">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider min-h-[48px] disabled:opacity-50">
                  {isSubmitting ? "Saving…" : entryType === "MAINTENANCE" ? "Apply Block" : "Create Enquiry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Confirmed Bookings & Blocks Ledger</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Hard locks from Firestore holds. {leads.length} records.</p>
          </div>
          <Calendar className="w-5 h-5 text-[#C5A059]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-zinc-200 uppercase text-zinc-600 text-[11px]">
                <th className="p-4">Date & Shift</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Reservation</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4">Agreed Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-zinc-500">Loading ledger…</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-zinc-500">No confirmed bookings or blocks yet.</td></tr>
              ) : leads.map((b) => (
                <tr key={b.id} className="hover:bg-zinc-50">
                  <td className="p-4 font-mono">
                    <div className="font-bold text-zinc-900">{formatDate(b.date)}</div>
                    <div className="text-[11px] text-[#8C6D31] font-semibold">{(b.shift ?? "").replace("_", " ")}</div>
                  </td>
                  <td className="p-4 font-semibold">{b.venueName ?? b.venueId}</td>
                  <td className="p-4">
                    <div className="font-bold text-[#1A1A1A]">{b.customerName}</div>
                    <div className="text-[11px] text-zinc-500">{b.eventType}</div>
                  </td>
                  <td className="p-4 font-mono">
                    {b.customerPhone ? (
                      <a href={`tel:${b.customerPhone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1 hover:text-[#8C6D31] min-h-[44px]">
                        <Phone className="w-3.5 h-3.5" /> {b.customerPhone}
                      </a>
                    ) : <span className="text-zinc-400">—</span>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      normalizeStatus(b.status) === "CONFIRMED" ? "bg-rose-100 text-rose-800"
                      : normalizeStatus(b.status) === "CANCELLED" ? "bg-zinc-200 text-zinc-700"
                      : "bg-zinc-200 text-zinc-800"
                    }`}>
                      {normalizeStatus(b.status).replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold">{formatIndianCurrency(b.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
