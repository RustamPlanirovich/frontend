import React from 'react';
import { Typography, Button, Box } from '@mui/material';

interface ExampleModalProps {
  onClose: () => void;
  data?: any;
}

export const ExampleModal: React.FC<ExampleModalProps> = ({ onClose, data }) => {
  return (
    <Box p={2}>
      <Typography>Это пример модального окна</Typography>
      <Button onClick={onClose}>Закрыть</Button>
    </Box>
  );
};

// Использование:
const { show } = useModal();

// Где-то в компоненте:
const handleOpenModal = () => {
  show({
    component: ExampleModal,
    props: { data: someData },
    options: {
      maxWidth: 'sm',
      closeOnClickOutside: true,
    },
  });
}; 