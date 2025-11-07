import { type PropsWithChildren, useId, useRef, useState } from 'react';
import { useOutsideClick } from '../hooks';
import { PopoverContent } from './PopoverContent';
import { PopoverContext } from './popoverContext';
import { PopoverTrigger } from './PopoverTrigger';

type PopoverProps = PropsWithChildren<{
  updateMode?: 'always' | 'optimized';
  defaultOpen?: boolean;
}>;

export const Popover = (inProps: PopoverProps) => {
  const { updateMode = 'optimized', defaultOpen, children } = inProps;

  const [open, setOpen] = useState(defaultOpen || false);

  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const contentId = useId();

  useOutsideClick([triggerRef, contentRef], () => {
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
