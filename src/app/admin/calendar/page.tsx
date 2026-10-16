"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  X,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/lib/admin/auth";
import { holdsForMonth, listLeads } from "@/lib/admin/leadRepo";
import { normalizeStatus, type HoldDoc, type LeadDoc } from "@/lib/enquiryModel";
import { formatDate } from "@/lib/utils";

type CellState =
  | { kind: "AVAILABLE" }
  | { kind: "CONFIRMED" | "PROVISIONAL" | "MAINTENANCE"; lead: LeadDoc | null; shift: string; title: string };

export default function AdminCalendarPage() {
  const { staff, isStaff } = useAuth();
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [holds, setHolds] = useState<HoldDoc[]>([]);
  const [leads, setLeads] = useState<LeadDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ lead: LeadDoc | null; venueName: string; date: string; shift: string; status: string } | null>(null);

  const monthString = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;

  useEffect(() => {
    if (!staff) return;
    let live = true;
    const scope = staff;
    Promise.all([holdsForMonth(monthString), listLeads(scope)])
      .then(([h, l]) => {
        if (!live) return;
        const allowed = scope.role === "owner" ? null : new Set(scope.venues);
        setHolds(allowed ? h.filter((x) => allowed.has(x.venueId)) : h);
        setLeads(l.filter((x) => x.date.startsWith(monthString)));
      })
      .catch((err) => {
        if (live) console.error("Calendar load error:", err);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [staff, monthString]);

  if (!isStaff) return null;
  const venues = staff!.role === "owner" ? siteConfig.venues : siteConfig.venues.filter((v) => staff!.venues.includes(v.id));
  const leadById = new Map(leads.map((l) => [l.id, l]));

  const handlePrevMonth = () => {
    if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };
  const handleNextMonth = () => {
    if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString("en-IN", { month: "long", year: "numeric" });

  const cellFor = (venueId: string, dateStr: string): CellState => {
    const dayHolds = holds.filter((h) => h.venueId === venueId && h.date === dateStr);
    if (dayHolds.length === 0) return { kind: "AVAILABLE" };
    const full = dayHolds.find((h) => h.shift === "FULL_DAY");
    const first = full ?? dayHolds[0];
    const lead = leadById.get(first.leadId) ?? null;
    const st = lead ? normalizeStatus(lead.status) : "CONFIRMED";
    if (st === "MAINTENANCE_BLOCK") {
      return { kind: "MAINTENANCE", lead, shift: first.shift, title: lead?.eventType ?? "Maintenance" };
    }
    if (st === "CONFIRMED") {
      return { kind: "CONFIRMED", lead, shift: first.shift, title: lead?.customerName ?? "Booked" };
    }
    return { kind: "PROVISIONAL", lead, shift: first.shift, title: lead?.customerName ?? "On hold" };
  };

  const renderCell = (venueId: string, venueName: string, dateStr: string) => {
    const cell = cellFor(venueId, dateStr);
    if (cell.kind === "AVAILABLE") {
      return (
        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Available
          </span>
        </div>
      );
    }
    const styles =
      cell.kind === "CONFIRMED"
        ? "bg-rose-100 border-rose-300 text-rose-900 hover:bg-rose-200"
        : cell.kind === "MAINTENANCE"
          ? "bg-zinc-200 border-zinc-400 text-zinc-900 hover:bg-zinc-300"
          : "bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200";
    const label = cell.kind === "CONFIRMED" ? "Booked" : cell.kind === "MAINTENANCE" ? "Blocked" : "On Hold";
    return (
      <button
        type="button"
        onClick={() => setSelected({ lead: cell.lead, venueName, date: dateStr, shift: cell.shift, status: cell.kind })}
        className={`w-full p-2 rounded-lg border text-left text-[11px] transition-colors min-h-[48px] ${styles}`}
      >
        <div className="font-bold">{label} · {cell.shift.replace("_SHIFT", "")}</div>
        <div className="text-[10px] truncate mt-0.5">{cell.title}</div>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">Live Firestore Holds</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Multi-Hall Calendar Matrix</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Every coloured cell is a real hold document — confirmed bookings, pipeline holds, and maintenance blocks.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-zinc-300 rounded-xl p-1 shadow-sm">
            <button onClick={handlePrevMonth} className="p-2.5 rounded-lg hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Previous Month">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif font-bold text-sm px-4 text-[#1A1A1A]">{monthName}</span>
            <button onClick={handleNextMonth} className="p-2.5 rounded-lg hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Next Month">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <Link href="/admin/bookings" className="px-4 py-3 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-xs font-bold flex items-center gap-1.5 min-h-[48px]">
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
            <span>Block Date</span>
          </Link>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        <span className="font-bold text-zinc-700 uppercase tracking-wider text-[11px]">Legend:</span>
        <span className="flex items-center gap-2 font-semibold text-emerald-950"><span className="w-3.5 h-3.5 rounded-full bg-emerald-500" /> Available</span>
        <span className="flex items-center gap-2 font-semibold text-amber-950"><span className="w-3.5 h-3.5 rounded-full bg-amber-400" /> Pipeline hold</span>
        <span className="flex items-center gap-2 font-semibold text-rose-950"><span className="w-3.5 h-3.5 rounded-full bg-rose-600" /> Confirmed</span>
        <span className="flex items-center gap-2 font-semibold text-zinc-800"><span className="w-3.5 h-3.5 rounded-full bg-zinc-400" /> Maintenance</span>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-zinc-200 uppercase text-[11px]">
                <th className="p-3.5 font-bold w-40">Date</th>
                {venues.map((v) => (
                  <th key={v.id} className="p-3.5 font-serif font-bold text-sm normal-case tracking-normal">
                    {v.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr><td colSpan={venues.length + 1} className="text-center py-12 text-zinc-500">Loading matrix…</td></tr>
              ) : daysArray.map((dayNum) => {
                const dateStr = `${monthString}-${String(dayNum).padStart(2, "0")}`;
                const dayOfWeek = new Date(currentYear, currentMonth - 1, dayNum).toLocaleDateString("en-IN", { weekday: "short" });
                return (
                  <tr key={dateStr} className="hover:bg-zinc-50/80">
                    <td className="p-3.5 border-r border-zinc-100">
                      <span className="font-bold text-sm text-[#1A1A1A]">{dayNum}</span>{" "}
                      <span className="text-zinc-500 text-[11px] font-semibold">{dayOfWeek}</span>
                      <div className="text-[10px] text-zinc-400 font-mono">{dateStr}</div>
                    </td>
                    {venues.map((v) => (
                      <td key={v.id} className="p-2 border-r border-zinc-100 last:border-r-0">
                        {renderCell(v.id, v.name, dateStr)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-label="Slot details"
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D31]">{selected.status} slot</span>
                <h3 className="font-serif text-xl font-bold">{selected.venueName}</h3>
                <p className="text-xs text-zinc-500">{formatDate(selected.date)} · {selected.shift.replace("_", " ")}</p>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close" className="p-2.5 rounded-full hover:bg-zinc-100 min-w-[44px] min-h-[44px]">
                <X className="w-5 h-5" />
              </button>
            </div>
            {selected.lead ? (
              <>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50"><span className="text-zinc-400 text-[10px] block">Customer</span><strong>{selected.lead.customerName}</strong></div>
                  <div className="p-3 rounded-xl bg-zinc-50"><span className="text-zinc-400 text-[10px] block">Phone</span><strong className="font-mono">{selected.lead.customerPhone || "—"}</strong></div>
                  <div className="p-3 rounded-xl bg-zinc-50"><span className="text-zinc-400 text-[10px] block">Event</span><strong>{selected.lead.eventType}</strong></div>
                  <div className="p-3 rounded-xl bg-zinc-50"><span className="text-zinc-400 text-[10px] block">Status</span><strong>{normalizeStatus(selected.lead.status).replace("_", " ")}</strong></div>
                </div>
                <div className="flex gap-2">
                  {selected.lead.customerPhone && (
                    <a href={`tel:${selected.lead.customerPhone.replace(/\s+/g, "")}`} className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 min-h-[48px]">
                      <Phone className="w-4 h-4" /> Call Host
                    </a>
                  )}
                  <Link href={`/admin/enquiries?lead=${selected.lead.id}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#1A1A1A] text-[#DFCA95] font-bold text-xs flex items-center justify-center min-h-[48px]">
                    Open in Pipeline
                  </Link>
                </div>
              </>
            ) : (
              <p className="text-xs text-zinc-500">Hold record without a linked enquiry. It was likely placed before the pipeline migration.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
