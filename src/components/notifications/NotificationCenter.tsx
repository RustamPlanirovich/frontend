import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  CheckCircle as ReadIcon,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';
import { formatDistanceToNow } from 'date-fns';

const DRAWER_WIDTH = 320;

export const NotificationCenter = observer(() => {
  const { notificationStore } = useStore();

  return (
    <Drawer
      anchor="right"
      open={notificationStore.isNotificationCenterOpen}
      onClose={() => notificationStore.toggleNotificationCenter()}
      sx={{
        width: DRAWER_WIDTH,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Уведомления</Typography>
        <IconButton onClick={() => notificationStore.toggleNotificationCenter()}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          onClick={() => notificationStore.markAllAsRead()}
        >
          Прочитать все
        </Button>
        <Button 
          size="small" 
          color="error" 
          onClick={() => notificationStore.clearAll()}
        >
          Очистить все
        </Button>
      </Box>

      <List sx={{ overflow: 'auto', flexGrow: 1 }}>
        {notificationStore.notifications.map((notification) => (
          <ListItem
            key={notification.id}
            sx={{
              bgcolor: notification.read ? 'transparent' : 'action.hover',
            }}
            secondaryAction={
              <Box>
                <IconButton 
                  size="small" 
                  onClick={() => notificationStore.markAsRead(notification.id)}
                >
                  <ReadIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => notificationStore.removeNotification(notification.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={notification.title || notification.message}
              secondary={formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}); 