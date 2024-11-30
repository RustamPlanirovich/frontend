import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge,
  Box,
  Avatar 
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';

export const Header = observer(() => {
  const { uiStore, notificationStore, authStore } = useStore();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => uiStore.toggleSidebar()}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={() => uiStore.toggleTheme()}>
            {uiStore.theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={notificationStore.unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton sx={{ ml: 1 }}>
            <Avatar 
              alt={authStore.user?.name} 
              src={authStore.user?.avatar}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}); 