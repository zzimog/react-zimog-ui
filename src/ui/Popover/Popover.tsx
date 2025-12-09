import { type PropsWithChildren, useId, useRef } from 'react';
import { useControllableState } from '../hooks';
import { PopoverContent } from './PopoverContent';
import { PopoverContext } from './popoverContext';
import { PopoverTrigger } from './PopoverTrigger';

type PopoverProps = PropsWithChildren<{
  updateMode?: 'always' | 'optimized';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

export const Popover = (inProps: PopoverProps) => {
  const {
    updateMode = 'optimized',
    defaultOpen = false,
    open: openProp,
    onOpenChange,
    children,
  } = inProps;

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    prop: openProp,
    onChange: onOpenChange,
  });

  const triggerRef = useRef<HTMLElement>(null);

  const contentId = useId();

  return (
    <PopoverContext
      value={{
        updateMode,
        triggerRef,
        contentId,
        open,
        onOpenChange: setOpen,
      }}
    >
      {children}
    </PopoverContext>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
