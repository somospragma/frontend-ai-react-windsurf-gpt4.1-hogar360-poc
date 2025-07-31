// Mock para agendas de visitas (HU 11)
// Cada agenda: { horarioId: string, compradorEmail: string }

import type { VisitSlotAgenda } from '../interfaces/types.d';

const STORAGE_KEY = 'visitSlotAgendas';

export function getVisitSlotAgendas(): VisitSlotAgenda[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addVisitSlotAgenda(agenda: VisitSlotAgenda): boolean {
  const agendas = getVisitSlotAgendas();
  // Evitar duplicados
  if (agendas.some(a => a.horarioId === agenda.horarioId && a.compradorEmail === agenda.compradorEmail)) {
    return false;
  }
  agendas.push(agenda);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agendas));
  return true;
}

export function countAgendasForSlot(horarioId: string): number {
  return getVisitSlotAgendas().filter(a => a.horarioId === horarioId).length;
}

export function isUserAgended(horarioId: string, compradorEmail: string): boolean {
  return getVisitSlotAgendas().some(a => a.horarioId === horarioId && a.compradorEmail === compradorEmail);
}
