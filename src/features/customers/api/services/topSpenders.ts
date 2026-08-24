import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type TopSpendersResponseRaw = {
  id: number;
  customer_name: string;
  email: string;
  avatar: string;
  ltv: string;
  last_active: string;
  segment: string;
};

// Struktur yang digunakan di Frontend
type TopSpendersResponse = {
  id: number;
  customerName: string;
  email: string;
  avatar: string;
  ltv: string;
  lastActive: string;
  segment: string;
};

// Struktur data query params
export type TopSpendersQueryParams = {
  _page?: number;
  _limit?: number;
  segment?: string;
};

type PaginatedTopSpenders = {
  data: TopSpendersResponse[];
  total: number;
};

// Data Mapper/Adapter, untuk mengubah data mentah dari API menjadi format yang digunakan di Frontend
const mapTopSpendersResponse = (
  data: TopSpendersResponseRaw[],
): TopSpendersResponse[] => {
  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    customerName: item.customer_name,
    email: item.email,
    avatar: item.avatar,
    ltv: item.ltv,
    lastActive: item.last_active,
    segment: item.segment,
  }));
};

export const getTopSpenders = async (
  params?: TopSpendersQueryParams,
): Promise<PaginatedTopSpenders> => {
  const response = await axiosInstance.get<TopSpendersResponseRaw[]>(
    '/customers/top-spenders',
    { params },
  );

  const total = parseInt(response.headers['x-total-count'] || '0', 10);

  return {
    data: mapTopSpendersResponse(response.data),
    total,
  };
};
