"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Phone,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  MessageSquare,
  FileText,
  History,
  X,
  Lock,
} from "lucide-react";
import { useAuth } from "@/lib/admin/auth";
import {
  listLeads,
  getLead,
  listNotes,
  listPayments,
  listAudit,
  updateLeadStatus,
  addNote,
  savePricing,
  recordPayment,
  confirmBooking,
  cancelLead,
} from "@/lib/admin/leadRepo";
import {
  ACTIVE_PIPELINE,
  TERMINAL_STATUSES,
  allowedNextStatuses,
  balanceDue,
  normalizeStatus,
  receivedTotal,
  type AuditDoc,
  type LeadDoc,
  type LeadStatus,
  type NoteDoc,
  type PaymentDoc,
  type PaymentType,
} from "@/lib/enquiryModel";
import { formatIndianCurrency, formatDate } from "@/lib/utils";

const PIPELINE_COLUMNS: { id: LeadStatus; label: string; desc: string }[] = [
  { id: "NEW", label: "New", desc: "Awaiting first contact" },
  { id: "CONTACTED", label: "Contacted", desc: "Spoken — qualifying" },
  { id: "NEGOTIATION", label: "Negotiation", desc: "Quote shared, discussing" },
  { id: "AWAITING_CONFIRMATION", label: "Awaiting Confirmation", desc: "Terms agreed, to confirm" },
  { id: "CONFIRMED", label: "Confirmed", desc: "Locked in calendar" },
];

function statusBadge(status: string): string {
  const s = normalizeStatus(status);
  if (s === "CONFIRMED") return "bg-rose-100 text-rose-800 font-bold";
  if (s === "AWAITING_CONFIRMATION") return "bg-violet-100 text-violet-800 font-bold";
  if (s === "NEGOTIATION") return "bg-amber-100 text-amber-800 font-bold";
  if (s === "CONTACTED") return "bg-blue-100 text-blue-800 font-bold";
  if (s === "NEW") return "bg-sky-100 text-sky-800 font-bold";
  if (s === "MAINTENANCE_BLOCK") return "bg-zinc-200 text-zinc-800 font-bold";
  return "bg-zinc-100 text-zinc-600";
}

