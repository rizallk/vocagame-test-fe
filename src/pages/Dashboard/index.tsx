import ActivityFeed from '@/features/dashboard/components/ActivityFeed';
import PaymentDistribution from '@/features/dashboard/components/PaymentDistribution';
import ProductPerformance from '@/features/dashboard/components/ProductPerformance';
import RecentTransactions from '@/features/dashboard/components/RecentTransactions';
import RevenueAnalytics from '@/features/dashboard/components/RevenueAnalytics';
import SummaryCards from '@/features/dashboard/components/SummaryCards';

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <SummaryCards />
      <RevenueAnalytics />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ProductPerformance />
        <PaymentDistribution />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentTransactions />
        <ActivityFeed />
      </div>
    </div>
  );
}
