export interface Column<T = any> {
  field: keyof T;
  headerName: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (row: T) => React.ReactNode;
  renderFilter?: (props: FilterProps) => React.ReactNode;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  field: string;
  value: any;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export interface FilterProps {
  field: string;
  value: any;
  onChange: (value: any) => void;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  sortConfig?: SortConfig;
  onSortChange?: (sort: SortConfig) => void;
  filterConfig?: FilterConfig[];
  onFilterChange?: (filters: FilterConfig[]) => void;
  pagination?: PaginationConfig;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectedRowsChange?: (rows: T[]) => void;
} 