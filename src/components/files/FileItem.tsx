import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Box,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Error as ErrorIcon,
  CheckCircle as SuccessIcon,
} from '@mui/icons-material';
import { UploadedFile } from '../../types/file';
import { formatFileSize } from '../../utils/formatters';

interface FileItemProps {
  file: UploadedFile;
  onRemove: () => void;
  disabled?: boolean;
}

export const FileItem: React.FC<FileItemProps> = ({
  file,
  onRemove,
  disabled,
}) => {
  const getStatusColor = () => {
    switch (file.status) {
      case 'success':
        return 'success.main';
      case 'error':
        return 'error.main';
      default:
        return 'grey.500';
    }
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case 'success':
        return <SuccessIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <ListItem>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            {getStatusIcon()}
            <Typography>{file.name}</Typography>
          </Box>
        }
        secondary={
          <>
            {formatFileSize(file.size)}
            {file.status === 'uploading' && (
              <Box sx={{ mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={file.progress}
                  sx={{ height: 4, borderRadius: 2 }}
                />
              </Box>
            )}
            {file.error && (
              <Typography color="error" variant="caption">
                {file.error}
              </Typography>
            )}
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={onRemove}
          disabled={disabled || file.status === 'uploading'}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}; 