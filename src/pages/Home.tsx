import React from 'react';
import { useAuthStore } from '../shared/store/useAuth';

const roleDescriptions: Record<string, string> = {
  admin: 'Tienes acceso total al sistema, incluyendo gestión de usuarios y propiedades.',
  comprador: 'Puedes buscar propiedades y contactar vendedores.',
  vendedor: 'Puedes publicar y administrar tus propiedades.',
  admin_propiedades: 'Gestionas el inventario de propiedades y su información.',
};

const HomePage: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold mb-2'>Bienvenido a Hogar360</h1>
      {user && (
        <div className='mb-4 text-center'>
          <div className='text-lg font-semibold'>Hola, {user.name}!</div>
          <div className='text-sm text-gray-600 mb-2'>Rol: <span className='font-mono'>{user.role}</span></div>
          <div className='bg-blue-50 border border-blue-200 rounded p-3 text-blue-800 mb-2'>
            {roleDescriptions[user.role] ?? 'Rol sin descripción.'}
          </div>
          {/* Ejemplo de lógica condicional según rol */}
          {user.role === 'admin' && (
            <div className='text-green-700 font-medium'>Panel de administración: aquí podrías gestionar usuarios, propiedades, reportes, etc.</div>
          )}
          {user.role === 'comprador' && (
            <div className='text-blue-700 font-medium'>Panel de comprador: aquí podrías ver tus búsquedas guardadas, mensajes, etc.</div>
          )}
          {user.role === 'vendedor' && (
            <div className='text-purple-700 font-medium'>Panel de vendedor: aquí podrías administrar tus publicaciones y ver estadísticas.</div>
          )}
          
        </div>
      )}
      <button
        className='mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default HomePage;
