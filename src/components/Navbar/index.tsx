import { appStore } from '@/store/appStore';
import {
  BsFillPersonFill,
  BsGearFill,
  BsList,
  BsPersonCircle,
} from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { CgMenuGridO } from 'react-icons/cg';
import { ImExit } from 'react-icons/im';
import Brand from '../Brand';
import Dropdown from '../Dropdown';

export default function Navbar() {
  const isShowSidebar = appStore((state) => state.isShowSidebar);
  const setIsShowSidebar = appStore((state) => state.setIsShowSidebar);

  return (
    <div
      className={`fixed inset-0 top-0 h-16 p-6 border-b border-secondary bg-body-bg text-body-text-muted z-1 duration-300 ${isShowSidebar ? 'md:ml-0' : 'md:ml-64'}`}
    >
      <div className="flex justify-between items-center h-full">
        {/* Left */}
        <div className="flex items-center">
          {/* Toggle Sidebar */}
          <BsList
            className="cursor-pointer text-2xl mr-4"
            onClick={() => setIsShowSidebar(!isShowSidebar)}
          />
          {/* Logo */}
          <div className="md:hidden">
            <Brand showSubtitle={false} />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center">
          <MdOutlineNotifications className="w-auto h-6 mr-2" />
          <CgMenuGridO className="w-auto h-6" />
          <span className="text-secondary mx-4">|</span>
          <Dropdown
            title="Personal Account"
            titleClasses="hidden md:block"
            icon={<BsPersonCircle className="w-auto h-6 md:hidden" />}
            align="end"
            items={[
              {
                label: 'Profile',
                icon: <BsFillPersonFill />,
                href: '/profile',
              },
              {
                label: 'Settings',
                icon: <BsGearFill />,
                href: '/settings',
              },
              {
                label: 'Sign Out',
                icon: <ImExit />,
                color: 'danger',
                onClick: () => {
                  alert('Sign out');
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
