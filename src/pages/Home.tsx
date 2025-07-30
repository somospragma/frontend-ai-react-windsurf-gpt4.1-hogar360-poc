import React, { useState, useMemo } from 'react';

import { useHousesStore } from '../shared/store/useHouses';
import { HouseList } from '../components/organisms/HouseList';
import { HouseFilters } from '../components/organisms/HouseFilters';
import { Pagination } from '../components/organisms/Pagination';
import { mockCategories } from '../shared/mocks/categories';
import { mockDepartamentos } from '../shared/mocks/departamentos';
import { mockCiudades } from '../shared/mocks/ciudades';


const PAGE_SIZE = 6;

type HouseFiltersType = {
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

const HomePage: React.FC = () => {
  const houses = useHousesStore((state) => state.houses).filter(
    (c) => c.estado === 'PUBLICADA' && new Date(c.fechaPublicacion) <= new Date()
  );

  const [filters, setFilters] = useState<HouseFiltersType>({ orderDir: 'asc' });
  const [page, setPage] = useState(1);

  // Filtrado y ordenamiento
  const filteredHouses = useMemo(() => {
    let filtered = houses;
    if (filters.categoriaId) filtered = filtered.filter(h => h.categoria.id === filters.categoriaId);
    if (filters.departamentoId) filtered = filtered.filter(h => h.ubicacion.departamento.id === filters.departamentoId);
    if (filters.ciudadId) filtered = filtered.filter(h => h.ubicacion.ciudad.id === filters.ciudadId);
    if (filters.cuartos) filtered = filtered.filter(h => h.cuartos === filters.cuartos);
    if (filters.banos) filtered = filtered.filter(h => h.banos === filters.banos);
    if (filters.precioMin !== undefined) filtered = filtered.filter(h => h.precio >= filters.precioMin!);
    if (filters.precioMax !== undefined) filtered = filtered.filter(h => h.precio <= filters.precioMax!);
    // Orden
    if (filters.orderBy) {
      filtered = [...filtered].sort((a, b) => {
        let aVal: string | number = '', bVal: string | number = '';
        switch (filters.orderBy) {
          case 'precio':
            aVal = a.precio; bVal = b.precio; break;
          case 'cuartos':
            aVal = a.cuartos; bVal = b.cuartos; break;
          case 'banos':
            aVal = a.banos; bVal = b.banos; break;
          case 'ubicacion':
            aVal = a.ubicacion.ciudad.nombre + a.ubicacion.departamento.nombre;
            bVal = b.ubicacion.ciudad.nombre + b.ubicacion.departamento.nombre;
            break;
          case 'categoria':
            aVal = a.categoria.nombre; bVal = b.categoria.nombre; break;
          default:
            aVal = a.nombre; bVal = b.nombre;
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return filters.orderDir === 'desc' ? bVal - aVal : aVal - bVal;
        }
        if (aVal < bVal) return filters.orderDir === 'desc' ? 1 : -1;
        if (aVal > bVal) return filters.orderDir === 'desc' ? -1 : 1;
        return 0;
      });
    }
    return filtered;
  }, [houses, filters]);

  // Paginación
  const pagedHouses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredHouses.slice(start, start + PAGE_SIZE);
  }, [filteredHouses, page]);

  // Reset page al cambiar filtros
  React.useEffect(() => { setPage(1); }, [filters]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-gray-50'>
      <div className='w-full max-w-7xl px-2 mt-8'>
        <HouseFilters
          categorias={mockCategories}
          departamentos={mockDepartamentos}
          ciudades={mockCiudades}
          filters={filters}
          onChange={setFilters}
        />
        <HouseList houses={pagedHouses} />
        {filteredHouses.length > PAGE_SIZE && (
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={filteredHouses.length}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
