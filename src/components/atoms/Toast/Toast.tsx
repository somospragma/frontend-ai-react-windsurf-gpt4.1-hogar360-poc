import React from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

function getToastBgColor(type?: 'success' | 'error' | 'info') {
  if (type === 'success') return 'bg-green-600';
  if (type === 'error') return 'bg-red-600';
  return 'bg-blue-600';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  const bgColor = getToastBgColor(type);

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-white transition-all ${bgColor}`}
      role='alert'
      aria-live='assertive'
    >
      <div className='flex items-center gap-2'>
        <span>{message}</span>
        <button
          className='ml-3 text-white/80 hover:text-white text-xl leading-none font-bold focus:outline-none'
          onClick={onClose}
          aria-label='Cerrar notificación'
        >
          ×
        </button>
      </div>
    </div>
  );
};
