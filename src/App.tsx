import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route as RouterRoute, Navigate } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { ModalProvider } from './providers/ModalProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { observer } from 'mobx-react-lite';
import { useStore } from './contexts/StoreContext';
import { Toast } from './components/notifications/Toast';
import { createQueryClient } from './config/queryClient';
import { routes } from './routes';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { LinearProgress } from '@mui/material';
import { StoreProvider } from './contexts/StoreContext';
import { rootStore } from './stores/rootStore';
import { Route as AppRoute } from './types/route';
import './config/i18n';

const queryClient = createQueryClient();

const renderRoutes = (routes: AppRoute[]) => {
  return routes.map(route => {
    const Component = route.component;
    const Layout = route.layout || React.Fragment;

    return (
      <RouterRoute
        key={route.path}
        path={route.path}
        element={
          route.roles ? (
            <ProtectedRoute roles={route.roles}>
              <Layout>
                <Suspense fallback={<LinearProgress />}>
                  <Component />
                </Suspense>
              </Layout>
            </ProtectedRoute>
          ) : (
            <Layout>
              <Suspense fallback={<LinearProgress />}>
                <Component />
              </Suspense>
            </Layout>
          )
        }
      >
        {route.children && renderRoutes(route.children)}
      </RouterRoute>
    );
  });
};

const AppContent = observer(() => {
  const { notificationStore } = useStore();
  const latestNotification = notificationStore.notifications[0];

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {renderRoutes(routes)}
            <RouterRoute path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <NotificationCenter />
          <ModalProvider />
          {latestNotification && !latestNotification.read && (
            <Toast
              notification={latestNotification}
              onClose={() => notificationStore.markAsRead(latestNotification.id)}
            />
          )}
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
});

export const App = () => {
  return (
    <StoreProvider store={rootStore}>
      <AppContent />
    </StoreProvider>
  );
};

export default App; 