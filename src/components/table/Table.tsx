import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Checkbox,
  LinearProgress,
  Box,
} from '@mui/material';
import { TableProps, Column } from '../../types/table';
import { TablePagination } from './TablePagination';
import { TableFilters } from './TableFilters';

export function Table<T extends { id: string | number }>({
  columns,
  data,
  loading,
  sortConfig,
  onSortChange,
  filterConfig,
  onFilterChange,
  pagination,
  onPageChange,
  onPageSizeChange,
  selectable,
  selectedRows = [],
  onSelectedRowsChange,
}: TableProps<T>) {
  const handleSort = (field: string) => {
    if (!onSortChange) return;

    const direction = sortConfig?.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ field, direction });
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectedRowsChange) return;
    onSelectedRowsChange(checked ? data : []);
  };

  const handleSelectRow = (row: T) => {
    if (!onSelectedRowsChange) return;
    const isSelected = selectedRows.some((r) => r.id === row.id);
    const newSelection = isSelected
      ? selectedRows.filter((r) => r.id !== row.id)
      : [...selectedRows, row];
    onSelectedRowsChange(newSelection);
  };

  return (
    <Paper>
      {filterConfig && onFilterChange && (
        <TableFilters
          columns={columns}
          filters={filterConfig}
          onChange={onFilterChange}
        />
      )}
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={String(column.field)}
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortConfig?.field === column.field}
                      direction={sortConfig?.field === column.field ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort(String(column.field))}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0)}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
            {!loading && data.map((row) => (
              <TableRow key={row.id}>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.some((r) => r.id === row.id)}
                      onChange={() => handleSelectRow(row)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={`${row.id}-${String(column.field)}`}>
                    {column.renderCell
                      ? column.renderCell(row)
                      : row[column.field]
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {pagination && (
        <TablePagination
          {...pagination}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </Paper>
  );
} 