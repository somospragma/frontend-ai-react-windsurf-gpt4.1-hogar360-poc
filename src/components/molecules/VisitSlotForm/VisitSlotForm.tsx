import React, { useState } from 'react';
import type { VisitSlot, House } from '../../../shared/interfaces/types';

interface VisitSlotFormProps {
  vendedorId: string;
  vendedorHouses: House[];
  existingSlots: VisitSlot[];
  onSubmit: (slot: Omit<VisitSlot, 'id'>) => void;
}

export const VisitSlotForm: React.FC<VisitSlotFormProps> = ({
  vendedorId,
  vendedorHouses,
  existingSlots,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    casaId: '',
    startDateTime: '',
    endDateTime: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const validateSlot = (data: typeof formData): string[] => {
    const validationErrors: string[] = [];
    
    if (!data.casaId) {
      validationErrors.push('Debe seleccionar una casa');
    }
    
    if (!data.startDateTime || !data.endDateTime) {
      validationErrors.push('Debe especificar fecha y hora de inicio y fin');
    }
    
    const startDate = new Date(data.startDateTime);
    const endDate = new Date(data.endDateTime);
    const now = new Date();
    const threeWeeksFromNow = new Date(now.getTime() + (21 * 24 * 60 * 60 * 1000));
    
    // Validar que la fecha de inicio sea mayor a la actual
    if (startDate <= now) {
      validationErrors.push('La fecha de inicio debe ser mayor a la fecha actual');
    }
    
    // Validar que esté dentro de las próximas 3 semanas
    if (startDate > threeWeeksFromNow) {
      validationErrors.push('Solo se pueden registrar horarios dentro de las próximas 3 semanas');
    }
    
    // Validar que la fecha de fin sea mayor a la de inicio
    if (endDate <= startDate) {
      validationErrors.push('La fecha de fin debe ser mayor a la fecha de inicio');
    }
    
    // Validar que no haya solapamiento con horarios existentes del mismo vendedor
    const hasOverlap = existingSlots.some(slot => {
      if (slot.vendedorId !== vendedorId) return false;
      
      const existingStart = new Date(slot.startDateTime);
      const existingEnd = new Date(slot.endDateTime);
      
      return (
        (startDate >= existingStart && startDate < existingEnd) ||
        (endDate > existingStart && endDate <= existingEnd) ||
        (startDate <= existingStart && endDate >= existingEnd)
      );
    });
    
    if (hasOverlap) {
      validationErrors.push('Ya tiene un horario registrado que se solapa con el horario seleccionado');
    }
    
    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateSlot(formData);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      onSubmit({
        vendedorId,
        casaId: formData.casaId,
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime,
      });
      
      // Reset form
      setFormData({
        casaId: '',
        startDateTime: '',
        endDateTime: '',
      });
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-semibold mb-4 text-gray-800'>
        Disponibilizar Horario de Visita
      </h3>
      
      {errors.length > 0 && (
        <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
          <ul className='list-disc list-inside'>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className='mb-4'>
        <label htmlFor='casaId' className='block text-sm font-medium text-gray-700 mb-2'>
          Seleccionar Casa
        </label>
        <select
          id='casaId'
          value={formData.casaId}
          onChange={(e) => handleInputChange('casaId', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        >
          <option value=''>-- Seleccione una casa --</option>
          {vendedorHouses.map(house => (
            <option key={house.id} value={house.id}>
              {house.nombre} - {house.ubicacion.ciudad.nombre}
            </option>
          ))}
        </select>
      </div>
      
      <div className='mb-4'>
        <label htmlFor='startDateTime' className='block text-sm font-medium text-gray-700 mb-2'>
          Fecha y Hora de Inicio
        </label>
        <input
          type='datetime-local'
          id='startDateTime'
          value={formData.startDateTime}
          onChange={(e) => handleInputChange('startDateTime', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
      </div>
      
      <div className='mb-6'>
        <label htmlFor='endDateTime' className='block text-sm font-medium text-gray-700 mb-2'>
          Fecha y Hora de Fin
        </label>
        <input
          type='datetime-local'
          id='endDateTime'
          value={formData.endDateTime}
          onChange={(e) => handleInputChange('endDateTime', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
        />
      </div>
      
      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200'
      >
        Disponibilizar Horario
      </button>
    </form>
  );
};
