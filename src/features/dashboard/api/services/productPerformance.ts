import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type ProductPerformanceResponseRaw = {
  id: number;
  name: string;
  revenue: number;
  max_revenue: number;
};

// Struktur yang digunakan di Frontend
type ProductPerformanceResponse = {
  id: number;
  name: string;
  revenue: number;
  maxRevenue: number;
};

// Struktur query params
export type ProductPerformanceQueryParams = {
  _limit?: number;
};

// Data Mapping/Adapter, untuk mengubah data mentah dari API menjadi format yang digunakan di Frontend
const mapProductPerformanceResponse = (
  data: ProductPerformanceResponseRaw[],
): ProductPerformanceResponse[] => {
  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    revenue: item.revenue,
    maxRevenue: item.max_revenue,
  }));
};

export const getProductPerformance = async (
  params?: ProductPerformanceQueryParams,
): Promise<ProductPerformanceResponse[]> => {
  const response = await axiosInstance.get<ProductPerformanceResponseRaw[]>(
    '/product-performance',
    { params },
  );

  return mapProductPerformanceResponse(response.data);
};
