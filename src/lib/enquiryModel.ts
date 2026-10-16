import type { Shift } from "./types";

/** Canonical pipeline statuses stored on `leads` docs. */
export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "NEGOTIATION",
  "AWAITING_CONFIRMATION",
  "CONFIRMED",
  "LOST",
  "CANCELLED",
  "MAINTENANCE_BLOCK",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Legacy statuses from earlier iterations — mapped for display only. */
const LEGACY_STATUS_MAP: Record<string, LeadStatus> = {
  NEW_ENQUIRY: "NEW",
  PROVISIONAL_HOLD: "NEGOTIATION",
  REJECTED: "LOST",
};

export function normalizeStatus(status: string): LeadStatus {
  if ((LEAD_STATUSES as readonly string[]).includes(status)) return status as LeadStatus;
  return LEGACY_STATUS_MAP[status] ?? "NEW";
}

/** Forward transitions enforced both client-side and in Firestore rules. */
export const LEAD_TRANSITIONS: Record<string, LeadStatus[]> = {
  NEW: ["CONTACTED", "LOST", "CANCELLED"],
  CONTACTED: ["NEGOTIATION", "LOST", "CANCELLED"],
  NEGOTIATION: ["AWAITING_CONFIRMATION", "LOST", "CANCELLED"],
  AWAITING_CONFIRMATION: ["CONFIRMED", "NEGOTIATION", "LOST", "CANCELLED"],
  CONFIRMED: ["CANCELLED"],
  LOST: [],
  CANCELLED: [],
  MAINTENANCE_BLOCK: ["CANCELLED"],
  // Legacy values may move forward into the canonical pipeline.
  NEW_ENQUIRY: ["CONTACTED", "NEGOTIATION", "LOST", "CANCELLED", "NEW"],
  PROVISIONAL_HOLD: ["AWAITING_CONFIRMATION", "NEGOTIATION", "LOST", "CANCELLED"],
  REJECTED: [],
};

export function allowedNextStatuses(status: string): LeadStatus[] {
  return LEAD_TRANSITIONS[status] ?? [];
}

export const ACTIVE_PIPELINE: LeadStatus[] = ["NEW", "CONTACTED", "NEGOTIATION", "AWAITING_CONFIRMATION"];
export const TERMINAL_STATUSES: LeadStatus[] = ["LOST", "CANCELLED"];

export interface LeadDoc {
  id: string;
  venueId: string;
  venueName?: string;
  date: string; // YYYY-MM-DD
  shift: Shift;
  shiftName?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  guestCount?: number;
  eventType: string;
  notes?: string;
  source?: string;
  status: string;
  // Negotiated financials (staff-only fields)
  totalAmount?: number;
  advanceRequired?: number;
  paymentTerms?: string;
  internalNotes?: string;
  // Confirmation record
  confirmedByUid?: string;
  confirmedByEmail?: string;
  confirmedAt?: unknown;
  holdId?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface StaffDoc {
  uid: string;
  email: string;
  role: "owner" | "manager";
  venues: string[];
  active: boolean;
}

export type PaymentType = "ADVANCE" | "INSTALMENT" | "REFUND";

export interface PaymentDoc {
  id: string;
  type: PaymentType;
  amount: number;
  method?: string;
  reference?: string;
  receivedAt: string; // YYYY-MM-DD
  recordedByUid: string;
  recordedByEmail: string;
  createdAt?: unknown;
}

export interface NoteDoc {
  id: string;
  text: string;
  authorUid: string;
  authorEmail: string;
  createdAt?: unknown;
}

export interface AuditDoc {
  id: string;
  action: string;
  actorUid: string;
  actorEmail: string;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  createdAt?: unknown;
}

export interface HoldDoc {
  id: string;
  venueId: string;
  date: string;
  shift: Shift;
  leadId: string;
  status: "active" | "released";
}

export function holdIdFor(venueId: string, date: string, shift: Shift): string {
  return `${venueId}__${date}__${shift}`;
}

/** All hold keys that conflict with the given shift (FULL_DAY overlaps everything). */
export function conflictingHoldKeys(venueId: string, date: string, shift: Shift): string[] {
  if (shift === "FULL_DAY") {
    return ["FULL_DAY", "MORNING_SHIFT", "EVENING_SHIFT"].map(
      (s) => `${venueId}__${date}__${s}`
    );
  }
  return [`${venueId}__${date}__${shift}`, `${venueId}__${date}__FULL_DAY`];
}

export function balanceDue(totalAmount: number | undefined, received: number): number {
  return (totalAmount ?? 0) - received;
}

export function receivedTotal(payments: PaymentDoc[]): number {
  return payments.reduce(
    (sum, p) => sum + (p.type === "REFUND" ? -p.amount : p.amount),
    0
  );
}
