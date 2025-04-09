import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = "https://pyiaakxowtkvqotujuxs.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5aWFha3hvd3RrdnFvdHVqdXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTU2MzYsImV4cCI6MjA1OTc5MTYzNn0.DvhFjDqKmesRE_cYYBQLgfP2KtZBOxqpXtR26ckCYGM";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
