import { createClient } from "@supabase/supabase-js";

if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_URL. Please set it in your .env",
  );
}

if (!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing EXPO_PUBLIC_SUPABASE_ANON_KEY. Please set it in your .env",
  );
}

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
