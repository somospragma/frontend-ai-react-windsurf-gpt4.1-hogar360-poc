import React from 'react';

interface FormErrorProps {
  message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => (
  message ? <div className='text-xs text-red-600 mb-2'>{message}</div> : null
);
