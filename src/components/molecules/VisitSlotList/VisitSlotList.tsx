import React from 'react';
import type { VisitSlot, House } from '../../../shared/interfaces/types';

interface VisitSlotListProps {
  slots: VisitSlot[];
  houses: House[];
  onDelete?: (slotId: string) => void;
}

import { getHouseName, formatDateTime } from '../../../shared/helpers/visitSlotHelpers';

export const VisitSlotList: React.FC<VisitSlotListProps> = ({
  slots,
  houses,
  onDelete,
}) => {

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

  const isUpcoming = (startDateTime: string): boolean => {
    return new Date(startDateTime) > new Date();
  };

  if (slots.length === 0) {
    return (
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h3 className='text-xl font-semibold mb-4 text-gray-800'>
          Mis Horarios de Visita
        </h3>
        <p className='text-gray-500 text-center py-8'>
          No tienes horarios de visita disponibilizados.
        </p>
      </div>
    );
  }

  // Ordenar slots por fecha de inicio (más próximos primero)
  const sortedSlots = [...slots].sort((a, b) => 
    new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
  );

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-semibold mb-4 text-gray-800'>
        Mis Horarios de Visita ({slots.length})
      </h3>
      
      <div className='space-y-4'>
        {sortedSlots.map((slot) => (
          <div
            key={slot.id}
            className={`border rounded-lg p-4 ${
              isUpcoming(slot.startDateTime)
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className='flex justify-between items-start'>
              <div className='flex-1'>
                <h4 className='font-semibold text-gray-800 mb-2'>
                  {getHouseName(houses,slot.casaId)}
                </h4>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600'>
                  <div>
                    <span className='font-medium'>Inicio:</span>
                    <br />
                    {formatDateTime(slot.startDateTime)}
                  </div>
                  
                  <div>
                    <span className='font-medium'>Fin:</span>
                    <br />
                    {formatDateTime(slot.endDateTime)}
                  </div>
                  
                  <div>
                    <span className='font-medium'>Duración:</span>
                    <br />
                    {getDuration(slot.startDateTime, slot.endDateTime)}
                  </div>
                </div>
                
                <div className='mt-2'>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isUpcoming(slot.startDateTime)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isUpcoming(slot.startDateTime) ? 'Próximo' : 'Pasado'}
                  </span>
                </div>
              </div>
              
              {onDelete && isUpcoming(slot.startDateTime) && (
                <button
                  onClick={() => slot.id && onDelete(slot.id)}
                  className='ml-4 text-red-600 hover:text-red-800 focus:outline-none'
                  title='Eliminar horario'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
