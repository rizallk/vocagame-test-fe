import type { QueryConfig } from '@/lib/query-client';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { getCustomersSummary } from '../services/customersSummary';

// React query best practice by voidfnc (https://www.youtube.com/watch?v=Bryp1fjeu6A)
export const getCustomersSummaryQueryKey = () => ['customers-summary'];

const getCustomersSummaryQueryOptions = () => {
  return queryOptions({
    queryKey: getCustomersSummaryQueryKey(),
    queryFn: getCustomersSummary,
  });
};

// Custom hook, ini yang akan digunakan di komponen React
type UseGetCustomersSummaryParams = {
  queryConfig?: QueryConfig<typeof getCustomersSummaryQueryOptions>;
};

export const useGetCustomersSummary = (
  params: UseGetCustomersSummaryParams = {},
) => {
  return useQuery({
    ...getCustomersSummaryQueryOptions(),
    ...params.queryConfig,
  });
};
