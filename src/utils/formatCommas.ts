export const formatCommas = (
  value: number | string | undefined | null,
  maxDecimals: number = 20,
): string => {
  if (value === null || value === undefined) return '0';

  // Konversi input ke tipe Number
  const numericValue = Number(value);

  // Jika input bukan angka yang valid, kembalikan input aslinya
  if (isNaN(numericValue)) return String(value);

  return numericValue.toLocaleString('en-US', {
    maximumFractionDigits: maxDecimals,
  });
};
