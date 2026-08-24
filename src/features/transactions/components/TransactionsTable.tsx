import Badge from '@/components/Badge';
import { Table, Td, Th, Tr } from '@/components/Table';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { bgRandomVariant } from '@/utils/bgRandomVariant';
import { formatCurrency } from '@/utils/formatCurrency';
import { recentTransactionBadgeVariant } from '@/features/dashboard/utils/recentTransactionBadgeVariant';
import { firstCapitalLetter } from '@/utils/firstCapitalLetter';
import { formatISODate } from '@/utils/formatDate';
import type { PaginatedTransactions } from '../api/services/transactions';

type TransactionsTableProps = {
  data?: PaginatedTransactions;
  page: number;
  limit: number;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
};

export default function TransactionsTable({
  data,
  page,
  limit,
  isLoading,
  handlePageChange,
}: TransactionsTableProps) {
  return (
    <Table
      isLoading={isLoading}
      thead={
        <Tr isHead>
          <Th>TRANSACTION ID</Th>
          <Th>DATE</Th>
          <Th>CUSTOMER</Th>
          <Th>AMOUNT</Th>
          <Th>METHOD</Th>
          <Th>STATUS</Th>
          <Th></Th>
        </Tr>
      }
      tbody={
        data?.data && data.data.length > 0 ? (
          data.data.map((v, i) => (
            <Tr key={i}>
              <Td className="font-geist-mono text-[#C0C1FF]">
                #{v.transactionId}
              </Td>
              <Td>{formatISODate(v.date)}</Td>
              <Td>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full size-8 flex justify-center items-center text-xs ${bgRandomVariant(i)}`}
                  >
                    {v.avatar}
                  </div>
                  <p className="text-sm">{v.customerName}</p>
                </div>
              </Td>
              <Td className="font-geist-mono font-semibold">
                {formatCurrency(v.amount, { showDecimals: true })}
              </Td>
              <Td>{v.method}</Td>
              <Td>
                <Badge
                  variant={recentTransactionBadgeVariant(v.status)}
                  className="text-center rounded-full w-fit"
                  isBordered
                >
                  {firstCapitalLetter(v.status)}
                </Badge>
              </Td>
              <Td>
                <BsThreeDotsVertical className="h-5 w-auto" />
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td
              colSpan={7}
              className="text-center text-sm text-body-text-muted"
            >
              No transactions available.
            </Td>
          </Tr>
        )
      }
      showPagination
      paginationProps={{
        label: 'transactions',
        page,
        limit,
        total: data?.total || 0,
        onPageChange: handlePageChange,
      }}
    />
  );
}
