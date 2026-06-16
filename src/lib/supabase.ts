import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl?.includes('your-project') === false && supabaseAnonKey?.startsWith('your-anon') === false;

export const supabase = isConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

export function isSupabaseReady(): boolean {
  return supabase !== null;
}
