import { create } from 'zustand';

type ToastOptions = {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
};

type ToastState = {
  open: boolean;
  toastData: ToastOptions;
  showToast: (options: ToastOptions) => void;
  setOpen: (open: boolean) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  toastData: { title: '' },
  showToast: (options) => set({ toastData: options, open: true }),
  setOpen: (open) => set({ open }),
}));
