import React from 'react';
import { BasicLayout } from '../components/templates/BasicLayout';
import { LocationForm } from '../components/organisms/LocationForm';
import { LocationList } from '../components/organisms/LocationList';


import { useAuthStore } from '../shared/store/useAuth';

const Locations: React.FC = () => {
  const user = useAuthStore(state => state.user);
  return (
    <BasicLayout>
      <div className='container mx-auto py-8'>
        <h1 className='text-2xl font-bold mb-6'>Gestión de Ubicaciones</h1>
        <div className='flex flex-col md:flex-row gap-8'>
          {user?.role === 'admin' && (
            <div className='md:w-1/2'>
              <LocationForm />
            </div>
          )}
          <div className={user?.role === 'admin' ? 'md:w-1/2' : 'w-full'}>
            <LocationList />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default Locations;
