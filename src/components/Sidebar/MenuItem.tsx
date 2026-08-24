import { appStore } from '@/store/appStore';
import type { ElementType } from 'react';
import { Link, useLocation } from 'react-router';

type MenuItemProps = {
  label: string;
  href: string;
  icon: ElementType;
};

export default function MenuItem({ label, href, icon: Icon }: MenuItemProps) {
  const setIsShowSidebar = appStore((state) => state.setIsShowSidebar);
  const location = useLocation();
  const isActive = location?.pathname === href;

  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-4 py-3 no-underline text-body-text-muted font-medium cursor-pointer transition-[background-color] duration-300 ${isActive ? 'bg-[#c0c1ff0d] text-primary border-primary border-e-2' : 'bg-transparent hover:bg-[#c0c1ff0d] active:bg-[#c0c1ff15]'}`}
      onClick={() => setIsShowSidebar(false)}
    >
      <Icon className={`w-auto h-6 ${isActive ? 'text-primary' : ''}`} />
      <span>{label}</span>
    </Link>
  );
}
