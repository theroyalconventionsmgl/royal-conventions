import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AdminUserSession {
  email: string;
  name: string;
  role: "OWNER" | "MANAGER" | "STAFF";
}

// Default fallback admin user for local admin panel access & review
export const defaultAdminUser: AdminUserSession = {
  email: "proprietor@theroyalconventions.com",
  name: "N. Nageswara Rao",
  role: "OWNER",
};
