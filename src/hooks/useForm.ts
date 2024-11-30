import { useForm as useHookForm, UseFormProps, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useState } from 'react';
import { FormStatus } from '../types/form';

interface UseAppFormProps<T extends FieldValues> extends UseFormProps<T> {
  schema?: z.ZodType<T>;
  onSubmit: (data: T) => Promise<void> | void;
}

function useAppForm<T extends FieldValues>({
  schema,
  onSubmit,
  ...formProps
}: UseAppFormProps<T>) {
  const [status, setStatus] = useState<FormStatus>('idle');
  
  const form = useHookForm<T>({
    ...formProps,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  const handleSubmit = useCallback(
    async (data: T) => {
      try {
        setStatus('loading');
        await onSubmit(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        throw error;
      }
    },
    [onSubmit]
  );

  return {
    ...form,
    status,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}

export { useAppForm as useForm }; 