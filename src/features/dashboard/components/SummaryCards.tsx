import Badge from '@/components/Badge';
import Card from '@/components/Card';
import { calcPercentageChange } from '@/utils/calcPercentageChange';
import { formatCommas } from '@/utils/formatCommas';
import { formatCurrency } from '@/utils/formatCurrency';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { useEffect } from 'react';
import { useToastStore } from '@/store/toastStore';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useGetDashboardSummary } from '../api/hooks/useGetDashboardSummary';

export default function SummaryCards() {
  const showToast = useToastStore((state) => state.showToast);
  const { data, isLoading, error: getSummaryError } = useGetDashboardSummary();
  const { totalRevenue, totalOrders, activeUsers, conversionRate } = data || {};

  useEffect(() => {
    if (getSummaryError) {
      showToast({
        title: 'Error!',
        description:
          getSummaryError?.message?.toString() ||
          getSummaryError?.toString() ||
          'An error occurred while fetching summary data.',
        variant: 'error',
      });
    }
  }, [getSummaryError]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} variant="variant-1">
            <SkeletonLoader />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="variant-1" className="overflow-auto">
        <div className="flex justify-between mb-2">
          <div className="left">
            <p className="text-xs text-body-text-muted font-medium">
              TOTAL REVENUE
            </p>
          </div>
          <div className="right">
            <Badge
              variant="success"
              className="flex items-center gap-2 rounded-sm"
            >
              <FaArrowTrendUp />{' '}
              {calcPercentageChange(
                totalRevenue?.current,
                totalRevenue?.previous,
              ).toFixed(1)}
              %
            </Badge>
          </div>
        </div>
        <p className="text-2xl font-medium mb-4">
          {formatCurrency(totalRevenue?.current || 0)}
        </p>
        <img src="/svgs/total-revenue-graphic.svg" className="w-full h-auto" />
      </Card>

      <Card variant="variant-1">
        <div className="flex justify-between mb-2">
          <div className="left">
            <p className="text-xs text-body-text-muted font-medium">
              TOTAL ORDERS
            </p>
          </div>
          <div className="right">
            <Badge
              variant="success"
              className="flex items-center gap-2 rounded-sm"
            >
              <FaArrowTrendUp />
              {calcPercentageChange(
                totalOrders?.current,
                totalOrders?.previous,
              ).toFixed(1)}
              %
            </Badge>
          </div>
        </div>
        <p className="text-2xl font-medium mb-4">
          {formatCommas(totalOrders?.current)}
        </p>
        <img src="/svgs/total-orders-graphic.svg" className="w-full h-auto" />
      </Card>

      <Card variant="variant-1">
        <div className="flex justify-between mb-2">
          <div className="left">
            <p className="text-xs text-body-text-muted font-medium">
              ACTIVE USERS
            </p>
          </div>
          <div className="right">
            <Badge
              variant="success"
              className="flex items-center gap-2 rounded-sm"
            >
              <FaArrowTrendUp />{' '}
              {calcPercentageChange(
                activeUsers?.current,
                activeUsers?.previous,
              ).toFixed(1)}
              %
            </Badge>
          </div>
        </div>
        <p className="text-2xl font-medium mb-4">
          {formatCommas(activeUsers?.current)}
        </p>
        <img src="/svgs/total-active-users.svg" className="w-full h-auto" />
      </Card>

      <Card variant="variant-1">
        <div className="flex justify-between mb-2">
          <div className="left">
            <p className="text-xs text-body-text-muted font-medium">
              CONVERSION
            </p>
          </div>
          <div className="right">
            <Badge
              variant="danger"
              className="flex items-center gap-2 rounded-sm"
            >
              <FaArrowTrendDown />{' '}
              {calcPercentageChange(
                conversionRate?.current,
                conversionRate?.previous,
              ).toFixed(1)}
              %
            </Badge>
          </div>
        </div>
        <p className="text-2xl font-medium mb-4">
          {formatCommas(conversionRate?.current)}%
        </p>
        <img src="/svgs/conversion.svg" className="w-full h-auto" />
      </Card>
    </div>
  );
}
