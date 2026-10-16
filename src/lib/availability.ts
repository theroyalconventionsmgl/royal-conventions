import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import type { DayAvailability, Shift } from "./types";
import { holdsForDate } from "./admin/leadRepo";

const SHIFTS: { id: Shift; name: string; time: string }[] = [
  { id: "MORNING_SHIFT", name: "Morning Shift", time: "06:00 AM – 02:00 PM" },
  { id: "EVENING_SHIFT", name: "Evening Shift", time: "04:00 PM – 11:30 PM" },
  { id: "FULL_DAY", name: "Full Day", time: "06:00 AM – Next Day 05:00 AM" },
];

/**
 * Real availability derived from active calendar holds in Firestore —
 * never invented. Throws when the calendar cannot be read so callers
 * show an "unknown" state instead of fake availability.
 */
export async function getRealAvailability(venueId: string, date: string): Promise<DayAvailability> {
  // Single-field filter (no composite index needed on static hosting);
  // venue scoping happens client-side.
  const snap = await getDocs(
    query(collection(db, "holds"), where("date", "==", date), where("status", "==", "active"))
  );
  const venueHolds = snap.docs
    .map((d) => d.data() as { venueId: string; shift: Shift })
    .filter((h) => h.venueId === venueId);

  const held = new Set(venueHolds.map((h) => h.shift));
  const fullDayHeld = held.has("FULL_DAY");

  const slots = SHIFTS.map((s) => {
    let status: "AVAILABLE" | "PROVISIONAL" | "BOOKED" | "BLOCKED" = "AVAILABLE";
    if (s.id === "FULL_DAY") {
      if (fullDayHeld || held.size > 0) status = "BOOKED";
    } else if (held.has(s.id) || fullDayHeld) {
      status = "BOOKED";
    }
    return { shift: s.id, shiftName: s.name, timeWindow: s.time, status };
  });

  return {
    date,
    slots,
    isFullyBooked: slots.every((s) => s.status !== "AVAILABLE"),
  };
}

export { holdsForDate };
