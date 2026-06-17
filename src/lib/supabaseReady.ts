const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl?.includes('your-project') === false && supabaseAnonKey?.startsWith('your-anon') === false;

export function isSupabaseReady(): boolean {
  return isConfigured;
}
