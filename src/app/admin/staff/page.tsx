"use client";

import { useEffect, useState } from "react";
import { Users, AlertCircle, CheckCircle2, ShieldAlert, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/lib/admin/auth";
import {
  listStaff,
  listAdminAudit,
  saveStaffRecord,
  setStaffActive,
  type AdminAuditEntry,
} from "@/lib/admin/staffRepo";
import type { StaffDoc } from "@/lib/enquiryModel";

export default function AdminStaffPage() {
  const { staff, isOwner } = useAuth();
  const [rows, setRows] = useState<StaffDoc[]>([]);
  const [audit, setAudit] = useState<AdminAuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"owner" | "manager">("manager");
  const [venues, setVenues] = useState<string[]>([]);
  const [editingUid, setEditingUid] = useState<string | null>(null);

  const reload = () => {
    if (!staff || staff.role !== "owner") return;
    listStaff()
      .then((s) => setRows(s))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load staff."))
      .then(() => listAdminAudit())
      .then((a) => setAudit(a))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load audit."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staff]);

  // Route-level gate: sidebar hiding is never the enforcement.
  if (staff && !isOwner) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-white rounded-3xl border border-rose-200 shadow-sm p-8 text-center">
        <ShieldAlert className="w-8 h-8 text-rose-600 mx-auto mb-3" />
        <h1 className="font-serif text-xl font-bold text-[#1A1A1A]">Access Denied</h1>
        <p className="text-xs text-zinc-500 mt-2">
          Staff administration is restricted to the owner account.
        </p>
      </div>
    );
  }
  if (!staff) return null;

  const toggleVenue = (id: string) =>
    setVenues((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));

  const resetForm = () => {
    setUid("");
    setEmail("");
    setRole("manager");
    setVenues([]);
    setEditingUid(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await saveStaffRecord(staff, { uid, email, role, venues, active: true });
      setNotice(editingUid ? "Staff record updated and audited." : "Staff record created. They can now sign in.");
      resetForm();
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleToggleActive = async (target: StaffDoc) => {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await setStaffActive(staff, target, !target.active);
      setNotice(target.active ? "Account deactivated — blocked on next request." : "Account reactivated.");
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (target: StaffDoc) => {
    setEditingUid(target.uid);
    setUid(target.uid);
    setEmail(target.email);
    setRole(target.role);
    setVenues(target.venues);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">Owner Only</span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] flex items-center gap-2">
          <Users className="w-6 h-6 text-[#8C6D31]" /> Staff Administration
        </h1>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
          Provision access for existing Firebase Authentication users: create the sign-in account in
          Firebase Console → Authentication → Users first, then attach the role here with the UID shown there.
          No public registration exists. Every change is audited below.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex gap-2" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> <span>{error}</span>
        </div>
      )}
      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> <span>{notice}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5 sm:p-6 space-y-4">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">
          {editingUid ? "Edit Staff Record" : "Provision Staff Access"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block text-xs font-bold">Auth UID *
            <input value={uid} onChange={(e) => setUid(e.target.value)} disabled={!!editingUid} placeholder="Paste UID from Firebase Console"
              className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs font-mono min-h-[48px] disabled:bg-zinc-100" />
          </label>
          <label className="block text-xs font-bold">Staff email *
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="manager@example.com"
              className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs min-h-[48px]" />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block text-xs font-bold">Role *
            <select value={role} onChange={(e) => setRole(e.target.value as "owner" | "manager")}
              className="mt-1.5 w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs font-bold bg-white min-h-[48px]">
              <option value="manager">Manager (assigned venues only)</option>
              <option value="owner">Owner (everything)</option>
            </select>
          </label>
          <fieldset className="text-xs font-bold">
            <legend className="mb-1.5">Authorized venues {role === "owner" ? "(owners cover all)" : "*"}</legend>
            <div className="flex flex-wrap gap-2">
              {siteConfig.venues.map((v) => (
                <label key={v.id} className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer min-h-[44px] ${venues.includes(v.id) ? "border-[#C5A059] bg-[#C5A059]/10 text-[#8C6D31]" : "border-zinc-300 text-zinc-600"}`}>
                  <input type="checkbox" checked={venues.includes(v.id)} onChange={() => toggleVenue(v.id)} className="accent-[#8C6D31] w-4 h-4" />
                  {v.name}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={busy} className="px-6 py-3 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-xs font-bold min-h-[48px] disabled:opacity-50">
            {editingUid ? "Save Changes" : "Create Staff Record"}
          </button>
          {editingUid && (
            <button type="button" onClick={resetForm} className="px-5 py-3 rounded-xl border border-zinc-300 text-xs font-bold min-h-[48px]">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-zinc-100">
          <h2 className="font-serif text-lg font-bold text-[#1A1A1A]">Active Directory</h2>
        </div>
        {loading ? (
          <p className="text-center py-10 text-xs text-zinc-500">Loading staff…</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {rows.map((r) => (
              <li key={r.uid} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[#1A1A1A] truncate">{r.email}</div>
                  <div className="text-[11px] text-zinc-500 font-mono truncate">{r.uid}</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.role === "owner" ? "bg-[#C5A059]/20 text-[#8C6D31]" : "bg-zinc-100 text-zinc-700"}`}>
                      {r.role.toUpperCase()}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.active ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                      {r.active ? "ACTIVE" : "DISABLED"}
                    </span>
                    {r.role === "manager" && r.venues.map((v) => (
                      <span key={v} className="px-2 py-0.5 rounded-full text-[10px] bg-zinc-100 text-zinc-600 font-mono">{v}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(r)} className="px-4 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold min-h-[44px]">
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(r)}
                    disabled={busy || r.uid === staff.uid}
                    title={r.uid === staff.uid ? "You cannot deactivate your own account" : undefined}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold min-h-[44px] disabled:opacity-40 ${r.active ? "bg-rose-700 text-white" : "bg-emerald-700 text-white"}`}
                  >
                    {r.active ? "Disable" : "Enable"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5">
        <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-3">Role & Access Audit</h2>
        {audit.length === 0 ? (
          <p className="text-xs text-zinc-400 italic">No staff changes recorded yet.</p>
        ) : (
          <ul className="space-y-1.5 max-h-64 overflow-y-auto">
            {audit.map((a) => (
              <li key={a.id} className="text-[11px] font-mono text-zinc-600 p-2 rounded-lg bg-zinc-50 flex flex-wrap gap-x-2">
                <span className="font-bold text-zinc-800">{a.action}</span>
                <span>target {a.targetUid}</span>
                <span>by {a.actorEmail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
