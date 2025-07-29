import React from 'react';
import { useAuthStore } from '../../../shared/store/useAuth';
import userAvatar from '../../../assets/images/user-avatar.png';

import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className='w-full h-16 flex items-center justify-between px-6 bg-white shadow z-20'>
      <div className='flex items-center gap-2'>
        <span className='font-bold text-2xl text-blue-700 tracking-tight ml-2'>Hogar360</span>
      </div>
      <div className='flex items-center gap-4'>
        {user && (
          <>
            <span className='text-gray-700 text-base font-medium mr-2'>
              Hola, {user.name}
            </span>
            <img
              src={userAvatar}
              alt='Avatar usuario'
              className='h-9 w-9 rounded-full border-2 border-blue-200 bg-white object-cover shadow-sm'
              style={{ minWidth: 36 }}
            />
            <button
              className='px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition ml-2'
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
};
