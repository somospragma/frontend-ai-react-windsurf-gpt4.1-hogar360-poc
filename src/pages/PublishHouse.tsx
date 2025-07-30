import React from 'react';
import { HouseForm } from '../components/organisms/HouseForm';
import { useAuthStore } from '../shared/store/useAuth';
import { Navigate } from 'react-router-dom';

const PublishHouse: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  if (!user || user.role !== 'vendedor') {
    return <Navigate to='/' replace />;
  }
  return (
    <div className='py-8'>
      <HouseForm />
    </div>
  );
};

export default PublishHouse;
