import Card from '@/components/Card';
import { Switch, ToggleGroup } from 'radix-ui';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function RevenueAnalytics() {
  const [timeRange, setTimeRange] = useState('left');
  const [isComparing, setIsComparing] = useState(false);

  const chartData = timeRange === 'left' ? data30Days : data90Days;

  return (
    <Card variant="variant-1" className="my-4">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div className="left">
          <p className="text-2xl font-medium">Revenue Analytics</p>
          <p className="text-sm text-body-text-muted">
            Daily transaction volume across all platforms
          </p>
        </div>
        <div className="right flex items-center gap-4">
          <ToggleGroup.Root
            className="flex justify-around bg-[#1C1B1D] border border-secondary rounded-lg text-xs font-medium p-1.5 h-10 w-55"
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (value) setTimeRange(value);
            }}
          >
            <ToggleGroup.Item
              value="left"
              className="data-[state=on]:bg-primary data-[state=on]:text-white text-body-text-muted cursor-pointer rounded-sm w-full"
            >
              Last 30 Days
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="right"
              className="data-[state=on]:bg-primary data-[state=on]:text-white text-body-text-muted cursor-pointer rounded-sm w-full"
            >
              90 Days
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <div className="flex items-center gap-3">
            <Switch.Root
              className="relative h-[30px] min-w-[55px] cursor-pointer rounded-full border-secondary border bg-[#1C1B1D] data-[state=checked]:bg-primary"
              checked={isComparing}
              onCheckedChange={setIsComparing}
            >
              <Switch.Thumb className="block size-5.5 translate-x-1 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[27px]" />
            </Switch.Root>
            <p className="text-xs font-medium text-body-text-muted">
              Compare to previous
            </p>
          </div>
        </div>
      </div>

      {/* Area Chart */}
      <div className="h-[320px] mt-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#2A2A2A"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#888888', fontSize: 12 }}
              dy={10}
              interval={0}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis hide domain={['dataMin - 5000', 'dataMax + 10000']} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: '#404040',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />

            {/* Area Data Saat Ini */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              activeDot={{
                r: 6,
                fill: '#22c55e',
                stroke: '#1C1B1D',
                strokeWidth: 3,
              }}
            />

            {/* Area Data Sebelumnya (Hanya muncul jika isComparing true) */}
            {isComparing && (
              <Area
                type="monotone"
                dataKey="previousValue"
                stroke="#6b7280"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
                activeDot={{
                  r: 5,
                  fill: '#6b7280',
                  stroke: '#1C1B1D',
                  strokeWidth: 2,
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

// --- Dummy Data ---
const data30Days = [
  {
    date: 'Oct 01',
    fullDate: 'Oct 01, 2023',
    value: 15000,
    previousValue: 12000,
  },
  {
    date: 'Oct 07',
    fullDate: 'Oct 07, 2023',
    value: 22000,
    previousValue: 18000,
  },
  {
    date: 'Oct 14',
    fullDate: 'Oct 14, 2023',
    value: 41000,
    previousValue: 25000,
  },
  {
    date: 'Oct 21',
    fullDate: 'Oct 21, 2023',
    value: 18000,
    previousValue: 20000,
  },
  {
    date: 'Oct 24',
    fullDate: 'Oct 24, 2023',
    value: 58240,
    previousValue: 35000,
  },
  {
    date: 'Oct 28',
    fullDate: 'Oct 28, 2023',
    value: 45000,
    previousValue: 42000,
  },
  {
    date: 'Nov 01',
    fullDate: 'Nov 01, 2023',
    value: 25000,
    previousValue: 28000,
  },
];

const data90Days = [
  {
    date: 'Aug 01',
    fullDate: 'Aug 01, 2023',
    value: 30000,
    previousValue: 25000,
  },
  {
    date: 'Aug 15',
    fullDate: 'Aug 15, 2023',
    value: 42000,
    previousValue: 38000,
  },
  {
    date: 'Sep 01',
    fullDate: 'Sep 01, 2023',
    value: 35000,
    previousValue: 40000,
  },
  {
    date: 'Sep 15',
    fullDate: 'Sep 15, 2023',
    value: 50000,
    previousValue: 45000,
  },
  {
    date: 'Oct 01',
    fullDate: 'Oct 01, 2023',
    value: 20000,
    previousValue: 18000,
  },
  {
    date: 'Oct 15',
    fullDate: 'Oct 15, 2023',
    value: 65000,
    previousValue: 55000,
  },
  {
    date: 'Nov 01',
    fullDate: 'Nov 01, 2023',
    value: 48000,
    previousValue: 42000,
  },
];

type Items = {
  date: string;
  fullDate: string;
  value: number;
  previousValue: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: Items;
  }[] &
    Items[];
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1B1D] border border-gray-700/50 p-3 rounded-md shadow-lg min-w-[140px]">
        <p className="text-gray-400 text-xs mb-2 font-medium border-b border-gray-700/50 pb-1">
          {payload[0].payload.fullDate}
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
              <span className="text-gray-300 text-xs">Current</span>
            </div>
            <span className="text-[#22c55e] font-semibold text-sm">
              $
              {payload[0].value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Render nilai perbandingan jika toggle aktif dan data ke-2 tersedia */}
          {payload[1] && (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                <span className="text-gray-400 text-xs">Previous</span>
              </div>
              <span className="text-gray-400 font-semibold text-sm">
                $
                {payload[1].value.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};
