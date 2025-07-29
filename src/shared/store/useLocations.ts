import { create } from 'zustand';
import type { Location } from '../interfaces/types.d.ts';

interface LocationsState {
  locations: Location[];
  addLocation: (location: Omit<Location, 'id'>) => { ok: boolean; error?: string };
}

export const useLocationsStore = create<LocationsState>((set, get) => ({
  locations: [
    {
      id: '1',
      name: 'Casa Principal',
      neighborhood: 'El Poblado',
      descripcion: 'Ubicación principal en Medellín',
      departamento: { id: '1', nombre: 'Antioquia', descripcion: 'Departamento en el noroeste de Colombia.' },
      ciudad: { id: '1', nombre: 'Medellín', descripcion: 'Capital de Antioquia', idDepartamento: '1' },
    },
    {
      id: '2',
      name: 'Apartamento Centro',
      neighborhood: 'San Nicolás',
      descripcion: 'Apartamento céntrico en Cali',
      departamento: { id: '2', nombre: 'Valle del Cauca', descripcion: 'Departamento en el suroeste de Colombia.' },
      ciudad: { id: '2', nombre: 'Cali', descripcion: 'Capital del Valle del Cauca', idDepartamento: '2' },
    },
  ],
  addLocation: (location) => {
    const { locations } = get();
    // Validación simple: no permitir ubicaciones duplicadas por nombre y ciudad
    if (locations.some(l => l.name.toLowerCase() === location.name.toLowerCase() && l.ciudad.id === location.ciudad.id)) {
      return { ok: false, error: 'Ya existe una ubicación con ese nombre en la ciudad seleccionada.' };
    }
    const newLocation: Location = {
      ...location,
      id: (Math.random() + Date.now()).toString(36),
    };
    set({ locations: [...locations, newLocation] });
    return { ok: true };
  },
}));
