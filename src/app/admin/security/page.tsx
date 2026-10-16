"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Smartphone,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  LogOut,
  Copy,
  Trash2,
  Clock,
} from "lucide-react";
import { useAuth } from "@/lib/admin/auth";
import {
  startTotpEnrollment,
  finalizeTotpEnrollment,
  unenrollTotpFactor,
  type MfaEnrollmentStart,
} from "@/lib/admin/mfa";

export default function AdminSecurityPage() {
  const { user, staff, isStaff, mfaFactors, signOut, sendReset, refreshMfa } = useAuth();
  const [enroll, setEnroll] = useState<MfaEnrollmentStart | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isStaff || !user || !staff) return null;

  const beginEnroll = async () => {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      const start = await startTotpEnrollment(user, user.email ?? "staff");
      setEnroll(start);
      setCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start enrollment. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const finishEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enroll) return;
    setError("");
    if (code.trim().length < 6) {
      setError("Enter the 6-digit code from your authenticator app.");
      return;
    }
    setBusy(true);
    try {
      await finalizeTotpEnrollment(user, enroll, code);
      setEnroll(null);
      setCode("");
      await refreshMfa();
      // Never retain the secret in memory longer than needed.
      setNotice("Authenticator enrolled. Confirmations, payments, and holds now require it.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg.includes("invalid-verification-code")
          ? "That code is incorrect or expired. Try the current code."
          : "Enrollment failed. Check the code and try again."
      );
    } finally {
      setBusy(false);
    }
  };

  const removeFactor = async (uid: string) => {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await unenrollTotpFactor(user, uid);
      await refreshMfa();
      setNotice("Authenticator removed from this account.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove the authenticator.");
    } finally {
      setBusy(false);
    }
  };

  const requestReset = async () => {
    setError("");
    setNotice("");
    try {
      await sendReset(user.email ?? "");
      setNotice("If this address belongs to a staff account, a reset link is on its way.");
    } catch {
      setNotice("If this address belongs to a staff account, a reset link is on its way.");
    }
  };

  const copyKey = async () => {
    if (!enroll) return;
    try {
      await navigator.clipboard.writeText(enroll.secretKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copy failed — type the key manually.");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D31]">Account Protection</span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Security & Sign-In</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Signed in as <strong>{staff.email}</strong> ({staff.role}). Sessions expire after 30 minutes idle.
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

      {/* Two-step verification */}
      <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5 sm:p-6">
        <h2 className="font-serif text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-[#8C6D31]" />
          Two-Step Verification
        </h2>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
          {staff.role === "owner"
            ? "Required for owners: booking confirmations, payments, calendar holds, and staff changes are rejected without it."
            : "Strongly recommended: confirmations, payments, and holds require it for every staff account."}
        </p>

        {mfaFactors.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {mfaFactors.map((uid) => (
              <li key={uid} className="flex items-center justify-between gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <span className="flex items-center gap-2 font-semibold text-emerald-800">
                  <ShieldCheck className="w-4 h-4" /> Authenticator enrolled
                </span>
                <button
                  onClick={() => removeFactor(uid)}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 text-xs font-bold text-zinc-600 hover:text-rose-700 min-h-[44px] disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
            No authenticator enrolled yet. Sensitive operations will be rejected until you enroll below.
          </p>
        )}

        {!enroll ? (
          <button
            onClick={beginEnroll}
            disabled={busy}
            className="mt-4 px-5 py-3 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-xs font-bold min-h-[48px] disabled:opacity-50"
          >
            {mfaFactors.length > 0 ? "Enroll Another Authenticator" : "Enroll Authenticator App"}
          </button>
        ) : (
          <form onSubmit={finishEnroll} className="mt-4 space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4">
            <p className="text-xs text-zinc-600 leading-relaxed">
              <strong>Step 1.</strong> In Google Authenticator, Authy, or 1Password, add an account with this key
              (issuer <code>The Royal Conventions</code>):
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2.5 rounded-xl bg-white border border-zinc-300 font-mono text-xs break-all select-all">
                {enroll.secretKey}
              </code>
              <button
                type="button"
                onClick={copyKey}
                className="px-3 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold min-h-[44px] shrink-0"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              <strong>Step 2.</strong> Enter the current 6-digit code to finish. The key is never stored anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                placeholder="123456"
                aria-label="Authenticator code"
                className="flex-1 px-4 py-3 rounded-xl border border-zinc-300 text-center text-lg font-mono tracking-[0.3em] min-h-[52px]"
              />
              <button
                type="submit"
                disabled={busy}
                className="px-6 py-3 rounded-xl bg-deep-sage text-white text-xs font-bold min-h-[52px] disabled:opacity-50"
                style={{ backgroundColor: "#294C3B" }}
              >
                Verify & Enroll
              </button>
            </div>
            <button
              type="button"
              onClick={() => { setEnroll(null); setCode(""); }}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 min-h-[44px]"
            >
              Cancel enrollment
            </button>
          </form>
        )}
      </section>

      {/* Password + session */}
      <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-5 sm:p-6 space-y-3">
        <h2 className="font-serif text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#8C6D31]" />
          Password & Session
        </h2>
        <p className="text-xs text-zinc-500 leading-relaxed flex items-start gap-2">
          <Clock className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Passwords are verified by Firebase Authentication and never stored in our database. Idle sessions sign out after 30 minutes; revoking a staff record blocks the account on its next request.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={requestReset}
            className="flex-1 px-5 py-3 rounded-xl border border-zinc-300 text-xs font-bold min-h-[48px]"
          >
            Email Me a Password Reset Link
          </button>
          <button
            onClick={() => signOut()}
            className="flex-1 px-5 py-3 rounded-xl bg-zinc-800 text-white text-xs font-bold min-h-[48px] inline-flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out Now
          </button>
        </div>
      </section>
    </div>
  );
}
