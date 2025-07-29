import { create } from 'zustand';

import { mockUsers } from '../mocks/users';
import type { MockUser } from '../mocks/users';
import { useSellersStore } from './useSellers';
import bcrypt from 'bcryptjs';

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
    // 1. Buscar en usuarios mock
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('hogar360_token', 'mock-token');
      localStorage.setItem('hogar360_user', JSON.stringify(user));
      set({ isAuthenticated: true, user });
      return true;
    }
    // 2. Buscar en vendedores creados
    const sellersStore = useSellersStore.getState();
    const vendedor = sellersStore.sellers.find((s) => s.correo === email);
    if (vendedor && await bcrypt.compare(password, vendedor.claveHash)) {
      // Adaptar a formato de usuario autenticado
      const vendedorAuth = {
        ...vendedor,
        email: vendedor.correo,
        role: ((): 'vendedor' => 'vendedor')(),
        nombre: vendedor.nombre,
        apellido: vendedor.apellido,
        // MockUser compatibility
        password: '',
        name: vendedor.nombre,
      };
      localStorage.setItem('hogar360_token', 'mock-token');
      localStorage.setItem('hogar360_user', JSON.stringify(vendedorAuth));
      set({ isAuthenticated: true, user: vendedorAuth });
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
