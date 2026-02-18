import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    'https://jiwallboqzwnhayjuivc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppd2FsbGJvcXp3bmhheWp1aXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTg4ODgsImV4cCI6MjA4NjkzNDg4OH0.JenjPVuBmQXKoCNZii_pnuSXvmIPfO4bTkECmQnjyKU'
);
