import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase, signUpWithEmail, signInWithEmail, signOut, getCurrentUser, getSession } from './supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  signUp: (email: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  signUp: async (email: string) => {
    try {
      set({ isLoading: true });
      const { data, error } = await signUpWithEmail(email);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email: string) => {
    try {
      set({ isLoading: true });
      const { data, error } = await signInWithEmail(email);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await signOut();
      set({ user: null, session: null, isAuthenticated: false });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      
      // Get current session
      const { session } = await getSession();
      
      if (session) {
        set({ 
          session, 
          user: session.user, 
          isAuthenticated: true 
        });
      } else {
        set({ 
          session: null, 
          user: null, 
          isAuthenticated: false 
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      set({ 
        session: null, 
        user: null, 
        isAuthenticated: false 
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  setSession: (session: Session | null) => {
    set({ session, user: session?.user || null, isAuthenticated: !!session });
  },
}));

// Set up auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  const { setUser, setSession } = useAuthStore.getState();
  
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    setSession(session);
  } else if (event === 'SIGNED_OUT') {
    setSession(null);
  }
});
