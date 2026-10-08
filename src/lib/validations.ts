import { z } from "zod";

export const enquirySchema = z.object({
  venueId: z.string().min(1, "Please select a venue"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please select a valid date (YYYY-MM-DD)"),
  shift: z.enum(["MORNING_SHIFT", "EVENING_SHIFT", "FULL_DAY"]),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  customerEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  guestCount: z.coerce.number().min(10, "Minimum guest count is 10").max(10000, "Maximum guest count is 10,000").optional(),
  eventType: z.string().min(2, "Please indicate the occasion or event type"),
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

export const manualBookingSchema = z.object({
  venueId: z.string().min(1, "Venue is required"),
  venueName: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Valid date required"),
  shift: z.enum(["MORNING_SHIFT", "EVENING_SHIFT", "FULL_DAY"]),
  status: z.enum([
    "NEW_ENQUIRY",
    "PROVISIONAL_HOLD",
    "CONFIRMED",
    "REJECTED",
    "CANCELLED",
    "MAINTENANCE_BLOCK",
  ]),
  customerName: z.string().min(2, "Customer / Event Name required"),
  customerPhone: z.string().min(8, "Phone number required"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  guestCount: z.coerce.number().optional(),
  eventType: z.string().optional(),
  notes: z.string().optional(),
  internalQuoteAmount: z.coerce.number().optional(),
});
