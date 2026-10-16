import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { enquirySchema, type EnquiryFormValues } from "./validations";

export interface EnquiryLead extends EnquiryFormValues {
  venueName?: string;
  shiftName?: string;
  source?: string;
}

type SubmitResult =
  | { success: true; inquiryId: string }
  | { success: false; error: string };

export async function submitBookingLead(lead: EnquiryLead): Promise<SubmitResult> {
  const { venueName, shiftName, source, ...candidate } = lead;
  const parsed = enquirySchema.safeParse(candidate);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Please check the highlighted fields and try again.",
    };
  }

  try {
    const docRef = await addDoc(collection(db, "leads"), {
      ...parsed.data,
      ...(venueName ? { venueName } : {}),
      ...(shiftName ? { shiftName } : {}),
      ...(source ? { source } : {}),
      status: "NEW",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, inquiryId: docRef.id };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false, error: "Unable to submit inquiry. Please try again or call us." };
  }
}
