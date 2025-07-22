import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { FormError } from '../../atoms/FormError';

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type AuthFormData = z.infer<typeof schema>;

interface AuthFormProps {
  onSubmit: (data: AuthFormData) => void;
  error?: string;
  loading?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, error, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label='Correo electrónico' type='email' {...register('email')} error={errors.email?.message} autoComplete='username' />
      <Input label='Contraseña' type='password' {...register('password')} error={errors.password?.message} autoComplete='current-password' />
      <FormError message={error} />
      <Button type='submit' disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</Button>
    </form>
  );
};
