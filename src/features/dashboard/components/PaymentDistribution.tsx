import Card from '@/components/Card';
import { IoFilterSharp } from 'react-icons/io5';
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  type PieSectorShapeProps,
} from 'recharts';
import { useGetPaymentDistribution } from '../api/hooks/useGetPaymentDistribution';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function PaymentDistribution() {
  const { data, isLoading } = useGetPaymentDistribution();

  return (
    <Card variant="variant-1">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-medium text-body-text">
          Payment Distribution
        </p>
        <IoFilterSharp className="h-4.5 w-auto" />
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="flex items-center">
          {/* Bagian Chart Area */}
          <div className="relative w-[55%] h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={0}
                  dataKey="percentage"
                  stroke="none" // Menghilangkan garis tepi bawaan
                  shape={renderPieShape}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Label Custom di Tengah Donut Chart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] font-medium text-body-text-muted">
                Top Method
              </span>
              <span className="text-[20px] font-bold text-[#C0C1FF] mt-0.5">
                E-Wallet
              </span>
            </div>
          </div>

          {/* Bagian Custom Legend */}
          <div className="w-[45%] flex flex-col justify-center gap-4 pl-2 pr-4">
            {data?.map((v, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Indikator Titik Warna */}
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: v.color }}
                  />
                  <span className="text-sm text-gray-200">{v.method}</span>
                </div>
                <span className="text-sm text-gray-200">{v.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

const renderPieShape = (props: PieSectorShapeProps) => {
  const { payload, ...rest } = props;
  return <Sector {...rest} fill={payload?.color} />;
};
