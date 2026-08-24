import Card from '@/components/Card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetAcquisition } from '../api/hooks/useGetAcquisition';
import SkeletonLoader from '@/components/SkeletonLoader';
import { formatCommas } from '@/utils/formatCommas';

// Data dummy disesuaikan untuk membentuk kurva persilangan seperti pada desain Figma
// const data = [
//   { month: 'JAN', newUsers: 25, returningUsers: 15 },
//   { month: 'FEB', newUsers: 28, returningUsers: 18 },
//   { month: 'MAR', newUsers: 25, returningUsers: 22 },
//   { month: 'APR', newUsers: 35, returningUsers: 45 },
//   { month: 'MAY', newUsers: 65, returningUsers: 55 },
//   { month: 'JUN', newUsers: 100, returningUsers: 45 },
// ];

export default function UserAcquisitionRetention() {
  const { data, isLoading } = useGetAcquisition();

  return (
    <Card variant="variant-2" className="lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl">User Acquisition & Retention</p>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <div className="size-3 bg-[#C0C1FF] rounded-xs"></div>
            <span className="text-xs text-body-text-muted">New</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 bg-success rounded-xs"></div>
            <span className="text-xs text-body-text-muted">Returning</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        // Area Chart
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C0C1FF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#C0C1FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34D399" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="#334155" opacity={0.4} />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                dy={10}
                interval={0}
                padding={{ left: 5, right: 5 }}
              />
              <YAxis hide />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '12px',
                }}
                itemStyle={{ color: '#F8FAFC' }}
                cursor={{
                  stroke: '#475569',
                  strokeWidth: 1,
                  strokeDasharray: '3 3',
                }}
                formatter={(value, name) => {
                  const formattedName =
                    name === 'newUsers' ? 'New' : 'Returning';
                  const rawValue = Array.isArray(value) ? value[0] : value;
                  const formattedValue = formatCommas(Number(rawValue) || 0);
                  return [formattedValue, formattedName];
                }}
              />

              <Area
                type="monotone"
                dataKey="returningUsers"
                stroke="#34D399"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorReturning)"
                activeDot={{
                  r: 6,
                  fill: '#34D399',
                  stroke: '#1E293B',
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="newUsers"
                stroke="#C0C1FF"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorNew)"
                activeDot={{
                  r: 6,
                  fill: '#C0C1FF',
                  stroke: '#1E293B',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
