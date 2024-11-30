import React, { useState } from 'react';
import { Table } from '../table/Table';
import { Column, SortConfig, FilterConfig, PaginationConfig } from '../../types/table';
import { User } from '../../services/api/users';
import { useQuery } from '../../hooks/useQuery';
import { usersApi } from '../../services/api/users';
import { Chip, Button } from '@mui/material';

const columns: Column<User>[] = [
  {
    field: 'name',
    headerName: 'Имя',
    sortable: true,
    filterable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: true,
    filterable: true,
  },
  {
    field: 'role',
    headerName: 'Роль',
    renderCell: (row) => (
      <Chip 
        label={row.role === 'admin' ? 'Администратор' : 'Пользователь'} 
        color={row.role === 'admin' ? 'primary' : 'default'} 
      />
    ),
  },
  {
    field: 'id',
    headerName: 'Действия',
    renderCell: (row) => (
      <Button size="small" onClick={() => console.log('Edit:', row)}>
        Редактировать
      </Button>
    ),
  },
];

export const UsersTable = () => {
  const [sort, setSort] = useState<SortConfig>({ field: 'name', direction: 'asc' });
  const [filters, setFilters] = useState<FilterConfig[]>([
    { field: 'name', value: '' },
    { field: 'email', value: '' },
  ]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    page: 0,
    pageSize: 10,
    total: 0,
  });

  const { data, isLoading } = useQuery(['users', sort, filters, pagination], () =>
    usersApi.getUsers()
  );

  return (
    <Table
      columns={columns}
      data={data || []}
      loading={isLoading}
      sortConfig={sort}
      onSortChange={setSort}
      filterConfig={filters}
      onFilterChange={setFilters}
      pagination={pagination}
      onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
      onPageSizeChange={(pageSize) => setPagination(prev => ({ ...prev, pageSize }))}
      selectable
    />
  );
}; 