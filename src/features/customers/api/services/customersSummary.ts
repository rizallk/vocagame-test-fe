import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type Items = {
  current: number;
  previous: number;
};

type CustomersSummaryResponseRaw = {
  active_users_online: Items;
  new_segments: Items;
  retaining: Items;
  churned: Items;
};

// Struktur yang digunakan di Frontend
type CustomersSummaryResponse = {
  activeUsersOnline: Items;
  newSegments: Items;
  retaining: Items;
  churned: Items;
};

// Data Mapping/Adapter, untuk mengubah data mentah dari API menjadi format yang digunakan di Frontend
const mapCustomersSummaryResponse = (
  data: CustomersSummaryResponseRaw,
): CustomersSummaryResponse => {
  return {
    activeUsersOnline: data.active_users_online,
    newSegments: data.new_segments,
    retaining: data.retaining,
    churned: data.churned,
  };
};

// Core
export const getCustomersSummary =
  async (): Promise<CustomersSummaryResponse> => {
    const response =
      await axiosInstance.get<CustomersSummaryResponseRaw>(
        '/customers/summary',
      );

    return mapCustomersSummaryResponse(response.data);
  };
