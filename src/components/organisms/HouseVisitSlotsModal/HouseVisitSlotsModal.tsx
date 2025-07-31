import React, { useState, useMemo, useEffect } from 'react';
import type { House, VisitSlot } from '../../../shared/interfaces/types';
import { getMockVisitSlots } from '../../../shared/mocks/visitSlots.mock';

interface HouseVisitSlotsModalProps {
  house: House;
  onClose: () => void;
}

export const HouseVisitSlotsModal: React.FC<HouseVisitSlotsModalProps> = ({ house, onClose }) => {
  // Filtros locales para HU10
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

  // Estado para paginación
  const [page, setPage] = useState<number>(1);
  const pageSize = 3;

  // Solo horarios de esta casa, futuros, con menos de 2 agendados, y que no sean pasados con 2 agendados
  const filteredSlots = useMemo(() => {
    // 1. Obtener horarios de localStorage
    let realSlots: VisitSlot[] = [];
    try {
      const ls = localStorage.getItem('visitSlots');
      if (ls) {
        realSlots = JSON.parse(ls);
      }
    } catch (error) {
      console.error('Error parsing visitSlots from localStorage:', error);
      realSlots = [];
    }
    // 2. Obtener mocks
    const mockSlots = getMockVisitSlots({
      casaId: house.id,
      start: dateRange.start || undefined,
      end: dateRange.end || undefined,
    });
    // 3. Filtrar los reales por casaId y rango de fechas
    const realFiltered = realSlots.filter(slot => {
      if (slot.casaId !== house.id) return false;
      if (dateRange.start && new Date(slot.startDateTime) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(slot.endDateTime) > new Date(dateRange.end)) return false;
      return true;
    });
    // 4. Unir ambos arreglos, evitando duplicados por id
    const allSlots = [...mockSlots, ...realFiltered.filter(real => !mockSlots.some(mock => mock.id === real.id))];
    // 5. Filtrar solo slots futuros y con agendados < 2 (criterios HU10)
    const now = new Date();
    const disponibles = allSlots.filter(slot => {
      const start = new Date(slot.startDateTime);
      return start > now && (slot.agendados ?? 0) < 2;
    });
    // 6. Ordenar descendente por fecha/hora de inicio
    return disponibles.sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime());
  }, [house.id, dateRange]);

  useEffect(() => {
    // Bloquear scroll al abrir modal
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Resetear página al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [dateRange, house.id]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-800 text-xl font-bold focus:outline-none'
          aria-label='Cerrar'
        >
          ×
        </button>
        <h2 className='text-2xl font-bold mb-2 text-blue-800'>Horarios de visita disponibles</h2>
        <div className='mb-4 text-gray-700'>
          <span className='font-semibold'>{house.nombre}</span> - {house.ubicacion.ciudad.nombre}, {house.ubicacion.departamento.nombre}
        </div>
        {/* Filtros */}
        <div className='flex gap-4 mb-6'>
          <div>
            <label htmlFor='visit-slot-modal-desde' className='block text-xs font-semibold mb-1'>Desde</label>
            <input
              id='visit-slot-modal-desde'
              type='datetime-local'
              value={dateRange.start}
              onChange={e => setDateRange(r => ({ ...r, start: e.target.value }))}
              className='input'
            />
          </div>
          <div>
            <label htmlFor='visit-slot-modal-hasta' className='block text-xs font-semibold mb-1'>Hasta</label>
            <input
              id='visit-slot-modal-hasta'
              type='datetime-local'
              value={dateRange.end}
              onChange={e => setDateRange(r => ({ ...r, end: e.target.value }))}
              className='input'
            />
          </div>
        </div>
        {/* Lista de horarios y paginación */}
        {filteredSlots.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>No hay horarios disponibles para esta casa.</div>
        ) : (
          <div>
            {/* Funciones auxiliares locales para formato y duración */}
            {(() => {
              const formatDateTime = (dateTimeString: string): string => {
                const date = new Date(dateTimeString);
                return date.toLocaleString('es-CO', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
              };
              const getDuration = (startDateTime: string, endDateTime: string): string => {
                const start = new Date(startDateTime);
                const end = new Date(endDateTime);
                const durationMs = end.getTime() - start.getTime();
                const hours = Math.floor(durationMs / (1000 * 60 * 60));
                const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                if (hours > 0) {
                  return `${hours}h ${minutes}m`;
                }
                return `${minutes}m`;
              };
              const isUpcoming = (startDateTime: string): boolean => new Date(startDateTime) > new Date();
              return (
                <div className='space-y-4'>
                  {filteredSlots.slice((page - 1) * pageSize, page * pageSize).map(slot => (
                    <div
                      key={slot.id || slot.startDateTime}
                      className='border rounded-lg p-4 border-green-200 bg-green-50'
                    >
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <div className='grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600'>
                            <div>
                              <span className='font-medium'>Inicio:</span><br />
                              {formatDateTime(slot.startDateTime)}
                            </div>
                            <div>
                              <span className='font-medium'>Fin:</span><br />
                              {formatDateTime(slot.endDateTime)}
                            </div>
                            <div>
                              <span className='font-medium'>Duración:</span><br />
                              {getDuration(slot.startDateTime, slot.endDateTime)}
                            </div>
                          </div>
                          {isUpcoming(slot.startDateTime) && (
                            <div className='mt-2'>
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>Próximo</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Controles de paginación */}
            <div className='flex justify-center items-center gap-2 mt-6'>
              <button
                className='px-3 py-1 rounded border bg-gray-100 text-gray-700 disabled:opacity-50'
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >Anterior</button>
              <span className='text-sm'>Página {page} de {Math.max(1, Math.ceil(filteredSlots.length / pageSize))}</span>
              <button
                className='px-3 py-1 rounded border bg-gray-100 text-gray-700 disabled:opacity-50'
                onClick={() => setPage(p => Math.min(Math.ceil(filteredSlots.length / pageSize), p + 1))}
                disabled={page === Math.ceil(filteredSlots.length / pageSize) || filteredSlots.length === 0}
              >Siguiente</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
