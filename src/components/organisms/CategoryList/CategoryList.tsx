import React from 'react';
import type { Category } from '../../../shared/interfaces/types.d.ts';

interface CategoryListProps {
  categories: Category[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  page,
  pageSize,
  total,
  onPageChange,
  filter,
  setFilter,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className='bg-white rounded shadow-md p-6 w-full'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2'>
        <h3 className='text-lg font-semibold'>Categorías existentes</h3>
        <input
          type='text'
          placeholder='Filtrar por nombre...'
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className='border px-2 py-1 rounded text-sm max-w-xs shadow-sm'
        />
      </div>
      <ul className='divide-y divide-gray-200'>
        {categories.length === 0 ? (
          <li className='text-gray-500 text-center py-6'>No hay categorías para mostrar.</li>
        ) : (
          categories.map(cat => (
            <li key={cat.id} className='px-2 py-3 flex flex-col'>
              <span className='font-medium'>{cat.nombre}</span>
              <span className='text-xs text-gray-600'>{cat.descripcion}</span>
            </li>
          ))
        )}
      </ul>
      {totalPages > 1 && (
        <div className='flex justify-center gap-2 mt-4'>
          <button
            className='px-3 py-1 rounded border disabled:opacity-50'
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className='px-3 py-1 rounded border disabled:opacity-50'
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
