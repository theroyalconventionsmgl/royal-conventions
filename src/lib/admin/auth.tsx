"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import {
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { StaffDoc } from "@/lib/enquiryModel";
import { enrolledTotpFactors, toMfaChallenge, type MfaChallenge } from "@/lib/admin/mfa";

/** Idle minutes after which an unattended staff session signs out automatically. */
const IDLE_MINUTES = 30;

interface AuthState {
  user: User | null;
  staff: StaffDoc | null;
  /** Discriminated staff-lookup outcome. Never conflates distinct failures. */
  staffStatus: "loading" | "ok" | "missing" | "inactive" | "invalid-role" | "denied" | "error" | "signed-out";
  /** Raw role value when the record exists but holds an unauthorized role. */
  staffRoleRaw: string | null;
  /** Firestore error code when the lookup itself failed. */
  staffErrorCode: string | null;
  authLoading: boolean;
  /** Signed in AND has an active staff record. */
  isStaff: boolean;
  isOwner: boolean;
  /** Venue IDs the signed-in user may operate on ([] = none; owners handled separately). */
  venues: string[];
  /** TOTP factor UIDs enrolled on this account (refreshed on token changes). */
  mfaFactors: string[];
  signIn: (email: string, password: string) => Promise<{ mfaChallenge: MfaChallenge | null }>;
  signInWithGoogle: () => Promise<{ mfaChallenge: MfaChallenge | null }>;
  signOut: () => Promise<void>;
  sendReset: (email: string) => Promise<void>;
  refreshMfa: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

async function loadStaffRecord(uid: string): Promise<
  | { status: "ok"; staff: StaffDoc }
  | { status: "missing" }
  | { status: "inactive" }
  | { status: "invalid-role"; role: string }
  | { status: "denied" }
  | { status: "error"; code: string }
> {
  let snap;
  try {
    snap = await getDoc(doc(db, "staff", uid));
  } catch (err) {
    const code = (err as { code?: string }).code ?? "unknown";
    if (process.env.NODE_ENV === "development") {
      console.warn(`[auth] staff lookup failed for ${uid}: ${code}`);
    }
    if (code.includes("permission-denied")) return { status: "denied" };
    return { status: "error", code };
  }
  if (!snap.exists()) return { status: "missing" };
  const data = snap.data() as Omit<StaffDoc, "uid"> & { role?: unknown; active?: unknown };
  if (data.active !== true) return { status: "inactive" };
  if (data.role !== "owner" && data.role !== "manager") {
    return { status: "invalid-role", role: String(data.role) };
  }
  return { status: "ok", staff: { ...(data as Omit<StaffDoc, "uid">), uid } };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [staff, setStaff] = useState<StaffDoc | null>(null);
  const [staffStatus, setStaffStatus] = useState<AuthState["staffStatus"]>("loading");
  const [staffRoleRaw, setStaffRoleRaw] = useState<string | null>(null);
  const [staffErrorCode, setStaffErrorCode] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [mfaFactors, setMfaFactors] = useState<string[]>([]);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Token changes (sign-in, hourly refresh, MFA enrollment) re-resolve identity
  // AND the staff record, so deactivation or role changes take effect promptly.
  useEffect(() => {
    const unsub = onIdTokenChanged(auth, (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setStaff(null);
        setStaffStatus("signed-out");
        setStaffRoleRaw(null);
        setStaffErrorCode(null);
        setMfaFactors([]);
        setAuthLoading(false);
        return;
      }
      setMfaFactors(enrolledTotpFactors(nextUser));
      loadStaffRecord(nextUser.uid)
        .then((result) => {
          if (result.status === "ok") {
            setStaff(result.staff);
            setStaffStatus("ok");
            setStaffRoleRaw(null);
            setStaffErrorCode(null);
          } else {
            setStaff(null);
            setStaffStatus(result.status);
            setStaffRoleRaw(result.status === "invalid-role" ? result.role : null);
            setStaffErrorCode(result.status === "error" ? result.code : null);
          }
        })
        .finally(() => setAuthLoading(false));
    });
    return unsub;
  }, []);

  // Idle auto sign-out: unattended staff sessions do not linger.
  useEffect(() => {
    if (!user) return;
    const arm = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        firebaseSignOut(auth).catch(() => undefined);
      }, IDLE_MINUTES * 60 * 1000);
    };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "scroll", "touchstart"];
    arm();
    events.forEach((e) => window.addEventListener(e, arm, { passive: true }));
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      events.forEach((e) => window.removeEventListener(e, arm));
    };
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return { mfaChallenge: null };
    } catch (err) {
      const challenge = toMfaChallenge(err);
      if (challenge) return { mfaChallenge: challenge };
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
      return { mfaChallenge: null };
    } catch (err) {
      const challenge = toMfaChallenge(err);
      if (challenge) return { mfaChallenge: challenge };
      throw err;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const sendReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const refreshMfa = async () => {
    const current = auth.currentUser;
    if (!current) {
      setMfaFactors([]);
      return;
    }
    await current.reload();
    setMfaFactors(enrolledTotpFactors(auth.currentUser ?? current));
  };

  const isOwner = !!staff && staff.role === "owner";
  const venues = staff && staff.role === "manager" ? staff.venues : [];

  return (
    <AuthContext.Provider
      value={{ user, staff, staffStatus, staffRoleRaw, staffErrorCode, authLoading, isStaff: !!staff, isOwner, venues, mfaFactors, signIn, signInWithGoogle, signOut, sendReset, refreshMfa }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
