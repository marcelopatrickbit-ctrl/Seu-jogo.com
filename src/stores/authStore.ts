/**
 * Zustand Store for Authentication State
 */

import { create } from 'zustand';
import { User, AuthCredentials, RegisterData } from '../types';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Firebase authentication
      console.log('Login:', credentials.email);
      // Placeholder: Mock successful login
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'User Name',
        isEmailVerified: true,
        createdAt: new Date(),
        isAdmin: false,
      };
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement Firebase registration with email verification
      console.log('Register:', data.email);
      set({ isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  setError: (error) => {
    set({ error });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  checkAuthStatus: async () => {
    // TODO: Check Firebase auth status on app launch
    set({ isLoading: false });
  },
}));