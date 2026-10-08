import { BookingRecord, BookingStatus, Shift, AvailabilitySlot, DayAvailability, EnquiryInput } from "./types";
import { siteConfig } from "@/config/site";

// Shifts definition
export const SHIFTS = [
  { id: "MORNING_SHIFT" as Shift, name: "Morning Shift", time: "06:00 AM – 02:00 PM" },
  { id: "EVENING_SHIFT" as Shift, name: "Evening Shift", time: "04:00 PM – 11:30 PM" },
  { id: "FULL_DAY" as Shift, name: "Full Day (24 Hours)", time: "06:00 AM – Next Day 05:00 AM" },
];

/**
 * Checks if two shifts conflict.
 * - FULL_DAY conflicts with any shift on the same day.
 * - MORNING_SHIFT conflicts with MORNING_SHIFT or FULL_DAY.
 * - EVENING_SHIFT conflicts with EVENING_SHIFT or FULL_DAY.
 */
export function hasShiftConflict(shiftA: Shift, shiftB: Shift): boolean {
  if (shiftA === "FULL_DAY" || shiftB === "FULL_DAY") {
    return true;
  }
  return shiftA === shiftB;
}

// In-memory persistent mock storage for real-time demo & local development
let mockBookings: BookingRecord[] = [
  {
    id: "bk-101",
    venueId: "royal-convention",
    venueName: "Royal Convention",
    date: "2026-10-15",
    shift: "FULL_DAY",
    status: "CONFIRMED",
    customerName: "K. Raghunath Varma",
    customerPhone: "+91 98480 11223",
    customerEmail: "raghunath.v@example.com",
    guestCount: 2200,
    eventType: "Grand Wedding & Reception",
    notes: "Requires both bridal suites from 5:00 AM. Royal mandap setup by Sri Devi Decors.",
    internalQuoteAmount: 450000,
    createdAt: "2026-09-10T10:00:00Z",
    updatedAt: "2026-09-15T14:30:00Z",
  },
  {
    id: "bk-102",
    venueId: "royal-banquets",
    venueName: "Royal Banquet",
    date: "2026-10-15",
    shift: "EVENING_SHIFT",
    status: "CONFIRMED",
    customerName: "Dr. P. Madhavi Latha",
    customerPhone: "+91 98855 44332",
    customerEmail: "dr.madhavi@hospital.org",
    guestCount: 400,
    eventType: "Sangeet & Cocktail Evening",
    notes: "All 8 Deluxe Rooms booked for guests from Hyderabad.",
    internalQuoteAmount: 185000,
    createdAt: "2026-09-12T11:00:00Z",
    updatedAt: "2026-09-18T09:15:00Z",
  },
  {
    id: "bk-103",
    venueId: "vaishnavi-vaidehi",
    venueName: "Vaishnavi Vaidehi",
    date: "2026-10-16",
    shift: "MORNING_SHIFT",
    status: "CONFIRMED",
    customerName: "T. Venkat Rao",
    customerPhone: "+91 94401 55667",
    customerEmail: "t.venkat@trading.in",
    guestCount: 250,
    eventType: "Engagement (Nischithartham)",
    notes: "Traditional plantain leaf lunch arrangement for 200 guests.",
    internalQuoteAmount: 95000,
    createdAt: "2026-09-14T15:20:00Z",
    updatedAt: "2026-09-20T16:00:00Z",
  },
  {
    id: "bk-104",
    venueId: "royal-convention",
    venueName: "Royal Convention",
    date: "2026-10-22",
    shift: "FULL_DAY",
    status: "PROVISIONAL_HOLD",
    customerName: "G. Sudhakar Reddy",
    customerPhone: "+91 97011 22334",
    customerEmail: "sudhakar.g@construction.com",
    guestCount: 1800,
    eventType: "Pelli Muhurtham",
    notes: "Provisional hold until token advance confirmation by Sunday.",
    internalQuoteAmount: 420000,
    createdAt: "2026-09-25T12:00:00Z",
    updatedAt: "2026-09-28T10:00:00Z",
  },
  {
    id: "bk-105",
    venueId: "royal-banquets",
    venueName: "Royal Banquet",
    date: "2026-10-24",
    shift: "FULL_DAY",
    status: "MAINTENANCE_BLOCK",
    customerName: "Facility Maintenance",
    customerPhone: "+91 8645 234567",
    customerEmail: "admin@theroyalconventions.com",
    guestCount: 0,
    eventType: "Chiller Plant & Chandelier Overhaul",
    notes: "Quarterly preventative maintenance scheduled by engineering team.",
    internalQuoteAmount: 0,
    createdAt: "2026-09-01T08:00:00Z",
    updatedAt: "2026-09-01T08:00:00Z",
  },
  {
    id: "bk-106",
    venueId: "royal-convention",
    venueName: "Royal Convention",
    date: "2026-11-04",
    shift: "EVENING_SHIFT",
    status: "NEW_ENQUIRY",
    customerName: "M. Satyanarayana",
    customerPhone: "+91 99890 33445",
    customerEmail: "satya.m@techindia.com",
    guestCount: 1500,
    eventType: "Wedding Reception",
    notes: "Wants catering coordination and decorator package inspection.",
    internalQuoteAmount: undefined,
    createdAt: "2026-10-01T14:10:00Z",
    updatedAt: "2026-10-01T14:10:00Z",
  },
  {
    id: "bk-107",
    venueId: "royal-banquets",
    venueName: "Royal Banquet",
    date: "2026-11-08",
    shift: "MORNING_SHIFT",
    status: "NEW_ENQUIRY",
    customerName: "A. Lakshmi Prasanna",
    customerPhone: "+91 98492 66778",
    customerEmail: "lakshmi.p@gmail.com",
    guestCount: 350,
    eventType: "Half-Saree Ceremony",
    notes: "Inquired about 4 lodging rooms for visiting relatives.",
    internalQuoteAmount: undefined,
    createdAt: "2026-10-02T09:30:00Z",
    updatedAt: "2026-10-02T09:30:00Z",
  },
];

