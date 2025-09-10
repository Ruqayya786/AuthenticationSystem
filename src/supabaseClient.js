import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yxmtsdytztnshelpxxrc.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4bXRzZHl0enRuc2hlbHB4eHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MDU2NTgsImV4cCI6MjA3MjQ4MTY1OH0.hy7VGI7KOjAlTmF5DGXpobIDrh3efJBQWrTrS2Jd0Ro"


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
