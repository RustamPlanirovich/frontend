import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { BaseFieldProps } from '../../types/form';
import { FieldValues } from 'react-hook-form';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  options: SelectOption[];
  multiple?: boolean;
}

export const Select = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  disabled,
  fullWidth = true,
  required,
  options,
  multiple = false,
}: SelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl 
          fullWidth={fullWidth} 
          error={!!error}
          required={required}
        >
          <InputLabel>{label}</InputLabel>
          <MuiSelect
            {...field}
            multiple={multiple}
            label={label}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MuiSelect>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}; 