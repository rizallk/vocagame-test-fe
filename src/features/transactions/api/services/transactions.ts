import { axiosInstance } from '@/lib/axios';

// Struktur data mentah dari API
type TransactionResponseRaw = {
  id: string;
  transaction_id: string;
  customer_name: string;
  customer_email: string;
  avatar: string;
  amount: number;
  method: string;
  status: string;
  date: string;
};

// Struktur yang digunakan di Frontend
export type TransactionResponse = {
  id: string;
  transactionId: string;
  customerName: string;
  customerEmail: string;
  avatar: string;
  amount: number;
  method: string;
  status: string;
  date: string;
};

// Struktur query params
export type TransactionsQueryParams = {
  _page?: number;
  _limit?: number;
  status?: string;
  method?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
};

export type PaginatedTransactions = {
  data: TransactionResponse[];
  total: number;
};

// Data Mapping/Adapter
const mapTransactionResponse = (
  data: TransactionResponseRaw[],
): TransactionResponse[] => {
  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    transactionId: item.transaction_id,
    customerName: item.customer_name,
    customerEmail: item.customer_email,
    avatar: item.avatar,
    amount: item.amount,
    method: item.method,
    status: item.status,
    date: item.date,
  }));
};

export const getTransactions = async (
  params?: TransactionsQueryParams,
): Promise<PaginatedTransactions> => {
  const { search, startDate, endDate, _page, _limit, ...restParams } =
    params || {};

  const isFrontendFiltering = Boolean(search || startDate || endDate);

  const apiParams: TransactionsQueryParams = { ...restParams };

  if (!isFrontendFiltering) {
    apiParams._page = _page;
    apiParams._limit = _limit;
  }

  const response = await axiosInstance.get<TransactionResponseRaw[]>(
    '/transactions',
    { params: apiParams },
  );

  let rawData = response.data;
  let total = parseInt(response.headers['x-total-count'] || '0', 10);

  // Menerapkan filtering dan paginasi di sisi frtonend karena API tidak menyediakan filter by search dan date range
  if (isFrontendFiltering) {
    // Filter Pencarian (Search)
    if (search) {
      const lowerSearch = search.toLowerCase();
      rawData = rawData.filter(
        (item) =>
          item.customer_name.toLowerCase().includes(lowerSearch) ||
          item.transaction_id.toLowerCase().includes(lowerSearch),
      );
    }

    // Filter Tanggal
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();

      // Set waktu endDate ke akhir hari (23:59:59) agar inklusif
      if (endDate) {
        end.setHours(23, 59, 59, 999);
      }

      rawData = rawData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }

    // Set total halaman (untuk komponen Paginasi) berdasarkan sisa data yang lolos filter
    total = rawData.length;

    // Paginasi Manual
    // Potong array sesuai halaman agar UI tabel tetap rapi
    const page = _page || 1;
    const limit = _limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    rawData = rawData.slice(startIndex, endIndex);
  }

  return {
    data: mapTransactionResponse(rawData),
    total,
  };
};
