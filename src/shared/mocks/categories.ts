export interface Category {
  id: number;
  nombre: string;
  descripcion: string;
}

const _mockCategories: Category[] = [
  { id: 1, nombre: 'Apartamento', descripcion: 'Viviendas en edificios.' },
  { id: 2, nombre: 'Casa', descripcion: 'Viviendas unifamiliares.' },
];

export const mockCategories = _mockCategories;

export const addCategory = (nombre: string, descripcion: string): { success: boolean; error?: string; category?: Category } => {
  if (_mockCategories.some(cat => cat.nombre.toLowerCase() === nombre.trim().toLowerCase())) {
    return { success: false, error: 'El nombre de la categoría ya existe.' };
  }
  const newCategory: Category = {
    id: _mockCategories.length ? Math.max(..._mockCategories.map(c => c.id)) + 1 : 1,
    nombre: nombre.trim(),
    descripcion: descripcion.trim(),
  };
  _mockCategories.push(newCategory);
  return { success: true, category: newCategory };
};
