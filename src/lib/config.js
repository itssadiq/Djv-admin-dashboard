import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_PROJECT_URL;
const KEY = import.meta.env.VITE_PROJECT_KEY;

export const supabase = createClient(URL, KEY);
