import { appStore } from '@/store/appStore';
import MenuItem from './MenuItem';
import { MdOutlineDashboard, MdOutlinePeopleAlt } from 'react-icons/md';
import Brand from '../Brand';
import { BsCashStack, BsXLg } from 'react-icons/bs';
import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Sidebar() {
  const isShowSidebar = appStore((state) => state.isShowSidebar);
  const setIsShowSidebar = appStore((state) => state.setIsShowSidebar);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Jika ukuran layar adalah desktop, sidebar akan otomatis terbuka dan body auto scroll
  useEffect(() => {
    if (isDesktop) {
      setIsShowSidebar(false);
      document.body.style.overflowY = 'auto';
    }
  }, [isDesktop]);

  // Jika ukuran layar adalah mobile, ketika sidebar open maka sembunyikan overflowY, begitu sebaliknya
  useEffect(() => {
    if (!isDesktop) {
      // Mobile
      document.body.style.overflowY = isShowSidebar ? 'hidden' : 'auto';
    }
  }, [isShowSidebar]);

  return (
    /* Sidebar wrapper */
    <div
      className={`absolute w-64 shrink-0 duration-300 md:relative ${isShowSidebar ? 'ml-0 md:-ml-64' : '-ml-64 md:ml-0'}`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 duration-300 cursor-pointer md:hidden ${
          isShowSidebar
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsShowSidebar(false)}
      />

      {/* Sidebar content */}
      <div className="fixed h-screen w-64 z-50 bg-body-bg border-e border-e-secondary p-4">
        {/* Logo */}
        <Brand />

        {/* Menu */}
        <div className="relative mt-8 flex flex-col gap-1.5 h-[calc(100vh-185px)] overflow-y-auto">
          <MenuItem
            label="Dashboard"
            href="/dashboard"
            icon={MdOutlineDashboard}
          />
          <MenuItem
            label="Transactions"
            href="/transactions"
            icon={BsCashStack}
          />
          <MenuItem
            label="Customers"
            href="/customers"
            icon={MdOutlinePeopleAlt}
          />
        </div>
      </div>

      {/* User Info */}
      <div className="fixed z-51 w-64 bottom-0">
        <div className="flex gap-4 p-4 border-t border-t-secondary">
          <img
            src="/images/user-photo.jpg"
            className="h-full w-8 rounded-full border border-secondary"
          />
          <div>
            <div className="text-xs font-bold text-body-text">Admin Panel</div>
            <div className="text-[11px] text-body-text-muted">user_root</div>
          </div>
        </div>
      </div>

      {/* Close icon (for mobile) */}
      <BsXLg
        className={`text-white/30 duration-300 fixed top-1 left-0 text-4xl md:hidden ${isShowSidebar ? 'ml-65 z-30 opacity-100' : 'ml-0 z-0 opacity-0'}`}
      />
    </div>
  );
}
