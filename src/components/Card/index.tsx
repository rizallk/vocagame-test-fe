import type { ReactNode } from 'react';

type CardProps = {
  variant: 'variant-1' | 'variant-2';
  children?: ReactNode;
  className?: string;
};

const variantClasses: Record<CardProps['variant'], string> = {
  'variant-1': 'bg-card-bg border-secondary',
  'variant-2': 'bg-[#18181BB2] border-[#27272A]',
};

export default function Card({ variant, className = '', children }: CardProps) {
  return (
    <div
      className={`p-5 rounded-xl border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
