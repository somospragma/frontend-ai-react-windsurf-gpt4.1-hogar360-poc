import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { useCategories } from '../../../shared/hooks/useCategories';

const schema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(50, 'Máximo 50 caracteres'),
  descripcion: z.string().min(1, 'La descripción es obligatoria').max(90, 'Máximo 90 caracteres'),
});

type CategoryFormData = z.infer<typeof schema>;

export const CategoryForm: React.FC = () => {
  const { createCategory, error, success, setError, setSuccess } = useCategories();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: CategoryFormData) => {
    createCategory(data.nombre, data.descripcion);
    reset();
  };

  React.useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => setSuccess(null), 2000);
      return () => clearTimeout(timeout);
    }
    if (error) {
      const timeout = setTimeout(() => setError(null), 2500);
      return () => clearTimeout(timeout);
    }
  }, [success, error, setError, setSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input label='Nombre de la categoría' maxLength={50} {...register('nombre')} error={errors.nombre?.message} autoComplete='off' />
      <Input label='Descripción' maxLength={90} {...register('descripcion')} error={errors.descripcion?.message} autoComplete='off' />
      {error && <div className='text-red-600 text-xs'>{error}</div>}
      {success && <div className='text-green-600 text-xs'>{success}</div>}
      <Button type='submit'>Crear categoría</Button>
    </form>
  );
}
