import type { QueryConfig } from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';
import {
  getActivityFeed,
  type ActivityFeedQueryParams,
} from '../services/acitvityFeed';

export const getActivityFeedQueryKey = (params?: ActivityFeedQueryParams) => [
  'activity-feed',
  params,
];

const getActivityFeedQueryOptions = (params?: ActivityFeedQueryParams) => {
  return {
    queryKey: getActivityFeedQueryKey(params),
    queryFn: () => getActivityFeed(params),
  };
};

type UseGetActivityFeedParams = {
  params?: ActivityFeedQueryParams;
  queryConfig?: QueryConfig<typeof getActivityFeedQueryOptions>;
};

export const useGetActivityFeed = ({
  params,
  queryConfig,
}: UseGetActivityFeedParams = {}) => {
  return useQuery({
    ...getActivityFeedQueryOptions(params),
    ...queryConfig,
  });
};
