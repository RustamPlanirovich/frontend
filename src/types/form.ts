import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface BaseFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: RegisterOptions;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'; 