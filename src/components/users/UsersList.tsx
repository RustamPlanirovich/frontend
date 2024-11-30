import React from 'react';
import { useQuery, useMutation } from '../../hooks/useQuery';
import { usersApi, User } from '../../services/api/users';
import { useNotifications } from '../../hooks/useNotifications';

export const UsersList = () => {
  const { showSuccess } = useNotifications();
  
  const { data: users, isLoading } = useQuery('users', usersApi.getUsers);
  
  const deleteMutation = useMutation(usersApi.deleteUser, {
    onSuccess: () => {
      showSuccess('Пользователь успешно удален');
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => deleteMutation.mutate(user.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}; 