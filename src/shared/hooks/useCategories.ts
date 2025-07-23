import { useState } from 'react';
import { mockCategories, addCategory } from '../mocks/categories';
import type { Category } from '../mocks/categories';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createCategory = (nombre: string, descripcion: string) => {
    const result = addCategory(nombre, descripcion);
    if (result.success && result.category) {
      setCategories([...categories, result.category]);
      setSuccess('Categoría creada exitosamente');
      setError(null);
    } else {
      setError(result.error || 'Error desconocido');
      setSuccess(null);
    }
  };

  return {
    categories,
    createCategory,
    error,
    success,
    setError,
    setSuccess,
  };
};
