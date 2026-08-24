import { DropdownMenu } from 'radix-ui';
import { Link } from 'react-router';
import type { MouseEventHandler, ReactNode } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export type DropdownItem = {
  label: string;
  icon?: ReactNode;
  color?: 'success' | 'danger';
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type DropdownProps = {
  title: string;
  icon?: ReactNode;
  items?: DropdownItem[];
  align?: 'center' | 'end' | 'start';
  titleClasses?: string;
  triggerClasses?: string;
  iconCaretDownClasses?: string;
  children?: ReactNode;
};

const textColorClasses: Record<NonNullable<DropdownItem['color']>, string> = {
  success: 'text-green-500',
  danger: 'text-red-500',
};

export default function Dropdown({
  title,
  icon,
  items = [],
  align = 'start',
  titleClasses = '',
  triggerClasses = '',
  iconCaretDownClasses = '',
  children,
}: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          className={`flex items-center gap-2 cursor-pointer duration-200 hover:text-body-text relative ${triggerClasses}`}
        >
          {icon} <span className={titleClasses}>{title}</span>{' '}
          <BsChevronDown className={`h-auto w-3 ${iconCaretDownClasses}`} />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          className="bg-card-bg border border-secondary rounded-xl p-2 z-10 mt-1 shadow-lg"
        >
          {items.length > 0 &&
            items.map((item, i) => {
              const textColorClass = item.color
                ? textColorClasses[item.color]
                : '';
              const itemStyle = `cursor-pointer flex items-center gap-3 ${textColorClass}`;

              return (
                <DropdownMenu.Item
                  key={i}
                  className="hover:bg-secondary/30 rounded-lg text-body-text-muted py-2 px-3 outline-0 cursor-pointer"
                  asChild
                >
                  {item.href ? (
                    <Link to={item.href} className={itemStyle}>
                      {item.icon} {item.label}
                    </Link>
                  ) : (
                    <button className={itemStyle} onClick={item.onClick}>
                      {item.icon} {item.label}
                    </button>
                  )}
                </DropdownMenu.Item>
              );
            })}
          {items.length === 0 ? children : null}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
