import { type PropsWithChildren, useId, useState } from 'react';
import { useControllableState } from '../hooks';
import { PopoverContent } from './PopoverContent';
import { PopoverContext } from './popoverContext';
import { PopoverTrigger } from './PopoverTrigger';

type PopoverProps = PropsWithChildren<{
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

export const Popover = (inProps: PopoverProps) => {
  const {
    defaultOpen = false,
    open: openProp,
    children,
    onOpenChange,
  } = inProps;

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    prop: openProp,
    onChange: onOpenChange,
  });

  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const contentId = useId();

  return (
    <PopoverContext
      contentId={contentId}
      trigger={trigger}
      open={open}
      setTrigger={setTrigger}
      setOpen={setOpen}
    >
      {children}
    </PopoverContext>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
