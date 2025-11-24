import { type PropsWithChildren, useId, useRef } from 'react';
import { useControllableState, useOnClickOutside } from '../hooks';
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
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    children,
  } = inProps;

  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const contentId = useId();

  useOnClickOutside([triggerRef, contentRef], () => {
    setOpen(false);
  });

  return (
    <PopoverContext
      value={{
        updateMode,
        triggerRef,
        contentRef,
        contentId,
        open,
        setOpen,
      }}
    >
      {children}
    </PopoverContext>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
