import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { BaseFieldProps } from '../../types/form';
import { FieldValues } from 'react-hook-form';

interface CheckboxProps<T extends FieldValues> extends BaseFieldProps<T> {
  label: string;
}

export const Checkbox = <T extends FieldValues>({
  name,
  control,
  label,
  rules,
  disabled,
  required,
}: CheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} required={required}>
          <FormControlLabel
            control={
              <MuiCheckbox
                {...field}
                checked={field.value}
                disabled={disabled}
              />
            }
            label={label}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}; 