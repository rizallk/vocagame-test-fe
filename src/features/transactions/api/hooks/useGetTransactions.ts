import type { QueryConfig } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';
import {
  getTransactions,
  type TransactionsQueryParams,
} from '../services/transactions';

export const getTransactionsQueryKey = (params?: TransactionsQueryParams) => [
  'transactions',
  params,
];

const getTransactionsQueryOptions = (params?: TransactionsQueryParams) => {
  return {
    queryKey: getTransactionsQueryKey(params),
    queryFn: () => getTransactions(params),
  };
};

type UseGetTransactionsParams = {
  queryConfig?: QueryConfig<typeof getTransactionsQueryOptions>;
  params?: TransactionsQueryParams;
};

export const useGetTransactions = ({
  params,
  queryConfig,
}: UseGetTransactionsParams = {}) => {
  return useQuery({
    ...getTransactionsQueryOptions(params),
    ...queryConfig,
  });
};
