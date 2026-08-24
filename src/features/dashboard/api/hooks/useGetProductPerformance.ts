import type { QueryConfig } from '@/lib/query-client';
import {
  getProductPerformance,
  type ProductPerformanceQueryParams,
} from '../services/productPerformance';
import { useQuery } from '@tanstack/react-query';

export const getProductPerformanceQueryKey = (
  params?: ProductPerformanceQueryParams,
) => ['product-performance', params];

const getProductPerformanceQueryOptions = (
  params?: ProductPerformanceQueryParams,
) => {
  return {
    queryKey: getProductPerformanceQueryKey(params),
    queryFn: () => getProductPerformance(params),
  };
};

type UseGetProductPerformanceParams = {
  queryConfig?: QueryConfig<typeof getProductPerformanceQueryOptions>;
  params?: ProductPerformanceQueryParams;
};

export const useGetProductPerformance = ({
  params,
  queryConfig,
}: UseGetProductPerformanceParams = {}) => {
  return useQuery({
    ...getProductPerformanceQueryOptions(params),
    ...queryConfig,
  });
};
