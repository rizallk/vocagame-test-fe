import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useGetActivityFeed } from '../api/hooks/useGetActivityFeed';
import SkeletonLoader from '@/components/SkeletonLoader';
import {
  activityFeedBadgeVariant,
  activityFeedIconVariant,
} from '../utils/activityFeed';

export default function ActivityFeed() {
  const { data, isLoading } = useGetActivityFeed({ params: { _limit: 4 } });

  return (
    <Card variant="variant-1">
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium">Activity Feed</p>
        <Badge variant="accent" className="text-[10px] font-bold rounded-sm">
          LIVE
        </Badge>
      </div>
      {isLoading ? (
        <SkeletonLoader />
      ) : data ? (
        <>
          {data.map((v, i) => (
            <div className="flex gap-4 my-6" key={i}>
              <div className="flex flex-col items-center justify-center">
                <Badge
                  variant={activityFeedBadgeVariant(v.type)}
                  className="rounded-full px-3"
                >
                  {activityFeedIconVariant(v.type)}
                </Badge>
                <div className="w-px h-5 bg-secondary flex-1 mt-3"></div>
              </div>
              <div className="right">
                <p className="text-sm">{v.title}</p>
                <p className="text-[11px] font-semibold text-body-text-muted">
                  {v.description} • {v.time}
                </p>
              </div>
            </div>
          ))}
          <Button className="w-full text-xs rounded-lg justify-center">
            Clear All History
          </Button>
        </>
      ) : (
        <p className="text-center text-sm text-body-text-muted">
          No activity feed data available.
        </p>
      )}
    </Card>
  );
}
