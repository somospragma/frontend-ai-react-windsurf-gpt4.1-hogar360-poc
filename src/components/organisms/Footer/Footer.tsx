import React from 'react';

export const Footer: React.FC = () => (
  <footer className='w-full flex items-center justify-center bg-gray-100 border-t border-gray-200 mt-auto py-4 px-2 text-center'>
    <span className='text-gray-600 text-sm font-medium tracking-wide' style={{ fontFamily: 'Inter, sans-serif' }}>
      © {new Date().getFullYear()} Hogar360 &mdash; Todos los derechos reservados.
    </span>
  </footer>
);
