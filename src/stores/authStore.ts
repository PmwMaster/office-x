import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  init: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthError | null>;
  register: (email: string, password: string, name: string) => Promise<AuthError | null>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  init: async () => {
    const { data } = await supabase!.auth.getSession();
    set({ user: data.session?.user ?? null, loading: false });
    supabase!.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  login: async (email, password) => {
    set({ error: null });
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) set({ error: error.message });
    return error;
  },

  register: async (email, password, name) => {
    set({ error: null });
    const { data, error } = await supabase!.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) {
      set({ error: error.message });
      return error;
    }
    if (data.user) {
      set({ user: data.user });
    }
    return null;
  },

  logout: async () => {
    await supabase!.auth.signOut();
    set({ user: null });
  },
}));
