import React from 'react';
import { Typography, Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в панель управления
      </Typography>
      <Typography>
        Это главная страница панели управления.
      </Typography>
    </Box>
  );
};

export default Dashboard; 