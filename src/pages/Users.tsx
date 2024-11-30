import React from 'react';
import { UsersTable } from '../components/users/UsersTable';
import { Box, Typography, Button } from '@mui/material';
import { useModal } from '../hooks/useModal';
import { UserForm } from '../components/users/UserForm';

const Users = () => {
  const { show } = useModal();

  const handleCreateUser = () => {
    show({
      component: UserForm,
      options: {
        maxWidth: 'sm',
      },
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Пользователи</Typography>
        <Button variant="contained" onClick={handleCreateUser}>
          Создать пользователя
        </Button>
      </Box>
      <UsersTable />
    </Box>
  );
};

export default Users; 