function EnquiriesInner() {
  const { staff, isStaff } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedId = searchParams.get("lead");

  const [leads, setLeads] = useState<LeadDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeView, setActiveView] = useState<"kanban" | "table">("kanban");
  const [terminalFilter, setTerminalFilter] = useState<"hide" | "show">("hide");

  // Detail state
  const [lead, setLead] = useState<LeadDoc | null>(null);
  const [notes, setNotes] = useState<NoteDoc[]>([]);
  const [payments, setPayments] = useState<PaymentDoc[]>([]);
  const [audit, setAudit] = useState<AuditDoc[]>([]);
  const [actionMsg, setActionMsg] = useState("");
  const [actionErr, setActionErr] = useState("");
  const [busy, setBusy] = useState(false);

  // Forms
  const [noteText, setNoteText] = useState("");
  const [totalInput, setTotalInput] = useState("");
  const [advanceInput, setAdvanceInput] = useState("");
  const [termsInput, setTermsInput] = useState("");
  const [internalNotesInput, setInternalNotesInput] = useState("");
  const [payType, setPayType] = useState<PaymentType>("ADVANCE");
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [payRef, setPayRef] = useState("");
  const [payDate, setPayDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [cancelReason, setCancelReason] = useState("");

  const reloadList = useCallback(() => {
    if (!staff) return;
    listLeads(staff)
      .then((rows) => setLeads(rows))
      .catch((err) => {
        setLoadError(err instanceof Error ? err.message : "Failed to load enquiries.");
      })
      .finally(() => setLoading(false));
  }, [staff]);

  useEffect(() => {
    reloadList();
  }, [reloadList]);

  // Loading is derived (no synchronous effect updates): when a lead is
  // selected but the loaded record doesn't match it yet, we're fetching.
  const detailActive = selectedId !== null && (!lead || lead.id !== selectedId);

  useEffect(() => {
    if (!selectedId) return;
    let live = true;
    const id = selectedId;
    Promise.all([getLead(id), listNotes(id), listPayments(id), listAudit(id)])
      .then(([l, n, p, a]) => {
        if (!live) return;
        if (!l) {
          setLead(null);
          setActionErr("Enquiry not found or not shared with your account.");
          return;
        }
        setLead(l);
        setNotes(n);
        setPayments(p);
        setAudit(a);
        setTotalInput(l.totalAmount ? String(l.totalAmount) : "");
        setAdvanceInput(l.advanceRequired ? String(l.advanceRequired) : "");
        setTermsInput(l.paymentTerms ?? "");
        setInternalNotesInput(l.internalNotes ?? "");
      })
      .catch((err) => {
        if (live) setActionErr(err instanceof Error ? err.message : "Failed to load enquiry.");
      });
    return () => {
      live = false;
    };
  }, [selectedId]);

  if (!isStaff) return null;

  const openLead = (id: string) => {
    setActionMsg("");
    setActionErr("");
    router.push(`/admin/enquiries?lead=${id}`);
  };
  const closeLead = () => {
    setActionMsg("");
    setActionErr("");
    router.push("/admin/enquiries");
    reloadList();
  };

  const runAction = async (fn: () => Promise<void>, okMsg: string) => {
    if (!staff || !lead) return;
    const id = lead.id;
    setBusy(true);
    setActionMsg("");
    setActionErr("");
    try {
      await fn();
      const [l, n, p, a] = await Promise.all([
        getLead(id),
        listNotes(id),
        listPayments(id),
        listAudit(id),
      ]);
      if (l) {
        setLead(l);
        setNotes(n);
        setPayments(p);
        setAudit(a);
        setTotalInput(l.totalAmount ? String(l.totalAmount) : "");
        setAdvanceInput(l.advanceRequired ? String(l.advanceRequired) : "");
        setTermsInput(l.paymentTerms ?? "");
        setInternalNotesInput(l.internalNotes ?? "");
      }
      setActionMsg(okMsg);
      reloadList();
    } catch (err) {
      setActionErr(err instanceof Error ? err.message : "Action failed.");
    } finally {
      setBusy(false);
    }
  };

  const received = receivedTotal(payments);
  const due = balanceDue(lead?.totalAmount, received);
  const visibleLeads = terminalFilter === "hide"
    ? leads.filter((l) => !TERMINAL_STATUSES.includes(normalizeStatus(l.status)))
    : leads;

  const canConfirm =
    lead &&
    lead.status === "AWAITING_CONFIRMATION" &&
    Number(lead.totalAmount ?? 0) > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">
            Sales & Hospitality Funnel
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Lead Enquiries Pipeline</h1>
          <p className="text-xs text-zinc-500 mt-1">
            New → Contacted → Negotiation → Awaiting Confirmation → Confirmed. Nothing confirms automatically.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTerminalFilter(terminalFilter === "hide" ? "show" : "hide")}
            className="px-3 py-2 rounded-xl border border-zinc-300 bg-white text-xs font-bold text-zinc-600 min-h-[44px]"
          >
            {terminalFilter === "hide" ? "Show Lost / Cancelled" : "Hide Lost / Cancelled"}
          </button>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-300 text-xs font-bold">
            {(["kanban", "table"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`px-3 py-2 rounded-lg min-h-[40px] ${activeView === v ? "bg-[#1A1A1A] text-white" : "text-zinc-600"}`}
              >
                {v === "kanban" ? "Kanban" : "Table"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loadError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex gap-2" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{loadError}</span>
        </div>
      )}

      {loading ? (
        <p className="text-center py-16 text-xs text-zinc-500">Loading enquiries…</p>
      ) : activeView === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-start">
          {PIPELINE_COLUMNS.map((col) => {
            const cards = visibleLeads.filter((l) => normalizeStatus(l.status) === col.id);
            return (
              <div key={col.id} className="bg-zinc-100/70 rounded-3xl p-4 border border-zinc-200 min-h-[300px]">
                <h3 className="font-bold text-sm text-[#1A1A1A] flex items-center gap-2 pb-3 border-b border-zinc-200">
                  {col.label}
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-white border border-zinc-300">{cards.length}</span>
                </h3>
                <p className="text-[10px] text-zinc-500 mt-1 mb-3">{col.desc}</p>
                <div className="space-y-3">
                  {cards.length === 0 && <p className="text-center py-8 text-zinc-400 text-xs italic">Empty</p>}
                  {cards.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => openLead(b.id)}
                      className="w-full text-left p-4 rounded-2xl bg-white border border-zinc-200 hover:border-[#C5A059] shadow-sm space-y-1.5 min-h-[48px]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D31] truncate">
                          {b.venueName ?? b.venueId}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono shrink-0">{b.date}</span>
                      </div>
                      <div className="font-serif font-bold text-sm text-[#1A1A1A] truncate">{b.customerName}</div>
                      <div className="text-xs text-zinc-600 truncate">{b.eventType || "Event"}</div>
                      <div className="text-[11px] text-zinc-500 pt-1.5 border-t border-zinc-100">
                        {(b.shift ?? "").replace("_SHIFT", "")}
                        {b.totalAmount ? (
                          <span className="float-right font-bold text-emerald-700 font-mono">{formatIndianCurrency(b.totalAmount)}</span>
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-zinc-200 uppercase text-zinc-600 text-[11px]">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Venue · Date · Shift</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Amount / Received</th>
                  <th className="p-4 text-right">Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {visibleLeads.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-50">
                    <td className="p-4">
                      <div className="font-bold text-[#1A1A1A]">{b.customerName}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{b.customerPhone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{b.venueName ?? b.venueId}</div>
                      <div className="text-[11px] text-zinc-500">{b.date} · {(b.shift ?? "").replace("_", " ")}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusBadge(b.status)}`}>
                        {normalizeStatus(b.status).replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold">{formatIndianCurrency(b.totalAmount)}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openLead(b.id)} className="px-3 py-2 rounded-lg bg-[#1A1A1A] text-[#DFCA95] text-xs font-bold min-h-[44px]">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- Lead detail drawer ---------- */}
      {selectedId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto" onClick={closeLead}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry details"
            className="bg-[#F4F3EF] min-h-full w-full max-w-3xl ml-auto p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 bg-white rounded-2xl border border-zinc-200 p-5">
              <div>
                {detailActive || !lead ? (
                  <p className="text-xs text-zinc-500">Loading enquiry…</p>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusBadge(lead.status)}`}>
                        {normalizeStatus(lead.status).replace("_", " ")}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">{lead.id}</span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-2">{lead.customerName}</h2>
                    <p className="text-xs text-zinc-500 mt-1">
                      {lead.venueName ?? lead.venueId} · {formatDate(lead.date)} · {(lead.shift ?? "").replace("_", " ")} · {lead.eventType}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <a href={`tel:${(lead.customerPhone ?? "").replace(/\s+/g, "")}`} className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-100 text-xs font-bold min-h-[44px]">
                        <Phone className="w-3.5 h-3.5 text-[#8C6D31]" /> {lead.customerPhone}
                      </a>
                      <a
                        href={`https://wa.me/91${(lead.customerPhone ?? "").replace(/\D/g, "").slice(-10)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold min-h-[44px]"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-700" /> WhatsApp
                      </a>
                    </div>
                  </>
                )}
              </div>
              <button onClick={closeLead} aria-label="Close details" className="p-2.5 rounded-full hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            {actionErr && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex gap-2" role="alert">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> <span>{actionErr}</span>
              </div>
            )}
            {actionMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> <span>{actionMsg}</span>
              </div>
            )}

            {lead && (
              <>
                {/* Status pipeline */}
                <section className="bg-white rounded-2xl border border-zinc-200 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">Move Through Pipeline</h3>
                  <div className="flex flex-wrap gap-2">
                    {allowedNextStatuses(lead.status).map((next) => (
                      <button
                        key={next}
                        disabled={busy}
                        onClick={() => runAction(() => updateLeadStatus(staff!, lead, next), `Status moved to ${next.replace("_", " ")}.`)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold border min-h-[44px] disabled:opacity-50 ${
                          next === "CONFIRMED"
                            ? "border-rose-300 bg-rose-50 text-rose-800"
                            : next === "LOST" || next === "CANCELLED"
                              ? "border-zinc-300 text-zinc-600"
                              : "border-[#C5A059]/50 bg-[#C5A059]/10 text-[#8C6D31]"
                        }`}
                      >
                        → {next.replace("_", " ")}
                      </button>
                    ))}
                    {allowedNextStatuses(lead.status).length === 0 && (
                      <p className="text-xs text-zinc-500 italic">Terminal stage — no further moves. Cancel from a confirmed booking releases the calendar hold.</p>
                    )}
                  </div>
                  {lead.status === "CONFIRMED" && (
                    <div className="mt-3 flex gap-2">
                      <input
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        placeholder="Cancellation reason (releases the hold)"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs min-h-[44px]"
                      />
                      <button
                        disabled={busy}
                        onClick={() => runAction(() => cancelLead(staff!, lead, cancelReason || "Cancelled by management"), "Booking cancelled and hold released.")}
                        className="px-4 py-2.5 rounded-xl bg-zinc-800 text-white text-xs font-bold min-h-[44px] disabled:opacity-50"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                  {lead.status !== "CONFIRMED" && ["LOST", "CANCELLED"].every((t) => t !== lead.status) && (
                    <details className="mt-3 text-xs">
                      <summary className="cursor-pointer text-zinc-500 font-semibold min-h-[32px]">Mark Lost / Cancelled with reason</summary>
                      <div className="flex gap-2 mt-2">
                        <input
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                          placeholder="Reason (stored in audit trail)"
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs min-h-[44px]"
                        />
                        <button
                          disabled={busy}
                          onClick={() => runAction(() => cancelLead(staff!, lead, cancelReason || "Closed without confirmation"), "Enquiry closed.")}
                          className="px-4 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold min-h-[44px] disabled:opacity-50"
                        >
                          Close Lead
                        </button>
                      </div>
                    </details>
                  )}
                </section>

                {/* Pricing */}
                <section className="bg-white rounded-2xl border border-zinc-200 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#8C6D31]" /> Negotiated Terms
                  </h3>
                  <p className="text-[11px] text-zinc-500 mb-4">Private. Never shown on public pages.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block text-xs font-semibold">Final negotiated amount (₹) *
                      <input type="number" min="1" value={totalInput} onChange={(e) => setTotalInput(e.target.value)} placeholder="e.g. 450000"
                        className="mt-1 w-full px-3.5 py-3 rounded-xl border border-zinc-300 text-sm font-mono font-bold min-h-[48px]" />
                    </label>
                    <label className="block text-xs font-semibold">Advance required (₹)
                      <input type="number" min="0" value={advanceInput} onChange={(e) => setAdvanceInput(e.target.value)} placeholder="e.g. 100000"
                        className="mt-1 w-full px-3.5 py-3 rounded-xl border border-zinc-300 text-sm font-mono font-bold min-h-[48px]" />
                    </label>
                  </div>
                  <label className="block text-xs font-semibold mt-3">Payment terms
                    <input value={termsInput} onChange={(e) => setTermsInput(e.target.value)} placeholder="e.g. 50% advance, balance 7 days before event"
                      className="mt-1 w-full px-3.5 py-3 rounded-xl border border-zinc-300 text-sm min-h-[48px]" />
                  </label>
                  <label className="block text-xs font-semibold mt-3">Internal notes
                    <textarea rows={2} value={internalNotesInput} onChange={(e) => setInternalNotesInput(e.target.value)} placeholder="Décor vendor, room allotment, token receipt no…"
                      className="mt-1 w-full px-3.5 py-3 rounded-xl border border-zinc-300 text-sm min-h-[48px]" />
                  </label>
                  <button
                    disabled={busy}
                    onClick={() => runAction(() => savePricing(staff!, lead, {
                      totalAmount: Number(totalInput), advanceRequired: Number(advanceInput || 0),
                      paymentTerms: termsInput, internalNotes: internalNotesInput,
                    }), "Terms saved.")}
                    className="mt-4 px-5 py-3 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-xs font-bold min-h-[48px] disabled:opacity-50"
                  >
                    Save Terms
                  </button>
                </section>

                {/* Confirm */}
                <section className="bg-white rounded-2xl border border-zinc-200 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#8C6D31]" /> Explicit Confirmation
                  </h3>
                  <ul className="text-xs space-y-1.5 mb-4">
                    <li className="flex gap-2"><CheckCircle2 className={`w-4 h-4 shrink-0 ${lead.status === "AWAITING_CONFIRMATION" ? "text-emerald-600" : "text-zinc-300"}`} /> Enquiry is in Awaiting Confirmation</li>
                    <li className="flex gap-2"><CheckCircle2 className={`w-4 h-4 shrink-0 ${Number(lead.totalAmount ?? 0) > 0 ? "text-emerald-600" : "text-zinc-300"}`} /> Final amount entered ({formatIndianCurrency(lead.totalAmount)})</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-zinc-400" /> Slot re-checked atomically at confirm time</li>
                  </ul>
                  <button
                    disabled={busy || !canConfirm}
                    onClick={() => runAction(() => confirmBooking(staff!, lead, {
                      totalAmount: Number(lead.totalAmount), advanceRequired: Number(lead.advanceRequired ?? 0),
                      paymentTerms: lead.paymentTerms, internalNotes: lead.internalNotes,
                    }), "Booking confirmed and calendar hold placed.")}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A059] to-[#8C6D31] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider min-h-[52px] disabled:opacity-40"
                  >
                    {canConfirm ? "Confirm Booking — Lock Calendar Slot" : "Complete the checklist to enable confirmation"}
                  </button>
                  {!canConfirm && (
                    <p className="text-[11px] text-zinc-500 mt-2">Move the enquiry to Awaiting Confirmation and save the final amount first. Confirmation never happens automatically.</p>
                  )}
                  {lead.status === "CONFIRMED" && (
                    <p className="text-[11px] text-zinc-500 mt-2">
                      Confirmed by {lead.confirmedByEmail ?? lead.confirmedByUid} · Hold {lead.holdId}
                    </p>
                  )}
                </section>

                {/* Payments */}
                <section className="bg-white rounded-2xl border border-zinc-200 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3">Payment Ledger</h3>
                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div className="p-3 rounded-xl bg-zinc-50">
                      <div className="text-[10px] uppercase text-zinc-500 font-bold">Agreed</div>
                      <div className="font-mono font-bold text-sm">{formatIndianCurrency(lead.totalAmount)}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50">
                      <div className="text-[10px] uppercase text-emerald-700 font-bold">Received</div>
                      <div className="font-mono font-bold text-sm text-emerald-800">{formatIndianCurrency(received)}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50">
                      <div className="text-[10px] uppercase text-amber-700 font-bold">Balance</div>
                      <div className="font-mono font-bold text-sm text-amber-800">{formatIndianCurrency(due)}</div>
                    </div>
                  </div>
                  {payments.length === 0 ? (
                    <p className="text-xs text-zinc-400 italic mb-4">No payments recorded. Nothing is marked received without a transaction below.</p>
                  ) : (
                    <ul className="space-y-2 mb-4">
                      {payments.map((p) => (
                        <li key={p.id} className="flex items-center justify-between gap-2 p-3 rounded-xl bg-zinc-50 text-xs">
                          <div>
                            <span className={`font-bold ${p.type === "REFUND" ? "text-rose-700" : "text-emerald-700"}`}>{p.type}</span>
                            <span className="text-zinc-500"> · {p.receivedAt}{p.method ? ` · ${p.method}` : ""}{p.reference ? ` · ${p.reference}` : ""}</span>
                            <div className="text-[10px] text-zinc-400">by {p.recordedByEmail}</div>
                          </div>
                          <span className="font-mono font-bold">{formatIndianCurrency(p.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <select value={payType} onChange={(e) => setPayType(e.target.value as PaymentType)} aria-label="Payment type"
                      className="px-3 py-3 rounded-xl border border-zinc-300 text-xs font-bold min-h-[48px]">
                      <option value="ADVANCE">Advance</option>
                      <option value="INSTALMENT">Instalment</option>
                      <option value="REFUND">Refund</option>
                    </select>
                    <input type="number" min="1" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} placeholder="Amount ₹" aria-label="Amount"
                      className="px-3 py-3 rounded-xl border border-zinc-300 text-xs font-mono font-bold min-h-[48px]" />
                    <input value={payMethod} onChange={(e) => setPayMethod(e.target.value)} placeholder="Method" aria-label="Method"
                      className="px-3 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                    <input value={payRef} onChange={(e) => setPayRef(e.target.value)} placeholder="Receipt ref" aria-label="Reference"
                      className="px-3 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                    <input type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)} aria-label="Received date"
                      className="px-3 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
                  </div>
                  <button
                    disabled={busy}
                    onClick={() => {
                      runAction(() => recordPayment(staff!, lead, {
                        type: payType, amount: Number(payAmount), method: payMethod, reference: payRef, receivedAt: payDate,
                      }), "Payment recorded.").then(() => setPayAmount(""));
                    }}
                    className="mt-3 px-5 py-3 rounded-xl bg-emerald-700 text-white text-xs font-bold min-h-[48px] disabled:opacity-50"
                  >
                    Record Payment
                  </button>
                </section>

                {/* Notes */}
                <section className="bg-white rounded-2xl border border-zinc-200 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#8C6D31]" /> Follow-up Notes
                  </h3>
                  <ul className="space-y-2 mb-4">
                    {notes.length === 0 && <li className="text-xs text-zinc-400 italic">No notes yet.</li>}
                    {notes.map((n) => (
                      <li key={n.id} className="p-3 rounded-xl bg-zinc-50 text-xs">
                        <p className="text-zinc-800">{n.text}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">{n.authorEmail}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <input
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Call outcome, client request, next follow-up…"
                      className="flex-1 px-3.5 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]"
                    />
                    <button
                      disabled={busy}
                      onClick={() => runAction(() => addNote(staff!, lead, noteText), "Note added.").then(() => setNoteText(""))}
                      className="px-5 py-3 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-xs font-bold min-h-[48px] disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                </section>

                {/* Audit */}
                <section className="bg-white rounded-2xl border border-zinc-200 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-3 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-[#8C6D31]" /> Audit Trail
                  </h3>
                  <ul className="space-y-1.5 max-h-56 overflow-y-auto">
                    {audit.length === 0 && <li className="text-xs text-zinc-400 italic">No recorded changes yet.</li>}
                    {audit.map((a) => (
                      <li key={a.id} className="text-[11px] font-mono text-zinc-600 p-2 rounded-lg bg-zinc-50">
                        <span className="font-bold text-zinc-800">{a.action}</span> · {a.actorEmail}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminEnquiriesPage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-xs text-zinc-500">Loading pipeline…</p>}>
      <EnquiriesInner />
    </Suspense>
  );
}
