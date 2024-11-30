import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = observer(({ children }) => {
  const { uiStore } = useStore();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar open={uiStore.sidebarOpen} onClose={() => uiStore.toggleSidebar()} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ height: 64 }} /> {/* Toolbar offset */}
        {children}
      </Box>
    </Box>
  );
}); 