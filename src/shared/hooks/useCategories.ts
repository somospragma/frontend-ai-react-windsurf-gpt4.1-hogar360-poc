import React, { useState } from 'react';
import { mockCategories, addCategory } from '../mocks/categories';
import type { Category } from '../mocks/categories';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Sincronizar con el mock global cada vez que se cree una categoría
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCategories([...mockCategories]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const filtered = categories.filter(cat =>
    cat.nombre.toLowerCase().includes(filter.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const createCategory = (nombre: string, descripcion: string) => {
    const result = addCategory(nombre, descripcion);
    if (result.success && result.category) {
      setSuccess('Categoría creada exitosamente');
      setError(null);
      setPage(1); // vuelve a la primera página para ver el nuevo registro
      // El listado se actualizará automáticamente por el useEffect
    } else {
      setError(result.error || 'Error desconocido');
      setSuccess(null);
    }
  };

  return {
    categories: paginated,
    total: filtered.length,
    page,
    pageSize,
    setPage,
    filter,
    setFilter,
    createCategory,
    error,
    success,
    setError,
    setSuccess,
  };
};
