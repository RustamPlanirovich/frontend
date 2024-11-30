import React from 'react';
import { Box, Avatar, Button } from '@mui/material';
import { FileUpload } from '../files/FileUpload';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useNotifications } from '../../hooks/useNotifications';

export const UserAvatar: React.FC = () => {
  const { showSuccess } = useNotifications();
  const { files, setFiles, uploadFile } = useFileUpload({
    url: '/api/users/avatar',
    onSuccess: () => {
      showSuccess('Аватар успешно обновлен');
    },
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Avatar
        src={files[0]?.url}
        sx={{ width: 100, height: 100 }}
      />
      <FileUpload
        value={files}
        onChange={setFiles}
        config={{
          accept: ['image/jpeg', 'image/png'],
          multiple: false,
          maxSize: 5 * 1024 * 1024, // 5MB
        }}
      />
      <Button
        variant="contained"
        disabled={!files.length || files[0].status === 'success'}
        onClick={() => {
          const file = files[0];
          if (file) {
            uploadFile(file, file.rawFile);
          }
        }}
      >
        Загрузить
      </Button>
    </Box>
  );
}; 