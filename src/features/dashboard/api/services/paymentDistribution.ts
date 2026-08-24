import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type PaymentDistributionResponseRaw = {
  id: number;
  method: string;
  percentage: number;
  color: string;
};

export const getPaymentDistribution = async (): Promise<
  PaymentDistributionResponseRaw[]
> => {
  const response = await axiosInstance.get<PaymentDistributionResponseRaw[]>(
    '/payment-distribution',
  );

  return response.data;
};
