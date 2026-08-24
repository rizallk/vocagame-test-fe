import Badge from '@/components/Badge';
import { Table, Td, Th, Tr } from '@/components/Table';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link, useSearchParams } from 'react-router';
import { useGetTopSpenders } from '../api/hooks/useGetTopSpenders';
import { bgRandomVariant } from '@/utils/bgRandomVariant';
import { formatCurrency } from '@/utils/formatCurrency';
import { topSpendersSegmentVariant } from '../utils/topSpendersSegmentVariant';

export default function TopSpenders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('_page') || '1');
  const limit = 4;

  const { data: res, isLoading } = useGetTopSpenders({
    params: {
      _page: page,
      _limit: limit,
    },
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams((prevParams) => {
      prevParams.set('_page', newPage.toString());
      return prevParams;
    });
  };

  return (
    <Table
      isLoading={isLoading}
      header={
        <>
          <p className="text-xl font-medium">Top Spenders</p>
          <Link to="#" className="text-xs font-bold text-[#C0C1FF]">
            View all customers
          </Link>
        </>
      }
      thead={
        <Tr isHead>
          <Th>CUSTOMER</Th>
          <Th>LTV (LIFETIME VALUE)</Th>
          <Th>LAST ACTIVE</Th>
          <Th>SEGMENT</Th>
          <Th className="text-right">ACTIONS</Th>
        </Tr>
      }
      tbody={
        res?.data && res.data.length > 0 ? (
          res.data.map((v, i) => (
            <Tr key={i}>
              <Td>
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full size-9 flex justify-center items-center text-xs ${bgRandomVariant(i)}`}
                  >
                    {v.avatar}
                  </div>
                  <div>
                    <p>{v.customerName}</p>
                    <p className="text-[11px] font-semibold">{v.email}</p>
                  </div>
                </div>
              </Td>
              <Td className="font-geist-mono text-success">
                {formatCurrency(v.ltv, { showDecimals: true })}
              </Td>
              <Td>{v.lastActive}</Td>
              <Td>
                <Badge
                  variant={topSpendersSegmentVariant(v.segment)}
                  className="w-fit rounded-sm"
                >
                  {v.segment}
                </Badge>
              </Td>
              <Td>
                <div className="flex justify-end">
                  <BsThreeDotsVertical />
                </div>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td
              colSpan={5}
              className="text-center text-sm text-body-text-muted"
            >
              No recent top spenders available.
            </Td>
          </Tr>
        )
      }
      showPagination
      paginationProps={{
        label: 'transactions',
        variant: 'variant-2',
        page,
        limit,
        total: res?.total,
        onPageChange: handlePageChange,
      }}
    />
  );
}
