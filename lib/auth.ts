import { supabase } from './supabase';
import type { Session, User } from '@supabase/supabase-js';

// ─── Sign In ─────────────────────────────────────────────────────────────────

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
}

// ─── Sign Up ─────────────────────────────────────────────────────────────────

export async function signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { data, error };
}

// ─── Sign Out ────────────────────────────────────────────────────────────────

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

// ─── Session ─────────────────────────────────────────────────────────────────

export async function getSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

export function getCurrentUser(): Promise<User | null> {
    return getSession().then(s => s?.user ?? null);
}

// ─── Auth State ──────────────────────────────────────────────────────────────

export function onAuthStateChange(callback: (session: Session | null) => void) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });
    return subscription;
}

// ─── Password Reset ──────────────────────────────────────────────────────────

export async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
}
