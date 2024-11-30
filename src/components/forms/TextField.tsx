import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { BaseFieldProps } from '../../types/form';
import { FieldValues } from 'react-hook-form';

interface TextFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  type?: 'text' | 'password' | 'email' | 'number';
  multiline?: boolean;
  rows?: number;
}

export const TextField = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  disabled,
  fullWidth = true,
  required,
  type = 'text',
  multiline = false,
  rows,
}: TextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          type={type}
          label={label}
          error={!!error}
          helperText={error?.message}
          disabled={disabled}
          fullWidth={fullWidth}
          required={required}
          multiline={multiline}
          rows={rows}
        />
      )}
    />
  );
}; 