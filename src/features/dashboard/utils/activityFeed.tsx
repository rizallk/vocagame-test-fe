import type { badgeVariant } from '@/components/Badge';
import type { ReactNode } from 'react';
import { BsKey } from 'react-icons/bs';
import {
  MdOutlineAccountBalanceWallet,
  MdOutlinePersonAdd,
  MdOutlineWarningAmber,
} from 'react-icons/md';

const activityFeedBadgeVariant = (status: string): badgeVariant => {
  switch (status) {
    case 'payout':
      return 'success';
    case 'org':
      return 'secondary';
    case 'security':
      return 'accent';
    case 'alert':
      return 'danger';
    default:
      return 'default';
  }
};

const activityFeedIconVariant = (status: string): ReactNode => {
  switch (status) {
    case 'payout':
      return <MdOutlineAccountBalanceWallet className="h-4 w-auto" />;
    case 'org':
      return <MdOutlinePersonAdd className="h-4 w-auto" />;
    case 'security':
      return <BsKey className="h-4 w-auto" />;
    case 'alert':
      return <MdOutlineWarningAmber className="h-4 w-auto" />;
    default:
      return <></>;
  }
};

export { activityFeedBadgeVariant, activityFeedIconVariant };
