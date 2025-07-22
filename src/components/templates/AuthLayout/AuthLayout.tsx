import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <div className='min-h-screen flex items-center justify-center bg-gray-50'>
    <div className='w-full max-w-md p-8 bg-white rounded shadow-md'>
      {children}
    </div>
  </div>
);

export default AuthLayout;
