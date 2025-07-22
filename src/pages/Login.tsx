import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/templates/AuthLayout';
import { AuthForm } from '../components/molecules/AuthForm';
import { useAuthStore } from '../shared/store/useAuth';

const LoginPage: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    const success = await login(data.email, data.password);
    setLoading(false);
    if (!success) {
      setError('Credenciales inválidas');
    } else {
      navigate('/');
    }
  };

  return (
    <AuthLayout>
      <h1 className='text-2xl font-bold mb-6 text-center'>Iniciar sesión</h1>
      <AuthForm onSubmit={handleLogin} error={error} loading={loading} />
      <div className='mt-6'>
        <div className='bg-gray-50 border border-gray-200 rounded p-4 text-sm shadow-sm max-w-xs sm:max-w-md mx-auto overflow-x-auto'>
          <div className='font-semibold mb-2 text-center text-gray-800'>Usuarios de prueba</div>
          <table className='w-full text-xs mb-2'>
            <thead>
              <tr className='text-left'>
                <th className='py-1 px-2'>Email</th>
                <th className='py-1 px-2'>Contraseña</th>
                <th className='py-1 px-2'>Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='py-1 px-2 font-mono cursor-pointer select-all'>admin@hogar360.com</td>
                <td className='py-1 px-2 font-mono cursor-pointer select-all'>admin123</td>
                <td className='py-1 px-2'>admin</td>
              </tr>
              <tr>
                <td className='py-1 px-2 font-mono cursor-pointer select-all'>comprador@hogar360.com</td>
                <td className='py-1 px-2 font-mono cursor-pointer select-all'>comprador123</td>
                <td className='py-1 px-2'>comprador</td>
              </tr>
              <tr>
                <td className='py-1 px-2 font-mono cursor-pointer select-all'>vendedor@hogar360.com</td>
                <td className='py-1 px-2 font-mono cursor-pointer select-all'>vendedor123</td>
                <td className='py-1 px-2'>vendedor</td>
              </tr>
            </tbody>
          </table>
          <div className='text-gray-500 text-xs text-center'>Haz click o selecciona para copiar fácilmente.</div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
