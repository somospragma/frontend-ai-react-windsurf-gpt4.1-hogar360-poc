import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocations } from '../../../shared/hooks/useLocations';

import { mockDepartamentos } from '../../../shared/mocks/departamentos';
import { mockCiudades } from '../../../shared/mocks/ciudades';

const schema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(50, 'Máximo 50 caracteres'),
  neighborhood: z.string().min(1, 'El barrio es obligatorio').max(50, 'Máximo 50 caracteres'),
  descripcion: z.string().min(1, 'La descripción es obligatoria').max(120, 'Máximo 120 caracteres'),
  departamento: z.string().min(1, 'El departamento es obligatorio'),
  ciudad: z.string().min(1, 'La ciudad es obligatoria'),
});

type FormValues = z.infer<typeof schema>;

export const LocationForm: React.FC = () => {
  const { addLocation } = useLocations();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Filtrar ciudades según departamento seleccionado
  const selectedDepartamentoId = watch('departamento') || departamentoId;
  const ciudadesFiltradas = mockCiudades.filter(c => c.idDepartamento === selectedDepartamentoId);

  const onSubmit = (data: FormValues) => {
    setError('');
    setSuccess('');
    const departamento = mockDepartamentos.find(dep => dep.id === data.departamento);
    const ciudad = mockCiudades.find(c => c.id === data.ciudad);
    if (!departamento || !ciudad) {
      setError('Debe seleccionar un departamento y ciudad válidos.');
      return;
    }
    const result = addLocation({
      name: data.name,
      neighborhood: data.neighborhood,
      descripcion: data.descripcion,
      departamento,
      ciudad,
    });
    if (result.ok) {
      setSuccess('Ubicación creada exitosamente.');
      // Limpiar todos los campos
      reset({ name: '', neighborhood: '', descripcion: '', departamento: '', ciudad: '' });
      setDepartamentoId('');
      setTimeout(() => setSuccess(''), 2500);
    } else {
      setError(result.error || 'Error al crear ubicación.');
    }
  };

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-xl font-semibold mb-4'>Crear nueva ubicación</h2>
      <form onSubmit={handleSubmit(onSubmit)} onChange={() => { if (success) setSuccess(''); }}>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-1' htmlFor='name'>Nombre</label>
          <input id='name' type='text' maxLength={50} className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`} {...register('name')} />
          {errors.name && <span className='text-red-500 text-xs'>{errors.name.message}</span>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-1' htmlFor='neighborhood'>Barrio</label>
          <input id='neighborhood' type='text' maxLength={50} className={`w-full border rounded px-3 py-2 ${errors.neighborhood ? 'border-red-500' : ''}`} {...register('neighborhood')} />
          {errors.neighborhood && <span className='text-red-500 text-xs'>{errors.neighborhood.message}</span>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-1' htmlFor='departamento'>Departamento</label>
          <select
            id='departamento'
            className={`w-full border rounded px-3 py-2 ${errors.departamento ? 'border-red-500' : ''}`}
            {...register('departamento')}
            onChange={e => {
              setDepartamentoId(e.target.value);
              // Limpiar ciudad si cambia departamento
              reset({ ...watch(), departamento: e.target.value, ciudad: '' });
            }}
            value={selectedDepartamentoId}
          >
            <option value=''>Seleccione un departamento</option>
            {mockDepartamentos.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.nombre}</option>
            ))}
          </select>
          {errors.departamento && <span className='text-red-500 text-xs'>{errors.departamento.message}</span>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-1' htmlFor='ciudad'>Ciudad</label>
          <select
            id='ciudad'
            className={`w-full border rounded px-3 py-2 ${errors.ciudad ? 'border-red-500' : ''}`}
            {...register('ciudad')}
            disabled={!selectedDepartamentoId}
          >
            <option value=''>Seleccione una ciudad</option>
            {ciudadesFiltradas.map(ciudad => (
              <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
            ))}
          </select>
          {errors.ciudad && <span className='text-red-500 text-xs'>{errors.ciudad.message}</span>}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-1' htmlFor='descripcion'>Descripción</label>
          <textarea id='descripcion' maxLength={120} className={`w-full border rounded px-3 py-2 ${errors.descripcion ? 'border-red-500' : ''}`} {...register('descripcion')} />
          {errors.descripcion && <span className='text-red-500 text-xs'>{errors.descripcion.message}</span>}
        </div>
        {error && <div className='text-red-600 mb-2'>{error}</div>}
        {success && <div className='text-green-600 mb-2'>{success}</div>}
        <button type='submit' className='bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800' disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Crear ubicación'}
        </button>
      </form>
    </div>
  );
};
