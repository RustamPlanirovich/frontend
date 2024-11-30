import React from 'react';
import {
  TablePagination as MuiTablePagination,
  Box,
} from '@mui/material';
import { PaginationConfig } from '../../types/table';

interface TablePaginationProps extends PaginationConfig {
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <MuiTablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => onPageChange?.(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => onPageSizeChange?.(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}; 