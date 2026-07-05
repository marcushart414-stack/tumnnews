// src/lib/auth.ts
//
// Direct-to-Supabase auth helpers, replacing the old netlify/functions
// register.js / login.js. No serverless function, no service_role key,
// no custom password hashing — Supabase Auth handles all of that.

import { supabase } from './supabase';

export type ProfileRole = 'student' | 'parent' | 'org_purchaser' | 'admin' | 'member' | 'contributor' | 'editor';

export interface Profile {
  id: string;
  role: ProfileRole;
  full_name: string | null;
  email: string | null;
  program_level: 'foundations' | 'correspondent' | null;
  organization_name: string | null;
  license_tier: 'starter' | 'pro' | 'enterprise' | null;
  created_at: string;
}

interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  role?: ProfileRole;          // defaults to 'member' at the DB level if omitted
  programLevel?: 'foundations' | 'correspondent';
  organizationName?: string;
}

/**
 * Sign up a new user. Role/name/etc. are stashed in auth metadata; a DB
 * trigger (handle_new_user) reads that metadata and creates the matching
 * public.profiles row automatically — nothing else to call.
 */
export async function signUp({ email, password, fullName, role, programLevel, organizationName }: SignUpParams) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role || 'member',
        program_level: programLevel || null,
        organization_name: organizationName || null,
      },
    },
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) {
    console.error('getProfile error:', error.message);
    return null;
  }
  return data as Profile;
}

/**
 * Convenience combo for a Login page: sign in, then immediately fetch the
 * profile so you know where to route the user (member dashboard vs.
 * student/parent/org portal) without a second round trip.
 */
export async function signInAndGetProfile(email: string, password: string) {
  const { data, error } = await signIn(email, password);
  if (error || !data.user) return { profile: null, error };
  const profile = await getProfile(data.user.id);
  return { profile, error: null };
}
