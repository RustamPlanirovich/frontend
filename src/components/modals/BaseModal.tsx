import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  closeOnClickOutside?: boolean;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  actions,
  children,
  maxWidth = 'sm',
  fullScreen = false,
  closeOnClickOutside = true,
}) => {
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === 'backdropClick' && !closeOnClickOutside) {
          return;
        }
        onClose();
      }}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      fullWidth
    >
      {title && (
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {title}
            <IconButton size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}; 