import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { siteConfig } from "@/config/site";
import type { StaffDoc } from "@/lib/enquiryModel";

export interface StaffInput {
  uid: string;
  email: string;
  role: "owner" | "manager";
  venues: string[];
  active: boolean;
}

const VALID_VENUES = new Set(siteConfig.venues.map((v) => v.id));

function validateStaffInput(input: StaffInput): { uid: string; email: string; role: "owner" | "manager"; venues: string[]; active: boolean } {
  const uid = input.uid.trim();
  const email = input.email.trim().toLowerCase();
  if (!uid) throw new Error("Staff UID is required (copy it from Firebase Console → Authentication → Users).");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid staff email address.");
  if (input.role !== "owner" && input.role !== "manager") throw new Error("Role must be owner or manager.");
  const venues = [...new Set(input.venues.filter((v) => VALID_VENUES.has(v)))];
  if (input.role === "manager" && venues.length === 0) {
    throw new Error("A manager needs at least one authorized venue.");
  }
  return { uid, email, role: input.role, venues: input.role === "owner" ? [] : venues, active: !!input.active };
}

async function auditStaffChange(
  actor: StaffDoc,
  action: string,
  targetUid: string,
  before: Record<string, unknown>,
  after: Record<string, unknown>
): Promise<void> {
  await setDoc(doc(collection(db, "adminAudit")), {
    action,
    targetUid,
    actorUid: actor.uid,
    actorEmail: actor.email,
    before,
    after,
    createdAt: serverTimestamp(),
  });
}

export async function listStaff(): Promise<StaffDoc[]> {
  const snap = await getDocs(collection(db, "staff"));
  return snap.docs.map((d) => ({ ...(d.data() as Omit<StaffDoc, "uid">), uid: d.id }));
}

/** Owner-only: create or update a staff record. Never stores passwords or secrets. */
export async function saveStaffRecord(actor: StaffDoc, input: StaffInput): Promise<void> {
  if (actor.role !== "owner") throw new Error("Only the owner can manage staff access.");
  const clean = validateStaffInput(input);
  const ref = doc(db, "staff", clean.uid);
  const existing = await getDoc(ref);
  const before = existing.exists() ? (existing.data() as Record<string, unknown>) : {};
  await setDoc(
    ref,
    {
      email: clean.email,
      role: clean.role,
      venues: clean.venues,
      active: clean.active,
      updatedAt: serverTimestamp(),
      ...(existing.exists() ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true }
  );
  await auditStaffChange(actor, existing.exists() ? "staff:update" : "staff:create", clean.uid, before, {
    email: clean.email,
    role: clean.role,
    venues: clean.venues,
    active: clean.active,
  });
}

/** Owner-only: instant deactivation (rules deny the account on its very next request). */
export async function setStaffActive(actor: StaffDoc, target: StaffDoc, active: boolean): Promise<void> {
  if (actor.role !== "owner") throw new Error("Only the owner can change staff access.");
  if (target.uid === actor.uid && !active) {
    throw new Error("You cannot deactivate your own owner account.");
  }
  await setDoc(doc(db, "staff", target.uid), { active, updatedAt: serverTimestamp() }, { merge: true });
  await auditStaffChange(actor, active ? "staff:reactivate" : "staff:deactivate", target.uid, { active: target.active }, { active });
}

export interface AdminAuditEntry {
  id: string;
  action: string;
  targetUid?: string;
  actorUid: string;
  actorEmail: string;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
}

export async function listAdminAudit(): Promise<AdminAuditEntry[]> {
  const snap = await getDocs(collection(db, "adminAudit"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AdminAuditEntry, "id">) }));
}
