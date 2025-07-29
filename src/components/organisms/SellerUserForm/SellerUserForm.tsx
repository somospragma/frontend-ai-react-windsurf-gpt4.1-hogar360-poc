import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSellersStore } from '../../../shared/store/useSellers';

const schema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(50, 'Máximo 50 caracteres'),
  apellido: z.string().min(2, 'Mínimo 2 caracteres').max(50, 'Máximo 50 caracteres'),
  documento: z.string()
    .min(5, 'Mínimo 5 dígitos')
    .max(20, 'Máximo 20 dígitos')
    .regex(/^\d+$/, 'Solo números'),
  celular: z.string()
    .min(7, 'Mínimo 7 dígitos')
    .max(13, 'Máximo 13 dígitos')
    .regex(/^\+?\d{7,13}$/, 'Formato: +573005698325 o 3005698325'),
  fechaNacimiento: z.string()
    .refine((date) => {
      if (!date) return false;
      const now = new Date();
      const birth = new Date(date);
      const age = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, {
      message: 'Debes ser mayor de edad',
    }),
  correo: z.string().email('Correo no válido'),
  clave: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export const SellerUserForm: React.FC = () => {
  const addSeller = useSellersStore((s) => s.addSeller);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setSuccess(null);
    const res = await addSeller(data);
    if (res.ok) {
      setSuccess('Usuario vendedor creado correctamente.');
      reset();
    } else {
      setError(res.error || 'Error inesperado');
    }
    setTimeout(() => setSuccess(null), 2500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white rounded-lg shadow p-6 max-w-xl mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Crear usuario vendedor</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label htmlFor='nombre' className='block text-sm font-medium mb-1'>Nombre</label>
          <input id='nombre' type='text' {...register('nombre')} className='w-full border rounded px-3 py-2' maxLength={50} />
          {errors.nombre && <p className='text-red-600 text-xs'>{errors.nombre.message}</p>}
        </div>
        <div>
          <label htmlFor='apellido' className='block text-sm font-medium mb-1'>Apellido</label>
          <input id='apellido' type='text' {...register('apellido')} className='w-full border rounded px-3 py-2' maxLength={50} />
          {errors.apellido && <p className='text-red-600 text-xs'>{errors.apellido.message}</p>}
        </div>
        <div>
          <label htmlFor='documento' className='block text-sm font-medium mb-1'>Documento de Identidad</label>
          <input id='documento' type='text' {...register('documento')} className='w-full border rounded px-3 py-2' maxLength={20} />
          {errors.documento && <p className='text-red-600 text-xs'>{errors.documento.message}</p>}
        </div>
        <div>
          <label htmlFor='celular' className='block text-sm font-medium mb-1'>Celular</label>
          <input id='celular' type='text' {...register('celular')} className='w-full border rounded px-3 py-2' maxLength={13} />
          {errors.celular && <p className='text-red-600 text-xs'>{errors.celular.message}</p>}
        </div>
        <div>
          <label htmlFor='fechaNacimiento' className='block text-sm font-medium mb-1'>Fecha de Nacimiento</label>
          <input id='fechaNacimiento' type='date' {...register('fechaNacimiento')} className='w-full border rounded px-3 py-2' />
          {errors.fechaNacimiento && <p className='text-red-600 text-xs'>{errors.fechaNacimiento.message}</p>}
        </div>
        <div>
          <label htmlFor='correo' className='block text-sm font-medium mb-1'>Correo electrónico</label>
          <input id='correo' type='email' {...register('correo')} className='w-full border rounded px-3 py-2' />
          {errors.correo && <p className='text-red-600 text-xs'>{errors.correo.message}</p>}
        </div>
        <div className='md:col-span-2'>
          <label htmlFor='clave' className='block text-sm font-medium mb-1'>Contraseña</label>
          <div className='relative'>
            <input id='clave' type={showPassword ? 'text' : 'password'} {...register('clave')} className='w-full border rounded px-3 py-2 pr-10' />
            <button type='button' tabIndex={-1} className='absolute right-2 top-2 text-xs text-blue-600' onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Ocultar' : 'Mostrar'}</button>
          </div>
          {errors.clave && <p className='text-red-600 text-xs'>{errors.clave.message}</p>}
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-2'>
        <button type='submit' disabled={isSubmitting} className='bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition disabled:opacity-60'>
          {isSubmitting ? 'Creando...' : 'Crear usuario vendedor'}
        </button>
        {success && <div className='text-green-700 text-sm'>{success}</div>}
        {error && <div className='text-red-700 text-sm'>{error}</div>}
      </div>
    </form>
  );
}
