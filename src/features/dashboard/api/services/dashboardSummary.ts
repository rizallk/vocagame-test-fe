import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type Items = {
  current: number;
  previous: number;
};

type DashboardSummaryResponseRaw = {
  active_users: Items;
  conversion_rate: Items;
  total_orders: Items;
  total_revenue: Items;
};

// Struktur yang digunakan di Frontend
type DashboardSummaryResponse = {
  activeUsers: Items;
  conversionRate: Items;
  totalOrders: Items;
  totalRevenue: Items;
};

// Data Mapping/Adapter, untuk mengubah data mentah dari API menjadi format yang digunakan di Frontend
const mapDashboardSummaryResponse = (
  data: DashboardSummaryResponseRaw,
): DashboardSummaryResponse => {
  return {
    activeUsers: data.active_users,
    conversionRate: data.conversion_rate,
    totalOrders: data.total_orders,
    totalRevenue: data.total_revenue,
  };
};

// Core
export const getDashboardSummary =
  async (): Promise<DashboardSummaryResponse> => {
    const response =
      await axiosInstance.get<DashboardSummaryResponseRaw>(
        '/dashboard/summary',
      );

    return mapDashboardSummaryResponse(response.data);
  };
