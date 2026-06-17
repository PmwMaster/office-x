import { create } from 'zustand';

interface AuthUser {
  id: string;
  email?: string;
  name?: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  init: () => Promise<void>;
  login: (email: string, password: string) => Promise<Error | null>;
  register: (email: string, password: string, name: string) => Promise<Error | null>;
  logout: () => Promise<void>;
}

// Lightweight mock auth for development (no Supabase weight)
// Replace with Supabase Auth in production via .env flag
async function getClient() {
  const { supabase, isSupabaseReady } = await import('../lib/supabase');
  if (!isSupabaseReady()) return null;
  return supabase;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  init: async () => {
    const client = await getClient();
    if (!client) { set({ loading: false }); return; }
    const { data } = await client.auth.getSession();
    set({ user: data.session?.user ? { id: data.session.user.id, email: data.session.user.email, name: data.session.user.user_metadata?.full_name } : null, loading: false });
    client.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ? { id: session.user.id, email: session.user.email, name: session.user.user_metadata?.full_name } : null });
    });
  },

  login: async (email, password) => {
    set({ error: null });
    const client = await getClient();
    if (!client) { set({ error: 'Auth not configured' }); return new Error('Auth not configured'); }
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) set({ error: error.message });
    return error;
  },

  register: async (email, password, name) => {
    set({ error: null });
    const client = await getClient();
    if (!client) { set({ error: 'Auth not configured' }); return new Error('Auth not configured'); }
    const { error } = await client.auth.signUp({ email, password, options: { data: { full_name: name } } });
    if (error) set({ error: error.message });
    return error;
  },

  logout: async () => {
    const client = await getClient();
    if (client) await client.auth.signOut();
    set({ user: null });
  },
}));
