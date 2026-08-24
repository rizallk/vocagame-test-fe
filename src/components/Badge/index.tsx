import type { ReactNode } from 'react';

export type badgeVariant =
  | 'default'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'softDanger'
  | 'accent'
  | 'accent2';

type BadgeProps = {
  variant: badgeVariant;
  isBordered?: boolean;
  className?: string;
  children?: ReactNode;
};

const variantClasses: Record<BadgeProps['variant'], string> = {
  default: 'text-body-text border-body-text',
  secondary: 'bg-[#353437] text-body-text-muted border-secondary',
  success: 'bg-[#4EDEA31A] text-[#4EDEA3] border-[#4EDEA333]',
  danger: 'bg-[#93000A] text-[#FFB4AB] border-[#FFB4AB33]',
  softDanger: 'bg-[#FFB4AB1A] text-[#FFB4AB] border-[#FFB4AB33]',
  accent: 'bg-[#DDB7FF1A] text-[#DDB7FF] border-[#DDB7FF33]',
  accent2: 'bg-[#C0C1FF1A] text-[#C0C1FF] border-[#DDB7FF33]',
};

export default function Badge({
  variant,
  isBordered = false,
  className = '',
  children,
}: BadgeProps) {
  return (
    <div
      className={`px-2 py-1 text-xs font-bold ${variantClasses[variant]} ${isBordered ? 'border' : 'border-0'} ${className}`}
    >
      {children}
    </div>
  );
}
