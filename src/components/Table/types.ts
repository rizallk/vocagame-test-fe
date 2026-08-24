import type { ReactNode } from 'react';
import type { PaginationProps } from '../Pagination';

export type TableProps = {
  header?: ReactNode;
  footer?: ReactNode;
  thead: ReactNode;
  tbody: ReactNode;
  className?: string;
  showPagination?: boolean;
  paginationProps?: PaginationProps;
  isLoading?: boolean;
};

// Table Row
export type TrProps = {
  children?: ReactNode;
  className?: string;
  isHead?: boolean; // Jika true, maka <tr> akan menggunakan style khusus thead punya
};

// Table Head Cell
export type ThProps = {
  children?: ReactNode;
  className?: string;
};

// Table Data (body) Cell
export type TdProps = {
  children?: ReactNode;
  className?: string;
};
