import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { useForm } from '../hooks/useForm';
import { TextField } from '../components/forms/TextField';
import { Button } from '@mui/material';
import { useStore } from '../hooks/useStore';
import { useNotifications } from '../hooks/useNotifications';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

type FormData = z.infer<typeof schema>;

export const Login = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authStore } = useStore();
  const { showError } = useNotifications();

  const from = location.state?.from?.pathname || '/';

  const { control, handleSubmit, status } = useForm<FormData>({
    schema,
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      try {
        await authStore.login(data);
        navigate(from, { replace: true });
      } catch (error: any) {
        showError(error.message || 'Ошибка авторизации');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Вход в систему
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              name="email"
              control={control}
              label="Email"
              type="email"
              required
            />
            <TextField
              name="password"
              control={control}
              label="Пароль"
              type="password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Вход...' : 'Войти'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}); 