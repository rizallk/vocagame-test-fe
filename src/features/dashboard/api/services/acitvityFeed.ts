import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type ActivityFeedResponseRaw = {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  severity: string;
};

export type ActivityFeedQueryParams = {
  _limit?: number;
};

export const getActivityFeed = async (
  params?: ActivityFeedQueryParams,
): Promise<ActivityFeedResponseRaw[]> => {
  const response = await axiosInstance.get<ActivityFeedResponseRaw[]>(
    '/activity-feed',
    { params },
  );

  return response.data;
};
