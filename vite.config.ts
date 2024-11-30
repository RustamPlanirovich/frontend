import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: {
          // Здесь будут подключаемые модули
        },
        shared: ['react', 'react-dom', '@mui/material', 'mobx', 'mobx-react-lite']
      })
    ],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
    define: {
      'process.env': {}
    }
  };
}); 