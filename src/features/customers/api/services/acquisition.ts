import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type AcquisitionResponseRaw = {
  id: number;
  month: string;
  month_index: string;
  new_users: string;
  returning_users: string;
};

// Struktur yang digunakan di Frontend
type AcquisitionResponse = {
  id: number;
  month: string;
  monthIndex: string;
  newUsers: string;
  returningUsers: string;
};

// Data Mapper/Adapter, untuk mengubah data mentah dari API menjadi format yang digunakan di Frontend
const mapAcquisitionResponse = (
  data: AcquisitionResponseRaw[],
): AcquisitionResponse[] => {
  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    month: item.month,
    monthIndex: item.month_index,
    newUsers: item.new_users,
    returningUsers: item.returning_users,
  }));
};

export const getAcquisition = async (): Promise<AcquisitionResponse[]> => {
  const response = await axiosInstance.get<AcquisitionResponseRaw[]>(
    '/customers/acquisition',
  );

  return mapAcquisitionResponse(response.data);
};
