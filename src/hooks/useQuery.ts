import { 
  useQuery as useReactQuery, 
  useMutation as useReactMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useQuery<TData = unknown, TError = AxiosError>(
  key: string | readonly unknown[],
  fetcher: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>
) {
  return useReactQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: fetcher,
    ...options,
  });
}

export function useMutation<TData = unknown, TVariables = unknown, TError = AxiosError>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
  return useReactMutation({
    mutationFn,
    ...options,
  });
} 