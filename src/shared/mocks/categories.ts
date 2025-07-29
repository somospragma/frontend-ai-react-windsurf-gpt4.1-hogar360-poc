import type { Category } from '../interfaces/types.d.ts';

const _mockCategories: Category[] = [
  { id: '1', nombre: 'Apartamento', descripcion: 'Viviendas en edificios.' },
  { id: '2', nombre: 'Casa', descripcion: 'Viviendas independientes.' },
];

export const mockCategories = _mockCategories;

export function addCategory(nombre: string, descripcion: string): Category {
  if (mockCategories.some(cat => cat.nombre.toLowerCase() === nombre.trim().toLowerCase())) {
    throw new Error('El nombre de la categoría ya existe.');
  }
  const newId = (mockCategories.length + 1).toString();
  const newCategory: Category = { id: newId, nombre: nombre.trim(), descripcion: descripcion.trim() };
  mockCategories.push(newCategory);
  return newCategory;
}
;
