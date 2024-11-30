import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Notification } from '../../stores/notificationStore';
import { useStore } from '../../contexts/StoreContext';

interface ToastProps {
  notification: Notification;
  onClose: () => void;
}

export const Toast = observer(({ notification, onClose }: ToastProps) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={notification.type}
        sx={{ width: '100%' }}
        elevation={6}
        variant="filled"
      >
        {notification.title && (
          <AlertTitle>{notification.title}</AlertTitle>
        )}
        {notification.message}
      </Alert>
    </Snackbar>
  );
}); 