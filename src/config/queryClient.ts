import { QueryClient } from '@tanstack/react-query';
import { useNotifications } from '../hooks/useNotifications';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
        onError: (error: any) => {
          const { showError } = useNotifications();
          showError(error.message || 'Произошла ошибка при загрузке данных');
        },
      },
      mutations: {
        onError: (error: any) => {
          const { showError } = useNotifications();
          showError(error.message || 'Произошла ошибка при сохранении данных');
        },
      },
    },
  });
}; 