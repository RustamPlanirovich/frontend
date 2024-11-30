export interface FileUploadConfig {
  maxSize?: number; // в байтах
  accept?: string[]; // mime types
  multiple?: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  error?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

export interface FileUploadProps {
  value?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
  config?: FileUploadConfig;
  disabled?: boolean;
} 