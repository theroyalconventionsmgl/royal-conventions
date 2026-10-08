export type Shift = "MORNING_SHIFT" | "EVENING_SHIFT" | "FULL_DAY";

export type BookingStatus =
  | "NEW_ENQUIRY"
  | "PROVISIONAL_HOLD"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "MAINTENANCE_BLOCK";

export type UserRole = "OWNER" | "MANAGER" | "STAFF";

export interface BookingRecord {
  id: string;
  venueId: string;
  venueName: string;
  date: string; // YYYY-MM-DD
  shift: Shift;
  status: BookingStatus;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  guestCount?: number;
  eventType?: string;
  notes?: string;
  internalQuoteAmount?: number; // Strictly private internal quote
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  shift: Shift;
  shiftName: string;
  timeWindow: string;
  status: "AVAILABLE" | "PROVISIONAL" | "BOOKED" | "BLOCKED";
  bookingId?: string;
  eventType?: string;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  slots: AvailabilitySlot[];
  isFullyBooked: boolean;
}

export interface EnquiryInput {
  venueId: string;
  date: string;
  shift: Shift;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  guestCount?: number;
  eventType: string;
  notes?: string;
}
