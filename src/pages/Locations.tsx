import React from 'react';
import { BasicLayout } from '../components/templates/BasicLayout';
import { LocationForm } from '../components/organisms/LocationForm';
import { LocationList } from '../components/organisms/LocationList';

import { ProtectedRoute } from '../components/molecules/ProtectedRoute';

const Locations: React.FC = () => {
  return (
    <ProtectedRoute role='admin'>
      <BasicLayout>
        <div className='container mx-auto py-8'>
          <h1 className='text-2xl font-bold mb-6'>Gestión de Ubicaciones</h1>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='md:w-1/2'>
              <LocationForm />
            </div>
            <div className='md:w-1/2'>
              <LocationList />
            </div>
          </div>
        </div>
      </BasicLayout>
    </ProtectedRoute>
  );
};

export default Locations;
