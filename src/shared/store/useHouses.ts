import { create } from 'zustand';
import type { House, HouseStatus } from '../interfaces/types';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { mockHouses } from '../mocks/houses';

// Importa imágenes para resolver URLs correctas en producción con Vite
import casa1 from '../../assets/images/casa1.png';
import casa2 from '../../assets/images/casa2.png';
import casa3 from '../../assets/images/casa3.png';

interface HousesState {
  houses: House[];
  addHouse: (house: Omit<House, 'id' | 'estado' | 'fechaPublicacion'> & { fechaPublicacion: string }) => { ok: boolean; error?: string };
  listHouses: () => House[];
  updateHouseState: (id: string, estado: HouseStatus) => void;
  getHouseById: (id: string) => House | undefined;
}

export const useHousesStore = create<HousesState>()(
  persist(
    (set, get) => ({
      // Inicializa con mocks visuales con imágenes reales
      houses: [...mockHouses],
      addHouse: (data) => {
        // Validaciones básicas (campos obligatorios, fecha, etc)
        const {
          nombre,
          descripcion,
          categoria,
          cuartos,
          banos,
          precio,
          ubicacion,
          fechaPublicacion,
          vendedorId,
        } = data;
        if (!nombre || !descripcion || !categoria || !cuartos || !banos || !precio || !ubicacion?.ciudad || !ubicacion?.departamento || !fechaPublicacion || !vendedorId) {
          return { ok: false, error: 'Todos los campos son obligatorios' };
        }
        // Validar fecha de publicación (no más de 1 mes en el futuro)
        const now = new Date();
        const fecha = new Date(fechaPublicacion);
        const diffMes = (fecha.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30);
        if (diffMes > 1) {
          return { ok: false, error: 'La fecha de publicación no puede exceder un mes desde hoy' };
        }
        // Asignar imagen mock aleatoria (usar imports para producción)
        const mockImages = [casa1, casa2, casa3];
        const imagenUrlAleatoria = mockImages[Math.floor(Math.random() * mockImages.length)];
        const newHouse: House = {
          id: uuidv4(),
          nombre,
          descripcion,
          categoria,
          cuartos,
          banos,
          precio,
          ubicacion,
          fechaPublicacion,
          estado: 'PUBLICADA',
          imagenUrl: imagenUrlAleatoria,
          vendedorId,
        };
        set((state) => ({ houses: [newHouse, ...state.houses] }));
        return { ok: true };
      },
      listHouses: () => {
        // Solo casas publicadas y fecha válida
        const now = new Date();
        return get().houses.filter(
          (c) => c.estado === 'PUBLICADA' && new Date(c.fechaPublicacion) <= now
        );
      },
      updateHouseState: (id, estado) => {
        set((state) => ({
          houses: state.houses.map((c) => (c.id === id ? { ...c, estado } : c)),
        }));
      },
      getHouseById: (id) => get().houses.find((c) => c.id === id),
    }),
    {
      name: 'hogar360_houses',
      version: 2,
      // Migra estados persistidos que contenían rutas /src/assets/... a URLs resueltas
      migrate: (persistedState: unknown, version: number) => {
        void version; // evitar lint: 'version' sin uso
        const state = persistedState as Partial<HousesState> | undefined;
        if (!state || !Array.isArray(state.houses)) return persistedState as HousesState;
        const mapSrcToImport = (url?: string): string | undefined => {
          if (!url) return url;
          if (url.includes('/src/assets/images/casa1.png')) return casa1;
          if (url.includes('/src/assets/images/casa2.png')) return casa2;
          if (url.includes('/src/assets/images/casa3.png')) return casa3;
          return url;
        };
        return {
          ...state,
          houses: state.houses.map((h: House) => ({
            ...h,
            imagenUrl: mapSrcToImport(h.imagenUrl),
          })),
        } as HousesState;
      },
    }
  )
);
