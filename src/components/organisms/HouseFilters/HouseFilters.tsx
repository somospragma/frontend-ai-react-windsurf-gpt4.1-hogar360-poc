import React from 'react';
import type { Category, Ciudad, Departamento } from '../../../shared/interfaces/types.d.ts';

export interface HouseFiltersProps {
  categorias: Category[];
  departamentos: Departamento[];
  ciudades: Ciudad[];
  filters: {
    categoriaId?: string;
    departamentoId?: string;
    ciudadId?: string;
    cuartos?: number;
    banos?: number;
    precioMin?: number;
    precioMax?: number;
    orderBy?: 'precio' | 'cuartos' | 'banos' | 'ubicacion' | 'categoria';
    orderDir?: 'asc' | 'desc';
  };
  onChange: (filters: HouseFiltersProps['filters']) => void;
}

export const HouseFilters: React.FC<HouseFiltersProps> = ({ categorias, departamentos, ciudades, filters, onChange }) => {
  return (
    <form className='flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow mb-6'>
      <div>
        <label htmlFor='filtro-categoria' className='block text-xs font-semibold mb-1'>Categoría</label>
        <select
          id='filtro-categoria'
          className='input'
          value={filters.categoriaId ?? ''}
          onChange={e => onChange({ ...filters, categoriaId: e.target.value })}
        >
          <option value=''>Todas</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='filtro-departamento' className='block text-xs font-semibold mb-1'>Departamento</label>
        <select
          id='filtro-departamento'
          className='input'
          value={filters.departamentoId ?? ''}
          onChange={e => onChange({ ...filters, departamentoId: e.target.value, ciudadId: '' })}
        >
          <option value=''>Todos</option>
          {departamentos.map(dep => (
            <option key={dep.id} value={dep.id}>{dep.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='filtro-ciudad' className='block text-xs font-semibold mb-1'>Ciudad</label>
        <select
          id='filtro-ciudad'
          className='input'
          value={filters.ciudadId ?? ''}
          onChange={e => onChange({ ...filters, ciudadId: e.target.value })}
        >
          <option value=''>Todas</option>
          {(filters.departamentoId
            ? ciudades.filter(c => c.idDepartamento === filters.departamentoId)
            : ciudades
          ).map(ciudad => (
            <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='filtro-cuartos' className='block text-xs font-semibold mb-1'>Cuartos</label>
        <input
          id='filtro-cuartos'
          type='number'
          min={1}
          className='input w-20'
          value={filters.cuartos ?? ''}
          onChange={e => onChange({ ...filters, cuartos: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>
      <div>
        <label htmlFor='filtro-banos' className='block text-xs font-semibold mb-1'>Baños</label>
        <input
          id='filtro-banos'
          type='number'
          min={1}
          className='input w-20'
          value={filters.banos ?? ''}
          onChange={e => onChange({ ...filters, banos: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>
      <div>
        <label htmlFor='filtro-precio-min' className='block text-xs font-semibold mb-1'>Precio mínimo</label>
        <input
          id='filtro-precio-min'
          type='number'
          min={0}
          className='input w-28'
          value={filters.precioMin ?? ''}
          onChange={e => onChange({ ...filters, precioMin: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>
      <div>
        <label htmlFor='filtro-precio-max' className='block text-xs font-semibold mb-1'>Precio máximo</label>
        <input
          id='filtro-precio-max'
          type='number'
          min={0}
          className='input w-28'
          value={filters.precioMax ?? ''}
          onChange={e => onChange({ ...filters, precioMax: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>
      <div>
        <label htmlFor='filtro-ordenar-por' className='block text-xs font-semibold mb-1'>Ordenar por</label>
        <select
          id='filtro-ordenar-por'
          className='input'
          value={filters.orderBy ?? ''}
          onChange={e => onChange({ ...filters, orderBy: e.target.value as 'precio' | 'cuartos' | 'banos' | 'ubicacion' | 'categoria' | undefined })}
        >
          <option value=''>Por defecto</option>
          <option value='precio'>Precio</option>
          <option value='cuartos'>Cuartos</option>
          <option value='banos'>Baños</option>
          <option value='ubicacion'>Ubicación</option>
          <option value='categoria'>Categoría</option>
        </select>
      </div>
      <div>
        <label htmlFor='filtro-direccion' className='block text-xs font-semibold mb-1'>Dirección</label>
        <select
          id='filtro-direccion'
          className='input'
          value={filters.orderDir ?? 'asc'}
          onChange={e => onChange({ ...filters, orderDir: e.target.value as 'asc' | 'desc' })}
        >
          <option value='asc'>Ascendente</option>
          <option value='desc'>Descendente</option>
        </select>
      </div>
    </form>
  );
};
