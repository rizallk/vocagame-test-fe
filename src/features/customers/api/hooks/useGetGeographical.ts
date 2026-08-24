import type { QueryConfig } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';
import { getGeographical } from '../services/geographical';

export const getGeographicalQueryKey = () => ['geographical'];

const getGeographicalQueryOptions = () => {
  return {
    queryKey: getGeographicalQueryKey(),
    queryFn: () => getGeographical(),
  };
};

type UseGetGeographicalParams = {
  queryConfig?: QueryConfig<typeof getGeographicalQueryOptions>;
};

export const useGetGeographical = ({
  queryConfig,
}: UseGetGeographicalParams = {}) => {
  return useQuery({
    ...getGeographicalQueryOptions(),
    ...queryConfig,
  });
};
