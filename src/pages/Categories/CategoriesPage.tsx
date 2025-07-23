import React from 'react';
import { CategoryForm } from '../../components/organisms/CategoryForm';
import { useCategories } from '../../shared/hooks/useCategories';
import { ProtectedRoute } from '../../components/molecules/ProtectedRoute';
import { useAuthStore } from '../../shared/store/useAuth';

const CategoriesPage: React.FC = () => {
  const { categories } = useCategories();
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== 'admin') {
    return <div className='text-center text-red-600 mt-8'>Acceso restringido: solo administradores.</div>;
  }

  return (
    <ProtectedRoute>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <div className='bg-white rounded shadow-md p-8 w-full max-w-md'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Crear categoría de inmueble</h2>
          <CategoryForm />
        </div>
        <div className='w-full max-w-md mt-8'>
          <h3 className='text-lg font-semibold mb-2'>Categorías existentes</h3>
          <ul className='divide-y divide-gray-200 bg-white rounded shadow-sm'>
            {categories.map((cat) => (
              <li key={cat.id} className='px-4 py-2 flex flex-col'>
                <span className='font-medium'>{cat.nombre}</span>
                <span className='text-xs text-gray-600'>{cat.descripcion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CategoriesPage;
