import { apiClient } from './client';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const usersApi = {
  getUsers: () => apiClient.get<User[]>('/users'),
  getUser: (id: string) => apiClient.get<User>(`/users/${id}`),
  createUser: (data: Omit<User, 'id'>) => apiClient.post<User>('/users', data),
  updateUser: (id: string, data: Partial<User>) => apiClient.put<User>(`/users/${id}`, data),
  deleteUser: (id: string) => apiClient.delete<void>(`/users/${id}`),
}; 