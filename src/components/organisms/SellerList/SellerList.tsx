import React from 'react';
import { useSellersStore } from '../../../shared/store/useSellers';

export const SellerList: React.FC = () => {
  const sellers = useSellersStore((s) => s.sellers);

  const handleLogin = () => {
    alert('Para loguearte como este vendedor, usa el correo registrado y la clave que asignaste al crearlo en el formulario de login.');
  };

  if (sellers.length === 0) {
    return <div className='text-gray-500 mt-6'>No hay vendedores registrados aún.</div>;
  }

  return (
    <div className='mt-8'>
      <h3 className='text-lg font-semibold mb-2'>Vendedores registrados recientemente</h3>
      <div className='overflow-x-auto'>
        <table className='min-w-full border text-sm'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-3 py-2 border'>Nombre</th>
              <th className='px-3 py-2 border'>Apellido</th>
              <th className='px-3 py-2 border'>Documento</th>
              <th className='px-3 py-2 border'>Correo</th>
              <th className='px-3 py-2 border'>Celular</th>
              <th className='px-3 py-2 border'>Fecha Nac.</th>
              <th className='px-3 py-2 border'>Acción</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((s) => (
              <tr key={s.id} className='even:bg-gray-50'>
                <td className='px-3 py-2 border'>{s.nombre}</td>
                <td className='px-3 py-2 border'>{s.apellido}</td>
                <td className='px-3 py-2 border'>{s.documento}</td>
                <td className='px-3 py-2 border'>{s.correo}</td>
                <td className='px-3 py-2 border'>{s.celular}</td>
                <td className='px-3 py-2 border'>{s.fechaNacimiento}</td>
                <td className='px-3 py-2 border'>
                  <button
                    className='px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs'
                    onClick={handleLogin}
                  >
                    Instrucción para login
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='text-xs text-gray-500 mt-2'>Para loguearte como vendedor, ve al formulario de login y usa el correo y clave asignados.</div>
    </div>
  );
};
