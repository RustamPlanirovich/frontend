import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({
  children,
  roles,
}) => {
  const { authStore } = useStore();
  const location = useLocation();

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.some(role => authStore.hasRole(role))) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}); 