export const bookingService = {
  /**
   * Retrieves all bookings for admin pipeline & calendar
   */
  async getAllBookings(): Promise<BookingRecord[]> {
    return [...mockBookings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  /**
   * Get bookings filtered by venue and optional date range
   */
  async getBookingsByVenue(venueId: string, monthYear?: string): Promise<BookingRecord[]> {
    return mockBookings.filter((b) => {
      const matchVenue = venueId === "all" || b.venueId === venueId;
      const matchMonth = !monthYear || b.date.startsWith(monthYear);
      return matchVenue && matchMonth;
    });
  },

  /**
   * Check real-time availability for a venue on a specific date
   */
  async checkDateAvailability(venueId: string, dateStr: string): Promise<DayAvailability> {
    const existing = mockBookings.filter(
      (b) =>
        b.venueId === venueId &&
        b.date === dateStr &&
        ["CONFIRMED", "MAINTENANCE_BLOCK", "PROVISIONAL_HOLD"].includes(b.status)
    );

    const slots: AvailabilitySlot[] = SHIFTS.map((shiftDef) => {
      // Find conflicting booking for this shift
      const conflict = existing.find((b) => hasShiftConflict(b.shift, shiftDef.id));

      let status: AvailabilitySlot["status"] = "AVAILABLE";
      let bookingId: string | undefined;
      let eventType: string | undefined;

      if (conflict) {
        bookingId = conflict.id;
        eventType = conflict.eventType;
        if (conflict.status === "MAINTENANCE_BLOCK") {
          status = "BLOCKED";
        } else if (conflict.status === "CONFIRMED") {
          status = "BOOKED";
        } else if (conflict.status === "PROVISIONAL_HOLD") {
          status = "PROVISIONAL";
        }
      }

      return {
        shift: shiftDef.id,
        shiftName: shiftDef.name,
        timeWindow: shiftDef.time,
        status,
        bookingId,
        eventType,
      };
    });

    const isFullyBooked = slots.every((s) => s.status === "BOOKED" || s.status === "BLOCKED");

    return {
      date: dateStr,
      slots,
      isFullyBooked,
    };
  },

  /**
   * Check matrix availability across all venues for a date range (e.g., month)
   */
  async getMonthMatrix(yearMonth: string): Promise<Record<string, Record<string, AvailabilitySlot["status"]>>> {
    // Returns: { "2026-10-15": { "royal-convention": "BOOKED", "royal-banquets": "BOOKED", ... } }
    const matrix: Record<string, Record<string, AvailabilitySlot["status"]>> = {};
    const relevantBookings = mockBookings.filter(
      (b) =>
        b.date.startsWith(yearMonth) &&
        ["CONFIRMED", "MAINTENANCE_BLOCK", "PROVISIONAL_HOLD"].includes(b.status)
    );

    for (const b of relevantBookings) {
      if (!matrix[b.date]) {
        matrix[b.date] = {};
      }
      if (b.status === "CONFIRMED") {
        matrix[b.date][b.venueId] = "BOOKED";
      } else if (b.status === "MAINTENANCE_BLOCK") {
        matrix[b.date][b.venueId] = "BLOCKED";
      } else if (b.status === "PROVISIONAL_HOLD") {
        if (matrix[b.date][b.venueId] !== "BOOKED") {
          matrix[b.date][b.venueId] = "PROVISIONAL";
        }
      }
    }

    return matrix;
  },

  /**
   * Deterministic concurrency guard when creating or confirming a booking
   */
  async checkConcurrencyConflict(
    venueId: string,
    date: string,
    shift: Shift,
    excludeBookingId?: string
  ): Promise<{ hasConflict: boolean; reason?: string }> {
    const existing = mockBookings.filter(
      (b) =>
        b.venueId === venueId &&
        b.date === date &&
        b.id !== excludeBookingId &&
        ["CONFIRMED", "MAINTENANCE_BLOCK"].includes(b.status)
    );

    for (const b of existing) {
      if (hasShiftConflict(b.shift, shift)) {
        return {
          hasConflict: true,
          reason: `Venue is already locked for ${b.shift.replace("_", " ")} (${b.status}) by ${b.customerName}.`,
        };
      }
    }

    return { hasConflict: false };
  },

  /**
   * Public lead creation (Soft-check inquiry funnel)
   */
  async createEnquiry(input: EnquiryInput): Promise<{ success: boolean; id: string; message: string }> {
    const venue = siteConfig.venues.find((v) => v.id === input.venueId);
    const venueName = venue ? venue.name : "The Royal Conventions";

    const newBooking: BookingRecord = {
      id: `enq-${Date.now()}`,
      venueId: input.venueId,
      venueName,
      date: input.date,
      shift: input.shift,
      status: "NEW_ENQUIRY",
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      guestCount: input.guestCount,
      eventType: input.eventType,
      notes: input.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockBookings.unshift(newBooking);

    return {
      success: true,
      id: newBooking.id,
      message: "Inquiry received successfully. Management will review dates and contact you shortly.",
    };
  },

  /**
   * Update booking status or notes (Admin)
   */
  async updateBookingStatus(
    id: string,
    status: BookingStatus,
    internalQuoteAmount?: number,
    notes?: string
  ): Promise<{ success: boolean; booking?: BookingRecord; error?: string }> {
    const booking = mockBookings.find((b) => b.id === id);
    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    // If changing to CONFIRMED or MAINTENANCE_BLOCK, run deterministic concurrency guard
    if (["CONFIRMED", "MAINTENANCE_BLOCK"].includes(status)) {
      const conflict = await this.checkConcurrencyConflict(booking.venueId, booking.date, booking.shift, booking.id);
      if (conflict.hasConflict) {
        return { success: false, error: conflict.reason };
      }
    }

    booking.status = status;
    if (internalQuoteAmount !== undefined) {
      booking.internalQuoteAmount = internalQuoteAmount;
    }
    if (notes !== undefined) {
      booking.notes = notes;
    }
    booking.updatedAt = new Date().toISOString();

    return { success: true, booking };
  },

  /**
   * Direct manual booking creation (Admin / Walk-in / Maintenance Block)
   */
  async createManualBooking(record: Omit<BookingRecord, "id" | "createdAt" | "updatedAt">): Promise<{
    success: boolean;
    booking?: BookingRecord;
    error?: string;
  }> {
    if (["CONFIRMED", "MAINTENANCE_BLOCK"].includes(record.status)) {
      const conflict = await this.checkConcurrencyConflict(record.venueId, record.date, record.shift);
      if (conflict.hasConflict) {
        return { success: false, error: conflict.reason };
      }
    }

    const newBooking: BookingRecord = {
      ...record,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockBookings.unshift(newBooking);
    return { success: true, booking: newBooking };
  },
};
