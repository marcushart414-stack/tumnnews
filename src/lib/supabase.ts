// src/lib/supabase.ts
//
// Single shared Supabase client for the whole app. Uses Vite's env system —
// add these two values to a .env file at your project root (see .env.example).
//
// npm install @supabase/supabase-js   (if not already in package.json)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly in dev rather than silently breaking auth calls later.
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
