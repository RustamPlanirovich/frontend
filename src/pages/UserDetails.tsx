import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useQuery } from '../hooks/useQuery';
import { usersApi } from '../services/api/users';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useQuery(['user', id], () => 
    usersApi.getUser(id!)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Box>
      <Typography variant="h4">Пользователь: {user.name}</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>Email: {user.email}</Typography>
        <Typography>Роль: {user.roles.join(', ')}</Typography>
      </Box>
    </Box>
  );
};

export default UserDetails; 