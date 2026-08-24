import type { QueryConfig } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';
import { getPaymentDistribution } from '../services/paymentDistribution';

export const getPaymentDistributionQueryKey = () => ['payment-distribution'];

const getPaymentDistributionQueryOptions = () => {
  return {
    queryKey: getPaymentDistributionQueryKey(),
    queryFn: () => getPaymentDistribution(),
  };
};

type UseGetPaymentDistributionParams = {
  queryConfig?: QueryConfig<typeof getPaymentDistributionQueryOptions>;
};

export const useGetPaymentDistribution = (
  params: UseGetPaymentDistributionParams = {},
) => {
  return useQuery({
    ...getPaymentDistributionQueryOptions(),
    ...params.queryConfig,
  });
};
