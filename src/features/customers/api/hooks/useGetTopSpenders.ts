import type { QueryConfig } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';
import {
  getTopSpenders,
  type TopSpendersQueryParams,
} from '../services/topSpenders';

export const getTopSpendersQueryKey = (params?: TopSpendersQueryParams) => [
  'top-spenders',
  params,
];

const getTopSpendersQueryOptions = (params?: TopSpendersQueryParams) => {
  return {
    queryKey: getTopSpendersQueryKey(params),
    queryFn: () => getTopSpenders(params),
  };
};

type UseGetTopSpendersParams = {
  params?: TopSpendersQueryParams;
  queryConfig?: QueryConfig<typeof getTopSpendersQueryOptions>;
};

export const useGetTopSpenders = ({
  params,
  queryConfig,
}: UseGetTopSpendersParams = {}) => {
  return useQuery({
    ...getTopSpendersQueryOptions(params),
    ...queryConfig,
  });
};
