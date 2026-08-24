import Badge from '@/components/Badge';
import Card from '@/components/Card';
import { formatCommas } from '@/utils/formatCommas';
import { MdOutlinePersonAddAlt, MdOutlinePersonOff } from 'react-icons/md';
import { useGetCustomersSummary } from '../api/hooks/useGetCustomersSummary';
import SkeletonLoader from '@/components/SkeletonLoader';
import { calcPercentageChange } from '@/utils/calcPercentageChange';
import { BiCheckShield } from 'react-icons/bi';

export default function SummaryCards() {
  const { data, isLoading } = useGetCustomersSummary();
  const { newSegments, retaining, churned } = data || {};

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      <Card variant="variant-2" className="overflow-hidden">
        <div className="flex gap-4 items-start justify-between">
          <div>
            <p className="text-xs text-body-text-muted font-medium">
              NEW SEGMENTS
            </p>
            <div className="flex items-end gap-3">
              <p className="text-[40px] font-semibold">
                {formatCommas(newSegments?.current)}
              </p>
              <Badge
                variant="success"
                className="flex items-center rounded-full -translate-y-4"
              >
                +
                {calcPercentageChange(
                  newSegments?.current,
                  newSegments?.previous,
                ).toFixed(1)}
                %
              </Badge>
            </div>
          </div>
          <MdOutlinePersonAddAlt className="w-20 h-auto text-body-text/10" />
        </div>
        <p className="text-sm text-body-text-muted">
          Customers acquired in the last 7 days
        </p>
      </Card>

      <Card variant="variant-2" className="overflow-hidden">
        <div className="flex gap-4 items-start justify-between">
          <div>
            <p className="text-xs text-body-text-muted font-medium">
              RETAINING
            </p>
            <div className="flex items-end gap-3">
              <p className="text-[40px] font-semibold">
                {formatCommas(retaining?.current)}
              </p>
              <Badge
                variant="success"
                className="flex items-center rounded-full -translate-y-4"
              >
                +
                {calcPercentageChange(
                  retaining?.current,
                  retaining?.previous,
                ).toFixed(1)}
                %
              </Badge>
            </div>
          </div>
          <BiCheckShield className="w-20 h-auto text-body-text/10" />
        </div>
        <p className="text-sm text-body-text-muted">
          Loyal users with 3+ repeat actions
        </p>
      </Card>

      <Card variant="variant-2" className="overflow-hidden">
        <div className="flex gap-4 items-start justify-between">
          <div>
            <p className="text-xs text-body-text-muted font-medium">CHURNED</p>
            <div className="flex items-end gap-3">
              <p className="text-[40px] font-semibold text-[#FFB4AB]">
                {formatCommas(churned?.current)}
              </p>
              <Badge
                variant="softDanger"
                className="flex items-center rounded-full -translate-y-4"
              >
                +
                {calcPercentageChange(
                  churned?.current,
                  churned?.previous,
                ).toFixed(1)}
                %
              </Badge>
            </div>
          </div>
          <MdOutlinePersonOff className="w-20 h-auto text-body-text/10" />
        </div>
        <p className="text-sm text-body-text-muted">
          Users inactive for over 30 days
        </p>
      </Card>
    </div>
  );
}
