import { create } from 'zustand';
import type { SellerUser } from '../interfaces/types';

export interface SellersState {
  sellers: SellerUser[];
  addSeller: (seller: Omit<SellerUser, 'id' | 'claveHash'> & { clave: string }) => Promise<{ ok: boolean; error?: string }>;
  existsEmail: (correo: string) => boolean;
  existsDocumento: (documento: string) => boolean;
}

import bcrypt from 'bcryptjs';

export const useSellersStore = create<SellersState>((set, get) => ({
  sellers: [],
  addSeller: async (data) => {
    // Validar unicidad
    if (get().existsEmail(data.correo)) {
      return { ok: false, error: 'El correo ya está registrado.' };
    }
    if (get().existsDocumento(data.documento)) {
      return { ok: false, error: 'El documento ya está registrado.' };
    }
    const hash = await bcrypt.hash(data.clave, 10);
    const nuevo: SellerUser = {
      id: crypto.randomUUID(),
      nombre: data.nombre,
      apellido: data.apellido,
      documento: data.documento,
      celular: data.celular,
      fechaNacimiento: data.fechaNacimiento,
      correo: data.correo,
      claveHash: hash,
    };
    set((state) => ({ sellers: [...state.sellers, nuevo] }));
    return { ok: true };
  },
  existsEmail: (correo) => get().sellers.some(s => s.correo === correo),
  existsDocumento: (documento) => get().sellers.some(s => s.documento === documento),
}));
