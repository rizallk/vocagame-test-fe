import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import { formatCurrency } from '@/utils/formatCurrency';
import { BsThreeDots } from 'react-icons/bs';
import { useGetProductPerformance } from '../api/hooks/useGetProductPerformance';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function ProductPerformance() {
  const {
    data,
    isLoading,
    error: getProductPerformanceError,
  } = useGetProductPerformance({
    params: {
      _limit: 5,
    },
  });

  return (
    <Card variant="variant-1">
      <div className="flex justify-between items-center mb-6">
        <p className="text-xl text-body-text font-medium">
          Product Performance
        </p>
        <BsThreeDots className="w-4 h-auto" />
      </div>
      {getProductPerformanceError ? (
        <p className="text-center text-sm text-red-500">
          {getProductPerformanceError?.message?.toString() ||
            getProductPerformanceError?.toString() ||
            'An error occurred while fetching product performance data.'}
        </p>
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          <SkeletonLoader />
        </div>
      ) : data && data.length > 0 ? (
        <div className="flex flex-col gap-6">
          {data.map((v, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2 text-xs font-medium text-body-text">
                <p>{v.name}</p>
                <p>{formatCurrency(v.revenue, { compact: true })}</p>
              </div>
              <ProgressBar
                min={v.revenue}
                max={v.maxRevenue}
                variant="success"
                opacity={1 - i * 0.15}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-body-text-muted">
          No product performance data available.
        </p>
      )}
    </Card>
  );
}
