import type { QueryConfig } from '@/lib/query-client';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { getDashboardSummary } from '../services/dashboardSummary';

// React query best practice by voidfnc (https://www.youtube.com/watch?v=Bryp1fjeu6A)
export const getDashboardSummaryQueryKey = () => ['dashboard-summary'];

const getDashboardSummaryQueryOptions = () => {
  return queryOptions({
    queryKey: getDashboardSummaryQueryKey(),
    queryFn: getDashboardSummary,
  });
};

// Custom hook, ini yang akan digunakan di komponen React
type UseGetDashboardSummaryParams = {
  queryConfig?: QueryConfig<typeof getDashboardSummaryQueryOptions>;
};

export const useGetDashboardSummary = (
  params: UseGetDashboardSummaryParams = {},
) => {
  return useQuery({
    ...getDashboardSummaryQueryOptions(),
    ...params.queryConfig,
  });
};
