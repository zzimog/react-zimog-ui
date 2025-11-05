import {
  type Ref,
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from 'react';

type PopoverContextType = {
  updateMode: 'always' | 'optimized';
  triggerRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  contentId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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
