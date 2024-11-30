import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { FilterList as FilterIcon } from '@mui/icons-material';
import { Column, FilterConfig } from '../../types/table';

interface TableFiltersProps {
  columns: Column[];
  filters: FilterConfig[];
  onChange: (filters: FilterConfig[]) => void;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  columns,
  filters,
  onChange,
}) => {
  const handleFilterChange = (field: string, value: any) => {
    const newFilters = filters.map(f =>
      f.field === field ? { ...f, value } : f
    );
    onChange(newFilters);
  };

  return (
    <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {columns
        .filter(column => column.filterable)
        .map(column => {
          const filter = filters.find(f => f.field === column.field);
          
          if (column.renderFilter) {
            return column.renderFilter({
              field: String(column.field),
              value: filter?.value,
              onChange: (value) => handleFilterChange(String(column.field), value),
            });
          }

          return (
            <TextField
              key={String(column.field)}
              label={column.headerName}
              size="small"
              value={filter?.value || ''}
              onChange={(e) => handleFilterChange(String(column.field), e.target.value)}
              InputProps={{
                startAdornment: <FilterIcon fontSize="small" sx={{ mr: 1 }} />,
              }}
            />
          );
        })}
    </Box>
  );
}; 