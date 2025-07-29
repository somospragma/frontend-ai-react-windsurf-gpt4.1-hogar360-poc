import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../shared/store/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'admin' | 'comprador' | 'vendedor';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  if (role && user?.role !== role) {
    return <Navigate to='/' replace />;
  }
  return <>{children}</>;
};
