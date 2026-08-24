import { getLocalStorage } from '@/utils/localStorage';
import { create } from 'zustand';

type MainStore = {
  isShowSidebar: boolean;
  setIsShowSidebar: (state: boolean) => void;
};

export const appStore = create<MainStore>((set) => ({
  isShowSidebar: getLocalStorage({
    key: 'isShowSidebar',
    initValue: false,
  }),
  setIsShowSidebar: (newIsShowSidebar) => {
    localStorage.setItem('isShowSidebar', JSON.stringify(newIsShowSidebar));
    set({ isShowSidebar: newIsShowSidebar });
  },
}));
