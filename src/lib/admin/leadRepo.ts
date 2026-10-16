import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  runTransaction,
  writeBatch,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { multiFactor, TotpMultiFactorGenerator } from "firebase/auth";
import { siteConfig } from "@/config/site";
import type { Shift } from "@/lib/types";
import {
  allowedNextStatuses,
  conflictingHoldKeys,
  holdIdFor,
  type AuditDoc,
  type HoldDoc,
  type LeadDoc,
  type LeadStatus,
  type NoteDoc,
  type PaymentDoc,
  type PaymentType,
  type StaffDoc,
} from "@/lib/enquiryModel";

function toLeadDoc(id: string, data: DocumentData): LeadDoc {
  return { id, ...data } as LeadDoc;
}

function actorOf(staff: StaffDoc) {
  return { actorUid: staff.uid, actorEmail: staff.email };
}

/** Venues a user may query. Owners pass no constraint (full collection read). */
export function venueConstraint(staff: StaffDoc): string[] | null {
  if (staff.role === "owner") return null;
  return staff.venues;
}

export async function listLeads(staff: StaffDoc): Promise<LeadDoc[]> {
  const base = collection(db, "leads");
  const snap =
    staff.role === "owner"
      ? await getDocs(base)
      : await getDocs(query(base, where("venueId", "in", staff.venues)));
  const leads = snap.docs.map((d) => toLeadDoc(d.id, d.data()));
  // Client-side newest-first (avoids composite indexes on static hosting).
  leads.sort((a, b) => {
    const ta = (a.createdAt as { seconds?: number })?.seconds ?? 0;
    const tb = (b.createdAt as { seconds?: number })?.seconds ?? 0;
    return tb - ta;
  });
  return leads;
}

export async function getLead(leadId: string): Promise<LeadDoc | null> {
  const snap = await getDoc(doc(db, "leads", leadId));
  return snap.exists() ? toLeadDoc(snap.id, snap.data()) : null;
}

export async function listNotes(leadId: string): Promise<NoteDoc[]> {
  const snap = await getDocs(collection(db, "leads", leadId, "notes"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as NoteDoc);
}

export async function listPayments(leadId: string): Promise<PaymentDoc[]> {
  const snap = await getDocs(collection(db, "leads", leadId, "payments"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as PaymentDoc);
}

export async function listAudit(leadId: string): Promise<AuditDoc[]> {
  const snap = await getDocs(collection(db, "leads", leadId, "audit"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as AuditDoc);
}

/** All payment docs across leads (dashboard totals). Staff-scoped by rules. */
export async function listAllPayments(staff: StaffDoc): Promise<(PaymentDoc & { leadId: string })[]> {
  if (staff.role !== "owner") {
    // Managers cannot run a collectionGroup across venues they can't see
    // (rules deny per-doc, failing the whole query) — scope via their leads.
    const leads = await listLeads(staff);
    return listPaymentsForLeads(leads.map((l) => l.id));
  }
  const snap = await getDocs(collectionGroup(db, "payments"));
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<PaymentDoc, "id">),
    leadId: d.ref.parent.parent?.id ?? "",
  }));
}

/** Payments for an explicit set of lead IDs (manager-safe, no index needed). */
export async function listPaymentsForLeads(leadIds: string[]): Promise<(PaymentDoc & { leadId: string })[]> {
  const out: (PaymentDoc & { leadId: string })[] = [];
  for (const leadId of leadIds) {
    const snap = await getDocs(collection(db, "leads", leadId, "payments"));
    for (const d of snap.docs) {
      out.push({ id: d.id, ...(d.data() as Omit<PaymentDoc, "id">), leadId });
    }
  }
  return out;
}

/** Active holds for a venue+date (public availability + confirm checks). */
export async function holdsForDate(venueId: string, date: string): Promise<HoldDoc[]> {
  const snap = await getDocs(
    query(collection(db, "holds"), where("date", "==", date), where("status", "==", "active"))
  );
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }) as HoldDoc)
    .filter((h) => h.venueId === venueId);
}

/** Active holds in a YYYY-MM range (calendar matrix). */
export async function holdsForMonth(yearMonth: string): Promise<HoldDoc[]> {
  const snap = await getDocs(
    query(
      collection(db, "holds"),
      where("date", ">=", `${yearMonth}-01`),
      where("date", "<=", `${yearMonth}-31`),
      where("status", "==", "active")
    )
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as HoldDoc);
}

