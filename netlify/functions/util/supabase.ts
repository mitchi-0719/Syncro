import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? "";
const supabaseApiKey = process.env.VITE_SUPABASE_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseApiKey);
