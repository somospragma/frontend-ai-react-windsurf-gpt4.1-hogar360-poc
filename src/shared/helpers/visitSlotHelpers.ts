import type { House } from '../interfaces/types';

export function getHouseName(houses: House[], casaId: string): string {
  const house = houses.find(h => h.id === casaId);
  return house ? `${house.nombre} - ${house.ubicacion.ciudad.nombre}` : 'Casa no encontrada';
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  return date.toLocaleString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
