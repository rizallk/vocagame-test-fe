import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type InputProps = {
  icon?: ReactNode;
};

export default function Input({
  icon,
  className = '',
  ...rest
}: InputProps & ComponentPropsWithoutRef<'input'>) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3.5 flex items-center text-body-text-muted transform top-0 translate-y-1/2 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={`bg-[#0E0E10] focus:border-[#5f5e72] duration-200 rounded-lg border border-secondary outline-0 px-3.5 py-2 w-full ${className} ${icon ? 'pl-10' : ''}`}
        {...rest}
      />
    </div>
  );
}
