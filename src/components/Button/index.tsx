import type { ComponentPropsWithoutRef } from 'react';

export default function Button({
  children,
  className,
  disabled,
  ...rest
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={`border border-secondary px-3 py-2  outline-0 duration-200 bg-card-bg flex items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#1a191b] active:bg-[#171718]'} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
