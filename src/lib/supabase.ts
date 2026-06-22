import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl?.includes('your-project') === false && supabaseAnonKey?.startsWith('your-anon') === false;

let reachable = false;
let checked = false;

async function checkReachable(): Promise<boolean> {
  if (checked) return reachable;
  checked = true;
  if (!isConfigured) { reachable = false; return false; }
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2000);
    const res = await fetch(`${supabaseUrl}/rest/v1/`, { method: 'HEAD', signal: ctrl.signal });
    clearTimeout(t);
    reachable = res.ok || res.status === 401;
  } catch {
    reachable = false;
  }
  return reachable;
}

export const supabase = isConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

export function isSupabaseReady(): boolean {
  return isConfigured && reachable;
}

export function isSupabaseConfigured(): boolean {
  return isConfigured;
}

export { checkReachable };
