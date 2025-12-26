import { useId, useState, type PropsWithChildren } from 'react';
import { useControllableState } from '@ui/hooks';
import { PopoverContent } from './PopoverContent';
import { PopoverTrigger } from './PopoverTrigger';
import { PopoverContext } from './context';

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
    defaultProp: defaultOpen,
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
