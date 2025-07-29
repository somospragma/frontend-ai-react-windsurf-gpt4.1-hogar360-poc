import React from 'react';
import { useAuthStore } from '../../../shared/store/useAuth';
import { Link, useLocation } from 'react-router-dom';

const menuByRole = {
  admin: [
    { label: 'Dashboard', to: '/' },
    { label: 'Categorías', to: '/categories' },
    { label: 'Ubicaciones', to: '/locations' },
    { label: 'Vendedores', to: '/sellers' },
    // Agrega más accesos según diseño/negocio
  ],
  comprador: [
    { label: 'Dashboard', to: '/' },
    { label: 'Ubicaciones', to: '/locations' },
    // ...otros accesos para comprador
  ],
  vendedor: [
    { label: 'Dashboard', to: '/' },
    { label: 'Ubicaciones', to: '/locations' },
    // ...otros accesos para vendedor
  ],
};

export const AsidePanel: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return (
      <aside className='flex flex-col w-56 min-h-full bg-red-50 border-r shadow-sm pt-6 px-2'>
        <div className='text-center text-red-500 font-bold'>No user in store</div>
      </aside>
    );
  }
  const menu = menuByRole[user.role] || [];

  // DEBUG: aside siempre visible para pruebas, luego volver a hidden sm:flex
  return (
    <aside className='flex flex-col w-56 min-h-full bg-white border-r shadow-sm pt-6 px-2'>
      <nav className='flex flex-col gap-2'>
        {menu.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${location.pathname === item.to ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            {/* Aquí podrías agregar iconos según Figma */}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