function assertVenueAccess(staff: StaffDoc, venueId: string) {
  if (staff.role === "owner") return;
  if (!staff.venues.includes(venueId)) {
    throw new Error("Your account is not authorized for this venue.");
  }
}

/**
 * Money movement and calendar locks require an enrolled TOTP authenticator.
 * Firestore rules enforce this server-side too; this pre-check gives staff a
 * clear, actionable message instead of a raw permission error.
 */
function requireMfaEnrolled() {
  const user = auth.currentUser;
  const enrolled =
    !!user &&
    multiFactor(user).enrolledFactors.some(
      (f) => f.factorId === TotpMultiFactorGenerator.FACTOR_ID
    );
  if (!enrolled) {
    throw new Error(
      "Two-step verification is required for this action. Enroll an authenticator in Admin → Security first."
    );
  }
}

export async function updateLeadStatus(
  staff: StaffDoc,
  lead: LeadDoc,
  next: LeadStatus,
  extra: Record<string, unknown> = {}
): Promise<void> {
  if (!allowedNextStatuses(lead.status).includes(next)) {
    throw new Error(`Status cannot move from ${lead.status} to ${next}.`);
  }
  assertVenueAccess(staff, lead.venueId);
  const batch = writeBatch(db);
  const ref = doc(db, "leads", lead.id);
  batch.update(ref, { ...extra, status: next, updatedAt: serverTimestamp() });
  batch.set(doc(collection(db, "leads", lead.id, "audit")), {
    action: `status:${lead.status}->${next}`,
    ...actorOf(staff),
    before: { status: lead.status },
    after: { status: next, ...extra },
    createdAt: serverTimestamp(),
  });
  await batch.commit();
}

export async function addNote(staff: StaffDoc, lead: LeadDoc, text: string): Promise<void> {
  const clean = text.trim();
  if (!clean) throw new Error("Note cannot be empty.");
  if (clean.length > 2000) throw new Error("Note is too long (max 2000 characters).");
  assertVenueAccess(staff, lead.venueId);
  const batch = writeBatch(db);
  batch.set(doc(collection(db, "leads", lead.id, "notes")), {
    text: clean,
    authorUid: staff.uid,
    authorEmail: staff.email,
    createdAt: serverTimestamp(),
  });
  batch.set(doc(collection(db, "leads", lead.id, "audit")), {
    action: "note:add",
    ...actorOf(staff),
    before: {},
    after: { text: clean.slice(0, 120) },
    createdAt: serverTimestamp(),
  });
  await batch.commit();
}

export interface PricingInput {
  totalAmount: number;
  advanceRequired: number;
  paymentTerms?: string;
  internalNotes?: string;
}

export async function savePricing(staff: StaffDoc, lead: LeadDoc, input: PricingInput): Promise<void> {
  assertVenueAccess(staff, lead.venueId);
  if (!Number.isFinite(input.totalAmount) || input.totalAmount <= 0) {
    throw new Error("Final negotiated amount must be greater than zero.");
  }
  if (!Number.isFinite(input.advanceRequired) || input.advanceRequired < 0) {
    throw new Error("Advance required cannot be negative.");
  }
  if (input.advanceRequired > input.totalAmount) {
    throw new Error("Advance required cannot exceed the final amount.");
  }
  if (lead.status === "CONFIRMED" && staff.role !== "owner") {
    throw new Error("Only the owner can change amounts on a confirmed booking.");
  }
  const after = {
    totalAmount: Math.round(input.totalAmount),
    advanceRequired: Math.round(input.advanceRequired),
    paymentTerms: input.paymentTerms?.trim() || "",
    internalNotes: input.internalNotes?.trim() || "",
  };
  const batch = writeBatch(db);
  batch.update(doc(db, "leads", lead.id), { ...after, updatedAt: serverTimestamp() });
  batch.set(doc(collection(db, "leads", lead.id, "audit")), {
    action: "pricing:save",
    ...actorOf(staff),
    before: {
      totalAmount: lead.totalAmount ?? null,
      advanceRequired: lead.advanceRequired ?? null,
    },
    after,
    createdAt: serverTimestamp(),
  });
  await batch.commit();
}

export interface PaymentInput {
  type: PaymentType;
  amount: number;
  method?: string;
  reference?: string;
  receivedAt: string;
}

/**
 * Records one payment transaction. Money-received is derived ONLY from
 * payment docs — no aggregate is stored, so funds can never appear received
 * without a corresponding transaction record.
 */
