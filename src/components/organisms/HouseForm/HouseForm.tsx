import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useHousesStore } from '../../../shared/store/useHouses';
import { mockCategories } from '../../../shared/mocks/categories';
import { mockDepartamentos } from '../../../shared/mocks/departamentos';
import { mockCiudades } from '../../../shared/mocks/ciudades';
import { AutoCompleteSelector } from '../../atoms/AutoCompleteSelector';
import { AutoCompleteLocationSelector } from '../../atoms/AutoCompleteLocationSelector';
import type { Location } from '../../../shared/interfaces/types.d.ts';

// Esquema de validación Zod para alta de casa
const schema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres').max(60, 'Máximo 60 caracteres'),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres').max(500, 'Máximo 500 caracteres'),
  categoria: z.object({
    id: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
  }),
  cuartos: z.number().int().min(1, 'Al menos 1 cuarto').max(20, 'Máximo 20 cuartos'),
  banos: z.number().int().min(1, 'Al menos 1 baño').max(20, 'Máximo 20 baños'),
  precio: z.number().min(0, 'Precio requerido'),
  ubicacion: z.object({
    id: z.string(),
    name: z.string(),
    neighborhood: z.string(),
    descripcion: z.string(),
    departamento: z.object({
      id: z.string(),
      nombre: z.string(),
      descripcion: z.string(),
    }),
    ciudad: z.object({
      id: z.string(),
      nombre: z.string(),
      descripcion: z.string(),
      idDepartamento: z.string(),
    }),
  }),
  fechaPublicacion: z.string().min(10, 'Fecha requerida'),
  imagenUrl: z.string().url('Debe ser una URL válida').optional(),
});

type FormData = z.infer<typeof schema>;

import { useAuthStore } from '../../../shared/store/useAuth';

export const HouseForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const addHouse = useHousesStore((s) => s.addHouse);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      cuartos: 1,
      banos: 1,
      precio: 0,
    },
  });

  // Estado controlado para autocompletables
  const [categoria, setCategoria] = useState<typeof mockCategories[0] | null>(null);
  const [categoriaInput, setCategoriaInput] = useState('');
  // Importar el tipo Location de forma explícita
  // import type { Location } from '../../../shared/interfaces/types.d.ts';
  const [ubicacion, setUbicacion] = useState<Location | null>(null);
  const [ubicacionInput, setUbicacionInput] = useState<string>('');

  const user = useAuthStore((s) => s.user);

  const onSubmit = (data: FormData) => {
    setError(null);
    setSuccess(null);
    // NOTA: vendedorId debe venir del usuario autenticado
    const res = addHouse({ ...data, vendedorId: user?.email ?? 'mock-vendedor@email.com' });
    if (res.ok) {
      setSuccess('Casa publicada correctamente.');
      reset();
      setCategoria(null);
      setCategoriaInput('');
      setUbicacion(null);
      setUbicacionInput('');
      onSuccess?.();
    } else {
      setError(res.error || 'Error inesperado');
    }
    setTimeout(() => setSuccess(null), 2500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-lg shadow p-6 max-w-2xl mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Publicar nueva casa</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label htmlFor='nombre' className='block text-sm font-medium mb-1'>Nombre</label>
          <input id='nombre' type='text' {...register('nombre')} className='w-full border rounded px-3 py-2' maxLength={60} />
          {errors.nombre && <p className='text-red-600 text-xs'>{errors.nombre.message}</p>}
        </div>
        <div>
          <label htmlFor='categoria' className='block text-sm font-medium mb-1'>Categoría</label>
          <AutoCompleteSelector
            id='categoria'
            options={mockCategories}
            getOptionLabel={(cat) => cat.nombre}
            onSelect={(cat) => {
              setCategoria(cat);
              setValue('categoria', cat);
            }}
            value={categoriaInput}
            onInput={setCategoriaInput}
            selectedOption={categoria}
            placeholder='Selecciona una categoría'
          />
          {errors.categoria?.nombre && <p className='text-red-600 text-xs'>{errors.categoria.nombre.message}</p>}
        </div>
        <div>
          <label htmlFor='cuartos' className='block text-sm font-medium mb-1'>Cuartos</label>
          <input id='cuartos' type='number' {...register('cuartos', { valueAsNumber: true })} className='w-full border rounded px-3 py-2' min={1} max={20} />
          {errors.cuartos && <p className='text-red-600 text-xs'>{errors.cuartos.message}</p>}
        </div>
        <div>
          <label htmlFor='banos' className='block text-sm font-medium mb-1'>Baños</label>
          <input id='banos' type='number' {...register('banos', { valueAsNumber: true })} className='w-full border rounded px-3 py-2' min={1} max={20} />
          {errors.banos && <p className='text-red-600 text-xs'>{errors.banos.message}</p>}
        </div>
        <div>
          <label htmlFor='precio' className='block text-sm font-medium mb-1'>Precio</label>
          <input id='precio' type='number' {...register('precio', { valueAsNumber: true })} className='w-full border rounded px-3 py-2' min={0} />
          {errors.precio && <p className='text-red-600 text-xs'>{errors.precio.message}</p>}
        </div>
        <div className='md:col-span-2'>
          <label htmlFor='descripcion' className='block text-sm font-medium mb-1'>Descripción</label>
          <textarea id='descripcion' {...register('descripcion')} className='w-full border rounded px-3 py-2' rows={3} maxLength={500} />
          {errors.descripcion && <p className='text-red-600 text-xs'>{errors.descripcion.message}</p>}
        </div>
        <div className='md:col-span-2'>
          <label htmlFor='ubicacion' className='block text-sm font-medium mb-1'>Ubicación</label>
          <AutoCompleteLocationSelector
            id='ubicacion'
            departamentos={mockDepartamentos}
            ciudades={mockCiudades}
            onSelect={(loc) => {
              setUbicacion(loc);
              setValue('ubicacion', loc);
            }}
            selectedOption={ubicacion}
            inputValue={ubicacionInput}
            onInputChange={setUbicacionInput}
            placeholder='Busca ciudad o barrio'
          />
          {errors.ubicacion?.name && <p className='text-red-600 text-xs'>{errors.ubicacion.name.message}</p>}
        </div>
        <div>
          <label htmlFor='fechaPublicacion' className='block text-sm font-medium mb-1'>Fecha de publicación</label>
          <input id='fechaPublicacion' type='date' {...register('fechaPublicacion')} className='w-full border rounded px-3 py-2' />
          {errors.fechaPublicacion && <p className='text-red-600 text-xs'>{errors.fechaPublicacion.message}</p>}
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-2'>
        <button type='submit' disabled={isSubmitting} className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition disabled:opacity-60'>
          {isSubmitting ? 'Publicando...' : 'Publicar casa'}
        </button>
        {success && <div className='text-green-700 text-sm'>{success}</div>}
        {error && <div className='text-red-700 text-sm'>{error}</div>}
      </div>
    </form>
  );
}
