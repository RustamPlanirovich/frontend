import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Настройки
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Язык интерфейса
        </Typography>
        <LanguageSwitcher />
      </Paper>
    </Box>
  );
};

export default Settings; 