export async function recordPayment(staff: StaffDoc, lead: LeadDoc, input: PaymentInput): Promise<void> {
  assertVenueAccess(staff, lead.venueId);
  requireMfaEnrolled();
  if (!["ADVANCE", "INSTALMENT", "REFUND"].includes(input.type)) throw new Error("Invalid payment type.");
  if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error("Amount must be greater than zero.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.receivedAt)) throw new Error("Received date must be YYYY-MM-DD.");
  const batch = writeBatch(db);
  const payRef = doc(collection(db, "leads", lead.id, "payments"));
  const payment = {
    type: input.type,
    amount: Math.round(input.amount),
    method: input.method?.trim() || "",
    reference: input.reference?.trim() || "",
    receivedAt: input.receivedAt,
    recordedByUid: staff.uid,
    recordedByEmail: staff.email,
    createdAt: serverTimestamp(),
  };
  batch.set(payRef, payment);
  batch.update(doc(db, "leads", lead.id), { updatedAt: serverTimestamp() });
  batch.set(doc(collection(db, "leads", lead.id, "audit")), {
    action: `payment:${input.type}`,
    ...actorOf(staff),
    before: {},
    after: { ...payment, createdAt: undefined },
    createdAt: serverTimestamp(),
  });
  await batch.commit();
}

export type ConfirmInput = PricingInput;

/**
 * Explicit, atomic booking confirmation. The Firestore transaction checks
 * every conflicting hold key and creates the hold + confirmation together,
 * so simultaneous attempts cannot double-book the same slot.
 */
export async function confirmBooking(
  staff: StaffDoc,
  lead: LeadDoc,
  input: ConfirmInput
): Promise<void> {
  assertVenueAccess(staff, lead.venueId);
  requireMfaEnrolled();
  if (lead.status !== "AWAITING_CONFIRMATION") {
    throw new Error("Only enquiries in Awaiting Confirmation can be confirmed. Move the enquiry through the pipeline first.");
  }
  if (!Number.isFinite(input.totalAmount) || input.totalAmount <= 0) {
    throw new Error("Enter the final negotiated amount before confirming.");
  }
  if (!Number.isFinite(input.advanceRequired) || input.advanceRequired < 0) {
    throw new Error("Enter the advance required before confirming.");
  }
  if (input.advanceRequired > input.totalAmount) {
    throw new Error("Advance required cannot exceed the final amount.");
  }

  const holdId = holdIdFor(lead.venueId, lead.date, lead.shift as Shift);
  const conflictKeys = conflictingHoldKeys(lead.venueId, lead.date, lead.shift as Shift);

  await runTransaction(db, async (tx) => {
    for (const key of conflictKeys) {
      const snap = await tx.get(doc(db, "holds", key));
      if (snap.exists() && (snap.data() as HoldDoc).status === "active") {
        const holder = snap.data() as HoldDoc;
        throw new Error(
          `Slot conflict: ${lead.venueId} ${lead.date} ${holder.shift} is already held by enquiry ${holder.leadId}.`
        );
      }
    }
    const leadRef = doc(db, "leads", lead.id);
    const leadSnap = await tx.get(leadRef);
    if (!leadSnap.exists()) throw new Error("Enquiry no longer exists.");
    if (leadSnap.data().status !== "AWAITING_CONFIRMATION") {
      throw new Error("Enquiry status changed during confirmation. Reload and retry.");
    }
    tx.set(doc(db, "holds", holdId), {
      venueId: lead.venueId,
      date: lead.date,
      shift: lead.shift,
      leadId: lead.id,
      status: "active",
      createdAt: serverTimestamp(),
    });
    tx.update(leadRef, {
      status: "CONFIRMED",
      totalAmount: Math.round(input.totalAmount),
      advanceRequired: Math.round(input.advanceRequired),
      paymentTerms: input.paymentTerms?.trim() || "",
      internalNotes: input.internalNotes?.trim() || lead.internalNotes || "",
      confirmedByUid: staff.uid,
      confirmedByEmail: staff.email,
      confirmedAt: serverTimestamp(),
      holdId,
      updatedAt: serverTimestamp(),
    });
    tx.set(doc(collection(db, "leads", lead.id, "audit")), {
      action: "booking:confirm",
      ...actorOf(staff),
      before: { status: lead.status },
      after: { status: "CONFIRMED", totalAmount: Math.round(input.totalAmount), holdId },
      createdAt: serverTimestamp(),
    });
  });
}

/** Cancel any non-terminal lead; releases the calendar hold when confirmed. */
export async function cancelLead(staff: StaffDoc, lead: LeadDoc, reason: string): Promise<void> {
  assertVenueAccess(staff, lead.venueId);
  requireMfaEnrolled();
  if (lead.status === "CONFIRMED" || lead.holdId) {
    const holdId = lead.holdId ?? holdIdFor(lead.venueId, lead.date, lead.shift as Shift);
    await runTransaction(db, async (tx) => {
      const leadRef = doc(db, "leads", lead.id);
      const snap = await tx.get(leadRef);
      if (!snap.exists()) throw new Error("Enquiry no longer exists.");
      tx.update(leadRef, { status: "CANCELLED", updatedAt: serverTimestamp() });
      tx.set(
        doc(db, "holds", holdId),
        { status: "released", releasedAt: serverTimestamp() },
        { merge: true }
      );
      tx.set(doc(collection(db, "leads", lead.id, "audit")), {
        action: `status:${snap.data().status}->CANCELLED`,
        ...actorOf(staff),
        before: { status: snap.data().status },
        after: { status: "CANCELLED", reason: reason.trim().slice(0, 200) },
        createdAt: serverTimestamp(),
      });
    });
    return;
  }
  await updateLeadStatus(staff, lead, "CANCELLED");
}

export interface ManualLeadInput {
  venueId: string;
  date: string;
  shift: Shift;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  guestCount?: number;
  eventType: string;
  notes?: string;
  kind: "WALKIN" | "MAINTENANCE";
}

/** Staff-created walk-in or maintenance block. Maintenance blocks claim the hold immediately. */
export async function createManualLead(staff: StaffDoc, input: ManualLeadInput): Promise<string> {
  assertVenueAccess(staff, input.venueId);
  if (!siteConfig.venues.some((v) => v.id === input.venueId)) throw new Error("Unknown venue.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) throw new Error("Date must be YYYY-MM-DD.");
  const venueName = siteConfig.venues.find((v) => v.id === input.venueId)?.name ?? input.venueId;

  if (input.kind === "MAINTENANCE") {
    requireMfaEnrolled();
    const holdId = holdIdFor(input.venueId, input.date, input.shift);
    const conflictKeys = conflictingHoldKeys(input.venueId, input.date, input.shift);
    let leadId = "";
    await runTransaction(db, async (tx) => {
      for (const key of conflictKeys) {
        const s = await tx.get(doc(db, "holds", key));
        if (s.exists() && (s.data() as HoldDoc).status === "active") {
          throw new Error("Slot conflict: this shift is already held. Cannot place a maintenance block.");
        }
      }
      const leadRef = doc(collection(db, "leads"));
      leadId = leadRef.id;
      tx.set(leadRef, {
        venueId: input.venueId,
        venueName,
        date: input.date,
        shift: input.shift,
        customerName: "Facility Maintenance",
        customerPhone: "",
        eventType: input.eventType || "Facility maintenance",
        notes: input.notes || "",
        source: "manual-block",
        status: "MAINTENANCE_BLOCK",
        holdId,
        confirmedByUid: staff.uid,
        confirmedByEmail: staff.email,
        confirmedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      tx.set(doc(db, "holds", holdId), {
        venueId: input.venueId,
        date: input.date,
        shift: input.shift,
        leadId,
        status: "active",
        createdAt: serverTimestamp(),
      });
      tx.set(doc(collection(db, "leads", leadId, "audit")), {
        action: "block:create",
        ...actorOf(staff),
        before: {},
        after: { status: "MAINTENANCE_BLOCK", holdId },
        createdAt: serverTimestamp(),
      });
    });
    return leadId;
  }

  if (input.customerName.trim().length < 2) throw new Error("Customer name is required.");
  if (input.customerPhone.replace(/\D/g, "").length < 10) throw new Error("A valid 10-digit phone is required.");
  const ref = await addDoc(collection(db, "leads"), {
    venueId: input.venueId,
    venueName,
    date: input.date,
    shift: input.shift,
    customerName: input.customerName.trim(),
    customerPhone: input.customerPhone.replace(/\D/g, ""),
    customerEmail: input.customerEmail?.trim() || "",
    guestCount: input.guestCount ?? null,
    eventType: input.eventType,
    notes: input.notes || "",
    source: "manual-walkin",
    status: "CONTACTED",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await addDoc(collection(db, "leads", ref.id, "audit"), {
    action: "lead:create-manual",
    ...actorOf(staff),
    before: {},
    after: { status: "CONTACTED" },
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
