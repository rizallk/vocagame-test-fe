// Bg random variant utility function
export const bgRandomVariant = (index: number): string => {
  const variants = [
    'bg-[#4EDEA31A] text-[#4EDEA3] border-[#4EDEA333]',
    'bg-[#FFB4AB1A] text-[#FFB4AB] border-[#FFB4AB33]',
    'bg-[#DDB7FF1A] text-[#DDB7FF] border-[#DDB7FF33]',
    'bg-[#C0C1FF1A] text-[#C0C1FF] border-[#DDB7FF33]',
  ];

  const randomIndex = index % variants.length;
  return variants[randomIndex];
};
