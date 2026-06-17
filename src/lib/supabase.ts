import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { isSupabaseReady } from './supabaseReady';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = isSupabaseReady()
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

export { isSupabaseReady };
