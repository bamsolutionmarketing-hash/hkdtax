import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jiwallboqzwnhayjuivc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppd2FsbGJvcXp3bmhheWp1aXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTg4ODgsImV4cCI6MjA4NjkzNDg4OH0.JenjPVuBmQXKoCNZii_pnuSXvmIPfO4bTkECmQnjyKU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

