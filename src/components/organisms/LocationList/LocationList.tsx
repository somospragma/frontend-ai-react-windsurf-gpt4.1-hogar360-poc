import React from 'react';
import { useLocations } from '../../../shared/hooks/useLocations';

export const LocationList: React.FC = () => {
  const { locations } = useLocations();
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-xl font-semibold mb-4'>Ubicaciones registradas</h2>
      {locations.length === 0 ? (
        <div className='text-gray-500'>No hay ubicaciones registradas.</div>
      ) : (
        <ul className='divide-y divide-gray-200'>
          {locations.map(loc => (
            <li className='py-2' key={loc.id}>
              <span className='font-medium'>{loc.name}</span> — {loc.neighborhood}<br />
              <span className='text-gray-600'>{loc.ciudad.nombre}, {loc.departamento.nombre}</span><br />
              <span className='text-gray-500 text-sm'>{loc.descripcion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
