import { useState, useCallback } from 'react';
import { UploadedFile } from '../types/file';
import { apiClient } from '../services/api/client';
import { useNotifications } from './useNotifications';

interface UseFileUploadOptions {
  url: string;
  onSuccess?: (file: UploadedFile) => void;
  onError?: (file: UploadedFile, error: Error) => void;
}

export const useFileUpload = ({ url, onSuccess, onError }: UseFileUploadOptions) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { showError } = useNotifications();

  const uploadFile = useCallback(async (file: UploadedFile, rawFile: File) => {
    const formData = new FormData();
    formData.append('file', rawFile);

    try {
      setFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'uploading' } 
            : f
        )
      );

      const response = await apiClient.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
          );

          setFiles(prev =>
            prev.map(f =>
              f.id === file.id
                ? { ...f, progress }
                : f
            )
          );
        },
      });

      const updatedFile = {
        ...file,
        status: 'success' as const,
        url: response.data.url,
      };

      setFiles(prev =>
        prev.map(f => (f.id === file.id ? updatedFile : f))
      );

      onSuccess?.(updatedFile);
    } catch (error: any) {
      const failedFile = {
        ...file,
        status: 'error' as const,
        error: error.message,
      };

      setFiles(prev =>
        prev.map(f => (f.id === file.id ? failedFile : f))
      );

      showError(`Ошибка загрузки файла ${file.name}`);
      onError?.(failedFile, error);
    }
  }, [url, onSuccess, onError, showError]);

  return {
    files,
    setFiles,
    uploadFile,
  };
}; 