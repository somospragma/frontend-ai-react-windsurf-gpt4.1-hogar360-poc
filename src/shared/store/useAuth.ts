import { create } from 'zustand';

import { mockUsers } from '../mocks/users';
import type { MockUser } from '../mocks/users';

interface AuthState {
  isAuthenticated: boolean;
  user: MockUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const getStoredUser = (): MockUser | null => {
  const userStr = localStorage.getItem('hogar360_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('hogar360_token'),
  user: getStoredUser(),
  login: async (email, password) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('hogar360_token', 'mock-token');
      localStorage.setItem('hogar360_user', JSON.stringify(user));
      set({ isAuthenticated: true, user });
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem('hogar360_token');
    localStorage.removeItem('hogar360_user');
    set({ isAuthenticated: false, user: null });
  },
}));
