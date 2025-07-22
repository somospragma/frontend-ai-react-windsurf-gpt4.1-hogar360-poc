import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className='mb-4'>
    <label className='block text-sm font-medium text-gray-700 mb-1'>
      {label}
    </label>
    <input
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}

      {...props}
    />
    {error && <span className='text-xs text-red-600'>{error}</span>}
  </div>
);
