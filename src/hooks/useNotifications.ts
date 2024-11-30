import { useStore } from '../contexts/StoreContext';

export const useNotifications = () => {
  const { notificationStore } = useStore();

  return {
    showSuccess: (message: string, title?: string) => {
      notificationStore.addNotification({
        type: 'success',
        message,
        title,
      });
    },
    showError: (message: string, title?: string) => {
      notificationStore.addNotification({
        type: 'error',
        message,
        title,
      });
    },
    showWarning: (message: string, title?: string) => {
      notificationStore.addNotification({
        type: 'warning',
        message,
        title,
      });
    },
    showInfo: (message: string, title?: string) => {
      notificationStore.addNotification({
        type: 'info',
        message,
        title,
      });
    },
  };
}; 