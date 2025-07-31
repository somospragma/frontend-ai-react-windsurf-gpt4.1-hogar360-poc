import React, { useState, useEffect } from 'react';
import type { VisitSlot, House } from '../../../shared/interfaces/types';
import { VisitSlotForm } from '../../molecules/VisitSlotForm';
import { VisitSlotList } from '../../molecules/VisitSlotList';

interface VisitSlotManagerProps {
  vendedorId: string;
  vendedorHouses: House[];
}

export const VisitSlotManager: React.FC<VisitSlotManagerProps> = ({
  vendedorId,
  vendedorHouses,
}) => {
  const [visitSlots, setVisitSlots] = useState<VisitSlot[]>([]);

  // Cargar slots existentes del localStorage al montar el componente
  useEffect(() => {
    const savedSlots = localStorage.getItem('visitSlots');
    if (savedSlots) {
      try {
        const allSlots: VisitSlot[] = JSON.parse(savedSlots);
        // Filtrar solo los slots del vendedor actual
        const vendedorSlots = allSlots.filter(slot => slot.vendedorId === vendedorId);
        setVisitSlots(vendedorSlots);
      } catch (error) {
        console.error('Error loading visit slots from localStorage:', error);
      }
    }
  }, [vendedorId]);

  // Guardar slots en localStorage cuando cambien
  const saveToLocalStorage = (slots: VisitSlot[]) => {
    try {
      // Obtener todos los slots existentes
      const savedSlots = localStorage.getItem('visitSlots');
      let allSlots: VisitSlot[] = [];
      
      if (savedSlots) {
        allSlots = JSON.parse(savedSlots);
      }
      
      // Remover slots del vendedor actual y agregar los nuevos
      const otherVendedorSlots = allSlots.filter(slot => slot.vendedorId !== vendedorId);
      const updatedSlots = [...otherVendedorSlots, ...slots];
      
      localStorage.setItem('visitSlots', JSON.stringify(updatedSlots));
    } catch (error) {
      console.error('Error saving visit slots to localStorage:', error);
    }
  };

  const handleAddSlot = (newSlot: Omit<VisitSlot, 'id'>) => {
    const slotWithId: VisitSlot = {
      ...newSlot,
      id: `slot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    
    const updatedSlots = [...visitSlots, slotWithId];
    setVisitSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
  };

  const handleDeleteSlot = (slotId: string) => {
    const updatedSlots = visitSlots.filter(slot => slot.id !== slotId);
    setVisitSlots(updatedSlots);
    saveToLocalStorage(updatedSlots);
  };

  // Filtrar solo las casas del vendedor actual
  const vendedorOwnHouses = vendedorHouses.filter(house => house.vendedorId === vendedorId);

  if (vendedorOwnHouses.length === 0) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>
            Gestión de Horarios de Visita
          </h2>
          <p className='text-yellow-700'>
            No tienes casas publicadas. Debes publicar al menos una casa para poder disponibilizar horarios de visita.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-8'>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-2'>
          Gestión de Horarios de Visita
        </h2>
        <p className='text-gray-600'>
          Disponibiliza horarios para que los compradores puedan agendar visitas a tus propiedades
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Formulario para agregar nuevos horarios */}
        <div>
          <VisitSlotForm
            vendedorId={vendedorId}
            vendedorHouses={vendedorOwnHouses}
            existingSlots={visitSlots}
            onSubmit={handleAddSlot}
          />
        </div>

        {/* Lista de horarios existentes */}
        <div>
          <VisitSlotList
            slots={visitSlots}
            houses={vendedorHouses}
            onDelete={handleDeleteSlot}
          />
        </div>
      </div>

      {/* Información adicional */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <h4 className='font-semibold text-blue-800 mb-2'>Información importante:</h4>
        <ul className='text-blue-700 text-sm space-y-1'>
          <li>• Solo puedes registrar horarios para tus propias casas</li>
          <li>• Los horarios deben estar dentro de las próximas 3 semanas</li>
          <li>• No puedes crear horarios que se solapen entre sí</li>
          <li>• Los compradores podrán ver y agendar estos horarios disponibles</li>
        </ul>
      </div>
    </div>
  );
};
