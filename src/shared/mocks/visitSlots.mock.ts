import type { VisitSlot } from '../interfaces/types';

// Mock de horarios de visita para HU10
export const mockVisitSlots: VisitSlot[] = [
  {
    id: 'vs1',
    casaId: '1',
    vendedorId: 'vendedor1@email.com',
    startDateTime: '2025-08-01T10:00:00',
    endDateTime: '2025-08-01T11:00:00',
    agendados: 0,
  },
  {
    id: 'vs2',
    casaId: '1',
    vendedorId: 'vendedor1@email.com',
    startDateTime: '2025-08-02T12:00:00',
    endDateTime: '2025-08-02T13:00:00',
    agendados: 1,
  },
  {
    id: 'vs5',
    casaId: '1',
    vendedorId: 'vendedor1@email.com',
    startDateTime: '2025-08-03T10:00:00',
    endDateTime: '2025-08-03T11:00:00',
    agendados: 0,
  },
  {
    id: 'vs6',
    casaId: '1',
    vendedorId: 'vendedor1@email.com',
    startDateTime: '2025-08-01T12:00:00',
    endDateTime: '2025-08-01T13:00:00',
    agendados: 1,
  },
  {
    id: 'vs3',
    casaId: '2',
    vendedorId: 'vendedor2@email.com',
    startDateTime: '2025-08-02T14:00:00',
    endDateTime: '2025-08-02T15:00:00',
    agendados: 0,
  },
  {
    id: 'vs4',
    casaId: '2',
    vendedorId: 'vendedor2@email.com',
    startDateTime: '2025-08-03T16:00:00',
    endDateTime: '2025-08-03T17:00:00',
    agendados: 2,
  },
];

// Servicio mock para obtener horarios por casaId y rango de fechas
export function getMockVisitSlots({ casaId, start, end }: { casaId: string; start?: string; end?: string }) {
  return mockVisitSlots.filter(slot => {
    if (slot.casaId !== casaId) return false;
    if (start && new Date(slot.startDateTime) < new Date(start)) return false;
    if (end && new Date(slot.endDateTime) > new Date(end)) return false;
    return true;
  });
}
