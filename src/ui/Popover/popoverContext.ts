import { type Ref, createContext, useContext } from 'react';

type PopoverContextType = {
  triggerRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  contentId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const PopoverContext = createContext<PopoverContextType | undefined>(
  undefined
);

export function usePopoverContext() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('usePopoverContext must be used within a PopoverContext.');
  }

  return context;
}
