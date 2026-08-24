import type { ComponentPropsWithRef } from 'react';
import Pagination from '../Pagination';
import type { TableProps, TdProps, ThProps, TrProps } from './types';

// Table
function Table({
  header,
  footer,
  thead,
  tbody,
  className,
  showPagination,
  paginationProps,
  isLoading,
}: TableProps) {
  return (
    <div
      className={`border border-secondary bg-[#18181BB2] text-body-text rounded-xl overflow-hidden ${className}`}
    >
      {header && (
        <div className="flex justify-between items-center p-4 bg-card-bg border-b border-secondary">
          {header}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="rounded-t-2xl">{thead}</thead>
          <tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan={100} className="p-4 text-center">
                  Loading...
                </Td>
              </Tr>
            ) : (
              tbody
            )}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div className="flex justify-between items-center p-4 bg-card-bg border-t border-secondary w-full">
          <Pagination isLoading={isLoading} {...paginationProps} />
        </div>
      )}
      {footer && (
        <div className="flex justify-between items-center p-4 bg-card-bg border-t border-secondary">
          {footer}
        </div>
      )}
    </div>
  );
}

// Table Row
function Tr({ children, className = '', isHead = false }: TrProps) {
  return (
    <tr
      className={`${isHead ? 'bg-[#1C1B1D] text-left border-b border-b-secondary text-xs font-medium text-body-text-muted' : 'border-b border-b-secondary last:border-0'} ${className} `}
    >
      {children}
    </tr>
  );
}

// Table Head Cell
function Th({ children, className = '' }: ThProps) {
  return <th className={`p-4 ${className} `}>{children}</th>;
}

// Table Data (body) Cell
function Td({
  children,
  className = '',
  ...rest
}: ComponentPropsWithRef<'td'> & TdProps) {
  return (
    <td className={`p-4 ${className}`} {...rest}>
      {children}
    </td>
  );
}

export { Table, Tr, Th, Td };
