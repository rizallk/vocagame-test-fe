export const calcPercentageChange = (
  current: number = 0,
  previous: number = 0,
) => {
  if (previous === 0 || current === 0) return 0;
  return ((current - previous) / previous) * 100;
};
