import { useToastStore } from '@/store/toastStore';
import { Toast } from 'radix-ui';

export default function GlobalToast() {
  const { open, toastData, setOpen } = useToastStore();
  const { title, description, variant } = toastData;

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={`grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] ${variant === 'success' ? 'border-l-4 border-green-500' : ''} ${variant === 'error' ? 'border-l-4 border-red-500' : ''}`}
        data-state={open ? 'open' : 'closed'}
        data-swipe="move"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title
          className={`mb-[5px] text-[15px] font-medium [grid-area:_title] ${variant === 'success' ? 'text-green-500' : ''} ${variant === 'error' ? 'text-red-500' : 'text-slate-900'}`}
        >
          {title}
        </Toast.Title>

        {description && (
          <Toast.Description asChild>
            <p className="m-0 text-[13px] leading-[1.3] text-slate-500 [grid-area:_description]">
              {description}
            </p>
          </Toast.Description>
        )}

        <Toast.Action className="[grid-area:_action]" asChild altText="Tutup">
          <button className="inline-flex h-[25px] items-center justify-center rounded bg-gray-100 px-2.5 text-xs font-medium leading-[25px] text-gray-700 shadow-[inset_0_0_0_1px] shadow-gray-400 hover:shadow-[inset_0_0_0_1px] hover:shadow-gray-500 focus:shadow-[0_0_0_2px] focus:shadow-gray-500">
            Close
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
}
