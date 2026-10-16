"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Phone,
  PlusCircle,
  CalendarDays,
  IndianRupee,
} from "lucide-react";
import { useAuth } from "@/lib/admin/auth";
import { listLeads, listAllPayments } from "@/lib/admin/leadRepo";
import { ACTIVE_PIPELINE, normalizeStatus, receivedTotal, type LeadDoc } from "@/lib/enquiryModel";
import { formatIndianCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { staff, isStaff } = useAuth();
  const [leads, setLeads] = useState<LeadDoc[]>([]);
  const [received, setReceived] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!staff) return;
    let live = true;
    Promise.all([listLeads(staff), listAllPayments(staff)])
      .then(([l, pays]) => {
        if (!live) return;
        setLeads(l);
        const visible = new Set(l.map((x) => x.id));
        setReceived(receivedTotal(pays.filter((p) => visible.has(p.leadId))));
      })
      .catch((err) => {
        if (live) console.error("Dashboard load error:", err);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [staff]);

  if (!isStaff) return null;

  const count = (pred: (l: LeadDoc) => boolean) => leads.filter(pred).length;
  const isNew = (l: LeadDoc) => normalizeStatus(l.status) === "NEW";
  const isActivePipe = (l: LeadDoc) => (ACTIVE_PIPELINE as string[]).includes(normalizeStatus(l.status));
  const isConfirmed = (l: LeadDoc) => normalizeStatus(l.status) === "CONFIRMED";
  const pipelineValue = leads.filter(isActivePipe).reduce((s, l) => s + (l.totalAmount ?? 0), 0);
  const confirmedValue = leads.filter(isConfirmed).reduce((s, l) => s + (l.totalAmount ?? 0), 0);
  const outstanding = Math.max(0, confirmedValue - received);

  const kpis = [
    { label: "New Inquiries", value: String(count(isNew)), sub: "Needs first contact call", href: "/admin/enquiries", link: "View lead queue", icon: <Clock className="w-4 h-4" />, tint: "bg-blue-50 text-blue-600" },
    { label: "Active Pipeline", value: String(count(isActivePipe)), sub: `${formatIndianCurrency(pipelineValue)} in play`, href: "/admin/enquiries", link: "Open pipeline", icon: <AlertCircle className="w-4 h-4" />, tint: "bg-amber-50 text-amber-600" },
    { label: "Confirmed Booked", value: String(count(isConfirmed)), sub: `${formatIndianCurrency(confirmedValue)} locked`, href: "/admin/bookings", link: "Manage bookings", icon: <CheckCircle2 className="w-4 h-4" />, tint: "bg-emerald-50 text-emerald-600" },
    { label: "Money Received", value: formatIndianCurrency(received), sub: `${formatIndianCurrency(outstanding)} outstanding`, href: "/admin/enquiries", link: "Review ledgers", icon: <IndianRupee className="w-4 h-4" />, tint: "bg-[#C5A059]/15 text-[#8C6D31]" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">Operations Executive Overview</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">The Royal Conventions Dashboard</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Live Firestore pipeline, calendar locks, and recorded payments. {staff?.role === "owner" ? "All venues." : "Your authorized venues only."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings" className="px-4 py-3 rounded-xl bg-[#1A1A1A] hover:bg-black text-[#DFCA95] text-xs font-bold flex items-center gap-2 min-h-[48px]">
            <PlusCircle className="w-4 h-4 text-[#C5A059]" />
            <span>Block Date / Add Booking</span>
          </Link>
          <Link href="/admin/calendar" className="px-4 py-3 rounded-xl bg-[#C5A059] hover:bg-[#A58039] text-[#1A1A1A] text-xs font-bold flex items-center gap-2 min-h-[48px]">
            <CalendarDays className="w-4 h-4" />
            <span>Calendar Matrix</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((k) => (
          <div key={k.label} className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">{k.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${k.tint}`}>{k.icon}</div>
            </div>
            <div className="mt-3">
              <div className="font-serif text-3xl font-bold text-zinc-900">{loading ? "…" : k.value}</div>
              <p className="text-[11px] text-zinc-500 mt-1">{k.sub}</p>
            </div>
            <div className="pt-3 mt-3 border-t border-zinc-100">
              <Link href={k.href} className="text-xs font-bold text-[#8C6D31] hover:underline flex items-center gap-1 min-h-[32px]">
                <span>{k.link}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1A1A1A] text-white rounded-3xl border border-[#C5A059]/30 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <TrendingUp className="w-6 h-6 text-[#DFCA95] shrink-0" />
        <p className="text-xs text-zinc-300 leading-relaxed">
          <strong className="text-[#DFCA95]">Private financials:</strong> agreed amounts and money received come only
          from recorded payment transactions — never estimated. Outstanding balances clear as instalments are recorded
          in each enquiry ledger.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Latest Enquiries & Bookings</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Most recent first.</p>
          </div>
          <Link href="/admin/enquiries" className="px-3 py-2.5 rounded-lg border border-zinc-300 text-xs font-semibold min-h-[44px] inline-flex items-center">
            Full Pipeline →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[680px]">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-zinc-200 text-zinc-600 uppercase text-[11px]">
                <th className="p-4">Customer / Event</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Date & Shift</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-12 text-zinc-500">Loading records…</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-zinc-500">No enquiries yet — new website submissions appear here.</td></tr>
              ) : leads.slice(0, 8).map((b) => (
                <tr key={b.id} className="hover:bg-zinc-50/80">
                  <td className="p-4">
                    <div className="font-bold text-[#1A1A1A]">{b.customerName}</div>
                    <div className="text-[11px] text-zinc-500">{b.eventType || "Occasion"}</div>
                  </td>
                  <td className="p-4 font-semibold">{b.venueName ?? b.venueId}</td>
                  <td className="p-4">
                    <div className="font-bold">{formatDate(b.date)}</div>
                    <div className="text-[11px] text-[#8C6D31] font-semibold">{(b.shift ?? "").replace("_", " ")}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-zinc-100 text-zinc-700">
                      {normalizeStatus(b.status).replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {b.customerPhone ? (
                      <a href={`tel:${b.customerPhone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-zinc-100 font-bold text-xs min-h-[44px]">
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                    ) : <span className="text-zinc-400">—</span>}
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
