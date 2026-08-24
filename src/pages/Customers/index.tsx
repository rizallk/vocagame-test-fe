import SkeletonLoader from '@/components/SkeletonLoader';
import { useGetCustomersSummary } from '@/features/customers/api/hooks/useGetCustomersSummary';
import GeographicalMap from '@/features/customers/components/GeographicalMap';
import SummaryCards from '@/features/customers/components/SummaryCards';
import TopSpenders from '@/features/customers/components/TopSpenders';
import UserAcquisitionRetention from '@/features/customers/components/UserAcquisitionRetention';
import { formatCommas } from '@/utils/formatCommas';

export default function Customers() {
  const { data, isLoading } = useGetCustomersSummary();

  return (
    <div className="customers-page">
      <h1 className="text-[32px] font-semibold">Customer Insights</h1>
      {isLoading ? (
        <SkeletonLoader className="mb-6" itemNumber={1} />
      ) : (
        <p className="text-body-text-muted mb-6 flex items-center">
          <span className="size-2 bg-success rounded-full -translate-y-0.5"></span>{' '}
          <span className="text-success font-bold mx-2">
            {formatCommas(data?.activeUsersOnline?.current)}
          </span>{' '}
          active users currently online
        </p>
      )}

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <UserAcquisitionRetention />
        <GeographicalMap />
      </div>

      <TopSpenders />
    </div>
  );
}
