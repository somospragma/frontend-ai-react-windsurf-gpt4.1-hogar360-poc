import React from 'react';
import { CategoryForm } from '../../components/organisms/CategoryForm';
import { CategoryList } from '../../components/organisms/CategoryList';
import { useCategories } from '../../shared/hooks/useCategories';
import { ProtectedRoute } from '../../components/molecules/ProtectedRoute';
import { useAuthStore } from '../../shared/store/useAuth';

const CategoriesPage: React.FC = () => {
  const {
    categories,
    total,
    page,
    pageSize,
    setPage,
    filter,
    setFilter,
  } = useCategories();
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div className='text-center text-red-600 mt-8'>Acceso restringido: solo usuarios autenticados.</div>;
  }

  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2'>
        <div className='w-full max-w-5xl flex flex-col sm:flex-row gap-8'>
          {user.role === 'admin' && (
            <div className='flex-1 bg-white rounded shadow-md p-6 mb-8 sm:mb-0'>
              <h2 className='text-2xl font-bold mb-4'>Crear categoría de inmueble</h2>
              <CategoryForm />
            </div>
          )}
          <div className='flex-1'>
            <CategoryList
              categories={categories}
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CategoriesPage;
