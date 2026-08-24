import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type GeographicalResponseRaw = {
  id: number;
  region: string;
  user_count: number;
  percentage: number;
  color: string;
};

// Struktur yang digunakan di Frontend
export type GeographicalResponse = {
  id: number;
  region: string;
  userCount: number;
  percentage: number;
  color: string;
};

// Data Mapper/Adapter, untuk mengubah data mentah dari API menjadi format yang digunakan di Frontend
const mapGeographicalResponse = (
  data: GeographicalResponseRaw[],
): GeographicalResponse[] => {
  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    region: item.region,
    userCount: item.user_count,
    percentage: item.percentage,
    color: item.color,
  }));
};

export const getGeographical = async (): Promise<GeographicalResponse[]> => {
  const response =
    await axiosInstance.get<GeographicalResponseRaw[]>('/customers/geo');

  return mapGeographicalResponse(response.data);
};
