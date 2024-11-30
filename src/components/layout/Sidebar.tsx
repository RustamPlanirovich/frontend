import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';
import { routes } from '../../routes';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 240;

export const Sidebar = observer(({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authStore } = useStore();

  const menuItems = routes[1].children?.filter(route => {
    if (route.meta?.hideInMenu) return false;
    if (route.roles && !route.roles.some(role => authStore.hasRole(role))) return false;
    return true;
  }) || [];

  return (
    <Drawer
      variant="permanent"
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          ...(!open && {
            width: theme => theme.spacing(7),
            overflowX: 'hidden',
          }),
        },
      }}
    >
      <Box sx={{ height: 64 }} /> {/* Toolbar offset */}
      <Divider />
      <List>
        {menuItems.map((item) => {
          const Icon = item.meta?.icon;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                {Icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                )}
                <ListItemText 
                  primary={item.meta?.title} 
                  sx={{ opacity: open ? 1 : 0 }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}); 