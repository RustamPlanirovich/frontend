import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Paper,
  List,
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { FileUploadProps, UploadedFile } from '../../types/file';
import { FileItem } from './FileItem';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const FileUpload: React.FC<FileUploadProps> = ({
  value = [],
  onChange,
  config = {},
  disabled = false,
}) => {
  const {
    maxSize = DEFAULT_MAX_SIZE,
    accept = [],
    multiple = false,
  } = config;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: uuidv4(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
    }));

    onChange?.([...value, ...newFiles]);
  }, [value, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    maxSize,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple,
  });

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: disabled ? 'default' : 'pointer',
        }}
      >
        <input {...getInputProps()} />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
        >
          <UploadIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="body1" align="center">
            {isDragActive
              ? 'Отпустите файлы здесь'
              : 'Перетащите файлы сюда или кликните для выбора'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Максимальный размер: {Math.round(maxSize / 1024 / 1024)}MB
          </Typography>
        </Box>
      </Paper>

      {value.length > 0 && (
        <List sx={{ mt: 2 }}>
          {value.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onRemove={() => {
                onChange?.(value.filter(f => f.id !== file.id));
              }}
              disabled={disabled}
            />
          ))}
        </List>
      )}
    </Box>
  );
}; 