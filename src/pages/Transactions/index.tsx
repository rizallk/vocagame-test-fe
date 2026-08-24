import { useGetTransactions } from '@/features/transactions/api/hooks/useGetTransactions';
import Filters from '@/features/transactions/components/Filters';
import TransactionsTable from '@/features/transactions/components/TransactionsTable';
import { useSearchParams } from 'react-router';

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const method = searchParams.get('method') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const page = parseInt(searchParams.get('_page') || '1');
  const limit = 10;

  const { data, isLoading } = useGetTransactions({
    params: {
      _page: page,
      _limit: limit,
      ...(status ? { status } : {}),
      ...(method ? { method } : {}),
      ...(search ? { search } : {}),
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {}),
    },
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams((prevParams) => {
      prevParams.set('_page', newPage.toString());
      return prevParams;
    });
  };

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>
      <p className="text-body-text-muted mb-6">
        Manage and monitor all platform financial activity.
      </p>

      <Filters searchParams={searchParams} setSearchParams={setSearchParams} />
      <TransactionsTable
        data={data}
        page={page}
        limit={limit}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
