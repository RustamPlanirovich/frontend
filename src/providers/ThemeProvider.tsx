import React from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { observer } from 'mobx-react-lite';
import { useStore } from '../contexts/StoreContext';
import { lightTheme, darkTheme } from '../utils/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = observer(({ children }: ThemeProviderProps) => {
  const { uiStore } = useStore();
  const theme = uiStore.theme === 'light' ? lightTheme : darkTheme;

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}); 