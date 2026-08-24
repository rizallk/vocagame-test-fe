import type { badgeVariant } from '@/components/Badge';

export const topSpendersSegmentVariant = (status: string): badgeVariant => {
  switch (status) {
    case 'Whale':
      return 'accent';
    case 'High Value':
      return 'softDanger';
    case 'Power User':
      return 'accent2';
    default:
      return 'default';
  }
};
