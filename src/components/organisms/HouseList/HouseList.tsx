import React from 'react';
import type { House } from '../../../shared/interfaces/types.d.ts';

interface HouseListProps {
  houses: House[];
}

export const HouseList: React.FC<HouseListProps> = ({ houses }) => {
  if (houses.length === 0) {
    return <div className='text-gray-500 text-center py-8'>No hay casas publicadas.</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {houses.map((house) => {
        // Validación defensiva para mocks corruptos
        if (!house?.categoria || !house?.ubicacion?.ciudad || !house?.ubicacion?.departamento) {
          console.error('Casa con datos corruptos:', house);
          return (
            <div key={house?.id ?? Math.random()} className='bg-red-100 text-red-700 p-4 rounded'>
              Error: Datos de la casa incompletos.
            </div>
          );
        }
        return (
          <div
            key={house.id}
            className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col'
          >
            {house.imagenUrl ? (
              <img
                src={house.imagenUrl}
                alt={`Imagen de ${house.nombre}`}
                className='h-48 w-full object-cover'
                loading='lazy'
              />
            ) : (
              <div className='h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400'>
                Sin imagen
              </div>
            )}
            <div className='p-4 flex-1 flex flex-col'>
              <div className='flex items-center gap-2 mb-1'>
                <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded'>{house.categoria.nombre}</span>
                <span className='text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded'>{house.estado}</span>
              </div>
              <h2 className='font-bold text-lg mb-1 truncate' title={house.nombre}>{house.nombre}</h2>
              <div className='text-sm text-gray-600 mb-2 truncate'>{house.ubicacion.ciudad.nombre}, {house.ubicacion.departamento.nombre}</div>
              <div className='text-gray-900 font-semibold text-xl mb-2'>${house.precio.toLocaleString('es-CO')}</div>
              <div className='flex gap-4 text-sm text-gray-500 mb-2'>
                <span>🛏 {house.cuartos} </span>
                <span>🛁 {house.banos}</span>
              </div>
              <div className='text-xs text-gray-500 flex-1 line-clamp-2'>{house.descripcion}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
