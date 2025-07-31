import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../shared/store/useAuth';
import { useHousesStore } from '../shared/store/useHouses';
import { VisitSlotManager } from '../components/organisms/VisitSlotManager';

const VisitSlotsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const houses = useHousesStore(state => state.houses);

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (user?.role !== 'vendedor') {
    return (
      <div className='max-w-xl mx-auto mt-20 p-8 bg-red-50 border border-red-200 rounded-lg text-center'>
        <h2 className='text-2xl font-bold text-red-700 mb-4'>Acceso restringido</h2>
        <p className='text-red-600'>Esta sección solo está disponible para usuarios con rol vendedor.</p>
      </div>
    );
  }

  return (
    <VisitSlotManager vendedorId={user.email} vendedorHouses={houses.filter(h => h.vendedorId === user.email)} />
  );
};

export default VisitSlotsPage;
