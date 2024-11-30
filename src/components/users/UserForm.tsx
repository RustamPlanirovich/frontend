import React from 'react';
import { Box, Button } from '@mui/material';
import { z } from 'zod';
import { TextField } from '../forms/TextField';
import { Select } from '../forms/Select';
import { Checkbox } from '../forms/Checkbox';
import { useAppForm } from '../../hooks/useForm';
import { useMutation } from '../../hooks/useQuery';
import { usersApi } from '../../services/api/users';
import { useNotifications } from '../../hooks/useNotifications';

const schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  role: z.string(),
  isActive: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export const UserForm = () => {
  const { showSuccess } = useNotifications();
  
  const { mutateAsync } = useMutation(usersApi.createUser, {
    onSuccess: () => {
      showSuccess('Пользователь успешно создан');
    },
  });

  const { control, handleSubmit, status } = useAppForm<FormData>({
    schema,
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
      isActive: true,
    },
    onSubmit: mutateAsync,
  });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
      <TextField
        name="name"
        control={control}
        label="Имя"
        required
      />
      <TextField
        name="email"
        control={control}
        label="Email"
        type="email"
        required
      />
      <Select
        name="role"
        control={control}
        label="Роль"
        options={[
          { value: 'user', label: 'Пользователь' },
          { value: 'admin', label: 'Администратор' },
        ]}
      />
      <Checkbox
        name="isActive"
        control={control}
        label="Активный пользователь"
      />
      <Button 
        type="submit" 
        variant="contained"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </Box>
  );
}; 