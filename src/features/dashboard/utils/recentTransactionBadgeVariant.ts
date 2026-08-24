import type { badgeVariant } from '@/components/Badge';

export const recentTransactionBadgeVariant = (status: string): badgeVariant => {
  switch (status) {
    case 'success':
      return 'success';
    case 'pending':
      return 'secondary';
    case 'failed':
      return 'danger';
    default:
      return 'default';
  }
};
