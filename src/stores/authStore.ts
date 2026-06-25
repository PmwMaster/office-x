import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

function translateError(message: string): string {
  const map: Record<string, string> = {
    'Invalid login credentials': 'E-mail ou senha inválidos.',
    'User already registered': 'Este e-mail já está cadastrado.',
    'Email not confirmed': 'E-mail ainda não foi confirmado. Verifique sua caixa de entrada.',
    'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
    'Email rate limit exceeded': 'Muitas tentativas. Aguarde um momento para tentar novamente.',
    'For security purposes, you can only request this once every 60 seconds': 'Por segurança, aguarde 60 segundos para tentar novamente.',
    'Unable to validate email address: invalid format': 'Formato de e-mail inválido.',
  };
  return map[message] ?? message;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  confirmationSent: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  clearConfirmation: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  confirmationSent: false,

  setUser: (user) => set({ user, loading: false }),

  setSession: (session) => set({ session, user: session?.user ?? null, loading: false, confirmationSent: false }),

  signUp: async (email, password) => {
    set({ error: null, loading: true, confirmationSent: false });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) {
      set({ error: translateError(error.message), loading: false });
      throw error;
    }
    if (data.user && !data.session) {
      set({ loading: false, confirmationSent: true });
      return false; // needs confirmation
    }
    // Auto-confirmed (email confirmation disabled in Supabase)
    if (data.user && data.session) {
      set({ user: data.user, session: data.session, loading: false });
      return true; // logged in
    }
    set({ loading: false });
    return false;
  },

  signIn: async (email, password) => {
    set({ error: null, loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ error: translateError(error.message), loading: false });
      throw error;
    }
    set({ user: data.user, session: data.session, loading: false });
  },

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, session: null, loading: false, confirmationSent: false });
  },

  clearError: () => set({ error: null }),

  clearConfirmation: () => set({ confirmationSent: false }),
}));
