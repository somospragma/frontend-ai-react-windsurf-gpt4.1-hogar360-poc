import { useLocationsStore } from '../store/useLocations';

import { useMemo, useState } from 'react';
import { removeDiacritics } from '../helpers/removeDiacritics';

export interface LocationQueryOptions {
  search?: string;
  orderBy?: 'ciudad' | 'departamento';
  orderDir?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export const useLocations = () => {
  const locations = useLocationsStore(s => s.locations);
  const addLocation = useLocationsStore(s => s.addLocation);

  // Estado para búsqueda, orden y paginación
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState<'ciudad' | 'departamento'>('ciudad');
  const [orderDir, setOrderDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filtrado y ordenamiento memoizados
  const filteredAndSorted = useMemo(() => {
    let filtered = locations;
    if (search.trim() !== '') {
      const searchNorm = removeDiacritics(search.trim().toLowerCase());
      filtered = locations.filter(loc => {
        const ciudadNorm = removeDiacritics(loc.ciudad.nombre.toLowerCase());
        const depNorm = removeDiacritics(loc.departamento.nombre.toLowerCase());
        return ciudadNorm.includes(searchNorm) || depNorm.includes(searchNorm);
      });
    }
    filtered = [...filtered].sort((a, b) => {
      let aValue = orderBy === 'ciudad' ? a.ciudad.nombre : a.departamento.nombre;
      let bValue = orderBy === 'ciudad' ? b.ciudad.nombre : b.departamento.nombre;
      aValue = removeDiacritics(aValue.toLowerCase());
      bValue = removeDiacritics(bValue.toLowerCase());
      if (aValue < bValue) return orderDir === 'asc' ? -1 : 1;
      if (aValue > bValue) return orderDir === 'asc' ? 1 : -1;
      return 0;
    });
    return filtered;
  }, [locations, search, orderBy, orderDir]);

  // Paginación
  const total = filteredAndSorted.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredAndSorted.slice(start, start + pageSize);
  }, [filteredAndSorted, page, pageSize]);

  // API para UI
  return {
    locations: paginated,
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
    addLocation,
  };
};
