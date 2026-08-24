import type { QueryConfig } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';
import { getAcquisition } from '../services/acquisition';

export const getAcquisitionQueryKey = () => ['acquisition'];

const getAcquisitionQueryOptions = () => {
  return {
    queryKey: getAcquisitionQueryKey(),
    queryFn: () => getAcquisition(),
  };
};

type UseGetAcquisitionParams = {
  queryConfig?: QueryConfig<typeof getAcquisitionQueryOptions>;
};

export const useGetAcquisition = ({
  queryConfig,
}: UseGetAcquisitionParams = {}) => {
  return useQuery({
    ...getAcquisitionQueryOptions(),
    ...queryConfig,
  });
};
