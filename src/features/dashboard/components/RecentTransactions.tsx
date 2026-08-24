import Badge from '@/components/Badge';
import { Table, Td, Th, Tr } from '@/components/Table';
import { useGetTransactions } from '@/features/transactions/api/hooks/useGetTransactions';
import { firstCapitalLetter } from '@/utils/firstCapitalLetter';
import { formatCurrency } from '@/utils/formatCurrency';
import { Link } from 'react-router';
import { recentTransactionBadgeVariant } from '../utils/recentTransactionBadgeVariant';
import { bgRandomVariant } from '@/utils/bgRandomVariant';

export default function RecentTransactions() {
  const { data: res, isLoading } = useGetTransactions({
    params: {
      _limit: 5,
    },
  });

  return (
    <Table
      isLoading={isLoading}
      className="lg:col-span-2"
      header={
        <>
          <p className="text-xl font-medium">Recent Transactions</p>
          <Link to="#" className="text-xs font-bold text-[#C0C1FF]">
            View All
          </Link>
        </>
      }
      thead={
        <Tr isHead>
          <Th>TRANSACTION ID</Th>
          <Th>CUSTOMER</Th>
          <Th>AMOUNT</Th>
          <Th>METHOD</Th>
          <Th>STATUS</Th>
        </Tr>
      }
      tbody={
        res?.data && res.data.length > 0 ? (
          res.data.map((v, i) => (
            <Tr key={i}>
              <Td className="font-geist-mono">#{v.transactionId}</Td>
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
              <Td className="font-geist-mono">
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
            </Tr>
          ))
        ) : (
          <Tr>
            <Td
              colSpan={5}
              className="text-center text-sm text-body-text-muted"
            >
              No recent transactions available.
            </Td>
          </Tr>
        )
      }
    />
  );
}
