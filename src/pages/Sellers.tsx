import React from 'react';
import { BasicLayout } from '../components/templates/BasicLayout';
import { SellerUserForm } from '../components/organisms/SellerUserForm';
import { SellerList } from '../components/organisms/SellerList';
import { useAuthStore } from '../shared/store/useAuth';
import { Navigate } from 'react-router-dom';

const SellersPage: React.FC = () => {
  const user = useAuthStore(state => state.user);
  if (!user || user.role !== 'admin') {
    return <Navigate to='/' replace />;
  }
  return (
    <BasicLayout>
      <div className='container mx-auto py-8'>
        <h1 className='text-2xl font-bold mb-6'>Crear usuario vendedor</h1>
        <SellerUserForm />
        <SellerList />
      </div>
    </BasicLayout>
  );
};

export default SellersPage;
