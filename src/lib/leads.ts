import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface BookingLead {
  name: string;
  phone: string;
  hallId: "royal-convention" | "vaishnavi-vaidehi" | "nannapaneni-lakshmi" | "royal-banquets";
  eventDate?: string;
  guestCount?: number;
  notes?: string;
}

export async function submitBookingLead(lead: BookingLead) {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      ...lead,
      status: "new",
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false, error };
  }
}
