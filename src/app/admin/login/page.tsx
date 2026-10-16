"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, AlertCircle, ArrowLeft, Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/admin/auth";
import { resolveTotpChallenge, type MfaChallenge } from "@/lib/admin/mfa";
import { siteConfig } from "@/config/site";

type Step = "credentials" | "mfa" | "reset";

function friendlyError(err: unknown): string {
  const code = (err as { code?: string }).code ?? "";
  if (
    code.includes("user-not-found") ||
    code.includes("wrong-password") ||
    code.includes("invalid-credential") ||
    code.includes("invalid-email")
  ) {
    return "Incorrect email or password.";
  }
  if (code.includes("too-many-requests")) return "Too many attempts. Try again in a few minutes.";
  if (code.includes("popup-closed-by-user")) return "The Google sign-in window was closed before finishing. Try again.";
  if (code.includes("cancelled-popup-request")) return "Another sign-in window is already open. Finish it or close it and try again.";
  if (code.includes("popup-blocked")) return "Your browser blocked the sign-in popup. Allow popups for this site and try again.";
  if (code.includes("unauthorized-domain")) return "This site domain is not authorized for sign-in. An owner must add it under Firebase Console → Authentication → Settings → Authorized domains.";
  if (code.includes("operation-not-allowed")) return "This sign-in method is not enabled. An owner must enable it in the Firebase Console.";
  if (code.includes("invalid-verification-code")) return "That code is incorrect or expired. Check your authenticator app and try again.";
  return "Something went wrong. Check your connection and try again.";
}

export default function AdminLoginPage() {
  const { user, isStaff, authLoading, signIn, signInWithGoogle, sendReset } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [challenge, setChallenge] = useState<MfaChallenge | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  // Redirect after render, not during it: staff who land here signed-in go onward.
  useEffect(() => {
    if (!authLoading && user && isStaff && step === "credentials") {
      router.replace("/admin/dashboard");
    }
  }, [authLoading, user, isStaff, step, router]);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!email.trim() || !password) {
      setError("Enter your staff email and password.");
      return;
    }
    setBusy(true);
    try {
      const { mfaChallenge } = await signIn(email, password);
      if (mfaChallenge) {
        setChallenge(mfaChallenge);
        setStep("mfa");
      } else {
        router.replace("/admin/dashboard");
      }
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!challenge || mfaCode.trim().length < 6) {
      setError("Enter the 6-digit code from your authenticator app.");
      return;
    }
    setBusy(true);
    try {
      await resolveTotpChallenge(challenge, mfaCode);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      const { mfaChallenge } = await signInWithGoogle();
      if (mfaChallenge) {
        setChallenge(mfaChallenge);
        setStep("mfa");
      } else {
        router.replace("/admin/dashboard");
      }
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    if (!email.trim()) {
      setError("Enter your staff email first, then request a reset link.");
      return;
    }
    setBusy(true);
    try {
      await sendReset(email);
      // Deliberately identical outcome whether or not the address exists.
      setNotice("If this address belongs to a staff account, a reset link is on its way. Check your inbox and spam folder.");
    } catch {
      setNotice("If this address belongs to a staff account, a reset link is on its way. Check your inbox and spam folder.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-zinc-200 shadow-xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="relative block w-12 h-12 rounded-2xl overflow-hidden ring-1 ring-zinc-200 bg-black shrink-0">
            <Image
              src={siteConfig.logo}
              alt="The Royal Conventions emblem"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </span>
          <div>
            <h1 className="font-serif text-xl font-bold text-[#1A1A1A]">Staff Sign In</h1>
            <p className="text-xs text-zinc-500">Owner & manager access only</p>
          </div>
        </div>

        {!authLoading && user && !isStaff && step === "credentials" && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              This account has no staff record. Ask the owner to provision access, then sign in again.
            </span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2" role="alert">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {notice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{notice}</span>
          </div>
        )}

        {step === "mfa" ? (
          <form onSubmit={handleMfa} className="space-y-4">
            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#8C6D31]" />
              <span>Two-step verification is on for this account. Open your authenticator app and enter the current 6-digit code.</span>
            </div>
            <div>
              <label htmlFor="mfa-code" className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Authenticator code
              </label>
              <input
                id="mfa-code"
                type="text"
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="123456"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-center text-lg font-mono tracking-[0.3em]"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-sm font-bold hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2 min-h-[52px]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{busy ? "Verifying…" : "Verify & Sign In"}</span>
            </button>
            <button
              type="button"
              onClick={() => { setStep("credentials"); setChallenge(null); setMfaCode(""); setError(""); }}
              className="w-full py-2.5 text-xs font-semibold text-zinc-500 hover:text-[#8C6D31] min-h-[44px]"
            >
              Back to email & password
            </button>
          </form>
        ) : step === "reset" ? (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Staff email
              </label>
              <input
                id="reset-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@theroyalconventions.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-sm font-bold hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2 min-h-[52px]"
            >
              <KeyRound className="w-4 h-4" />
              <span>{busy ? "Sending…" : "Send Reset Link"}</span>
            </button>
            <button
              type="button"
              onClick={() => { setStep("credentials"); setError(""); setNotice(""); }}
              className="w-full py-2.5 text-xs font-semibold text-zinc-500 hover:text-[#8C6D31] min-h-[44px]"
            >
              Back to sign in
            </button>
          </form>
        ) : (
          <form onSubmit={handleCredentials} className="space-y-4">
            <div>
              <label htmlFor="staff-email" className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Staff Email
              </label>
              <input
                id="staff-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@theroyalconventions.com"
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-sm"
              />
            </div>
            <div>
              <label htmlFor="staff-password" className="block text-xs font-bold text-[#1A1A1A] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="staff-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-zinc-300 focus:border-[#C5A059] outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 rounded-lg text-zinc-500 hover:text-[#8C6D31] min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3.5 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-sm font-bold hover:bg-black disabled:opacity-50 flex items-center justify-center gap-2 min-h-[52px]"
            >
              <Lock className="w-4 h-4" />
              <span>{busy ? "Signing in…" : "Sign In to Admin"}</span>
            </button>
            <button
              type="button"
              onClick={() => { setStep("reset"); setError(""); setNotice(""); }}
              className="w-full py-2.5 text-xs font-semibold text-zinc-500 hover:text-[#8C6D31] min-h-[44px]"
            >
              Forgot password? Send a reset link
            </button>
          </form>
        )}

        {step === "credentials" && (
          <>
            <div className="flex items-center gap-3 my-5" aria-hidden="true">
              <span className="flex-1 h-px bg-zinc-200" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">or</span>
              <span className="flex-1 h-px bg-zinc-200" />
            </div>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="w-full py-3.5 rounded-xl bg-white border border-zinc-300 text-sm font-bold text-[#1A1A1A] hover:bg-zinc-50 disabled:opacity-50 flex items-center justify-center gap-2.5 min-h-[52px]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.1 3.5 2.7.2.1c2.2-2 3.8-5 3.8-8.9z" />
                <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-.1.1-3.6 2.8v.1C3.5 21.3 7.5 24 12 24z" />
                <path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-.1-.1-3.6-2.8-.1.1C.5 8.6 0 10.2 0 12s.5 3.4 1.4 4.9l3.8-2.5z" />
                <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.5 0 3.5 2.7 1.4 6.7l3.8 2.9c1-2.9 3.7-4.9 6.8-4.9z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </>
        )}

        <Link href="/" className="mt-5 flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-[#8C6D31] min-h-[44px]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>
      </div>
    </div>
  );
}
