type formatCurrencyOptions = {
  currency?: 'IDR' | 'USD';
  locale?: string;
  showDecimals?: boolean;
  compact?: boolean;
};

export const formatCurrency = (
  value: number | string,
  options: formatCurrencyOptions = {},
): string => {
  // Default values
  const {
    currency = 'USD',
    locale = currency === 'IDR' ? 'id-ID' : 'en-US',
    showDecimals = false,
    compact = false,
  } = options;

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) return '0';

  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : compact ? 1 : 0,
  }).format(numericValue);

  return compact ? formatted.replace('K', 'k') : formatted;
};
