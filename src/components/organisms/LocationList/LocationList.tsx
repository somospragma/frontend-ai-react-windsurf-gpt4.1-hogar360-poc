import React from 'react';
import { useLocations } from '../../../shared/hooks/useLocations';

export const LocationList: React.FC = () => {
  const {
    locations,
    total,
    totalPages,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    orderBy,
    setOrderBy,
    orderDir,
    setOrderDir,
  } = useLocations();

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-xl font-semibold mb-4'>Ubicaciones registradas</h2>
      <div className='flex flex-col md:flex-row md:items-end gap-4 mb-4'>
        <div className='flex-1'>
          <label htmlFor='search' className='block text-gray-700 text-sm mb-1'>Buscar ciudad o departamento</label>
          <input
            id='search'
            type='text'
            placeholder='Ej: Medellin, Antioquia...'
            className='w-full border rounded px-3 py-2'
            value={search}
            onChange={e => { setPage(1); setSearch(e.target.value); }}
            maxLength={50}
          />
        </div>
        <div>
          <label htmlFor='orderBy' className='block text-gray-700 text-sm mb-1'>Ordenar por</label>
          <select
            id='orderBy'
            className='border rounded px-2 py-1 mr-2'
            value={orderBy}
            onChange={e => { setOrderBy(e.target.value as 'ciudad' | 'departamento'); setPage(1); }}
          >
            <option value='ciudad'>Ciudad</option>
            <option value='departamento'>Departamento</option>
          </select>
          <label htmlFor='orderDir' className='sr-only'>Dirección de orden</label>
          <select
            id='orderDir'
            className='border rounded px-2 py-1'
            value={orderDir}
            onChange={e => { setOrderDir(e.target.value as 'asc' | 'desc'); setPage(1); }}
          >
            <option value='asc'>Ascendente</option>
            <option value='desc'>Descendente</option>
          </select>
        </div>
        <div>
          <label className='block text-gray-700 text-sm mb-1'>Por página</label>
          <select
            className='border rounded px-2 py-1'
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          >
            {[5,10,20,50].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='mb-2 text-sm text-gray-600'>Mostrando {locations.length} de {total} ubicaciones</div>
      {locations.length === 0 ? (
        <div className='text-gray-500'>No hay ubicaciones registradas.</div>
      ) : (
        <>
          <ul className='divide-y divide-gray-200'>
            {locations.map(loc => (
              <li className='py-2' key={loc.id}>
                <span className='font-medium'>{loc.name}</span> — {loc.neighborhood}<br />
                <span className='text-gray-600'>{loc.ciudad.nombre}, {loc.departamento.nombre}</span><br />
                <span className='text-gray-500 text-sm'>{loc.descripcion}</span>
              </li>
            ))}
          </ul>
          <div className='flex items-center justify-between mt-4'>
            <button
              className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 mr-2 disabled:opacity-50'
              onClick={() => setPage(page-1)}
              disabled={page === 1}
              aria-label='Página anterior'
            >
              &lt; Anterior
            </button>
            <span className='text-sm'>Página {page} de {totalPages}</span>
            <button
              className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 ml-2 disabled:opacity-50'
              onClick={() => setPage(page+1)}
              disabled={page === totalPages || totalPages === 0}
              aria-label='Página siguiente'
            >
              Siguiente &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};
